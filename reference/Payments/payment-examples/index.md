---
title: Payment Examples
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
When using [Yuno's SDK](https://docs.y.uno/docs/web-sdk-integrations), we take care of every particular scenario any payment method could have. Once the customer selects the payment method and chooses to pay, if there is any extra information needed to process the payment (besides the one that you shared with us in the integration), we will display a form asking the customer for that particular information needed. A few examples of these scenarios could be:

* **Document/phone**: Some alternative payment methods require either the customers document or phone number, so in case you don't have that information in your integration, we'll ask for them in the form mentioned before so you don't have to.
* **PSE**: This payment method requires the customer to select the bank they will use to make the payment, so we offer them a list of banks to choose from.

> 📘 `SDK_CHECKOUT` Workflow
>
> The `SDK_CHECKOUT` workflow allows you to manage the entire payment experience by integrating directly with our APIs. Depending on your needs, you can choose from the following workflows:
>
> * **DIRECT Workflow**: Suitable for Cards (available only for PCI compliant merchants).
> * **REDIRECT Workflow**: Ideal for alternative payment methods.
>
> For detailed payment examples, refer to the respective sections for each payment method category.

For the `SDK_CHECKOUT` workflow, all the information is going to be stored in the [`One-time token`](https://docs.y.uno/docs/network-tokens#/on-time-use-token-vs-vaulted-token-vs-network-token) returned by Yuno's SDK, so you don't have to change your integration depending on the payment method. The basic structure of the payment will be the same for every payment method, as in the example below.

```curl Request (cURL)
curl --location 'https://api-sandbox.y.uno/v1/payments' \
--header 'X-idempotency-key: <Your X-Idempotency-Key>' \
--header 'public-api-key: <Your public-api-key>' \
--header 'private-secret-key: <Your private-secret-key>' \
--header 'Content-Type: application/json' \
--data '{
    "description": "Test",
    "account_id": "<Your account id>",
    "merchant_order_id": "000001",
    "merchant_reference": "Test_A01",
    "country": "AR",
    "amount": {
        "currency": "ARS",
        "value": 100
    },
    "checkout": {
        "session": "<:checkout_session>"
    },
    "customer_payer": {
        "id": "<:customer_id>"
    },
    "payment_method": {
        "token": "<:one_time_token>"
    }
}'
```
```json Response(JSON)
{
    "id": "182ffc6e-9b3b-4e66-855b-94d2cfe07354",
    "account_id": "493e9374-510a-4201-9e09-de669d75f256",
    "description": "Test Cards",
    "country": "AR",
    "status": "SUCCEEDED",
    "sub_status": "APPROVED",
    "merchant_order_id": "0000022",
    "created_at": "2023-07-20T20:42:24.144148Z",
    "updated_at": "2023-07-20T20:42:28.479089Z",
    "amount": {
        "captured": 0.00,
        "currency": "ARS",
        "refunded": 0.00,
        "value": 100.00
    },
    "checkout": {
        "session": "c1ded0b9-97ab-46f4-8cdb-ee3ce693f7f6",
        "sdk_action_required": false
    },
    "payment_method": {
        "vaulted_token": "f4ef4bd4-984e-43ca-b070-e00a9c66be6b",
        "type": "CARD",
        "vault_on_success": true,
        "token": "f03b1dc7-a26b-48ca-93e3-3383fa3c17e8",
        "payment_method_detail": {
            "card": {
                "verify": null,
                "capture": true,
                "installments": 1,
                "first_installment_deferral": 0,
                "installments_type": "",
                "installment_amount": null,
                "soft_descriptor": "",
                "authorization_code": "385876",
                "retrieval_reference_number": "",
                "voucher": null,
                "card_data": {
                    "holder_name": "Fannie Weissnat",
                    "iin": "41961111",
                    "lfd": "0010",
                    "number_length": 16,
                    "security_code_length": 3,
                    "brand": "VISA",
                    "issuer_name": "METABANK",
                    "issuer_code": "US_METABANK",
                    "category": "PREPAID",
                    "type": "PREPAID",
                    "three_d_secure": {
                        "setup_id": null,
                        "token": null,
                        "collect_url": null,
                        "setup_reference_id": null,
                        "developer_id": null,
                        "solution_id": null,
                        "code": null,
                        "version": null,
                        "electronic_commerce_indicator": null,
                        "cryptogram": null,
                        "transaction_id": null,
                        "acs_id": null,
                        "ds_id": null,
                        "pares_status": null
                    }
                }
            }
        }
    },
    "customer_payer": {
        "id": "d7cd334c-da1e-444a-8502-2f747fe67c52",
        "merchant_customer_id": "1689885733",
        "first_name": "Fernando",
        "last_name": "Iglesias",
        "gender": "",
        "date_of_birth": null,
        "email": "Adaline38@gmail.com",
        "nationality": null,
        "ip_address": null,
        "device_fingerprint": null,
        "browser_info": {
            "user_agent": "",
            "accept_header": "",
            "accept_content": null,
            "accept_browser": null,
            "color_depth": "",
            "screen_height": "",
            "screen_width": "",
            "javascript_enabled": null,
            "java_enabled": null,
            "browser_time_difference": null,
            "language": ""
        },
        "document": {
            "document_type": "DNI",
            "document_number": "38799992"
        },
        "phone": null,
        "billing_address": null,
        "shipping_address": null
    },
    "additional_data": null,
    "taxes": null,
    "transactions": {
        "id": "10d8b481-f6d9-4fe3-98b5-a890d8a12ca9",
        "type": "PURCHASE",
        "status": "SUCCEEDED",
        "category": "CARD",
        "amount": 100.00,
        "provider_id": "DLOCAL",
        "payment_method": {
            "vaulted_token": "f4ef4bd4-984e-43ca-b070-e00a9c66be6b",
            "type": "CARD",
            "vault_on_success": true,
            "token": "f03b1dc7-a26b-48ca-93e3-3383fa3c17e8",
            "detail": {
                "card": {
                    "verify": null,
                    "capture": true,
                    "installments": 1,
                    "first_installment_deferral": 0,
                    "installments_type": "",
                    "installment_amount": null,
                    "soft_descriptor": "",
                    "authorization_code": "385876",
                    "retrieval_reference_number": "",
                    "voucher": null,
                    "card_data": {
                        "holder_name": "Fannie Weissnat",
                        "iin": "41961111",
                        "lfd": "0010",
                        "number_length": 16,
                        "security_code_length": 3,
                        "brand": "VISA",
                        "issuer_name": "METABANK",
                        "issuer_code": "US_METABANK",
                        "category": "PREPAID",
                        "type": "PREPAID",
                        "three_d_secure": {
                            "setup_id": null,
                            "token": null,
                            "collect_url": null,
                            "setup_reference_id": null,
                            "developer_id": null,
                            "solution_id": null,
                            "code": null,
                            "version": null,
                            "electronic_commerce_indicator": null,
                            "cryptogram": null,
                            "transaction_id": null,
                            "acs_id": null,
                            "ds_id": null,
                            "pares_status": null
                        }
                    }
                }
            }
        },
        "response_code": "SUCCEEDED",
        "response_message": "Transaction successful",
        "reason": null,
        "description": "Test Cards",
        "merchant_reference": "Pago de test 001",
        "provider_data": {
            "id": "DLOCAL",
            "transaction_id": "T-385928-006c26bc-db49-467c-ba60-6c4485cc6120",
            "account_id": "",
            "status": "PAID",
            "sub_status": "",
            "status_detail": "200",
            "response_message": "The payment was paid.",
            "raw_response": {
                "value": "{\"id\":\"T-385928-006c26bc-db49-467c-ba60-6c4485cc6120\",\"amount\":100.00,\"currency\":\"ARS\",\"payment_method_id\":\"CARD\",\"payment_method_type\":\"CARD\",\"payment_method_flow\":\"DIRECT\",\"country\":\"AR\",\"card\":{\"holder_name\":\"Fannie Weissnat\",\"expiration_month\":3,\"expiration_year\":2024,\"brand\":\"VI\",\"last4\":\"0010\",\"installments\":1,\"installments_responsible\":\"customer\"},\"three_dsecure\":{},\"created_date\":\"2023-07-20T20:42:25.000+0000\",\"approved_date\":\"2023-07-20T20:42:28.000+0000\",\"status\":\"PAID\",\"status_detail\":\"The payment was paid.\",\"status_code\":\"200\",\"order_id\":\"10d8b481-f6d9-4fe3-98b5-a890d8a12ca9\",\"description\":\"Test Cards\",\"notification_url\":\"https://sandbox.y.uno/dlocal-webhook/v1/confirmations\",\"acquirer\":{\"authorization_code\":\"385876\"}}"
            },
            "third_party_transaction_id": ""
        },
        "three_d_secure_action_required": null,
        "created_at": "2023-07-20T20:42:24.279905Z",
        "updated_at": "2023-07-20T20:42:28.346109Z"
    },
    "split": [],
    "callback_url": "https://google.com/?checkoutSession=c1ded0b9-97ab-46f4-8cdb-ee3ce693f7f6",
    "workflow": "SDK_CHECKOUT",
    "metadata": []
}
```