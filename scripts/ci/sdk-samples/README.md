# SDK sample compile check

`.github/workflows/sdk-samples.yml` compiles the docs code samples listed in `snippets.json` on every PR that touches `docs/sdks/**`

- `extract.cjs` copies `harness/<target>/` to `.sdk-samples-build/<target>/` and writes each listed block into it. It selects a fence by MDX file, `<Tab>` title, language and a `contains` substring. Each selector must match exactly one fence, or the run fails. It never edits the MDX
- The SDK version comes from the page (regex in `snippets.json`), so bumping the version in the docs also bumps what CI compiles against. The Web install line is unpinned on the page, so `snippets.json` holds the Web version
- `run-web.sh`, `run-android.sh` and `run-ios.sh` compile one target each

## Add a page

1. Add a block entry to `snippets.json` (`id`, `target`, `file`, `tab`, `lang`, `contains`, `dest`, optional `prepend`)
2. If the snippet calls merchant-side helpers (backend calls), add stubs under `harness/<target>/`
3. Run the target locally:

```bash
node scripts/ci/sdk-samples/extract.cjs --target web
scripts/ci/sdk-samples/run-web.sh
```

iOS blocks of one target compile together, so only one of them can be `main.swift` (top-level code)
