#!/usr/bin/env node
/**
 * Builds the custom llms.txt at the root of the repo.
 *
 *   node scripts/build-llms-txt.mjs
 *
 * Mintlify's generated llms.txt is over 45,000 characters, and about 18,000 of them are links to each OpenAPI
 * fragment file. Agents and readiness checks (Ora) expect llms.txt under 30,000 characters. This script keeps
 * Mintlify's format but:
 * - links the two large tabs (Documentation, API Reference) to the /_llms/ indexes Mintlify already serves;
 * - lists the smaller tabs (SDK, SDKs, Changelog) inline, with each page's description;
 * - replaces the per-fragment OpenAPI links with the full spec (openapi.json, openapi.yaml).
 * Run it again after adding, moving or renaming pages, then commit llms.txt. Hidden tabs are skipped.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://docs.y.uno';
const INDEXED_TABS = { Documentation: 'documentation', 'API Reference': 'api-reference' };
const MAX_DESCRIPTION = 300;
const LIMIT = 30000;

const docs = JSON.parse(readFileSync(join(ROOT, 'docs.json'), 'utf8'));

function frontmatter(page) {
  const file = ['.mdx', '.md'].map((ext) => join(ROOT, page + ext)).find((f) => existsSync(f));
  if (!file) return {};
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(readFileSync(file, 'utf8'));
  if (!match) return {};
  const read = (key) => {
    const line = new RegExp(`^${key}:\\s*(.*)$`, 'm').exec(match[1]);
    if (!line) return '';
    return line[1].trim().replace(/^(['"])(.*)\1$/, '$2').replace(/\\"/g, '"');
  };
  return {
    title: read('title'),
    description: read('description'),
    hidden: read('hidden') === 'true' || read('noindex') === 'true',
  };
}

function pageLine(page) {
  const { title, description, hidden } = frontmatter(page);
  if (hidden) return null;
  let text = (description || '').split(/\n\s*\n/)[0].trim();
  if (text.length > MAX_DESCRIPTION) text = `${text.slice(0, MAX_DESCRIPTION - 1).trimEnd()}…`;
  const name = title || page.split('/').pop();
  return `- [${name}](${SITE}/${page}.md)${text ? `: ${text}` : ''}`;
}

// Renders pages and nested groups the way Mintlify does: a heading per group, deeper groups one level down.
function renderItems(items, level, out) {
  const pages = items.filter((item) => typeof item === 'string').map(pageLine).filter(Boolean);
  const groups = items.filter((item) => item && typeof item === 'object' && !item.hidden);
  if (pages.length) out.push('', ...pages);
  for (const group of groups) {
    out.push('', `${'#'.repeat(Math.min(level, 6))} ${group.group}`);
    renderItems([...(group.root ? [group.root] : []), ...(group.pages || [])], level + 1, out);
  }
}

function countPages(items) {
  return (items || []).reduce((n, item) => n + (typeof item === 'string' ? 1 : countPages(item.pages || item.groups)), 0);
}

const tabs = docs.navigation.tabs.filter((tab) => !tab.hidden);
const out = [`# ${docs.name}`, ''];
if (docs.description) out.push(`> ${docs.description}`, '');

const instructions = docs.markdown?.instructions;
if (instructions) {
  out.push('## Agent Instructions', '', ...(Array.isArray(instructions) ? instructions : [instructions]), '');
}

out.push('## Indexes', '', '> The links below point to documentation indexes. Follow each `/_llms/` index to reach the pages.', '');
for (const tab of tabs.filter((t) => INDEXED_TABS[t.tab])) {
  const groups = (tab.groups || []).map((g) => g.group).join(', ');
  out.push(`- [${tab.tab} (${countPages(tab.groups)} pages)](${SITE}/_llms/${INDEXED_TABS[tab.tab]}.txt): ${groups}.`);
}

for (const tab of tabs.filter((t) => !INDEXED_TABS[t.tab])) {
  out.push('', `## ${tab.tab}`);
  renderItems(tab.pages || (tab.groups || []).map((g) => g), 3, out);
}

out.push(
  '',
  '## OpenAPI Specs',
  '',
  `- [Yuno API, full OpenAPI spec (JSON)](${SITE}/openapi.json): every endpoint in one file.`,
  `- [Yuno API, full OpenAPI spec (YAML)](${SITE}/openapi.yaml): the same spec in YAML.`,
  '',
  '## Optional',
  '',
  `- [Full documentation in one file](${SITE}/llms-full.txt): every page with its full content, for tools that need everything at once.`,
  '',
  'This documentation is built and hosted on [Mintlify](https://mintlify.com), a developer documentation platform.',
  '',
);

const text = out.join('\n').replace(/\n{3,}/g, '\n\n');
writeFileSync(join(ROOT, 'llms.txt'), text);
console.log(`llms.txt: ${text.length} characters (limit ${LIMIT})${text.length > LIMIT ? ', OVER THE LIMIT' : ''}`);
