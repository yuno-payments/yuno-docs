#!/usr/bin/env node
/**
 * Publish the full aggregated OpenAPI spec at the site root.
 *
 * Sources of truth:
 *   - openapi/⋆⋆/⋆.json fragments that are BOTH bound to a reference page via
 *     frontmatter AND that page is visible in docs.json navigation. Unbound
 *     files (test captures, scratch specs) and fragments bound only to hidden
 *     pages (unreleased products) are excluded by construction.
 *   - openapi/yuno-api-v1.yaml    info / servers / global security and the
 *     PublicApiKey / PrivateSecretKey / AccountCode scheme definitions.
 *     Its hand-written paths are NOT merged (they deviate from the
 *     docs-bound fragments, e.g. refund/cancel scoping).
 *
 * Outputs, served statically by Mintlify at the site root:
 *   - openapi.json
 *   - openapi.yaml
 *
 * Normalizations applied per fragment:
 *   - 3.0-style `nullable: true` converted to 3.1 type arrays
 *   - path-item-level parameters hoisted into each operation
 *   - host-only servers with /v1 embedded in paths → /v1 stripped from paths
 *   - non-default servers (e.g. the v2 report download) kept as op-level servers
 *   - security requirements mapped to canonical scheme names; attached at op
 *     level when they differ from the global public+private pair
 *   - webhook-payload fragments (servers use {merchant_base_URL}) published
 *     under the OpenAPI 3.1 `webhooks` key, not as API paths
 *   - component name collisions renamed with the fragment's own refs rewritten
 *   - equivalent templated paths with different parameter spellings unified
 *
 * Usage:
 *   node scripts/build-openapi-root.cjs          regenerate root files
 *   node scripts/build-openapi-root.cjs --check  verify committed root files
 *                                                match the sources (CI/local)
 */

const fs = require("fs");
const path = require("path");

const MIN_PATHS = 100;
const METHOD_ORDER = ["get", "post", "put", "patch", "delete"];
const REQUIRED_SERVERS = ["api-sandbox.y.uno", "api.y.uno", "api.eu.y.uno"];
const BASE_HOSTS = ["https://api-sandbox.y.uno", "https://api.y.uno", "https://api.eu.y.uno"];

// Same endpoint documented on more than one nav-visible page: pick one.
const PREFER = {
  "post /payments": "openapi/payments/create-payment.json",
  "get /customers/{customer_id}/payment-methods/{payment_method_id}":
    "openapi/payment-methods-direct-workflow/retrieve-enrolled-payment-method-by-id-api.json",
  "get /organizations/account-groups": "openapi/organizations/list-account-groups.json",
  "get /organizations/users": "openapi/organizations/list-users.json",
};

// header-name (lowercase) -> canonical securityScheme id
const CANONICAL_SCHEMES = {
  "public-api-key": "PublicApiKey",
  "private-secret-key": "PrivateSecretKey",
  "x-account-code": "AccountCode",
  "x-idempotency-key": "IdempotencyKey",
  "x-public-api-key": "XPublicApiKey",
  "x-private-secret-key": "XPrivateSecretKey",
};
const DEFAULT_SECURITY_SET = "PrivateSecretKey|PublicApiKey";

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
const clone = (node) => JSON.parse(JSON.stringify(node));
const normPath = (p) => p.replace(/\{[^}]+\}/g, "{}");

// --- docs bindings ----------------------------------------------------------

function includedFragments() {
  const nav = new Set();
  const docsJson = JSON.parse(fs.readFileSync(path.join(repoRoot, "docs.json"), "utf8"));
  (function walk(node) {
    if (typeof node === "string") nav.add(node);
    else if (Array.isArray(node)) node.forEach(walk);
    else if (node && typeof node === "object") Object.values(node).forEach(walk);
  })(docsJson.navigation);

  const visible = new Set(); // fragment rel paths bound to a nav-visible page
  const boundAny = new Set();
  for (const mdx of walkDir(path.join(repoRoot, "reference"), ".mdx")) {
    const head = fs.readFileSync(mdx, "utf8").slice(0, 4000);
    const m = head.match(/^openapi:\s*"?\/?(openapi\/[^\s"]+\.json)/m);
    if (!m) continue;
    const frag = m[1];
    boundAny.add(frag);
    const page = path.relative(repoRoot, mdx).replace(/\.mdx$/, "");
    if (nav.has(page)) visible.add(frag);
  }

  const onDisk = walkDir(path.join(repoRoot, "openapi"), ".json").map((p) =>
    path.relative(repoRoot, p)
  );
  const included = onDisk.filter((f) => visible.has(f)).sort();
  const hiddenOnly = onDisk.filter((f) => boundAny.has(f) && !visible.has(f));
  const unbound = onDisk.filter((f) => !boundAny.has(f));
  console.error(
    `fragments: ${included.length} included, ${hiddenOnly.length} hidden-page-only excluded, ${unbound.length} unbound excluded`
  );
  if (unbound.length) console.error(`  unbound: ${unbound.join(", ")}`);
  return included;
}

// --- per-fragment normalization ---------------------------------------------

function convertNullable(node) {
  if (Array.isArray(node)) return node.forEach(convertNullable);
  if (!node || typeof node !== "object") return;
  if (node.nullable === true && typeof node.type === "string") {
    node.type = [node.type, "null"];
    if (Array.isArray(node.enum) && !node.enum.includes(null)) node.enum.push(null);
    delete node.nullable;
  }
  Object.values(node).forEach(convertNullable);
}

function rewriteRefs(node, renames) {
  if (Array.isArray(node)) return node.forEach((n) => rewriteRefs(n, renames));
  if (!node || typeof node !== "object") return;
  if (typeof node.$ref === "string" && renames.has(node.$ref)) node.$ref = renames.get(node.$ref);
  Object.values(node).forEach((n) => rewriteRefs(n, renames));
}

// Classify the fragment's servers. Returns:
//   {kind: "default"} | {kind: "strip-v1"} | {kind: "override", servers}
//   | {kind: "webhook"}
function classifyServers(doc, fragRel) {
  const urls = (doc.servers || []).map((s) => (s.url || "").replace(/\/$/, ""));
  if (urls.some((u) => u.includes("{merchant_base_URL}"))) return { kind: "webhook" };
  if (urls.length && urls.every((u) => u.endsWith("/v1") && BASE_HOSTS.includes(u.slice(0, -3))))
    return { kind: "default" };
  if (urls.length && urls.every((u) => BASE_HOSTS.includes(u))) {
    const paths = Object.keys(doc.paths || {});
    if (paths.length && paths.every((p) => p.startsWith("/v1/"))) return { kind: "strip-v1" };
    fail(`${fragRel}: host-only servers but paths do not embed /v1 — cannot normalize`);
  }
  return { kind: "override", servers: doc.servers };
}

// Map the fragment's doc-level security to canonical ids.
// Returns {schemes: {canonicalId: def}, security: [...] | null (null = default)}
function canonicalSecurity(doc, fragRel) {
  const localSchemes = (doc.components || {}).securitySchemes || {};
  const local2canon = {};
  const schemes = {};
  for (const [local, def] of Object.entries(localSchemes)) {
    const hdr = (def.name || "").toLowerCase();
    const id = CANONICAL_SCHEMES[hdr];
    if (!id) fail(`${fragRel}: unknown security header '${def.name}' — extend CANONICAL_SCHEMES`);
    local2canon[local] = id;
    schemes[id] = def;
  }
  const security = (doc.security || []).map((req) => {
    const out = {};
    for (const [local, scopes] of Object.entries(req)) {
      if (!local2canon[local]) fail(`${fragRel}: security references undefined scheme '${local}'`);
      out[local2canon[local]] = scopes;
    }
    return out;
  });
  const setKey = security
    .flatMap((req) => Object.keys(req))
    .sort()
    .join("|");
  return { schemes, security: setKey === DEFAULT_SECURITY_SET || !security.length ? null : security };
}

// --- aggregate --------------------------------------------------------------

function buildSpec() {
  const base = yaml.load(fs.readFileSync(basePath, "utf8"));
  const fragFiles = includedFragments();

  const ops = new Map(); // "method normPath" -> {frag, path, op}
  const spellings = new Map(); // normPath -> Map(spelling -> opCount)
  const compPools = {};
  for (const pool of ["schemas", "responses", "parameters", "headers", "requestBodies", "examples", "links", "callbacks"])
    compPools[pool] = new Map(); // name -> {key, def}
  const usedSchemes = new Map(); // canonical id -> def (first seen)
  const webhooks = {};
  const tagSet = new Set();

  for (const fragRel of fragFiles) {
    const original = JSON.parse(fs.readFileSync(path.join(repoRoot, fragRel), "utf8"));
    convertNullable(original);

    const serverMode = classifyServers(original, fragRel);
    const sec = canonicalSecurity(original, fragRel);
    for (const [id, def] of Object.entries(sec.schemes))
      if (!usedSchemes.has(id)) usedSchemes.set(id, def);

    // Component collision handling: decide renames, rewrite the WHOLE doc
    // (paths and components), iterate until stable.
    let doc;
    const renames = new Map();
    for (let iter = 0; ; iter++) {
      if (iter >= 6) fail(`${fragRel}: component rename did not converge`);
      doc = clone(original);
      rewriteRefs(doc, renames);
      let conflicts = 0;
      for (const pool of Object.keys(compPools)) {
        for (const [name, def] of Object.entries((doc.components || {})[pool] || {})) {
          if (pool === "securitySchemes") continue;
          const pointer = `#/components/${pool}/${name}`;
          const target = renames.get(pointer);
          const finalName = target ? target.split("/").pop() : name;
          const existing = compPools[pool].get(finalName);
          if (existing && existing.key !== canon(def)) {
            let n = 2;
            while (
              compPools[pool].has(`${name}_${n}`) &&
              compPools[pool].get(`${name}_${n}`).key !== canon(def)
            )
              n++;
            renames.set(pointer, `#/components/${pool}/${name}_${n}`);
            conflicts++;
          }
        }
      }
      if (!conflicts) break;
    }
    for (const pool of Object.keys(compPools)) {
      if (pool === "securitySchemes") continue;
      for (const [name, def] of Object.entries((doc.components || {})[pool] || {})) {
        const pointer = `#/components/${pool}/${name}`;
        const finalName = (renames.get(pointer) || pointer).split("/").pop();
        if (!compPools[pool].has(finalName)) compPools[pool].set(finalName, { key: canon(def), def });
      }
    }

    const serviceDir = fragRel.split("/")[1];
    const tag = serviceDir
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    const stem = path.basename(fragRel, ".json");

    for (const [rawPath, item] of Object.entries(doc.paths || {})) {
      const p = serverMode.kind === "strip-v1" ? rawPath.replace(/^\/v1/, "") : rawPath;
      const pathParams = Array.isArray(item.parameters) ? item.parameters : [];
      for (const [method, op] of Object.entries(item)) {
        const m = method.toLowerCase();
        if (!METHOD_ORDER.includes(m) || !op || typeof op !== "object") continue;
        for (const k of Object.keys(op)) if (k.startsWith("x-readme")) delete op[k];

        // hoist path-item parameters (operation-level wins on name+in)
        if (pathParams.length) {
          const have = new Set(
            (op.parameters || []).map((prm) => `${prm.name}|${prm.in}`).filter((x) => !x.startsWith("undefined"))
          );
          op.parameters = [
            ...(op.parameters || []),
            ...pathParams.filter((prm) => !prm.$ref && !have.has(`${prm.name}|${prm.in}`)),
            ...pathParams.filter((prm) => prm.$ref),
          ];
        }

        if (serverMode.kind === "webhook") {
          delete op.security;
          delete op.servers;
          delete op.operationId;
          webhooks[stem] = webhooks[stem] || {};
          webhooks[stem][m] = op;
          continue;
        }

        if (!op.tags || !op.tags.length) op.tags = [tag];
        op.tags.forEach((t) => tagSet.add(t));
        if (serverMode.kind === "override") op.servers = serverMode.servers;
        if (sec.security) op.security = sec.security;

        const opKey = `${m} ${normPath(p)}`;
        const existing = ops.get(opKey);
        if (existing && canon(existing.op) !== canon(op)) {
          const preferred = PREFER[`${m} ${p}`] || PREFER[`${m} ${existing.path}`];
          if (!preferred)
            fail(`conflicting definitions for "${opKey}" in ${existing.frag} and ${fragRel} — add a PREFER entry`);
          if (preferred !== fragRel && preferred !== existing.frag)
            fail(`PREFER for "${opKey}" names ${preferred}, seen ${existing.frag} and ${fragRel}`);
          if (preferred === existing.frag) continue;
        }
        ops.set(opKey, { frag: fragRel, path: p, op });
        const np = normPath(p);
        if (!spellings.has(np)) spellings.set(np, new Map());
        spellings.get(np).set(p, (spellings.get(np).get(p) || 0) + 1);
      }
    }
  }

  // One spelling per templated path: most ops, then longest, then lexicographic.
  const canonicalSpelling = new Map();
  for (const [np, variants] of spellings) {
    const best = [...variants.entries()].sort(
      (a, b) => b[1] - a[1] || b[0].length - a[0].length || (a[0] < b[0] ? -1 : 1)
    )[0][0];
    canonicalSpelling.set(np, best);
  }

  function renamePathParams(op, fromPath, toPath) {
    const from = [...fromPath.matchAll(/\{([^}]+)\}/g)].map((m) => m[1]);
    const to = [...toPath.matchAll(/\{([^}]+)\}/g)].map((m) => m[1]);
    const map = Object.fromEntries(from.map((n, i) => [n, to[i]]));
    for (const prm of op.parameters || [])
      if (prm.in === "path" && map[prm.name]) prm.name = map[prm.name];
  }

  const paths = {};
  const sortedOpKeys = [...ops.keys()].sort((a, b) => {
    const [ma, na] = [a.split(" ")[0], a.slice(a.indexOf(" ") + 1)];
    const [mb, nb] = [b.split(" ")[0], b.slice(b.indexOf(" ") + 1)];
    return na === nb ? METHOD_ORDER.indexOf(ma) - METHOD_ORDER.indexOf(mb) : na < nb ? -1 : 1;
  });
  const usedOpIds = new Set();
  for (const opKey of sortedOpKeys) {
    const np = opKey.slice(opKey.indexOf(" ") + 1);
    const entry = ops.get(opKey);
    const p = canonicalSpelling.get(np);
    if (entry.path !== p) renamePathParams(entry.op, entry.path, p);
    if (typeof entry.op.operationId === "string") {
      let id = entry.op.operationId.replace(/[^A-Za-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "");
      let unique = id;
      for (let n = 2; usedOpIds.has(unique); n++) unique = `${id}-${n}`;
      usedOpIds.add(unique);
      entry.op.operationId = unique;
    }
    if (!paths[p]) paths[p] = {};
    paths[p][opKey.split(" ")[0]] = entry.op;
  }

  // securitySchemes: base definitions win where present, fragment defs otherwise
  const securitySchemes = {};
  const baseSchemes = (base.components || {}).securitySchemes || {};
  for (const id of [...usedSchemes.keys()].sort())
    securitySchemes[id] = baseSchemes[id] || usedSchemes.get(id);

  const components = { securitySchemes };
  for (const pool of Object.keys(compPools)) {
    if (!compPools[pool].size) continue;
    components[pool] = {};
    for (const name of [...compPools[pool].keys()].sort())
      components[pool][name] = compPools[pool].get(name).def;
  }

  const spec = {
    openapi: "3.1.0",
    info: base.info,
    servers: base.servers,
    security: base.security,
    tags: [...tagSet].sort().map((name) => ({ name })),
    paths,
    components,
  };
  if (Object.keys(webhooks).length) {
    spec.webhooks = {};
    for (const k of Object.keys(webhooks).sort()) spec.webhooks[k] = webhooks[k];
  }
  return spec;
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

  const v1Paths = Object.keys(spec.paths).filter((p) => p.startsWith("/v1/"));
  if (v1Paths.length) fail(`paths embed /v1 (double-prefix vs servers): ${v1Paths.join(", ")}`);

  const seenNorm = new Map();
  for (const p of Object.keys(spec.paths)) {
    const np = normPath(p);
    if (seenNorm.has(np)) fail(`equivalent templated paths: ${seenNorm.get(np)} and ${p}`);
    seenNorm.set(np, p);
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
  let securityRefs = [];
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
    if (Array.isArray(node.security)) securityRefs.push(...node.security);
    Object.values(node).forEach(walk);
  })(spec);
  if (badRefs.size) fail(`unresolved references in spec:\n  ${[...badRefs].join("\n  ")}`);
  for (const req of securityRefs)
    for (const id of Object.keys(req))
      if (!spec.components.securitySchemes[id]) fail(`security references undefined scheme '${id}'`);

  let nullableLeft = 0;
  (function count(node) {
    if (Array.isArray(node)) return node.forEach(count);
    if (!node || typeof node !== "object") return;
    if (node.nullable === true) nullableLeft++;
    Object.values(node).forEach(count);
  })(spec);
  if (nullableLeft) console.error(`note: ${nullableLeft} complex 'nullable' occurrences left unconverted`);

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
