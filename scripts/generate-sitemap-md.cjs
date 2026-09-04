#!/usr/bin/env node
/**
 * Generates sitemap.md at the repo root from docs.json navigation.
 *
 * Why: the Vercel Agent Readability spec asks for a markdown sitemap at
 * /sitemap.md with headings and links that mirror the site structure
 * (https://vercel.com/kb/guide/agent-readability-spec). Mintlify serves root
 * .md files as pages, so sitemap.md is reachable at https://docs.y.uno/sitemap.md.
 *
 * Usage: node scripts/generate-sitemap-md.cjs        (writes sitemap.md)
 *        node scripts/generate-sitemap-md.cjs --check (exits 1 if out of date)
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SITE = "https://docs.y.uno";
const docs = JSON.parse(fs.readFileSync(path.join(ROOT, "docs.json"), "utf8"));

function pageTitle(page) {
  for (const ext of [".mdx", ".md"]) {
    const file = path.join(ROOT, page + ext);
    if (fs.existsSync(file)) {
      const head = fs.readFileSync(file, "utf8").slice(0, 2000);
      const m = head.match(/^title:\s*["']?(.+?)["']?\s*$/m);
      if (m) return m[1].trim();
    }
  }
  return page.split("/").pop();
}

const out = [];
out.push("---");
out.push('title: "Sitemap"');
out.push('description: "Markdown sitemap of the Yuno documentation: every page grouped by section, with links to the markdown version of each page."');
out.push("---");
out.push("");
out.push("Every page of the Yuno documentation, grouped by tab and section. Each link points to the markdown version of the page. The machine index is at [llms.txt](" + SITE + "/llms.txt) and the XML sitemap at [sitemap.xml](" + SITE + "/sitemap.xml).");
out.push("");

let count = 0;
function emitPages(pages, depth) {
  for (const p of pages) {
    if (typeof p === "string") {
      out.push("- [" + pageTitle(p) + "](" + SITE + "/" + p + ".md)");
      count++;
    } else if (p && typeof p === "object" && p.pages) {
      out.push("");
      out.push("#".repeat(Math.min(depth, 6)) + " " + p.group);
      out.push("");
      emitPages(p.pages, depth + 1);
    }
  }
}

function walkContainer(container, depth) {
  const keys = ["tabs", "anchors", "dropdowns", "versions", "languages"];
  for (const k of keys) {
    if (Array.isArray(container[k])) {
      for (const item of container[k]) {
        const label = item.tab || item.anchor || item.dropdown || item.version || item.language;
        if (label) {
          out.push("");
          out.push("#".repeat(Math.min(depth, 6)) + " " + label);
        }
        walkContainer(item, depth + 1);
      }
    }
  }
  if (Array.isArray(container.groups)) {
    for (const g of container.groups) {
      out.push("");
      out.push("#".repeat(Math.min(depth, 6)) + " " + g.group);
      out.push("");
      emitPages(g.pages || [], depth + 1);
    }
  }
  if (Array.isArray(container.pages)) emitPages(container.pages, depth);
}

walkContainer(docs.navigation, 2);
out.push("");
const body = out.join("\n").replace(/\n{3,}/g, "\n\n");

const target = path.join(ROOT, "sitemap.md");
if (process.argv.includes("--check")) {
  const current = fs.existsSync(target) ? fs.readFileSync(target, "utf8") : "";
  if (current !== body) {
    console.error("sitemap.md is out of date. Run: node scripts/generate-sitemap-md.cjs");
    process.exit(1);
  }
  console.log("sitemap.md is up to date (" + count + " pages).");
} else {
  fs.writeFileSync(target, body);
  console.log("Wrote sitemap.md with " + count + " pages.");
}
