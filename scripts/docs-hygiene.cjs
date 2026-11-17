#!/usr/bin/env node
/**
 * Page hygiene report and deterministic fixes for the Yuno docs (layer L4).
 *
 * Why: the redesign needs a cheap, repeatable check that every in-scope page
 * has a usable description and title, no third-party video or JSX imports, and
 * no stale redirect links. The fixes are limited to what a reviewer verifies
 * in seconds: fence language tags and link path rewrites.
 *
 * Scope: every page of every docs.json tab except "API Reference", resolved to
 * <path>.mdx or <path>.md, never anything under reference/.
 *
 * Usage: node scripts/docs-hygiene.cjs --report   (writes scripts/docs-hygiene-report.md)
 *        node scripts/docs-hygiene.cjs --fix      (rewrites in-scope files, prints "fixed <n> files")
 *        add --root <dir> to run against another checkout (used by tests)
 *
 * --fix never touches docs.json, redirects.json, reference/, frontmatter, or
 * text inside fenced code blocks.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const API_TAB = "API Reference";

function collect(items, out) {
  for (const it of items || []) {
    if (typeof it === "string") out.push(it);
    else if (it && typeof it === "object") {
      if (typeof it.root === "string") out.push(it.root);
      collect(it.pages, out);
      collect(it.groups, out);
    }
  }
}

function inScopePages(docsJson, opts = {}) {
  const out = [];
  for (const tab of docsJson.navigation.tabs) {
    if (tab.tab === API_TAB) continue;
    if (opts.skipHiddenTabs && tab.hidden === true) continue;
    collect(tab.groups, out);
    collect(tab.pages, out);
  }
  const seen = new Set();
  return out.filter((p) => {
    if (p.startsWith("reference/") || seen.has(p)) return false;
    seen.add(p);
    return true;
  });
}

const FENCE_OPEN = /^(\s*)(`{3,}|~{3,})(.*)$/;

// Calls onLine(line) for prose lines (outside fences and frontmatter) and
// onFence(openLine, bodyLines) for each fence; returns the rebuilt text.
function walk(mdx, onLine, onFence) {
  const lines = mdx.split("\n");
  const out = [];
  let i = 0;
  if (lines[0] === "---") {
    let j = 1;
    while (j < lines.length && lines[j] !== "---") j++;
    if (j < lines.length) {
      out.push(...lines.slice(0, j + 1));
      i = j + 1;
    }
  }
  while (i < lines.length) {
    const m = lines[i].match(FENCE_OPEN);
    if (!m) {
      out.push(onLine(lines[i]));
      i++;
      continue;
    }
    const mark = m[2];
    let j = i + 1;
    while (j < lines.length) {
      const c = lines[j].match(/^\s*(`{3,}|~{3,})\s*$/);
      if (c && c[1][0] === mark[0] && c[1].length >= mark.length) break;
      j++;
    }
    const body = lines.slice(i + 1, j);
    out.push(onFence(lines[i], body, m));
    out.push(...body);
    if (j < lines.length) out.push(lines[j]);
    i = j + 1;
  }
  return out.join("\n");
}

function tagFences(mdx) {
  // onFence returns the (possibly retagged) opening line; body is re-appended by walk.
  return walk(mdx, (l) => l, (open, body, m) => {
    const info = m[3].trim();
    const first = info.split(/\s+/)[0];
    if (first && !first.includes("=")) return open; // already has a language token
    const firstLine = (body.find((l) => l.trim() !== "") || "").trim();
    let lang = null;
    if (/^[{[]/.test(firstLine)) lang = "json";
    else if (/^curl\b/.test(firstLine)) lang = "bash";
    else if (/^<[A-Za-z]/.test(firstLine)) lang = "html";
    if (!lang) return open;
    return m[1] + m[2] + lang + (info ? " " + info : "");
  });
}

function resolveRedirect(p, map) {
  const seen = new Set();
  let cur = p;
  while (map.has(cur) && !seen.has(cur)) {
    seen.add(cur);
    const next = map.get(cur);
    if (!next.startsWith("/")) return p; // external destination: leave the link alone
    cur = next;
  }
  return cur;
}

function rewriteRedirectLinks(mdx, redirects) {
  const map = new Map();
  for (const r of redirects) {
    if (r && typeof r.source === "string" && typeof r.destination === "string") {
      map.set(r.source.replace(/(.)\/$/, "$1"), r.destination);
    }
  }
  // Split each line on inline code spans so backticked text is never rewritten.
  const fix = (seg) =>
    seg
      .replace(/(\]\()(\/(?!\/)[^)\s#?"]*)([#?][^)\s]*)?(?=[)\s])/g, (all, pre, p, tail) => rewrite(all, pre, p, tail))
      .replace(/(href=")(\/(?!\/)[^"#?\s]*)([#?][^"]*)?(?=")/g, (all, pre, p, tail) => rewrite(all, pre, p, tail));
  const rewrite = (all, pre, p, tail) => {
    const key = p.replace(/(.)\/$/, "$1");
    const dest = resolveRedirect(key, map);
    return dest === key ? all : pre + dest + (tail || "");
  };
  return walk(
    mdx,
    (line) => line.split(/(`[^`]*`)/).map((s, i) => (i % 2 ? s : fix(s))).join(""),
    (open) => open
  );
}

const BLOCK_SCALARS = new Set([">-", ">", "|", "|-"]);

function frontmatter(mdx) {
  const m = mdx.match(/^---\n([\s\S]*?)\n---/);
  const fm = {};
  if (!m) return fm;
  const lines = m[1].split("\n");
  for (let i = 0; i < lines.length; i++) {
    const k = lines[i].match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (!k) continue;
    let value = k[2].trim();
    if (BLOCK_SCALARS.has(value)) {
      // YAML block scalar: the value is the following indented lines, joined with single spaces.
      const parts = [];
      while (i + 1 < lines.length && (/^\s+\S/.test(lines[i + 1]) || lines[i + 1].trim() === "")) {
        i++;
        if (lines[i].trim()) parts.push(lines[i].trim());
      }
      value = parts.join(" ");
    }
    fm[k[1]] = value.replace(/^(["'])(.*)\1$/, "$2");
  }
  return fm;
}

function reportPage(page, mdx, nav) {
  const res = [];
  const add = (rule, detail) => res.push({ rule, detail });
  const fm = frontmatter(mdx);
  const desc = fm.description;
  if (desc === undefined || desc === "") add("description-missing", "no description in frontmatter");
  else if (desc.length < 50) add("description-short", desc.length + " chars: " + desc);
  if (fm.title && fm.title.length > 32 && !fm.sidebarTitle) add("title-long", fm.title.length + " chars, no sidebarTitle");
  // body rules ignore fenced code and frontmatter
  const prose = [];
  walk(mdx, (l) => (prose.push(l), l), (o) => o);
  const body = prose.join("\n");
  if (body.includes("github.com/writechoiceorg/yuno-images")) add("third-party-video", "asset hosted on github.com/writechoiceorg/yuno-images");
  const imp = body.match(/^import\b.*\.jsx["'].*$/m);
  if (imp) add("jsx-import", imp[0].trim());
  const exp = body.match(/^export const\b.*$/m);
  if (exp) add("export-const", exp[0].trim().slice(0, 60));
  // tabs with "hidden": true in docs.json are hidden by design (In-Person), so their pages are not flagged
  if (nav && fm.hidden === "true" && inScopePages(nav, { skipHiddenTabs: true }).includes(page)) add("hidden-in-nav", "frontmatter hidden: true but listed in docs.json");
  if (page.startsWith("docs/sdks/") && !/^import\s+LegacySdkNotice\b/m.test(body)) add("legacy-no-notice", "no LegacySdkNotice import");
  return res;
}

function resolveFile(root, page) {
  for (const ext of [".mdx", ".md"]) {
    const f = path.join(root, page + ext);
    if (fs.existsSync(f)) return f;
  }
  return null;
}

function loadRedirects(root, docs) {
  if (Array.isArray(docs.redirects)) return docs.redirects;
  const f = path.join(root, "redirects.json");
  return fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, "utf8")) : [];
}

const RULES = ["description-missing", "description-short", "title-long", "third-party-video", "jsx-import", "export-const", "hidden-in-nav", "legacy-no-notice", "nav-no-file"];
const RULE_NOTES = { "hidden-in-nav": " (tabs hidden by design excluded)" };

function main(argv) {
  const ri = argv.indexOf("--root");
  const root = ri >= 0 ? path.resolve(argv[ri + 1]) : ROOT;
  const docs = JSON.parse(fs.readFileSync(path.join(root, "docs.json"), "utf8"));
  const pages = inScopePages(docs);
  if (argv.includes("--fix")) {
    const redirects = loadRedirects(root, docs);
    let n = 0;
    for (const p of pages) {
      const f = resolveFile(root, p);
      if (!f) continue;
      const src = fs.readFileSync(f, "utf8");
      const next = rewriteRedirectLinks(tagFences(src), redirects);
      if (next !== src) {
        fs.writeFileSync(f, next);
        n++;
      }
    }
    console.log("fixed " + n + " files");
    return 0;
  }
  if (argv.includes("--report")) {
    const rows = [];
    for (const p of pages) {
      const f = resolveFile(root, p);
      if (!f) {
        rows.push({ page: p, rule: "nav-no-file", detail: "no .mdx or .md file for this nav entry" });
        continue;
      }
      for (const r of reportPage(p, fs.readFileSync(f, "utf8"), docs)) rows.push({ page: p, ...r });
    }
    rows.sort((a, b) => a.page.localeCompare(b.page) || a.rule.localeCompare(b.rule));
    const out = ["# Docs hygiene report", "", "Generated " + new Date().toISOString().slice(0, 10) + ", in-scope pages: " + pages.length, ""];
    for (const r of RULES) out.push("- " + r + ": " + rows.filter((x) => x.rule === r).length + (RULE_NOTES[r] || ""));
    out.push("", "| Page | Rule | Detail |", "| --- | --- | --- |");
    for (const r of rows) out.push("| " + r.page + " | " + r.rule + " | " + r.detail.replace(/\|/g, "\\|") + " |");
    fs.writeFileSync(path.join(root, "scripts", "docs-hygiene-report.md"), out.join("\n") + "\n");
    console.log("wrote report: " + pages.length + " pages, " + rows.length + " findings");
    return 0;
  }
  console.error("usage: docs-hygiene.cjs --report | --fix [--root <dir>]");
  return 1;
}

if (require.main === module) process.exit(main(process.argv.slice(2)));
module.exports = { inScopePages, tagFences, rewriteRedirectLinks, frontmatter, reportPage, main };
