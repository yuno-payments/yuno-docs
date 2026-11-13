const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const read = (rel) => fs.readFileSync(path.join(root, rel), "utf8");
const json = (rel) => JSON.parse(read(rel));

const anchor = "/docs/security-and-compliance/network-tokens#choose-per-card";

function requestSchema(rel, method, p) {
  const op = json(rel).paths[p][method];
  return op.requestBody.content["application/json"].schema;
}

function assertFlag(field, label) {
  assert.ok(field, `${label} declares network_token`);
  assert.equal(field.type, "boolean", label);
  assert.ok(field.description.includes(anchor), `${label} links the behaviour table`);
  assert.match(field.description, /`false`/, label);
  assert.match(field.description, /onboard/i, label);
}

test("Create Payment v1 documents payment_method.network_token next to account_updater", () => {
  const props = requestSchema("openapi/payments/create-payment.json", "post", "/payments").properties.payment_method.properties;
  assert.ok(props.account_updater);
  assertFlag(props.network_token, "create-payment");
  assert.match(props.network_token.description, /route has the toggle off/);
  assert.match(props.network_token.description, /guest/);
  assert.match(props.network_token.description, /wallets/);
  assert.match(props.network_token.description, /cryptogram/);
  assert.match(props.network_token.description, /Omitted/);
});

test("Create Payment v2 documents network_token on each card", () => {
  const item = requestSchema("openapi/payments/create-payment-v2.json", "post", "/payments").properties.payment_method.properties.payment_methods.items;
  assertFlag(item.properties.network_token, "create-payment-v2");
});

test("card enrollment, SDK and Direct API, documents payment_method.network_token", () => {
  const sdk = requestSchema("openapi/payment-methods-checkout/enroll-payment-method-checkout.json", "post", Object.keys(json("openapi/payment-methods-checkout/enroll-payment-method-checkout.json").paths)[0]);
  assertFlag(sdk.properties.payment_method.properties.network_token, "enroll-checkout");
  const directPath = Object.keys(json("openapi/payment-methods-direct-workflow/enroll-payment-method-api.json").paths)[0];
  const direct = requestSchema("openapi/payment-methods-direct-workflow/enroll-payment-method-api.json", "post", directPath);
  assertFlag(direct.properties.payment_method.properties.network_token, "enroll-api");
  for (const field of [sdk.properties.payment_method.properties.network_token, direct.properties.payment_method.properties.network_token]) {
    assert.match(field.description, /without CVV/);
  }
});

test("the network tokens guide renders the behaviour table for false, true and omitted", () => {
  const guide = read("docs/security-and-compliance/network-tokens.mdx");
  assert.match(guide, /^import NetworkTokenRequestFlag from '\/snippets\/network-token-request-flag\.mdx';$/m);
  assert.match(guide, /^#### Choose per card$/m);
  assert.match(guide, /^<NetworkTokenRequestFlag \/>$/m);
  const table = read("snippets/network-token-request-flag.mdx");
  assert.match(table, /^\| `payment_method\.network_token` \| Payment \| Card enrollment \|$/m);
  for (const row of ["`false`", "`true`", "Omitted"]) {
    assert.match(table, new RegExp(`^\\| ${row} \\|`, "m"), row);
  }
  for (const exclusion of [/Guest \(non-vaulted\) cards/, /Apple Pay, Google Pay, Samsung Pay/, /cryptogram/, /onboarded to network tokens/]) {
    assert.match(table, exclusion);
  }
  for (const link of table.match(/\]\((\/reference\/[^)]+)\)/g)) {
    const rel = link.slice(3, -1);
    assert.ok(fs.existsSync(path.join(root, `${rel}.mdx`)), rel);
  }
});
