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

<HTMLBlock>{`
<style>
  .lista {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .lista .item-lista {
    display: flex;
  }

  .lista .item-lista .numero div {
    margin: 0 5px 0 0;
    min-width: 20px;
    text-align: center;
    padding: 1px;
    font-size: 0.8rem;
    background-color: #614ad6;
    border-radius: 100%;
    color: #fff;
  }

  .lista .item-lista .texto p {
    margin: 0;
  }

  .checkout-list {
    margin: 0 !important;
    padding-left: 1em !important;
  }
</style>

<body>
  <div class="lista">
    <div class="item-lista">
      <div class="numero">
        <div>1</div>
      </div>
      <div class="texto">
        <p>The merchant needs to send a CSV file to Yuno containing the customers' information and the external token used by the current payment provider. The data description and the standard parameters the file must contain are presented in the table below.</p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

| Parameter              | Description                                                         |
| :--------------------- | :------------------------------------------------------------------ |
| account\_id            | The unique identifier of the account.                               |
| merchant\_customer\_id | The unique identifier of the customer in the external merchant.     |
| first\_name            | The customer's first name.                                          |
| last\_name             | The customer's last name.                                           |
| email                  | The customer's e-mail.                                              |
| country                | The customer's country.                                             |
| document\_number       | The customer's document number.                                     |
| document\_type         | The customer's document type.                                       |
| type                   | The payment method type.                                            |
| id                     | The unique identifier of the payment provider. For example, dLocal. |
| payment\_method\_token | The payment method token for the provider specified in id.          |

<HTMLBlock>{`
<body>
  <div class="lista">
    <div class="item-lista">
      <div class="numero">
        <div>2</div>
      </div>
      <div class="texto">
        <p>Yuno will asynchronously tokenize the card data from the third-party payment providers through the batch process. In this process, the data will be a GPG-encriped CSV file.</p>
      </div>
    </div>
    <div class="item-lista">
      <div class="numero">
        <div>3</div>
      </div>
      <div class="texto">
        <p>Yuno will return a CSV file to the merchant containing the information provided in Step 1 along with a unique customer_id, assigned by Yuno and a token_ID (payment_method_id) for each of the payment_method_token initially provided. These data allow the merchant to uniquely identify and reference the customer and their payment methods in future transactions. The data description and the parameter in the CSV provided by Yuno to the merchant are presented below.</p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

| Parameter              | Description                                                         |
| :--------------------- | :------------------------------------------------------------------ |
| merchant\_customer\_id | The unique identifier of the customer in the external merchant.     |
| first\_name            | The customer's first name.                                          |
| last\_name             | The customer's last name.                                           |
| email                  | The customer's e-mail.                                              |
| country                | The customer's country.                                             |
| document\_number       | The customer's document number.                                     |
| document\_type         | The customer's document type.                                       |
| type                   | The payment method type.                                            |
| id                     | The unique identifier of the payment provider. For example, dLocal. |
| payment\_method\_token | The payment method token for the provider specified in id.          |
| customer\_id           | The customer's unique identifier.                                   |
| payment\_method\_id    | The unique identifier of the payment\_method.                       |
