#!/usr/bin/env node
/**
 * Publish the full aggregated OpenAPI spec at the site root.
 *
 * Sources of truth:
 *   - openapi/⋆⋆/⋆.json           per-operation fragments (docs-bound via
 *                                 reference/⋆⋆/⋆.mdx frontmatter) — all paths
 *   - openapi/yuno-api-v1.yaml    info / servers / security / securitySchemes
 *                                 (its paths are NOT merged: they are a hand-
 *                                 written summary that deviates from the
 *                                 docs-bound fragments, e.g. refund/cancel)
 *
 * Outputs, served statically by Mintlify at the site root:
 *   - openapi.json
 *   - openapi.yaml
 *
 * Guards: refuses a spec without paths, without all three documented servers,
 * or with unresolved $refs / discriminator mappings. Duplicate operations are
 * resolved by docs binding (nav-visible page > hidden page > unbound) and an
 * explicit PREFER map; an unresolved conflict fails the build.
 *
 * Requires js-yaml (in CI: npm install js-yaml).
 *
 * Usage:
 *   node scripts/build-openapi-root.cjs          regenerate root files
 *   node scripts/build-openapi-root.cjs --check  verify committed root files
 *                                                match the sources (CI)
 */

const fs = require("fs");
const path = require("path");

const MIN_PATHS = 100;
const METHOD_ORDER = ["get", "post", "put", "patch", "delete"];
const REQUIRED_SERVERS = ["api-sandbox.y.uno", "api.y.uno", "api.eu.y.uno"];

// Same endpoint documented on more than one nav-visible page: pick one.
const PREFER = {
  "post /payments": "openapi/payments/create-payment.json",
  "get /customers/{customer_id}/payment-methods/{payment_method_id}":
    "openapi/payment-methods-direct-workflow/retrieve-enrolled-payment-method-by-id-api.json",
  // webhook-notifications-banking.json documents webhook payloads but hangs
  // them on the transfer endpoint's path; the real API operation wins.
  "post /banking/transfers":
    "openapi/banking-connectivity/entity-transfers-banking-connectivity/initiate-entity-transfer.json",
};

const repoRoot = path.resolve(__dirname, "..");
const basePath = path.join(repoRoot, "openapi", "yuno-api-v1.yaml");
const outJsonPath = path.join(repoRoot, "openapi.json");
const outYamlPath = path.join(repoRoot, "openapi.yaml");

let yaml;
try {
  yaml = require("js-yaml");
} catch {
  console.error("js-yaml is required: npm install js-yaml");
  process.exit(1);
}

function fail(msg) {
  console.error(msg);
  process.exit(1);
}

function walkDir(dir, ext, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walkDir(p, ext, out);
    else if (entry.name.endsWith(ext)) out.push(p);
  }
  return out;
}

function sortedClone(node) {
  if (Array.isArray(node)) return node.map(sortedClone);
  if (!node || typeof node !== "object") return node;
  const out = {};
  for (const k of Object.keys(node).sort()) out[k] = sortedClone(node[k]);
  return out;
}
const canon = (node) => JSON.stringify(sortedClone(node));

// --- docs bindings: fragment -> pages, and which pages are nav-visible ------

function frontmatterBindings() {
  const bindings = new Map(); // fragment rel path -> [page slug]
  for (const mdx of walkDir(path.join(repoRoot, "reference"), ".mdx")) {
    const head = fs.readFileSync(mdx, "utf8").slice(0, 2000);
    const m = head.match(/^openapi:\s*"?(\/openapi\/[^\s"]+\.json)/m);
    if (!m) continue;
    const frag = m[1].slice(1); // strip leading /
    const page = path.relative(repoRoot, mdx).replace(/\.mdx$/, "");
    if (!bindings.has(frag)) bindings.set(frag, []);
    bindings.get(frag).push(page);
  }
  return bindings;
}

function navPages() {
  const docsJson = JSON.parse(fs.readFileSync(path.join(repoRoot, "docs.json"), "utf8"));
  const pages = new Set();
  (function walk(node) {
    if (typeof node === "string") pages.add(node);
    else if (Array.isArray(node)) node.forEach(walk);
    else if (node && typeof node === "object") Object.values(node).forEach(walk);
  })(docsJson.navigation);
  return pages;
}

// --- aggregate --------------------------------------------------------------

function buildSpec() {
  const base = yaml.load(fs.readFileSync(basePath, "utf8"));
  const bindings = frontmatterBindings();
  const nav = navPages();

  // 2 = bound to a nav-visible page, 1 = bound to a hidden page, 0 = unbound
  function score(fragRel) {
    const pages = bindings.get(fragRel);
    if (!pages) return 0;
    return pages.some((p) => nav.has(p)) ? 2 : 1;
  }

  const fragFiles = walkDir(path.join(repoRoot, "openapi"), ".json")
    .map((p) => path.relative(repoRoot, p))
    .sort();

  const ops = new Map(); // "method path" -> {frag, op, score}
  const compPools = {};
  for (const pool of ["schemas", "responses", "parameters", "headers", "requestBodies", "examples", "links", "callbacks"])
    compPools[pool] = new Map();
  const tagSet = new Set();

  for (const fragRel of fragFiles) {
    const doc = JSON.parse(fs.readFileSync(path.join(repoRoot, fragRel), "utf8"));
    const fragScore = score(fragRel);
    const serviceDir = fragRel.split("/")[1];
    const tag = serviceDir
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    // Merge this fragment's components into the shared pools, renaming on
    // conflict and rewriting the fragment's own $refs to the new name.
    const renames = new Map();
    for (const pool of Object.keys(compPools)) {
      for (const [name, def] of Object.entries((doc.components || {})[pool] || {})) {
        const key = canon(def);
        let finalName = name;
        if (compPools[pool].has(name) && compPools[pool].get(name).key !== key) {
          let n = 2;
          while (
            compPools[pool].has(`${name}_${n}`) &&
            compPools[pool].get(`${name}_${n}`).key !== key
          )
            n++;
          finalName = `${name}_${n}`;
          renames.set(`#/components/${pool}/${name}`, `#/components/${pool}/${finalName}`);
        }
        if (!compPools[pool].has(finalName)) compPools[pool].set(finalName, { key, def });
      }
    }
    if (renames.size) {
      (function rewrite(node) {
        if (Array.isArray(node)) return node.forEach(rewrite);
        if (!node || typeof node !== "object") return;
        if (typeof node.$ref === "string" && renames.has(node.$ref)) node.$ref = renames.get(node.$ref);
        Object.values(node).forEach(rewrite);
      })(doc.paths);
    }

    for (const [p, item] of Object.entries(doc.paths || {})) {
      for (const [method, op] of Object.entries(item)) {
        const m = method.toLowerCase();
        if (!METHOD_ORDER.includes(m) || !op || typeof op !== "object") continue;
        for (const k of Object.keys(op)) if (k.startsWith("x-readme")) delete op[k];
        if (!op.tags || !op.tags.length) op.tags = [tag];
        op.tags.forEach((t) => tagSet.add(t));

        const opKey = `${m} ${p}`;
        const existing = ops.get(opKey);
        if (!existing) {
          ops.set(opKey, { frag: fragRel, op, score: fragScore });
        } else if (canon(existing.op) === canon(op)) {
          // identical duplicate, keep first
        } else if (PREFER[opKey]) {
          if (PREFER[opKey] === fragRel) ops.set(opKey, { frag: fragRel, op, score: fragScore });
          else if (PREFER[opKey] !== existing.frag)
            fail(`PREFER for "${opKey}" names ${PREFER[opKey]}, seen ${existing.frag} and ${fragRel}`);
        } else if (fragScore !== existing.score) {
          if (fragScore > existing.score) ops.set(opKey, { frag: fragRel, op, score: fragScore });
        } else {
          fail(
            `conflicting definitions for "${opKey}" in ${existing.frag} and ${fragRel} — add a PREFER entry`
          );
        }
      }
    }
  }

  const paths = {};
  const sortedOpKeys = [...ops.keys()].sort((a, b) => {
    const [ma, pa] = [a.split(" ")[0], a.slice(a.indexOf(" ") + 1)];
    const [mb, pb] = [b.split(" ")[0], b.slice(b.indexOf(" ") + 1)];
    return pa === pb ? METHOD_ORDER.indexOf(ma) - METHOD_ORDER.indexOf(mb) : pa < pb ? -1 : 1;
  });
  for (const opKey of sortedOpKeys) {
    const p = opKey.slice(opKey.indexOf(" ") + 1);
    if (!paths[p]) paths[p] = {};
    paths[p][opKey.split(" ")[0]] = ops.get(opKey).op;
  }

  const components = { securitySchemes: base.components.securitySchemes };
  for (const pool of Object.keys(compPools)) {
    if (!compPools[pool].size) continue;
    components[pool] = {};
    for (const name of [...compPools[pool].keys()].sort())
      components[pool][name] = compPools[pool].get(name).def;
  }

  return {
    openapi: "3.1.0",
    info: base.info,
    servers: base.servers,
    security: base.security,
    tags: [...tagSet].sort().map((name) => ({ name })),
    paths,
    components,
  };
}

// --- validate ---------------------------------------------------------------

function validate(spec) {
  const title = (spec.info && spec.info.title) || "";
  if (!title.includes("Yuno")) fail(`info.title must contain 'Yuno', got: ${title}`);

  const nPaths = Object.keys(spec.paths).length;
  if (nPaths < MIN_PATHS) fail(`paths count ${nPaths} < ${MIN_PATHS} — refusing to publish`);

  const serverUrls = (spec.servers || []).map((s) => s.url || "");
  for (const host of REQUIRED_SERVERS) {
    if (!serverUrls.some((u) => u.includes(`//${host}/`) || u.endsWith(`//${host}`)))
      fail(`servers is missing ${host} — must match the API environments page`);
  }

  function resolvePointer(pointer) {
    let cur = spec;
    for (const raw of pointer.slice(2).split("/")) {
      const part = raw.replace(/~1/g, "/").replace(/~0/g, "~");
      if (cur && typeof cur === "object" && part in cur) cur = cur[part];
      else return false;
    }
    return true;
  }
  const badRefs = new Set();
  (function walk(node) {
    if (Array.isArray(node)) return node.forEach(walk);
    if (!node || typeof node !== "object") return;
    if (typeof node.$ref === "string" && node.$ref.startsWith("#/") && !resolvePointer(node.$ref))
      badRefs.add(node.$ref);
    if (node.discriminator && node.discriminator.mapping) {
      for (const target of Object.values(node.discriminator.mapping)) {
        if (typeof target === "string" && target.startsWith("#/") && !resolvePointer(target))
          badRefs.add(`discriminator → ${target}`);
      }
    }
    Object.values(node).forEach(walk);
  })(spec);
  if (badRefs.size) fail(`unresolved references in spec:\n  ${[...badRefs].join("\n  ")}`);

  let nOps = 0;
  for (const item of Object.values(spec.paths))
    nOps += Object.keys(item).filter((m) => METHOD_ORDER.includes(m)).length;
  return { nPaths, nOps };
}

// --- main -------------------------------------------------------------------

const spec = buildSpec();
const { nPaths, nOps } = validate(spec);
const jsonText = JSON.stringify(spec, null, 2) + "\n";
const yamlText = yaml.dump(spec, { lineWidth: 120, noRefs: true });

if (process.argv.includes("--check")) {
  const errors = [];
  const read = (p) => (fs.existsSync(p) ? fs.readFileSync(p, "utf8") : null);
  if (read(outJsonPath) !== jsonText)
    errors.push("openapi.json is stale — run scripts/build-openapi-root.cjs");
  if (read(outYamlPath) !== yamlText)
    errors.push("openapi.yaml is stale — run scripts/build-openapi-root.cjs");
  if (errors.length) fail(errors.join("\n"));
  console.log(`OK: root spec matches sources (${nPaths} paths, ${nOps} operations)`);
} else {
  fs.writeFileSync(outJsonPath, jsonText);
  fs.writeFileSync(outYamlPath, yamlText);
  console.log(`wrote openapi.json and openapi.yaml (${nPaths} paths, ${nOps} operations)`);
}
