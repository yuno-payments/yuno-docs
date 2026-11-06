const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const read = (rel) => fs.readFileSync(path.join(root, rel), "utf8");
const json = (rel) => JSON.parse(read(rel));

const CARD_MOTO_DESCRIPTION =
  "Mail order / telephone order: the card was taken by an agent and the cardholder is not present. Passed through to the provider, which applies its own MOTO handling where supported. If the field is not sent, we will take it as false. It applies only to the payment where it is sent and is not taken from a stored card, so send it on every MOTO payment, including recurring charges on a saved card.";
const VERIFY_MOTO_DESCRIPTION =
  "Mail order / telephone order for the card verification of this enrollment: the card was taken by an agent and the cardholder is not present. It applies only to that verification; later payments with the stored card are MOTO only when they send `payment_method.detail.card.moto`.";

function collect(node, match, at = [], out = []) {
  if (!node || typeof node !== "object") return out;
  if (Array.isArray(node)) {
    node.forEach((x, i) => collect(x, match, at.concat(i), out));
    return out;
  }
  for (const [k, v] of Object.entries(node)) {
    const p = at.concat(k);
    if (match(k, v, p)) out.push({ path: p.join("."), node: v });
    collect(v, match, p, out);
  }
  return out;
}

const cardSchemas = (spec) =>
  collect(spec, (k, v, p) => {
    const parent = p[p.length - 3];
    return k === "card" && v && v.properties && v.properties.verify && (parent === "payment_method_detail" || parent === "detail");
  });

const verifySchemas = (spec) =>
  collect(spec, (k, v) => k === "verify" && v && v.type === "object" && v.properties && v.properties.vault_on_success);

const isRequest = (entry) => entry.path.includes("requestBody");

test("Create payment documents the request field payment_method.detail.card.moto", () => {
  const spec = json("openapi/payments/create-payment.json");
  const card =
    spec.paths["/payments"].post.requestBody.content["application/json"].schema.properties.payment_method.properties.detail.properties.card;
  assert.deepEqual(card.properties.moto, { type: "boolean", description: CARD_MOTO_DESCRIPTION, default: false });
  const keys = Object.keys(card.properties);
  assert.equal(keys[keys.indexOf("verify") + 1], "moto", "moto sits right after verify");
});

const paymentResponseFiles = [
  "openapi/payments/create-payment.json",
  "openapi/payments/retrieve-payment-by-id-v2.json",
  "openapi/payments/retrieve-payment-by-id.json",
  "openapi/payments/retrieve-payment-by-merchant-order-id.json",
  "openapi/payments/refund-payment.json",
];

test("every response card node of the payment pages documents moto", () => {
  for (const file of paymentResponseFiles) {
    const nodes = cardSchemas(json(file)).filter((e) => !isRequest(e));
    assert.ok(nodes.length > 0, `${file} has response card nodes`);
    for (const { path: p, node } of nodes) {
      assert.deepEqual(node.properties.moto, { type: "boolean", example: false }, `${file} ${p}`);
    }
  }
});

test("dispute pages do not document moto in this change", () => {
  for (const file of ["openapi/payments/disputes.json", "openapi/payments/update-dispute.json"]) {
    assert.doesNotMatch(read(file), /"moto"/, file);
  }
});

const enrollmentFiles = [
  "openapi/payment-methods-direct-workflow/enroll-payment-method-api.json",
  "openapi/payment-methods-checkout/enroll-payment-method-checkout.json",
];
const retrieveByIdFiles = [
  ["openapi/payment-methods-checkout/retrieve-payment-method-by-id-checkout.json", "/payment-methods/{payment_method_id}"],
  ["openapi/payment-methods-direct-workflow/retrieve-enrolled-payment-method-by-id-api.json", "/customers/{customer_id}/payment-methods/{payment_method_id}"],
  ["openapi/payment-methods-direct-workflow/retrieve-enrolled-payment-method-by-id-pci-api.json", "/customers/{customer_id}/payment-methods/{payment_method_id}"],
];

test("both enrollment pages document verify.moto in the request and in the response verify", () => {
  for (const file of enrollmentFiles) {
    const nodes = verifySchemas(json(file));
    const requests = nodes.filter(isRequest);
    const responses = nodes.filter((e) => !isRequest(e));
    assert.equal(requests.length, 1, `${file} request verify`);
    assert.deepEqual(requests[0].node.properties.moto, { type: "boolean", description: VERIFY_MOTO_DESCRIPTION }, file);
    assert.ok(responses.length > 0, `${file} response verify`);
    for (const { path: p, node } of responses) {
      assert.equal(node.properties.moto.type, "boolean", `${file} ${p}`);
      assert.match(node.properties.moto.description, /only when it was sent/, `${file} ${p}`);
    }
  }
});

test("the retrieve-by-id pages document verify.moto in the response and the list page is unchanged", () => {
  for (const [file, route] of retrieveByIdFiles) {
    const spec = json(file);
    assert.ok(spec.paths[route] && spec.paths[route].get, `${file} GET ${route}`);
    const nodes = verifySchemas(spec);
    assert.ok(nodes.length > 0, `${file} response verify`);
    for (const { path: p, node } of nodes) {
      assert.ok(!isRequest({ path: p }), `${file} ${p}`);
      assert.equal(node.properties.moto.type, "boolean", `${file} ${p}`);
      assert.equal(node.properties.moto.example, true, `${file} ${p}`);
      assert.match(node.properties.moto.description, /only when it was sent/, `${file} ${p}`);
    }
  }
  assert.doesNotMatch(read("openapi/payment-methods-direct-workflow/retrieve-enrolled-payment-methods-api.json"), /"moto"/);
});

test("the payment object page documents moto only in card blocks, after verify", () => {
  const lines = read("reference/payments/the-payment-object.mdx").split("\n");
  const indent = (line) => line.length - line.trimStart().length;
  const parentObject = (i) => {
    for (let j = i - 1; j >= 0; j--) {
      const m = lines[j].match(/^(\s*)<ParamField body="(\w+)" type="object">/);
      if (m && m[1].length < indent(lines[i])) return m[2];
    }
    return null;
  };
  const motoLines = lines.flatMap((l, i) => (l.includes('<ParamField body="moto" type="boolean">') ? [i] : []));
  const verifyInCard = lines.flatMap((l, i) => (l.includes('<ParamField body="verify" type="boolean">') && parentObject(i) === "card" ? [i] : []));
  assert.ok(verifyInCard.length > 0);
  assert.deepEqual(motoLines.map(parentObject), motoLines.map(() => "card"));
  assert.equal(motoLines.length, verifyInCard.length);
});

test("the Payment Webhook V2 example shows moto and says it appears only when sent", () => {
  const page = read("docs/webhooks/object-and-examples.mdx");
  const section = page.slice(page.indexOf("### Payment Webhook V2"), page.indexOf("### Payment Webhook V1"));
  assert.match(section, /"moto": true/);
  assert.match(section, /`moto`[^\n]*only when[^\n]*sent/);
  const fence = "`".repeat(3);
  const example = section.slice(section.indexOf(fence + "json\n") + 8);
  JSON.parse(example.slice(0, example.indexOf("\n" + fence)));
});

test("the root openapi.json publishes the moto fields", () => {
  const rootSpec = json("openapi.json");
  const card =
    rootSpec.paths["/payments"].post.requestBody.content["application/json"].schema.properties.payment_method.properties.detail.properties.card;
  assert.equal(card.properties.moto.default, false);
  assert.match(read("openapi.yaml"), /moto:/);
});

test("build-openapi-root --check reports the root files in sync", (t) => {
  try {
    require.resolve("js-yaml", { paths: [root] });
  } catch {
    t.skip("js-yaml not installed (npm install --no-save js-yaml@5.4.0)");
    return;
  }
  const res = spawnSync(process.execPath, [path.join(root, "scripts/build-openapi-root.cjs"), "--check"], { cwd: root, encoding: "utf8" });
  assert.equal(res.status, 0, res.stdout + res.stderr);
});
