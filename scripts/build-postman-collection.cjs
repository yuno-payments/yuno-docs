#!/usr/bin/env node
/**
 * Build the Yuno Postman collection from the API reference itself.
 *
 * Sources of truth (nothing is hand-copied from Postman):
 *   - docs.json                 the API Reference sidebar: folder tree, request
 *                               order and which pages are visible
 *   - reference/⋆⋆/⋆.mdx        each page's title and its `openapi:` binding
 *   - openapi.json              the aggregated spec (scripts/build-openapi-root.cjs):
 *                               parameters, headers, bodies, examples, responses
 *
 * Output, served statically by Mintlify:
 *   - files/postman/Yuno_API.postman_collection.json   (Postman Collection v2.1)
 *
 * What the collection gives a developer:
 *   - one folder per sidebar group, one request per endpoint page, same order
 *   - auth headers wired to the environment (public_api_key, private_secret_key)
 *   - a fresh X-Idempotency-Key on every send
 *   - every documented request body as a saved example, with its response
 *   - IDs chained between requests: create a customer, and customer_id is
 *     filled in for every later request
 *   - a "Start here" folder that runs a first payment end to end
 *   - a link back to the docs page on every request
 *
 * The output is deterministic (stable ids, no timestamps), so CI can verify the
 * committed file still matches the reference.
 *
 * Usage:
 *   node scripts/build-postman-collection.cjs          regenerate the collection
 *   node scripts/build-postman-collection.cjs --check  fail when the committed
 *                                                      file is out of date
 */

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = path.join(__dirname, "..");
const SITE = "https://docs.y.uno";
const OUT = "files/postman/Yuno_API.postman_collection.json";
const SANDBOX_V1 = "https://api-sandbox.y.uno/v1";
const METHODS = ["get", "post", "put", "patch", "delete"];

const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");
const readJson = (p) => JSON.parse(read(p));

/* ------------------------------------------------------------------ */
/* Curated choices. Everything else is derived from the spec.          */
/* ------------------------------------------------------------------ */

// Request body shown by default when the first documented example is not the
// one a developer should start from. Key: "<METHOD> <root path>".
const DEFAULT_EXAMPLE = {
  "POST /payments": "Card - With card details",
  "POST /customers": "Customer (min. data)",
};

// Header (case-insensitive) → value used in the request.
const HEADER_VALUES = {
  "public-api-key": "{{public_api_key}}",
  "x-public-api-key": "{{public_api_key}}",
  "private-secret-key": "{{private_secret_key}}",
  "x-private-secret-key": "{{private_secret_key}}",
  "x-idempotency-key": "{{idempotency_key}}",
  "x-account-code": "{{account_id}}",
  "x-organization-code": "{{org_code}}",
  "yuno-account-id": "{{account_id}}",
};

// Placeholders used in documented examples → collection variable.
const PLACEHOLDER_ALIASES = {
  "your yuno account_id": "account_id",
  "your account_id": "account_id",
  "account-code": "account_id",
  "account_code": "account_id",
  "current vaulted_token of the subscription": "vaulted_token",
};

// Extra values saved from a successful response, on top of the automatic
// "POST /things → thing_id" rule. Each entry is [variable, JS expression on `body`].
const EXTRA_CAPTURES = {
  "POST /payments": [
    ["transaction_id", "(Array.isArray(body.transactions) ? (body.transactions[body.transactions.length - 1] || {}).id : (body.transactions || {}).id)"],
    ["vaulted_token", "(body.payment_method || {}).vaulted_token"],
  ],
  // two-card payments: one transaction per card, nested under each payment method
  "POST /v2/payments": [
    ["transaction_id", "(((((body.payment_method || {}).payment_methods || [])[0] || {}).transactions || [])[0] || {}).id || (Array.isArray(body.transactions) ? (body.transactions[body.transactions.length - 1] || {}).id : (body.transactions || {}).id)"],
    ["transaction_id_2", "(((((body.payment_method || {}).payment_methods || [])[1] || {}).transactions || [])[0] || {}).id"],
  ],
  "POST /customers": [["merchant_customer_id", "body.merchant_customer_id"]],
  "POST /checkout/sessions": [["checkout_session", "body.checkout_session"]],
  "POST /customers/sessions": [["customer_session", "body.customer_session"]],
  "POST /customers/{customer_id}/payment-methods": [
    ["payment_method_id", "body.id"],
    ["vaulted_token", "body.vaulted_token"],
  ],
  "POST /payment-links": [["payment_link_code", "body.code || body.id"]],
};

// Notes shown on a sidebar folder, on top of its links to the docs.
const FOLDER_NOTES = {
  "PCI Proxy":
    "Placeholders such as `{{vaulted_token.<TOKEN>.<field>}}` are Yuno's own syntax, replaced with card data inside Yuno. Postman has no variable with that name, so it sends the text as written, which is what the proxy expects.",
};

// The guided first run. Each step reuses a generated request and overrides
// its name, body and notes. Bodies were run against the sandbox.
const QUICKSTART = [
  {
    op: "POST /customers",
    name: "1. Create a customer",
    note: "Creates the payer. `customer_id` is saved for the next requests.",
    body: {
      merchant_customer_id: "postman-{{$timestamp}}",
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      country: "US",
    },
  },
  {
    op: "POST /checkout/sessions",
    name: "2. Create a checkout session",
    note: "Opens the session your frontend SDK would use. `checkout_session` is saved for later requests.",
    body: {
      account_id: "{{account_id}}",
      customer_id: "{{customer_id}}",
      merchant_order_id: "postman-{{$timestamp}}",
      payment_description: "Postman first payment",
      country: "US",
      amount: { currency: "USD", value: 100 },
    },
  },
  {
    op: "POST /payments",
    name: "3. Create a payment (card, DIRECT workflow)",
    note: "Charges a test card server to server, so no SDK is needed. `payment_id` and `transaction_id` are saved.\n\nRaw card numbers only work in sandbox, or in production for PCI-certified merchants. With the SDK you send a one-time token instead.",
    body: {
      account_id: "{{account_id}}",
      description: "Postman first payment",
      merchant_order_id: "postman-{{$timestamp}}",
      country: "US",
      amount: { currency: "USD", value: 100 },
      workflow: "DIRECT",
      customer_payer: {
        id: "{{customer_id}}",
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
      },
      payment_method: {
        type: "CARD",
        detail: {
          card: {
            capture: true,
            card_data: {
              number: "4111111111111111",
              expiration_month: 11,
              expiration_year: 28,
              security_code: "123",
              holder_name: "John Doe",
            },
          },
        },
      },
    },
  },
  {
    op: "GET /payments/{payment_id}",
    name: "4. Retrieve the payment",
    note: "Reads the payment you just created. Check `status` and `sub_status`.",
  },
  {
    op: "POST /payments/{payment_id}/transactions/{transaction_id}/refund",
    name: "5. Refund the payment",
    note: "Refunds the full amount of the transaction from step 3. Send an `amount` to refund part of it.",
    body: {
      description: "Postman refund",
      reason: "REQUESTED_BY_CUSTOMER",
      merchant_reference: "postman-refund-{{$timestamp}}",
    },
  },
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

// Stable UUID from a string, so regenerating never churns ids.
function uid(seed) {
  const h = crypto.createHash("sha1").update("yuno-postman:" + seed).digest("hex");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-5${h.slice(13, 16)}-a${h.slice(17, 20)}-${h.slice(20, 32)}`;
}

function frontmatter(file) {
  const src = read(file);
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const out = {};
  if (!m) return out;
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].trim();
    // tolerate a missing closing quote, which Mintlify also accepts
    v = v.replace(/^["']/, "").replace(/["']$/, "");
    out[kv[1]] = v;
  }
  return out;
}

const templKey = (method, p) => `${method.toUpperCase()} ${p.replace(/\{[^}]+\}/g, "{}")}`;

function singular(seg) {
  const s = seg.replace(/-/g, "_");
  if (s.endsWith("ies")) return s.slice(0, -3) + "y";
  return s.endsWith("s") ? s.slice(0, -1) : s;
}

// Variable that holds a path parameter. Generic names ({id}, {code}) get the
// resource in front, so /payment-links/{code} uses {{payment_link_code}}.
function pathVar(segments, i) {
  const name = segments[i].slice(1, -1);
  // /banking/accounts/{account_id} is a banking account, not the Yuno account
  if (name === "account_id" && segments[0] === "banking") return "banking_account_id";
  if (name !== "id" && name !== "code") return name;
  for (let j = i - 1; j >= 0; j--) if (!segments[j].startsWith("{")) return `${singular(segments[j])}_${name}`;
  return name;
}

function placeholder(str) {
  const m = str.match(/^\s*(?:<([^<>]{1,60})>|\{\{([^{}]{1,60})\}\})\s*$/);
  if (!m) return str;
  const raw = (m[1] || m[2]).trim();
  const alias = PLACEHOLDER_ALIASES[raw.toLowerCase()];
  if (alias) return `{{${alias}}}`;
  if (/^[A-Za-z][\w-]*$/.test(raw)) return `{{${raw.replace(/-/g, "_").toLowerCase()}}}`;
  return str;
}

// Point documented example bodies at collection variables.
function wireBody(value, trail = []) {
  if (Array.isArray(value)) return value.map((v) => wireBody(v, trail));
  if (value && typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      if (typeof v === "string") {
        const parent = trail[trail.length - 1];
        if (k === "account_id") out[k] = "{{account_id}}";
        else if (k === "id" && parent === "customer_payer") out[k] = "{{customer_id}}";
        else if (k === "session" && parent === "checkout") out[k] = "{{checkout_session}}";
        else if (k === "checkout_session") out[k] = "{{checkout_session}}";
        else out[k] = placeholder(v);
      } else out[k] = wireBody(v, trail.concat(k));
    }
    return out;
  }
  return typeof value === "string" ? placeholder(value) : value;
}

/* ------------------------------------------------------------------ */
/* Spec access                                                         */
/* ------------------------------------------------------------------ */

const spec = readJson("openapi.json");

function deref(node, seen = new Set()) {
  let cur = node;
  while (cur && typeof cur === "object" && typeof cur.$ref === "string" && cur.$ref.startsWith("#/")) {
    if (seen.has(cur.$ref)) return {};
    seen.add(cur.$ref);
    cur = cur.$ref.slice(2).split("/").reduce((o, k) => (o == null ? o : o[k.replace(/~1/g, "/").replace(/~0/g, "~")]), spec);
  }
  return cur || {};
}

// Example value from a schema, for bodies documented without an example.
function sample(schemaIn, depth = 0, seen = new Set()) {
  const schema = deref(schemaIn);
  if (!schema || typeof schema !== "object" || depth > 6) return undefined;
  if (schemaIn && schemaIn.$ref) {
    if (seen.has(schemaIn.$ref)) return undefined;
    seen = new Set(seen).add(schemaIn.$ref);
  }
  if (schema.example !== undefined) return schema.example;
  if (Array.isArray(schema.examples) && schema.examples.length) return schema.examples[0];
  if (schema.default !== undefined) return schema.default;
  if (schema.const !== undefined) return schema.const;
  if (Array.isArray(schema.enum) && schema.enum.length) return schema.enum.find((e) => e !== null) ?? schema.enum[0];
  if (Array.isArray(schema.allOf)) {
    const merged = {};
    for (const part of schema.allOf) {
      const v = sample(part, depth + 1, seen);
      if (v && typeof v === "object" && !Array.isArray(v)) Object.assign(merged, v);
    }
    return merged;
  }
  for (const key of ["oneOf", "anyOf"]) {
    if (Array.isArray(schema[key]) && schema[key].length) return sample(schema[key][0], depth + 1, seen);
  }
  let type = Array.isArray(schema.type) ? schema.type.find((t) => t !== "null") : schema.type;
  if (!type && schema.properties) type = "object";
  if (!type && schema.items) type = "array";
  if (type === "object") {
    const out = {};
    for (const [k, v] of Object.entries(schema.properties || {})) {
      if (deref(v).readOnly) continue;
      const val = sample(v, depth + 1, seen);
      if (val !== undefined) out[k] = val;
    }
    return out;
  }
  if (type === "array") {
    const item = sample(schema.items || {}, depth + 1, seen);
    return item === undefined ? [] : [item];
  }
  if (type === "integer" || type === "number") return 0;
  if (type === "boolean") return false;
  if (type === "string") {
    if (schema.format === "date-time") return "2026-01-01T00:00:00Z";
    if (schema.format === "date") return "2026-01-01";
    if (schema.format === "uuid") return "00000000-0000-0000-0000-000000000000";
    if (schema.format === "email") return "john.doe@example.com";
    if (schema.format === "uri" || schema.format === "url") return "https://example.com";
    return "";
  }
  return undefined;
}

function jsonContent(node) {
  const content = deref(node).content || {};
  const key = Object.keys(content).find((k) => /json/i.test(k));
  return key ? content[key] : null;
}

// [{ name, value }] for a request body or a response.
function examplesOf(content) {
  if (!content) return [];
  const out = [];
  for (const [name, ex] of Object.entries(content.examples || {})) {
    const e = deref(ex);
    if (e && e.value !== undefined) out.push({ name, value: e.value });
  }
  if (!out.length && content.example !== undefined) out.push({ name: "Example", value: content.example });
  if (!out.length && content.schema) {
    const v = sample(content.schema);
    if (v !== undefined && !(typeof v === "object" && v && !Object.keys(v).length)) out.push({ name: "Example", value: v });
  }
  return out;
}

const opIndex = new Map();
for (const [p, item] of Object.entries(spec.paths || {})) {
  for (const m of METHODS) if (item[m]) opIndex.set(templKey(m, p), { method: m.toUpperCase(), path: p, op: item[m] });
}

// A page binding ("/openapi/x.json POST /payments") → operation in the root spec.
function resolveBinding(binding) {
  const m = binding.match(/^\/?(openapi\/\S+\.json)\s+([A-Za-z]+)\s+(\S+)$/);
  if (!m || !METHODS.includes(m[2].toLowerCase())) return null;
  const [, file, method, p] = m;
  let v2 = false;
  try {
    const servers = (readJson(file).servers || []).map((s) => s.url);
    v2 = servers.length > 0 && servers.every((u) => /\/v2\/?$/.test(u));
  } catch (_) {
    return null;
  }
  const bare = p.replace(/^\/v1(?=\/)/, "");
  const candidates = v2 ? ["/v2" + bare, bare, p] : [bare, p, "/v2" + bare];
  for (const c of candidates) {
    const hit = opIndex.get(templKey(method, c));
    if (hit) return hit;
  }
  return null;
}

/* ------------------------------------------------------------------ */
/* Request builder                                                     */
/* ------------------------------------------------------------------ */

const ENV_OWNED = new Set(["account_id", "org_code", "public_api_key", "private_secret_key", "base_url"]);
const CAPTURED_NAMES = new Set(Object.values(EXTRA_CAPTURES).flatMap((list) => list.map(([name]) => name)));
const usedVariables = new Set();
const noteVar = (text) => {
  for (const m of String(text).matchAll(/\{\{([a-z][\w]*)\}\}/g)) usedVariables.add(m[1]);
  return text;
};

function buildHeaders(op, hasBody) {
  const headers = [];
  const seen = new Set();
  const add = (name, description, enabled = true, fallback) => {
    const low = name.toLowerCase();
    if (seen.has(low)) return;
    seen.add(low);
    const value = HEADER_VALUES[low] ?? fallback ?? `{{${low.replace(/[^a-z0-9]+/g, "_")}}}`;
    const h = { key: name, value: noteVar(value) };
    if (description) h.description = description;
    if (!enabled) h.disabled = true;
    headers.push(h);
  };

  const schemes = (spec.components || {}).securitySchemes || {};
  const requirement = (op.security || spec.security || [])[0] || {};
  for (const schemeName of Object.keys(requirement)) {
    const s = schemes[schemeName];
    if (s && s.type === "apiKey" && s.in === "header") add(s.name, s.description);
  }
  for (const raw of op.parameters || []) {
    const p = deref(raw);
    if (p.in !== "header") continue;
    const schema = deref(p.schema);
    const example = p.example ?? schema.example ?? schema.default;
    const low = p.name.toLowerCase();
    const always = low === "x-idempotency-key";
    add(p.name, p.description, Boolean(p.required) || always, example !== undefined ? String(example) : undefined);
  }
  if (hasBody) headers.push({ key: "Content-Type", value: "application/json" });
  return headers;
}

function buildUrl(method, rootPath, op) {
  const v2 = rootPath.startsWith("/v2/");
  const host = v2 ? "{{base_url_v2}}" : "{{base_url}}";
  const segments = (v2 ? rootPath.slice(3) : rootPath).split("/").filter(Boolean);
  const params = (op.parameters || []).map((p) => deref(p));
  const variable = [];
  const pathOut = segments.map((seg, i) => {
    if (!seg.startsWith("{")) return seg;
    const name = seg.slice(1, -1);
    const v = pathVar(segments, i);
    const def = params.find((p) => p.in === "path" && p.name === name) || {};
    const entry = { key: name, value: noteVar(`{{${v}}}`) };
    if (def.description) entry.description = def.description;
    variable.push(entry);
    return ":" + name;
  });
  const query = [];
  const queryParams = params.filter((p) => p.in === "query");
  for (const p of queryParams) {
    const schema = deref(p.schema);
    let value = p.example ?? schema.example ?? schema.default ?? (Array.isArray(schema.enum) ? schema.enum[0] : undefined);
    // a query parameter that names a saved ID reads it from the collection
    if (p.name === "account_id") value = "{{account_id}}";
    else if (value === undefined && CAPTURED_NAMES.has(p.name)) value = noteVar(`{{${p.name}}}`);
    if (value !== null && typeof value === "object") value = JSON.stringify(value);
    const q = { key: p.name, value: String(value ?? "") };
    if (p.description) q.description = p.description;
    // a lookup with a single query parameter is unusable without it
    // account_id stays on: endpoints that take it need an account selector
    if (!p.required && p.name !== "account_id" && (queryParams.length > 1 || variable.length)) q.disabled = true;
    query.push(q);
  }
  const enabled = query.filter((q) => !q.disabled).map((q) => `${q.key}=${q.value}`);
  const url = {
    raw: `${host}/${pathOut.join("/")}${enabled.length ? "?" + enabled.join("&") : ""}`,
    host: [host],
    path: pathOut,
  };
  if (query.length) url.query = query;
  if (variable.length) url.variable = variable;
  return url;
}

const rawBody = (value) => ({
  mode: "raw",
  raw: noteVar(JSON.stringify(value, null, 2)),
  options: { raw: { language: "json" } },
});

// Variables to save after a successful call.
function captures(method, rootPath) {
  const key = `${method} ${rootPath}`;
  const list = [...(EXTRA_CAPTURES[key] || [])];
  if (method === "POST") {
    const prefix = templKey("GET", rootPath).slice(4) + "/{}";
    for (const p of Object.keys(spec.paths)) {
      if (p.replace(/\{[^}]+\}/g, "{}") !== prefix) continue;
      const segs = p.split("/").filter(Boolean);
      const v = pathVar(segs, segs.length - 1);
      // account_id, org_code and the keys belong to the environment
      if (!list.some(([name]) => name === v) && !ENV_OWNED.has(v)) {
        const field = segs[segs.length - 1].slice(1, -1);
        const own = v === field ? `body[${JSON.stringify(field)}] || body.id` : "body.id";
        list.push([v, `${own} || body.code`]);
      }
      break;
    }
  }
  return list;
}

function testScript(method, rootPath) {
  const lines = [
    'pm.test("Request succeeded (2xx)", function () {',
    "    pm.response.to.be.success;",
    "});",
  ];
  const list = captures(method, rootPath);
  if (list.length) {
    lines.push("", "// Save IDs from the response so the next requests can use them.");
    lines.push("if (pm.response.code >= 200 && pm.response.code < 300) {");
    lines.push("    let body = {};", "    try { body = pm.response.json() || {}; } catch (e) {}");
    lines.push("    const save = function (name, value) {");
    lines.push('        if (value === undefined || value === null || value === "") return;');
    lines.push("        pm.collectionVariables.set(name, String(value));");
    lines.push('        console.log("Yuno: saved " + name + " = " + value);');
    lines.push("    };");
    for (const [name, expr] of list) {
      usedVariables.add(name);
      lines.push(`    save(${JSON.stringify(name)}, ${expr});`);
    }
    lines.push("}");
  }
  return lines;
}

function responseExamples(op) {
  const out = [];
  for (const [code, resp] of Object.entries(op.responses || {})) {
    const r = deref(resp);
    for (const ex of examplesOf(jsonContent(r))) out.push({ code: Number(code), status: r.description || "", ...ex });
  }
  return out;
}

const STATUS_TEXT = { 200: "OK", 201: "Created", 202: "Accepted", 204: "No Content", 400: "Bad Request", 401: "Unauthorized", 403: "Forbidden", 404: "Not Found", 405: "Method Not Allowed", 409: "Conflict", 422: "Unprocessable Entity", 429: "Too Many Requests", 500: "Internal Server Error", 503: "Service Unavailable", 504: "Gateway Timeout" };

function savedExample(seed, name, request, resp) {
  return {
    id: uid("example:" + seed),
    name,
    originalRequest: request,
    status: STATUS_TEXT[resp.code] || String(resp.code),
    code: resp.code,
    _postman_previewlanguage: "json",
    header: [{ key: "Content-Type", value: "application/json" }],
    cookie: [],
    body: JSON.stringify(resp.value, null, 2),
  };
}

function buildRequest({ method, rootPath, op, name, pagePath, seed, override = {} }) {
  const key = `${method} ${rootPath}`;
  const bodyExamples = examplesOf(jsonContent(op.requestBody)).map((e) => ({ name: e.name, value: wireBody(e.value) }));
  const wanted = DEFAULT_EXAMPLE[key];
  const defaultBody = override.body
    ? { name: "Example", value: override.body }
    : bodyExamples.find((e) => e.name === wanted) || bodyExamples[0];
  const hasBody = Boolean(defaultBody) || Boolean(op.requestBody);

  const description = [];
  if (override.note) description.push(override.note);
  if (op.deprecated === true) description.push("**Deprecated.** Check the docs page for the replacement.");
  if (op.description && !override.note) description.push(String(op.description).trim());
  if (pagePath) description.push(`Docs: ${SITE}/${pagePath}`);

  const makeRequest = (bodyValue) => {
    const r = { method, header: buildHeaders(op, hasBody), url: buildUrl(method, rootPath, op) };
    if (bodyValue !== undefined) r.body = rawBody(bodyValue);
    return r;
  };

  const request = makeRequest(defaultBody ? defaultBody.value : undefined);
  request.description = description.join("\n\n");

  const responses = responseExamples(op);
  const success = responses.filter((r) => r.code < 300);
  const saved = [];
  if (!override.plain) {
    if (bodyExamples.length) {
      bodyExamples.forEach((ex, i) => {
        const resp = success.find((r) => r.name === ex.name) || success[0];
        if (resp) saved.push(savedExample(`${seed}:body:${i}`, ex.name, makeRequest(ex.value), resp));
      });
    } else if (success[0]) {
      saved.push(savedExample(`${seed}:ok`, `${success[0].code} ${success[0].name}`, makeRequest(undefined), success[0]));
    }
    responses
      .filter((r) => r.code >= 400)
      .forEach((r, i) => {
        const label = r.name === "Example" || r.name === "Result" ? STATUS_TEXT[r.code] || "Error" : r.name;
        saved.push(savedExample(`${seed}:err:${i}`, `${r.code} ${label}`, makeRequest(defaultBody ? defaultBody.value : undefined), r));
      });
  }

  return {
    id: uid("request:" + seed),
    name: op.deprecated === true && !override.name ? `${name} (deprecated)` : override.name || name,
    event: [{ listen: "test", script: { id: uid("test:" + seed), type: "text/javascript", exec: testScript(method, rootPath) } }],
    request,
    response: saved,
  };
}

/* ------------------------------------------------------------------ */
/* Sidebar → folders                                                   */
/* ------------------------------------------------------------------ */

const docs = readJson("docs.json");
const english = (docs.navigation.languages || []).find((l) => l.language === "en") || docs.navigation;
const referenceTab = (english.tabs || []).find((t) => /api reference/i.test(t.tab || ""));
if (!referenceTab) throw new Error("docs.json: no 'API Reference' tab found for English");

const boundOps = new Set();
const pageOfPath = new Map(); // root path → the page that documents it
const folderOfPage = new Map(); // page → the folder items it was added to
const stats = { requests: 0, folders: 0, examples: 0, unresolved: [] };

function buildNode(node, trail) {
  if (typeof node === "string") {
    const file = node + ".mdx";
    if (!fs.existsSync(path.join(ROOT, file))) return { page: null };
    const fm = frontmatter(file);
    if (!fm.openapi) return { page: { title: fm.title || node.split("/").pop(), path: node } };
    if (/\bwebhook\b/i.test(fm.openapi.split(/\s+/)[1] || "")) return { page: { title: fm.title, path: node } };
    const hit = resolveBinding(fm.openapi);
    if (!hit) {
      stats.unresolved.push(`${node}  (${fm.openapi})`);
      return { page: { title: fm.title || node, path: node } };
    }
    boundOps.add(`${hit.method} ${hit.path}`);
    pageOfPath.set(hit.path, { node, title: fm.title });
    const item = buildRequest({
      method: hit.method,
      rootPath: hit.path,
      op: hit.op,
      name: fm.title || hit.op.summary || `${hit.method} ${hit.path}`,
      pagePath: node,
      seed: node,
    });
    stats.requests++;
    stats.examples += item.response.length;
    return { item };
  }
  if (node && typeof node === "object" && Array.isArray(node.pages)) {
    if (node.hidden) return {};
    const name = node.group || "Group";
    const items = [];
    const related = [];
    for (const child of node.pages) {
      const built = buildNode(child, trail.concat(name));
      if (built.item) {
        items.push(built.item);
        if (typeof child === "string") folderOfPage.set(child, items);
      } else if (built.page) related.push(built.page);
    }
    if (!items.length) return {};
    stats.folders++;
    const folder = { id: uid("folder:" + trail.concat(name).join("/")), name, item: items };
    const notes = [];
    if (FOLDER_NOTES[name]) notes.push(FOLDER_NOTES[name]);
    if (related.length) {
      notes.push("Guides and object references for this section:\n\n" + related.map((p) => `- [${p.title}](${SITE}/${p.path})`).join("\n"));
    }
    if (notes.length) folder.description = notes.join("\n\n");
    return { item: folder };
  }
  return {};
}

const folders = [];
for (const group of referenceTab.groups || referenceTab.pages || []) {
  const built = buildNode(group, []);
  if (built.item) folders.push(built.item);
}

// Operations no sidebar page binds directly. When a page documents the same
// path with another method (PCI Proxy forwards GET, PUT, PATCH and DELETE too),
// the operation joins that page's folder. Anything left goes to "More endpoints".
const orphans = [];
for (const o of opIndex.values()) {
  if (boundOps.has(`${o.method} ${o.path}`)) continue;
  const page = pageOfPath.get(o.path);
  const target = page && folderOfPage.get(page.node);
  if (!target) {
    orphans.push(o);
    continue;
  }
  const item = buildRequest({
    method: o.method,
    rootPath: o.path,
    op: o.op,
    name: `${page.title} (${o.method})`,
    pagePath: page.node,
    seed: `${page.node}:${o.method}`,
  });
  target.push(item);
  stats.requests++;
  stats.examples += item.response.length;
}

/* ------------------------------------------------------------------ */
/* Start here                                                          */
/* ------------------------------------------------------------------ */

const quickstartItems = QUICKSTART.map((step, i) => {
  const hit = opIndex.get(templKey(...step.op.split(" ")));
  if (!hit) throw new Error(`Quickstart step ${i + 1}: ${step.op} is not in openapi.json`);
  return buildRequest({
    method: hit.method,
    rootPath: hit.path,
    op: hit.op,
    name: step.name,
    seed: "quickstart:" + i,
    override: { name: step.name, note: step.note, body: step.body, plain: true },
  });
});

const quickstart = {
  id: uid("folder:start-here"),
  name: "Start here: your first payment",
  description: [
    "Five requests that take you from zero to a refunded sandbox payment. Send them in order, or run the folder.",
    "",
    "Before you send:",
    "1. Import and select the **Yuno Sandbox** environment.",
    "2. Fill in `public_api_key`, `private_secret_key` and `account_id` from the [Dashboard](https://dashboard.y.uno/developers), with the context chip on **Test**.",
    `3. Make sure the account can process cards: connect the Yuno Testing Gateway and route cards to it (${SITE}/docs/direct-integration-use-cases/yuno-testing-gateway). Without a card route, step 3 fails.`,
    "",
    "Each request saves the IDs the next one needs (`customer_id`, `checkout_session`, `payment_id`, `transaction_id`), so you never copy and paste.",
    "",
    `Guide: ${SITE}/reference/getting-started/postman-collections`,
  ].join("\n"),
  item: quickstartItems,
};

/* ------------------------------------------------------------------ */
/* Collection                                                          */
/* ------------------------------------------------------------------ */

const prerequest = [
  "// Runs before every request in the collection.",
  "const baseUrl = pm.variables.get(\"base_url\") || \"\";",
  "",
  "// v2 endpoints live on the same host as v1.",
  "pm.collectionVariables.set(\"base_url_v2\", baseUrl.replace(/\\/v1\\/?$/, \"\") + \"/v2\");",
  "",
  "// Idempotency: a new key on every send. When a request times out and you do",
  "// not know its outcome, set retry_idempotency_key to last_idempotency_key and",
  "// send again: Yuno returns the original result and never charges twice.",
  "// Clear retry_idempotency_key afterwards.",
  "const retryKey = pm.collectionVariables.get(\"retry_idempotency_key\");",
  "const idempotencyKey = retryKey || pm.variables.replaceIn(\"{{$guid}}\");",
  "pm.variables.set(\"idempotency_key\", idempotencyKey);",
  "pm.collectionVariables.set(\"last_idempotency_key\", idempotencyKey);",
  "if (retryKey) console.warn(\"Yuno: reusing X-Idempotency-Key \" + retryKey + \" (retry_idempotency_key is set).\");",
  "",
  "const missing = [\"public_api_key\", \"private_secret_key\"].filter(function (k) { return !pm.variables.get(k); });",
  "if (missing.length) {",
  "    throw new Error(\"Yuno: \" + missing.join(\" and \") + \" not set. Select the Yuno Sandbox environment and paste your API keys from https://dashboard.y.uno/developers\");",
  "}",
  "",
  "// Sandbox keys only work on api-sandbox.y.uno, live keys only on api.y.uno.",
  "const publicKey = String(pm.variables.get(\"public_api_key\"));",
  "const sandboxHost = baseUrl.indexOf(\"sandbox\") !== -1;",
  "if (sandboxHost && /^prod/i.test(publicKey)) console.warn(\"Yuno: you are sending a production key to the sandbox host.\");",
  "if (!sandboxHost && /^sandbox/i.test(publicKey)) console.warn(\"Yuno: you are sending a sandbox key to the production host.\");",
  "if (!sandboxHost) console.warn(\"Yuno: this request goes to PRODUCTION (\" + baseUrl + \").\");",
];

const collectionTests = [
  "// Runs after every request in the collection.",
  "if (pm.response.code >= 400) {",
  "    let body = {};",
  "    try { body = pm.response.json() || {}; } catch (e) {}",
  "    const trace = pm.response.headers.get(\"x-trace-id\") || pm.response.headers.get(\"trace-id\") || pm.response.headers.get(\"x-request-id\");",
  "    console.error(\"Yuno \" + pm.response.code + \": \" + (body.code || \"\") + \" \" + JSON.stringify(body.messages || body.message || \"\"));",
  "    if (trace) console.error(\"Yuno trace id (send this to support): \" + trace);",
  "}",
];

const info = spec.info || {};
const description = [
  String(info.description || "").trim(),
  "",
  "## Quick start",
  "1. Import this collection and the **Yuno Sandbox** environment.",
  "2. Set `public_api_key`, `private_secret_key` and `account_id` in the environment.",
  "3. Open **Start here: your first payment** and send the requests in order.",
  "",
  "## How it works",
  "- **Same structure as the API reference.** Folders and requests follow the sidebar on docs.y.uno, and every request links to its page.",
  "- **Auth is wired.** `public-api-key` and `private-secret-key` read from the environment. Never commit or share an environment with keys in it.",
  "- **Idempotency is automatic.** `X-Idempotency-Key` gets a fresh UUID on every send, saved as `last_idempotency_key`. When a request times out and you do not know its outcome, copy that value into `retry_idempotency_key` and send again: Yuno returns the original result instead of creating a second payment. Clear `retry_idempotency_key` afterwards.",
  "- **IDs chain.** A successful create saves its ID (`customer_id`, `payment_id`, ...) as a collection variable, and later requests use it.",
  "- **Every documented scenario is a saved example.** Open the examples under a request to see each body and its response.",
  "- **Errors are explained.** A failed call prints the error code, messages and trace ID in the Postman console.",
  "",
  "## Environments",
  "- Sandbox: `https://api-sandbox.y.uno/v1`",
  "- Production: `https://api.y.uno/v1` (real money)",
  "",
  "This collection is generated from the Yuno OpenAPI spec, so it always matches the API reference.",
  "",
  `- API reference: ${SITE}/reference/getting-started/api-reference-overview`,
  `- OpenAPI spec: ${SITE}/openapi.json`,
  `- Postman guide: ${SITE}/reference/getting-started/postman-collections`,
].join("\n");

const items = [quickstart, ...folders];
if (orphans.length) {
  items.push({
    id: uid("folder:more"),
    name: "More endpoints",
    item: orphans.map((o) =>
      buildRequest({ method: o.method, rootPath: o.path, op: o.op, name: o.op.summary || `${o.method} ${o.path}`, seed: `orphan:${o.method} ${o.path}` })
    ),
  });
}

// Captured IDs start empty; base_url defaults to sandbox so the collection
// works even before an environment is selected.
const FIXED = new Set(["base_url", "base_url_v2", "public_api_key", "private_secret_key", "account_id", "org_code", "idempotency_key", "last_idempotency_key", "retry_idempotency_key"]);
const variables = [
  { key: "base_url", value: SANDBOX_V1, type: "string" },
  { key: "base_url_v2", value: SANDBOX_V1.replace(/\/v1$/, "/v2"), type: "string" },
  { key: "last_idempotency_key", value: "", type: "string" },
  { key: "retry_idempotency_key", value: "", type: "string" },
  ...[...usedVariables]
    .filter((v) => !FIXED.has(v))
    .sort()
    .map((v) => ({ key: v, value: "", type: "string" })),
];

const collection = {
  info: {
    _postman_id: uid("collection"),
    name: info.title || "Yuno Payments API",
    description,
    version: info.version || "1.0.0",
    schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
  },
  item: items,
  event: [
    { listen: "prerequest", script: { id: uid("collection:prerequest"), type: "text/javascript", exec: prerequest } },
    { listen: "test", script: { id: uid("collection:test"), type: "text/javascript", exec: collectionTests } },
  ],
  variable: variables,
};

const output = JSON.stringify(collection, null, 2) + "\n";
const outFile = path.join(ROOT, OUT);

if (process.argv.includes("--check")) {
  const current = fs.existsSync(outFile) ? fs.readFileSync(outFile, "utf8") : "";
  if (current !== output) {
    console.error(`${OUT} is out of date with the API reference.`);
    console.error("Run: node scripts/build-postman-collection.cjs");
    process.exit(1);
  }
  if (stats.unresolved.length) {
    console.error("Pages with an openapi binding that is not in openapi.json:\n  " + stats.unresolved.join("\n  "));
    process.exit(1);
  }
  console.log(`${OUT} is up to date (${stats.requests} requests).`);
} else {
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, output);
  console.log(`Wrote ${OUT}`);
  console.log(`  folders: ${stats.folders}  requests: ${stats.requests} (+${quickstartItems.length} quickstart)  saved examples: ${stats.examples}`);
  console.log(`  spec operations: ${opIndex.size}  not in sidebar: ${orphans.length}  size: ${(output.length / 1024 / 1024).toFixed(2)} MB`);
  if (stats.unresolved.length) console.log("  UNRESOLVED bindings:\n    " + stats.unresolved.join("\n    "));
  if (orphans.length) console.log("  orphans:\n    " + orphans.map((o) => `${o.method} ${o.path}`).join("\n    "));
}
