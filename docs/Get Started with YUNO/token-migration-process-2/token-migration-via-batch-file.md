---
title: Token migration via batch file
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
To migrate tokens to Yuno using a batch file, the merchant should follow the steps below:

[block:html]
{
  "html": "<style>\n  .lista {\n    display: flex;\n    flex-direction: column;\n    gap: 1rem;\n  }\n\n  .lista .item-lista {\n    display: flex;\n  }\n\n  .lista .item-lista .numero div {\n    margin: 0 5px 0 0;\n    min-width: 20px;\n    text-align: center;\n    padding: 1px;\n    font-size: 0.8rem;\n    background-color: #614ad6;\n    border-radius: 100%;\n    color: #fff;\n  }\n\n  .lista .item-lista .texto p {\n    margin: 0;\n  }\n\n  .checkout-list {\n    margin: 0 !important;\n    padding-left: 1em !important;\n  }\n</style>\n\n<body>\n  <div class=\"lista\">\n    <div class=\"item-lista\">\n      <div class=\"numero\">\n        <div>1</div>\n      </div>\n      <div class=\"texto\">\n        <p>The merchant needs to send a CSV file to Yuno containing the customers' information and the external token used by the current payment provider. The data description and the standard parameters the file must contain are presented in the table below.</p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]



| Parameter            | Description                                                         |
| :------------------- | :------------------------------------------------------------------ |
| account_id           | The unique identifier of the account.                               |
| merchant_customer_id | The unique identifier of the customer in the external merchant.     |
| first_name           | The customer's first name.                                          |
| last_name            | The customer's last name.                                           |
| email                | The customer's e-mail.                                              |
| country              | The customer's country.                                             |
| document_number      | The customer's document number.                                     |
| document_type        | The customer's document type.                                       |
| type                 | The payment method type.                                            |
| id                   | The unique identifier of the payment provider. For example, dLocal. |
| payment_method_token | The payment method token for the provider specified in id.          |

[block:html]
{
  "html": "<body>\n  <div class=\"lista\">\n    <div class=\"item-lista\">\n      <div class=\"numero\">\n        <div>2</div>\n      </div>\n      <div class=\"texto\">\n        <p>Yuno will asynchronously tokenize the card data from the third-party payment providers through the batch process. In this process, the data will be a GPG-encriped CSV file.</p>\n      </div>\n    </div>\n    <div class=\"item-lista\">\n      <div class=\"numero\">\n        <div>3</div>\n      </div>\n      <div class=\"texto\">\n        <p>Yuno will return a CSV file to the merchant containing the information provided in Step 1 along with a unique customer_id, assigned by Yuno and a token_ID (payment_method_id) for each of the payment_method_token initially provided. These data allow the merchant to uniquely identify and reference the customer and their payment methods in future transactions. The data description and the parameter in the CSV provided by Yuno to the merchant are presented below.</p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]



| Parameter            | Description                                                         |
| :------------------- | :------------------------------------------------------------------ |
| merchant_customer_id | The unique identifier of the customer in the external merchant.     |
| first_name           | The customer's first name.                                          |
| last_name            | The customer's last name.                                           |
| email                | The customer's e-mail.                                              |
| country              | The customer's country.                                             |
| document_number      | The customer's document number.                                     |
| document_type        | The customer's document type.                                       |
| type                 | The payment method type.                                            |
| id                   | The unique identifier of the payment provider. For example, dLocal. |
| payment_method_token | The payment method token for the provider specified in id.          |
| customer_id          | The customer's unique identifier.                                   |
| payment_method_id    | The unique identifier of the payment_method.                        |