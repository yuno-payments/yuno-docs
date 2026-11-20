const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const read = (rel) => fs.readFileSync(path.join(root, rel), "utf8");
const json = (rel) => JSON.parse(read(rel));

const slug = "search-payments";
const page = `reference/payments/${slug}`;
const spec = () => json(`openapi/payments/${slug}.json`);
const op = () => spec().paths["/payments/search"].get;
const param = (name) => op().parameters.find((p) => p.name === name);

function navPages() {
  const pages = new Set();
  (function walk(node) {
    if (typeof node === "string") pages.add(node);
    else if (Array.isArray(node)) node.forEach(walk);
    else if (node && typeof node === "object") Object.values(node).forEach(walk);
  })(json("docs.json").navigation);
  return pages;
}

test("the search page is bound to GET /payments/search on a v1 fragment and visible in the navigation", () => {
  const s = spec();
  assert.equal(s.openapi, "3.1.0");
  assert.deepEqual(s.servers.map((x) => x.url), ["https://api-sandbox.y.uno/v1", "https://api.y.uno/v1"]);
  assert.equal(op().operationId, "search-payments");
  assert.match(read(`${page}.mdx`), /^openapi: "\/openapi\/payments\/search-payments\.json GET \/payments\/search"$/m);
  assert.match(read(`${page}.mdx`), /^description: ".+"$/m);
  assert.ok(navPages().has(page));
  assert.ok(navPages().has("reference/payments/retrieve-payment-by-merchant-order-id"));
});

test("the created_at window and the account header are required and every filter is optional", () => {
  for (const name of ["created_at_from", "created_at_to"]) {
    assert.equal(param(name).in, "query", name);
    assert.equal(param(name).required, true, name);
  }
  assert.equal(param("X-Account-Code").in, "header");
  assert.equal(param("X-Account-Code").required, true);
  for (const name of ["updated_at_from", "updated_at_to", "status", "customer_id", "country", "currency", "merchant_order_id", "cursor"]) {
    assert.ok(param(name), name);
    assert.notEqual(param(name).required, true, name);
  }
  assert.equal(param("status").schema.type, "array");
});

test("payment_method_type is not documented as a filter because the API rejects it", () => {
  assert.equal(param("payment_method_type"), undefined);
  assert.ok(!read(`${page}.mdx`).includes("payment_method_type"));
});

test("the created_at window is at most 1 day in the spec, the page and the DATE_RANGE_TOO_WIDE message", () => {
  const texts = [op().description, param("created_at_from").description, param("created_at_to").description, read(`${page}.mdx`)];
  for (const t of texts) {
    assert.ok(t.includes("1 day"), t);
    assert.ok(!/7 days|7-day/.test(t), t);
  }
  const ex = op().responses["400"].content["application/json"].examples;
  assert.deepEqual(ex.DATE_RANGE_TOO_WIDE.value.messages, ["The range between 'created_at_from' and 'created_at_to' must be at most 1 day."]);
});

test("limit is 1 to 100 with a default of 50", () => {
  assert.deepEqual(param("limit").schema, { type: "integer", minimum: 1, maximum: 100, default: 50 });
});

test("the response carries payments, a nullable next_cursor and has_more with the summarized row fields only", () => {
  const schemas = spec().components.schemas;
  const result = schemas.PaymentSearchResult;
  assert.deepEqual(result.required, ["payments", "next_cursor", "has_more"]);
  assert.deepEqual(result.properties.next_cursor.type, ["string", "null"]);
  assert.equal(result.properties.has_more.type, "boolean");
  const row = schemas.PaymentSummary.properties;
  assert.deepEqual(Object.keys(row).sort(), ["account_id", "amount", "country", "created_at", "customer_payer", "description", "id", "merchant_order_id", "payment_method", "status", "sub_status", "updated_at"]);
  assert.equal(row.transactions, undefined);
  assert.deepEqual(Object.keys(row.amount.properties).sort(), ["currency", "value"]);
  assert.deepEqual(Object.keys(row.payment_method.properties), ["type"]);
  assert.deepEqual(Object.keys(row.customer_payer.properties), ["id"]);
  const ex = op().responses["200"].content["application/json"].examples;
  assert.equal(ex["Last page"].value.has_more, false);
  assert.equal(ex["Last page"].value.next_cursor, null);
  assert.equal(ex["Page with more results"].value.has_more, true);
  for (const r of ex["Page with more results"].value.payments) assert.deepEqual(Object.keys(r).sort(), Object.keys(row).sort());
});

test("400 documents INVALID_PARAMETERS, DATE_RANGE_TOO_WIDE, INVALID_CURSOR and INVALID_ACCOUNT_ID in the code and messages envelope", () => {
  const ex = op().responses["400"].content["application/json"].examples;
  for (const code of ["INVALID_PARAMETERS", "DATE_RANGE_TOO_WIDE", "INVALID_CURSOR", "INVALID_ACCOUNT_ID"]) {
    assert.equal(ex[code].value.code, code);
    assert.ok(Array.isArray(ex[code].value.messages) && ex[code].value.messages.length > 0, code);
  }
});

test("the page explains the window, filters, pagination, rows and errors without prev_cursor or sort", () => {
  const g = read(`${page}.mdx`);
  for (const h of ["## Creation window", "## Filters", "## Pagination", "## Rows", "## Errors"]) assert.ok(g.includes(h), h);
  for (const s of ["1 day", "INVALID_PARAMETERS", "DATE_RANGE_TOO_WIDE", "INVALID_CURSOR", "INVALID_ACCOUNT_ID", "`next_cursor`", "`has_more`", "defaults to 50", "from 1 to 100", "`X-Account-Code`", "`created_at` ascending", "no `transactions` array"]) assert.ok(g.includes(s), s);
  assert.ok(!g.includes("prev_cursor"));
  assert.ok(!g.includes("then by `id`"));
});

test("the Spanish page is in the navigation, on an es spec structurally equal to the English one, and names the window and the error codes", () => {
  assert.ok(navPages().has(`es/${page}`));
  const g = read(`es/${page}.mdx`);
  assert.ok(g.includes(`openapi: "/openapi/es/payments/${slug}.json GET /payments/search"`));
  for (const s of ["1 día", "INVALID_PARAMETERS", "DATE_RANGE_TOO_WIDE", "INVALID_CURSOR", "INVALID_ACCOUNT_ID"]) assert.ok(g.includes(s), s);
  assert.ok(!g.includes("luego por `id`"));
  const withoutProse = (node) => {
    if (Array.isArray(node)) return node.map(withoutProse);
    if (!node || typeof node !== "object") return node;
    return Object.fromEntries(Object.entries(node).filter(([k, v]) => !((k === "description" || k === "summary") && typeof v === "string")).map(([k, v]) => [k, withoutProse(v)]));
  };
  assert.deepEqual(withoutProse(json(`openapi/es/payments/${slug}.json`)), withoutProse(spec()));
});
