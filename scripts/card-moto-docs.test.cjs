const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const read = (rel) => fs.readFileSync(path.join(root, rel), "utf8");
const json = (rel) => JSON.parse(read(rel));

const CARD_MOTO_DESCRIPTION =
  "Mail order / telephone order: the card was taken by an agent and the cardholder is not present. Passed through to the provider, which applies its own MOTO handling where supported. If the field is not sent, a payment with an enrolled card uses the value set when the card was enrolled, and any other payment is taken as false. Send `false` on a payment where the cardholder is present with a card enrolled with `true`.";
const ENROLLMENT_MOTO_DESCRIPTION =
  "Mail order / telephone order: the card is enrolled by an agent and the cardholder is not present. Used for the card verification of this enrollment, if there is one, and inherited by later payments with this payment method, unless a payment sends its own value.";

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
  assert.deepEqual(card.properties.moto, { type: "boolean", description: CARD_MOTO_DESCRIPTION });
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

const enrollmentRequestCard = (file, route) =>
  json(file).paths[route].post.requestBody.content["application/json"].schema.properties.payment_method.properties.detail.properties.card;

const assertResponseDetailCardMoto = (file, schemas) => {
  assert.ok(schemas.length > 0, `${file} response verify`);
  for (const { path: p, parent } of schemas) {
    assert.ok(!isRequest({ path: p }), `${file} ${p}`);
    const moto = parent.detail.properties.card.properties.moto;
    assert.equal(moto.type, "boolean", `${file} ${p}`);
    assert.equal(moto.example, true, `${file} ${p}`);
    assert.match(moto.description, /only when it was set on the enrollment/, `${file} ${p}`);
  }
};

const responseVerifyParents = (spec) =>
  collect(spec, (k, v) => k === "properties" && v && v.verify && v.verify.properties && v.verify.properties.vault_on_success)
    .filter((e) => !isRequest(e))
    .map((e) => ({ path: e.path, parent: e.node }));

test("both enrollment pages document payment_method.detail.card.moto in the request and detail.card.moto in the response", () => {
  const routes = {
    "openapi/payment-methods-direct-workflow/enroll-payment-method-api.json": "/customers/{customer_id}/payment-methods",
    "openapi/payment-methods-checkout/enroll-payment-method-checkout.json": "/customers/sessions/{customer_session}/payment-methods",
  };
  for (const file of enrollmentFiles) {
    assert.deepEqual(enrollmentRequestCard(file, routes[file]).properties.moto, { type: "boolean", description: ENROLLMENT_MOTO_DESCRIPTION }, file);
    assertResponseDetailCardMoto(file, responseVerifyParents(json(file)));
  }
});

test("no enrollment page documents moto under verify", () => {
  for (const file of [...enrollmentFiles, ...retrieveByIdFiles.map(([f]) => f)]) {
    for (const { path: p, node } of verifySchemas(json(file))) {
      assert.ok(!node.properties.moto, `${file} ${p}`);
    }
  }
});

test("the retrieve-by-id pages document detail.card.moto in the response and the list page is unchanged", () => {
  for (const [file, route] of retrieveByIdFiles) {
    const spec = json(file);
    assert.ok(spec.paths[route] && spec.paths[route].get, `${file} GET ${route}`);
    assertResponseDetailCardMoto(file, responseVerifyParents(spec));
  }
  assert.doesNotMatch(read("openapi/payment-methods-direct-workflow/retrieve-enrolled-payment-methods-api.json"), /"moto"/);
});

test("no page says moto is not taken from a stored card", () => {
  for (const file of ["openapi/payments/create-payment.json", "reference/payments/the-payment-object.mdx", "openapi.json"]) {
    assert.doesNotMatch(read(file), /not taken from a stored card/, file);
  }
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

test("the enrollment webhook section says when detail.card.moto appears", () => {
  const page = read("docs/webhooks/object-and-examples.mdx");
  const section = page.slice(page.indexOf("## Enrollment"));
  assert.match(section.slice(0, 400), /`detail\.card`[^\n]*`moto`[^\n]*only when it was set on the enrollment/);
});

test("the root openapi.json publishes the moto fields", () => {
  const rootSpec = json("openapi.json");
  const card =
    rootSpec.paths["/payments"].post.requestBody.content["application/json"].schema.properties.payment_method.properties.detail.properties.card;
  assert.equal(card.properties.moto.description, CARD_MOTO_DESCRIPTION);
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
