# Developer experience redesign

This change redesigns the documentation entry point and first-integration journey on the existing Mintlify platform. The source baseline is `main` at `2c803c2a`; the repository's default `master` branch is empty. The documentation README identifies `main` as the auto-deployed branch.

## Design decisions

- Lead with the developer's next action: a sandbox payment or a choice of integration.
- Keep every existing navigation route. Split the long Documentation tree into Get started, Payments, and Resources, alongside SDKs, API Reference, and Changelog. Preserve the hidden In-Person Payments tab and its visibility settings.
- Use the original wordmark assets from Yuno's public brand kit without recoloring or reshaping them. Use Yuno Blue `#3E4FE0`, Harmony Lilac `#E8EAF5`, and the existing Inter documentation font. The brand page does not prescribe a typeface.
- Render homepage prose and links as static MDX, so the core content is available before custom React loads. Only the code-language selector and clipboard action require custom React.
- Keep the native search, theme controls, contextual copying/AI actions, translation integration, and OpenAPI reference. Do not introduce a simulated assistant or a fake payment execution button.
- Provide focus styles, semantic headings, responsive layouts, dark mode, reduced-motion support, and clipboard success/failure feedback.
- Exclude server-side maintenance scripts from the browser bundle through `.mintignore`. Keep the existing client scripts available.

## Reference review

Reviewed on 2026-10-13. These are design inputs, not copied layouts or API contracts.

| Reference | Pattern applied |
| --- | --- |
| [Stripe](https://docs.stripe.com/) | Task-led starting points, integration quickstarts, and a direct path to agent-readable documentation. |
| [Adyen](https://docs.adyen.com/) | Explicit integration choices, payment-method discovery, testing resources, and launch readiness. |
| [Plaid](https://plaid.com/docs/) | Distinct quickstart, API reference, sandbox, errors, and launch-checklist entry points. |
| [PayPal](https://developer.paypal.com/) | Clear separation of SDKs, server APIs, developer resources, and sample integrations. |
| [DEUNA](https://docs.deuna.com/) | A visible first-integration sequence and contextual code alongside developer navigation. |
| [Yuno brand guidelines](https://y.uno/en/brand-guidelines) | Official palette and unmodified wordmarks with clear space. |

## Content authority

The new quickstart uses the checked-in customer, checkout-session, payment, and retrieve-payment OpenAPI contracts and links to the platform SDK guides. It specifies decimal major-unit amounts, server-only private keys, stable idempotency keys for uncertain retries, required-action handling, and backend confirmation before fulfillment.

Examples are instructional, use placeholders, and default to sandbox. This documentation redesign does not establish runtime conformance of Yuno APIs, provider behavior, or SDKs. It makes no unverified integration-time, coverage-count, or payment-success claim.

## Review and validation

```bash
npx mint@latest dev --port 3333 --no-open
node scripts/check-descriptions.cjs
node scripts/check-developer-experience.cjs
npx mint@latest validate
npx mint@latest broken-links
npx mint@latest export --output /absolute/path/docs-export.zip
```

Run Mintlify CLI operations sequentially: the local preview and export can share generated state. The static export is for reviewing documentation; it does not change `docs.y.uno`.

Inspect the homepage, all four new Get started pages, a pre-existing SDK guide, and a pre-existing API page. Test code language selection, clipboard, dark mode, narrow-screen navigation, and page search. Confirm the first-payment sequence and integration chooser are readable at mobile widths.

## Rollout

Review and merge into `main` through the team's normal process. Before publishing, validate the authenticated native search/assistant and translation behavior in the Mintlify deployment environment; these are platform integrations, not replaced by this change. Existing canonical routes remain unchanged. No changes to OpenAPI schemas, credentials, payment processing, or provider configuration are included.

After launch, measure time to locate an integration guide, quickstart completion, search queries with no useful result, and support requests related to setup and first payments. Define analytics and collection requirements with the docs team before adding tracking.
