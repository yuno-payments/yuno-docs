#!/usr/bin/env node
// Yuno Web SDK 1.6 -> 1.11 pre-upgrade check for merchant custom CSS/JS.
// Usage: node yuno-upgrade-check.mjs <file-or-dir> [...more]
// Scans .css .scss .less .js .ts .jsx .tsx .html .vue .liquid for yuno-* / Yuno-* names and
// reports, per hit, what happens to that name on SDK 1.11. Exit code 1 when something breaks.
import fs from 'node:fs'; import path from 'node:path';
const MAP = JSON.parse(fs.readFileSync(new URL('./rename-map.json', import.meta.url), 'utf8'));
const EXT = new Set(['.css','.scss','.less','.js','.mjs','.ts','.jsx','.tsx','.html','.vue','.liquid','.hbs']);
const SKIP = /node_modules|\.git\/|dist\/|build\//;
const files = [];
const walk = p => { const st = fs.statSync(p); if (st.isDirectory()) { for (const f of fs.readdirSync(p)) { const q = path.join(p, f); if (!SKIP.test(q + '/')) walk(q); } } else if (EXT.has(path.extname(p))) files.push(p); };
process.argv.slice(2).forEach(walk);
const rows = []; const seen = new Set();
for (const f of files) {
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  lines.forEach((line, i) => {
    for (const m of line.matchAll(/\b[yY]uno-[A-Za-z0-9_-]+/g)) {
      const name = m[0]; const e = MAP.names[name];
      // longest-prefix fallback for BEM modifiers the map did not list (e.g. yuno-status__title--small)
      const base = e ? name : Object.keys(MAP.names).filter(k => name.startsWith(k)).sort((a, b) => b.length - a.length)[0];
      const entry = e || (base && MAP.names[base]);
      let status, action;
      if (!entry) { status = 'not-sdk'; action = 'not a Yuno SDK 1.6 name: likely your own id/class, no change'; }
      else if (entry.status === 'renamed') { status = 'BREAKS'; action = `rename to ${name.replace(base, entry.to)}`; }
      else if (entry.status === 'removed') { status = 'BREAKS'; action = 'element no longer exists under this name in 1.11: re-check the selector on the 1.11 DOM'; }
      else if (entry.status === 'vtex-layer') { status = 'ok'; action = 'VTEX layer name, unchanged'; }
      else { status = 'ok'; action = 'unchanged (alias kept)'; }
      if (entry && entry.note && status === 'BREAKS') action += ` (${entry.note})`;
      const key = `${f}:${i + 1}:${name}`; if (seen.has(key)) continue; seen.add(key);
      rows.push({ file: f, line: i + 1, name, status, action });
    }
  });
}
const breaks = rows.filter(r => r.status === 'BREAKS');
for (const r of rows) console.log(`${r.status.padEnd(7)} ${r.file}:${r.line}  ${r.name}  ->  ${r.action}`);
console.log(`\n${files.length} files scanned, ${rows.length} Yuno-looking names, ${breaks.length} break on 1.11.`);
console.log(breaks.length ? 'Fix the BREAKS lines before the upgrade, then test on sandbox (SDK 1.11).' : 'Nothing here depends on the old names.');
process.exit(breaks.length ? 1 : 0);
