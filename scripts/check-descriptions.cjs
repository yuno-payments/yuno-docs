#!/usr/bin/env node
/**
 * Fail if any docs.json navigation page lacks a `description:` frontmatter field.
 *
 * Mintlify builds each line of the auto-generated llms.txt from a page's
 * `description`. Missing descriptions produce bare, low-signal index entries
 * that are hard for AI agents and RAG tools to navigate. This check keeps every
 * navigable page self-describing.
 *
 * Usage: node scripts/check-descriptions.cjs
 * Exit 0 when every nav page has a non-empty description, 1 otherwise.
 */

const fs = require("fs");
const path = require("path");

const repo = path.resolve(__dirname, "..");

function navSlugs(node, out) {
  if (Array.isArray(node)) {
    for (const item of node) navSlugs(item, out);
  } else if (node && typeof node === "object") {
    for (const value of Object.values(node)) navSlugs(value, out);
  } else if (typeof node === "string" && node.includes("/") && !node.startsWith("http")) {
    out.push(node);
  }
}

function hasDescription(file) {
  const text = fs.readFileSync(file, "utf8");
  const fm = text.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
  return Boolean(fm && /^description:\s*\S/m.test(fm[1]));
}

const docs = JSON.parse(fs.readFileSync(path.join(repo, "docs.json"), "utf8"));
const slugs = [];
navSlugs(docs.navigation || {}, slugs);
const unique = [...new Set(slugs)];

const missing = [];
for (const slug of unique) {
  const rel = slug === "index" ? "index.mdx" : `${slug}.mdx`;
  const file = path.join(repo, rel);
  if (!fs.existsSync(file)) missing.push(`${rel} (file not found)`);
  else if (!hasDescription(file)) missing.push(rel);
}

if (missing.length) {
  console.error(`❌ ${missing.length} of ${unique.length} nav pages lack a description:`);
  for (const rel of missing) console.error(`   - ${rel}`);
  console.error("\nAdd a `description:` field to each page's frontmatter.");
  process.exit(1);
}

console.log(`✅ All ${unique.length} nav pages have a description.`);
