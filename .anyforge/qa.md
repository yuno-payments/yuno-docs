# QA flows

Each flow is a `## <id>: <title>` section with its steps, what a pass looks like, a `When:` line (`always` or comma-separated path globs) and `Critical: yes` only when its failure stops people using the docs. Run them against `npx mint@latest dev`.

## stripe-billing-payment-method-change: Stripe Billing guide links to the payment method change reference
When: docs/payment-features/subscriptions/stripe-billing.mdx, reference/subscriptions/**, openapi/subscriptions/**, docs.json

1. Open `/docs/payment-features/subscriptions/stripe-billing#switch-to-a-payment-method-the-customer-already-enrolled`.
2. Click the "Change External Subscription Payment Method" link.
3. Pass: `/reference/subscriptions/change-external-subscription-payment-method` loads, shows `POST /external-subscriptions/{external_subscription_id}/payment-method` with the `X-Idempotency-Key` header and the error table, and the page is in the Subscriptions navigation group.
