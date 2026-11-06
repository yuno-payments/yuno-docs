const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const read = (rel) => fs.readFileSync(path.join(root, rel), "utf8");
const json = (rel) => JSON.parse(read(rel));

const guideSlug = "docs/wallets/apple-pay-and-google-pay-for-all-accounts";
const guide = read(`${guideSlug}.mdx`);
const conn = (name) => read(`reference/organizations/connections/${name}.mdx`);
const routing = (name) => read(`reference/organizations/routing/${name}.mdx`);

const newBadRequests = [
  "ORGANIZATION_SCOPE_NOT_SUPPORTED",
  "ORGANIZATION_CONNECTION_CONFIRMATION_REQUIRED",
  "ORGANIZATION_SCOPE_NOT_SUPPORTED_FOR_PROVIDER",
  "ORGANIZATION_APPLE_PAY_REQUIRES_OWN_CERTIFICATES",
  "ORGANIZATION_CHECKOUT_ACTIVATION_REQUIRED",
];

const changedPages = [
  `${guideSlug}.mdx`,
  ...["create-connection", "retrieve-connection", "update-connection", "delete-connection"].map(
    (n) => `reference/organizations/connections/${n}.mdx`,
  ),
  "reference/organizations/routing/create-routing.mdx",
  "reference/organizations/routing/update-routing.mdx",
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

test("create connection documents scope, confirmation and checkout_activation for organization connections", () => {
  const page = conn("create-connection");
  assert.match(page, /<ParamField body="scope"/);
  assert.match(page, /"ACCOUNT"/);
  assert.match(page, /"ORGANIZATION"/);
  assert.match(page, /<ParamField body="organization_connection_confirmation" type="boolean">/);
  assert.match(page, /<ParamField body="checkout_activation" type="enum">/);
  assert.match(page, /"AVAILABLE"`: the wallet is available to every account, and each account turns it on/);
  assert.match(page, /"ENABLED"`: the wallet is switched on in every account's checkout at once/);
  assert.match(page, /Required when `scope` is `"ORGANIZATION"`\. Not used on account connections\./);
});

test("the account is optional for organization connections", () => {
  assert.match(conn("create-connection"), /<ParamField header="X-account-code" type="string">\n[^\n]*Omit it for an organization connection/);
  assert.match(conn("update-connection"), /<ParamField body="account_id" type="string">\n[^\n]*Omit it for an organization connection/);
  assert.match(conn("delete-connection"), /<ParamField header="X-Account-Code" type="string">\n[^\n]*Omit it for an organization connection/);
  const spec = json("openapi/organizations/connections/create-connection.json");
  const op = spec.paths[Object.keys(spec.paths)[0]].post;
  const header = op.parameters.find((p) => p.name.toLowerCase() === "x-account-code");
  assert.notEqual(header?.required, true);
});

test("params are masked when an account reads an organization connection", () => {
  assert.match(conn("retrieve-connection"), /When an account reads an organization connection, every param value is masked as `\*\*\*`/);
});

test("the five new 400 errors are listed on create connection and in its OpenAPI fragment", () => {
  const page = conn("create-connection");
  const spec = read("openapi/organizations/connections/create-connection.json");
  for (const code of newBadRequests) {
    assert.match(page, new RegExp("\\| `400` \\| `" + code + "`<br />"), code);
    assert.ok(spec.includes(code), `${code} in create-connection.json`);
  }
});

test("503 ORGANIZATION_ACCOUNTS_UNAVAILABLE is documented for create, edit, unpause and delete, and a pause still commits", () => {
  for (const name of ["create-connection", "update-connection", "delete-connection"]) {
    assert.match(conn(name), /\| `503` \| `ORGANIZATION_ACCOUNTS_UNAVAILABLE`<br \/>[^\n]*Nothing changes/, name);
  }
  assert.match(conn("update-connection"), /editing or unpausing it[^\n]*Pausing an organization connection still commits/);
  assert.match(guide, /create, edit, unpause or delete it, the request fails with `503 ORGANIZATION_ACCOUNTS_UNAVAILABLE` and nothing changes/);
  assert.match(guide, /A pause always commits/);
});

test("409 CONNECTION_IN_USE documents details.accounts for organization connections", () => {
  const page = conn("delete-connection");
  assert.match(page, /\| `409` \| `CONNECTION_IN_USE`<br \/>[^\n]*`details\.accounts` lists the accounts/);
  assert.match(page, /"accounts": \[/);
});

test("the routing reference allows the organization wallet connection on APPLE_PAY and GOOGLE_PAY steps", () => {
  for (const name of ["create-routing", "update-routing"]) {
    assert.match(routing(name), /On an `APPLE_PAY` or `GOOGLE_PAY` step it may be your organization wallet connection/, name);
  }
});

test("the guide covers create, implicit use with the card-route condition, move, stop one account and stop new accounts", () => {
  assert.ok(navPages().has(guideSlug), "guide in docs.json navigation");
  assert.match(guide, /^title: "Apple Pay and Google Pay for all accounts"$/m);
  assert.match(guide, /Apple Pay\*\* with your own certificates/);
  assert.match(guide, /Google Pay\*\* in Yuno gateway mode or partner gateway mode/);
  assert.match(guide, /## Create the organization connection/);
  assert.match(guide, /`"AVAILABLE"`/);
  assert.match(guide, /`"ENABLED"`/);
  assert.match(guide, /uses the organization connection automatically/);
  assert.match(guide, /An account without a published card route is not offered the wallet until it publishes one/);
  assert.match(guide, /## Move an account to the organization connection[\s\S]*publish a route for that account whose `APPLE_PAY` or `GOOGLE_PAY` step uses the organization connection/);
  assert.match(guide, /## Stop one account from using it[\s\S]*create an account connection[\s\S]*archive the account's wallet route/);
  assert.match(guide, /## Stop it reaching accounts created later[\s\S]*Create an account connection for Apple Pay or Google Pay in each current account[\s\S]*Delete the organization connection/);
});

test("internal links on the changed pages resolve to existing pages", () => {
  for (const rel of changedPages) {
    for (const [, href] of read(rel).matchAll(/\]\((\/(?:docs|reference)\/[^)#\s]+)/g)) {
      assert.ok(fs.existsSync(path.join(root, `${href.slice(1)}.mdx`)), `${rel} links ${href}`);
    }
  }
});

test("no changed page names an internal service, host or endpoint", () => {
  const internal = /\b[a-z]+(?:-[a-z]+)*-(?:ms|orc|bff|int)\b|internal-(?:infra|prod|staging)|\.internal\b|api-staging\.y\.uno|localhost|\.svc\.cluster/;
  for (const rel of changedPages) assert.doesNotMatch(read(rel), internal, rel);
  for (const name of ["create-connection", "retrieve-connection", "update-connection", "delete-connection"]) {
    const rel = `openapi/organizations/connections/${name}.json`;
    assert.doesNotMatch(read(rel), internal, rel);
    for (const server of json(rel).servers || []) assert.match(server.url, /^https:\/\/api(-sandbox)?\.y\.uno/, rel);
  }
});
