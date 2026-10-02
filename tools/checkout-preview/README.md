# Yuno checkout preview

An interactive preview of the Yuno checkout for the docs. It loads the **production** Web SDK from the CDN (`https://sdk-web.y.uno/v2.0.0-alpha.3/main.js`), exactly as a merchant page would, and answers the SDK's backend calls locally from the viewer's settings. No keys, no sessions, no payments.

## Where it shows up

The docs page `docs/yuno-sdk/checkout-preview.mdx` renders `<CheckoutPreview />` from `snippets/CheckoutPreview.jsx`. That snippet is **generated** from this folder: it inlines the whole preview into an `<iframe srcdoc>`. This is needed because:

- Mintlify serves no `.html` files;
- it injects every `.js` file in the repo into all pages.

The iframe also keeps the preview's network interceptor and the SDK off the docs page. `tools/` is in `.mintignore`, so nothing here is published.

## Work on it

```bash
cd tools/checkout-preview
npm install
npm run build      # regenerates ../../snippets/CheckoutPreview.jsx (commit it) and dist/
npm start          # build + serve dist/ standalone on http://localhost:8092
npm test           # mock API and state tests
npm run type-check
```

After any change under `src/`, run `npm run build` and commit the regenerated snippet. Preview the docs with `mint dev` from the repo root. It needs Node 20 or 22; Mintlify refuses Node 25.

## URL options (standalone page only)

| Option | Effect |
|---|---|
| `?sdk=v2.0.0-alpha.3` | Published SDK version to load (default `v2.0.0-alpha.3`) |
| `?controls=0` | Preview only, without the header and settings panel (for embedding) |
| `?theme=dark` | Dark chrome (light by default) |
| `?country=BR` | Initial country |
| `#…` | Full setup encoded in the hash (what "Copy link" shares) |

The embedding page can also send `postMessage` messages: `yuno-playground:set-state`, `get-state` and `set-theme`. They're only accepted from the origins in `ALLOWED_PARENT_ORIGINS` in `src/main.ts`.

## How it works

- `src/network-guard.ts` patches `fetch`, XHR, `sendBeacon` and the payment WebSocket before the SDK loads.
  - Requests to `api*.y.uno` / `demo*.y.uno` never leave the page.
  - Telemetry gets a 204.
  - Anything the mock doesn't know gets a 503.
- `src/mock-api.ts` answers the reads the checkout needs: settings v2, payment methods, single method, merchant config, country data and issuers. Its routes mirror `sdk-web-core/src/api/public-sdk/public-sdk.ts`.
- `src/responses.ts` builds those answers from the viewer's settings. It only exposes settings the SDK actually reads:
  - `payment_method_list.unfolded_display` and `condensed_checkout_view`;
  - `styles.global.*`;
  - per-method `required_fields` and `autocomplete_data`.
- `src/sdk-contract.ts` is the slice of the SDK contract the preview needs: payment types, languages, styling defaults and the `SdkPayments` API. It's copied from the SDK sources so this project doesn't need the private `@yuno` packages. Update it when the SDK changes.
- Express buttons (Google Pay, Apple Pay, PayPal) are drawn by the page as placeholders. They need real merchant credentials to render.

## Known limitations

- The card iframes (sdk-web-card) run on their own origin, so their BIN lookups can't be answered here. The card form falls back to local brand detection.
- With v2.0.0-alpha.3, closing a card form logs `Window closed for postrobot_method before ack` from zoid/post-robot. It's the SDK's teardown, and it happens every time the preview remounts the checkout.
