const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const read = (rel) => fs.readFileSync(path.join(root, rel), "utf8");
const json = (rel) => JSON.parse(read(rel));

const en = "reference/organizations/routing/";
const es = "es/reference/organizations/routing/";
const shapePage = `${en}routing-resource-shape.mdx`;
const listPage = `${en}list-decline-groups.mdx`;
const esShapePage = `${es}routing-resource-shape.mdx`;
const esListPage = `${es}list-decline-groups.mdx`;
const routingSpecs = ["create-routing", "update-routing", "retrieve-routing", "list-routings"];

function section(rel, heading) {
  const page = read(rel);
  const start = page.indexOf(heading);
  assert.ok(start >= 0, `${heading} in ${rel}`);
  const end = page.indexOf("\n### ", start + 1);
  return page.slice(start, end);
}

const isoSection = () => section(shapePage, "### ISO code groups");
const esIsoSection = () => section(esShapePage, "### Grupos de códigos ISO {#iso-code-groups}");

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

function findSchemas(node, predicate, found = []) {
  if (Array.isArray(node)) node.forEach((n) => findSchemas(n, predicate, found));
  else if (node && typeof node === "object") {
    if (predicate(node)) found.push(node);
    Object.values(node).forEach((n) => findSchemas(n, predicate, found));
  }
  return found;
}

const outputItemSchemas = (spec) =>
  findSchemas(spec, (n) => n.type === "object" && n.properties && n.properties.status && n.properties.next && n.properties.retry);
const smartRoutingSchemas = (spec) => findSchemas(spec, (n) => n.properties && n.properties.no_retry_decline_types);

function specStatuses(schema) {
  return schema.properties.status.description.match(/\b[A-Z][A-Z_]+[A-Z]\b/g);
}

test("ISO_CODE_GROUP is documented at parity with MAC_CODE_GROUP in the status enum and outcome groups tables", () => {
  const lines = read(shapePage).split("\n");
  const enumRow = lines.find((l) => l.startsWith("| `ISO_CODE_GROUP` | Card decline"));
  assert.ok(enumRow, "status enum row");
  assert.match(enumRow, /ISO 8583/);
  assert.match(enumRow, /Card payments only/);
  const groupRow = lines.find((l) => l.startsWith("| `ISO_CODE_GROUP` | ISO code group"));
  assert.ok(groupRow, "outcome groups row");
  assert.match(groupRow, /`group_id`/);
  assert.match(groupRow, /`decline_types\[\]`/);
  assert.match(read(shapePage), /group predicate on `DECLINE_GROUP`, `MAC_CODE_GROUP`, `ISO_CODE_GROUP`/);
});

test("the ISO section explains what it matches, how it is selected on Declined and its precedence", () => {
  const s = isoSection();
  assert.match(s, /\*\*What it matches\.\*\*.*ISO 8583 response code only/);
  assert.match(s, /\*\*How it is selected on a step's Declined output\.\*\*.*before the step's catch-all `DECLINED` entry/);
  assert.match(s, /\*\*Precedence\.\*\*.*decline groups \(referenced as `DECLINE_GROUP`\), Merchant Advice Code groups \(referenced as `MAC_CODE_GROUP`\).*`output\[\]` order and the first one that matches wins, whatever its type/);
});

test("the ISO section states card payments only, the 1 to 30 character format and case-insensitive comparison", () => {
  const s = isoSection();
  assert.match(s, /`ISO_CODE_GROUP` applies to card payments only/);
  assert.match(s, /free string of 1 to 30 characters after trimming/);
  assert.match(s, /compared without case/);
  assert.doesNotMatch(s, /cannot hold the same code/);
});

test("saved ISO groups are created in the dashboard, not through the public API, on every page that lists groups", () => {
  assert.match(isoSection(), /Saved ISO code groups are created in the dashboard, not through the public API/);
  assert.match(read(listPage), /Saved ISO code groups are created in the dashboard, not through the public API/);
  assert.match(json("openapi/organizations/routing/list-decline-groups.json").paths["/routing/decline-groups"].get.description, /Saved ISO code groups are created in the dashboard, not through the public API/);
  assert.match(esIsoSection(), /Los grupos de códigos ISO guardados se crean en el dashboard, no a través de la API pública/);
  assert.match(read(esListPage), /Los grupos de códigos ISO guardados se crean en el dashboard, no a través de la API pública/);
});

test("public pages do not use internal group type names", () => {
  for (const rel of [shapePage, listPage, esShapePage, esListPage, `${en}create-routing.mdx`, `${en}update-routing.mdx`, `${en}retrieve-routing.mdx`]) {
    const text = read(rel);
    assert.doesNotMatch(text, /PROVIDER_STATUS/, rel);
    assert.doesNotMatch(text, /`MAC_CODE` groups/, rel);
  }
});

for (const [lang, getSection] of [["English", isoSection], ["Spanish", esIsoSection]]) {
  test(`the ${lang} request examples create ISO_CODE_GROUP outputs with decline_types and with group_id that fit the routing request schema`, () => {
    const schema = outputItemSchemas(json("openapi/organizations/routing/create-routing.json"))[0];
    const allowedStatuses = specStatuses(schema);
    const allowedFields = new Set(Object.keys(schema.properties));
    const blocks = jsonBlocks(getSection());
    const iso = outputs(blocks).filter((o) => o.status === "ISO_CODE_GROUP");
    const withCodes = iso.find((o) => Array.isArray(o.decline_types) && !("group_id" in o));
    const withGroup = iso.find((o) => Number.isInteger(o.group_id) && !("decline_types" in o));
    assert.deepEqual(withCodes.decline_types, ["51", "9G"]);
    assert.equal(withCodes.retry, true);
    assert.equal(withGroup.group_id, 5120);
    for (const o of outputs(blocks)) {
      assert.ok(allowedStatuses.includes(o.status), o.status);
      for (const k of Object.keys(o)) assert.ok(allowedFields.has(k) || k === "group_name", `output field ${k}`);
      for (const c of o.decline_types || []) assert.ok(c.trim().length >= 1 && c.trim().length <= 30, c);
    }
    for (const body of blocks.filter((b) => b.default_route)) {
      assert.equal(body.payment_method, "CARD");
      assert.ok(body.account_id);
    }
  });
}

test("the list decline groups examples return an ISO_CODE_GROUP group with its codes in the response schema shape", () => {
  for (const [page, specPath] of [
    [listPage, "openapi/organizations/routing/list-decline-groups.json"],
    [esListPage, "openapi/es/organizations/routing/list-decline-groups.json"],
  ]) {
    const item = json(specPath).paths["/routing/decline-groups"].get.responses["200"].content["application/json"].schema.items;
    assert.deepEqual(item.properties.type.enum, ["DECLINE_GROUP", "MAC_CODE_GROUP", "ISO_CODE_GROUP"], specPath);
    const text = read(page);
    const [list] = jsonBlocks(text.slice(text.indexOf("```json 200 OK")));
    const group = list.find((g) => g.type === "ISO_CODE_GROUP");
    assert.ok(group, `ISO group in ${page}`);
    assert.deepEqual(Object.keys(group).sort(), Object.keys(item.properties).sort());
    assert.deepEqual(group.decline_types, ["51", "9G"]);
    for (const g of list) assert.ok(item.properties.type.enum.includes(g.type));
  }
});

test("retry is allowed on ISO_CODE_GROUP and MAC_CODE_GROUP keeps rejecting it, in both languages", () => {
  assert.match(isoSection(), /\*\*Retry\.\*\* `retry: true` is allowed on an `ISO_CODE_GROUP` entry, as on `DECLINE_GROUP`/);
  assert.match(section(shapePage, "### Retry"), /`MAC_CODE_GROUP` keeps this rule, while `ISO_CODE_GROUP` accepts `retry: true`/);
  assert.match(section(esShapePage, "### Reintento {#retry}"), /`MAC_CODE_GROUP` conserva esta regla, mientras que `ISO_CODE_GROUP` acepta `retry: true`/);
  for (const rel of [`${en}create-routing.mdx`, `${en}update-routing.mdx`]) {
    assert.match(read(rel), /Only on `DECLINED`, `INTERNAL_ERROR`, `DECLINE_GROUP` and `ISO_CODE_GROUP`; `MAC_CODE_GROUP` keeps rejecting `retry: true`/, rel);
  }
  for (const rel of [`${es}create-routing.mdx`, `${es}update-routing.mdx`]) {
    assert.match(read(rel), /Solo en `DECLINED`, `INTERNAL_ERROR`, `DECLINE_GROUP` e `ISO_CODE_GROUP`; `MAC_CODE_GROUP` sigue rechazando `retry: true`/, rel);
  }
  for (const dir of ["openapi/organizations/routing/", "openapi/es/organizations/routing/"]) {
    for (const slug of ["create-routing", "update-routing"]) {
      const requestOutput = outputItemSchemas(json(`${dir}${slug}.json`).paths)[0];
      assert.match(requestOutput.properties.retry.description, /ISO_CODE_GROUP/, `${dir}${slug}`);
    }
  }
});

test("Smart Routing no_retry_decline_group_ids accepts ISO code groups on every routing schema and page", () => {
  for (const dir of ["openapi/organizations/routing/", "openapi/es/organizations/routing/"]) {
    for (const slug of routingSpecs) {
      const schemas = smartRoutingSchemas(json(`${dir}${slug}.json`));
      assert.ok(schemas.length > 0, `${dir}${slug}`);
      for (const s of schemas) {
        const f = s.properties.no_retry_decline_group_ids;
        assert.ok(f, `${dir}${slug} no_retry_decline_group_ids`);
        assert.equal(f.items.type, "integer");
        assert.match(f.description, /ISO 8583/);
      }
    }
  }
  assert.match(read(shapePage), /\| `no_retry_decline_group_ids\[\]` \| int\[\] \| no \|.*a decline whose ISO 8583 response code is in one of those groups is not retried on the next Smart Routing provider/);
  assert.match(read(esShapePage), /\| `no_retry_decline_group_ids\[\]` \| int\[\] \| no \|.*no se reintenta en el siguiente proveedor de Smart Routing/);
});

test("every routing output schema in both languages lists ISO_CODE_GROUP and accepts group_id and codes on it", () => {
  for (const dir of ["openapi/organizations/routing/", "openapi/es/organizations/routing/"]) {
    for (const slug of routingSpecs) {
      const schemas = outputItemSchemas(json(`${dir}${slug}.json`));
      assert.ok(schemas.length > 0, `${dir}${slug}`);
      for (const s of schemas) {
        assert.ok(specStatuses(s).includes("ISO_CODE_GROUP"), `${dir}${slug} status`);
        assert.match(s.properties.group_id.description, /ISO_CODE_GROUP/, `${dir}${slug} group_id`);
        assert.match(s.properties.decline_types.description, /ISO_CODE_GROUP/, `${dir}${slug} decline_types`);
      }
    }
  }
});

test("the create, update and retrieve pages in both languages name ISO_CODE_GROUP where they list MAC_CODE_GROUP", () => {
  for (const base of [en, es]) {
    for (const slug of ["create-routing", "update-routing"]) {
      const text = read(`${base}${slug}.mdx`);
      assert.match(text, /`MAC_CODE_GROUP`, `ISO_CODE_GROUP` \(/, `${base}${slug} status`);
      assert.match(text, /`DECLINE_GROUP` (and|e) `ISO_CODE_GROUP`; /, `${base}${slug} group_id`);
    }
    assert.match(read(`${base}retrieve-routing.mdx`), /`DECLINE_GROUP`, `MAC_CODE_GROUP` (and|e) `ISO_CODE_GROUP` /);
  }
});

test("the API changelog announces ISO code groups in the JSON source and both rendered pages", () => {
  const [release] = json("changelog/source/api.json").releases;
  const entry = release.entries.find((e) => e.title === "ISO 8583 code groups on the Routing API");
  assert.ok(entry);
  assert.equal(entry.type, "ADDED");
  assert.ok(entry.links.every((l) => l.url.startsWith("/reference/organizations/routing/")));
  assert.ok(read("changelog/api.mdx").includes(entry.description));
  assert.match(read("es/changelog/api.mdx"), /\*\*Grupos de códigos ISO 8583 en la API de enrutamiento\*\*/);
});

test("the edited pages keep their description frontmatter", () => {
  for (const rel of [shapePage, listPage, esShapePage, esListPage]) {
    assert.match(read(rel), /^---\n[\s\S]*?^description: .+$[\s\S]*?^---$/m, rel);
  }
});
