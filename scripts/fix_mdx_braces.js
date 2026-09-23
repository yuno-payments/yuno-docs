#!/usr/bin/env node
/**
 * Detect and fix bare curly braces in MDX/MD files that cause Mintlify acorn parse errors.
 *
 * In MDX, any { outside a code span or fenced code block is parsed as a JSX expression.
 * Non-JavaScript content (e.g. raw JSON) makes acorn fail with "Could not parse expression".
 *
 * Two patterns are handled:
 *
 *   1. Standalone JSON block — { is alone on a line, followed by JSON content:
 *
 *        {                          ```json
 *        "key": "value"    →        {
 *        }                              "key": "value"
 *                                   }
 *                                   ```
 *
 *   2. Inline bare brace — { appears inside prose or an HTML element:
 *
 *        <td>{"value":"..."}</td>  →  <td>&#123;"value":"..."&#125;</td>
 *
 *      Only braces that look like JSON (i.e. { followed by a quoted key with a colon)
 *      are auto-escaped. Unambiguous JSX like {variable} or {/* comment *\/} are
 *      reported as WARN but never auto-fixed.
 *
 * Usage:
 *   node scripts/fix_mdx_braces.js            # check — report only, exit 1 if issues
 *   node scripts/fix_mdx_braces.js --fix       # fix in-place
 *   node scripts/fix_mdx_braces.js reference/reports/reports-fields.mdx
 *   node scripts/fix_mdx_braces.js --fix reference/
 */

const fs = require('fs');
const path = require('path');

// Matches fenced code blocks: plain (```), indented, or inside list items (* ```)
const FENCE_RE = /^[\s*\->]*```/;
// Matches { followed by a JSON string-key pattern
const JSON_OPEN_RE = /\{\s*"[^"]+"\s*:/g;

const SKIP_DIRS = new Set(['node_modules', '.git', '.mintlify', '__pycache__']);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function isInInlineCode(line, pos) {
  let depth = 0;
  for (let i = 0; i < pos; i++) {
    if (line[i] === '`') depth++;
  }
  return depth % 2 === 1;
}

function findMatchingClose(text, openPos) {
  let depth = 0;
  for (let i = openPos; i < text.length; i++) {
    if (text[i] === '{') depth++;
    else if (text[i] === '}') {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function escapeJsonBracesInLine(line) {
  const toReplace = new Set();
  const re = new RegExp(JSON_OPEN_RE.source, 'g');
  let m;
  while ((m = re.exec(line)) !== null) {
    const start = m.index;
    if (isInInlineCode(line, start)) continue;
    if (line.slice(start, start + 7) === '&#123;') continue;
    const close = findMatchingClose(line, start);
    if (close === -1) continue;
    toReplace.add(start);
    toReplace.add(close);
  }

  if (toReplace.size === 0) return line;

  let out = '';
  for (let i = 0; i < line.length; i++) {
    if (toReplace.has(i)) {
      out += line[i] === '{' ? '&#123;' : '&#125;';
    } else {
      out += line[i];
    }
  }
  return out;
}

function hasBareBrace(line) {
  for (let i = 0; i < line.length; i++) {
    if (line[i] === '{' && !line.slice(i, i + 7).startsWith('&#123;') && !isInInlineCode(line, i)) {
      return true;
    }
  }
  return false;
}

// ---------------------------------------------------------------------------
// Block-level detection
// ---------------------------------------------------------------------------

function isStandaloneJsonOpen(lines, i) {
  if (lines[i].trim() !== '{') return false;
  for (let j = i + 1; j < Math.min(i + 8, lines.length); j++) {
    const nxt = lines[j].trim();
    if (nxt) {
      return /^"[\w_ -]+":\s/.test(nxt) || ['{', '}', '[', ']'].includes(nxt);
    }
  }
  return false;
}

function findBlockEnd(lines, start) {
  let depth = 0;
  for (let i = start; i < lines.length; i++) {
    for (const ch of lines[i]) {
      if (ch === '{') depth++;
      else if (ch === '}') {
        depth--;
        if (depth === 0) return i;
      }
    }
  }
  return start;
}

function cleanJsonBlock(rawLines) {
  return rawLines
    .map(l => l.replace(/\\_/g, '_').replace(/\\\[/g, '[').replace(/\\\]/g, ']').trimEnd())
    .filter(l => l.trim() !== '');
}

// ---------------------------------------------------------------------------
// File processor
// ---------------------------------------------------------------------------

function processFile(filepath, fix = false) {
  const text = fs.readFileSync(filepath, 'utf8');
  const lines = text.split('\n').map(l => l + '\n');
  // Handle files that don't end with newline
  if (lines.length > 0 && lines[lines.length - 1] === '\n' && !text.endsWith('\n')) {
    lines[lines.length - 1] = lines[lines.length - 1].slice(0, -1);
  }

  const issues = [];
  const newLines = [...lines];
  let inFence = false;
  let offset = 0;
  let i = 0;

  while (i < lines.length) {
    const raw = lines[i];
    const bare = raw.replace(/\n$/, '');

    // Fenced code block toggle
    if (FENCE_RE.test(bare)) {
      inFence = !inFence;
      i++;
      continue;
    }

    if (inFence) { i++; continue; }

    // Standalone JSON block
    if (isStandaloneJsonOpen(lines, i)) {
      const end = findBlockEnd(lines, i);
      const rawBlock = lines.slice(i, end + 1).map(l => l.replace(/\n$/, ''));
      const cleaned = cleanJsonBlock(rawBlock);
      issues.push({ lineno: i + 1, kind: 'block', desc: `standalone JSON block lines ${i + 1}–${end + 1}` });

      if (fix) {
        const replacement = ['```json\n', ...cleaned.map(l => l + '\n'), '```\n'];
        newLines.splice(i + offset, end - i + 1, ...replacement);
        offset += replacement.length - (end - i + 1);
      }

      i = end + 1;
      continue;
    }

    // Inline bare brace
    if (bare.includes('{')) {
      const re = new RegExp(JSON_OPEN_RE.source, 'g');
      const hasJsonBrace = [...bare.matchAll(re)].some(m => !isInInlineCode(bare, m.index));
      const hasAnyBare = hasBareBrace(bare);

      if (hasJsonBrace) {
        issues.push({ lineno: i + 1, kind: 'inline', desc: `inline JSON brace: ${bare.trim().slice(0, 80)}` });
        if (fix) {
          newLines[i + offset] = escapeJsonBracesInLine(raw);
        }
      } else if (hasAnyBare) {
        issues.push({ lineno: i + 1, kind: 'inline-ambiguous', desc: `possible JSX expression (not auto-fixed): ${bare.trim().slice(0, 80)}` });
      }
    }

    i++;
  }

  if (fix && issues.length > 0) {
    fs.writeFileSync(filepath, newLines.join(''), 'utf8');
  }

  return issues;
}

// ---------------------------------------------------------------------------
// File collection
// ---------------------------------------------------------------------------

function collectFiles(inputPaths) {
  const results = [];

  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (SKIP_DIRS.has(entry.name)) continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (/\.(md|mdx)$/.test(entry.name)) {
        results.push(full);
      }
    }
  }

  for (const p of inputPaths) {
    if (!fs.existsSync(p)) {
      console.error(`warning: '${p}' does not exist, skipping`);
      continue;
    }
    const stat = fs.statSync(p);
    if (stat.isFile()) {
      results.push(p);
    } else if (stat.isDirectory()) {
      walk(p);
    }
  }

  return results;
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

function main() {
  const argv = process.argv.slice(2);
  const fix = argv.includes('--fix');
  const paths = argv.filter(a => a !== '--fix');

  if (paths.length === 0) paths.push('.');

  const files = collectFiles(paths);
  if (files.length === 0) {
    console.log('No .md or .mdx files found.');
    process.exit(0);
  }

  let total = 0;
  let affected = 0;

  for (const filepath of files.sort()) {
    const issues = processFile(filepath, fix);
    if (issues.length === 0) continue;
    affected++;
    for (const { lineno, kind, desc } of issues) {
      total++;
      const tag = kind === 'inline-ambiguous' ? 'WARN ' : fix ? 'FIXED' : 'ISSUE';
      console.log(`[${tag}] ${filepath}:${lineno} — ${desc}`);
    }
  }

  console.log('');
  if (total === 0) {
    console.log('No issues found.');
    process.exit(0);
  }

  const verb = fix ? 'Fixed' : 'Found';
  console.log(`${verb} ${total} issue(s) across ${affected} file(s).`);
  process.exit(fix ? 0 : 1);
}

main();
