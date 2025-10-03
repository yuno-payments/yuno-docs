---
title: Direct Integration
deprecated: false
hidden: false
metadata:
  robots: index
---
This guide provides a comprehensive process to integrate Apple Pay directly with Yuno's API. Direct integration offers full control over the payment flow and is ideal for merchants who need custom implementations or have existing payment systems.

Our Apple Pay Direct integration supports one-time and recurring payments (useful for subscriptions and other regular transactions).

<Callout icon="📘" theme="info">
  Before implementing Apple Pay payments, ensure you have completed the [Apple Pay prerrequisites](doc:prerrequisites-apple-pay).
</Callout>

## Apple Pay overview

1. Customer initiates payment on their iOS device
2. Receive `payment_token` via Apple SDK
3. [Create a payment](ref:create-payment) with Yuno including the stringified token
4. Yuno processes with your configured provider(s) and returns a response
5. Monitor response status via webhooks

## One-time payments

To integrate a single transaction, such as an online purchase, use Yuno's API to [create a payment](ref:create-payment). This requires you to obtain certain information from the Apple SDK's response, which is generated when the customer authorizes the payment.

### Example Apple Pay response

The Apple Pay SDK returns an object like the example below, we call this response the `payment_token`.

```json
{
  "paymentMethod": {
    "type": "credit",
    "displayName": "Visa 1234",
    "network": "Visa"
  },
  "paymentData": {
    "data": "+yWYyldI/H0kAvZOTQL/y0vRKYoWPGWK54TN5xiBUK7EdZhMDvlWaX88n1yXJdKzcW7arzqmckP5rjx7hGsYP3oF5VJW4OhElkSdPWsvWqnCzUmUz6BTmT3HBwI5gJBjGoIUG79UkBP+dRbpVCEcTd6Zr3d/jE7Uu6Q+6XMhMzkKwfPuNGrTzSFPQcOX5z8xNmnFiZwjXE42LsM4+INhzkzUvW7AfugmpU+aoPS8L6bcoMSwy0jalxraAMwxUQUNbxFdTe78F9Ftryr03kHWIDI7pvCSMHmT/skC6ha425x0zSPrrvoQtJVbR7lZEsHiaqsIyP7Qgfn3iPrdaEg/nx2WIgW+SrFAqsgOCauh6WRo7KjU5+M9AFpJXyByYPmnwqo14trsSZq25iVc0dS99EweperG5E+FCRiTNrSf1Xk=",
    "signature": "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",
    "header": {
      "publicKeyHash": "h/mfJj19xShja2t1Wfto4BiaaOuRaF/Fj5tAHHkjZUo=",
      "ephemeralPublicKey": "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEuW/NN1h3s5rQFiOOfXH7VpiPy4Twbyiy4um/5XJcRlwcRuRfy2574VFMKk4FKalyXZC/J4/hcq/taS8yImRBYg==",
      "transactionId": "dcba2ab36bdf5f7131ea1c8c590039a95038cb528cf6d6c8a4326e7b8853dca3"
    },
    "version": "EC_v1"
  },
  "transactionIdentifier": "dcba2ab36bdf5f7131ea1c8c590039a95038cb528cf6d6c8a4326e7b8853dca3"
}
```

### Example one-time payment request

Here is an example of a one-time Apple Pay payment request using Yuno's Direct API. The request includes the **stringified** Apple Pay response inside `payment_token`, as received from the Apple Pay SDK, along with required fields such as amount, currency, and account information. Adjust the values as needed for your integration.

```json
{
  "country": "US",
  "amount": {
    "currency": "USD",
    "value": 100
  },
  "customer_payer": {
    "merchant_customer_validations": {
      "account_is_verified": true,
      "email_is_verified": true,
      "phone_is_verified": true
    }
  },
  "workflow": "DIRECT",
  "payment_method": {
    "detail": {
      "wallet": {
        "payment_token": "{\"paymentMethod\":{\"type\":\"credit\",\"displayName\":\"Visa 1234\",\"network\":\"Visa\"},\"paymentData\":{\"data\":\"+yWYyldI/H0kAvZOTQL/y0vRKYoWPGWK54TN5xiBUK7EdZhMDvlWaX88n1yXJdKzcW7arzqmckP5rjx7hGsYP3oF5VJW4OhElkSdPWsvWqnCzUmUz6BTmT3HBwI5gJBjGoIUG79UkBP+dRbpVCEcTd6Zr3d/jE7Uu6Q+6XMhMzkKwfPuNGrTzSFPQcOX5z8xNmnFiZwjXE42LsM4+INhzkzUvW7AfugmpU+aoPS8L6bcoMSwy0jalxraAMwxUQUNbxFdTe78F9Ftryr03kHWIDI7pvCSMHmT/skC6ha425x0zSPrrvoQtJVbR7lZEsHiaqsIyP7Qgfn3iPrdaEg/nx2WIgW+SrFAqsgOCauh6WRo7KjU5+M9AFpJXyByYPmnwqo14trsSZq25iVc0dS99EweperG5E+FCRiTNrSf1Xk=\",\"signature\":\"MIAGCSqGSIb3DQEHAqCAMIACAQExDTALBglghkgBZQMEAgEwgAYJKoZIhvcNAQcBAACggDCCA+MwggOIoAMCAQICCBZjTIsOMFcXMAoGCCqGSM49BAMCMHoxLjAsBgNVBAMMJUFwcGxlIEFwcGxpY2F0aW9uIEludGVncmF0aW9uIENBIC0gRzMxJjAkBgNVBAsMHUFwcGxlIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MRMwEQYDVQQKDApBcHBsZSBJbmMuMQswCQYDVQQGEwJVUzAeFw0yNDA0MjkxNzQ3MjdaFw0yOTA0MjgxNzQ3MjZaMF8xJTAjBgNVBAMMHGVjYy1zbXAtYnJva2VyLXNpZ25fVUM0LVBST0QxFDASBgNVBAsMC2lPUyBTeXN0ZW1zMRMwEQYDVQQKDApBcHBsZSBJbmMuMQswCQYDVQQGEwJVUzBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABMIVd+3r1seyIY9o3XCQoSGNx7C9bywoPYRgldlK9KVBG4NCDtgR80B+gzMfHFTD9+syINa61dTv9JKJiT58DxOjggIRMIICDTAMBgNVHRMBAf8EAjAAMB8GA1UdIwQYMBaAFCPyScRPk+TvJ+bE9ihsP6K7/S5LMEUGCCsGAQUFBwEBBDkwNzA1BggrBgEFBQcwAYYpaHR0cDovL29jc3AuYXBwbGUuY29tL29jc3AwNC1hcHBsZWFpY2EzMDIwggEdBgNVHSAEggEUMIIBEDCCAQwGCSqGSIb3Y2QFATCB/jCBwwYIKwYBBQUHAgIwgbYMgbNSZWxpYW5jZSBvbiB0aGlzIGNlcnRpZmljYXRlIGJ5IGFueSBwYXJ0eSBhc3N1bWVzIGFjY2VwdGFuY2Ugb2YgdGhlIHRoZW4gYXBwbGljYWJsZSBzdGFuZGFyZCB0ZXJtcyBhbmQgY29uZGl0aW9ucyBvZiB1c2UsIGNlcnRpZmljYXRlIHBvbGljeSBhbmQgY2VydGlmaWNhdGlvbiBwcmFjdGljZSBzdGF0ZW1lbnRzLjA2BggrBgEFBQcCARYqaHR0cDovL3d3dy5hcHBsZS5jb20vY2VydGlmaWNhdGVhdXRob3JpdHkvMDQGA1UdHwQtMCswKaAnoCWGI2h0dHA6Ly9jcmwuYXBwbGUuY29tL2FwcGxlYWljYTMuY3JsMB0GA1UdDgQWBBSUV9tv1XSBhomJdi9+V4UH55tYJDAOBgNVHQ8BAf8EBAMCB4AwDwYJKoZIhvdjZAYdBAIFADAKBggqhkjOPQQDAgNJADBGAiEAxvAjyyYUuzA4iKFimD4ak/EFb1D6eM25ukyiQcwU4l4CIQC+PNDf0WJH9klEdTgOnUTCKKEIkKOh3HJLi0y4iJgYvDCCAu4wggJ1oAMCAQICCEltL786mNqXMAoGCCqGSM49BAMCMGcxGzAZBgNVBAMMEkFwcGxlIFJvb3QgQ0EgLSBHMzEmMCQGA1UECwwdQXBwbGUgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkxEzARBgNVBAoMCkFwcGxlIEluYy4xCzAJBgNVBAYTAlVTMB4XDTE0MDUwNjIzNDYzMFoXDTI5MDUwNjIzNDYzMFowejEuMCwGA1UEAwwlQXBwbGUgQXBwbGljYXRpb24gSW50ZWdyYXRpb24gQ0EgLSBHMzEmMCQGA1UECwwdQXBwbGUgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkxEzARBgNVBAoMCkFwcGxlIEluYy4xCzAJBgNVBAYTAlVTMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE8BcRhBnXZIXVGl4lgQd26ICi7957rk3gjfxLk+EzVtVmWzWuItCXdg0iTnu6CP12F86Iy3a7ZnC+yOgphP9URaOB9zCB9DBGBggrBgEFBQcBAQQ6MDgwNgYIKwYBBQUHMAGGKmh0dHA6Ly9vY3NwLmFwcGxlLmNvbS9vY3NwMDQtYXBwbGVyb290Y2FnMzAdBgNVHQ4EFgQUI/JJxE+T5O8n5sT2KGw/orv9LkswDwYDVR0TAQH/BAUwAwEB/zAfBgNVHSMEGDAWgBS7sN6hWDOImqSKmd6+veuv2sskqzA3BgNVHR8EMDAuMCygKqAohiZodHRwOi8vY3JsLmFwcGxlLmNvbS9hcHBsZXJvb3RjYWczLmNybDAOBgNVHQ8BAf8EBAMCAQYwEAYKKoZIhvdjZAYCDgQCBQAwCgYIKoZIzj0EAwIDZwAwZAIwOs9yg1EWmbGG+zXDVspiv/QX7dkPdU2ijr7xnIFeQreJ+Jj3m1mfmNVBDY+d6cL+AjAyLdVEIbCjBXdsXfM4O5Bn/Rd8LCFtlk/GcmmCEm9U+Hp9G5nLmwmJIWEGmQ8Jkh0AADGCAYcwggGDAgEBMIGGMHoxLjAsBgNVBAMMJUFwcGxlIEFwcGxpY2F0aW9uIEludGVncmF0aW9uIENBIC0gRzMxJjAkBgNVBAsMHUFwcGxlIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MRMwEQYDVQQKDApBcHBsZSBJbmMuMQswCQYDVQQGEwJVUwIIFmNMiw4wVxcwCwYJYIZIAWUDBAIBoIGTMBgGCSqGSIb3DQEJAzELBgkqhkiG9w0BBwEwHAYJKoZIhvcNAQkFMQ8XDTI1MDgxNDIzMDc1OFowKAYJKoZIhvcNAQk0MRswGTALBglghkgBZQMEAgGhCgYIKoZIzj0EAwIwLwYJKoZIhvcNAQkEMSIEINrtpVdCUhHAtX6ns2U1ZXRJ+eRMPyMA8yItQ/Ol0aHPMAoGCCqGSM49BAMCBEYwRAIgZKeG1dPc1oWBAVjw9mM7FLJJ42JcpNIgsX7ZZtuieWUCIE1yKm5Bq96LYDS13GgQlE92o+vFNs2ko1tS6bhIzGPuAAAAAAAA\",\"header\":{\"publicKeyHash\":\"h/mfJj19xShja2t1Wfto4BiaaOuRaF/Fj5tAHHkjZUo=\",\"ephemeralPublicKey\":\"MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEuW/NN1h3s5rQFiOOfXH7VpiPy4Twbyiy4um/5XJcRlwcRuRfy2574VFMKk4FKalyXZC/J4/hcq/taS8yImRBYg==\",\"transactionId\":\"dcba2ab36bdf5f7131ea1c8c590039a95038cb528cf6d6c8a4326e7b8853dca3\"},\"version\":\"EC_v1\"},\"transactionIdentifier\":\"dcba2ab36bdf5f7131ea1c8c590039a95038cb528cf6d6c8a4326e7b8853dca3\"}"
      }
    },
    "type": "APPLE_PAY"
  },
  "account_id": "2d77ea44-9a01-4ffc-a465-7db5c2ced44d",
  "description": "Apple Pay one-time payment",
  "merchant_order_id": "MER01"
}
```

### Example cURL request:

```bash
curl -X POST https://api.y.uno/payments \
  -H "Authorization: Bearer <api_key>" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: <unique-key>" \
  -d '{ /* one-time payment body as above */ }'
```

## Recurring payments with Direct API

Recurring Apple Pay payments with Direct integration require implementation of Customer Initiated Transactions (CIT) and Merchant Initiated Transactions (MIT).

* **Customer Initiated Transaction (CIT):** The first transaction where the customer authorizes recurring payments. This generates a `vaulted_token` for future use.

* **Merchant Initiated Transaction (MIT):** Subsequent automated transactions using the `vaulted_token` without customer interaction.

### Customer Initiated Transaction (CIT)

When a customer authorizes the subscription and you have a response from the Apple SDK, use the stringified `payment_token` in Yuno's [create payment API](ref:create-payment) to create the CIT.

```json
{
  "country": "US",
  "amount": {
    "currency": "USD",
    "value": 100
  },
  "customer_payer": {
    "id": "customer-unique-id",
    "email": "customer@example.com",
    "first_name": "John",
    "last_name": "Doe"
  },
  "workflow": "DIRECT",
  "payment_method": {
    "vault_on_success": true,
    "detail": {
      "wallet": {
        "payment_token": "{Apple Pay token}",
        "stored_credentials": {
          "reason": "SUBSCRIPTION",
          "usage": "FIRST"
        }
      }
    },
    "type": "APPLE_PAY"
  },
  "account_id": "account-id",
  "description": "Apple Pay recurring setup",
  "merchant_order_id": "recurring-setup-123"
}
```

### Example cURL (CIT):

```bash
curl -X POST https://api.y.uno/payments \
  -H "Authorization: Bearer <api_key>" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: <unique-key>" \
  -d '{ /* CIT request body as above */ }'
```

**Key parameters for CIT:**

* **`vault_on_success: true`**: Indicates this is a recurring payment setup and generates the vaulted token for future MIT transactions
* **`detail.wallet.stored_credentials.usage: FIRST`**: Indicates this is the initial transaction in a recurring series
* **`detail.wallet.payment_token`**: Must be the stringified Apple SDK response, the `payment_token`

### CIT response handling

When the CIT is successful, you'll receive a response containing the `vaulted_token`. It can be used for subsequent transactions. Exercise extreme caution storing this value.

```json
{
  "id": "payment-id",
  "status": "SUCCEEDED",
  "payment_method": {
    "id": "payment-method-id",
    "vaulted_token": "token-from-CIT"
  }
}
```

### Merchant Initiated Transaction (MIT)

MIT transactions are processed automatically for recurring billing using the `vaulted_token` from the CIT.

#### Example MIT request

```json
{
  "country": "US",
  "amount": {
    "currency": "USD",
    "value": 100
  },
  "customer_payer": {
    "id": "customer-unique-id"
  },
  "workflow": "DIRECT",
  "payment_method": {
    "vaulted_token": "token-from-CIT",
    "detail": {
      "card": {
        "stored_credentials": {
          "reason": "SUBSCRIPTION",
          "usage": "USED"
        }
      }
    },
    "type": "APPLE_PAY"
  },
  "account_id": "account-id",
  "description": "Apple Pay recurring payment",
  "merchant_order_id": "recurring-payment-456"
}
```

**Key parameters for MIT:**

* **`vaulted_token`**: The vaulted token generated during the CIT
* **`detail.card.stored_credentials.usage: "USED"`**: Indicates this is a subsequent transaction in a recurring series
* **No `payment_token` required**: Uses the stored `vaulted_token` instead

## Troubleshooting

* Merchant validation failed: verify Apple Pay certificates and merchant ID configuration
* Invalid or expired Apple token: obtain a fresh token from Apple SDK and ensure it is stringified
* Unsupported network or country: confirm your provider supports Apple Pay for the requested currency/country
* Duplicate charges: always send an `Idempotency-Key` with create payment calls

## Related documentation

* [Prerequisites for Apple Pay](doc:prerequisites-apple-pay) - Initial requirements
* [Apple Pay SDK integration](doc:apple-pay-sdk-integration) - SDK-based integration
* [Create payment API](ref:create-payment) - Payment creation endpoint
* [Subscription management](doc:subscriptions) - General subscription documentation
* [Webhooks](doc:webhooks) - Payment monitoring and status updates
