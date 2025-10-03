---
title: Direct Integration
deprecated: false
hidden: false
metadata:
  robots: index
---
This guide describes how to integrate Apple Pay directly with Yuno's API. Direct integration offers full control over the payment flow and is ideal for merchants who need custom implementations or have existing payment systems.

Our Apple Pay Direct integration supports one-time and recurring payments (useful for subscriptions and other regular transactions).

<Callout icon="📘" theme="info">
  Before implementing Apple Pay payments, ensure you have completed the [Apple Pay prerequisites](doc:prerequisites-apple-pay).
</Callout>

## Apple Pay overview

1. Customer initiates payment on their iOS device
2. Receive `payment_token` via Apple SDK
3. [Create a payment](ref:create-payment) with Yuno including the stringified token
4. Yuno processes with your configured provider(s) and returns a response
5. Monitor response status via [webhooks](doc:webhooks)

## One-time payments

To integrate a single transaction, such as an online purchase, use Yuno's API to [create a payment](ref:create-payment). This requires you to obtain certain information from the Apple SDK's response, which is generated when the customer authorizes the payment.

### Example Apple Pay response

The Apple Pay SDK returns an object like the example below, we call this response the `payment_token`.

```json
{
  "paymentMethod": {
    "type": "credit",
    "displayName": "Visa 3748",
    "network": "Visa"
  },
  "paymentData": {
    "data": "B5NSQI0TdXuLwqadBCL0yOwtik/rJx7v41xxE8rNSlFBTHR2W88iRck7a6bH9Kx/bBFsk2ZyinIEl2aXusHp22a0pSmuCUoPgbkFc1/D3PRAoWITfZkalBeuzMhHJGhhCe2wqOgMmjS2w97nN9vifb1cMrS3kOqpPPMihHVvhLYbwtNhh8lfeTOyL+RBXbdFScVTFCB1eFQ4znUFV79SHVK/SRjLxLawO1HGIO0VIUTj8uVgG4MmBrfQhDBD/P9a4lWypiNoyURHm7ubgcOEelbVDGlKSNDmYFD10i554b+7z8GXBtWdQc1zhWKcGOn8RsOYtxxdqzHEtJzcFsf92/rEhfpEThXjsLLMTmovGyQS30qM/qO2YgqduEID7IS+xOH/FXpplT5Yqur7/+FgEwcv2lGsa0K6kNMEUn1xSWc=",
    "signature": "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",
    "header": {
      "publicKeyHash": "YK8kdoBXLGqBQKBtCZOl0DQTUHOWidRCxgOgf/1gBMM=",
      "ephemeralPublicKey": "MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEEVv32VVJYlg+E0zMsthvBaldJcH45NUWhVckme/CQYFtHf60FEdFtzwabOEMY3u1De+6e+IuBv53OxmWx+1w2w==",
      "transactionId": "87a03c4cc1b242a25d74257d4bc990a6473b9866392850e584a9f680dcdf3d0f"
    },
    "version": "EC_v1"
  }
}
```

### Example one-time payment request

Here is an example of a one-time Apple Pay payment request using Yuno's Direct API. The request includes the **stringified** Apple Pay response inside `payment_token`, as received from the Apple Pay SDK, along with required fields such as amount, currency, and account information. Adjust the values as needed for your integration.

```json
curl --location 'https://api-sandbox.y.uno/v1/payments' \
--header 'X-idempotency-key: 20cc2a07-9170-47d7-88ff-c4d3ee48274e' \
--header 'public-api-key: '\
--header 'private-secret-key: ' \
--header 'Keep-Alive: timeout=5, max=1000' \
--header 'Content-Type: application/json' \
--data-raw '{
    "country": "US",
    "amount": {
        "currency": "USD",
        "value": 2000
    },
    "customer_payer": {
        "id": "24e25748-6ab3-4d43-bb8b-eb0204bb0954",
        "email": "customer@example.com",
        "first_name": "John",
        "last_name": "Doe"
    },
    "workflow": "DIRECT",
    "payment_method": {
        "vault_on_success": true,
        "type": "APPLE_PAY",
        "detail": {
            "wallet": {
                "payment_token": "{\r\n   \"paymentMethod\":{\r\n      \"type\":\"credit\",\r\n      \"displayName\":\"Visa 3748\",\r\n      \"network\":\"Visa\"\r\n   },\r\n   \"paymentData\":{\r\n      \"data\":\"B5NSQI0TdXuLwqadBCL0yOwtik\/rJx7v41xxE8rNSlFBTHR2W88iRck7a6bH9Kx\/bBFsk2ZyinIEl2aXusHp22a0pSmuCUoPgbkFc1\/D3PRAoWITfZkalBeuzMhHJGhhCe2wqOgMmjS2w97nN9vifb1cMrS3kOqpPPMihHVvhLYbwtNhh8lfeTOyL+RBXbdFScVTFCB1eFQ4znUFV79SHVK\/SRjLxLawO1HGIO0VIUTj8uVgG4MmBrfQhDBD\/P9a4lWypiNoyURHm7ubgcOEelbVDGlKSNDmYFD10i554b+7z8GXBtWdQc1zhWKcGOn8RsOYtxxdqzHEtJzcFsf92\/rEhfpEThXjsLLMTmovGyQS30qM\/qO2YgqduEID7IS+xOH\/FXpplT5Yqur7\/+FgEwcv2lGsa0K6kNMEUn1xSWc=\",\r\n      \"signature\":\"MIAGCSqGSIb3DQEHAqCAMIACAQExDTALBglghkgBZQMEAgEwgAYJKoZIhvcNAQcBAACggDCCA+MwggOIoAMCAQICCBZjTIsOMFcXMAoGCCqGSM49BAMCMHoxLjAsBgNVBAMMJUFwcGxlIEFwcGxpY2F0aW9uIEludGVncmF0aW9uIENBIC0gRzMxJjAkBgNVBAsMHUFwcGxlIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MRMwEQYDVQQKDApBcHBsZSBJbmMuMQswCQYDVQQGEwJVUzAeFw0yNDA0MjkxNzQ3MjdaFw0yOTA0MjgxNzQ3MjZaMF8xJTAjBgNVBAMMHGVjYy1zbXAtYnJva2VyLXNpZ25fVUM0LVBST0QxFDASBgNVBAsMC2lPUyBTeXN0ZW1zMRMwEQYDVQQKDApBcHBsZSBJbmMuMQswCQYDVQQGEwJVUzBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABMIVd+3r1seyIY9o3XCQoSGNx7C9bywoPYRgldlK9KVBG4NCDtgR80B+gzMfHFTD9+syINa61dTv9JKJiT58DxOjggIRMIICDTAMBgNVHRMBAf8EAjAAMB8GA1UdIwQYMBaAFCPyScRPk+TvJ+bE9ihsP6K7\/S5LMEUGCCsGAQUFBwEBBDkwNzA1BggrBgEFBQcwAYYpaHR0cDovL29jc3AuYXBwbGUuY29tL29jc3AwNC1hcHBsZWFpY2EzMDIwggEdBgNVHSAEggEUMIIBEDCCAQwGCSqGSIb3Y2QFATCB\/jCBwwYIKwYBBQUHAgIwgbYMgbNSZWxpYW5jZSBvbiB0aGlzIGNlcnRpZmljYXRlIGJ5IGFueSBwYXJ0eSBhc3N1bWVzIGFjY2VwdGFuY2Ugb2YgdGhlIHRoZW4gYXBwbGljYWJsZSBzdGFuZGFyZCB0ZXJtcyBhbmQgY29uZGl0aW9ucyBvZiB1c2UsIGNlcnRpZmljYXRlIHBvbGljeSBhbmQgY2VydGlmaWNhdGlvbiBwcmFjdGljZSBzdGF0ZW1lbnRzLjA2BggrBgEFBQcCARYqaHR0cDovL3d3dy5hcHBsZS5jb20vY2VydGlmaWNhdGVhdXRob3JpdHkvMDQGA1UdHwQtMCswKaAnoCWGI2h0dHA6Ly9jcmwuYXBwbGUuY29tL2FwcGxlYWljYTMuY3JsMB0GA1UdDgQWBBSUV9tv1XSBhomJdi9+V4UH55tYJDAOBgNVHQ8BAf8EBAMCB4AwDwYJKoZIhvdjZAYdBAIFADAKBggqhkjOPQQDAgNJADBGAiEAxvAjyyYUuzA4iKFimD4ak\/EFb1D6eM25ukyiQcwU4l4CIQC+PNDf0WJH9klEdTgOnUTCKKEIkKOh3HJLi0y4iJgYvDCCAu4wggJ1oAMCAQICCEltL786mNqXMAoGCCqGSM49BAMCMGcxGzAZBgNVBAMMEkFwcGxlIFJvb3QgQ0EgLSBHMzEmMCQGA1UECwwdQXBwbGUgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkxEzARBgNVBAoMCkFwcGxlIEluYy4xCzAJBgNVBAYTAlVTMB4XDTE0MDUwNjIzNDYzMFoXDTI5MDUwNjIzNDYzMFowejEuMCwGA1UEAwwlQXBwbGUgQXBwbGljYXRpb24gSW50ZWdyYXRpb24gQ0EgLSBHMzEmMCQGA1UECwwdQXBwbGUgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkxEzARBgNVBAoMCkFwcGxlIEluYy4xCzAJBgNVBAYTAlVTMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE8BcRhBnXZIXVGl4lgQd26ICi7957rk3gjfxLk+EzVtVmWzWuItCXdg0iTnu6CP12F86Iy3a7ZnC+yOgphP9URaOB9zCB9DBGBggrBgEFBQcBAQQ6MDgwNgYIKwYBBQUHMAGGKmh0dHA6Ly9vY3NwLmFwcGxlLmNvbS9vY3NwMDQtYXBwbGVyb290Y2FnMzAdBgNVHQ4EFgQUI\/JJxE+T5O8n5sT2KGw\/orv9LkswDwYDVR0TAQH\/BAUwAwEB\/zAfBgNVHSMEGDAWgBS7sN6hWDOImqSKmd6+veuv2sskqzA3BgNVHR8EMDAuMCygKqAohiZodHRwOi8vY3JsLmFwcGxlLmNvbS9hcHBsZXJvb3RjYWczLmNybDAOBgNVHQ8BAf8EBAMCAQYwEAYKKoZIhvdjZAYCDgQCBQAwCgYIKoZIzj0EAwIDZwAwZAIwOs9yg1EWmbGG+zXDVspiv\/QX7dkPdU2ijr7xnIFeQreJ+Jj3m1mfmNVBDY+d6cL+AjAyLdVEIbCjBXdsXfM4O5Bn\/Rd8LCFtlk\/GcmmCEm9U+Hp9G5nLmwmJIWEGmQ8Jkh0AADGCAYgwggGEAgEBMIGGMHoxLjAsBgNVBAMMJUFwcGxlIEFwcGxpY2F0aW9uIEludGVncmF0aW9uIENBIC0gRzMxJjAkBgNVBAsMHUFwcGxlIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MRMwEQYDVQQKDApBcHBsZSBJbmMuMQswCQYDVQQGEwJVUwIIFmNMiw4wVxcwCwYJYIZIAWUDBAIBoIGTMBgGCSqGSIb3DQEJAzELBgkqhkiG9w0BBwEwHAYJKoZIhvcNAQkFMQ8XDTI1MTAwMjE5MjYyNFowKAYJKoZIhvcNAQk0MRswGTALBglghkgBZQMEAgGhCgYIKoZIzj0EAwIwLwYJKoZIhvcNAQkEMSIEIIglNywQdAxKnixbc4TJLaopplLPs5m84zjbAlsJuvnOMAoGCCqGSM49BAMCBEcwRQIhANjW5bxOlsS4oBDrxUn6OtIHWxpHshyj0ozI518Ty\/rbAiAW+dbxN9OQJ9a2B3VMps89dm0ZB6MdQCG7iHM2g2Tn1gAAAAAAAA==\",\r\n      \"header\":{\r\n         \"publicKeyHash\":\"YK8kdoBXLGqBQKBtCZOl0DQTUHOWidRCxgOgf\/1gBMM=\",\r\n         \"ephemeralPublicKey\":\"MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEEVv32VVJYlg+E0zMsthvBaldJcH45NUWhVckme\/CQYFtHf60FEdFtzwabOEMY3u1De+6e+IuBv53OxmWx+1w2w==\",\r\n         \"transactionId\":\"87a03c4cc1b242a25d74257d4bc990a6473b9866392850e584a9f680dcdf3d0f\"\r\n      },\r\n      \"version\":\"EC_v1\"\r\n   }\r\n}",
                "soft_descriptor": "TEST"
                }
            }
        }
    },
    "account_id": "fe14c7c6-c75e-43b7-bdbe-4c87ad52c482",
    "description": "Apple Pay recurring setup",
    "merchant_order_id": "recurring-setup-123"
}'
```

## Recurring payments with Direct API

Recurring Apple Pay payments with Direct integration require implementation of Customer Initiated Transactions (CIT) and Merchant Initiated Transactions (MIT).

* **Customer Initiated Transaction (CIT):** The first transaction where the customer authorizes recurring payments. This generates a `vaulted_token` for future use.

* **Merchant Initiated Transaction (MIT):** Subsequent automated transactions using the `vaulted_token` without customer interaction.

### Customer Initiated Transaction (CIT)

When a customer authorizes the subscription and you have a response from the Apple SDK, use the stringified `payment_token` in Yuno's [create payment API](ref:create-payment) to create the CIT.

```json
curl --location 'https://api-sandbox.y.uno/v1/payments' \
--header 'X-idempotency-key: 30cc2a07-9170-47d7-88ff-c4d3ee48274e' \
--header 'public-api-key: ' \
--header 'private-secret-key: ' \
--header 'Keep-Alive: timeout=5, max=1000' \
--header 'Content-Type: application/json' \
--data-raw '{
    "country": "US",
    "amount": {
        "currency": "USD",
        "value": 2000
    },
    "customer_payer": {
        "id": "24e25748-6ab3-4d43-bb8b-eb0204bb0951",
        "email": "customer@example.com",
        "first_name": "John",
        "last_name": "Doe"
    },
    "workflow": "DIRECT",
    "payment_method": {
        "vault_on_success": true,
        "type": "APPLE_PAY",
        "detail": {
            "wallet": {
                "payment_token": "{\r\n   \"paymentMethod\":{\r\n      \"type\":\"credit\",\r\n      \"displayName\":\"Visa 3748\",\r\n      \"network\":\"Visa\"\r\n   },\r\n   \"paymentData\":{\r\n      \"data\":\"B5NSQI0TdXuLwqadBCL0yOwtik\/rJx7v41xxE8rNSlFBTHR2W88iRck7a6bH9Kx\/bBFsk2ZyinIEl2aXusHp22a0pSmuCUoPgbkFc1\/D3PRAoWITfZkalBeuzMhHJGhhCe2wqOgMmjS2w97nN9vifb1cMrS3kOqpPPMihHVvhLYbwtNhh8lfeTOyL+RBXbdFScVTFCB1eFQ4znUFV79SHVK\/SRjLxLawO1HGIO0VIUTj8uVgG4MmBrfQhDBD\/P9a4lWypiNoyURHm7ubgcOEelbVDGlKSNDmYFD10i554b+7z8GXBtWdQc1zhWKcGOn8RsOYtxxdqzHEtJzcFsf92\/rEhfpEThXjsLLMTmovGyQS30qM\/qO2YgqduEID7IS+xOH\/FXpplT5Yqur7\/+FgEwcv2lGsa0K6kNMEUn1xSWc=\",\r\n      \"signature\":\"MIAGCSqGSIb3DQEHAqCAMIACAQExDTALBglghkgBZQMEAgEwgAYJKoZIhvcNAQcBAACggDCCA+MwggOIoAMCAQICCBZjTIsOMFcXMAoGCCqGSM49BAMCMHoxLjAsBgNVBAMMJUFwcGxlIEFwcGxpY2F0aW9uIEludGVncmF0aW9uIENBIC0gRzMxJjAkBgNVBAsMHUFwcGxlIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MRMwEQYDVQQKDApBcHBsZSBJbmMuMQswCQYDVQQGEwJVUzAeFw0yNDA0MjkxNzQ3MjdaFw0yOTA0MjgxNzQ3MjZaMF8xJTAjBgNVBAMMHGVjYy1zbXAtYnJva2VyLXNpZ25fVUM0LVBST0QxFDASBgNVBAsMC2lPUyBTeXN0ZW1zMRMwEQYDVQQKDApBcHBsZSBJbmMuMQswCQYDVQQGEwJVUzBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABMIVd+3r1seyIY9o3XCQoSGNx7C9bywoPYRgldlK9KVBG4NCDtgR80B+gzMfHFTD9+syINa61dTv9JKJiT58DxOjggIRMIICDTAMBgNVHRMBAf8EAjAAMB8GA1UdIwQYMBaAFCPyScRPk+TvJ+bE9ihsP6K7\/S5LMEUGCCsGAQUFBwEBBDkwNzA1BggrBgEFBQcwAYYpaHR0cDovL29jc3AuYXBwbGUuY29tL29jc3AwNC1hcHBsZWFpY2EzMDIwggEdBgNVHSAEggEUMIIBEDCCAQwGCSqGSIb3Y2QFATCB\/jCBwwYIKwYBBQUHAgIwgbYMgbNSZWxpYW5jZSBvbiB0aGlzIGNlcnRpZmljYXRlIGJ5IGFueSBwYXJ0eSBhc3N1bWVzIGFjY2VwdGFuY2Ugb2YgdGhlIHRoZW4gYXBwbGljYWJsZSBzdGFuZGFyZCB0ZXJtcyBhbmQgY29uZGl0aW9ucyBvZiB1c2UsIGNlcnRpZmljYXRlIHBvbGljeSBhbmQgY2VydGlmaWNhdGlvbiBwcmFjdGljZSBzdGF0ZW1lbnRzLjA2BggrBgEFBQcCARYqaHR0cDovL3d3dy5hcHBsZS5jb20vY2VydGlmaWNhdGVhdXRob3JpdHkvMDQGA1UdHwQtMCswKaAnoCWGI2h0dHA6Ly9jcmwuYXBwbGUuY29tL2FwcGxlYWljYTMuY3JsMB0GA1UdDgQWBBSUV9tv1XSBhomJdi9+V4UH55tYJDAOBgNVHQ8BAf8EBAMCB4AwDwYJKoZIhvdjZAYdBAIFADAKBggqhkjOPQQDAgNJADBGAiEAxvAjyyYUuzA4iKFimD4ak\/EFb1D6eM25ukyiQcwU4l4CIQC+PNDf0WJH9klEdTgOnUTCKKEIkKOh3HJLi0y4iJgYvDCCAu4wggJ1oAMCAQICCEltL786mNqXMAoGCCqGSM49BAMCMGcxGzAZBgNVBAMMEkFwcGxlIFJvb3QgQ0EgLSBHMzEmMCQGA1UECwwdQXBwbGUgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkxEzARBgNVBAoMCkFwcGxlIEluYy4xCzAJBgNVBAYTAlVTMB4XDTE0MDUwNjIzNDYzMFoXDTI5MDUwNjIzNDYzMFowejEuMCwGA1UEAwwlQXBwbGUgQXBwbGljYXRpb24gSW50ZWdyYXRpb24gQ0EgLSBHMzEmMCQGA1UECwwdQXBwbGUgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkxEzARBgNVBAoMCkFwcGxlIEluYy4xCzAJBgNVBAYTAlVTMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE8BcRhBnXZIXVGl4lgQd26ICi7957rk3gjfxLk+EzVtVmWzWuItCXdg0iTnu6CP12F86Iy3a7ZnC+yOgphP9URaOB9zCB9DBGBggrBgEFBQcBAQQ6MDgwNgYIKwYBBQUHMAGGKmh0dHA6Ly9vY3NwLmFwcGxlLmNvbS9vY3NwMDQtYXBwbGVyb290Y2FnMzAdBgNVHQ4EFgQUI\/JJxE+T5O8n5sT2KGw\/orv9LkswDwYDVR0TAQH\/BAUwAwEB\/zAfBgNVHSMEGDAWgBS7sN6hWDOImqSKmd6+veuv2sskqzA3BgNVHR8EMDAuMCygKqAohiZodHRwOi8vY3JsLmFwcGxlLmNvbS9hcHBsZXJvb3RjYWczLmNybDAOBgNVHQ8BAf8EBAMCAQYwEAYKKoZIhvdjZAYCDgQCBQAwCgYIKoZIzj0EAwIDZwAwZAIwOs9yg1EWmbGG+zXDVspiv\/QX7dkPdU2ijr7xnIFeQreJ+Jj3m1mfmNVBDY+d6cL+AjAyLdVEIbCjBXdsXfM4O5Bn\/Rd8LCFtlk\/GcmmCEm9U+Hp9G5nLmwmJIWEGmQ8Jkh0AADGCAYgwggGEAgEBMIGGMHoxLjAsBgNVBAMMJUFwcGxlIEFwcGxpY2F0aW9uIEludGVncmF0aW9uIENBIC0gRzMxJjAkBgNVBAsMHUFwcGxlIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MRMwEQYDVQQKDApBcHBsZSBJbmMuMQswCQYDVQQGEwJVUwIIFmNMiw4wVxcwCwYJYIZIAWUDBAIBoIGTMBgGCSqGSIb3DQEJAzELBgkqhkiG9w0BBwEwHAYJKoZIhvcNAQkFMQ8XDTI1MTAwMjE5MjYyNFowKAYJKoZIhvcNAQk0MRswGTALBglghkgBZQMEAgGhCgYIKoZIzj0EAwIwLwYJKoZIhvcNAQkEMSIEIIglNywQdAxKnixbc4TJLaopplLPs5m84zjbAlsJuvnOMAoGCCqGSM49BAMCBEcwRQIhANjW5bxOlsS4oBDrxUn6OtIHWxpHshyj0ozI518Ty\/rbAiAW+dbxN9OQJ9a2B3VMps89dm0ZB6MdQCG7iHM2g2Tn1gAAAAAAAA==\",\r\n      \"header\":{\r\n         \"publicKeyHash\":\"YK8kdoBXLGqBQKBtCZOl0DQTUHOWidRCxgOgf\/1gBMM=\",\r\n         \"ephemeralPublicKey\":\"MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEEVv32VVJYlg+E0zMsthvBaldJcH45NUWhVckme\/CQYFtHf60FEdFtzwabOEMY3u1De+6e+IuBv53OxmWx+1w2w==\",\r\n         \"transactionId\":\"87a03c4cc1b242a25d74257d4bc990a6473b9866392850e584a9f680dcdf3d0f\"\r\n      },\r\n      \"version\":\"EC_v1\"\r\n   }\r\n}",
                "soft_descriptor": "TEST",
                "stored_credentials": {
                    "reason": "SUBSCRIPTION",
                    "usage": "FIRST"
                }
            }
        }
    },
    "account_id": "fe14c7c6-c75e-43b7-bdbe-4c87ad52c482",
    "description": "Apple Pay recurring setup",
    "merchant_order_id": "recurring-setup-123"
}'
```

#### Key parameters for CIT

* **`vault_on_success: true`**: Indicates this is a recurring payment setup and generates the vaulted token for future MIT transactions
* **`detail.wallet.stored_credentials.usage: FIRST`**: Indicates this is the initial transaction in a recurring series
* **`detail.wallet.payment_token`**: Must be the stringified Apple SDK response, the `payment_token`

### CIT response handling

When the CIT is successful, you'll receive a response containing the `vaulted_token`. It can be used for subsequent transactions. Exercise extreme caution storing this value.

```json
{
  "id": "61533a3b-f971-422f-a839-9af61f8ec9ab",
  "status": "SUCCEEDED",
  "payment_method": {
    "id": "7a2f1c44-3d57-4a9c-9ef0-3c0b5a8d2e1f",
    "vaulted_token": "98c16e23-ebdd-4d0f-85bd-e0ba7d2fedf6"
  }
}
```

### Merchant Initiated Transaction (MIT)

MIT transactions are processed automatically for recurring billing using the `vaulted_token` from the CIT.

#### Example MIT request

```json
curl --location 'https://api-sandbox.y.uno/v1/payments' \
--header 'X-idempotency-key: 4793b6aa-b2b3-4296-8477-37316f27c287' \
--header 'public-api-key: ' \
--header 'private-secret-key: ' \
--header 'Keep-Alive: timeout=5, max=1000' \
--header 'Content-Type: application/json' \
--data-raw '{
    "country": "US",
    "amount": {
        "currency": "USD",
        "value": 2000
    },
    "customer_payer": {
        "id": "24e25748-6ab3-4d43-bb8b-eb0204bb0951",
        "email": "customer@example.com",
        "first_name": "John",
        "last_name": "Doe"
    },
    "workflow": "DIRECT",
    "payment_method": {
        "vault_on_success": true,
        "vaulted_token": "98c16e23-ebdd-4d0f-85bd-e0ba7d2fedf6",
        "type": "APPLE_PAY",
        "detail": {
            "card": {
                "soft_descriptor": "TEST",
                "stored_credentials": {
                    "reason": "SUBSCRIPTION",
                    "usage": "USED"
                }
            }
        }
    },
    "account_id": "fe14c7c6-c75e-43b7-bdbe-4c87ad52c482",
    "description": "Apple Pay recurring setup",
    "merchant_order_id": "recurring-setup-123"
}'
```

#### Key parameters for MIT

* **`vaulted_token`**: The vaulted token generated during the CIT
* **`detail.card.stored_credentials.usage: "USED"`**: Indicates this is a subsequent transaction in a recurring series
* **No `payment_token` required**: Uses the stored `vaulted_token` instead

## Troubleshooting

* **Merchant validation failed**: verify Apple Pay certificates and merchant ID configuration
* **Invalid or expired Apple token**: obtain a fresh token from Apple SDK and ensure it is stringified
* **Unsupported network or country**: confirm your provider supports Apple Pay for the requested currency/country
* **Duplicate charges**: always send an `Idempotency-Key` with create payment calls

## Related documentation

* [Prerequisites for Apple Pay](doc:prerequisites-apple-pay)
* [Apple Pay SDK integration](doc:apple-pay-sdk-integration)
* [Create payment API](ref:create-payment)
* [Subscription management](doc:subscriptions)
* [Webhooks](doc:webhooks)
