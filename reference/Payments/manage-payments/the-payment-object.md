---
title: The Payment Object
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: >-
    The object representing the payment created after generating the checkout
    session for a customer.
  robots: index
next:
  description: ''
---
This object represents the payment created after generating the checkout session for a customer.

<HTMLBlock>{`
<style>
  details {
    display: flex;
    overflow: hidden;
  }

  p {
    margin-left: 20px;
  }

  .yuno {
    --highlight: var(--yuno-card-background);
    background: var(--yuno-card-background);
    margin: 1.5em;
    border-radius: 5px;
    border-left: 15px solid var(--yuno-purple);
    padding: 0.25em;
  }

  .yuno ul {
    margin-top: -1rem;
  }

  .payment-type {
    display: grid;
    grid-template-columns: 1fr 1fr;

  }
</style>



<body>

  <div class="yuno">
    <p><strong><code>id</code></strong> <small>string</small>
      <br />The unique identifier of the customer (MAX 64 ; MIN 36).
      <br /><small> Example: 8546df3a-b83e-4bb5-a4b3-57aa6385924f </small>
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>account_id</code></strong> <small>string</small>
      <br />The unique identifier of the account (MAX 64; MIN 36).
      <br /><small> Example: 9104911d-5df9-429e-8488-ad41abea1a4b </small>
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>description</code></strong> <small>string</small>
      <br />The description of the payment (MAX 255; MIN 3).
      <br /><small> Example: Purchase on web </small>
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>country</code></strong> <small>enum</small>
      <br />Country where the transaction must be processed (MAX 2; MIN 2; <a href="country-reference">ISO 3166-1</a>).
      <br /><small> Possible enum values: Check the <a href="country-reference">Country reference</a>.</small>
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>status</code></strong> <small>enum</small>
      <br />The status of the transaction.
      <br /><small> Example: SUCCEEDED </small>
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>sub_status</code></strong> <small>enum</small>
      <br />It is a complement to the status information.
      <br /><small> Example: DECLINED </small>
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>merchant_order_id</code></strong> <small>string</small>
      <br />The unique identifier of the customer's order (MAX 255; MIN 3).
      <br /><small> Example: 2022-05-09T20:20:54.786342Z </small>
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>created_at</code></strong> <small>timestamp</small>
      <br /> The date and time when the payment was created.
      <br /><small> Example: 2022-05-09T20:46:54.786342Z </small>
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>updated_at</code></strong> <small>timestamp</small>
      <br /> The date and time of last update for the payment.
      <br /><small> Example: 2022-05-09T20:46:54.786342Z </small>
    </p>
  </div>


  <!-- NO more used -->
  <!-- <div class="yuno">
    <p><strong><code>merchant_reference</code></strong> <small>string</small>
      <br />Identification of the payment transaction defined by the merchant (MAX 255; MIN 3) Optional to complement
      the
      merchant_order_id.
      <br /><small> Example: AAB01-432245 </small>
    </p>
  </div> -->

  <details class="yuno">
    <summary>
      <strong><code>amount</code></strong> <small>object</small>
      <br />
      <p>Specifies the payment amount object, with the value and currency.</p>
    </summary>
    <div>
      <p><strong><code>currency</code></strong> <small>enum</small>
        <br />The currency used to make the payment (MAX 3; MIN 3; <a href="country-reference">ISO 4217</a>).
        <br /><small> Possible enum values: Check the <a href="country-reference">Country reference</a>.</small>
      </p>
      <p><strong><code>value</code></strong> <small>number</small>
        <br />The payment amount (multiple of 0.0001).
        <br /><small> Example: 111111 </small>
      </p>
     <details class="yuno">
        <summary>
            <strong><code>currency_conversion</code></strong> <small>object</small>
            <br />
            <p>Specifies the currency conversion object.</p>
          </summary>
          <div>
            <p><strong><code>provider_currency_conversion_id</code></strong> <small>string</small>
              <br />The unique identifier of the conversion rate query from the provider (MAX 526 ; MIN 3).
              <br /><small> Example: 9104911d-5df9-429e-8488-ad41abea1a4b</small>
            </p>
            <p><strong><code>cardholder_currency</code></strong> <small>enum</small>
              <br />The currency to make the conversion (ISO 4217 MAX 3; MIN 3).
              <br /><small> Example: USD </small>
            </p>
             <p><strong><code>cardholder_amount</code></strong> <small>number</small>
              <br />Amount of the payment before conversion
              <br /><small> Example: 100 </small>
            </p>
          </div>
       </details>
      <p><strong><code>refunded</code></strong> <small>number</small>
        <br />The refund amount (multiple of 0.0001).
        <br /><small> Example: 111111 </small>
      </p>
      <p><strong><code>captured</code></strong> <small>number</small>
        <br />The captured amount (multiple of 0.0001).
        <br /><small> Example: 111111 </small>
      </p>
    </div>
  </details>

  <details class="yuno">
    <summary>
      <strong><code>checkout</code></strong> <small>object</small>
      <br />
      <p>Specifies the checkout object. This object is not mandatory for back to back payments. Required when
        <code>WORKFLOW</code> is defined as <code>CHECKOUT</code> or is not sent. Not required for <code>DIRECT</code>
        payments.
    </summary>
    <div>
      <p><strong><code>session</code></strong> <small>string</small>
        <br />
        The checkout session has been created for the payment (MAX 64; MIN 36).
        <br /><small> Example: 757eefc7-e28c-4333-9a07-3b16e610745d </small>
      </p>
      <p><strong><code>sdk_action_required</code></strong> <small>boolean</small>
        <br /> Defines if the payment is asynchronous and requires additional steps based on a request to the SDK.
        <br /><small> Example: false </small>
      </p>
    </div>
  </details>



  <details class="yuno">
    <summary>
      <strong><code>payment_method</code></strong> <small>object</small>
      <br />
      <p>Specifies the payment_method object.</p>
    </summary>
    <div>
      <p><strong><code>vaulted_token</code></strong> <small>string</small>
        <br />The vaulted_token represents a securely stored payment_method associated with a previous transaction. When
        utilizing a vaulted_token for creating a payment, there is no need to send an additional token; it can be set as
        null (MAX: 64; MIN: 36).
        <br /><small> Example: 8604911d-5ds9-229e-8468-bd41abear14s </small>
      </p>

      <p><strong><code>type</code></strong> <small>enum</small>
        <br /> Payment method type. Mandatory for <code>DIRECT</code> or <code>REDIRECT</code> workflow.
        <br /><small> Possible enum values:</small>
        <br /><small> Possible enum values: check the <a href="payment-type-list">payment type reference</a>.</small>
      </p>

      <p><strong><code>vault_on_success</code></strong> <small>boolean</small>
        <br />Flag to enroll the card after a successful payment.
        <br /><small> Possible values: <code>True</code> or <code>False</code> </small>
      </p>

      <p><strong><code>token</code></strong> <small>string</small>
        <br />The one time use payment method token <b>provided by Yuno sdk</b>. If a payment is created using a token,
        it is not necessary to send a vaulted_token as well, it can be defined as null. Not necessary for back to back
        payments (MAX: 64; MIN: 36).
        <br /><small> Example: 5104911d-5df9-229e-8468-bd41abea1a4s </small>
      </p>

      <details class="yuno">
        <summary><strong><code>detail</code></strong> <small>object</small>
          <br />
          <p>Specifies the payment method detail object, which provides details of the different transaction category
            types that are part of the payment method object.</p>
        </summary>
        <div>
          <details class="yuno">
            <summary><strong><code>card</code></strong> <small>object</small>
              <br />
              <p>Specifies the details of the payment method when using a card.</p>
            </summary>
            <div>
              <p><strong><code>verify</code></strong> <small>boolean</small>
                <br /> Using amount = 0 and verify = true, you can verify the user's card without authorizing a real
                amount.
                <br /><small> Possible values: <code>True</code> or <code>False</code> </small>
              </p>
              <p><strong><code>capture</code></strong> <small>boolean</small>
                <br />Decides whether to authorize the payment or capture it. Authorizing a card payment allows you to
                reserve funds in a customer's bank account.
                <br /><small> Possible values: <code>True</code> or <code>False</code> </small>
              </p>
              <p><strong><code>installments</code></strong> <small>integer</small>
                <br />The card installments (MAX 50; MIN 1).
                <br /><small> Example: 3 </small>
              </p>
              <p><strong><code>first_installments_deferral</code></strong> <small>integer</small>
                <br />Number of months to wait to debit the first installment.
                <br /><small> Example: 1 </small>
              </p>
              <p><strong><code>installments_type</code></strong> <small>string</small>
                <br />Defines the type of installments.
                <br /><small> Example: string </small>
              </p>
              <p><strong><code>installments_amount</code></strong> <small>integer</small>
                <br />The installment amount includes interests associated with the installment and the information is
                defined by the provider.
                <br /><small> Example: 3 </small>
              </p>
              <p><strong><code>soft_descriptor</code></strong> <small>string</small>
                <br />The descriptor passed per transaction to out platform. It will be presented on the customer's
                physical bank statement (MAX 15; MIN 0).
                <br /><small> Example: COMPANY1 </small>
              </p>
              <p><strong><code>authorization_code</code></strong> <small>string</small>
                <br />The acquirer's response code.
                <br /><small> Example: 742A64 </small>
              </p>
              <p><strong><code>retrieval_reference_number</code></strong> <small>string</small>
                <br />The unique identifier assigned by an acquirer to an authorization. In case of Brazil, you'll receive the nsu. 
                <br /><small> Example: 200000000012 </small>
              </p>
              <p><strong><code>voucher</code></strong> <small>string</small>
                <br />The unique identifier of the payment receipt assigned by the issuing bank for a card transaction.
                This field is empty if the gateway does not provide information about the transaction (MAX 255; MIN 3).
                <br /><small> Example: 43564 </small>
              </p>
              <details class="yuno">
                <summary><strong><code>card_data</code></strong> <small>object</small>
                  <br />
                  <p>Specifies the details of the card.</p>
                </summary>
                <div>
                  <!-- <p><strong><code>number</code></strong> <small>string</small>
                    <br /> Card's number without any separators (MAX 19; MIN 8) only available for PCI certified
                    merchants.
                    <br /><small> Example: 4507990000000010 </small>
                  </p>
                  <p><strong><code>security_code</code></strong> <small>integer</small>
                    <br />Card's security code (MAX 4; MIN 3) only available for PCI certified merchants.
                    <br /><small> Example: 123 </small>
                  </p> -->
                  <p><strong><code>holder_name</code></strong> <small>string</small>
                    <br />Card holder's full name as it appears on the card (MAX 26; MIN 3) only available for PCI
                    certified merchants.
                    <br /><small> Example: Fannie Weissnat </small>
                  </p>
                  <p><strong><code>country_code</code></strong> <small>string</small>
                    <br />User card country code (MAX 2; MIN 2).
                    <br /><small> Example: US </small>
                  </p>
                  <p><strong><code>expiration_month</code></strong> <small>integer</small>
                    <br />Card's expiration month (MM) (MAX 2; MIN 2).
                    <br /><small> Example: 03 </small>
                  </p>
                  <p><strong><code>expiration_year</code></strong> <small>integer</small>
                    <br />Card's expiration year (YYYY) (MAX 4; MIN 2).
                    <br /><small> Example: 2030 </small>
                  </p>
                  <p><strong><code>iin</code></strong> <small>string</small>
                    <br />The issuer identification number (IIN) refers to the first few digits of the payment card
                    number issued by a financial institution (MAX 8; MIN 6).
                    <br /><small> Example: 41961111 </small>
                  </p>
                  <p><strong><code>lfd</code></strong> <small>string</small>
                    <br />The last four digits of the card (MAX 4; MIN 4).
                    <br /><small> Example: 0010 </small>
                  </p>
                  <p><strong><code>number_length</code></strong> <small>integer</small>
                    <br />The length of the card's number (MAX 19; MIN 8).
                    <br /><small> Example: 41961111 </small>
                  </p>
                  <p><strong><code>security_code_length</code></strong> <small>integer</small>
                    <br />The length of the card's security code (MAX 1; MIN 1).
                    <br /><small> Example: 3 </small>
                  </p> 
                  <p><strong><code>brand</code></strong> <small>string</small>
                    <br />The card's brand information (MAX 255; MIN 3).
                    <br /><small> Example: VISA </small>
                  </p>
                  <p><strong><code>issuer_name</code></strong> <small>string</small>
                    <br />The card's issuer (MAX 255; MIN 3).
                    <br /><small> Example: Banco Galicia </small>
                  </p>
                  <p><strong><code>issuer_code</code></strong> <small>integer</small>
                    <br />The card's issuer identification code (MAX 255; MIN 3).
                    <!-- <br /><small> Example: Banco Galicia </small> -->
                    <!-- UNFINISHED -->
                  </p>
                  <p><strong><code>category</code></strong> <small>string</small>
                    <br />The category of the card's issuer (MAX 255; MIN 3).
                    <br /><small> Example: Gold </small>
                  </p>
                  <p><strong><code>type</code></strong> <small>string</small>
                    <br />The type of the card's issuer (MAX 255; MIN 3).
                    <br /><small> Example: CREDIT, DEBIT, or CHARGE_CARD </small>
                  </p>
 <p><strong><code>fingerprint</code></strong> <small>string</small>
                    <br />When a customer enrolls a credit card multiple times related to one or many Yuno accounts, multiple vaulted_tokens will be generated, but the fingerprint lets you identify when the same card is used for the customer (MAX 255; MIN 3).
                    <br /><small> Example: 55a7fe38-cdc3-45dc-8c5f-820751799c76 </small>
                  </p>

                </div>
              </details>
              <details class="yuno">
                <summary><strong><code>three_d_secure</code></strong> <small>object</small>
                  <br />
                  <p>Specifies the details of the 3DS Transaction.</p>
                </summary>
                <div>
                  <p><strong><code>three_d_secure_setup_id</code></strong> <small>string</small>
                    <br />Setup ID obteined for the 3DS Direct flow.
                    <br /><small> Example: 24127d61-b852-42fb-acd4-1ee661645376 </small>
                  </p>
                  <p><strong><code>version</code></strong> <small>enum</small>
                    <br />Refers to the protocol version of the EMV 3-D Secure specification used. 1.0, 2.0, 2.1.0,
                    2.2.0, 2.2.1.
                    <br /><small> Example: 2.2.1 </small>
                  </p>
                  <p><strong><code>electronic_commerce_indicator</code></strong> <small>string</small>
                    <br />This field must be completed with the result of the  <a href="eci-indicators-list">ECI</a> field provided by the 3d Secure
                    service. The Electronic Commerce Indicator (ECI) informs the card issuer if the transaction was
                    protected by a security protocol like VbV or MCSC. It is mandated by Visa and MasterCard that all
                    3-D Secure transactions have this value populated in the authorization request (MAX: 2, MIN: 0).
                    <br /><small> Example: 05 </small>
                  </p>
                  <p><strong><code>cryptogram</code></strong> <small>string</small>
                    <br />This field must be completed with the result of the cryptogram field provided by the 3DSecure
                    service. In Visa transactions, it represents the Cardholder Authentication Verification Value
                    (CAVV), a cryptographic value generated by the Issuer as evidence of payment authentication during
                    online purchase to qualify for chargeback protection. MasterCard transactions have a similar value
                    called Accountholder Authentication Value (AAV) or the Universal Cardholder Authentication Field
                    (UCAF). When submitting a transaction for authorization, the merchant must include the CAVV or
                    AAV/UCAF to demonstrate that the cardholder has been authenticated. It is typically base64-encoded.
                    (MAX: 40, MIN: 0).
                    <br /><small> Example: BA0BB1Z3N5Q4kjkBU3c3ELGUsJY = </small>
                  </p>
                  <p><strong><code>transaction_id</code></strong> <small>string</small>
                    <br />For 3DS v1:
                    This is the Unique Transaction Identifier. It is automatically generated by the MPI. It is typically
                    28 bytes in length and base64-encoded. Is commonly referred to as XID (MAX: 40, MIN: 0).
                    For 3DS v2:
                    Universally unique transaction identifier assigned by the DS to identify a single transaction. (MAX:
                    36, MIN:36).
                    <br /><small> Ex for V1: “TjY0MjAxRjA4MD4987DUzMzYyNjU=”
                      Ex for V2: “c4e59ceb-a382-4d6a-bc87-385d591fa09d” </small>
                  </p>
                  <p><strong><code>directory_server_transaction_id</code></strong> <small>string</small>
                    <br />Transaction ID generated by the Mastercard directory server during authentication (MAX 255;
                    MIN 3).
                    <br /><small> Example: f38e6948-5388-41a6-bca4-b49723c19437 </small>
                  </p>
 
                </div>
              </details>
              <details class="yuno">
                <summary><strong><code>network_token</code></strong> <small>object</small>
                  <br />
                  <p>Information about the network token used for the transaction. If applicable.</p>
                </summary>
                <div>
                  <p><strong><code>network</code></strong> <small>enum</small>
                    <br />The provider associated to the token provided. VISA, MASTERCARD, AMERICAN_EXPRESS.
                    <br /><small> Example: MASTERCARD </small>
                  </p>
                  <p><strong><code>status</code></strong> <small>enum</small>
                    <br />Status of the token for the payment method. CREATED, ACTIVE, SUSPENDED, CANCELED.
                    <br /><small> Example: ACTIVE </small>
                  </p>
                  <p><strong><code>par</code></strong> <small>string</small>
                    <br />Payment account reference.
                    <br /><small> Example: MCC123456789012 </small>
                  </p>
                  <details class="yuno">
                    <summary><strong><code>token_data</code></strong> <small>object</small>
                      <br />
                      <p>Token details.</p>
                    </summary>
                    <div>
                      <p><strong><code>number</code></strong> <small>number</small>
                        <br />[Mandatory] - Token’s number without any separators (MAX 19; MIN 8) only available for PCI certified merchants.
                        <br /><small> Example: 450799000001234 </small>
                      </p>
                      <p><strong><code>holder_name</code></strong> <small>string</small>
                        <br />Cardholder’s full name as it appears on the Token (MAX 26; MIN 3).
                        <br /><small> Example: John Doe </small>
                      </p>
                      <p><strong><code>iin</code></strong> <small>number</small>
                        <br />The Institution identification number (IIN) refers to the first few digits of a network token number issued by a financial institution (MAX 8; MIN 6).
                        <br /><small> Example: 45079900 </small>
                      </p>
                      <p><strong><code>lfd</code></strong> <small>number</small>
                        <br />Last four digits of the network token (MAX 4; MIN 4).
                        <br /><small> Example: 1234 </small>
                      </p>
                      <p><strong><code>expiration_month</code></strong> <small>number</small>
                        <br />Network Token’s expiration month (MM) (MAX 2; MIN 2).
                        <br /><small> Example: 12 </small>
                      </p>
                      <p><strong><code>expiration_year</code></strong> <small>number</small>
                        <br />Network Token’s expiration year (YYYY)  (MAX 4; MIN 2).
                        <br /><small> Example: 2027 </small>
                      </p>
                      <p><strong><code>cryptogram</code></strong> <small>string</small>
                        <br />[Mandatory] - The unique cryptogram generated by the issuer for the network token in use in the transaction.
                      </p>
                      <p><strong><code>electronic_commerce_indicator</code></strong> <small>string</small>
                        <br />[Only required for certain providers] - In case the token has been authenticated by Mastercard the field should be set to 02. For Visa or not authenticated tokens, is not necessary to send the field.
                      </p>
                      <p><strong><code>token_requestor_id</code></strong> <small>string</small>
                        <br />[Only required for certain providers] - Token requestor ID of the merchant
                      </p>
                    </div>
                    <details class="yuno">
                    <summary><strong><code>response</code></strong> <small>object</small>
                      <br />
                      <p>Network transaction details.</p>
                    </summary>
                    <div>
                      <p><strong><code>code</code></strong> <small>number</small>
                        <br />Response code from the service provider.
                        <br /><small> Example: succeeded </small>
                      </p>
                      <p><strong><code>message</code></strong> <small>number</small>
                        <br />Response code from the service provider.
                        <br /><small> Example: Transaction Succeeded </small>
                      </p>
                    </div>
                  </details>
                  </details>
                </div>
              </details>
              <details class="yuno">
                <summary><strong><code>stored_credentials</code></strong> <small>object</small>
                  <br />
                  <p>Indicates the processing type of the transaction.</p>
                </summary>
                <div>
                  <p><strong><code>reason</code></strong> <small>enum</small>
                    <br />Indicates the processing type of the transaction.Enum:CARD_ON_FILE, SUBSCRIPTION, UNSCHEDULED_CARD_ON_FILE
                    <br /><small> Example: SUBSCRIPTION </small>
                  </p>
                  <p><strong><code>usage</code></strong> <small>enum</small>
                    <br />This field lets you indicate if this is the first time the vaulted_token/network_token is used for a payment or if it has already been used for a previous payment. Enum: FIRST, USED
                    <br /><small> Example: USED </small>
                  </p>
                  <p><strong><code>subscription_agreement_id</code></strong> <small>string</small>
                    <br />This field lets you indicate the identification of the agreement  with the customer for a subscription. Mainly for MX (MAX 255; MIN 3).
                    <br /><small> Example: AA0001 </small>
                  </p>
                  <p><strong><code>network_Transaction_id</code></strong> <small>string</small>
                    <br />Unique identifier assigned to a transaction by the card network. It is used to track and reference specific transactions, particularly in recurring payment scenarios, ensuring consistency and traceability across the payment lifecycle (MAX 255; MIN 3).
                    <br /><small> Example: 583103536844189 </small>
                  </p>
                </div>
              </details>
            </div>
          </details>
          <details class="yuno">
            <summary><strong><code>bnpl</code></strong> <small>object</small>
              <br />
              <p>Specifies the details of the payment method when using Buy Now Pay Later (BNPL).</p>
            </summary>
            <div>
              <p><strong><code>installments</code></strong> <small>integer</small>
                <br />The loan installments (MAX 50; MIN 1).
                <br /><small> Example: 10 </small>
              </p>
              <p><strong><code>provider_image</code></strong> <small>string</small>
                <br />The provider's URL (MAX 255; MIN 3).
                <br /><small> Example: https://www.company.com/ </small>
              </p>
              <p><strong><code>redirect_url</code></strong> <small>string</small>
                <br />The URL with the full version of the ticket in case you want to redirect your customer (MAX 255;
                MIN
                3).
                <br /><small> Example: https://www.company.com/ticket_1231324 </small>
              </p>
              <p><strong><code>expires_at</code></strong> <small>timestamp</small>
                <br />Payment methods expiration date. "yyyy-MM-dd HH:mm:ss.SSSz"
                <br /><small> Example: 2026-05-09T20:46:54.786342Z </small>
              </p>
              <details class="yuno">
                <summary><strong><code>customer_data</code></strong> <small>object</small>
                  <br />
                  <p>Specifies the details of the customer.</p>
                </summary>
                <div>
                  <p><strong><code>name</code></strong> <small>string</small>
                    <br />The customer's legal name (MAX 32, MIN 8).
                    <br /><small> Example: Legal name</small>
                  </p>
                  <p><strong><code>username</code></strong> <small>string</small>
                    <br />Customer's username in the provider platform (MAX 32, MIN 8).
                    <br /><small> Example: Legal_name_01 </small>
                  </p>
                  <p><strong><code>tax_id_type</code></strong> <small>string</small>
                    <br />The customer's tax identifier (MAX 32, MIN 8).
                    <br /><small> Example: CUIT </small>
                  </p>
                  <p><strong><code>tax_id</code></strong> <small>string</small>
                    <br />The customer's tax identifier number (MAX 32, MIN 8).
                    <br /><small> Example: 20-34566123-7 </small>
                  </p>
                  <p><strong><code>type</code></strong> <small>string</small>
                    <br />The credit's type (MAX 255; MIN 3).
                    <br /><small> Example: PERSONAL/BUSINESS </small>
                  </p>
                  <p><strong><code>area</code></strong> <small>string</small>
                    <br />The customer's industry (MAX 255; MIN 3).
                    <br /><small> Example: OTHERS </small>
                  </p>
                  <p><strong><code>role</code></strong> <small>string</small>
                    <br />The customer's role in the company (MAX 255; MIN 3).
                    <br /><small> Example: OWNER </small>
                  </p>
                </div>
              </details>
            </div>
          </details>
          <details class="yuno">
            <summary><strong><code>bank_transfer</code></strong> <small>object</small>
              <br />
              <p>Specifies the details of the payment method when using bank transfer.</p>
            </summary>
            <div>
              <p><strong><code>provider_image</code></strong> <small>string</small>
                <br />The provider's URL (MAX 255; MIN 3).
                <br /><small> Example: https://www.company.com/ </small>
              </p>
              <p><strong><code>account_type</code></strong> <small>string</small>
                <br />Type of the bank account (MAX 255; MIN 3).
                <br /><small> Example: CHECKINGS/SAVINGS </small>
              </p>
              <p><strong><code>bank_name</code></strong> <small>string</small>
                <br />Name of the bank associated with the account (MAX 255; MIN 3).
                <br /><small> Example: Banco Galicia </small>
              </p>
              <p><strong><code>beneficiary_name</code></strong> <small>string</small>
                <br />The name of the account holder (MAX 255; MIN 3).
                <br /><small> Example: John Doe </small>
              </p>
              <p><strong><code>bank_account</code></strong> <small>string</small>
                <br />The number of the bank account (MAX 255; MIN 3).
                <br /><small> Example: 54653211313333 </small>
              </p>
              <p><strong><code>bank_account_2</code></strong> <small>string</small>
                <br />The secondary number of the bank account (MAX 255; MIN 3).
                <br /><small> Example: 78900000000123 </small>
              </p>
              <p><strong><code>beneficiary_document_type</code></strong> <small>string</small>
                <br />Document type of the account holder (MAX 255; MIN 3).
                <br /><small> Possible values: Check the <a href="country-reference">
                    Country reference</a>. Example: DNI </small>
              </p>
              <p><strong><code>beneficiary_document</code></strong> <small>string</small>
                <br />Document number of the account holder (MAX 255; MIN 3).
                <br /><small> Example: 54666897 </small>
              </p>
              <p><strong><code>reference</code></strong> <small>string</small>
                <br />Reference code for the user (MAX 255; MIN 3).
                <br /><small> Example: AA01234-BC </small>
              </p>
              <p><strong><code>retrieval_reference_number</code></strong> <small>string</small>
                <br />The unique identifier assigned by an acquirer to an authorization.In case of Brazil, you'll receive the nsu.
                <br /><small> Example: 200000000012 </small>
              </p>
              <p><strong><code>payment_instruction</code></strong> <small>string</small>
                <br />Payments instructions related to the payment (MAX 255; MIN 3).
                <br /><small> Example: Go to your bank account and transfer the amount using the reference detailed
                  below
                </small>
              </p>
              <p><strong><code>redirect_url</code></strong> <small>string</small>
                <br />The URL with the full version of the ticket in case you want to redirect your customer (MAX 255;
                MIN
                3).
                <br /><small> Example: https://www.company.com/ticket_1231324 </small>
              </p>
              <p><strong><code>expires_at</code></strong> <small>timestamp</small>
                <br />Payment methods expiration date. "yyyy-MM-dd HH:mm:ss.SSSz"
                <br /><small> Example: 2026-05-09T20:46:54.786342Z </small>
              </p>
          </details>
          <details class="yuno">
            <summary><strong><code>wallet</code></strong> <small>object</small>
              <br />
              <p>Specifies the details of the payment method when using a wallet.</p>
            </summary>
            <div>
              <p><strong><code>verify</code></strong> <small>boolean</small>
                <br />Using amount = 0 and verify = true, you can verify the user's card without authorizing a real
                amount.
                <br /><small> Possible values: <code>True</code> or <code>False</code> </small>
              </p>
     <p><strong><code>cryptogram</code></strong> <small>string</small>
                <br />Cryptogram for direct integrations with card wallets (MAX 526; MIN 3).
                <br /><small> </small>
              </p>
              <p><strong><code>expires_at</code></strong> <small>timestamp</small>
                <br />Payment methods expiration date. "yyyy-MM-dd HH:mm:ss.SSSz"
                <br /><small> Example: 2026-05-09T20:46:54.786342Z </small>
              </p>
         <p><strong><code>capture</code></strong> <small>boolean</small>
                <br />Decides whether to authorize the payment or capture it. Authorizing a card payment allows you to
                reserve funds in a customer's bank account.
                <br /><small> Possible values: <code>True</code> or <code>False</code> </small>
              </p>
              <p><strong><code>installments</code></strong> <small>integer</small>
                <br />The card installments (MAX 50; MIN 1).
                <br /><small> Example: 3 </small>
              </p>
              <p><strong><code>payment_method_id</code></strong> <small>string</small>
                <br />The user's payment method used in their wallet.
                <br /><small> Example: credit_card </small>
              </p>
              <p><strong><code>detail</code></strong> <small>string</small>
                <br />The payment method's detail used in their wallet.
                <br /><small> Example: visa </small>
              </p>
                            <p><strong><code>money_release_date</code></strong> <small>date</small>
                <br />Date in which the money from the provider will be available to use.
                <br /><small> Example: 2022-05-09T00:00:00.000000Z </small>
              </p>
              <p><strong><code>sponsor_id</code></strong> <small>string</small>
                <br />Partner's provider account (MAX 255; MIN 3).
                <br /><small> Example: 4562103 </small>
              </p>
              <p><strong><code>authorization_code</code></strong> <small>string</small>
                <br />Acquire's response code.
                <br /><small> Example: 742A64 </small>
              </p>
              <details class="yuno">
                <summary><strong><code>customer_data</code></strong> <small>object</small>
                  <br />
                  <p>Specifies the details of the customer.</p>
                </summary>
                <div>
                  <p><strong><code>email</code></strong> <small>string</small>
                    <br />The customer's email (MAX 255; MIN 3).
                    <br /><small> Example: john.doe@email.com </small>
                  </p>
                  <p><strong><code>first_name</code></strong> <small>string</small>
                    <br />The customer's first name (MAX 32, MIN 8).
                    <br /><small> Example: John </small>
                  </p>
                  <p><strong><code>last_name</code></strong> <small>string</small>
                    <br />The customer's last name (MAX 32, MIN 8).
                    <br /><small> Example: Doe </small>
                  </p>
                  <p><strong><code>username</code></strong> <small>string</small>
                    <br />The customer's username in the platform (MAX 32, MIN 8).
                    <br /><small> Example: John_Doe_01 </small>
                  </p>
                  <p><strong><code>identification_type</code></strong> <small>string</small>
                    <br />The customer's document type (MAX 32, MIN 8).
                    <br /><small> Check the <a href="country-reference">
                        Country reference</a>. Example: DNI </small>
                  </p>
                  <p><strong><code>identification_number</code></strong> <small>string</small>
                    <br />The customer's identification number (MAX 32, MIN 8).
                    <br /><small> Example: 34566123 </small>
                  </p>
                </div>
              </details>

              <details class="yuno">
                <summary><strong><code>fee_details</code></strong> <small>object</small>
                  <br />
                  <p>Specifies the details of the fees.</p>
                </summary>
                <div>
                  <p><strong><code>amount</code></strong> <small>float</small>
                    <br />Amount of the transaction (multiple of 0.0001).
                    <br /><small> Example: 40.5 </small>
                  </p>
                </div>
              </details>

              <details class="yuno">
                <summary><strong><code>card_data</code></strong> <small>object</small>
                  <br />
                  <p>Specifies the details of the card.</p>
                </summary>
                <div>
                  <p><strong><code>iin</code></strong> <small>integer</small>
                    <br />The issuer identification number (IIN) refers to the first few digits of the payment card
                    number issued by a financial institution (MAX 8; MIN 6).
                    <br /><small> Example: 45079900 </small>
                  </p>
                  <p><strong><code>lfd</code></strong> <small>integer</small>
                    <br />The last four digits of the card (MAX 4; MIN 4).
                    <br /><small> Example: 0010 </small>
                  </p>
                  <p><strong><code>number_length</code></strong> <small>integer</small>
                    <br />The length of the card's number (MAX 2; MIN 1).
                    <br /><small> Example: 16 </small>
                  </p>
                  <p><strong><code>security_code_length</code></strong> <small>integer</small>
                    <br />The length of the card's security code (MAX 1; MIN 1).
                    <br /><small> Example: 3 </small>
                  </p>
                  <p><strong><code>brand</code></strong> <small>string</small>
                    <br />The card's brand information (MAX 255; MIN 3).
                    <br /><small> Example: visa </small>
                  </p>
                  <p><strong><code>holder_name</code></strong> <small>string</small>
                    <br />Card holder's full name as it appears on the card (MAX 26; MIN 3) only available for PCI
                    certified merchants.
                    <br /><small> Example: JOHN DOE </small>
                  </p>
                </div>
            </div>
          </details>
          <details class="yuno">
            <summary><strong><code>ticket</code></strong> <small>object</small>
              <br />
              <p>Specifies the details of the payment method when using ticket.</p>
            </summary>
            <div>
              <p><strong><code>type</code></strong> <small>string</small>
                <br />The ticket's type.
                <br /><small> Example: number, barcode, custom, reference_code, qr </small>
              </p>
              <p><strong><code>benefit_type</code></strong> <small>enum</small>
                <br />User´s benefit type for ticket payment method. JUNAEB, PRIVATE
                <br /><small> Example: PRIVATE </small>
              </p>
              
              <p><strong><code>provider_number</code></strong> <small>integer</small>
                <br />The ticket's number.
                <br /><small> Example: 13141 </small>
              </p>
              <p><strong><code>provider_barcode</code></strong> <small>integer</small>
                <br />The ticket's barcode.
                <br /><small> Example: 456789009878765u7654 </small>
              </p>
              <p><strong><code>provider_logo</code></strong> <small>string</small>
                <br />The ticket's logo.
                <br /><small> Example: https://www.company.com/logo </small>
              </p>
              <p><strong><code>provider_format</code></strong> <small>string</small>
                <br />The ticket's format.
                <br /><small> Example: barcode, custom </small>
              </p>
              <p><strong><code>payment_instruction</code></strong> <small>string</small>
                <br />Payments instructions related to the payment (MAX 255; MIN 3).
                <br /><small> Example: Go to your closest store and pay the total amount using the reference detailed below </small>
              </p>
              <!-- <p><strong><code>id</code></strong> <small>integer</small>
                <br />The ticket's id.
                <br /><small> Example: 09812 </small>
              </p> -->
              <p><strong><code>redirect_url</code></strong> <small>string</small>
                <br />The URL with the full version of the ticket.
                <br /><small> Example: https://www.company.com/ticket_1231324 </small>
              </p>
              <p><strong><code>expires_at</code></strong> <small>timestamp</small>
                <br />Payment methods expiration date. "yyyy-MM-dd HH:mm:ss.SSSz"
                <br /><small> Example: 2026-05-09T20:46:54.786342Z </small>
              </p>
          </details>
          <details class="yuno">
            <summary><strong><code>payment_link</code></strong> <small>object</small>
              <br />
              <p>Specifies the details of the payment method when using a payment link.</p>
            </summary>
            <div>
              <p><strong><code>verify</code></strong> <small>boolean</small>
                <br />Using amount = 0 and verify = true, you can verify the user's card without authorizing a real
                amount.
                <br /><small> Possible values: <code>True</code> or <code>False</code> </small>
              </p>
              <p><strong><code>capture</code></strong> <small>boolean</small>
                <br />Decides whether to authorize the payment or capture it. Authorizing a card payment allows you to
                reserve funds in a customer's bank account.
                <br /><small> Possible values: <code>True</code> or <code>False</code> </small>
              </p>
              <p><strong><code>expires_at</code></strong> <small>timestamp</small>
                <br />Payment methods expiration date. "yyyy-MM-dd HH:mm:ss.SSSz"
                <br /><small> Example: 2026-05-09T20:46:54.786342Z </small>
              </p>
              <p><strong><code>installments</code></strong> <small>integer</small>
                <br />The card installments (MAX 50; MIN 1).
                <br /><small> Example: 3 </small>
              </p>
              <p><strong><code>payment_method_id</code></strong> <small>string</small>
                <br />The user's payment method used in their wallet.
                <br /><small> Example: credit_card </small>
              </p>
              <p><strong><code>detail</code></strong> <small>string</small>
                <br />The payment method's detail used in their wallet.
                <br /><small> Example: visa </small>
              </p>
                            <p><strong><code>money_release_date</code></strong> <small>date</small>
                <br />Date in which the money from the provider will be available to use.
                <br /><small> Example: 2022-05-09T00:00:00.000000Z </small>
              </p>
              <p><strong><code>sponsor_id</code></strong> <small>string</small>
                <br />Partner's provider account (MAX 255; MIN 3).
                <br /><small> Example: 4562103 </small>
              </p>
              <p><strong><code>authorization_code</code></strong> <small>string</small>
                <br />Acquire's response code.
                <br /><small> Example: 742A64 </small>
              </p>
              <!-- <p><strong><code>redirect_url</code></strong> <small>string</small>
                <br />The URL with the full version of the payment.
                <br /><small> Example: https://www.company.com/payment_link_1231324 </small>
              </p>-->
              <details class="yuno">
                <summary><strong><code>customer_data</code></strong> <small>object</small>
                  <br />
                  <p>Specifies the details of the customer.</p>
                </summary>
                <div>
                  <p><strong><code>email</code></strong> <small>string</small>
                    <br />The customer's email (MAX 255; MIN 3).
                    <br /><small> Example: john.doe@email.com </small>
                  </p>
                  <p><strong><code>first_name</code></strong> <small>string</small>
                    <br />The customer's first name (MAX 32, MIN 8).
                    <br /><small> Example: John </small>
                  </p>
                  <p><strong><code>last_name</code></strong> <small>string</small>
                    <br />The customer's last name (MAX 32, MIN 8).
                    <br /><small> Example: Doe </small>
                  </p>
                  <p><strong><code>username</code></strong> <small>string</small>
                    <br />The customer's username in the platform (MAX 32, MIN 8).
                    <br /><small> Example: John_Doe_01 </small>
                  </p>
                  <p><strong><code>identification_type</code></strong> <small>string</small>
                    <br />The customer's document type (MAX 32, MIN 8).
                    <br /><small> Possible values: Check the <a href="country-reference">
                        Country reference</a>. Example: DNI </small>
                  </p>
                  <p><strong><code>identification_number</code></strong> <small>string</small>
                    <br />The customer's identification number (MAX 32, MIN 8).
                    <br /><small> Example: 34566123 </small>
                  </p>

                </div>
              </details>

              <details class="yuno">
                <summary><strong><code>fee_details</code></strong> <small>object</small>
                  <br />
                  <p>Specifies the details of the fees.</p>
                </summary>
                <div>
                  <p><strong><code>amount</code></strong> <small>float</small>
                    <br />Amount of the transaction (multiple of 0.0001).
                    <br /><small> Example: 40.5 </small>
                  </p>
                </div>
              </details>

              <details class="yuno">
                <summary><strong><code>card_data</code></strong> <small>object</small>
                  <br />
                  <p>Specifies the details of the card.</p>
                </summary>
                <div>
                  <p><strong><code>iin</code></strong> <small>integer</small>
                    <br />The issuer identification number (IIN) refers to the first few digits of the payment card
                    number issued by a financial institution (MAX 8; MIN 6).
                    <br /><small> Example: 45079900 </small>
                  </p>
                  <p><strong><code>lfd</code></strong> <small>integer</small>
                    <br />The last four digits of the card (MAX 4; MIN 4).
                    <br /><small> Example: 0010 </small>
                  </p>
                  <p><strong><code>number_length</code></strong> <small>integer</small>
                    <br />The length of the card's number (MAX 2; MIN 1).
                    <br /><small> Example: 16 </small>
                  </p>
                  <p><strong><code>security_code_length</code></strong> <small>integer</small>
                    <br />The length of the card's security code (MAX 1; MIN 1).
                    <br /><small> Example: 3 </small>
                  </p>
                  <p><strong><code>brand</code></strong> <small>string</small>
                    <br />The card's brand information (MAX 255; MIN 3).
                    <br /><small> Example: visa </small>
                  </p>
                  <p><strong><code>holder_name</code></strong> <small>string</small>
                    <br />Card holder's full name as it appears on the card (MAX 26; MIN 3) only available for PCI
                    certified merchants.
                    <br /><small> Example: John Doe </small>
                  </p>
                  <p><strong><code>expiration_month</code></strong> <small>integer</small>
                    <br />Card's expiration month (MM) (MAX 2; MIN 2).
                    <br /><small> Example: 03 </small>
                  </p>
                  <p><strong><code>expiration_year</code></strong> <small>integer</small>
                    <br />Card's expiration year (YYYY) (MAX 4; MIN 2).
                    <br /><small> Example: 30 </small>
                  </p>
                </div>
              </details>
            </div>
          </details>
        </div>
      </details>
    </div>
  </details>

  <details class="yuno">
    <summary>
      <strong><code>customer_payer</code></strong> <small>object</small>
      <br />
      <p>Specifies customer object for payments.</p>
    </summary>
    <div>
      <p><strong><code>id</code></strong> <small>string</small>
        <br />The unique identifier of the customer (MAX 64; MIN 36). Specifies the checkout object. This object is not
        mandatory for back to back payments. Required when <code>WORKFLOW</code> is defined as <code>CHECKOUT</code> or
        is not sent.
        <br /><small> Example: faa89e18-5a11-11ed-9b6a-0242ac120002 </small>
      </p>

      <p><strong><code>merchant_customer_id</code></strong> <small>string</small>
        <br />The unique identifier of the customer in the external merchant (MAX 255; MIN 3).
        <br /><small> Example: 4ce6f7e1-bf2e-4e7f-bc1b-84b26082a1d3 </small>
      </p>

    	<p><strong><code>merchant_customer_created_at</code></strong> <small>timestamp</small>
         <br />Customer´s registration date on the merchants platform (ISO 8601 MAX 27; MIN 27).
         <br /><small> Example: 2022-05-09T20:46:54.786342Z </small>
   	  </p>


      <p><strong><code>first_name</code></strong> <small>string</small>
        <br />The customer's first name (MAX 255; MIN 1).
        <br /><small> Example: John </small>
      </p>

      <p><strong><code>last_name</code></strong> <small>string</small>
        <br />The customer's last name (MAX 255; MIN 1).
        <br /><small> Example: Doe </small>
      </p>

      <p><strong><code>gender</code></strong> <small>enum</small>
        <br />The customer's gender (MAX 1; MIN 1; (M=Male/F=Female/NA=Not applicable/NK=Not Known)).
        <br /><small> Possible enum values: <code>M</code>, <code>F</code>, <code>NA</code>, or <code>NK</code>.
        </small>
      </p>

      <p><strong><code>date_of_birth</code></strong> <small>string</small>
        <br />The customer's date of birth in the YYYY-MM-DD format (Length: 10).
        <br /><small> Example: 1990-02-28 </small>
      </p>

      <p><strong><code>email</code></strong> <small>string</small>
        <br />The customer's e-mail (MAX 255; MIN 3).
        <br /><small> Example: john.doe@email.com </small>
      </p>

      <p><strong><code>nationality</code></strong> <small>enum</small>
        <br />The customer's nationality (MAX 2; MIN 2; <a href="country-reference">ISO 3166-1</a>).
        <br /><small> Possible enum values: Check the <a href="country-reference">Country reference</a>.
        </small>
      </p>

      <p><strong><code>device_fingerprint</code></strong> <small>string</small>
        <br />The customer's device fingerprint (MAX 4000; MIN 1). For integrations using Yuno checkout the value is
        obtained automatically, do not send this field.
        <br /><small> Example: hi88287gbd8d7d782ge..... </small>
      </p>

      <details class="yuno">
        <summary>
          <strong><code>device_fingerprints</code></strong> <small>array of object</small>
          <br />
          <p>In case you are using a DIRECT integration and want to support more than one fraud provider in the payment flow, you can use this object to specify the necessary information. For integrations using Yuno checkout the value is obtained automatically, do not send this field.</p>
        </summary>
        <div>
          <p><strong><code>provider_id</code></strong> <small>enum</small>
            <br />The fraud screening provider id
            <br /><small> Example: RISKIFIED </small>
          </p>
          </p>
          <p><strong><code>id</code></strong> <small>string</small>
            <br />The device fingerprint associated to the provider
            <br /><small> Example: hi88287gbd8d7d782ge..... </small>
          </p>
        </div>
      </details>

      <p><strong><code>ip_address</code></strong> <small>string</small>
        <br />The customer's IP address (MAX 45; MIN 7).
        <br /><small> Example: 192.168.123.167 </small>
      </p>

      <details class="yuno">
        <summary>
          <strong><code>browser_info</code></strong> <small>object</small>
          <br />
          <p>Specifies the browser_info object.</p>
        </summary>
        <div>
          <p><strong><code>accept_header</code></strong> <small>boolean</small>
            <br />The accept header value of the customer's browser.
            <br /><small> Possible values: <code>True</code> or <code>False</code> </small>
          </p>
          <p><strong><code>accept_browser</code></strong> <small>string</small>
            <br />The accept browser value of the customer's browser
            <br /><small> Accepted values: <code>"True"</code> or <code>"False"</code> </small>
          </p>
          <p><strong><code>accept_content</code></strong> <small>string</small>
            <br />The accept content value of the customer's browser
            <br /><small> Accepted values: <code>"True"</code> or <code>"False"</code> </small>
          </p>
          <p><strong><code>platform</code></strong> <small>enum</small>
            <br />The platform from which the customer is making the payment.
            <br /><small>Possible enum values: <code>WEB</code>, <code>IOS</code>, <code>ANDROID</code></small>
          </p>
          <p><strong><code>color_depth</code></strong> <small>float</small>
            <br />The color depth of the customer's browser in bits per pixel. This should be obtained by using the
            browser's screen.colorDepth property. Accepted values: 1, 4, 8, 15, 16, 24, 30, 32 or 48 bit color depth
            (MAX
            5; MIN 1).
            <br /><small> Example: 15 </small>
          </p>
          <p><strong><code>javascript_enabled</code></strong> <small>boolean</small>
            <br />Indicates if Javascript is enabled or not in the device.
            <br /><small> Possible values: <code>True</code> or <code>False</code> </small>
          </p>
           <p><strong><code>java_enabled</code></strong> <small>boolean</small>
            <br />Indicates if Java is enabled or not in the device.
            <br /><small> Possible values: <code>True</code> or <code>False</code> </small>
          </p>
           <p><strong><code>browser_time_difference</code></strong> <small>string</small>
            <br />Indicates the brosner time difference
            <br /><small> Example: -3:00 </small>
          </p>
          <p><strong><code>language</code></strong> <small>string</small>
            <br />The navigator.language value of the customer's browser (as defined in IETF BCP 47) (MAX 5; MIN 1).
            <br /><small> Example: es-ES </small>
          </p>
          <p><strong><code>screen_height</code></strong> <small>string</small>
            <br />The total height of the customer's device screen in pixels (MAX 255; MIN 3).
            <br /><small> Example: 2048 </small>
          </p>
          <p><strong><code>screen_width</code></strong> <small>string</small>
            <br />The total width of the customer's device screen in pixels (MAX 255; MIN 3).
            <br /><small> Example: 1152 </small>
          </p>
          <p><strong><code>user_agent</code></strong> <small>string</small>
            <br />The user agent value of the customer's browser (MAX 255; MIN 3).
            <br /><small> Example: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like
              Gecko)
              Version/9.0.2 Safari/601.3.9 </small>
          </p>
        </div>
      </details>

      <details class="yuno">
        <summary>
          <strong><code>document</code></strong> <small>object</small>
          <br />
          <p>Specifies the customer's document object, including its number and type.</p>
        </summary>
        <div>
          <p><strong><code>document_number</code></strong> <small>string</small>
            <br />The customer's document number (MAX 40; MIN 3).
            <br /><small> Example: 1093333333 </small>
          </p>
          </p>
          <p><strong><code>document_type</code></strong> <small>enum</small>
            <br />The customer's document type (MAX 6, MIN 2).
            <br /><small> Possible enum values: Check the <a href="country-reference">
                Country reference</a>. </small>
          </p>
        </div>
      </details>

      <details class="yuno">
        <summary>
          <strong><code>phone</code></strong> <small>object</small>
          <br />
          <p>Specifies the customer's phone object, including number and code.</p>
        </summary>
        <div>
          <p><strong><code>number</code></strong> <small>string</small>
            <br />The customer's phone number (MAX 40; MIN 3).
            <br /><small> Example: 11992149494 </small>
          </p>
          </p>
          <p><strong><code>country_code</code></strong> <small>string</small>
            <br />The country calling code of the customer's phone (MAX 3; MIN 1).
            <br /><small> Possible values: Check the <a href="country-reference">
                Country reference</a>. </small>
          </p>
        </div>
      </details>

      <details class="yuno">
        <summary><strong><code>billing_address</code></strong> <small>object</small>
          <br />
          <p>Specifies the customer's billing address object.</p>
        </summary>
        <div>
          <p><strong><code>address_line_1</code></strong> <small>string</small>
            <br />The primary billing address line of the customer (MAX 255; MIN 3).
            <br /><small> Example: Calle 34 # 56 - 78 </small>
          </p>
          <p><strong><code>address_line_2</code></strong> <small>string</small>
            <br />The secondary billing address line of the customer (MAX 255; MIN 3).
            <br /><small> Example: Apartamento 502, Torre I </small>
          </p>
          <p><strong><code>city</code></strong> <small>string</small>
            <br />The city considered for the billing address (MAX 255; MIN 3).
            <br /><small> Example: Bogotá </small>
          </p>
          <p><strong><code>country</code></strong> <small>enum</small>
            <br />The country considered for the billing address (MAX 2; MIN 2; <a href="country-reference">ISO
              3166-1</a>).
            <br /><small> Possible enum values: Check the <a href="country-reference">Country reference</a>.</small>
          </p>
          <p><strong><code>state</code></strong> <small>string</small>
            <br />The state considered for the billing address (MAX 255; MIN 3).
            <br /><small> Example: Cundinamarca </small>
          </p>
          <p><strong><code>zip_code</code></strong> <small>string</small>
            <br />The zipcode considered for the billing address (MAX 11; MIN 4).
            <br /><small> Example: 111111 </small>
          </p>
          <p><strong><code>neighborhood</code></strong> <small>string</small>
            <br />The neighborhood of the address line of the customer(MAX 255; MIN 2).
            <br /><small> Example: Barrio 11 </small>
          </p>
        </div>
      </details>

      <details class="yuno">
        <summary><strong><code>shipping_address</code></strong> <small>object</small>
          <br />
          <p>Specifies the customer's shipping address object.</p>
        </summary>
        <div>
          <p><strong><code>address_line_1</code></strong> <small>string</small>
            <br />The primary shipping address line of the customer (MAX 255; MIN 3).
            <br /><small> Example: Calle 34 # 56 - 78 </small>
          </p>
          <p><strong><code>address_line_2</code></strong> <small>string</small>
            <br />The secondary shipping address line of the customer (MAX 255; MIN 3).
            <br /><small> Example: Apartamento 502, Torre I </small>
          </p>
          <p><strong><code>city</code></strong> <small>string</small>
            <br />The city considered for the shipping address (MAX 255; MIN 3).
            <br /><small> Example: Bogotá </small>
          </p>
          <p><strong><code>country</code></strong> <small>enum</small>
            <br />The country considered for the shipping address (MAX 2; MIN 2; <a href="country-reference">ISO
              3166-1</a>).
            <br /><small> Possible enum values: Check the <a href="country-reference">Country reference</a>.</small>
          </p>
          <p><strong><code>state</code></strong> <small>string</small>
            <br />The state considered for the shipping address (MAX 255; MIN 3).
            <br /><small> Example: Cundinamarca </small>
          </p>
          <p><strong><code>zip_code</code></strong> <small>string</small>
            <br />The zipcode considered for the shipping address (MAX 11; MIN 4).
            <br /><small> Example: 111111 </small>
          </p>
          <p><strong><code>neighborhood</code></strong> <small>string</small>
            <br />The neighborhood of the address line of the customer (MAX 255; MIN 2).
            <br /><small> Example: Barrio 11 </small>
          </p>
        </div>
      </details>
      
      <details class="yuno">
        <summary><strong><code>geolocation</code></strong> <small>object</small>
          <br />
          <p>Customer's geolocation.</p>
        </summary>
        <div>
          <p><strong><code>latitude</code></strong> <small>string</small>
            <br />Angular distance of a location on the earth south or north of the equator (MIN: 1, MAX:11)
            <br /><small> Example: −34.4905 </small>
          </p>
          <p><strong><code>longitude</code></strong> <small>string</small>
            <br />Angular measurement of the distance of a location on the earth east or west of the Greenwich observatory. (MIN: 1, MAX:11)
            <br /><small> Example: −58.5555 </small>
          </p>
        </div>
      </details>
      
      
    </div>
  </details>

  <details class="yuno">
    <summary>
      <strong><code>additional_data</code></strong> <small>object</small>
      <br />
      <p>Specifies the additional_data object. This object is not mandatory. However, if you send this information, the
        payment experience will be enhanced for your user.</p>
    </summary>
    <div>
      <details class="yuno">
        <summary>
          <strong><code>airline</code></strong> <small>object</small>
          <br />
          <p>Specifies the airline object. Passengers and tickets should have the same order information.</p>
        </summary>
        <div>
          <p><strong><code>pnr</code></strong> <small>string</small>
            <br />Passenger name record (MAX 10; MIN 1).
            <br /><small> Example: 1P-2UUGJW </small>
          </p>
          <details class="yuno">
            <summary>
              <strong><code>legs</code></strong> <small>array of object</small>
              <br />
              <p>Specifies the legs array of objects.</p>
            </summary>
            <div>
              <p><strong><code>arrival_airport</code></strong> <small>string</small>
                <br />IATA airport code (MAX 3; MIN 3). See <a href="http://www.iata.org">http://www.iata.org</a>.
                <br /><small> Example: AMS </small>
              </p>
               <p><strong><code>arrival_airport_country</code></strong> <small>string</small>
                <br /> Country of the arrival airport (MAX 2; MIN 2; ISO 3166-1).
                <br /><small> Example: AR </small>
              </p>
               <p><strong><code>arrival_airport_city</code></strong> <small>string</small>
               <br /> The city considered for the arrival airport (MAX 255; MIN 3).
                <br /><small> Example: BUE </small>
              </p>
              <p><strong><code>arrival_airport_timezone</code></strong> <small>string</small>
                <br />Airport timezone (MAX 6; MIN 6).
                <br /><small> Example: -03:00 </small>
              </p>
              <p><strong><code>arrival_datetime</code></strong> <small>timestamp</small>
                <br />The arrival date and time in local time at the arrival airport.
                <br /><small> Example: 2022-05-09T24:46:54.786342Z </small>
              </p>
              <p><strong><code>base_fare</code></strong> <small>float</small>
                <br />The transaction amount, excluding taxes and fees, the smallest unit of currency (multiple of
                0.0001).
                <br /><small> Example: 23.5676 </small>
              </p>
              <p><strong><code>base_fare_currency</code></strong> <small>string</small>
                <br />The currency used to transaction amount (MAX 3; MIN 3; <a href="country-reference">ISO 4217</a>).
                <br /><small> Example: Check the <a href="country-reference">Country reference</a>.</small>
              </p>
              <p><strong><code>carrier_code</code></strong> <small>string</small>
                <br />IATA carrier code (MAX 2; MIN 2). See <a href="http://www.iata.org">http://www.iata.org</a>.
                <br /><small> Example: KL </small>
              </p>
              <p><strong><code>departure_airport</code></strong> <small>string</small>
                <br />IATA code (MAX 3; MIN 3). See <a href="http://www.iata.org">http://www.iata.org</a>.
                <br /><small> Example: EZE </small>
              </p>
              </p>
               <p><strong><code>departure_airport_country</code></strong> <small>string</small>
               <br />  Country of the departure airport (MAX 2; MIN 2; ISO 3166-1).
                <br /><small> Example: AR </small>
              </p>
              </p>
               <p><strong><code>departure_airport_city</code></strong> <small>string</small>
               <br />  The city of the departure airport (MAX 2; MIN 2; ISO 3166-1).
                <br /><small> Example: AR </small>
              </p>
              <p><strong><code>departure_airport_timezone</code></strong> <small>string</small>
                <br />Airport timezone (MAX 6; MIN 6).
                <br /><small> Example: -03:00 </small>
              </p>
              <p><strong><code>departure_datetime</code></strong> <small>timestamp</small>
                <br />The departure date and time in local time at the departure airport.
                <br /><small> Example: 2022-05-09T20:46:54.786342Z </small>
              </p>
              <p><strong><code>fare_basis_code</code></strong> <small>string</small>
                <br />Code base rate provides specific information on the fare in addition to the class service, both
                required for booking (MAX 15; MIN 1).
                <br /><small> Example: HL7LNR </small>
              </p>
              <p><strong><code>fare_class_code</code></strong> <small>string</small>
                <br />The fare class code of the airline (MAX 1; MIN 1). The values can be a letter (A-Z) but may vary depending on the airline's definition. Check the Airline information reference.
                <br /><small> Example: Y </small>
              </p>
              <p><strong><code>flight_number</code></strong> <small>string</small>
                <br />The flight number assigned by the airline carrier (MAX 5; MIN 1).
                <br /><small> Example: 842 </small>
              </p>
              <p><strong><code>stopover_code</code></strong> <small>string</small>
                <br />The stopover code (1-letter code that indicates whether the passenger is allowed to make a
                stopover.
                Only two types of characters are allowed: O: Stopover allowed (the letter “O”, not zero) / X: Stopover
                not
                allowed).
                <br /><small> Example: O </small>
              </p>
            </div>
          </details>
          <details class="yuno">
            <summary>
              <strong><code>passengers</code></strong> <small>array of objects</small>
              <br />
              <p>Specifies the array of objects that represents the passengers associated to the tickets.</p>
            </summary>
            <div>
              <p><strong><code>country</code></strong> <small>enum</small>
                <br />Country where the document was issued (MAX 2; MIN 2; <a href="country-reference">ISO 3166-1</a>).
                <br /><small> Possible enum values: Check the <a href="country-reference">Country reference</a>.
                </small>
              </p>
              <p><strong><code>date_of_birth</code></strong> <small>string</small>
                <br />The passenger's date of birth in the YYYY-MM-DD format (MAX 10; MIN 10).
                <br /><small> Example: 1990-02-28 </small>
              </p>
              <details class="yuno">
                <summary>
                  <strong><code>document</code></strong> <small>object</small>
                  <br />
                  <p>Specifies the document object for the passenger.</p>
                </summary>
                <div>
                  <p><strong><code>document_number</code></strong> <small>string</small>
                    <br />The passenger's document number (MAX 40; MIN 3).
                    <br /><small> Example: 1093333333 </small>
                  </p>
                  <p><strong><code>document_type</code></strong> <small>enum</small>
                    <br />The passenger's document type (MAX 6, MIN 2).
                    <br /><small> Possible enum values: Check the <a href="country-reference">
                        Country reference</a>. </small>
                  </p>
                                  </div>
              </details>
              <details class="yuno">
                <summary>
                  <strong><code>phone</code></strong> <small>object</small>
                  <br />
                  <p>Specifies the phone object for the passenger.</p>
                </summary>
                <div>
                  <p><strong><code>country_code</code></strong> <small>string</small>
                    <br />The country calling code of the passenger's phone (MAX 3; MIN 1).
                    <br /><small> Possible values: Check the <a href="country-reference">
                        Country reference</a> </small>
                  </p>
                  <p><strong><code>number</code></strong> <small>string</small>
                    <br />The passenger's phone number, without the country code (MAX 32; MIN 1).
                    <br /><small> Example: 1130292837 </small>
                  </p>
                </div>
              </details>
              <p><strong><code>email</code></strong> <small>string</small>
                <br />The passenger's email (MAX 255; MIN 3).
                <br /><small> Example: John.Doe@gmail.com </small>
              </p>
              <p><strong><code>first_name</code></strong> <small>string</small>
                <br />The passenger's first name (MAX 255; MIN 3).
                <br /><small> Example: John </small>
              </p>
              <p><strong><code>last_name</code></strong> <small>string</small>
                <br />The passenger's last name (MAX 255; MIN 3).
                <br /><small> Example: Doe </small>
              </p>
              <p><strong><code>loyalty_number</code></strong> <small>string</small>
                <br />Number of passenger loyalty program (MAX 20, MIN 1).
                <br /><small> Example: 254587547 </small>
              </p>
              <p><strong><code>loyalty_tier</code></strong> <small>enum</small>
                <br />Tier of passenger loyalty program (MAX 255; MIN 3).
                <br /><small> Possible enum values: Check the <a href="airline-information">
                    Loyalty tier</a>.</small>
              </p>
              <p><strong><code>middle_name</code></strong> <small>string</small>
                <br />The passenger's middle name (MAX 255; MIN 3).
                <br /><small> Example: Charles </small>
              </p>
              <p><strong><code>nationality</code></strong> <small>enum</small>
                <br />The passenger's nationality (MAX 2; MIN 2; <a href="country-reference">ISO 3166-1</a>).
                <br /><small> Possible enum values: Check the <a href="country-reference">Country reference</a>.
                </small>
              </p>
              <p><strong><code>type</code></strong> <small>enum</small>
                <br />The type of passenger (MAX 1; MIN 1).
                <br /><small> Possible enum values: Check the <a href="airline-information">Passenger type list</a>.
                </small>
              </p>
            </div>
          </details>

          <details class="yuno">
            <summary>
              <strong><code>tickets</code></strong> <small>array of objects</small>
              <br />
              <p>Specifies the array of tickets associated with the passengers.</p>
            </summary>
            <div>
              <p><strong><code>ticket_number</code></strong> <small>string</small>
                <br />Ticket number (MAX 14; MIN 1).
                <br /><small> Example: 7411823255523 </small>
              </p>
              <p><strong><code>e_ticket</code></strong> <small>boolean</small>
                <br />Is this an e-ticket?
                <br /><small> Possible values: <code>True</code> or <code>False</code></small>
              </p>
              <p><strong><code>restricted</code></strong> <small>boolean</small>
                <br />Indicates if the ticket is refunfable or not.
                <br /><small> Possible values: <code>True</code> or <code>False</code></small>
              </p>
              <p><strong><code>total_fare_amount</code></strong> <small>float</small>
                <br />Total fare amount in the smallest unit of currency (multiple of 0.0001).
                <br /><small> Example: 80000 </small>
              </p>
              <p><strong><code>total_tax_amount</code></strong> <small>float</small>
                <br />Total taxes amount in the smallest unit of currency (multiple of 0.0001).
                <br /><small> Example: 14800 </small>
              </p>
              <p><strong><code>total_fee_amount</code></strong> <small>float</small>
                <br />Total fee amount in the smallest unit of currency (multiple of 0.0001).
                <br /><small> Example: 25200 </small>
              </p>
              <details class="yuno">
                <summary>
                  <strong><code>issue</code></strong> <small>object</small>
                  <br />
                  <p>Specifies the issue object.</p>
                </summary>
                <div>
                  <p><strong><code>address</code></strong> <small>string</small>
                    <br />Address of the agent who sold the ticket (MAX 255; MIN 3).
                    <br /><small> Example: Apartamento 502, Torre I </small>
                  </p>
                  <p><strong><code>zip_code</code></strong> <small>string</small>
                    <br />Zip code of the agent who sold the ticket.
                    <br /><small> Example: 1636 </small>
                  </p>
                  <p><strong><code>carrier_prefix_code</code></strong> <small>string</small>
                    <br />Issuing or Validating carrier. This is the AWB Prefix (Air waybill) IATA 3-numeric code (MAX
                    3; MIN
                    3).
                    <br /><small> Example: 044 </small>
                  </p>
                  <p><strong><code>city</code></strong> <small>string</small>
                    <br />City name of the agent who sold the ticket (MAX 255; MIN 3).
                    <br /><small> Example: Bogotá</small>
                  </p>
                  <p><strong><code>country</code></strong> <small>enum</small>
                    <br />Country code where the ticket was issued (MAX 2; MIN 2; <a href="country-reference">ISO
                      3166-1</a>).
                    <br /><small> Possible enum values: Check the <a href="country-reference">Country code
                        list</a>. </small>
                  </p>
                  <p><strong><code>date</code></strong> <small>string</small>
                    <br />Ticket issuing date.
                    <br /><small> Example: 1979-01-12 </small>
                  </p>
                  <p><strong><code>travel_agent_code</code></strong> <small>string</small>
                    <br />Code of the travel agent issuing the ticket.
                    <br /><small> Example: 10655823 </small>
                  </p>
                  <p><strong><code>travel_agent_name</code></strong> <small>string</small>
                    <br />The name under which the point of sale appears on the agency list or franchise name (MAX 32;
                    MIN
                    1).
                    <br /><small> Example: ACME Agency Inc </small>
                  </p>
                  <p><strong><code>booking_system_code</code></strong> <small>string</small>
                    <br />Code of the booking system issuing the ticket. (MAX 255; MIN 1).
                    <br /><small> Example: TEST001 </small>
                  </p>
                  <p><strong><code>booking_system_name</code></strong> <small>string</small>
                    <br />Name of the booking system issuing the ticket. (MAX 255; MIN 1).
                    <br /><small> Example: Booking system </small>
                  </p>
                </div>
              </details>
            </div>
          </details>
        </div>
      </details>
      <details class="yuno">
        <summary>
          <strong><code>order</code></strong> <small>object</small>
          <br />
          <p>Specifies the order object. </p>
        </summary>
        <div>
          <p><strong><code>shipping_amount</code></strong> <small>float</small>
            <br />The shipping amount of the order (multiple of 0.0001).This field is for informational purposes, the shipping amount is already included in the final transaction amount and is not added separately.
            <br /><small> Example: 5190 </small>
          </p>
          <p><strong><code>fee_amount</code></strong> <small>float</small>
            <br />The fee amount of the order (multiple of 0.0001).This field is for informational purposes, the fee amount is already included in the final transaction amount and is not added separately.
            <br /><small> Example: 789.50 </small>
          </p>
          <p><strong><code>tip_amount</code></strong> <small>float</small>
            <br />The tip amount of the order (multiple of 0.0001). This field is for informational purposes, the tip amount is already included in the final transaction amount and is not added separately.
            <br /><small> Example: 215.10 </small>
          </p>
           <p><strong><code>sales_channel</code></strong> <small>string</small>
            <br />Sales channel id of the payment. (MIN:3 y MAX:255)
            <br /><small> Example: AA01 </small>
          </p>
          <details class="yuno">
            <summary><strong><code>taxes</code></strong> <small>array of objects</small>
              <br />
              <p>Specifies the order's tax object.</p>
            </summary>
            <div>
              <p><strong><code>type</code></strong> <small>string</small>
                <br />Type of the tax.
                <br /><small> Example: VAT </small>
              </p>
              <p><strong><code>tax_base</code></strong> <small>float</small>
                <br />The amount base to apply the tax defined.
                <br /><small> Example: 10000 </small>
              </p>
              <p><strong><code>value</code></strong> <small>float</small>
                <br />The amount of the tax.
                <br /><small> Example: 2100 </small>
              </p>
              <p><strong><code>percentage</code></strong> <small>float</small>
                <br />The percentage of the tax.
                <br /><small> Example: 21 </small>
              </p>
            </div>
          </details>
          <details class="yuno">
            <summary>
              <strong><code>items</code></strong> <small>array of object</small>
              <br />
              <p>Specifies the item's object.</p>
            </summary>
            <div>
              <p><strong><code>id</code></strong> <small>string</small>
                <br />The unique identifier of the item (MAX 255; MIN 3).
                <br /><small> Example: 3214</small>
              </p>
              <p><strong><code>name</code></strong> <small>string</small>
                <br />The name of the item (MAX 255; MIN 3).
                <br /><small> Example: iPhone 12 Pro Max </small>
              </p>
              <p><strong><code>quantity</code></strong> <small>int</small>
                <br />The quantity of the item (MAX 999; MIN 1).
                <br /><small> Example: 1 </small>
              </p>
              <p><strong><code>unit_amount</code></strong> <small>float</small>
                <br />The unit amount of the item (multiple of 0.0001).
                <br /><small> Example: 550 </small>
              </p>
              <p><strong><code>category</code></strong> <small>string</small>
                <br />The category of the item (MAX 255; MIN 3).
                <br /><small> Possible values: Check the <a href="items-category-list">Item category list</a>.
                </small>
              </p>
              <p><strong><code>brand</code></strong> <small>string</small>
                <br />The brand of the item (MAX 255; MIN 3).
                <br /><small> Example: Apple </small>
              </p>
              <p><strong><code>sku_code</code></strong> <small>string</small>
                <br />The stock keeping unit (SKU) of the item (MAX 255; MIN 3).
                <br /><small> Example: A2342</small>
              </p>
              <p><strong><code>manufacture_part_number</code></strong> <small>string</small>
                <br />The manufacture part number of the item (MAX 255; MIN 3).
                <br /><small> Example: 345621234 </small>
              </p>
            </div>
          </details>
          
          <details class="yuno">
            <summary><strong><code>discounts</code></strong> <small>array of objects</small>
              <br />
              <p>Specifies the order's discounts object.</p>
            </summary>
            <div>
              <p><strong><code>id</code></strong> <small>string</small>
                <br />ID of the discount (MAX 255; MIN 3).
                <br /><small> Example: 10OFF </small>
              </p>
              <p><strong><code>name</code></strong> <small>string</small>
                <br />The name of the discount (MAX 255; MIN 3).
                <br /><small> Example: Offer </small>
              </p>
              <p><strong><code>unit_amount</code></strong> <small>float</small>
                <br />The amount of the discount (multiple of 0.0001).
                <br /><small> Example: 100 </small>
              </p>
            </div>
          </details>
          

          <details class="yuno">
            <summary>
              <strong><code>tickets</code></strong> <small>array of object</small>
              <br />
              <p>Specifies the tickets object.</p>
            </summary>
            <div>
              <p><strong><code>id</code></strong> <small>string</small>
                <br />Id of the ticket (Min: 1, max:255)
                <br /><small> Example: 3214</small>
              </p>
              <p><strong><code>name</code></strong> <small>string</small>
                <br />Name of the ticket (Min: 1, max:255)
                <br /><small> Example: Concert </small>
              </p>
              <p><strong><code>description</code></strong> <small>string</small>
                <br />Description of the ticket (Min: 1, max:255)
                <br /><small> Example: Concert </small>
              </p>
              <p><strong><code>type</code></strong> <small>enum</small>
                <br />Type of ticket
                <br /><small> VIRTUAL / PHYSICAL </small>
              </p>
              <details class="yuno">
                <summary>
                  <strong><code>amount</code></strong> <small>object</small>
                  <br />
                  <p>Specifies the payment amount object, with the value and currency.</p>
                </summary>
                <div>
                  <p><strong><code>currency</code></strong> <small>enum</small>
                    <br />The currency used to make the payment (MAX 3; MIN 3; <a href="country-reference">ISO 4217</a>).
                    <br /><small> Possible enum values: Check the <a href="country-reference">Country reference</a>.</small>
                  </p>
                  <p><strong><code>value</code></strong> <small>number</small>
                    <br />The payment amount (multiple of 0.0001).
                    <br /><small> Example: 111111 </small>
                  </p>
                </div>
              </details>
              <details class="yuno">
                <summary>
                  <strong><code>event</code></strong> <small>object</small>
                  <br />
                  <p>Specifies the event details object.</p>
                </summary>
                <div>
                  <p><strong><code>id</code></strong> <small>string</small>
                    <br />Id of the event related to the ticket
                    <br /><small> Example: AA01 </small>
                  </p>
                  <p><strong><code>name</code></strong> <small>string</small>
                    <br />Name of the event (Min: 1, max:255)
                    <br /><small> Example: Music </small>
                  </p>
                  <p><strong><code>description</code></strong> <small>string</small>
                    <br />Description of the event (Min: 1, max:255)
                    <br /><small> Example: festival </small>
                  </p>
                  <p><strong><code>type</code></strong> <small>enum</small>
                    <br />Type of event
                    <br /><small> PARTY, UNIVERCITY, FESTIVAL, CIRCUS, SPORTS, CINEMA, THEATER, CONCERT, OTHERS.  </small>
                  </p>
                  <p><strong><code>date</code></strong> <small>date</small>
                    <br />Date of the event
                    <br /><small> Example: 2025-10-25 </small>
                  </p>
                  <details class="yuno">
                    <summary><strong><code>address</code></strong> <small>object</small>
                      <br />
                      <p>Specifies the event's address object.</p>
                    </summary>
                    <div>
                      <p><strong><code>address_line_1</code></strong> <small>string</small>
                        <br />The primary address line of the event (MAX 255; MIN 3).
                        <br /><small> Example: Calle 34 # 56 - 78 </small>
                      </p>
                      <p><strong><code>address_line_2</code></strong> <small>string</small>
                        <br />The secondary billing address line of the event (MAX 255; MIN 3).
                        <br /><small> Example: Apartamento 502, Torre I </small>
                      </p>
                      <p><strong><code>city</code></strong> <small>string</small>
                        <br />The city considered for the event's address (MAX 255; MIN 3).
                        <br /><small> Example: Bogotá </small>
                      </p>
                      <p><strong><code>country</code></strong> <small>enum</small>
                        <br />The country considered for the event's address (MAX 2; MIN 2,<a href='country-reference'>ISO
                          3166-1</a>).
                        <br /><small> Possible enum values: Check the <a href="country-reference">Country code
                            list</a>.</small>
                      </p>
                      <p><strong><code>state</code></strong> <small>string</small>
                        <br />The state considered for the event's address (MAX 255; MIN 3).
                        <br /><small> Example: Cundinamarca </small>
                      </p>
                      <p><strong><code>zip_code</code></strong> <small>string</small>
                        <br />The zipcode considered for the event's address (MAX 11; MIN 4).
                        <br /><small> Example: 111111 </small>
                      </p>
                    </div>
                  </details>

                </div>
              </details>
              

            </div>
          </details>
          
          
          
          
          
          
          <details class="yuno">
            <summary>
              <strong><code>shipping</code></strong> <small>object</small>
              <br />
              <p>Specifies the shipping details object.</p>
            </summary>
            <div>
              <p><strong><code>type</code></strong> <small>enum</small>
                <br />Type of shippment.
                <br /><small> Example: STANDARD</small>
                <br /><small> Possible enum values: Check the <a href="shipping-reference">Shipping reference</a>.</small>
              </p>
              <p><strong><code>description</code></strong> <small>string</small>
                <br />The description of the shipping (MAX 255; MIN 1).
                <br /><small> Example: Shipping of sample shirt </small>
              </p>
              <p><strong><code>carrier</code></strong> <small>enum</small>
                <br />The carrier used for the delivery.
                <br /><small> Example: UPS </small>
                <br /><small> Possible enum values: Check the <a href="shipping-reference">Shipping reference</a>.</small>
              </p>
              <p><strong><code>deliver_at</code></strong> <small>timestamp</small>
                <br />Estimated date of delivery (ISO 8601 MAX 27; MIN 27).
                <br /><small> Example: 2025-09-17T20:43:54.786342Z </small>
              </p>
            </div>
          </details>
          
          <!-- Account funding data -->

      <details class="yuno">
      <summary>
        <strong><code>account_funding</code></strong> <small>object</small>
        <br />
        <p>Specifies the account funding structure for transfers and payments.</p>
      </summary>
      <div>
        <details class="yuno">
          <summary>
            <strong><code>sender</code></strong> <small>object</small>
            <br />
            <p>Specifies the sender's information.</p>
          </summary>
          <div>
            <p><strong><code>national_entity</code></strong> <small>enum</small>
              <br />Sender's national entity type. Possible values:
              <ul>
                <li><code>INDIVIDUAL</code></li>
                <li><code>ENTITY</code></li>
              </ul>
            </p>
            <p><strong><code>first_name</code></strong> <small>string</small>
              <br />Sender's first name (MAX 80).
              <br /><small> Example: John </small>
            </p>
            <p><strong><code>last_name</code></strong> <small>string</small>
              <br />Sender's last name (MAX 80).
              <br /><small> Example: Doe </small>
            </p>
          <p><strong><code>legal_name</code></strong> <small>string</small>
              <br />Recipient's legal name. Required if <code>national_entity</code> is <code>ENTITY</code> (MAX 80).
              <br /><small> Example: Arcos dorados S.A. </small>
            </p>
            <p><strong><code>email</code></strong> <small>string</small>
              <br />Sender's email (MAX 255; MIN 3).
              <br /><small> Example: john.doe@email.com </small>
            </p>
          <div class="yuno">
            <p><strong><code>country</code></strong> <small>enum</small>
              <br />Sender's country (MAX 2; MIN 2; <a href="country-reference">ISO 3166-1</a>).
              <br /><small> Possible enum values: Check the <a href="country-reference">Country reference</a>.</small>
            </p>
          </div>
            <p><strong><code>date_of_birth</code></strong> <small>date</small>
              <br />Sender's date of birth in the <code>YYYY-MM-DD</code> format (MAX 10; MIN 10).
              <br /><small> Example: 1990-02-28 </small>
            </p>

            <details class="yuno">
              <summary>
                <strong><code>phone</code></strong> <small>object</small>
                <br />
                <p>Specifies the phone object.</p>
              </summary>
              <div>
                <p><strong><code>country_code</code></strong> <small>string</small>
                  <br />Sender's phone country code (MAX 3; MIN 2).
                  <br /><small> Example: 57 </small>
                </p>
                <p><strong><code>number</code></strong> <small>string</small>
                  <br />Sender's phone number (MAX 32; MIN 1).
                  <br /><small> Example: 3132450765 </small>
                </p>
              </div>
            </details>

            <details class="yuno">
              <summary>
                <strong><code>document</code></strong> <small>object</small>
                <br />
                <p>Specifies the document object.</p>
              </summary>
              <div>
                <p><strong><code>document_number</code></strong> <small>string</small>
                  <br />Sender's national document ID (MAX 40; MIN 3).
                  <br /><small> Example: 1093333333 </small>
                </p>
                <p><strong><code>document_type</code></strong> <small>enum</small>
                  <br />Sender's document type (MAX 6; MIN 2).
                  <br /><small> Example: CC </small>
                </p>
              </div>
            </details>

            <details class="yuno">
              <summary>
                <strong><code>address</code></strong> <small>object</small>
                <br />
                <p>Specifies the address object.</p>
              </summary>
              <div>
                <p><strong><code>address_line_1</code></strong> <small>string</small>
                  <br />Primary billing address (MAX 255; MIN 3).
                  <br /><small> Example: Calle 34 # 56 - 78 </small>
                </p>
                <p><strong><code>address_line_2</code></strong> <small>string</small>
                  <br />Secondary billing address (MAX 255; MIN 3).
                  <br /><small> Example: Apartamento 502, Torre I </small>
                </p>
                <p><strong><code>city</code></strong> <small>string</small>
                  <br />City for the billing address (MAX 255; MIN 3).
                  <br /><small> Example: Bogota </small>
                </p>
                <p><strong><code>country</code></strong> <small>enum</small>
                  <br />Country for the billing address (ISO 3166-1; MAX 2; MIN 2).
                  <br /><small> Example: CO </small>
                </p>
                <p><strong><code>state</code></strong> <small>string</small>
                  <br />State or province for the billing address (MAX 255; MIN 3).
                  <br /><small> Example: Cundinamarca </small>
                </p>
                <p><strong><code>zip_code</code></strong> <small>string</small>
                  <br />ZIP code for the billing address (MAX 11; MIN 4).
                  <br /><small> Example: 111111 </small>
                </p>
              </div>
            </details>
          </div>
        </details>

        <details class="yuno">
          <summary>
            <strong><code>recipient</code></strong> <small>object</small>
            <br />
            <p>Specifies the recipient's information.</p>
          </summary>
          <div>
            <p><strong><code>national_entity</code></strong> <small>enum</small>
              <br />Recipient's national entity type. Possible values:
              <ul>
                <li><code>INDIVIDUAL</code></li>
                <li><code>ENTITY</code></li>
              </ul>
            </p>
          <p><strong><code>first_name</code></strong> <small>string</small>
              <br />Sender's first name (MAX 80).
              <br /><small> Example: John </small>
            </p>
            <p><strong><code>last_name</code></strong> <small>string</small>
              <br />Sender's last name (MAX 80).
              <br /><small> Example: Doe </small>
            </p>
            <p><strong><code>legal_name</code></strong> <small>string</small>
              <br />Recipient's legal name. Required if <code>national_entity</code> is <code>ENTITY</code> (MAX 80).
              <br /><small> Example: Arcos dorados S.A. </small>
            </p>
            <p><strong><code>email</code></strong> <small>string</small>
              <br />Recipient's email (MAX 255; MIN 3).
              <br /><small> Example: recipient@example.com </small>
            </p>
          <div class="yuno">
            <p><strong><code>country</code></strong> <small>enum</small>
              <br />Recipient's country (MAX 2; MIN 2; <a href="country-reference">ISO 3166-1</a>).
              <br /><small> Possible enum values: Check the <a href="country-reference">Country reference</a>.</small>
            </p>
          </div>
            <p><strong><code>date_of_birth</code></strong> <small>date</small>
              <br />Recipient's date of birth in the <code>YYYY-MM-DD</code> format (MAX 10; MIN 10).
              <br /><small> Example: 1985-07-15 </small>
            </p>

            <details class="yuno">
              <summary>
                <strong><code>phone</code></strong> <small>object</small>
                <br />
                <p>Specifies the phone object.</p>
              </summary>
              <div>
                <p><strong><code>country_code</code></strong> <small>string</small>
                  <br />Recipient's phone country code (MAX 3; MIN 2).
                  <br /><small> Example: 57 </small>
                </p>
                <p><strong><code>number</code></strong> <small>string</small>
                  <br />Recipient's phone number (MAX 32; MIN 1).
                  <br /><small> Example: 3132450765 </small>
                </p>
              </div>
            </details>

            <details class="yuno">
              <summary>
                <strong><code>document</code></strong> <small>object</small>
                <br />
                <p>Specifies the document object.</p>
              </summary>
              <div>
                <p><strong><code>document_number</code></strong> <small>string</small>
                  <br />Recipient's national document ID (MAX 40; MIN 3).
                  <br /><small> Example: 1093333333 </small>
                </p>
                <p><strong><code>document_type</code></strong> <small>enum</small>
                  <br />Recipient's document type (MAX 6; MIN 2).
                  <br /><small> Example: CC </small>
                </p>
              </div>
            </details>

            <details class="yuno">
              <summary>
                <strong><code>address</code></strong> <small>object</small>
                <br />
                <p>Specifies the address object.</p>
              </summary>
              <div>
                <p><strong><code>address_line_1</code></strong> <small>string</small>
                  <br />Primary billing address (MAX 255; MIN 3).
                  <br /><small> Example: Calle 34 # 56 - 78 </small>
                </p>
                <p><strong><code>address_line_2</code></strong> <small>string</small>
                  <br />Secondary billing address (MAX 255; MIN 3).
                  <br /><small> Example: Apartamento 502, Torre I </small>
                </p>
                <p><strong><code>city</code></strong> <small>string</small>
                  <br />City for the billing address (MAX 255; MIN 3).
                  <br /><small> Example: Bogota </small>
                </p>
                <p><strong><code>country</code></strong> <small>enum</small>
                  <br />Country for the billing address (ISO 3166-1; MAX 2; MIN 2).
                  <br /><small> Example: CO </small>
                </p>
                <p><strong><code>state</code></strong> <small>string</small>
                  <br />State or province for the billing address (MAX 255; MIN 3).
                  <br /><small> Example: Cundinamarca </small>
                </p>
                <p><strong><code>zip_code</code></strong> <small>string</small>
                  <br />ZIP code for the billing address (MAX 11; MIN 4).
                  <br /><small> Example: 111111 </small>
                </p>
              </div>
            </details>
          </div>
        </details>
      </div>
    </details>


      <!-- Account funding data -->

        </div>
      </details>

      <details class="yuno">
        <summary>
          <strong><code>seller_details</code></strong> <small>object</small>
          <br />
          <p>Specifies the seller's details object.</p>
        </summary>
        <div>
          <p><strong><code>name</code></strong> <small>string</small>
            <br />The seller's legal name (MAX 255; MIN 3).
            <br /><small> Example: Jhon Doe </small>
          </p>
          <p><strong><code>email</code></strong> <small>string</small>
            <br />The seller's e-mail (MAX 255; MIN 3).
            <br /><small> Example: jhondoe@business.com </small>
          </p>
          <p><strong><code>reference</code></strong> <small>string</small>
            <br />The seller's identification code (MAX 255; MIN 3).
            <br /><small> Example: Seller </small>
          </p>
          <p><strong><code>website</code></strong> <small>string</small>
            <br />The seller's website URL (MAX 255; MIN 3).
            <br /><small> Example: https://www.test.com/1231324 </small>
          </p>
          <p><strong><code>industry</code></strong> <small>enum</small>
            <br />The seller's industry (MAX 255; MIN 3).
            <br /><small> Possible enum values: Check the <a href="industry-category-list">Industry category</a>.
            </small>
          </p>
          <p><strong><code>merchant_category_code</code></strong> <small>string</small>
            <br />MCC - The merchant category code (MAX 235; MIN 1).
            <br /><small> Example: 6199 </small>
          </p>
          <p><strong><code>country</code></strong> <small>enum</small>
            <br />The seller's country (MAX 255; MIN 3).
            <br /><small> Possible enum values: Check the <a href="country-reference">Country code list</a>.
            </small>
          </p>

          <details class="yuno">
            <summary>
              <strong><code>document</code></strong> <small>object</small>
              <br />
              <p>Specifies the document object of the seller.</p>
            </summary>
            <div>
              <p><strong><code>document_number</code></strong> <small>string</small>
                <br />The seller's document number (MAX 40; MIN 3).
                <br /><small> Example: 1093333333 </small>
              </p>
              <p><strong><code>document_type</code></strong> <small>enum</small>
                <br />The seller's document type (MAX 6, MIN 2).
                <br /><small> Possible enum values: Check the <a href="country-reference">
                    Country reference</a>. </small>
              </p>
            </div>
          </details>


          <details class="yuno">
            <summary><strong><code>phone</code></strong> <small>object</small>
              <br />
              <p>Specifies the seller's phone number object.</p>
            </summary>
            <div>
              <p><strong><code>country_code</code></strong> <small>string</small>
                <br />The country calling code of the seller's phone (MAX 3; MIN 1). Possible values: Check the <a
                  href="country-reference">
                  Country reference</a>.
                <br /><small> Example: 57 </small>
              </p>
              <p><strong><code>number</code></strong> <small>string</small>
                <br />The seller's phone number, without the country code (MAX 32; MIN 1).
                <br /><small> Example: 3132450765 </small>
              </p>
            </div>
          </details>

          <details class="yuno">
            <summary><strong><code>address</code></strong> <small>object</small>
              <br />
              <p>Specifies the seller's address object.</p>
            </summary>
            <div>
              <p><strong><code>address_line_1</code></strong> <small>string</small>
                <br />The primary address line of the seller (MAX 255; MIN 3).
                <br /><small> Example: Calle 34 # 56 - 78 </small>
              </p>
              <p><strong><code>address_line_2</code></strong> <small>string</small>
                <br />The secondary billing address line of the seller (MAX 255; MIN 3).
                <br /><small> Example: Apartamento 502, Torre I </small>
              </p>
              <p><strong><code>city</code></strong> <small>string</small>
                <br />The city considered for the seller's address (MAX 255; MIN 3).
                <br /><small> Example: Bogotá </small>
              </p>
              <p><strong><code>country</code></strong> <small>enum</small>
                <br />The country considered for the seller's address (MAX 2; MIN 2,<a href='country-reference'>ISO
                  3166-1</a>).
                <br /><small> Possible enum values: Check the <a href="country-reference">Country code
                    list</a>.</small>
              </p>
              <p><strong><code>state</code></strong> <small>string</small>
                <br />The state considered for the seller's address (MAX 255; MIN 3).
                <br /><small> Example: Cundinamarca </small>
              </p>
              <p><strong><code>zip_code</code></strong> <small>string</small>
                <br />The zipcode considered for the seller's address (MAX 11; MIN 4).
                <br /><small> Example: 111111 </small>
              </p>
            </div>
          </details>

        </div>
      </details>

       


    </div>
  </details>


  <details class="yuno">
    <summary>
      <strong><code>transactions</code></strong> <small>object</small>
      <br />
      <p>Specifies the transaction details associated with a payment.</p>
    </summary>
    <div>
      <p><strong><code>id</code></strong> <small>string</small>
        <br />The unique identifier of the transaction (MAX 64; MIN 36).
        <br /><small> Example: 7bf8f1f6-4081-41ec-a024-a927056e00ab </small>
      </p>

      <p><strong><code>type</code></strong> <small>string</small>
        <br />The transaction type.
        <br /><small> Example: PURCHASE </small>
      </p>

      <p><strong><code>status</code></strong> <small>enum</small>
        <br />The status of the transaction.
        <br /><small> Example: SUCCEEDED </small>
      </p>

      <p><strong><code>category</code></strong> <small>string</small>
        <br />The category of the payment method used in the transaction.
        <br /><small> Example: CARD </small>
      </p>

      <p><strong><code>amount</code></strong> <small>string</small>
        <br />The amount of the transaction.
        <br /><small> Example: 100 </small>
      </p>

      <p><strong><code>provider_id</code></strong> <small>string</small>
        <br />The id of the provider that processed the transaction.
        <br /><small> Example: DLOCAL </small>
      </p>


      <details class="yuno">
        <summary>
          <strong><code>payment_method</code></strong> <small>object</small>
          <br />
          <p>Specifies the payment method details used in the transaction.</p>
        </summary>
        <div>
          <p><strong><code>vaulted_token</code></strong> <small>string</small>
            <br />The vaulted token for a <b>previously stored payment_method</b>. If a payment is created using a
            vaulted_token, it is not necessary to send a token as well, it can be defined as null (MAX: 64; MIN: 36).
            <br /><small> Example: 8604911d-5ds9-229e-8468-bd41abear14s </small>
          </p>

          <p><strong><code>type</code></strong> <small>string</small>
            <br /> Type of the payment method. Mandatory for <code>DIRECT</code> or <code>REDIRECT</code> workflow.
            <br /><small> Possible enum values:</small>
            <br /><small> Possible enum values: Check the <a href="payment-type-list">payment type reference</a>.</small>
          </p>

          <p><strong><code>vault_on_success</code></strong> <small>boolean</small>
            <br />Flag to enroll the card after a successful payment.
            <br /><small> Possible values: <code>True</code> or <code>False</code> </small>
          </p>

          <p><strong><code>token</code></strong> <small>string</small>
            <br />The one time use payment method token <b>provided by Yuno sdk</b>. If a payment is created using a
            token, it is not necessary to send a vaulted_token as well, it can be defined as null. Not necessary for
            back to back payments (MAX: 64; MIN: 36).
            <br /><small> Example: 5104911d-5df9-229e-8468-bd41abea1a4s </small>
          </p>

          <p><strong><code>parent_payment_method_type</code></strong> <small>enum</small>
            <br />When using a wallet for payments through a <a href="https://docs.y.uno/docs/direct-integration">direct integration</a>, this field indicates the provider from which the card information was obtained.
            <br /><small> Example: APPLE_PAY </small>
          </p>

          <details class="yuno">
            <summary><strong><code>detail</code></strong> <small>object</small>
              <br />
              <p>Specifies the payment method detail object, which provides details of the different transaction
                category
                types that are part of the payment method object.</p>
            </summary>
            <div>
              <details class="yuno">
                <summary><strong><code>card</code></strong> <small>object</small>
                  <br />
                  <p>Specifies the details of the payment method when using a card.</p>
                </summary>
                <div>
                  <p><strong><code>verify</code></strong> <small>boolean</small>
                    <br /> Using amount = 0 and verify = true, you can verify the user's card without authorizing a real
                    amount.
                    <br /><small> Possible values: <code>True</code> or <code>False</code> </small>
                  </p>

                  <p><strong><code>capture</code></strong> <small>boolean</small>
                    <br />Decides whether to authorize the payment or capture it. Authorizing a card payment allows you
                    to
                    reserve funds in a customer's bank account.
                    <br /><small> Possible values: <code>True</code> or <code>False</code> </small>
                  </p>


                  <p><strong><code>installments</code></strong> <small>integer</small>
                    <br />The card installments (MAX 50; MIN 1).
                    <br /><small> Example: 3 </small>
                  </p>

                  <p><strong><code>first_installments_deferral</code></strong> <small>integer</small>
                    <br />Number of months to wait to debit the first installment.
                    <br /><small> Example: 1 </small>
                  </p>

                  <p><strong><code>installments_type</code></strong> <small>string</small>
                    <br />Type of installments used in the card payment.
                    <br /><small> Example: string </small>
                  </p>

                  <p><strong><code>installments_amount</code></strong> <small>integer</small>
                    <br />The installment amount includes interests associated with the installment and the information
                    is
                    defined by the provider.
                    <br /><small> Example: 3 </small>
                  </p>

                  <p><strong><code>soft_descriptor</code></strong> <small>string</small>
                    <br />The descriptor passed per transaction to out platform. It will be presented on the customer's
                    physical bank statement (MAX 15; MIN 0).
                    <br /><small> Example: COMPANY1 </small>
                  </p>

                  <p><strong><code>authorization_code</code></strong> <small>string</small>
                    <br />The acquirer's response code.
                    <br /><small> Example: 742A64 </small>
                  </p>

                  <p><strong><code>retrieval_reference_number</code></strong> <small>integer</small>
                    <br />The unique identifier assigned by an acquirer to an authorization. In case of Brazil, you'll receive the nsu.
                    <br /><small> Example: 200000000012 </small>
                  </p>

                  <p><strong><code>voucher</code></strong> <small>string</small>
                    <br />The unique identifier of the payment receipt assigned by the issuing bank for a card
                    transaction.
                    This field is empty if the gateway does not provide information about the transaction (MAX 255; MIN
                    3).
                    <br /><small> Example: 43564 </small>
                  </p>

                  <details class="yuno">
                    <summary><strong><code>card_data</code></strong> <small>object</small>
                      <br />
                      <p>Specifies the details of the card.</p>
                    </summary>
                    <div>
                      <!-- <p><strong><code>number</code></strong> <small>string</small>
                        <br /> Card's number without any separators (MAX 19; MIN 8) only available for PCI certified
                        merchants.
                        <br /><small> Example: 4507990000000010 </small>
                      </p>
                      <p><strong><code>expiration_month</code></strong> <small>integer</small>
                        <br />Card's expiration month (MM) (MAX 2; MIN 2) only available for PCI certified merchants.
                        <br /><small> Example: 03 </small>
                      </p>
                      <p><strong><code>expiration_year</code></strong> <small>integer</small>
                        <br />Card's expiration year (YYYY) (MAX 4; MIN 2) only available for PCI certified merchants.
                        <br /><small> Example: 2030 </small>
                      </p>
                      <p><strong><code>security_code</code></strong> <small>integer</small>
                        <br />Card's security code (MAX 4; MIN 3) only available for PCI certified merchants.
                        <br /><small> Example: 123 </small>
                      </p> -->
                      <p><strong><code>holder_name</code></strong> <small>string</small>
                        <br />Card holder's full name as it appears on the card (MAX 26; MIN 3) only available for PCI
                        certified merchants.
                        <br /><small> Example: Fannie Weissnat </small>
                      </p>
                      <p><strong><code>iin</code></strong> <small>integer</small>
                        <br />The issuer identification number (IIN) refers to the first few digits of the payment card
                        number issued by a financial institution (MAX 8; MIN 6).
                        <br /><small> Example: 41961111 </small>
                      </p>
                      <p><strong><code>lfd</code></strong> <small>integer</small>
                        <br />The last four digits of the card (MAX 4; MIN 4).
                        <br /><small> Example: 0010 </small>
                      </p>
                      <p><strong><code>number_length</code></strong> <small>integer</small>
                        <br />The length of the card's number (MAX 2; MIN 1).
                        <br /><small> Example: 16 </small>
                      </p>
                      <p><strong><code>security_code_length</code></strong> <small>integer</small>
                        <br />The length of the card's security code (MAX 1; MIN 1).
                        <br /><small> Example: 3 </small>
                      </p>
                      <p><strong><code>brand</code></strong> <small>string</small>
                        <br />The card's brand information (MAX 255; MIN 3).
                        <br /><small> Example: VISA </small>
                      </p>
                      <p><strong><code>issuer_name</code></strong> <small>string</small>
                        <br />The card's issuer (MAX 255; MIN 3).
                        <br /><small> Example: Banco Galicia </small>
                      </p>
                      <p><strong><code>category</code></strong> <small>string</small>
                        <br />The category of the card's issuer (MAX 255; MIN 3).
                        <br /><small> Example: Gold </small>
                      </p>
                      <p><strong><code>type</code></strong> <small>string</small>
                        <br />The type of the card's issuer (MAX 255; MIN 3).
                        <br /><small> Example: CREDIT, DEBIT, or CHARGE_CARD </small>
 <p><strong><code>fingerprint</code></strong> <small>string</small>
                    <br />When a customer enrolls a credit card multiple times related to one or many Yuno accounts, multiple vaulted_tokens will be generated, but the fingerprint lets you identify when the same card is used for the customer (MAX 255; MIN 3).
                    <br /><small> Example: 55a7fe38-cdc3-45dc-8c5f-820751799c76 </small>
                  </p>
                     </p>

                    </div>
                  </details>
                  <details class="yuno">
                    <summary><strong><code>three_d_secure</code></strong> <small>object</small>
                      <br />
                      <p>Specifies the details of the 3DS Transaction.</p>
                    </summary>
                    <div>
                      <p><strong><code>three_d_secure_setup_id</code></strong> <small>string</small>
                        <br />Setup ID obteined for the 3DS Direct flow.
                        <br /><small> Example: 24127d61-b852-42fb-acd4-1ee661645376 </small>
                      </p>
                      <p><strong><code>version</code></strong> <small>enum</small>
                        <br />Refers to the protocol version of the EMV 3-D Secure specification used. 1.0, 2.0, 2.1.0,
                        2.2.0, 2.2.1.
                        <br /><small> Example: 2.2.1 </small>
                      </p>
                      <p><strong><code>electronic_commerce_indicator</code></strong> <small>string</small>
                        <br />This field must be completed with the result of the <a href="eci-indicators-list">ECI</a> field provided by the 3d Secure
                        service. The Electronic Commerce Indicator (ECI) informs the card issuer if the transaction was
                        protected by a security protocol like VbV or MCSC. It is mandated by Visa and MasterCard that
                        all 3-D Secure transactions have this value populated in the authorization request (MAX: 2,
                        MIN: 0).
                        <br /><small> Example: 04 </small>
                      </p>
                      <p><strong><code>cryptogram</code></strong> <small>string</small>
                        <br />This field must be completed with the result of the cryptogram field provided by the
                        3DSecure service. In Visa transactions, it represents the Cardholder Authentication Verification
                        Value (CAVV), a cryptographic value generated by the Issuer as evidence of payment
                        authentication during online purchase to qualify for chargeback protection. MasterCard
                        transactions have a similar value called Accountholder Authentication Value (AAV) or the
                        Universal Cardholder Authentication Field (UCAF). When submitting a transaction for
                        authorization, the merchant must include the CAVV or AAV/UCAF to demonstrate that the cardholder
                        has been authenticated. It is typically base64-encoded (MAX: 40, MIN: 0).
                        <br /><small> Example: BA0BB1Z3N5Q4kjkBU3c3ELGUsJY = </small>
                      </p>
                      <p><strong><code>transaction_id</code></strong> <small>string</small>
                        <br />For 3DS v1:
                        This is the Unique Transaction Identifier. It is automatically generated by the MPI. It is
                        typically 28 bytes in length and base64-encoded. Is commonly referred to as XID (MAX: 40, MIN:
                        0).
                        For 3DS v2:
                        Universally unique transaction identifier assigned by the DS to identify a single transaction.
                        (MAX: 36, MIN:36).
                        <br /><small> Ex for V1: “TjY0MjAxRjA4MD4987DUzMzYyNjU=”
                          Ex for V2: “c4e59ceb-a382-4d6a-bc87-385d591fa09d” </small>
                      </p>
                      <p><strong><code>directory_server_transaction_id</code></strong> <small>string</small>
                        <br />Transaction ID generated by the Mastercard directory server during authentication (MAX
                        255; MIN 3).
                        <br /><small> Example: f38e6948-5388-41a6-bca4-b49723c19437 </small>
                      </p>
                      <p><strong><code>pares_status</code></strong> <small>string</small>
                    <br />Indicates the outcome of the cardholder authentication during the 3-D Secure process. It informs you whether the authentication was successful (Y), failed (N), could not be completed (U), or was only attempted (A).
                    <br /><small> Example: Y </small>
                  </p>
                  
                  <p><strong><code>acs_id</code></strong> <small>string</small>
                    <br />Unique identifier provided by the Access Control Server (ACS) during the 3-D Secure authentication process.
                    <br /><small> Example: ACS-1234567890 </small>
                  </p>
                    </div>
                  </details>
                  <details class="yuno">
                <summary><strong><code>network_token</code></strong> <small>object</small>
                  <br />
                  <p>Information about the network token used for the transaction. If applicable.</p>
                </summary>
                <div>
                  <p><strong><code>network</code></strong> <small>enum</small>
                    <br />The provider associated to the token provided. VISA, MASTERCARD, AMERICAN_EXPRESS.
                    <br /><small> Example: MASTERCARD </small>
                  </p>
                  <p><strong><code>status</code></strong> <small>enum</small>
                    <br />Status of the token for the payment method. CREATED, ACTIVE, SUSPENDED, CANCELED.
                    <br /><small> Example: ACTIVE </small>
                  </p>
                  <p><strong><code>par</code></strong> <small>string</small>
                    <br />Payment account reference.
                    <br /><small> Example: MCC123456789012 </small>
                  </p>
                  <details class="yuno">
                    <summary><strong><code>token_data</code></strong> <small>object</small>
                      <br />
                      <p>Token details.</p>
                    </summary>
                     <div>
                      <p><strong><code>number</code></strong> <small>number</small>
                        <br />[Mandatory] Token’s number without any separators (MAX 19; MIN 8) only available for PCI certified merchants.
                        <br /><small> Example: 450799000001234 </small>
                      </p>
                      <p><strong><code>holder_name</code></strong> <small>string</small>
                        <br />Cardholder’s full name as it appears on the Token (MAX 26; MIN 3).
                        <br /><small> Example: John Doe </small>
                      </p>
                      <p><strong><code>iin</code></strong> <small>number</small>
                        <br />The Institution identification number (IIN) refers to the first few digits of a network token number issued by a financial institution (MAX 8; MIN 6).
                        <br /><small> Example: 45079900 </small>
                      </p>
                      <p><strong><code>lfd</code></strong> <small>number</small>
                        <br />Last four digits of the network token (MAX 4; MIN 4).
                        <br /><small> Example: 1234 </small>
                      </p>
                      <p><strong><code>expiration_month</code></strong> <small>number</small>
                        <br />Network Token’s expiration month (MM) (MAX 2; MIN 2).
                        <br /><small> Example: 12 </small>
                      </p>
                      <p><strong><code>expiration_year</code></strong> <small>number</small>
                        <br />Network Token’s expiration year (YYYY) (MAX 4; MIN 2).
                        <br /><small> Example: 2027 </small>
                      </p>
                      <p><strong><code>cryptogram</code></strong> <small>string</small>
                        <br />[Mandatory] - The unique cryptogram generated by the issuer for the network token in use in the transaction.
                      </p>
                      <p><strong><code>electronic_commerce_indicator</code></strong> <small>string</small>
                        <br />[Only required for certain providers] - In case the token has been authenticated by Mastercard the field should be set to 02. For Visa or not authenticated tokens, is not necessary to send the field.
                      </p>
                      <p><strong><code>token_requestor_id</code></strong> <small>string</small>
                        <br />[Only required for certain providers] - Token requestor ID of the merchant
                      </p>
                    </div>
                    <details class="yuno">
                    <summary><strong><code>response</code></strong> <small>object</small>
                      <br />
                      <p>Network transaction details.</p>
                    </summary>
                    <div>
                      <p><strong><code>code</code></strong> <small>number</small>
                        <br />Response code from the service provider.
                        <br /><small> Example: succeeded </small>
                      </p>
                      <p><strong><code>message</code></strong> <small>number</small>
                        <br />Response code from the service provider.
                        <br /><small> Example: Transaction Succeeded </small>
                      </p>
                    </div>
                  </details>
                  </details>
                </div>
              </details>
                <details class="yuno">
                  <summary><strong><code>stored_credentials</code></strong> <small>object</small>
                    <br />
                    <p>Indicates the processing type of the transaction.</p>
                  </summary>
                  <div>
                    <p><strong><code>reason</code></strong> <small>enum</small>
                      <br />Indicates the processing type of the transaction.Enum:CARD_ON_FILE, SUBSCRIPTION, UNSCHEDULED_CARD_ON_FILE
                      <br /><small> Example: SUBSCRIPTION </small>
                    </p>
                    <p><strong><code>usage</code></strong> <small>enum</small>
                      <br />This field Iets you indicate if this is the first time the vaulted_token/network_token is used for a payment or if it has already been used for a previous payment. Enum: FIRST, USED
                      <br /><small> Example: USED </small>
                    </p>
                    <p><strong><code>subscription_agreement_id</code></strong> <small>string</small>
                    <br />This field lets you indicate the identification of the agreement  with the customer for a subscription. Mainly for MX (MAX 255; MIN 3).
                    <br /><small> Example: AA0001 </small>
                  </p>
                    <p><strong><code>network_Transaction_id</code></strong> <small>string</small>
                    <br />Unique identifier assigned to a transaction by the card network. It is used to track and reference specific transactions, particularly in recurring payment scenarios, ensuring consistency and traceability across the payment lifecycle (MAX 255; MIN 3).
                    <br /><small> Example: 583103536844189 </small>
                  </p>
                  </div>
                </details>
                </div>
              </details>
              <details class="yuno">
                <summary><strong><code>wallet</code></strong> <small>object</small>
                  <br />
                  <p>Specifies the details of the payment method when using a wallet.</p>
                </summary>
                <div>
                  <p><strong><code>verify</code></strong> <small>boolean</small>
                    <br />Using amount = 0 and verify = true, you can verify the user's card without authorizing a real
                    amount.
                    <br /><small> Possible values: <code>True</code> or <code>False</code> </small>
                  </p>
       <p><strong><code>cryptogram</code></strong> <small>string</small>
                <br />Cryptogram for direct integrations with card wallets (MAX 526; MIN 3).
                <br /><small> </small>
              </p>
           <p><strong><code>capture</code></strong> <small>boolean</small>
                    <br />Decides whether to authorize the payment or capture it. Authorizing a card payment allows you
                    to
                    reserve funds in a customer's bank account.
                    <br /><small> Possible values: <code>True</code> or <code>False</code> </small>
                  </p>
                  <p><strong><code>installments</code></strong> <small>integer</small>
                    <br />The card installments (MAX 50; MIN 1).
                    <br /><small> Example: 3 </small>
                  </p>
                  <p><strong><code>payment_method_id</code></strong> <small>string</small>
                    <br />The user's payment method used in their wallet.
                    <br /><small> Example: credit_card </small>
                  </p>
                  <p><strong><code>detail</code></strong> <small>string</small>
                    <br />The payment method's detail used in their wallet.
                    <br /><small> Example: visa </small>
                  </p>
                  <p><strong><code>money_release_date</code></strong> <small>date</small>
                    <br />Date in which the money from the provider will be available to use.
                    <br /><small> Example: 2022-05-09T00:00:00.000000Z </small>
                  </p>
                  <p><strong><code>sponsor_id</code></strong> <small>string</small>
                    <br />Partner's provider account (MAX 255; MIN 3).
                    <br /><small> Example: 4562103 </small>
                  </p>
                  <p><strong><code>authorization_code</code></strong> <small>string</small>
                    <br />Acquire's response code.
                    <br /><small> Example: 742A64 </small>
                  </p>
                  <p><strong><code>expires_at</code></strong> <small>timestamp</small>
                <br />Payment methods expiration date. "yyyy-MM-dd HH:mm:ss.SSSz"
                <br /><small> Example: 2026-05-09T20:46:54.786342Z </small>
              </p>
                  <details class="yuno">
                    <summary><strong><code>customer_data</code></strong> <small>object</small>
                      <br />
                      <p>Specifies the details of the customer.</p>
                    </summary>
                    <div>
                      <p><strong><code>email</code></strong> <small>string</small>
                        <br />The customer's email (MAX 255; MIN 3).
                        <br /><small> Example: john.doe@email.com </small>
                      </p>
                      <p><strong><code>first_name</code></strong> <small>string</small>
                        <br />The customer's first name (MAX 32, MIN 8).
                        <br /><small> Example: John </small>
                      </p>
                      <p><strong><code>last_name</code></strong> <small>string</small>
                        <br />The customer's last name (MAX 32, MIN 8).
                        <br /><small> Example: Doe </small>
                      </p>
                      <p><strong><code>username</code></strong> <small>string</small>
                        <br />The customer's username in the platform (MAX 32, MIN 8).
                        <br /><small> Example: John_Doe_01 </small>
                      </p>
                      <p><strong><code>identification_type</code></strong> <small>string</small>
                        <br />The customer's document type (MAX 32, MIN 8).
                        <br /><small> Check the <a href="country-reference">
                            Country reference</a>. Example: DNI </small>
                      </p>
                      <p><strong><code>identification_number</code></strong> <small>string</small>
                        <br />The customer's identification number (MAX 32, MIN 8).
                        <br /><small> Example: 34566123 </small>
                      </p>
                    </div>
                  </details>

                  <details class="yuno">
                    <summary><strong><code>fee_details</code></strong> <small>object</small>
                      <br />
                      <p>Specifies the details of the fees.</p>
                    </summary>
                    <div>
                      <p><strong><code>amount</code></strong> <small>float</small>
                        <br />Amount of the transaction (multiple of 0.0001).
                        <br /><small> Example: 40.5 </small>
                      </p>
                    </div>
                  </details>

                  <details class="yuno">
                    <summary><strong><code>card_data</code></strong> <small>object</small>
                      <br />
                      <p>Specifies the details of the card.</p>
                    </summary>
                    <div>
                      <p><strong><code>iin</code></strong> <small>integer</small>
                        <br />The issuer identification number (IIN) refers to the first few digits of the payment card
                        number issued by a financial institution (MAX 8; MIN 6).
                        <br /><small> Example: 45079900 </small>
                      </p>
                      <p><strong><code>lfd</code></strong> <small>integer</small>
                        <br />The last four digits of the card (MAX 4; MIN 4).
                        <br /><small> Example: 0010 </small>
                      </p>
                      <p><strong><code>number_length</code></strong> <small>integer</small>
                        <br />The length of the card's number (MAX 19; MIN 8).
                        <br /><small> Example: 19 </small>
                      </p>
                      <p><strong><code>security_code_length</code></strong> <small>integer</small>
                        <br />The length of the card's security code (MAX 1; MIN 1).
                        <br /><small> Example: 3 </small>
                      </p>
                      <p><strong><code>brand</code></strong> <small>string</small>
                        <br />The card's brand information (MAX 255; MIN 3).
                        <br /><small> Example: visa </small>
                      </p>
                      <p><strong><code>holder_name</code></strong> <small>string</small>
                        <br />Card holder's full name as it appears on the card (MAX 26; MIN 3) only available for PCI
                        certified merchants.
                        <br /><small> Example: JOHN DOE </small>
                      </p>
                    </div>
                </div>
              </details>
              <details class="yuno">
                <summary><strong><code>bnpl</code></strong> <small>object</small>
                  <br />
                  <p>Specifies the details of the payment method when using BNPL.</p>
                </summary>
                <div>
                  <p><strong><code>installments</code></strong> <small>integer</small>
                    <br />The loan installments (MAX 50; MIN 1).
                    <br /><small> Example: 10 </small>
                  </p>
                  <p><strong><code>provider_image</code></strong> <small>string</small>
                    <br />The provider's URL (MAX 255; MIN 3).
                    <br /><small> Example: https://www.company.com/ </small>
                  </p>
                  <p><strong><code>redirect_url</code></strong> <small>string</small>
                    <br />The URL with the full version of the ticket in case you want to redirect your customer (MAX
                    255;
                    MIN
                    3).
                    <br /><small> Example: https://www.company.com/ticket_1231324 </small>
                  </p>
                  <p><strong><code>expires_at</code></strong> <small>timestamp</small>
                <br />Payment methods expiration date. "yyyy-MM-dd HH:mm:ss.SSSz"
                <br /><small> Example: 2026-05-09T20:46:54.786342Z </small>
              </p>
                  <details class="yuno">
                    <summary><strong><code>customer_data</code></strong> <small>object</small>
                      <br />
                      <p>Specifies the details of the customer.</p>
                    </summary>
                    <div>
                      <p><strong><code>name</code></strong> <small>string</small>
                        <br />The customer's legal name (MAX 32, MIN 8).
                        <br /><small> Example: Legal name</small>
                      </p>
                      <p><strong><code>username</code></strong> <small>string</small>
                        <br />Customer's username in the provider platform (MAX 32, MIN 8).
                        <br /><small> Example: Legal_name_01 </small>
                      </p>
                      <p><strong><code>tax_id_type</code></strong> <small>string</small>
                        <br />The customer's tax identifier (MAX 32, MIN 8).
                        <br /><small> Example: CUIT </small>
                      </p>
                      <p><strong><code>tax_id</code></strong> <small>string</small>
                        <br />The customer's tax identifier number (MAX 32, MIN 8).
                        <br /><small> Example: 20-34566123-7 </small>
                      </p>
                      <p><strong><code>type</code></strong> <small>string</small>
                        <br />The credit's type (MAX 255; MIN 3).
                        <br /><small> Example: PERSONAL/BUSINESS </small>
                      </p>
                      <p><strong><code>area</code></strong> <small>string</small>
                        <br />The customer's industry (MAX 255; MIN 3).
                        <br /><small> Example: OTHERS </small>
                      </p>
                      <p><strong><code>role</code></strong> <small>string</small>
                        <br />The customer's role in the company (MAX 255; MIN 3).
                        <br /><small> Example: OWNER </small>
                      </p>
                    </div>
                  </details>
                </div>
              </details>

              <details class="yuno">
                <summary><strong><code>bank_transfer</code></strong> <small>object</small>
                  <br />
                  <p>Specifies the details of the payment method when using bank transfer.</p>
                </summary>
                <div>
                  <p><strong><code>provider_image</code></strong> <small>string</small>
                    <br />The provider's URL (MAX 255; MIN 3).
                    <br /><small> Example: https://www.company.com/logo </small>
                  </p>
                  <p><strong><code>account_type</code></strong> <small>string</small>
                    <br />Type of the bank account (MAX 255; MIN 3).
                    <br /><small> Example: CHECKINGS/SAVINGS </small>
                  </p>
                  <p><strong><code>bank_name</code></strong> <small>string</small>
                    <br />Name of the bank associated with the account (MAX 255; MIN 3).
                    <br /><small> Example: Banco Galicia </small>
                  </p>
                  <p><strong><code>beneficiary_name</code></strong> <small>string</small>
                    <br />The name of the account holder (MAX 255; MIN 3).
                    <br /><small> Example: John Doe </small>
                  </p>
                  <p><strong><code>bank_account</code></strong> <small>string</small>
                    <br />The number of the bank account (MAX 255; MIN 3).
                    <br /><small> Example: 54653211313333 </small>
                  </p>
                  <p><strong><code>bank_account_2</code></strong> <small>string</small>
                    <br />The secondary number of the bank account (MAX 255; MIN 3).
                    <br /><small> Example: 78900000000123 </small>
                  </p>
                  <p><strong><code>beneficiary_document_type</code></strong> <small>string</small>
                    <br />Document type of the account holder (MAX 255; MIN 3).
                    <br /><small> Possible values: Check the <a href="country-reference">
                        Country reference</a>. Example: DNI </small>
                  </p>
                  <p><strong><code>beneficiary_document</code></strong> <small>string</small>
                    <br />Document number of the account holder (MAX 255; MIN 3).
                    <br /><small> Example: 54666897 </small>
                  </p>
                   <p><strong><code>reference</code></strong> <small>string</small>
                    <br />Reference code for the user (MAX 255; MIN 3).
                    <br /><small> Example: AA01234-BC </small>
                  </p>
                  <p><strong><code>retrieval_reference_number</code></strong> <small>string</small>
                    <br />The unique identifier assigned by an acquirer to an authorization.In case of Brazil, you'll receive the nsu. 
                    <br /><small> Example: 200000000012 </small>
                  </p>
                  <p><strong><code>payment_instruction</code></strong> <small>string</small>
                    <br />Payments instructions related to the payment (MAX 255; MIN 3).
                    <br /><small> Example: Go to your bank account and transfer the amount using the reference detailed
                      below
                    </small>
                  </p>
                  <p><strong><code>redirect_url</code></strong> <small>string</small>
                    <br />The URL with the full version of the ticket in case you want to redirect your customer (MAX
                    255;
                    MIN
                    3).
                    <br /><small> Example: https://www.company.com/ticket_1231324 </small>
                  </p>
                  <p><strong><code>expires_at</code></strong> <small>timestamp</small>
                <br />Payment methods expiration date. "yyyy-MM-dd HH:mm:ss.SSSz"
                <br /><small> Example: 2026-05-09T20:46:54.786342Z </small>
              </p>
                </div>
              </details>

              <details class="yuno">
                <summary><strong><code>ticket</code></strong> <small>object</small>
                  <br />
                  <p>Specifies the details of the payment method when using ticket.</p>
                </summary>
                <div>
                  <p><strong><code>type</code></strong> <small>string</small>
                    <br />The ticket's type.
                    <br /><small> Example: number, barcode, custom, reference_code, qr </small>
                  </p>
                  <p><strong><code>benefit_type</code></strong> <small>enum</small>
                    <br />User´s benefit type for ticket payment method. JUNAEB, PRIVATE
                    <br /><small> Example: PRIVATE </small>
                  </p>
                  
                  <p><strong><code>provider_number</code></strong> <small>integer</small>
                    <br />The ticket's number.
                    <br /><small> Example: 13141 </small>
                  </p>
                  <p><strong><code>provider_barcode</code></strong> <small>integer</small>
                    <br />The ticket's barcode.
                    <br /><small> Example: 456789009878765u7654 </small>
                  </p>
                  <p><strong><code>provider_logo</code></strong> <small>string</small>
                    <br />The ticket's logo.
                    <br /><small> Example: https://www.company.com/logo </small>
                  </p>
                  <p><strong><code>provider_format</code></strong> <small>string</small>
                    <br />The ticket's format.
                    <br /><small> Example: barcode, custom </small>
                  </p>
                  <p><strong><code>payment_instruction</code></strong> <small>string</small>
                    <br />Payments instructions related to the payment (MAX 255; MIN 3).
                    <br /><small> Example: Go to your closest store and pay the total amount using the reference detailed below </small>
                  </p>
                  <!-- <p><strong><code>id</code></strong> <small>integer</small>
                    <br />The ticket's id.
                    <br /><small> Example: 09812 </small>
                  </p> -->
                  <p><strong><code>redirect_url</code></strong> <small>string</small>
                    <br />The URL with the full version of the ticket.
                    <br /><small> Example: https://www.company.com/ticket_1231324 </small>
                  </p>
                  <p><strong><code>expires_at</code></strong> <small>timestamp</small>
                <br />Payment methods expiration date. "yyyy-MM-dd HH:mm:ss.SSSz"
                <br /><small> Example: 2026-05-09T20:46:54.786342Z </small>
              </p>
              </details>



              <details class="yuno">
                <summary><strong><code>payment_link</code></strong> <small>object</small>
                  <br />
                  <p>Specifies the details of the payment method when using a payment link.</p>
                </summary>
                <div>
                  <p><strong><code>verify</code></strong> <small>boolean</small>
                    <br />Using amount = 0 and verify = true, you can verify the user's card without authorizing a real
                    amount.
                    <br /><small> Possible values: <code>True</code> or <code>False</code> </small>
                  </p>
                  <p><strong><code>capture</code></strong> <small>boolean</small>
                    <br />Decides whether to authorize the payment or capture it. Authorizing a card payment allows you
                    to
                    reserve funds in a customer's bank account.
                    <br /><small> Possible values: <code>True</code> or <code>False</code> </small>
                  </p>
                  <p><strong><code>expires_at</code></strong> <small>timestamp</small>
                <br />Payment methods expiration date. "yyyy-MM-dd HH:mm:ss.SSSz"
                <br /><small> Example: 2026-05-09T20:46:54.786342Z </small>
              </p>
                  <p><strong><code>installments</code></strong> <small>integer</small>
                    <br />The card installments (MAX 50; MIN 1).
                    <br /><small> Example: 3 </small>
                  </p>
                  <p><strong><code>payment_method_id</code></strong> <small>string</small>
                    <br />The user's payment method used in their wallet.
                    <br /><small> Example: credit_card </small>
                  </p>
                  <p><strong><code>detail</code></strong> <small>string</small>
                    <br />The payment method's detail used in their wallet.
                    <br /><small> Example: visa </small>
                  </p>
                                    <p><strong><code>money_release_date</code></strong> <small>date</small>
                    <br />Date in which the money from the provider will be available to use.
                    <br /><small> Example: 2022-05-09T00:00:00.000000Z </small>
                  </p>
                  <p><strong><code>sponsor_id</code></strong> <small>string</small>
                    <br />Partner's provider account (MAX 255; MIN 3).
                    <br /><small> Example: 4562103 </small>
                  </p>
                  <p><strong><code>authorization_code</code></strong> <small>string</small>
                    <br />Acquire's response code.
                    <br /><small> Example: 742A64 </small>
                  </p>
                  <!-- <p><strong><code>redirect_url</code></strong> <small>string</small>
                        <br />The URL with the full version of the payment.
                        <br /><small> Example: https://www.company.com/payment_link_1231324 </small>
                      </p>-->
                  <details class="yuno">
                    <summary><strong><code>customer_data</code></strong> <small>object</small>
                      <br />
                      <p>Specifies the details of the customer.</p>
                    </summary>
                    <div>
                      <p><strong><code>email</code></strong> <small>string</small>
                        <br />The customer's email (MAX 255; MIN 3).
                        <br /><small> Example: john.doe@email.com </small>
                      </p>
                      <p><strong><code>first_name</code></strong> <small>string</small>
                        <br />The customer's first name (MAX 32, MIN 8).
                        <br /><small> Example: John </small>
                      </p>
                      <p><strong><code>last_name</code></strong> <small>string</small>
                        <br />The customer's last name (MAX 32, MIN 8).
                        <br /><small> Example: Doe </small>
                      </p>
                      <p><strong><code>username</code></strong> <small>string</small>
                        <br />The customer's username in the platform (MAX 32, MIN 8).
                        <br /><small> Example: John_Doe_01 </small>
                      </p>
                      <p><strong><code>identification_type</code></strong> <small>string</small>
                        <br />The customer's document type (MAX 32, MIN 8).
                        <br /><small> Possible values: Check the <a href="country-reference">
                            Document type list</a>. Example: DNI </small>
                      </p>
                      <p><strong><code>identification_number</code></strong> <small>string</small>
                        <br />The customer's identification number (MAX 32, MIN 8).
                        <br /><small> Example: 34566123 </small>
                      </p>

                    </div>
                  </details>

                  <details class="yuno">
                    <summary><strong><code>fee_details</code></strong> <small>object</small>
                      <br />
                      <p>Specifies the details of the fees.</p>
                    </summary>
                    <div>
                      <p><strong><code>amount</code></strong> <small>float</small>
                        <br />Amount of the transaction (multiple of 0.0001).
                        <br /><small> Example: 40.5 </small>
                      </p>
                    </div>
                  </details>

                  <details class="yuno">
                    <summary><strong><code>card_data</code></strong> <small>object</small>
                      <br />
                      <p>Specifies the details of the card.</p>
                    </summary>
                    <div>
                      <p><strong><code>iin</code></strong> <small>integer</small>
                        <br />The issuer identification number (IIN) refers to the first few digits of the payment card
                        number issued by a financial institution (MAX 8; MIN 6).
                        <br /><small> Example: 45079900 </small>
                      </p>
                      <p><strong><code>lfd</code></strong> <small>integer</small>
                        <br />The last four digits of the card (MAX 4; MIN 4).
                        <br /><small> Example: 0010 </small>
                      </p>
                      <p><strong><code>number_length</code></strong> <small>integer</small>
                        <br />The length of the card's number (MAX 19; MIN 8).
                        <br /><small> Example: 19 </small>
                      </p>
                      <p><strong><code>security_code_length</code></strong> <small>integer</small>
                        <br />The length of the card's security code (MAX 1; MIN 1).
                        <br /><small> Example: 3 </small>
                      </p>
                      <p><strong><code>brand</code></strong> <small>string</small>
                        <br />The card's brand information (MAX 255; MIN 3).
                        <br /><small> Example: visa </small>
                      </p>
                      <p><strong><code>holder_name</code></strong> <small>string</small>
                        <br />Card holder's full name as it appears on the card (MAX 26; MIN 3) only available for PCI
                        certified merchants.
                        <br /><small> Example: John Doe </small>
                      </p>
                    </div>
                  </details>
                </div>
              </details>


            </div>
          </details>



        </div>
      </details>

      <p><strong><code>response_code</code></strong> <small>string</small>
        <br />The code that represents the response of the te outcome of the transaction.
        <br /><small> Example: SUCCEEDED </small>
      </p>

      <p><strong><code>response_message</code></strong> <small>string</small>
        <br />The description of the response_code.
        <br /><small> Example: Transaction successful </small>
      </p>

      <p><strong><code>reason</code></strong> <small>string</small>
        <br />The reason for the transaction. Applies to secondary transactions, such as refunds or captures.
        <br /><small> Example: REQUESTED_BY_CUSTOMER </small>
      </p>

      <p><strong><code>description</code></strong> <small>string</small>
        <br />The description of the payment (MAX 255; MIN 3).
        <br /><small> Example: Purchase on web </small>
      </p>

      <p><strong><code>merchant_reference</code></strong> <small>string</small>
        <br />The reference generated by the merchant to identify the payment/transaction.
        <br /><small> Example: AA01</small>
      </p>

      <details class="yuno">
        <summary>
          <strong><code>provider_data</code></strong> <small>object</small>
          <br />
          <p>Specifies the provider data that processed the payment.</p>
        </summary>
        <div>
          <p><strong><code>id</code></strong> <small>string</small>
            <br />The provider id that processed the payment.
            <br /><small> Example: DLOCAL </small>
          </p>

          <p><strong><code>transaction_id</code></strong> <small>string</small>
            <br />The id of the transaction from the provider.
            <br /><small> Example: 5a1fa541-5fa2-496e-9fdc-29b34e09a107 </small>
          </p>

          <p><strong><code>third_party_account_id</code></strong> <small>string</small>
            <br />The id of the account from the processor of the provider. If applies.
            <br /><small> Example: AA001298 </small>
          </p>
          <p><strong><code>third_party_transaction_id</code></strong> <small>string</small>
            <br />The id of the transaction from the processor of the provider. If applies.
            <br /><small> Example: 1309982 </small>
          </p>


          <p><strong><code>account_id</code></strong> <small>string</small>
            <br />The unique identifier of the account (MAX 64; MIN 36).
            <br /><small> Example: 9104911d-5df9-429e-8488-ad41abea1a4b </small>
          </p>

          <p><strong><code>status</code></strong> <small>enum</small>
            <br />The status of the transaction.
            <br /><small> Example: SUCCEEDED </small>
          </p>

          <p><strong><code>status_detail</code></strong> <small>string</small>
            <br />The status_detail of the transaction.
            <br /><small> Example: APPROVED </small>
          </p>

          <p><strong><code>response_code</code></strong> <small>string</small>
            <br />The code that represents the response of the te outcome of the transaction from the provider.
            <br /><small> Example: SUCCEEDED </small>
          </p>

          <p><strong><code>response_message</code></strong> <small>string</small>
            <br />Message to provide additional information regarding the operation status.
            <br /><small> Example: Successful transaction </small>
          </p>

          <p><strong><code>iso8583_response_code</code></strong> <small>object</small>
            <br />The code of the international standard for financial transaction card originated interchange messaging (<a href="https://en.wikipedia.org/wiki/ISO_8583">ISO 8583</a>).
            <br /><small> Example: 00 </small>
          </p>
          <p><strong><code>iso8583_response_message</code></strong> <small>object</small>
            <br />The message of the international standard for financial transaction card originated interchange messaging (<a href="https://en.wikipedia.org/wiki/ISO_8583">ISO 8583</a>).
            <br /><small> Example: Approved or completed successfully </small>
          </p>

          <p><strong><code>raw_notification</code></strong> <small>array of object</small>
            <br />The direct notification from the provider for the transaction. The format of the object depends on the
            provider's response.
            <br /><small> Example: JSON, XML, string </small>
          </p>

          <details class="yuno">
            <summary><strong><code>detail</code></strong> <small>object</small>
              <br />
              <p>Specifies the payment method detail object returned by the provider, which specifies the details of the
                different transaction
                category types.</p>
            </summary>
            <div>
              <details class="yuno">
                <summary><strong><code>card</code></strong> <small>object</small>
                  <br />
                  <p>Specifies the details of the payment method when using a card.</p>
                </summary>
                <div>
                  <p><strong><code>verify</code></strong> <small>boolean</small>
                    <br /> Using amount = 0 and verify = true, you can verify the user's card without authorizing a real
                    amount.
                    <br /><small> Possible values: <code>True</code> or <code>False</code> </small>
                  </p>

                  <p><strong><code>capture</code></strong> <small>boolean</small>
                    <br />Decides whether to authorize the payment or capture it. Authorizing a card payment allows you
                    to
                    reserve funds in a customer's bank account.
                    <br /><small> Possible values: <code>True</code> or <code>False</code> </small>
                  </p>

                  <p><strong><code>installments</code></strong> <small>integer</small>
                    <br />The card installments (MAX 50; MIN 1).
                    <br /><small> Example: 3 </small>
                  </p>

                  <p><strong><code>first_installments_deferral</code></strong> <small>integer</small>
                    <br />Number of months to wait to debit the first installment.
                    <br /><small> Example: 1 </small>
                  </p>

                  <p><strong><code>installments_type</code></strong> <small>string</small>
                    <br />Type of installments used in the card payment.
                    <br /><small> Example: string </small>
                  </p>

                  <p><strong><code>installments_amount</code></strong> <small>integer</small>
                    <br />The installment amount includes interests associated with the installment and the information
                    is
                    defined by the provider.
                    <br /><small> Example: 3 </small>
                  </p>

                  <p><strong><code>soft_descriptor</code></strong> <small>string</small>
                    <br />The descriptor passed per transaction to out platform. It will be presented on the customer's
                    physical bank statement (MAX 15; MIN 0).
                    <br /><small> Example: COMPANY1 </small>
                  </p>

                  <p><strong><code>authorization_code</code></strong> <small>string</small>
                    <br />The acquirer's response code.
                    <br /><small> Example: 742A64 </small>
                  </p>

                  <p><strong><code>retrieval_reference_number</code></strong> <small>integer</small>
                    <br />The unique identifier assigned by an acquirer to an authorization. In case of Brazil, you'll receive the nsu.
                    <br /><small> Example: 200000000012 </small>
                  </p>

                  <p><strong><code>voucher</code></strong> <small>string</small>
                    <br />The unique identifier of the payment receipt assigned by the issuing bank for a card
                    transaction.
                    This field is empty if the gateway does not provide information about the transaction (MAX 255; MIN
                    3).
                    <br /><small> Example: 43564 </small>
                  </p>

                  <details class="yuno">
                    <summary><strong><code>card_data</code></strong> <small>object</small>
                      <br />
                      <p>Specifies the details of the card.</p>
                    </summary>
                    <div>
                      <!-- <p><strong><code>number</code></strong> <small>string</small>
                        <br /> Card's number without any separators (MAX 19; MIN 8) only available for PCI certified
                        merchants.
                        <br /><small> Example: 4507990000000010 </small>
                      </p>
                      <p><strong><code>expiration_month</code></strong> <small>integer</small>
                        <br />Card's expiration month (MM) (MAX 2; MIN 2) only available for PCI certified merchants.
                        <br /><small> Example: 03 </small>
                      </p>
                      <p><strong><code>expiration_year</code></strong> <small>integer</small>
                        <br />Card's expiration year (YYYY) (MAX 4; MIN 2) only available for PCI certified merchants.
                        <br /><small> Example: 2030 </small>
                      </p>
                      <p><strong><code>security_code</code></strong> <small>integer</small>
                        <br />Card's security code (MAX 4; MIN 3) only available for PCI certified merchants.
                        <br /><small> Example: 123 </small>
                      </p> -->
                      <p><strong><code>holder_name</code></strong> <small>string</small>
                        <br />Card holder's full name as it appears on the card (MAX 26; MIN 3) only available for PCI
                        certified merchants.
                        <br /><small> Example: Fannie Weissnat </small>
                      </p>
                      <p><strong><code>iin</code></strong> <small>integer</small>
                        <br />The issuer identification number (IIN) refers to the first few digits of the payment card
                        number issued by a financial institution (MAX 8; MIN 6).
                        <br /><small> Example: 41961111 </small>
                      </p>
                      <p><strong><code>lfd</code></strong> <small>integer</small>
                        <br />The last four digits of the card (MAX 4; MIN 4).
                        <br /><small> Example: 0010 </small>
                      </p>
                      <p><strong><code>number_length</code></strong> <small>integer</small>
                        <br />The length of the card's number (MAX 2; MIN 1).
                        <br /><small> Example: 16 </small>
                      </p>
                      <p><strong><code>security_code_length</code></strong> <small>integer</small>
                        <br />The length of the card's security code (MAX 1; MIN 1).
                        <br /><small> Example: 3 </small>
                      </p>
                      <p><strong><code>brand</code></strong> <small>string</small>
                        <br />The card's brand information (MAX 255; MIN 3).
                        <br /><small> Example: VISA </small>
                      </p>
                      <p><strong><code>issuer_name</code></strong> <small>string</small>
                        <br />The card's issuer (MAX 255; MIN 3).
                        <br /><small> Example: Banco Galicia </small>
                      </p>
                      <p><strong><code>category</code></strong> <small>string</small>
                        <br />The category of the card's issuer (MAX 255; MIN 3).
                        <br /><small> Example: Gold </small>
                      </p>
                      <p><strong><code>type</code></strong> <small>string</small>
                        <br />The type of the card's issuer (MAX 255; MIN 3).
                        <br /><small> Example: CREDIT, DEBIT, or CHARGE_CARD </small>
                      </p>

                    </div>
                  </details>
                </div>
              </details>
              <details class="yuno">
                <summary><strong><code>wallet</code></strong> <small>object</small>
                  <br />
                  <p>Specifies the details of the payment method when using a wallet.</p>
                </summary>
                <div>
                  <p><strong><code>verify</code></strong> <small>boolean</small>
                    <br />Using amount = 0 and verify = true, you can verify the user's card without authorizing a real
                    amount.
                    <br /><small> Possible values: <code>True</code> or <code>False</code> </small>
      <p><strong><code>cryptogram</code></strong> <small>string</small>
                <br />Cryptogram for direct integrations with card wallets (MAX 526; MIN 3).
                <br /><small> </small>
              </p>
            </p>
                  <p><strong><code>capture</code></strong> <small>boolean</small>
                    <br />Decides whether to authorize the payment or capture it. Authorizing a card payment allows you
                    to
                    reserve funds in a customer's bank account.
                    <br /><small> Possible values: <code>True</code> or <code>False</code> </small>
                  </p>
                  <p><strong><code>installments</code></strong> <small>integer</small>
                    <br />The card installments (MAX 50; MIN 1).
                    <br /><small> Example: 3 </small>
                  </p>
                  <p><strong><code>payment_method_id</code></strong> <small>string</small>
                    <br />The user's payment method used in their wallet.
                    <br /><small> Example: credit_card </small>
                  </p>
                  <p><strong><code>detail</code></strong> <small>string</small>
                    <br />The payment method's detail used in their wallet.
                    <br /><small> Example: visa </small>
                  </p>
                                   <p><strong><code>money_release_date</code></strong> <small>date</small>
                    <br />Date in which the money from the provider will be available to use.
                    <br /><small> Example: 2022-05-09T00:00:00.000000Z </small>
                  </p>
                  <p><strong><code>sponsor_id</code></strong> <small>string</small>
                    <br />Partner's provider account (MAX 255; MIN 3).
                    <br /><small> Example: 4562103 </small>
                  </p>
                  <p><strong><code>authorization_code</code></strong> <small>string</small>
                    <br />Acquire's response code.
                    <br /><small> Example: 742A64 </small>
                  </p>
                  <details class="yuno">
                    <summary><strong><code>customer_data</code></strong> <small>object</small>
                      <br />
                      <p>Specifies the details of the customer.</p>
                    </summary>
                    <div>
                      <p><strong><code>email</code></strong> <small>string</small>
                        <br />The customer's email (MAX 255; MIN 3).
                        <br /><small> Example: john.doe@email.com </small>
                      </p>
                      <p><strong><code>first_name</code></strong> <small>string</small>
                        <br />The customer's first name (MAX 32, MIN 8).
                        <br /><small> Example: John </small>
                      </p>
                      <p><strong><code>last_name</code></strong> <small>string</small>
                        <br />The customer's last name (MAX 32, MIN 8).
                        <br /><small> Example: Doe </small>
                      </p>
                      <p><strong><code>username</code></strong> <small>string</small>
                        <br />The customer's username in the platform (MAX 32, MIN 8).
                        <br /><small> Example: John_Doe_01 </small>
                      </p>
                      <p><strong><code>identification_type</code></strong> <small>string</small>
                        <br />The customer's document type (MAX 32, MIN 8).
                        <br /><small> Check the <a href="country-reference">
                            Country reference</a>. Example: DNI </small>
                      </p>
                      <p><strong><code>identification_number</code></strong> <small>string</small>
                        <br />The customer's identification number (MAX 32, MIN 8).
                        <br /><small> Example: 34566123 </small>
                      </p>
                    </div>
                  </details>

                  <details class="yuno">
                    <summary><strong><code>fee_details</code></strong> <small>object</small>
                      <br />
                      <p>Specifies the details of the fees.</p>
                    </summary>
                    <div>
                      <p><strong><code>amount</code></strong> <small>float</small>
                        <br />Amount of the transaction (multiple of 0.0001).
                        <br /><small> Example: 40.5 </small>
                      </p>
                    </div>
                  </details>

                  <details class="yuno">
                    <summary><strong><code>card_data</code></strong> <small>object</small>
                      <br />
                      <p>Specifies the details of the card.</p>
                    </summary>
                    <div>
                      <p><strong><code>iin</code></strong> <small>integer</small>
                        <br />The issuer identification number (IIN) refers to the first few digits of the payment card
                        number issued by a financial institution (MAX 8; MIN 6).
                        <br /><small> Example: 45079900 </small>
                      </p>
                      <p><strong><code>lfd</code></strong> <small>integer</small>
                        <br />The last four digits of the card (MAX 4; MIN 4).
                        <br /><small> Example: 0010 </small>
                      </p>
                      <p><strong><code>number_length</code></strong> <small>integer</small>
                        <br />The length of the card's number (MAX 19; MIN 8).
                        <br /><small> Example: 19 </small>
                      </p>
                      <p><strong><code>security_code_length</code></strong> <small>integer</small>
                        <br />The length of the card's security code (MAX 1; MIN 1).
                        <br /><small> Example: 3 </small>
                      </p>
                      <p><strong><code>brand</code></strong> <small>string</small>
                        <br />The card's brand information (MAX 255; MIN 3).
                        <br /><small> Example: visa </small>
                      </p>
                      <p><strong><code>holder_name</code></strong> <small>string</small>
                        <br />Card holder's full name as it appears on the card (MAX 26; MIN 3) only available for PCI
                        certified merchants.
                        <br /><small> Example: JOHN DOE </small>
                      </p>
                    </div>
                </div>
              </details>
              <details class="yuno">
                <summary><strong><code>bnpl</code></strong> <small>object</small>
                  <br />
                  <p>Specifies the details of the payment method when using BNPL.</p>
                </summary>
                <div>
                  <p><strong><code>installments</code></strong> <small>integer</small>
                    <br />The loan installments (MAX 50; MIN 1).
                    <br /><small> Example: 10 </small>
                  </p>
                  <p><strong><code>provider_image</code></strong> <small>string</small>
                    <br />The provider's URL (MAX 255; MIN 3).
                    <br /><small> Example: https://www.company.com/logo </small>
                  </p>
                  <p><strong><code>redirect_url</code></strong> <small>string</small>
                    <br />The URL with the full version of the ticket in case you want to redirect your customer (MAX
                    255;
                    MIN
                    3).
                    <br /><small> Example: https://www.company.com/ticket_1231324 </small>
                  </p>
                  <details class="yuno">
                    <summary><strong><code>customer_data</code></strong> <small>object</small>
                      <br />
                      <p>Specifies the details of the customer.</p>
                    </summary>
                    <div>
                      <p><strong><code>name</code></strong> <small>string</small>
                        <br />The customer's legal name (MAX 32, MIN 8).
                        <br /><small> Example: Legal name</small>
                      </p>
                      <p><strong><code>username</code></strong> <small>string</small>
                        <br />Customer's username in the provider platform (MAX 32, MIN 8).
                        <br /><small> Example: Legal_name_01 </small>
                      </p>
                      <p><strong><code>tax_id_type</code></strong> <small>string</small>
                        <br />The customer's tax identifier (MAX 32, MIN 8).
                        <br /><small> Example: CUIT </small>
                      </p>
                      <p><strong><code>tax_id</code></strong> <small>string</small>
                        <br />The customer's tax identifier number (MAX 32, MIN 8).
                        <br /><small> Example: 20-34566123-7 </small>
                      </p>
                      <p><strong><code>type</code></strong> <small>string</small>
                        <br />The credit's type (MAX 255; MIN 3).
                        <br /><small> Example: PERSONAL/BUSINESS </small>
                      </p>
                      <p><strong><code>area</code></strong> <small>string</small>
                        <br />The customer's industry (MAX 255; MIN 3).
                        <br /><small> Example: OTHERS </small>
                      </p>
                      <p><strong><code>role</code></strong> <small>string</small>
                        <br />The customer's role in the company (MAX 255; MIN 3).
                        <br /><small> Example: OWNER </small>
                      </p>
                    </div>
                  </details>
                </div>
              </details>

              <details class="yuno">
                <summary><strong><code>bank_transfer</code></strong> <small>object</small>
                  <br />
                  <p>Specifies the details of the payment method when using bank transfer.</p>
                </summary>
                <div>
                  <p><strong><code>provider_image</code></strong> <small>string</small>
                    <br />The provider's URL (MAX 255; MIN 3).
                    <br /><small> Example: https://www.company.com/ </small>
                  </p>
                  <p><strong><code>account_type</code></strong> <small>string</small>
                    <br />Type of the bank account (MAX 255; MIN 3).
                    <br /><small> Example: CHECKINGS/SAVINGS </small>
                  </p>
                  <p><strong><code>bank_name</code></strong> <small>string</small>
                    <br />Name of the bank associated with the account (MAX 255; MIN 3).
                    <br /><small> Example: Banco Galicia </small>
                  </p>
                  <p><strong><code>beneficiary_name</code></strong> <small>string</small>
                    <br />The name of the account holder (MAX 255; MIN 3).
                    <br /><small> Example: John Doe </small>
                  </p>
                  <p><strong><code>bank_account</code></strong> <small>string</small>
                    <br />The number of the bank account (MAX 255; MIN 3).
                    <br /><small> Example: 54653211313333 </small>
                  </p>
                  <p><strong><code>bank_account_2</code></strong> <small>string</small>
                    <br />The secondary number of the bank account (MAX 255; MIN 3).
                    <br /><small> Example: 78900000000123 </small>
                  </p>
                  <p><strong><code>beneficiary_document_type</code></strong> <small>string</small>
                    <br />Document type of the account holder (MAX 255; MIN 3).
                    <br /><small> Possible values: Check the <a href="country-reference">
                        Country reference</a>. Example: DNI </small>
                  </p>
                  <p><strong><code>beneficiary_document</code></strong> <small>string</small>
                    <br />Document number of the account holder (MAX 255; MIN 3).
                    <br /><small> Example: 54666897 </small>
                  </p>
                  <!-- <p><strong><code>reference</code></strong> <small>string</small>
                    <br />Reference code for the user (MAX 255; MIN 3).
                    <br /><small> Example: AA01234-BC </small>
                  </p> -->
                  <p><strong><code>payment_instruction</code></strong> <small>string</small>
                    <br />Payments instructions related to the payment (MAX 255; MIN 3).
                    <br /><small> Example: Go to your bank account and transfer the amount using the reference detailed
                      below
                    </small>
                  </p>
                  <p><strong><code>redirect_url</code></strong> <small>string</small>
                    <br />The URL with the full version of the ticket in case you want to redirect your customer (MAX
                    255;
                    MIN
                    3).
                    <br /><small> Example: https://www.company.com/ticket_1231324 </small>
                  </p>
                </div>
              </details>

              <details class="yuno">
                <summary><strong><code>ticket</code></strong> <small>object</small>
                  <br />
                  <p>Specifies the details of the payment method when using ticket.</p>
                </summary>
                <div>
                  <p><strong><code>type</code></strong> <small>string</small>
                    <br />The ticket's type.
                    <br /><small> Example: number, barcode, custom, reference_code, qr </small>
                  </p>
                  
                  <p><strong><code>provider_number</code></strong> <small>integer</small>
                    <br />The ticket's number.
                    <br /><small> Example: 13141 </small>
                  </p>
                  <p><strong><code>provider_barcode</code></strong> <small>integer</small>
                    <br />The ticket's barcode.
                    <br /><small> Example: 456789009878765u7654 </small>
                  </p>
                  <p><strong><code>provider_logo</code></strong> <small>string</small>
                    <br />The ticket's logo.
                    <br /><small> Example: https://www.company.com/logo </small>
                  </p>
                  <p><strong><code>provider_format</code></strong> <small>string</small>
                    <br />The ticket's format.
                    <br /><small> Example: barcode, custom </small>
                  </p>
                  <!-- <p><strong><code>id</code></strong> <small>integer</small>
                    <br />The ticket's id.
                    <br /><small> Example: 09812 </small>
                  </p> -->
                  <p><strong><code>redirect_url</code></strong> <small>string</small>
                    <br />The url with the full version of the ticket.
                    <br /><small> Example: https://www.company.com/ticket_1231324 </small>
                  </p>
              </details>



              <details class="yuno">
                <summary><strong><code>payment_link</code></strong> <small>object</small>
                  <br />
                  <p>Specifies the details of the payment method when using a payment link.</p>
                </summary>
                <div>
                  <p><strong><code>verify</code></strong> <small>boolean</small>
                    <br />Using amount = 0 and verify = true, you can verify the user's card without authorizing a real
                    amount.
                    <br /><small> Possible values: <code>True</code> or <code>False</code> </small>
                  </p>
                  <p><strong><code>capture</code></strong> <small>boolean</small>
                    <br />Decides whether to authorize the payment or capture it. Authorizing a card payment allows you
                    to
                    reserve funds in a customer's bank account.
                    <br /><small> Possible values: <code>True</code> or <code>False</code> </small>
                  </p>
                  <p><strong><code>installments</code></strong> <small>integer</small>
                    <br />The card installments (MAX 50; MIN 1).
                    <br /><small> Example: 3 </small>
                  </p>
                  <p><strong><code>payment_method_id</code></strong> <small>string</small>
                    <br />The user's payment method used in their wallet.
                    <br /><small> Example: credit_card </small>
                  </p>
                  <p><strong><code>detail</code></strong> <small>string</small>
                    <br />The payment method's detail used in their wallet.
                    <br /><small> Example: visa </small>
                  </p>
                                    <p><strong><code>money_release_date</code></strong> <small>date</small>
                    <br />Date in which the money from the provider will be available to use.
                    <br /><small> Example: 2022-05-09T00:00:00.000000Z </small>
                  </p>
                  <p><strong><code>sponsor_id</code></strong> <small>string</small>
                    <br />Partner's provider account (MAX 255; MIN 3).
                    <br /><small> Example: 4562103 </small>
                  </p>
                  <p><strong><code>authorization_code</code></strong> <small>string</small>
                    <br />Acquire's response code.
                    <br /><small> Example: 742A64 </small>
                  </p>
                  <!-- <p><strong><code>redirect_url</code></strong> <small>string</small>
                        <br />The url with the full version of the payment.
                        <br /><small> Example: https://www.company.com/payment_link_1231324 </small>
                      </p>-->
                  <details class="yuno">
                    <summary><strong><code>customer_data</code></strong> <small>object</small>
                      <br />
                      <p>Specifies the details of the customer.</p>
                    </summary>
                    <div>
                      <p><strong><code>email</code></strong> <small>string</small>
                        <br />The customer's email (MAX 255; MIN 3).
                        <br /><small> Example: john.doe@email.com </small>
                      </p>
                      <p><strong><code>first_name</code></strong> <small>string</small>
                        <br />The customer's first name (MAX 32, MIN 8).
                        <br /><small> Example: John </small>
                      </p>
                      <p><strong><code>last_name</code></strong> <small>string</small>
                        <br />The customer's last name (MAX 32, MIN 8).
                        <br /><small> Example: Doe </small>
                      </p>
                      <p><strong><code>username</code></strong> <small>string</small>
                        <br />The customer's username in the platform (MAX 32, MIN 8).
                        <br /><small> Example: John_Doe_01 </small>
                      </p>
                      <p><strong><code>identification_type</code></strong> <small>string</small>
                        <br />The customer's document type (MAX 32, MIN 8).
                        <br /><small> Possible values: Check the <a href="country-reference">
                            Country reference</a>. Example: DNI </small>
                      </p>
                      <p><strong><code>identification_number</code></strong> <small>string</small>
                        <br />The customer's identification number (MAX 32, MIN 8).
                        <br /><small> Example: 34566123 </small>
                      </p>

                    </div>
                  </details>

                  <details class="yuno">
                    <summary><strong><code>fee_details</code></strong> <small>object</small>
                      <br />
                      <p>Specifies the details of the fees.</p>
                    </summary>
                    <div>
                      <p><strong><code>amount</code></strong> <small>float</small>
                        <br />Amount of the transaction (multiple of 0.0001).
                        <br /><small> Example: 40.5 </small>
                      </p>
                    </div>
                  </details>

                  <details class="yuno">
                    <summary><strong><code>card_data</code></strong> <small>object</small>
                      <br />
                      <p>Specifies the details of the card.</p>
                    </summary>
                    <div>
                      <p><strong><code>iin</code></strong> <small>integer</small>
                        <br />The issuer identification number (IIN) refers to the first few digits of the payment card
                        number issued by a financial institution (MAX 8; MIN 6).
                        <br /><small> Example: 45079900 </small>
                      </p>
                      <p><strong><code>lfd</code></strong> <small>integer</small>
                        <br />The last four digits of the card (MAX 4; MIN 4).
                        <br /><small> Example: 0010 </small>
                      </p>
                      <p><strong><code>number_length</code></strong> <small>integer</small>
                        <br />The length of the card's number (MAX 19; MIN 8).
                        <br /><small> Example: 19 </small>
                      </p>
                      <p><strong><code>security_code_length</code></strong> <small>integer</small>
                        <br />The length of the card's security code (MAX 1; MIN 1).
                        <br /><small> Example: 3 </small>
                      </p>
                      <p><strong><code>brand</code></strong> <small>string</small>
                        <br />The card's brand information (MAX 255; MIN 3).
                        <br /><small> Example: visa </small>
                      </p>
                      <p><strong><code>holder_name</code></strong> <small>string</small>
                        <br />Card holder's full name as it appears on the card (MAX 26; MIN 3) only available for PCI
                        certified merchants.
                        <br /><small> Example: John Doe </small>
                      </p>
                    </div>
                  </details>
                </div>
              </details>


            </div>
          </details>




        </div>
      </details>


    </div>

    <details class="yuno">
        <summary>
            <strong><code>connection_data</code></strong> <small>object</small>
            <br />
            <p>Specifies the connection data object, which represents the connection used to process the transaction. </p>
          </summary>
          <div>
            <p><strong><code>id</code></strong> <small>string</small>
              <br />The unique identifier of the payment connection in Yuno (MAX 64 ; MIN 36).
              <br /><small> Example: 88292fd3-bf5b-4b23-bb95-7186ba4e7f88</small>
            </p>
          </div>
       </details>

    <p><strong><code>created_at</code></strong> <small>timestamp</small>
      <br /> The date and time when the transaction was created.
      <br /><small> Example: 2022-05-09T20:46:54.786342Z </small>
    </p>

    <p><strong><code>updated_at</code></strong> <small>timestamp</small>
      <br /> The date and time from the last time the transaction was updated.
      <br /><small> Example: 2022-05-09T20:46:54.786342Z </small>
    </p>
  </details>

  <!-- !! important: it will be add in the future -->
  <!-- <div class="yuno">
    <p><strong><code>split</code></strong> <small>array</small>
      <br />Defines the split array.
    </p>
  </div> -->

  <div class="yuno">
    <p><strong><code>transactions_history</code></strong> <small>array of objects</small>
      <br /> The list of the transactions that are part of a payment. It is going to depend on how many providers you have set up in your payment method route.
      <br />
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>workflow</code></strong> <small>enum</small>
      <br /> The payment workflow. Indicates whether the integration will use Yuno´s SDK or will be a back to back
      connection (Card implementation only available for PCI compliant merchants).
      <br /><small> Possible enum values:</small>
      <!-- If <code>CHECKOUT</code> you will use Yuno SDK. If <code>DIRECT/REDIRECT</code>      you will use back to back integration. </small> -->
    <ul>
      <li><small><code>SDK_CHECKOUT</code>: Use Yuno SDK. </small></li>
      <li><small><code>DIRECT</code>: Back to back integration with provider info for custom payment
          experience.</small></li>
      <li><small><code>REDIRECT</code>: Back to back integration with provider redirection.</small></li>
    </ul>

    </p>
  </div>

  <div class="yuno">
    <p><strong><code>callback_url</code></strong> <small>string</small>
      <br />The URL where to redirect the customer after the payment. Only required for DIRECT integrations that have a
      redirection (MAX 526; MIN 3).
      <br /><small> Example: https://www.company.com/customer_1231324 </small>
    </p>
  </div>

  <details class="yuno">
    <summary><strong><code>metadata</code></strong> <small>array of objects</small>
      <br />
      <p>Specifies a list of metadata objects. You can add up to 100 metadata objects.</p>
    </summary>
    <div>
      <details class="yuno">
        <summary><strong><code>metadata object</code></strong> <small>object</small>
          <br />
          <p>Specifies a metadata key and the respective value.</p>
        </summary>
        <div>
          <p><strong><code>key</code></strong> <small>string</small>
            <br />Specifies one metadata key (MAX 48).
            <br /><small> Example: age </small>
          </p>
          <p><strong><code>value</code></strong> <small>string</small>
            <br />Specifies the value for the defined metadata key (MAX 512).
            <br /><small> Example: 28 </small>
          </p>
        </div>
      </details>
    </div>
  </details>

  <details class="yuno">
    <summary><strong><code>routing_rules</code></strong> <small>array of objects</small>
      <br />
      <p>Returns the routing rules information during the payment creation.</p>
    </summary>
    <div>
      <p><strong><code>smart_routing</code></strong> <small>bool</small>
            <br />Specifies if a transaction went through the smart routing feature or not.
            <br /><small> Example: false </small>
          </p>
      <p><strong><code>monitors</code></strong> <small>bool</small>
            <br />Specifies if a transaction went through the monitors feature or not.
            <br /><small> Example: false </small>
          </p>
      <details class="yuno">
        <summary><strong><code>condition</code></strong> <small>object</small>
          <br />
          <p>Object with the corresponding information for the routing condition that applies to the payment</p>
        </summary>
        <div>
          <p><strong><code>id</code></strong> <small>string</small>
            <br />ID of the condition corresponding to the payment.
            <br /><small> Example: 2404911d-5df9-429e-8488-ad41abea1a4b </small>
          </p>
        </div>
      </details>
    </div>
  </details>
    
  <div class="yuno">
    <p><strong><code>subscription_id</code></strong> <small>string</small>
      <br />The unique identifier of the subscription associated to the payment (MAX 64 ; MIN 36).
      <br /><small> Example: 7304911d-5df9-429e-8488-ad41abea1a4c </small>
    </p>
  </div>
    
  <details class="yuno">
    <summary><strong><code>subscription</code></strong> <small>struct</small>
      <br />
      <p>Returns the subscription details associated to the payment.</p>
    </summary>
    <div>
      <p><strong><code>billing_cycle</code></strong> <small>int</small>
            <br />Specifies the billing cycle of the subscription associated to the payment. 
            <br /><small> Example: 1 </small>
          </p>
      <p><strong><code>retry</code></strong> <small>int</small>
            <br />Specifies the retry attempt associated to the billing cycle of the subscription.
            <br /><small> Example: 2 </small>
          </p>
    </div>
  </details>

  <details class="yuno">
    <summary><strong><code>fraud_screening</code></strong> <small>array of objects</small>
      <br />
      <p>Provides information about the fraud scans used for the payment.</p>
    </summary>
    <div>
      <p><strong><code>status</code></strong> <small>enum</small>
        <br />The final status of the screening process of the payment.
        <br /><small> Example: SUCCEEDED </small>
      </p>
    </div>
    <div>
      <p><strong><code>stand_alone</code></strong> <small>boolean</small>
        <br />Optional field to send in the payment indicating if the fraud screening is stand alone, meaning that a payment will not be excecuted after the fraud screening is made. You can use this field while creating your CARD route.
        <br /><small> Example: false </small>
      </p>
    </div>
    <div>
      <details class="yuno">
        <summary><strong><code>transactions</code></strong> <small>object</small>
          <br />
          <p>Specifies the transaction details associated with a screening process of the payment.</p>
        </summary>
        <div>
          <p><strong><code>id</code></strong> <small>string</small>
            <br />The id of the fraud transaction (MAX 64; MIN 36).
            <br /><small> Example: ft12 </small>
          </p>
          <p><strong><code>type</code></strong> <small>enum</small>
            <br />Type of the fraud transaction.
            <br /><small> Possible enum values: <code>PRE_AUTH</code>, <code>POS_AUTH</code> </small>
          </p>
          <p><strong><code>status</code></strong> <small>enum</small>
            <br />The status of the transaction (MAX 255; MIN 3).
            <br /><small> Example: SUCCEEDED </small>
          </p>
          <p><strong><code>response_code</code></strong> <small>enum</small>
            <br />The response code of the transaction.
            <br /><small> Example: FRAUD_VERIFIED </small>
          </p>
          <p><strong><code>response_message</code></strong> <small>enum</small>
            <br />The response message of the transaction.
            <br /><small> Example: Fraud approved </small>
          </p>
          <div>
            <details class="yuno">
              <summary><strong><code>provider_data</code></strong> <small>object</small>
                <br />
                <p>Specifies the provider data that processed the payment.</p>
              </summary>
              <div>
                <p><strong><code>provider_id</code></strong> <small>string</small>
                  <br />The id of the fraud prevention provider.
                  <br /><small> Example: CLEARSALE </small>
                </p>
                <p><strong><code>transaction_id</code></strong> <small>string</small>
                  <br />The id of the fraud transaction from the provider.
                  <br /><small> Example: AA001234567 </small>
                </p>
                <p><strong><code>status</code></strong> <small>string</small>
                  <br />The provider fraud transaction status.
                  <br /><small> Example: APM </small>
                </p>
                <p><strong><code>score</code></strong> <small>string</small>
                  <br />The provider score for the transaction.
                  <br /><small> Example: 0.7 </small>
                </p>
                <p><strong><code>raw_response</code></strong> <small>string</small>
                  <br />The raw_response of the provider.
                  <br /><small> Example: JSON </small>
                </p>
              </div>
            </details>
          </div>
      </details>
      <p><strong><code>created_at</code></strong> <small>timestamp</small>
        <br /> The date and time when the fraud screening was created.
        <br /><small> Example: 2022-05-09T20:46:54.786342Z </small>
      </p>

      <p><strong><code>updated_at</code></strong> <small>timestamp</small>
        <br /> The date and time from the last time the fraud screening was updated.
        <br /><small> Example: 2022-05-09T20:46:54.786342Z </small>
      </p>
    </div>
  </details>


</body>
`}</HTMLBlock>