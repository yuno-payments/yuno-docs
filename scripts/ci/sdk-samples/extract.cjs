#!/usr/bin/env node
// Extracts SDK code samples from MDX pages into compilable harness projects.
//
// Usage:
//   node scripts/ci/sdk-samples/extract.cjs [--out DIR] [--target web|ios|android]
//        [--source docs/page.mdx=/path/to/other.mdx]
//
// For each target, copies harness/<target>/ to <out>/<target>/ and writes every
// block from snippets.json into it at `dest`. Block selection is deterministic:
// a fence matches when its language equals `lang`, it sits inside the <Tab> whose
// title equals `tab` (when given) and its body contains `contains`. Each selector
// must match exactly one fence; zero or several matches fail the run, so a page
// edit that moves or duplicates a sample cannot silently skip the check.
// The MDX is never modified.
//
// Also writes <out>/versions.env (WEB_SDK_VERSION, IOS_SDK_VERSION, ...) and, on
// GitHub Actions, appends the same keys in lowercase to $GITHUB_OUTPUT.

'use strict';
const fs = require('fs');
const path = require('path');

const HERE = __dirname;
const REPO = path.resolve(HERE, '..', '..', '..');

function parseArgs(argv) {
  const args = { out: path.join(REPO, '.sdk-samples-build'), target: null, sources: {} };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--out') args.out = path.resolve(argv[++i]);
    else if (a === '--target') args.target = argv[++i];
    else if (a === '--source') {
      const [k, v] = argv[++i].split('=');
      args.sources[k] = path.resolve(v);
    } else throw new Error(`unknown argument: ${a}`);
  }
  return args;
}

// Returns [{lang, meta, tab, startLine, body}] for every fenced block.
function parseFences(text) {
  const lines = text.split('\n');
  const fences = [];
  let tab = null;
  let open = null;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (open) {
      const close = line.match(/^\s*(`{3,}|~{3,})\s*$/);
      if (close && close[1][0] === open.marker[0] && close[1].length >= open.marker.length) {
        fences.push({ lang: open.lang, meta: open.meta, tab, startLine: open.line + 1, body: open.body.join('\n') });
        open = null;
      } else {
        open.body.push(line);
      }
      continue;
    }
    const fence = line.match(/^\s*(`{3,}|~{3,})([^\s`]*)\s*(.*)$/);
    if (fence) {
      open = { marker: fence[1], lang: fence[2].toLowerCase(), meta: fence[3], line: i, body: [] };
      continue;
    }
    const tabOpen = line.match(/<Tab\s+title=["']([^"']+)["']/);
    if (tabOpen) tab = tabOpen[1];
    if (/<\/Tab>/.test(line)) tab = null;
  }
  if (open) throw new Error(`unclosed code fence starting at line ${open.line + 1}`);
  return fences;
}

// Strips the common leading indentation (MDX nests samples inside <Tab>).
function dedent(body) {
  const lines = body.split('\n');
  const indents = lines.filter((l) => l.trim()).map((l) => l.match(/^[ \t]*/)[0].length);
  const n = indents.length ? Math.min(...indents) : 0;
  return lines.map((l) => (l.trim() ? l.slice(n) : '')).join('\n').replace(/\s+$/, '') + '\n';
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const config = JSON.parse(fs.readFileSync(path.join(HERE, 'snippets.json'), 'utf8'));
  const readSource = (file) => fs.readFileSync(args.sources[file] || path.join(REPO, file), 'utf8');

  const targets = Object.keys(config.targets).filter((t) => !args.target || t === args.target);
  if (!targets.length) throw new Error(`unknown target: ${args.target}`);

  const versions = {};
  for (const t of targets) {
    const v = config.targets[t].version || {};
    let version = v.default;
    if (v.file && v.regex) {
      const m = readSource(v.file).match(new RegExp(v.regex));
      if (!m) throw new Error(`${t}: version regex /${v.regex}/ found nothing in ${v.file}`);
      version = m[1];
    }
    if (!version) throw new Error(`${t}: no SDK version configured`);
    versions[t] = version;

    const dir = path.join(args.out, t);
    fs.rmSync(dir, { recursive: true, force: true });
    fs.cpSync(path.join(HERE, 'harness', t), dir, { recursive: true });
  }

  const cache = {};
  let failed = false;
  for (const block of config.blocks) {
    if (!targets.includes(block.target)) continue;
    cache[block.file] = cache[block.file] || parseFences(readSource(block.file));
    const matches = cache[block.file].filter(
      (f) =>
        f.lang === block.lang.toLowerCase() &&
        (block.tab === undefined || f.tab === block.tab) &&
        (block.contains === undefined || f.body.includes(block.contains)),
    );
    if (matches.length !== 1) {
      const where = matches.map((m) => `line ${m.startLine}`).join(', ') || 'none';
      console.error(`::error file=${block.file}::${block.id}: expected exactly 1 matching ${block.lang} fence, found ${matches.length} (${where})`);
      failed = true;
      continue;
    }
    const dest = path.join(args.out, block.target, block.dest);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, (block.prepend || '') + dedent(matches[0].body));
    console.log(`${block.id}: ${block.file}:${matches[0].startLine} -> ${path.relative(REPO, dest)}`);
  }
  if (failed) process.exit(1);

  // Merge with an existing versions.env so per-target runs do not drop each other's keys.
  const envFile = path.join(args.out, 'versions.env');
  const merged = {};
  if (fs.existsSync(envFile)) {
    for (const line of fs.readFileSync(envFile, 'utf8').split('\n')) {
      const m = line.match(/^([A-Z_]+)=(.*)$/);
      if (m) merged[m[1]] = m[2];
    }
  }
  for (const [t, v] of Object.entries(versions)) merged[`${t.toUpperCase()}_SDK_VERSION`] = v;
  const env = Object.entries(merged).map(([k, v]) => `${k}=${v}`).join('\n') + '\n';
  fs.mkdirSync(args.out, { recursive: true });
  fs.writeFileSync(envFile, env);
  if (process.env.GITHUB_OUTPUT) {
    const out = Object.entries(versions).map(([t, v]) => `${t}_sdk_version=${v}`).join('\n') + '\n';
    fs.appendFileSync(process.env.GITHUB_OUTPUT, out);
  }
  process.stdout.write(env);
}

try {
  main();
} catch (e) {
  console.error(`::error::${e.message}`);
  process.exit(1);
}
