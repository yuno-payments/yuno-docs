const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const read = (rel) => fs.readFileSync(path.join(root, rel), "utf8");

const eventsPage = "docs/webhooks/events";
const examplesPage = "docs/webhooks/object-and-examples";
const guidePage = "docs/payment-features/subscriptions/stripe-billing";
const changedPages = [eventsPage, examplesPage, guidePage];

const subscriptionCreationFailedDataFields = ["payment_id", "external_subscription", "dead_letter_kind", "reason", "occurred_at"];

function navPages() {
  const pages = new Set();
  (function walk(node) {
    if (typeof node === "string") pages.add(node);
    else if (Array.isArray(node)) node.forEach(walk);
    else if (node && typeof node === "object") Object.values(node).forEach(walk);
  })(JSON.parse(read("docs.json")).navigation);
  return pages;
}

function section(page, heading) {
  const s = read(`${page}.mdx`);
  const start = s.indexOf(`${heading}\n`);
  assert.notEqual(start, -1, `${page} has ${heading}`);
  const level = heading.match(/^#+/)[0];
  const rest = s.slice(start + heading.length + 1);
  const next = rest.search(new RegExp(`^#{1,${level.length}} `, "m"));
  return next === -1 ? rest : rest.slice(0, next);
}

function anchors(page) {
  return new Set(
    read(`${page}.mdx`)
      .split("\n")
      .filter((l) => /^#{1,6} /.test(l))
      .map((l) => l.replace(/^#+ /, "").replace(/`/g, "").trim().toLowerCase().replace(/[^a-z0-9_\s-]/g, "-").replace(/\s+/g, "-"))
  );
}

test("the events page lists subscription.creation_failed among the subscription triggers with when it fires", () => {
  const sub = section(eventsPage, "## Subscription");
  const row = sub.split("\n").find((l) => l.includes("`subscription.creation_failed`"));
  assert.ok(row, "row present in the Subscription section");
  assert.match(row, /^\| `CREATION_FAILED` \| `subscription\.creation_failed` \| Sent when a `SUCCEEDED` payment/);
  assert.match(row, /no subscription exists/);
  assert.ok(sub.indexOf("`subscription.plan_changed`") < sub.indexOf("`subscription.creation_failed`"));
});

test("the examples page has a full subscription.creation_failed payload whose data fields match SubscriptionCreationFailedData", () => {
  const sec = section(examplesPage, "### subscription.creation_failed");
  const fence = sec.match(/```json JSON\n([\s\S]*?)\n```/);
  assert.ok(fence, "JSON example present");
  const payload = JSON.parse(fence[1]);
  assert.equal(payload.type, "subscription");
  assert.equal(payload.type_event, "subscription.creation_failed");
  assert.equal(payload.version, 2);
  assert.match(payload.account_id, /^[0-9a-f-]{36}$/);
  assert.deepEqual(Object.keys(payload.data).sort(), [...subscriptionCreationFailedDataFields].sort());
  assert.match(payload.data.payment_id, /^[0-9a-f-]{36}$/);
  assert.equal(typeof payload.data.external_subscription, "object");
  assert.match(payload.data.external_subscription.id, /^sub_/);
  assert.match(payload.data.dead_letter_kind, /^[a-z_]+$/);
  assert.equal(typeof payload.data.reason, "string");
  assert.ok(!Number.isNaN(Date.parse(payload.data.occurred_at)) && payload.data.occurred_at.endsWith("Z"));
  for (const f of subscriptionCreationFailedDataFields) assert.ok(sec.includes(`| \`${f}\` |`), `field table documents ${f}`);
});

test("the Stripe Billing guide explains a succeeded payment without a subscription, the webhook, and what to do", () => {
  const sec = section(guidePage, "### If the subscription cannot be created");
  assert.match(sec, /`SUCCEEDED` without a Stripe subscription/);
  assert.match(sec, /does not refund the payment/);
  assert.ok(sec.includes("(/docs/webhooks/object-and-examples#subscription-creation_failed)"));
  assert.ok(sec.includes("`CREATION_FAILED`"));
  assert.match(sec, /\*\*Fix the cause and retry\.\*\*/);
  assert.match(sec, /\*\*Refund\.\*\*/);
  assert.ok(sec.includes("(/reference/payments/refund-payment)"));
});

test("every internal link on the changed pages resolves to an existing page or redirect and an existing heading", () => {
  const nav = navPages();
  const redirects = new Set(JSON.parse(read("redirects.json")).map((r) => r.source));
  for (const page of changedPages) {
    assert.ok(nav.has(page), `${page} in docs.json`);
    for (const [, target] of read(`${page}.mdx`).matchAll(/\]\((\/(?:docs|reference)\/[^)\s]*|#[^)\s]+)\)/g)) {
      const [p, hash] = target.startsWith("#") ? [page, target.slice(1)] : target.slice(1).split("#");
      const resolved = [p, `${p}/index`].find((c) => fs.existsSync(path.join(root, `${c}.mdx`)));
      assert.ok(resolved || redirects.has(`/${p}`), `${page}: ${target} page exists`);
      if (hash && changedPages.includes(p)) assert.ok(anchors(p).has(hash), `${page}: ${target} anchor exists`);
    }
  }
});

test("the new content names no internal services or ticket ids", () => {
  const added = [
    section(examplesPage, "### subscription.creation_failed"),
    section(guidePage, "### If the subscription cannot be created"),
    section(eventsPage, "## Subscription").split("\n").filter((l) => l.includes("creation_failed")).join("\n"),
  ].join("\n");
  for (const re of [/billing-bridge|organization-webhook|-ms\b/, /\b[A-Z][A-Z0-9]+-\d{3,}\b/, /dead letter|dead-letter/i]) assert.doesNotMatch(added, re);
});
