#!/usr/bin/env node
/**
 * Publish the aggregated OpenAPI spec at the site root.
 *
 * Source of truth: openapi/yuno-api-v1.yaml (full aggregated spec).
 * Outputs, served statically by Mintlify at the site root:
 *   - openapi.json  (JSON conversion of the full spec)
 *   - openapi.yaml  (byte-for-byte copy of the full spec)
 *
 * Refuses to write a spec without paths, so the 0-path shell that used to
 * live at /openapi.json can never come back.
 *
 * Requires js-yaml (in CI: npm install js-yaml).
 *
 * Usage:
 *   node scripts/build-openapi-root.cjs          regenerate root files
 *   node scripts/build-openapi-root.cjs --check  verify committed root files
 *                                                match the source (CI)
 */

const fs = require("fs");
const path = require("path");

const MIN_PATHS = 30;

const repoRoot = path.resolve(__dirname, "..");
const srcPath = path.join(repoRoot, "openapi", "yuno-api-v1.yaml");
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

const srcText = fs.readFileSync(srcPath, "utf8");
const spec = yaml.load(srcText);

const version = String(spec.openapi || "");
if (!version.startsWith("3.")) fail(`unexpected openapi version: ${version}`);

const title = (spec.info && spec.info.title) || "";
if (!title.includes("Yuno")) fail(`info.title must contain 'Yuno', got: ${title}`);

const nPaths = Object.keys(spec.paths || {}).length;
if (nPaths < MIN_PATHS)
  fail(`paths count ${nPaths} < ${MIN_PATHS} — refusing to publish a shell`);

// Every documented environment must be present (api-environments lists all three).
const REQUIRED_SERVERS = ["api-sandbox.y.uno", "api.y.uno", "api.eu.y.uno"];
const serverUrls = (spec.servers || []).map((s) => s.url || "");
for (const host of REQUIRED_SERVERS) {
  if (!serverUrls.some((u) => u.includes(`//${host}/`) || u.endsWith(`//${host}`)))
    fail(`servers is missing ${host} — must match the API environments page`);
}

// Every internal $ref and discriminator mapping target must resolve.
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
if (badRefs.size)
  fail(`unresolved references in spec:\n  ${[...badRefs].join("\n  ")}`);

const jsonText = JSON.stringify(spec, null, 2) + "\n";

if (process.argv.includes("--check")) {
  const errors = [];
  const read = (p) => (fs.existsSync(p) ? fs.readFileSync(p, "utf8") : null);
  if (read(outJsonPath) !== jsonText)
    errors.push("openapi.json is stale — run scripts/build-openapi-root.cjs");
  if (read(outYamlPath) !== srcText)
    errors.push("openapi.yaml is stale — run scripts/build-openapi-root.cjs");
  if (errors.length) fail(errors.join("\n"));
  console.log(`OK: root spec files match source (${nPaths} paths)`);
} else {
  fs.writeFileSync(outJsonPath, jsonText);
  fs.writeFileSync(outYamlPath, srcText);
  console.log(`wrote openapi.json and openapi.yaml (${nPaths} paths)`);
}
