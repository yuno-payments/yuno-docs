const test = require("node:test");
const assert = require("node:assert/strict");
const { inScopePages, tagFences, rewriteRedirectLinks, reportPage } = require("./docs-hygiene.cjs");

test('tagFences: json from {, bash from curl, html from <, php untouched, titled fence keeps title', () => {
  const src = '```\n{ "a": 1 }\n```\n```\ncurl -X POST\n```\n```\n<div>\n```\n```\n<?php\n```\n``` title="x"\n{ "b": 2 }\n```\n'
  assert.equal(tagFences(src), '```json\n{ "a": 1 }\n```\n```bash\ncurl -X POST\n```\n```html\n<div>\n```\n```\n<?php\n```\n```json title="x"\n{ "b": 2 }\n```\n')
})
test('rewriteRedirectLinks: canonical target, chain collapsed, anchor kept, external and mailto untouched', () => {
  const redirects = [{source:'/docs/overview',destination:'/docs/quickstart'},{source:'/a',destination:'/b'},{source:'/b',destination:'/c'}]
  assert.equal(rewriteRedirectLinks('[x](/docs/overview#top) [y](/a) [z](https://x.y/docs/overview) [m](mailto:a@b.c)', redirects), '[x](/docs/quickstart#top) [y](/c) [z](https://x.y/docs/overview) [m](mailto:a@b.c)')
})
test('inScopePages: excludes the API Reference tab and reference/ paths', () => {
  const nav = {navigation:{tabs:[{tab:'Documentation',groups:[{group:'G',root:'docs/r',pages:['docs/a',{group:'S',pages:['docs/b']}]}]},{tab:'API Reference',groups:[{group:'X',pages:['reference/x']}]}]}}
  assert.deepEqual(inScopePages(nav), ['docs/r','docs/a','docs/b'])
})
test('reportPage: short description, long title without sidebarTitle, third-party video, jsx import, export const', () => {
  const mdx = '---\ntitle: "A title that is definitely longer than thirty-two chars"\ndescription: "short"\n---\nimport {X} from "/snippets/x.jsx"\nexport const y = 1\n<iframe src="https://github.com/writechoiceorg/yuno-images/v.mp4" />\n'
  const r = reportPage('docs/p', mdx)
  assert.deepEqual(r.map(x => x.rule).sort(), ['description-short','export-const','jsx-import','third-party-video','title-long'].sort())
})
