const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const read = (rel) => fs.readFileSync(path.join(root, rel), "utf8");
const json = (rel) => JSON.parse(read(rel));

const shapePage = "reference/organizations/routing/routing-resource-shape.mdx";
const listPage = "reference/organizations/routing/list-decline-groups.mdx";
const allowedStatuses = ["APPROVED", "DECLINED", "DECLINE_GROUP", "INTERNAL_ERROR", "SUCCEEDED_GROUP", "MAC_CODE_GROUP", "PENDING", "ISO_CODE_GROUP"];
const outputFields = new Set(["status", "decline_types", "group_id", "group_name", "retry", "next", "next_split"]);

function isoSection() {
  const page = read(shapePage);
  const start = page.indexOf("### ISO code groups");
  assert.ok(start >= 0, "ISO code groups section");
  const end = page.indexOf("\n### ", start + 1);
  return page.slice(start, end);
}

function jsonBlocks(text) {
  return [...text.matchAll(/```json[^\n]*\n([\s\S]*?)```/g)].map((m) => JSON.parse(m[1].replace(/"([0-9a-f]{8})-…"/g, '"$1"')));
}

function outputs(node, found = []) {
  if (Array.isArray(node)) node.forEach((n) => outputs(n, found));
  else if (node && typeof node === "object") {
    if (typeof node.status === "string" && ("next" in node || "group_id" in node || "decline_types" in node)) found.push(node);
    Object.values(node).forEach((n) => outputs(n, found));
  }
  return found;
}

test("ISO_CODE_GROUP is documented at parity with MAC_CODE_GROUP in the status enum and outcome groups tables", () => {
  const page = read(shapePage);
  const lines = page.split("\n");
  const enumRow = lines.find((l) => l.startsWith("| `ISO_CODE_GROUP` | Card decline"));
  assert.ok(enumRow, "status enum row");
  assert.match(enumRow, /ISO 8583/);
  assert.match(enumRow, /Card payments only/);
  const groupRow = lines.find((l) => l.startsWith("| `ISO_CODE_GROUP` | ISO code group"));
  assert.ok(groupRow, "outcome groups row");
  assert.match(groupRow, /`group_id`/);
  assert.match(groupRow, /`decline_types\[\]`/);
  assert.match(page, /group predicate on `DECLINE_GROUP`, `MAC_CODE_GROUP`, `ISO_CODE_GROUP`/);
});

test("the ISO section explains what it matches, how it is selected on Declined and its precedence", () => {
  const section = isoSection();
  assert.match(section, /\*\*What it matches\.\*\*.*ISO 8583 response code only/);
  assert.match(section, /`PROVIDER_STATUS`/);
  assert.match(section, /`MAC_CODE`/);
  assert.match(section, /\*\*How it is selected on a step's Declined output\.\*\*.*before the step's catch-all `DECLINED` entry/);
  assert.match(section, /\*\*Precedence\.\*\*.*`output\[\]` order and the first one that matches wins, whatever its type/);
});

test("the ISO section states card payments only, the 1 to 30 character format and case-insensitive comparison", () => {
  const section = isoSection();
  assert.match(section, /`ISO_CODE_GROUP` applies to card payments only/);
  assert.match(section, /free string of 1 to 30 characters after trimming/);
  assert.match(section, /compared without case/);
});

test("saved ISO groups are created in the dashboard, not through the public API", () => {
  assert.match(isoSection(), /Saved ISO code groups are created in the dashboard, not through the public API/);
  assert.match(read(listPage), /Saved ISO code groups are created in the dashboard, not through the public API/);
});

test("the request examples create ISO_CODE_GROUP outputs with decline_types and with group_id using only contract fields", () => {
  const blocks = jsonBlocks(isoSection());
  const iso = outputs(blocks).filter((o) => o.status === "ISO_CODE_GROUP");
  const withCodes = iso.find((o) => Array.isArray(o.decline_types) && !("group_id" in o));
  const withGroup = iso.find((o) => Number.isInteger(o.group_id) && !("decline_types" in o));
  assert.deepEqual(withCodes.decline_types, ["51", "9G"]);
  assert.equal(withGroup.group_id, 5120);
  for (const o of outputs(blocks)) {
    assert.ok(allowedStatuses.includes(o.status), o.status);
    for (const k of Object.keys(o)) assert.ok(outputFields.has(k), `output field ${k}`);
  }
  for (const body of blocks.filter((b) => b.default_route)) {
    assert.equal(body.payment_method, "CARD");
    assert.ok(body.account_id);
  }
});

test("the list decline groups example returns an ISO_CODE_GROUP group with its codes in the contract shape", () => {
  const page = read(listPage);
  const [list] = jsonBlocks(page.slice(page.indexOf("```json 200 OK")));
  const group = list.find((g) => g.type === "ISO_CODE_GROUP");
  assert.ok(group, "ISO group in example");
  assert.deepEqual(Object.keys(group).sort(), ["decline_types", "id", "name", "type"]);
  assert.deepEqual(group.decline_types, ["51", "9G"]);
  const spec = json("openapi/organizations/routing/list-decline-groups.json");
  assert.match(JSON.stringify(spec), /"enum":\["DECLINE_GROUP","MAC_CODE_GROUP","ISO_CODE_GROUP"\]/);
  for (const g of list) assert.ok(["DECLINE_GROUP", "MAC_CODE_GROUP", "ISO_CODE_GROUP"].includes(g.type));
});

test("every routing OpenAPI output status description lists ISO_CODE_GROUP", () => {
  for (const slug of ["create-routing", "update-routing", "retrieve-routing", "list-routings"]) {
    const text = read(`openapi/organizations/routing/${slug}.json`);
    assert.match(text, /DECLINE_GROUP, MAC_CODE_GROUP, ISO_CODE_GROUP, SUCCEEDED_GROUP/, slug);
  }
});

test("the edited pages keep their description frontmatter", () => {
  for (const rel of [shapePage, listPage]) {
    assert.match(read(rel), /^---\n[\s\S]*?^description: .+$[\s\S]*?^---$/m, rel);
  }
});
