const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const read = (rel) => fs.readFileSync(path.join(root, rel), "utf8");
const json = (rel) => JSON.parse(read(rel));

const endpoints = [
  ["create-payment-v2", "post", "/payments"],
  ["retrieve-payment-two-cards", "get", "/payments/{payment_id}"],
  ["capture-authorization-v2", "post", "/payments/{payment_id}/transactions/{transaction_id}/capture"],
  ["cancel-payment-v2", "post", "/payments/{payment_id}/transactions/{transaction_id}/cancel"],
  ["refund-payment-v2", "post", "/payments/{payment_id}/transactions/{transaction_id}/refund"],
  ["cancel-or-refund-payment-with-transaction-v2", "post", "/payments/{payment_id}/transactions/{transaction_id}/cancel-or-refund"],
  ["cancel-or-refund-a-payment-v2", "post", "/payments/{payment_id}/cancel-or-refund"],
];
const guide = "docs/payment-features/pay-with-two-cards";
const changedPages = [
  guide,
  ...endpoints.map(([slug]) => `reference/payments/${slug}`),
  "reference/payments/status-and-response-codes/payment",
  "docs/sdks/headless-web/payment",
  "changelog/web",
];

function navPages() {
  const pages = new Set();
  (function walk(node) {
    if (typeof node === "string") pages.add(node);
    else if (Array.isArray(node)) node.forEach(walk);
    else if (node && typeof node === "object") Object.values(node).forEach(walk);
  })(json("docs.json").navigation);
  return pages;
}

test("every v2 endpoint has a v2 OpenAPI fragment bound to a nav-visible reference page", () => {
  const nav = navPages();
  for (const [slug, method, p] of endpoints) {
    const spec = json(`openapi/payments/${slug}.json`);
    assert.equal(spec.openapi, "3.1.0", slug);
    assert.deepEqual(spec.servers.map((s) => s.url), ["https://api-sandbox.y.uno/v2", "https://api.y.uno/v2", "https://api.eu.y.uno/v2"], slug);
    const op = spec.paths[p] && spec.paths[p][method];
    assert.ok(op, `${slug} declares ${method.toUpperCase()} ${p}`);
    const idem = (op.parameters || []).find((x) => x.name === "X-Idempotency-Key");
    if (method === "post") assert.equal(idem?.required, true, `${slug} requires X-Idempotency-Key`);
    const page = read(`reference/payments/${slug}.mdx`);
    assert.match(page, new RegExp(`^openapi: "/openapi/payments/${slug}\\.json ${method.toUpperCase()} ${p.replace(/[{}]/g, "\\$&")}"$`, "m"));
    assert.ok(nav.has(`reference/payments/${slug}`), `${slug} in docs.json`);
  }
  assert.ok(nav.has(guide));
});

test("the v1 retrieve page keeps its slug and the two-card pages link the two-card retrieve page", () => {
  const nav = navPages();
  assert.ok(nav.has("reference/payments/retrieve-payment-by-id-v2"));
  assert.ok(!nav.has("reference/payments/retrieve-payment-by-id"));
  assert.match(read("reference/payments/retrieve-payment-by-id.mdx"), /^hidden: true$/m);
  const v1 = json("openapi/payments/retrieve-payment-by-id-v2.json");
  assert.ok(v1.servers.every((s) => s.url.endsWith("/v1")));
  for (const f of ["reference/payments/create-payment-v2.mdx", "docs/payment-features/pay-with-two-cards.mdx", "docs/sdks/headless-web/payment.mdx"]) {
    assert.ok(read(f).includes("(/reference/payments/retrieve-payment-two-cards)"), f);
    assert.ok(!read(f).includes("(/reference/payments/retrieve-payment-by-id-v2)"), f);
  }
});

test("operations answer 201 and every response uses the v2 payment shape", () => {
  for (const [slug, method] of endpoints) {
    const spec = json(`openapi/payments/${slug}.json`);
    const op = Object.values(spec.paths)[0][method];
    const code = method === "get" ? "200" : "201";
    assert.equal(op.responses[code].content["application/json"].schema.$ref, "#/components/schemas/PaymentV2", slug);
  }
});

test("retrieve two-card v2 declares split_payment_methods, payment_methods_count and per-card sequence, type, amount, transactions without a per-card status", () => {
  const spec = json("openapi/payments/retrieve-payment-two-cards.json");
  assert.ok(spec.servers.every((s) => s.url.endsWith("/v2")));
  const schema = spec.components.schemas.PaymentV2;
  assert.ok(schema.properties.split_payment_methods);
  assert.ok(schema.properties.payment_methods_count);
  const card = schema.properties.payment_method.properties.payment_methods.items.properties;
  assert.deepEqual(Object.keys(card).filter((k) => ["sequence", "type", "amount", "transactions"].includes(k)).sort(), ["amount", "sequence", "transactions", "type"]);
  assert.equal(card.status, undefined);
  assert.deepEqual(Object.keys(card.amount.properties).sort(), ["currency", "value"]);
  const ex = spec.paths["/payments/{payment_id}"].get.responses["200"].content["application/json"].examples;
  for (const { value } of Object.values(ex)) {
    assert.equal(value.split_payment_methods, true);
    assert.equal(value.payment_methods_count, 2);
    for (const pm of value.payment_method.payment_methods) assert.equal(pm.status, undefined);
  }
});

test("create v2 enforces exactly two CARD items and a capture that defaults to true", () => {
  const spec = json("openapi/payments/create-payment-v2.json");
  const schema = spec.paths["/payments"].post.requestBody.content["application/json"].schema;
  const pms = schema.properties.payment_method.properties.payment_methods;
  assert.equal(pms.minItems, 2);
  assert.equal(pms.maxItems, 2);
  assert.deepEqual(pms.items.properties.type.enum, ["CARD"]);
  assert.equal(schema.properties.payment_method.properties.capture.default, true);
  assert.ok(schema.required.includes("customer_payer"));
  assert.ok(!schema.required.includes("callback_url"));
  assert.equal(spec.paths["/payments"].post.responses["403"].content["application/json"].example.code, "PRODUCT_NOT_ENABLED");
});

test("the guide covers limits, enablement, examples, response, statuses, reversal, fraud, operations, webhook and errors", () => {
  const g = read(`${guide}.mdx`);
  for (const h of ["## Limits", "## Enablement", "## Create the payment", "## Read the response", "## Statuses", "## All or nothing", "## Fraud screening", "## Operations", "## Webhook", "## Errors"]) assert.ok(g.includes(h), h);
  for (const s of [
    "PRODUCT_NOT_ENABLED", "REFUND_RETRY_IN_PROCESS", "CANCEL_RETRY_IN_PROCESS", "vaulted_token", "SDK_CHECKOUT", "INVALID_STATUS",
    "| Any card declined by fraud screening | `DECLINED` | `FRAUD_DECLINED` |", "| Both cards rejected | `REJECTED` | `REJECTED` |",
    "`PARTIALLY_CAPTURED`", "`PARTIALLY_REFUNDED`", "`IN_DISPUTE`", "`WAITING_ADDITIONAL_STEP`", "`PENDING_FRAUD_REVIEW`",
    "The header 'x-idempotency-key' is required.", "The sum of 'payment_method.payment_methods[].amount.value' must equal 'amount.value'.",
    "INVALID_TOKEN_USED", "INVALID_CHECKOUT_SESSION", "INVALID_TOKEN", "Token total does not match the payment amount",
  ]) assert.ok(g.includes(s), s);
});

test("the headless Web SDK guide no longer describes a per-card status and links the guide", () => {
  const h = read("docs/sdks/headless-web/payment.mdx");
  assert.doesNotMatch(h, /`amount`, `status` and `transactions`/);
  assert.doesNotMatch(h, /each with its own status and transactions/);
  assert.ok(h.includes("(/docs/payment-features/pay-with-two-cards)"));
});

test("the web changelog source and rendered page say exactly two cards with total required", () => {
  for (const f of ["changelog/source/web.json", "changelog/web.mdx"]) {
    const s = read(f);
    assert.ok(!s.includes("two or more items"), f);
    assert.ok(!s.includes("An optional total"), f);
    assert.ok(s.includes("array of exactly two items"), f);
    assert.ok(s.includes("is required to create the payment"), f);
  }
});

test("the payment status reference lists CANCEL_RETRY_IN_PROCESS and the two-card aggregation note", () => {
  const s = read("reference/payments/status-and-response-codes/payment.mdx");
  assert.ok(s.includes('text="CANCEL_RETRY_IN_PROCESS"'));
  assert.ok(s.includes("### Two-card payments"));
});

test("changed pages document nothing that is out of scope and no internal names", () => {
  const forbidden = [/reverse_on_decline/, /\/complete\b/, /abandon/i, /"captured"|"refunded"|"chargeback"|"in_dispute"/, /rx-orc|payment-transaction-ms|payment-event-orc|transaction-rails/, /\b[A-Z][A-Z0-9]+-\d{3,}\b/, /atlassian|confluence/i, /SPLIT_PAYMENT_METHODS/];
  const files = [...changedPages.map((p) => `${p}.mdx`), ...endpoints.map(([s]) => `openapi/payments/${s}.json`)];
  for (const f of files) {
    const s = f === "changelog/web.mdx" ? read(f).split("\n").filter((l) => l.includes("composite one-time token")).join("\n") : read(f);
    const scoped = f.includes("v2") || f.includes("two-cards") ? s : s.split("\n").filter((l) => /two cards|two-card|v2/i.test(l)).join("\n");
    for (const re of forbidden) assert.doesNotMatch(scoped, re, `${f} matches ${re}`);
  }
});

test("every internal link on changed pages resolves to a page or a redirect", () => {
  const redirects = new Set(json("redirects.json").map((r) => r.source));
  for (const page of changedPages) {
    const s = read(`${page}.mdx`);
    for (const [, target] of s.matchAll(/\]\((\/(?:docs|reference)\/[^)#\s]+)(?:#[^)]*)?\)/g)) {
      const ok = fs.existsSync(path.join(root, `${target.slice(1)}.mdx`)) || fs.existsSync(path.join(root, target.slice(1), "index.mdx")) || redirects.has(target);
      assert.ok(ok, `${page} links to ${target}`);
    }
  }
});
