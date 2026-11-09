#!/usr/bin/env node
/**
 * Verifies the Change External Subscription Payment Method reference against the
 * public-api contract: required headers, request, 200 response, every error code,
 * navigation entry and the Stripe Billing guide link.
 *
 * Usage:
 *   node scripts/check-external-subscription-payment-method.cjs
 */

const fs = require("fs");
const path = require("path");
const assert = require("assert");

const ROOT = path.join(__dirname, "..");
const SLUG = "reference/subscriptions/change-external-subscription-payment-method";
const ROUTE = "/external-subscriptions/{external_subscription_id}/payment-method";

const read = (file) => fs.readFileSync(path.join(ROOT, file), "utf8");

const EXPECTED_ERRORS = {
  400: [
    "INVALID_PARAMETERS",
    "CUSTOMER_NOT_FOUND",
    "VAULTED_TOKEN_NOT_FOUND",
    "EXTERNAL_SUBSCRIPTION_NOT_FOUND",
    "CUSTOMER_MISMATCH",
  ],
  403: ["PRODUCT_NOT_ENABLED"],
  409: ["CONCURRENT_CHANGE"],
  502: ["BILLING_PLATFORM_ERROR"],
};

function checkSpec() {
  const spec = JSON.parse(read("openapi/subscriptions/change-external-subscription-payment-method.json"));
  const op = spec.paths[ROUTE].post;
  assert.ok(op, "POST operation is missing");

  const headers = spec.components.securitySchemes;
  const headerNames = Object.values(headers).map((s) => s.name).sort();
  assert.deepStrictEqual(headerNames, ["private-secret-key", "public-api-key"]);

  const idem = op.parameters.find((p) => p.name === "X-Idempotency-Key");
  assert.ok(idem && idem.in === "header" && idem.required === true, "X-Idempotency-Key must be a required header");
  const pathParam = op.parameters.find((p) => p.name === "external_subscription_id");
  assert.ok(pathParam && pathParam.in === "path" && pathParam.required === true);

  const body = op.requestBody.content["application/json"].schema;
  assert.deepStrictEqual([...body.required].sort(), ["account_id", "customer_payer", "vaulted_token"]);
  assert.deepStrictEqual(body.properties.customer_payer.required, ["id"]);
  assert.match(body.properties.customer_payer.properties.id.description, /not the Stripe customer ID/);

  const ok = op.responses["200"].content["application/json"];
  assert.deepStrictEqual(Object.keys(ok.schema.properties).sort(), [
    "account_id",
    "customer_payer",
    "external_subscription_id",
    "vaulted_token",
  ]);

  assert.deepStrictEqual(
    Object.keys(op.responses).sort(),
    ["200", ...Object.keys(EXPECTED_ERRORS)].sort(),
  );
  for (const [status, codes] of Object.entries(EXPECTED_ERRORS)) {
    const examples = op.responses[status].content["application/json"].examples;
    assert.deepStrictEqual(Object.keys(examples).sort(), [...codes].sort(), `error codes for ${status}`);
    for (const code of codes) {
      assert.strictEqual(examples[code].value.code, code);
    }
  }
}

function checkPage() {
  const page = read(`${SLUG}.mdx`);
  assert.ok(
    page.includes(`openapi: "/openapi/subscriptions/change-external-subscription-payment-method.json POST ${ROUTE}"`),
    "page must bind the OpenAPI operation",
  );
  assert.match(page, /description: "/);
  assert.match(page, /not the Stripe customer ID/);
  assert.match(page, /No payment is made/);
  assert.match(page, /does not run a \$0 verification or 3DS/);
  for (const codes of Object.values(EXPECTED_ERRORS)) {
    for (const code of codes) assert.ok(page.includes(`\`${code}\``), `page must explain ${code}`);
  }
}

function checkNavigation() {
  const nav = JSON.stringify(JSON.parse(read("docs.json")));
  const plan = nav.indexOf('"reference/subscriptions/change-subscription-plan"');
  const page = nav.indexOf(`"${SLUG}"`);
  assert.ok(page > plan && plan >= 0, "page must be in docs.json next to change-subscription-plan");
}

function checkGuide() {
  const guide = read("docs/payment-features/subscriptions/stripe-billing.mdx");
  assert.ok(guide.includes(`](/${SLUG})`), "Stripe Billing guide must link to the reference page");
  assert.match(guide, /No payment is made/);
}

checkSpec();
checkPage();
checkNavigation();
checkGuide();
console.log("OK: external subscription payment method reference matches the contract");
