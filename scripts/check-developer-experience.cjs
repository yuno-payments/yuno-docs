// Validate the redesigned entry paths without sending requests to the payments API.
const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const root = path.resolve(__dirname, "..");
const files = [
  "index.mdx",
  "snippets/homepage/SessionExample.jsx",
  ...fs
    .readdirSync(path.join(root, "docs/get-started"))
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => `docs/get-started/${f}`),
];
let links = 0;
for (const file of files) {
  const text = fs.readFileSync(path.join(root, file), "utf8");
  for (const match of text.matchAll(/(?:href="|\]\()(\/[^"\s)]*)/g)) {
    const route = match[1].split("#")[0];
    if (!route) continue;
    const name = route.slice(1);
    assert(
      [name, `${name}.mdx`, `${name}.md`, `${name}/index.mdx`].some((p) =>
        fs.existsSync(path.join(root, p)),
      ),
      `${file}: unresolved route ${route}`,
    );
    links++;
  }
}
const nav = JSON.stringify(
  JSON.parse(fs.readFileSync(path.join(root, "docs.json"), "utf8")).navigation,
);
for (const file of files.filter((f) => f.startsWith("docs/")))
  assert(
    nav.includes(file.replace(".mdx", "")),
    `Page missing from navigation: ${file}`,
  );
// Guard the checkout sample against drifting away from the checked-in API contract.
const schema = JSON.parse(
  fs.readFileSync(
    path.join(root, "openapi/checkout-sessions/create-checkout-session.json"),
    "utf8",
  ),
).paths["/checkout/sessions"].post.requestBody.content["application/json"]
  .schema;
const component = fs.readFileSync(
  path.join(root, "snippets/homepage/SessionExample.jsx"),
  "utf8",
);
for (const field of schema.required)
  assert(
    component.includes(field),
    `Session example lacks required field: ${field}`,
  );
assert(component.includes("https://api-sandbox.y.uno/v1/checkout/sessions"));
assert(component.includes("value: 25"));
assert(component.includes("response.ok"));
assert(component.includes("response.raise_for_status()"));
console.log(
  `Developer experience checks passed: ${files.length} entry files, ${links} local links, navigation, and session contract.`,
);
