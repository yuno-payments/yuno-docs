const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const read = (rel) => fs.readFileSync(path.join(root, rel), "utf8");
const json = (rel) => JSON.parse(read(rel));

const STATUSES = ["LIABILITY_SHIFTED", "LIABILITY_NOT_SHIFTED", "LIABILITY_NOT_REPORTED"];
const LANGS = ["", "es/"];
const shape = (lang) => `${lang}reference/organizations/routing/routing-resource-shape.mdx`;
const endpoints = ["create-routing", "update-routing", "retrieve-routing", "list-routings"];
const specCounts = { "create-routing": 2, "update-routing": 2, "retrieve-routing": 1, "list-routings": 1 };
const anchor = "routing-resource-shape#liability-shift-outputs";

function section(page, heading) {
  const start = page.indexOf(heading);
  assert.ok(start >= 0, heading);
  const rest = page.slice(start + heading.length);
  const end = rest.search(/\n### /);
  return end < 0 ? rest : rest.slice(0, end);
}

function statusNodes(node, found = []) {
  if (Array.isArray(node)) node.forEach((n) => statusNodes(n, found));
  else if (node && typeof node === "object") {
    if (node.properties && node.properties.status && node.properties.next) found.push(node.properties.status);
    Object.values(node).forEach((n) => statusNodes(n, found));
  }
  return found;
}

test("[spec:status-reference] the resource shape page has one status row per liability shift status, the 3DS kind lists them, and a fallback section with an example", () => {
  for (const lang of LANGS) {
    const page = read(shape(lang));
    const lines = page.split("\n");
    for (const s of STATUSES) {
      const rows = lines.filter((l) => l.startsWith(`| \`${s}\` |`) && l.includes("APPROVED") && l.includes("#liability-shift-outputs"));
      assert.ok(rows.length >= 1, `${lang} status row ${s}`);
    }
    const kind = lines.find((l) => l.startsWith("| `THREE_D_SECURE` |"));
    for (const s of STATUSES) assert.ok(kind.includes(`\`${s}\``), `${lang} 3DS kind ${s}`);
    for (const other of ["| `PAYMENT` |", "| `FRAUD` |", "| `AUTHENTICATION` |"]) {
      const row = lines.find((l) => l.startsWith(other));
      for (const s of STATUSES) assert.ok(!row.includes(s), `${lang} ${other} excludes ${s}`);
    }
    const heading = lang ? "### Outputs de liability shift {#liability-shift-outputs}" : "### Liability shift outputs";
    const body = section(page, heading);
    assert.match(body, /`APPROVED`/);
    const examples = [...body.matchAll(/```json\n([\s\S]*?)```/g)];
    assert.equal(examples.length, 1, `${lang} one request example`);
    const steps = JSON.parse(examples[0][1].replace(/…/g, "")).default_route.steps;
    assert.equal(steps[0].provider_id, "NETCETERA_3DS");
    const statuses = steps[0].output.map((o) => o.status);
    for (const s of STATUSES) assert.ok(statuses.includes(s), `${lang} example uses ${s}`);
  }
});

test("[spec:status-reference] Create, Update, Retrieve and List Routing list the three statuses as 3DS-only", () => {
  for (const lang of LANGS) {
    for (const slug of endpoints) {
      const page = read(`${lang}reference/organizations/routing/${slug}.mdx`);
      for (const s of STATUSES) assert.ok(page.includes(`\`${s}\``), `${lang}${slug} ${s}`);
      assert.match(page, lang ? /pasos de proveedor 3DS/ : /3DS provider steps/, `${lang}${slug} 3DS rule`);
      assert.ok(page.includes(anchor), `${lang}${slug} links to the section`);
    }
  }
});

test("[spec:errors] the rejections of the liability shift statuses answer 400 INVALID_ROUTE_CONFIGURATION", () => {
  for (const lang of LANGS) {
    const heading = lang ? "### Outputs de liability shift {#liability-shift-outputs}" : "### Liability shift outputs";
    const body = section(read(shape(lang)), heading);
    const rules = body.split("\n").filter((l) => l.startsWith("- ") && l.includes("400 INVALID_ROUTE_CONFIGURATION"));
    assert.ok(rules.some((l) => /3DS/.test(l)), `${lang} not-3DS rejection`);
    assert.ok(rules.some((l) => l.includes("`group_id`") && l.includes("`decline_types[]`") && l.includes("`retry: true`")), `${lang} attribute rejection`);
    for (const slug of ["create-routing", "update-routing"]) {
      const row = read(`${lang}reference/organizations/routing/${slug}.mdx`).split("\n").find((l) => l.includes("`INVALID_ROUTE_CONFIGURATION`<br"));
      for (const s of STATUSES) assert.ok(row.includes(s), `${lang}${slug} error row ${s}`);
      for (const f of ["`group_id`", "`decline_types`", "`retry: true`"]) assert.ok(row.includes(f), `${lang}${slug} error row ${f}`);
    }
  }
});

test("[spec:openapi] every routing OpenAPI status field, English, Spanish and root, lists the three statuses", () => {
  for (const base of ["openapi/organizations/routing", "openapi/es/organizations/routing"]) {
    for (const slug of endpoints) {
      const nodes = statusNodes(json(`${base}/${slug}.json`));
      assert.equal(nodes.length, specCounts[slug], `${base}/${slug} status nodes`);
      for (const n of nodes) for (const s of STATUSES) assert.ok(n.description.includes(s), `${base}/${slug} ${s}`);
    }
  }
  const rootNodes = statusNodes(json("openapi.json")).filter((n) => /^APPROVED, DECLINED, DECLINE_GROUP/.test(n.description || ""));
  assert.equal(rootNodes.length, 6, "root openapi.json routing status nodes");
  for (const n of rootNodes) for (const s of STATUSES) assert.ok(n.description.includes(s), `openapi.json ${s}`);
  const yaml = read("openapi.yaml");
  assert.equal((yaml.match(/LIABILITY_SHIFTED, LIABILITY_NOT_SHIFTED and LIABILITY_NOT_REPORTED/g) || []).length, 6, "openapi.yaml");
});

test("[spec:changelog] the API changelog has an ADDED Payments entry for the statuses in English and Spanish", () => {
  const entry = json("changelog/source/api.json").releases.flatMap((r) => r.entries).find((e) => e.title === "Liability shift outputs on 3DS routing steps");
  assert.ok(entry, "api.json entry");
  assert.equal(entry.type, "ADDED");
  assert.equal(entry.group, "Payments");
  for (const s of STATUSES) assert.ok(entry.description.includes(s), s);
  assert.ok(entry.links.some((l) => l.url.startsWith("/reference/organizations/routing/routing-resource-shape")));
  const en = read("changelog/api.mdx");
  assert.ok(en.includes(`<ChangelogBadge type="added" /> **${entry.title}**`), "api.mdx entry");
  assert.ok(en.includes(entry.description), "api.mdx description matches the source");
  const es = read("es/changelog/api.mdx");
  const esLine = es.split("\n").findIndex((l) => l.includes('<ChangelogBadge type="added" /> **Outputs de liability shift'));
  assert.ok(esLine >= 0, "es api.mdx entry");
  const esBlock = es.split("\n").slice(esLine, esLine + 3).join("\n");
  for (const s of STATUSES) assert.ok(esBlock.includes(s), `es ${s}`);
  assert.ok(esBlock.includes("/es/reference/organizations/routing/routing-resource-shape"), "es link");
});

test("[spec:provider-behaviour] the 3DS guide says the value can drive a routing and sets per-provider expectations", () => {
  for (const lang of LANGS) {
    const page = read(`${lang}docs/security-and-compliance/3d-secure.mdx`);
    const heading = lang ? "### Enrutar según el liability shift" : "### Route by liability shift";
    const body = section(page, heading);
    assert.ok(body.includes(`/${lang}reference/organizations/routing/${anchor}`.replace("//", "/")), `${lang} routing link`);
    for (const s of STATUSES) assert.ok(body.includes(s), `${lang} ${s}`);
    const rows = body.split("\n");
    assert.match(rows.find((l) => l.startsWith("| `NETCETERA_3DS` |")), /\| `false` \|/);
    assert.match(rows.find((l) => l.startsWith("| `CHECKOUT_3DS` |")), lang ? /\| Sin valor \|/ : /\| No value \|/);
    const none = rows.find((l) => l.startsWith("| `CYBERSOURCE_3DS`, `NTTDATA_3DS` |"));
    assert.ok(none, `${lang} CYBERSOURCE/NTTDATA row`);
    assert.doesNotMatch(none, /`true`|`false`/);
    const advice = rows.find((l) => l.includes("`LIABILITY_NOT_SHIFTED`") && l.includes("`LIABILITY_NOT_REPORTED`") && l.includes("`CYBERSOURCE_3DS`"));
    assert.ok(advice, `${lang} connect-both advice`);
  }
});

test("[spec:languages] English and Spanish carry the same liability shift changes", () => {
  const files = [
    ...endpoints.map((s) => `reference/organizations/routing/${s}.mdx`),
    "reference/organizations/routing/routing-resource-shape.mdx",
    "docs/security-and-compliance/3d-secure.mdx",
    "changelog/api.mdx",
  ];
  const count = (s) => (s.match(/LIABILITY_(NOT_)?(SHIFTED|REPORTED)/g) || []).length;
  for (const rel of files) assert.equal(count(read(`es/${rel}`)), count(read(rel)), rel);
  for (const slug of endpoints) {
    assert.equal(count(read(`openapi/es/organizations/routing/${slug}.json`)), count(read(`openapi/organizations/routing/${slug}.json`)), slug);
  }
});
