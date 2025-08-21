---
title: Apple Pay - Direct Integration
deprecated: false
hidden: true
metadata:
  robots: index
---
This guide provides a comprehensive process to integrate Apple Pay directly with Yuno's API for both one-time and recurring payments. Direct integration offers full control over the payment flow and is ideal for merchants who need custom implementation logic or have existing payment systems.

> 📘 Setup Required
>
> Before implementing Apple Pay payments, ensure you have completed the [dashboard setup and configuration](doc:apple-pay-setup-configuration) process.

## Direct integration overview

The direct API integration method offers:

* **Complete control** over payment timing and logic
* **Custom implementation** tailored to your specific needs
* **One-time payments** for immediate transactions
* **Recurring payments** with manual CIT/MIT flow management
* **Direct API communication** without SDK dependencies
* **Flexible integration** with existing systems
* **Advanced customization** capabilities

## One-time payments with direct API

One-time Apple Pay payments using direct API integration provide full control over the payment process.

### Step 1: Complete dashboard setup

Ensure you have completed all the setup steps in the [dashboard setup and configuration](doc:apple-pay-setup-configuration) guide, including:

* Provider connections configuration
* Routing setup
* Checkout Builder enablement

### Step 2: Create the payment

Use the [create payment](ref:create-payment) endpoint to create a payment sending the Apple Pay `payment_token` returned by Apple Pay SDK. If you haven't integrated Apple's SDK, we recommend using [our SDKs](doc:sdk-integration-apple) so you don't have to worry about the integration.

> 📘 Pass Apple Pay payment token in request
>
> When you initiate a transaction with Apple Pay, a payment token containing a JSON-formatted `paymentData` string is sent. Pass the complete token received from Apple Pay in the `payment_method.detail.wallet.payment_token` field as a JSON string in your payment request.

#### Apple Pay wallet response object

The Apple Pay SDK returns the following object structure, which must be passed as the complete `payment_token` value:

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

#### One-time payment request example

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

### Step 3: Handle payment response

Process the payment response and handle various status codes. Use [webhooks](doc:webhooks) to receive real-time payment status updates.

## Recurring payments with direct API

Recurring Apple Pay payments with direct integration require manual implementation of the Customer Initiated Transaction (CIT) and Merchant Initiated Transaction (MIT) flow.

### Understanding CIT and MIT

**Customer Initiated Transaction (CIT):** The first transaction where the customer authorizes recurring payments. This generates a payment token for future use.

**Merchant Initiated Transaction (MIT):** Subsequent automated transactions using the stored token without customer interaction.

### Customer Initiated Transaction (CIT) - First payment

The CIT establishes the recurring payment relationship and generates a token for future MIT transactions.

#### CIT request example

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
        "payment_token": "{Apple Pay token}"
      }
    },
    "type": "APPLE_PAY",
    "stored_credentials": {
      "reason": "SUBSCRIPTION",
      "usage": "FIRST",
      "subscription_agreement_id": "",
      "network_transaction_id": ""
    }
  },
  "subscription": {
    "id": "d67a4295-7bb3-4183-99ce-9f5d26d92709",
    "billing_date": {
      "type": "fixed_day",
      "day": 18
    }
  },
  "account_id": "account-id",
  "description": "Apple Pay recurring setup",
  "merchant_order_id": "recurring-setup-123"
}
```

**Key parameters for CIT:**

* `vault_on_success: true` - This parameter indicates this is a recurring payment setup and generates the token for future MIT transactions
* `stored_credentials.usage: "FIRST"` - Indicates this is the initial transaction in a recurring series
* `subscription` - Required object containing subscription details for Apple Pay recurrence

#### CIT response handling

When the CIT is successful, you'll receive a response containing the `payment_token` that must be stored securely for future MIT transactions:

```json
{
  "id": "payment-id",
  "status": "SUCCEEDED",
  "payment_method": {
    "id": "payment-method-id",
    "token": "generated-token-for-mit"
  }
}
```

Store the `token` value securely for use in subsequent MIT transactions.

### Merchant Initiated Transaction (MIT) - Subsequent payments

MIT transactions are processed automatically for recurring billing using the token from the CIT.

#### MIT request example

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
    "token": "token-from-CIT",
    "detail": {
      "wallet": {}
    },
    "type": "APPLE_PAY",
    "stored_credentials": {
      "reason": "SUBSCRIPTION",
      "usage": "USED",
      "subscription_agreement_id": "",
      "network_transaction_id": ""
    }
  },
  "account_id": "account-id",
  "description": "Apple Pay recurring payment",
  "merchant_order_id": "recurring-payment-456"
}
```

**Key parameters for MIT:**

* `token` - The payment token generated during the CIT
* `stored_credentials.usage: "USED"` - Indicates this is a subsequent transaction in a recurring series
* No `payment_token` required - Uses the stored token instead
* `detail.wallet` - Empty object for MIT transactions

### Token management

With direct integration, you are responsible for:

* **Securely storing** the payment token from the CIT response
* **Managing token lifecycle** including expiration handling
* **Implementing retry logic** for failed MIT transactions
* **Handling token invalidation** scenarios

### Custom subscription flow implementation

Direct integration requires you to implement:

1. **Subscription scheduling** - Determine when to execute MIT transactions
2. **Billing cycle management** - Track billing dates and frequencies
3. **Payment retry logic** - Handle failed payments with appropriate retry strategies
4. **Customer notifications** - Inform customers of successful/failed payments
5. **Subscription modifications** - Handle plan changes, cancellations, and updates

### Error handling and retries

Implement robust error handling for:

* **Token expiration** - Re-authenticate customers when tokens expire
* **Payment failures** - Implement retry logic with exponential backoff
* **Network issues** - Handle timeouts and connection failures
* **Card issues** - Manage declined payments and insufficient funds

Monitor payment status through [webhooks](doc:webhooks) for real-time updates and automated retry mechanisms.

## Testing your integration

1. **Use Apple's sandbox environment** for initial testing
2. **Test both one-time and recurring flows** with different scenarios
3. **Verify token generation and storage** for recurring payments
4. **Test error scenarios** including failures and edge cases
5. **Validate webhook handling** for payment status monitoring
6. **Test MIT automation** and scheduling logic

## Related documentation

* [Dashboard setup and configuration](doc:apple-pay-setup-configuration) - Required setup steps
* [Prerequisites for Apple Pay](doc:prerequisites-apple-pay) - Initial requirements
* [Apple Pay SDK integration](doc:apple-pay-recurring-sdk-implementation) - SDK-based integration
* [Create payment API](ref:create-payment) - Payment creation endpoint
* [Subscription management](doc:subscriptions) - General subscription documentation
* [Webhooks](doc:webhooks) - Payment monitoring and status updates