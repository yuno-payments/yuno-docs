const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const read = (rel) => fs.readFileSync(path.join(root, rel), "utf8");
const json = (rel) => JSON.parse(read(rel));

const conditionsPage = "reference/organizations/routing/routing-conditions.mdx";
const shapePage = "reference/organizations/routing/routing-resource-shape.mdx";
const routingSpecs = [
  ["create-routing", 2],
  ["update-routing", 2],
  ["retrieve-routing", 1],
  ["list-routings", 1],
];

function conditionNodes(node, found = []) {
  if (Array.isArray(node)) node.forEach((n) => conditionNodes(n, found));
  else if (node && typeof node === "object") {
    if (node.properties && node.properties.condition_type && node.properties.conditional) found.push(node.properties);
    Object.values(node).forEach((n) => conditionNodes(n, found));
  }
  return found;
}

test("the condition_type catalog has a CURRENCY row with the four operators and the cardinality rule", () => {
  const page = read(conditionsPage);
  const row = page.split("\n").find((l) => l.startsWith("| `CURRENCY` |"));
  assert.ok(row, "CURRENCY row in the catalog");
  for (const op of ["EQUAL", "NOT_EQUAL", "ONE_OF", "NOT_ONE_OF"]) assert.ok(row.includes(`\`${op}\``), op);
  assert.match(row, /ISO 4217/);
  assert.match(row, /exactly 1/);
  assert.match(row, /1 or more/);
  const lines = page.split("\n");
  const amount = lines.findIndex((l) => l.startsWith("| `AMOUNT` |"));
  assert.equal(lines[amount + 1], row, "CURRENCY row follows AMOUNT");
  assert.match(lines[amount], /`CURRENCY`/, "AMOUNT row cross-references CURRENCY");
});

test("no warning says CURRENCY is not a valid condition_type, and INSTALLMENTS stays in it", () => {
  const page = read(conditionsPage);
  const warnings = [...page.matchAll(/<Warning>([\s\S]*?)<\/Warning>/g)].map((m) => m[1]);
  const invalid = warnings.find((w) => /\*\*not\*\* (a )?valid standalone/.test(w));
  assert.ok(invalid, "standalone-type warning kept");
  assert.match(invalid, /`INSTALLMENTS`/);
  assert.doesNotMatch(invalid, /`CURRENCY`/);
});

test("the CURRENCY rules and the EQUAL read-back as AMOUNT are documented", () => {
  const page = read(conditionsPage);
  const bullet = page.split("\n").find((l) => l.startsWith("- **`CURRENCY`"));
  assert.ok(bullet, "CURRENCY special-case bullet");
  assert.match(bullet, /uppercase ISO 4217/i);
  assert.match(bullet, /`XXX`/);
  assert.match(bullet, /repeat/);
  assert.match(bullet, /`currency`/);
  assert.match(bullet, /`key`/);
  assert.match(bullet, /INVALID_ROUTE_CONFIGURATION/);
  assert.ok(bullet.includes('{ "condition_type": "AMOUNT", "conditional": "EQUAL", "values": [], "currency": "USD" }'), "EQUAL read-back form");
  assert.match(page, /"currency":\s+"<ISO 4217>",.*not sent on CURRENCY/);
  const amountOnly = page.split("\n").find((l) => l.startsWith("- **`AMOUNT` with an empty `values` list"));
  assert.match(amountOnly, /`CURRENCY`/, "currency-only AMOUNT bullet points to CURRENCY");
});

test("the resource shape page keeps only the currency-plus-amount dashboard condition read-only", () => {
  const page = read(shapePage);
  assert.doesNotMatch(page, /operator other than `EQUAL` or with several currencies has no `AMOUNT` form/);
  assert.match(page, /non-`EQUAL` currency operator with an amount range/);
  assert.match(page, /reads back as `CURRENCY`/);
});

test("every routing OpenAPI condition node lists CURRENCY and the subscription types, and forbids currency on CURRENCY", () => {
  for (const [slug, expected] of routingSpecs) {
    const spec = json(`openapi/organizations/routing/${slug}.json`);
    const nodes = conditionNodes(spec);
    assert.equal(nodes.length, expected, `${slug} condition nodes`);
    for (const props of nodes) {
      const desc = props.condition_type.description;
      for (const t of ["AMOUNT, CURRENCY,", "SUBSCRIPTION_RETRY,", "SUBSCRIPTION_RETRY_COUNT"]) assert.ok(desc.includes(t), `${slug}: ${t}`);
      assert.match(props.currency.description, /Not sent on CURRENCY/, `${slug} currency`);
      assert.match(props.values.description, /CURRENCY/, `${slug} values`);
    }
  }
});

test("the API changelog announces the CURRENCY condition in both files", () => {
  const title = "Currency routing conditions with NOT_EQUAL, ONE_OF and NOT_ONE_OF";
  const entry = json("changelog/source/api.json").releases.flatMap((r) => r.entries).find((e) => e.title === title);
  assert.ok(entry, "api.json entry");
  assert.equal(entry.type, "ADDED");
  assert.equal(entry.group, "Payments");
  assert.ok(entry.links.some((l) => l.url === "/reference/organizations/routing/routing-conditions"));
  const mdx = read("changelog/api.mdx");
  assert.ok(mdx.includes(`<ChangelogBadge type="added" /> **${title}**`), "api.mdx entry");
});

test("the edited pages keep their description frontmatter", () => {
  for (const rel of [conditionsPage, shapePage, "changelog/api.mdx"]) {
    assert.match(read(rel), /^---\n[\s\S]*?^description: .+$[\s\S]*?^---$/m, rel);
  }
});
