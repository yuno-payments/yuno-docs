#!/usr/bin/env node
/**
 * generate_changelog.js — Build the body of a changelog MDX page from a JSON source file.
 *
 * Usage:
 *   # Dry run — print generated body to stdout:
 *   node scripts/generate_changelog.js changelog/source/android.json
 *
 *   # Write to MDX — replaces the body, keeps the header (frontmatter + import + title):
 *   node scripts/generate_changelog.js changelog/source/android.json changelog/android.mdx
 *
 * Output format per release:
 *   ## v2.13.4
 *
 *   - <ChangelogBadge type="changed" /> **Font Family Customization**
 *     Merchant-defined `fontFamily` set in `YunoConfig.styles` is now applied across all SDK components.
 */

const fs = require('fs');
const path = require('path');

const MONTHS = [
  '', 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function formatDate(dateStr) {
  if (!dateStr) return 'Release date unavailable';
  const [year, month, day] = dateStr.split('-').map(Number);
  return `${MONTHS[month]} ${day}, ${year}`;
}

function badge(typeStr) {
  return `<ChangelogBadge type="${typeStr.toLowerCase()}" />`;
}

function renderEntry(entry) {
  const lines = [];
  const migration = entry.migration_guide;
  const links = entry.links || [];

  lines.push(`- ${badge(entry.type)} **${entry.title}**  `);

  if (migration) {
    lines.push(`  ${entry.description}  `);
    lines.push(`  [Migration guide →](${migration})`);
  } else {
    lines.push(`  ${entry.description}`);
  }

  if (links.length > 0) {
    const linkParts = links.map(l => `[${l.label}](${l.url})`);
    lines.push(`  *See also: ${linkParts.join(' · ')}*`);
  }

  return lines;
}

function renderUpgrade(version, upgrade) {
  const lines = [];
  lines.push(`<Accordion title="Install v${version}">`);
  lines.push('');

  if (!Array.isArray(upgrade)) {
    lines.push(`\`\`\`${upgrade.language || ''}`);
    lines.push(upgrade.snippet || '');
    lines.push('```');
  } else {
    lines.push('<Tabs>');
    for (const item of upgrade) {
      lines.push(`  <Tab title="${item.label || ''}">`);
      lines.push('');
      lines.push(`  \`\`\`${item.language || ''}`);
      lines.push(`  ${item.snippet || ''}`);
      lines.push('  ```');
      lines.push('');
      lines.push('  </Tab>');
    }
    lines.push('</Tabs>');
  }

  lines.push('');
  lines.push('</Accordion>');
  return lines;
}

function renderRelease(release) {
  const lines = [];
  const { version, release_date, entries } = release;

  lines.push(`## v${version}`);
  lines.push(`*${formatDate(release_date)}*`);
  lines.push('');

  const ungrouped = entries.filter(e => !e.group);
  const groups = {};
  for (const e of entries) {
    if (e.group) {
      if (!groups[e.group]) groups[e.group] = [];
      groups[e.group].push(e);
    }
  }

  for (const entry of ungrouped) {
    lines.push(...renderEntry(entry));
    lines.push('');
  }

  for (const [groupName, groupEntries] of Object.entries(groups)) {
    lines.push(`### ${groupName}`);
    lines.push('');
    for (const entry of groupEntries) {
      lines.push(...renderEntry(entry));
      lines.push('');
    }
  }

  return lines;
}

function generateBody(data) {
  const lines = [];
  for (const release of data.releases) {
    lines.push(...renderRelease(release));
  }

  while (lines.length > 0 && (lines[lines.length - 1] === '---' || lines[lines.length - 1] === '')) {
    lines.pop();
  }

  return lines.join('\n') + '\n';
}

function extractHeader(mdxContent) {
  let match = mdxContent.match(/^# /m);
  if (match) return mdxContent.slice(0, match.index);
  match = mdxContent.match(/^## /m);
  if (match) return mdxContent.slice(0, match.index);
  return mdxContent;
}

function main() {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.log(
      'Usage:\n' +
      '  node scripts/generate_changelog.js <source.json>\n' +
      '  node scripts/generate_changelog.js <source.json> <target.mdx>'
    );
    process.exit(1);
  }

  const jsonPath = args[0];
  const mdxPath = args[1] || null;

  if (!fs.existsSync(jsonPath)) {
    console.error(`Error: ${jsonPath} not found`);
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const body = generateBody(data);

  if (!mdxPath) {
    process.stdout.write(body);
    return;
  }

  if (!fs.existsSync(mdxPath)) {
    console.error(`Error: ${mdxPath} not found`);
    process.exit(1);
  }

  const current = fs.readFileSync(mdxPath, 'utf8');
  const header = extractHeader(current);
  fs.writeFileSync(mdxPath, header + body, 'utf8');
  console.log(`✓ Updated ${mdxPath}`);
}

main();
