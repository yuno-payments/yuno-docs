---
title: QR code & Instant Payment
deprecated: false
hidden: false
metadata:
  robots: index
---
In the **QR Code & Instant Payment** journey, Yuno presents a single QR code that both charges the customer immediately and enrolls them for all future recurring payments in one seamless step. When the customer scans the QR, their banking app processes the first installment and simultaneously captures their consent for subsequent automated charges, removing the need for any additional approvals or manual input.

After the initial scan and payment, each **subsequent request** is send by the merchant via Yuno and validated automatically by the customer’s bank against the original consent, ensuring fast, reliable transfers without further customer interaction. This flow maximizes conversion and simplifies subscription management by combining enrollment and payment into a single user action.

## Step 1: First payment and subscription creation

To initiate the flow, you must start with a standard [Pix payment](https://docs.y.uno/reference/create-payment#/) that also sets up the subscription. This generates a QR code or redirect screen for the customer to authorize the recurrence. Once paid, the subscription is created and a `subscription_id` is returned.

You can define the frequency, availability window, and the amount type (fixed or variable) as part of the subscription payload.

| Fields for subscriptions |                                                                                                                                                                              |
| :----------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Frequency                | Define the frequency at which subscription charges will occur, whether daily, weekly, or monthly, specifying the amount that needs to be charged for the next billing cycle. |
| Availability             | The start and end dates of the subscription. If they are not defined, nor the billing cycles, charges will continue until it is stopped.                                     |
| Amount                   | Define the value of the future payments of the subscription. Could be `FIXED` with a minimum value defined, or `VARIABLE` without an amount defined for future payments.     |

As mentioned before, have in mind that the information defined in the subscription creation will restrict the dates and values to be used for future payments.

```json Example
{
  "amount": {
    "value": "100",
    "currency": "BRL"
  },
	"payment_method": {
        "type": "PIX"
	},
	"subscription": {
    "frequency": {
      "type": "MONTH",
      "value": 1
    },
    "availability": {
      "start_at": "2025-05-23T20:17:30.277678Z",
      "finish_at": "2027-05-23T20:17:30.277678Z"
    },
    "amount": {
      "value": "100",
      "currency": "BRL",
      "type": "FIXED" // or "VARIABLE"
    }
  }
```

After the initial payment is confirmed, the customer has an active subscription, and you can begin scheduling future charges.