---
title: Make a test payment
excerpt: ''
deprecated: false
hidden: true
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
# Sandbox testing

Yuno Sandbox is a self-contained, virtual testing environment that mimics the live Yuno Production environment. It provides a safe environment to analyze and validate requests to the Yuno API. Thus, you can test the whole system without touching any live accounts or sensible data.

When you initiate a transaction using the Sandbox environment, Yuno creates a mock transaction that behaves exactly like a transaction in live mode. Test mode lets you track all Sandbox transactions on the Yuno Merchant Dashboard. After switching to the live mode, the Production transaction will be saved separately.

## Testing procedure

To carry out the tests with each of the API endpoints, please follow the steps below:

1. Make sure you have your Yuno account.
2. Access the Yuno Merchant Dashboard and get your credentials. The credentials are necessary to authenticate all your requests securely.
3. Please select the desired requests, format your Yuno API requests data, and run them against the Sandbox endpoint.
4. Review the responses and modify your application as necessary.
5. When your application is fully functional and free of bugs, go live by updating the API credentials and endpoint targets to the Production environment.

## Making test requests

With your Yuno API credentials in hand, you can start making requests to the Sandbox environment. The endpoint for all sandbox API calls starts with:

```curl c
https://api-sandbox.y.uno/
```

When you switch to live mode, you need to update your credentials and change your endpoints to the Production environment:

```curl
https://api.y.uno/
```

## Checkout procedures

Yuno offers two types of [SDK Checkout implementation](doc:build-your-integration#checkout): [Full Checkout](doc:the-ultimate-checkout-full) and [Lite Checkout](doc:the-ultimate-checkout-lite). You can choose the one that best fits your company's business needs. On each checkout page, you find step-by-step guides for all possible procedures.

Below we present a payment example; however, you can use the same steps for all Yuno API requests.

> 📘 Note
>
> In addition to performing requests using your system, you can use the Yuno Docs page. Yuno API routes are available for testing, with examples you can use. If it is your first time using Yuno Docs requests examples, please, access [How to Use Yuno Docs](https://docs.y.uno/reference/how-to-use-yuno-docs) for instructions.

# Testing examples

## Creating a payment

Here we present a request and possible responses for the Create Payment route. You can also access the [Create Payment](ref:create-payment) testing page to explore deeply the request object data.

### Request example

```json JSON
curl --request POST \
     --url https://api-sandbox.y.uno/v1/payments \
     --header 'X-idempotency-key: 1bd227f9d892a7f4581b998c21e353b1686a6bdad5940e7bb6aa596c96e0a6ec' \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --header 'private-secret-key: 1bd227f9d892a7f4581b998c21e353b1686a6bdad5940e7bb6aa596c96e0a6ec' \
     --header 'public-api-key: 1bd227f9d892a7f4581b998c21e353b1686a6bdad5940e7bb6aa596c96e0a6ec' \
     --data '
{
     "additional_data": {
          "airline": {
               "legs": [
                    {
                         "arrival_airport": "AMS",
                         "base_fare": 30000,
                         "base_fare_currency": "USD",
                         "carrier_code": "KL",
                         "departure_airport": "EZE",
                         "departure_airport_timezone": "-03:00",
                         "departure_datetime": "2022-05-09T20:46:54.786342Z",
                         "fare_basis_code": "HL7LNR",
                         "fare_class_code": "FR",
                         "flight_number": "842",
                         "stopover_code": "O"
                    }
               ],
               "passengers": [
                    {
                         "country": "CO",
                         "date_of_birth": "1979-01-12",
                         "document": {
                              "document_number": "1093333333",
                              "document_type": "CC"
                         },
                         "first_name": "John",
                         "last_name": "Doe",
                         "loyalty_number": "254587547",
                         "loyalty_tier": "1",
                         "middle_name": "Charles",
                         "nationality": "CO",
                         "type": "A"
                    }
               ],
               "pnr": "1P-2UUGJW",
               "ticket": {
                    "e_ticket": true,
                    "issue": {
                         "address": "Apartamento 502, Torre I",
                         "carrier_prefix_code": "044",
                         "city": "Bogotá",
                         "country": "CO",
                         "date": "1979-01-12",
                         "travel_agent_code": "10655823",
                         "travel_agent_name": "ACME Agency Inc"
                    },
                    "restricted": false,
                    "ticket_number": "7411823255523",
                    "total_fare_amount": 80000,
                    "total_fee_amount": 25200,
                    "total_tax_amount": 14800
               }
          },
          "order": {
               "fee_amount": 0,
               "items": [
                    {
                         "brand": "Apple",
                         "category": "phones",
                         "id": "3214",
                         "manufacture_part_number": "345621234",
                         "name": "Iphone 12 Pro Max",
                         "quantity": 1,
                         "sku_code": "A2342",
                         "unit_amount": 550
                    }
               ],
               "shipping_amount": 40
          }
     },
     "amount": {
          "currency": "COP",
          "value": 23.5676
     },
     "checkout": {
          "session": "9104911d-5df9-429e-8488-ad41abea1a4b"
     },
     "country": "CO",
     "customer_payer": {
          "billing_address": {
               "address_line_1": "Calle 34 # 56 - 78",
               "address_line_2": "Apartamento 502, Torre I",
               "city": "Bogota",
               "country": "CO",
               "state": "Cundinamarca",
               "zip_code": "111111"
          },
          "browser_info": {
               "accept_header": "false",
               "color_depth": "15",
               "javascript_enabled": "true",
               "language": "es-ES",
               "screen_height": "2048",
               "screen_width": "1152",
               "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9"
          },
          "date_of_birth": "1990-02-28",
          "device_fingerprint": "hi88287gbd8d7d782ge....",
          "document": {
               "document_number": "1093333333",
               "document_type": "CC"
          },
          "email": "john.doe@email.com",
          "first_name": "John",
          "gender": "M",
          "id": "12345",
          "ip_address": "192.168.123.167",
          "last_name": "Doe",
          "merchant_customer_id": "23456",
          "nationality": "CO",
          "phone": {
               "country_code": "57",
               "number": "3132450765"
          },
          "shipping_address": {
               "address_line_1": "Calle 34 # 56 - 78",
               "address_line_2": "Apartamento 502, Torre I",
               "city": "Bogota",
               "country": "CO",
               "state": "Cundinamarca",
               "zip_code": "111111"
          }
     },
     "description": "marketplace payment",
     "merchant_order_id": "432245",
     "payment_method": {
          "token": "5104911d-5df9-229e-8468-bd41abea1a4s",
          "vaulted_token": "8604911d-5ds9-229e-8468-bd41abear14s"
     }
}
'
```

### Responses examples

The Create Payment route has two response possibilities, one related to a successful request and another in case of error.

In the code snippet below, you can check an example of a successful response, containing all relevant transaction information:

```json JSON
{
  "additional_data": {
    "airline": {
      "legs": [
        {
          "arrival_airport": "AMS",
          "base_fare": 23.5676,
          "base_fare_currency": "COP",
          "carrier_code": "KL",
          "departure_airport": "EZE",
          "departure_airport_timezone": "-03:00",
          "departure_datetime": "2022-05-09T20:46:54.786342Z",
          "fare_basis_code": "HL7LNR",
          "fare_class_code": "FR",
          "flight_number": "842",
          "stopover_code": "O"
        }
      ],
      "passengers": [
        {
          "country": "CO",
          "date_of_birth": "1979-01-12",
          "document": {
            "document_number": "1093333333",
            "document_type": "CC"
          },
          "first_name": "John",
          "last_name": "Doe",
          "loyalty_number": "254587547",
          "loyalty_tier": "1",
          "middle_name": "Charles",
          "nationality": "CO",
          "type": "A"
        }
      ],
      "pnr": "1P-2UUGJW",
      "ticket": {
        "e_ticket": true,
        "issue": {
          "address": "Apartamento 502, Torre I",
          "carrier_prefix_code": "044",
          "city": "Bogotá",
          "country": "CO",
          "date": "1979-01-12",
          "travel_agent_code": "10655823",
          "travel_agent_name": "ACME Agency Inc"
        },
        "restricted": false,
        "ticket_number": "7411823255523",
        "total_fare_amount": 80000,
        "total_fee_amount": 25200,
        "total_tax_amount": 14800
      }
    },
    "order": {
      "fee_amount": 0,
      "items": [
        {
          "brand": "Apple",
          "category": "phones",
          "id": "3214",
          "manufacture_part_number": "345621234",
          "name": "Iphone 12 Pro Max",
          "quantity": 1,
          "sku_code": "A2342",
          "unit_amount": 550
        }
      ],
      "shipping_amount": 0
    }
  },
  "amount": {
    "currency": "COP",
    "value": 23.5676
  },
  "checkout": {
    "sdk_action_required": true,
    "session": "50bae77e-c65c-11ec-9d64-0242ac120002"
  },
  "country": "CO",
  "created_at": "2022-05-09T20:20:54.786342Z",
  "customer_payer": {
    "billing_address": {
      "address_line_1": "Calle 34 # 56 - 78",
      "address_line_2": "Apartamento 502, Torre I",
      "city": "Bogota",
      "country": "CO",
      "state": "Cundinamarca",
      "zip_code": "111111"
    },
    "browser_info": {
      "accept_header": "false",
      "color_depth": "15",
      "javascript_enabled": "true",
      "language": "es-ES",
      "screen_height": "2048",
      "screen_width": "1152",
      "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9"
    },
    "customer_id": "12345",
    "date_of_birth": "1990-02-28",
    "device_fingerprint": "hi88287gbd8d7d782ge....",
    "document": {
      "document_number": "1093333333",
      "document_type": "CC"
    },
    "email": "john.doe@email.com",
    "first_name": "John",
    "gender": "M",
    "id": "12345",
    "ip_address": "192.168.123.167",
    "last_name": "Doe",
    "nationality": "CO",
    "phone": {
      "country_code": "57",
      "number": "3132450765"
    },
    "shipping_address": {
      "address_line_1": "Calle 34 # 56 - 78",
      "address_line_2": "Apartamento 502, Torre I",
      "city": "Bogota",
      "country": "CO",
      "state": "Cundinamarca",
      "zip_code": "111111"
    }
  },
  "description": "marketplace payment",
  "id": "5104911d-5df9-229e-8468-bd41abea1a4s",
  "account_id": "64761a45-6e49-4ea5-a6ff-6b52030b92ac",
  "merchant_order_id": "432245",
  "status": "rejected",
  "updated_at": "2022-05-09T20:46:54.786342Z",
  "payment_method": {
    "token": "5104911d-5df9-229e-8468-bd41abea1a4s",
    "vaulted_token": "8604911d-5ds9-229e-8468-bd41abear14s",
    "type": "BANCOLOMBIA_TRANSFER",
    "vault_on_success": true,
    "payment_method_detail": {
      "card": {
        "verify": null,
        "capture": "ture",
        "installments": "true",
        "first_installment_deferral": 0,
        "installments_type": "",
        "installments_amount": "null",
        "soft_descriptor": "",
        "authorization_code": "",
        "retrieval_reference_number": "",
        "voucher": null,
        "card_data": {
          "holder_name": "jOHN DOE",
          "iin": "45079900",
          "lfd": "0010",
          "number_length": "19",
          "security_code_length": "3",
          "brand": "VISA",
          "issuer": "Banco Galicia",
          "category": "Gold",
          "type": "CREDIT"
        }
      }
    }
  },
  "transactions": {
    "amount": 40.5,
    "category": "BANK_TRANSFER",
    "created_at": "2022-05-09T20:43:54.786342Z",
    "id": "9104911d-5df9-429e-8488-ad41abea1a4b",
    "provider_id": "534345",
    "status": "expired",
    "type": "captured",
    "updated_at": "2022-05-09T20:46:54.786342Z"
  }
}
```

In event of any error, the related information is returned by the Yuno API. Following, you find an example of an error response when invalid data was provided by the request:

```json
{
  "code": "PAYMENT_METHOD_NOT_FOUND",
  "messages": [
    "Payment method not found."
  ]
}
```

<HTMLBlock>{`
<style>
  .navigation-button-shelf {
    margin: 0 0 0 0;
    display: flex;
    justify-content: space-between;
  }

  .navigation-button {
    padding: 0.3rem;
    
    border-radius: 5px;
    border: 1px solid  var(--yuno-purple);
    transition: transform .2s;
    display: flex;
    flex-direction: row;
  }

  .navigation-button:hover {
    transform: scale(1.02);
    box-shadow: 0 5px 5px  var(--yuno-purple-10);
    cursor: pointer;
  }

  .navigation-button svg {
    color: var(--yuno-purple);
    height: 25px;
    width: 25px;
  }

  .navigation-button h4 {
    font-size: 0.8rem;
    color:  var(--yuno-purple);
    margin: 0 0 0 10px;
    display: flex;
    align-items: center;
  }

  @media only screen and (max-width: 600px) {
    .navigation-button h4 {
      font-size: 0.7rem;
    }

    .navigation-button svg {
      color:  var(--yuno-purple);
      height: 20px;
      width: 20px;
    }
  }
  
  nav.Pagination1KE9HXCXYd0E {
    display: none !important;
  }
  
  /* ------------------------ define the configuration for DARK Mode ------------------------  */

  @media (prefers-color-scheme: dark) {
    .navigation-button {
      border: 1px solid  var(--yuno-purple-50);
    }

    .navigation-button:hover {
      box-shadow: none ;
    }

    .navigation-button svg {
      color: var(--yuno-purple-50);
    }

    .navigation-button h4 {
      color:  var(--yuno-purple-50);
    }
  }

  [data-color-mode="dark"] .navigation-button {
      border: 1px solid  var(--yuno-purple-50);
    }

  [data-color-mode="dark"] .navigation-button:hover {
    	box-shadow: none ;
    }

  [data-color-mode="dark"] .navigation-button svg {
      color: var(--yuno-purple-50);
    }

  [data-color-mode="dark"] .navigation-button h4 {
      color:  var(--yuno-purple-50);
    }
</style>

<body>
  <br />
  <br />
  <section class="navigation-button-shelf">
    
    <div class="navigation-button" onclick="window.location='manage-your-checkout';">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" class="bi bi-toggles"
        viewBox="0 0 16 16">
        <path
          d="M4.5 9a3.5 3.5 0 1 0 0 7h7a3.5 3.5 0 1 0 0-7h-7zm7 6a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm-7-14a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm2.45 0A3.49 3.49 0 0 1 8 3.5 3.49 3.49 0 0 1 6.95 6h4.55a2.5 2.5 0 0 0 0-5H6.95zM4.5 0h7a3.5 3.5 0 1 1 0 7h-7a3.5 3.5 0 1 1 0-7z" />
      </svg>
      <h4>
        Manage your checkout
      </h4>
    </div>
    <div class="navigation-button" onclick="window.location='enable-live-mode';">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" class="bi bi-globe"
        viewBox="0 0 16 16">
        <path
          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
      </svg>
      <h4>
        Enable live mode
      </h4>
    </div>
  </section>
</body>
`}</HTMLBlock>
