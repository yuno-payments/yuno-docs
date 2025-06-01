---
title: Token migration via API
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
To migrate tokens to Yuno using the API, the merchant should follow the steps below:

[block:html]
{
  "html": "<style>\n  .lista {\n    display: flex;\n    flex-direction: column;\n    gap: 1rem;\n  }\n\n  .lista .item-lista {\n    display: flex;\n  }\n\n  .lista .item-lista .numero div {\n    margin: 0 7px 0 0;\n    min-width: 20px;\n    text-align: center;\n    padding: 1px;\n    font-size: 0.8rem;\n    background-color: #614ad6;\n    border-radius: 100%;\n    color: #fff;\n  }\n\n  .lista .item-lista .texto p {\n    margin: 0;\n  }\n</style>\n\n<section>\n  <div class=\"lista\">\n    <!--<div class=\"item-lista\">\n      <div class=\"numero\">\n        <div>1</div>\n      </div>\n      <div class=\"texto\">\n        <p> The payment provider defines the format and mechanism by which the information will be shared with Yuno.</p>\n      </div>\n    </div>\n    <div class=\"item-lista\">\n      <div class=\"numero\">\n        <div>2</div>\n      </div>\n      <div class=\"texto\">\n        <p>Yuno extracts the information from the selected transfer mechanism, and makes the information available.</p>\n      </div>\n    </div>-->\n    <div class=\"item-lista\">\n      <div class=\"numero\">\n        <div>1</div>\n      </div>\n      <div class=\"texto\">\n        <p>The merchant must create a customer using the <a\n            href=\"https://docs.y.uno/reference/create-customer\">Create Customer</a> endpoint.</p>\n        <p><strong>Note:</strong> If the client already exists in Yuno, you can skip this step.</p>\n      </div>\n    </div>\n    <div class=\"item-lista\">\n      <div class=\"numero\">\n        <div>2</div>\n      </div>\n      <div class=\"texto\">\n        <p><b>Optional</b>: The merchant can use the <a\n            href=\"https://docs.y.uno/reference/create-customer\">Retrieve Customer</a> endpoint to confirm each customer information.</p>\n      </div>\n    </div>\n    \n    <div class=\"item-lista\">\n      <div class=\"numero\">\n        <div>3</div>\n      </div>\n      <div class=\"texto\">\n        <p>Once Yuno confirms receipt of the information by the payment provider and it is available, the merchant must\n          consume the <a href=\"https://docs.y.uno/reference/enroll-payment-method-api\">Enroll Payment Method</a>\n          endpoint and include the <code>provider_data</code> object with the external provider's token:</p>\n\n      </div>\n    </div>\n</section>"
}
[/block]



```json
"provider_data": {
  "id": "id_provider",
  "payment_method_token": "{payment_method_token}" 
}

```



**Request**

```json
{
  "account_id": "dbf0c133-86bc-4be0-94a5- ca2ff6778451",
  "country": "CO", 
  "type": "CARD", 
  "workflow": "DIRECT", 
  "provider_data": {
    "id": "id_provider",
    "payment_method_token": "{payment_method_token}" 
  }
}

```



[block:html]
{
  "html": "<section>\n  <div class=\"lista\">\n    <div class=\"item-lista\">\n      <div class=\"numero\">\n        <div>4</div>\n      </div>\n      <div class=\"texto\">\n\t\t\t <p>Once the merchant consumes the <a\n            href=\"https://docs.y.uno/reference/enroll-payment-method-api\">Enroll Payment Method</a> endpoint the response is an enrolled payment method:</p>\n      </div>\n    </div>\n    </div>\n   </section>"
}
[/block]



**Response**

```json
{
  "name": "CARD",
  "description": "CARD_ENROLLMENT",
  "type": "CARD",
  "category": "CARD",
  "country": "CO",
  "status": "ENROLLED",
  "vaulted_token": "9104911d-5df9-429e-8488-ad41abea1a4b",
  "card_data": {
    "iin": "45079900",
    "lfd": "0010", 
    "number_length": "19", 
    "security_code_length": "3", 
    "brand": "VISA",
    "issuer": "Banco Galicia", 
    "category": "Gold",
    "type": "CREDIT"
  },
  "provider_data": {
  "id": "id_provider",
  "payment_method_token": "{payment_method_token}" 
},
  "created_at": "2022-05-09T20:46:54.786342Z", 
  "updated_at": "2022-05-09T20:46:54.786342Z"
}

```



[block:html]
{
  "html": "<section>\n  <div class=\"lista\">\n    <div class=\"item-lista\">\n      <div class=\"numero\">\n        <div>5</div>\n      </div>\n      <div class=\"texto\">\n        <p><b>Optional</b>: The merchant can confirm the enrolled payment methods for each customer using the <a\n            href=\"https://docs.y.uno/reference/retrieve-enrolled-payment-methods-api\">Retrieve Enrolled Payment Methods</a> endpoint.</p>\n      </div>\n    </div>\n    </div>\n   </section>"
}
[/block]