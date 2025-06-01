---
title: HTTP Response Codes
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: >-
    Here, we outline the common error codes and resolutions you may encounter
    using the Yuno API. Yuno uses standard HTTP response codes to indicate the
    success or failure of API requests.
  robots: index
next:
  description: ''
---
This section outlines the common error codes and resolutions you may encounter while using the Yuno API.

Yuno uses standard HTTP response codes to indicate the success or failure of API requests. 

Codes in the 2xx range usually indicate success. Codes in the 4xx range indicate an error that occurred based on the information provided (e.g., a missing parameter, etc.), and codes in the 5xx range indicate an internal error.

## Example

```json
{
  "code": "INVALID_REQUEST",
  "messages": [
    "Invalid request."
  ]
}
```

## Response attributes for errors

[block:html]
{
  "html": "<div>\n  <div class=\"yuno\">\n    <p><code>code</code> <small>string</small>\n      <br/>Attribute for error code state.\n    </p>\t\n  </div>\n  \n  <div class=\"yuno\">\n    <p><code>message</code> <small>array of strings</small>\n      <br/>Error message that is returned.\n    </p>\t\n  </div>\n  \n</div>\n\n<style>\n  :root {\n    --yuno-main-color: #614AD6;\n    --yellow: #CEE65A;\n  }\n  details {\n    display: flex;\n    overflow: hidden;\n  }\n   .yuno  p {\n      margin-left: 20px;\n    }\n    .yuno {\n   \t  --highlight: var(#eee) ;\n    \tbackground: #eee;\n      margin: 1.5em;\n      border-radius: 5px;\n      border-left: 15px solid var(--yuno-main-color);\n      padding: 0.25em; \n    }\n</style>"
}
[/block]


See what codes are returned by Yuno's Rest API.

| HTTP Status Code          | Code                            | Description                                                                                                                                                                                       |
| :------------------------ | :------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 400 Bad Request           | `INVALID_REQUEST`               | Invalid request.                                                                                                                                                                                  |
|                           | `INVALID_PARAMETERS`            | Invalid parameters: list - [parameter_name].                                                                                                                                                      |
|                           | `MISSING_PARAMETERS`            | Missing parameters: list - [parameter_name].                                                                                                                                                      |
|                           | `INVALID_STATUS`                | Invalid transaction status.                                                                                                                                                                       |
|                           | `COUNTRY_NOT_SUPPORTED`         | Country not supported.                                                                                                                                                                            |
|                           | `CURRENCY_NOT_ALLOWED`          | Currency is not allowed for this country.                                                                                                                                                         |
|                           | `CUSTOMER_ID_DUPLICATED`        | The customer id for the merchant is duplicated.                                                                                                                                                   |
|                           | `INVALID_AMOUNT`                | Invalid amount for the payment method.                                                                                                                                                            |
|                           | `INVALID_ACCOUNT_ID`            | Invalid Yuno's account id                                                                                                                                                                         |
|                           | `INVALID_TRANSACTION`           | Invalid transaction id                                                                                                                                                                            |
|                           | `INVALID_API_VERSION`           | Invalid API Version.                                                                                                                                                                              |
|                           | `INVALID_TRANSACTION_TYPE`      | Invalid transaction type for the request.                                                                                                                                                         |
|                           | `CHARGEBACK_IN_PROCESS`         | Chargeback in place for this transaction.                                                                                                                                                         |
|                           | `UNAVAILABLE_PAYMENT_METHOD`    | Unavailable payment method.                                                                                                                                                                       |
|                           | `NOT_FOUND`                     | Resource not found.                                                                                                                                                                               |
|                           | `UNEXPECTED_RESPONSE`           | Unexpected service response.                                                                                                                                                                      |
|                           | `BAD_REQUEST`                   | There was a bad error executing the request.                                                                                                                                                      |
|                           | `INVALID_REPORT_ID`             | Report id must be UUID.                                                                                                                                                                           |
|                           | `INVALID_REPORT_TYPE`           | Invalid report type.                                                                                                                                                                              |
|                           | `INVALID_DATE_FORMAT`           | Start/end date format must be yyyy-MM-dd'T'HH:mm:ss.SSS'Z'.                                                                                                                                       |
|                           | `REPORT_MAX_RANGE_ERROR`        | Max range date is two months.                                                                                                                                                                     |
|                           | `REPORT_RANGE_ERROR`            | Start date must be before end date. Start/end date must be after now.                                                                                                                             |
|                           | `REPORT_STATUS_ERROR`           | Report is not ready yet, status is %s.                                                                                                                                                            |
|                           | `REPORT_EMPTY`                  | Report requested is empty.                                                                                                                                                                        |
|                           | `PAYMENT_METHOD_NOT_FOUND`      | [For Subscriptions] - Payment method associated to the customer not found                                                                                                                         |
|                           | `PAYMENT_METHOD_STATUS_INVALID` | [For Subscriptions] - The payment method is a state that does not allow payments to be made.                                                                                                      |
|                           | `INCORRECT_PAYMENT_METHOD_TYPE` | [For Subscriptions] - The type of payment method of the request does not correspond to the vaulted_token.                                                                                         |
|                           | `SUBSCRIPTION_NOT_FOUND`        | [For Subscriptions] - Subscription not found.                                                                                                                                                     |
|                           | `INVALID_STATE`                 | [For Subscriptions] - The subscription state does not support the action requested.                                                                                                               |
|                           | `INVALID_DATE`                  | [For Subscriptions] - The subscription can not be resume due to a conflict with the availability dates. Please update availability dates and try again if you want to keep using the subscription |
|                           | `INVALID_PARAMETERS`            | [For Subscriptions] - Invalid parameters: list - [parameter_name].                                                                                                                                |
|                           | `INVALID_CUSTOMER_FOR_TOKEN`    | The token used for this transaction is associated with another customer object.                                                                                                                   |
|                           | `PAYMENT_NOT_FOUND`             | Payment not found.                                                                                                                                                                                |
|                           | `TRANSACTION_NOT_FOUND`         | Transaction of payment not found                                                                                                                                                                  |
|                           | `CUSTOMER_NOT_FOUND`            | Customer not found                                                                                                                                                                                |
|                           | `CHECKOUT_SESSION_NOT_FOUND`    | Checkout session not found or inactive                                                                                                                                                            |
|                           | `REPORT_NOT_FOUND`              | Report id not found                                                                                                                                                                               |
| 401 Unauthorized          | `INVALID_CREDENTIALS`           | Invalid Credentials.                                                                                                                                                                              |
|                           | `EXPIRED_CREDENTIALS`           | Expired Credentials.                                                                                                                                                                              |
|                           | `UNKNOWN_IP_ADDRESS`            | Unregistered IP address.                                                                                                                                                                          |
|                           | `INVALID_TOKEN`                 | Invalid Token.                                                                                                                                                                                    |
|                           | `TOKEN_IN_USE`                  | The token provided is currently being used in another request.                                                                                                                                    |
| 403 Forbidden             | `AUTHORIZATION_REQUIRED`        | The merchant has no authorization to use this API.                                                                                                                                                |
| 405 Method not allowed    | `UNSUPPORTED_METHOD`            | Method not supported.                                                                                                                                                                             |
| 500 Internal Server Error | `INTERNAL_ERROR`                | Internal error.                                                                                                                                                                                   |
| 504 Gateway Timeout       | `REQUEST_TIMEOUT`               | Request Timeout.                                                                                                                                                                                  |