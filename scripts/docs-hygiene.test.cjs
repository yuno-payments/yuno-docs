const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { inScopePages, tagFences, rewriteRedirectLinks, frontmatter, reportPage, main } = require("./docs-hygiene.cjs");

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
test('frontmatter: block scalar description is joined', () => {
  const mdx = '---\ntitle: "T"\ndescription: >-\n  Step-by-step guide on integrating the Yuno Headless SDK into\n  your mobile app.\nrobots: index\n---\nBody\n'
  assert.equal(frontmatter(mdx).description, 'Step-by-step guide on integrating the Yuno Headless SDK into your mobile app.')
  assert.equal(frontmatter(mdx).robots, 'index')
  assert.ok(!reportPage('docs/p', mdx).some(x => x.rule === 'description-short'))
})
test('legacy-no-notice: flags docs/sdks/ pages without the LegacySdkNotice import; hidden tabs skip hidden-in-nav', () => {
  const root = fs.mkdtempSync(path.join(process.env.DOCS_HYGIENE_TMP || os.tmpdir(), 'docs-hygiene-'))
  fs.mkdirSync(path.join(root, 'docs/sdks'), { recursive: true })
  fs.mkdirSync(path.join(root, 'docs/in-person'), { recursive: true })
  fs.mkdirSync(path.join(root, 'scripts'))
  const desc = 'description: "A description that is long enough to pass the short rule."\n'
  fs.writeFileSync(path.join(root, 'docs/sdks/with-notice.mdx'), '---\ntitle: "With"\n' + desc + '---\nimport LegacySdkNotice from \'/snippets/LegacySdkNotice.mdx\'\n\n<LegacySdkNotice />\n')
  fs.writeFileSync(path.join(root, 'docs/sdks/without-notice.mdx'), '---\ntitle: "Without"\n' + desc + '---\nBody\n')
  fs.writeFileSync(path.join(root, 'docs/in-person/hidden.mdx'), '---\ntitle: "Hidden"\n' + desc + 'hidden: true\n---\nBody\n')
  fs.writeFileSync(path.join(root, 'docs.json'), JSON.stringify({navigation:{tabs:[{tab:'SDKs',groups:[{group:'G',pages:['docs/sdks/with-notice','docs/sdks/without-notice']}]},{tab:'In-Person Payments',hidden:true,groups:[{group:'P',pages:['docs/in-person/hidden']}]}]}}))
  const log = console.log
  console.log = () => {}
  try { assert.equal(main(['--report', '--root', root]), 0) } finally { console.log = log }
  const report = fs.readFileSync(path.join(root, 'scripts/docs-hygiene-report.md'), 'utf8')
  assert.match(report, /^- legacy-no-notice: 1$/m)
  assert.match(report, /\| docs\/sdks\/without-notice \| legacy-no-notice \| no LegacySdkNotice import \|/)
  assert.ok(!report.includes('docs/sdks/with-notice |'))
  assert.match(report, /^- hidden-in-nav: 0 \(tabs hidden by design excluded\)$/m)
  fs.rmSync(root, { recursive: true, force: true })
})
