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
    margin: 0 7px 0 0;
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
</style>

<section>
  <div class="lista">
    <!--<div class="item-lista">
      <div class="numero">
        <div>1</div>
      </div>
      <div class="texto">
        <p> The payment provider defines the format and mechanism by which the information will be shared with Yuno.</p>
      </div>
    </div>
    <div class="item-lista">
      <div class="numero">
        <div>2</div>
      </div>
      <div class="texto">
        <p>Yuno extracts the information from the selected transfer mechanism, and makes the information available.</p>
      </div>
    </div>-->
    <div class="item-lista">
      <div class="numero">
        <div>1</div>
      </div>
      <div class="texto">
        <p>The merchant must create a customer using the <a
            href="https://docs.y.uno/reference/create-customer">Create Customer</a> endpoint.</p>
        <p><strong>Note:</strong> If the client already exists in Yuno, you can skip this step.</p>
      </div>
    </div>
    <div class="item-lista">
      <div class="numero">
        <div>2</div>
      </div>
      <div class="texto">
        <p><b>Optional</b>: The merchant can use the <a
            href="https://docs.y.uno/reference/create-customer">Retrieve Customer</a> endpoint to confirm each customer information.</p>
      </div>
    </div>
    
    <div class="item-lista">
      <div class="numero">
        <div>3</div>
      </div>
      <div class="texto">
        <p>Once Yuno confirms receipt of the information by the payment provider and it is available, the merchant must
          consume the <a href="https://docs.y.uno/reference/enroll-payment-method-api">Enroll Payment Method</a>
          endpoint and include the <code>provider_data</code> object with the external provider's token:</p>

      </div>
    </div>
</section>
`}</HTMLBlock>

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

<HTMLBlock>{`
<section>
  <div class="lista">
    <div class="item-lista">
      <div class="numero">
        <div>4</div>
      </div>
      <div class="texto">
			 <p>Once the merchant consumes the <a
            href="https://docs.y.uno/reference/enroll-payment-method-api">Enroll Payment Method</a> endpoint the response is an enrolled payment method:</p>
      </div>
    </div>
    </div>
   </section>
`}</HTMLBlock>

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

<HTMLBlock>{`
<section>
  <div class="lista">
    <div class="item-lista">
      <div class="numero">
        <div>5</div>
      </div>
      <div class="texto">
        <p><b>Optional</b>: The merchant can confirm the enrolled payment methods for each customer using the <a
            href="https://docs.y.uno/reference/retrieve-enrolled-payment-methods-api">Retrieve Enrolled Payment Methods</a> endpoint.</p>
      </div>
    </div>
    </div>
   </section>
`}</HTMLBlock>
