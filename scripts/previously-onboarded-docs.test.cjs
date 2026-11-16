const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const read = (rel) => fs.readFileSync(path.join(root, rel), "utf8");
const json = (rel) => JSON.parse(read(rel));

const createPage = "reference/recipients-for-marketplace/create-onboarding.mdx";
const updatePage = "reference/recipients-for-marketplace/update-onboarding.mdx";
const createSpec = "openapi/recipients-for-marketplace/create-onboarding.json";
const updateSpec = "openapi/recipients-for-marketplace/update-onboarding.json";

const requestSchema = (rel, method, route) =>
  json(rel).paths[route][method].requestBody.content["application/json"].schema;
const createSchema = () => requestSchema(createSpec, "post", "/recipients/{recipient_id}/onboardings");
const updateSchema = () =>
  requestSchema(updateSpec, "patch", "/recipients/{recipient_id}/onboardings/{onboarding_id}");

const providerNames = ["Adyen", "Stripe", "Zoop", "Pagar.me", "PAGARME", "Alelo"];

function previouslyOnboardedSection(page) {
  const text = read(page);
  const start = text.indexOf("## Previously onboarded accounts");
  assert.ok(start >= 0, `${page} has a "Previously onboarded accounts" section`);
  const next = text.indexOf("\n## ", start + 1);
  return text.slice(start, next === -1 ? undefined : next);
}

test("create-onboarding spec describes the CREATED -> SUCCEEDED/ERROR registration and the immediate SUCCEEDED fallback", () => {
  const type = createSchema().properties.type.description;
  assert.match(type, /PREVIOUSLY_ONBOARDED/);
  assert.match(type, /adopting existing accounts/);
  assert.match(type, /`CREATED`/);
  assert.match(type, /`SUCCEEDED`/);
  assert.match(type, /`ERROR`/);
  assert.match(type, /`response_message`/);
  assert.match(type, /recorded as `SUCCEEDED` immediately/);
  assert.match(type, /not validated/);
});

test("create-onboarding page explains registration outcomes, webhooks and the non-adopting fallback", () => {
  const section = previouslyOnboardedSection(createPage);
  assert.match(section, /`CREATED`/);
  assert.match(section, /`SUCCEEDED`/);
  assert.match(section, /`ERROR`/);
  assert.match(section, /`response_message`/);
  assert.match(section, /onboarding\.succeeded/);
  assert.match(section, /onboarding\.error/);
  assert.match(section, /recorded as `SUCCEEDED` immediately/);
  assert.match(section, /no call is made to the provider/);
  assert.match(section, /not validated/);
  assert.match(section, /\/reference\/(recipients-for-marketplace\/)?update-onboarding#previously-onboarded-accounts/);
});

for (const [name, schema] of [
  ["create", createSchema],
  ["update", updateSchema],
]) {
  test(`${name}-onboarding spec documents every provider account id and that the integration defines which are needed`, () => {
    const provider = schema().properties.provider.properties;
    for (const field of ["recipient_id", "recipient_additional_id", "balance_account_id", "legal_entity", "recipient_type"]) {
      assert.ok(provider[field], `provider.${field}`);
      assert.equal(provider[field].type, "string", `provider.${field} type`);
      assert.ok(provider[field].description, `provider.${field} description`);
    }
    for (const field of ["recipient_additional_id", "balance_account_id", "legal_entity"]) {
      assert.match(provider[field].description, /provider integration/, `provider.${field} says it depends on the integration`);
    }
    assert.match(schema().properties.provider.description, /defined by the provider integration/);
    assert.match(schema().properties.provider.description, /exactly as sent/);
  });
}

test("create-onboarding spec keeps recipient_id required for PREVIOUSLY_ONBOARDED", () => {
  assert.match(
    createSchema().properties.provider.properties.recipient_id.description,
    /Provider recipient ID must be provided for previously onboarded type\./
  );
});

for (const page of [createPage, updatePage]) {
  test(`${page} lists recipient_additional_id and balance_account_id and says the integration defines which are needed`, () => {
    const section = previouslyOnboardedSection(page);
    for (const field of ["provider.recipient_id", "provider.recipient_additional_id", "provider.balance_account_id"]) {
      assert.ok(section.includes(`\`${field}\``), field);
    }
    assert.match(section, /defined by (its|the provider) integration/);
  });
}

test("update-onboarding page explains re-registration with provider ids and the notification-only update", () => {
  const section = previouslyOnboardedSection(updatePage);
  assert.match(section, /re-register/i);
  assert.match(section, /PATCH \/v1\/recipients\/\{recipient_id\}\/onboardings\/\{onboarding_id\}/);
  for (const field of ["provider.id", "provider.connection_id"]) assert.ok(section.includes(`\`${field}\``), field);
  assert.match(section, /`ERROR`/);
  assert.match(section, /`SUCCEEDED`/);
  assert.match(section, /without provider ids only re-sends the (onboarding )?notification/);
  assert.match(section, /ids are stored/);
  const example = section.match(/```json\n([\s\S]*?)```/);
  assert.ok(example, "re-registration request example");
  const body = JSON.parse(example[1]);
  assert.ok(body.provider.id && body.provider.connection_id && body.provider.recipient_id, "example carries provider ids");
});

test("update-onboarding spec describes re-registration and the notification-only update", () => {
  const type = updateSchema().properties.type.description;
  assert.match(type, /re-register/i);
  assert.match(type, /only re-sends the notification/);
});

test("no provider is named as supporting adoption; availability points to the Key Account Manager", () => {
  for (const page of [createPage, updatePage]) {
    const section = previouslyOnboardedSection(page);
    for (const name of providerNames) assert.ok(!section.includes(name), `${page} section must not name ${name}`);
    assert.match(section, /Key Account Manager/);
    assert.match(section, /configur/);
  }
  for (const schema of [createSchema, updateSchema]) {
    const s = schema();
    const texts = [
      s.properties.type.description,
      s.properties.provider.description,
      ...Object.values(s.properties.provider.properties).map((p) => p.description || ""),
    ].join("\n");
    for (const name of ["Adyen", "Stripe", "Zoop"]) assert.ok(!texts.includes(name), `spec must not name ${name}`);
    assert.match(s.properties.type.description, /Key Account Manager/);
  }
});

test("root openapi.json publishes the new provider ids on both onboarding operations", () => {
  const spec = json("openapi.json");
  const ops = Object.entries(spec.paths)
    .flatMap(([route, item]) => Object.entries(item).map(([method, op]) => [route, method, op]))
    .filter(([route, method]) =>
      (method === "post" && /\/recipients\/\{[^}]+\}\/onboardings$/.test(route)) ||
      (method === "patch" && /\/recipients\/\{[^}]+\}\/onboardings\/\{[^}]+\}$/.test(route))
    );
  assert.equal(ops.length, 2, "create and update onboarding in the root spec");
  for (const [, , op] of ops) {
    const provider = op.requestBody.content["application/json"].schema.properties.provider.properties;
    assert.ok(provider.recipient_additional_id && provider.balance_account_id);
  }
});
