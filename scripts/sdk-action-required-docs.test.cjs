const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const read = (rel) => fs.readFileSync(path.join(root, rel), "utf8");
const json = (rel) => JSON.parse(read(rel));

const v2Fragments = [
  "openapi/payments/create-payment-v2.json",
  "openapi/payments/retrieve-payment-two-cards.json",
  "openapi/payments/capture-authorization-v2.json",
  "openapi/payments/cancel-payment-v2.json",
  "openapi/payments/refund-payment-v2.json",
  "openapi/payments/cancel-or-refund-a-payment-v2.json",
  "openapi/payments/cancel-or-refund-payment-with-transaction-v2.json",
];

function assertDescribesPaymentMethod(description, label) {
  assert.match(description, /payment method (used for this payment )?needs an SDK step/, label);
  assert.match(description, /not the state of the payment/, label);
  assert.match(description, /can stay `true` after the payment reaches a final status/, label);
  assert.match(description, /`status` and `sub_status`/, label);
  assert.doesNotMatch(description, /SDK must continue the payment/, label);
}

function findSdkActionRequired(node) {
  if (!node || typeof node !== "object") return [];
  const found = [];
  for (const [key, value] of Object.entries(node)) {
    if (key === "sdk_action_required" && value && typeof value === "object" && value.description) {
      found.push(value);
    }
    found.push(...findSdkActionRequired(value));
  }
  return found;
}

test("the payment object reference describes checkout.sdk_action_required as a payment method property", () => {
  const page = read("reference/payments/the-payment-object.mdx");
  const field = page.match(/<ParamField body="sdk_action_required" type="boolean">([\s\S]*?)<\/ParamField>/);
  assert.ok(field, "the payment object documents sdk_action_required");
  assertDescribesPaymentMethod(field[1], "the-payment-object");
  assert.doesNotMatch(field[1], /Defines if the payment is asynchronous/);
});

test("every v2 payment fragment uses the payment method wording", () => {
  for (const rel of v2Fragments) {
    const fields = findSdkActionRequired(json(rel));
    assert.ok(fields.length > 0, `${rel} documents sdk_action_required`);
    for (const field of fields) {
      assert.equal(field.type, "boolean", rel);
      assertDescribesPaymentMethod(field.description, rel);
    }
  }
});

test("the published root spec carries the same wording", () => {
  const fields = findSdkActionRequired(json("openapi.json"));
  assert.ok(fields.length > 0, "openapi.json documents sdk_action_required");
  for (const field of fields) {
    assertDescribesPaymentMethod(field.description, "openapi.json");
  }
});
