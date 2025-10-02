---
title: The Payout Object
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: >-
    The object representing the payout created after generating a transaction to
    transfer funds from your account to another account or recipient.
  robots: index
next:
  description: ''
---
This object represents the payout created after generating a transaction to transfer funds from your account to another account or recipient.

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
</style>

<body>
  <div class="yuno">
    <p><strong><code>id</code></strong> <small>string</small>
      <br />The unique identifier of the payout (MAX 64 ; MIN 36).
      <br /><small>Example: 5404911d-5df9-429e-8488-ad41abea1a4b</small>
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>account_id</code></strong> <small>string</small>
      <br />The unique identifier of the account (MAX 64 ; MIN 36).
      <br /><small>Example: 2404911d-5df9-429e-8488-ad41abea1a4b</small>
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>status</code></strong> <small>enum</small>
      <br />The status of the Payout (MAX 255; MIN 3).
      <br /><small>Example: SUCCEEDED</small>
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>merchant_reference</code></strong> <small>string</small>
      <br />The unique identifier of the customer's order (MAX 255; MIN 3).
      <br /><small>Example: 4234</small>
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>description</code></strong> <small>string</small>
      <br />The description of the payout (MAX 255; MIN 3).
      <br /><small>Example: marketplace payment</small>
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>purpose</code></strong> <small>enum</small>
      <br />Indicates the purpose for the payout.
      <br /><small>Possible enum values: Check the <a href='purposes-list'>Purpose list</a>.</small>
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>country</code></strong> <small>enum</small>
      <br />Country where the transaction must be processed (MAX 2; MIN 2; <a href='https://en.wikipedia.org/wiki/ISO_3166-1'>ISO 3166-1</a>).
      <br /><small>Possible enum values: Check the <a href='country-reference'>Country reference</a>. </small>
    </p>
  </div>

  <details class="yuno">
    <summary><strong><code>amount</code></strong> <small>object</small>
      <br />
      <p>Specifies the payout amount object, with the value and currency.</p>
    </summary>
    <div>

      <div class="yuno">
        <p><strong><code>value</code></strong> <small>number</small>
          <br />The payout amount (multiple of 0.0001).
          <br /><small>Example: 10000</small>
        </p>
      </div>

      <div class="yuno">
        <p><strong><code>currency</code></strong> <small>enum</small>
          <br />The currency used to make the payout (MAX 3; MIN 3; <a href='https://en.wikipedia.org/wiki/ISO_4217'>ISO 4217</a>).
          <br /><small>Possible enum values: Check the <a href='country-reference'>Country reference</a>.</small>
        </p>
      </div>

    </div>
  </details>

  <details class="yuno">
    <summary><strong><code>beneficiary</code></strong> <small>object</small>
      <br />
      <p>Specifies the beneficiary object with their identification.</p>
    </summary>
    <div>

      <div class="yuno">
        <p><strong><code>merchant_beneficiary_id</code></strong> <small>string</small>
          <br />Unique identifier of the beneficiary defined by the merchant.
          <br /><small>Example: AAAA01</small>
        </p>
      </div>

      <div class="yuno">
        <p><strong><code>national_entity</code></strong> <small>enum</small>
          <br />Beneficiary's national entity type.
          <br /><small>Possible enum values: <code>INDIVIDUAL</code> or <code>ENTITY</code></small>
        </p>
      </div>

      <div class="yuno">
        <p><strong><code>first_name</code></strong> <small>string</small>
          <br />The beneficiary's first name (MAX 80; MIN 1).
          <br /><small>Example: John</small>
        </p>
      </div>

      <div class="yuno">
        <p><strong><code>last_name</code></strong> <small>string</small>
          <br />The beneficiary's last name (MAX 80; MIN 1).
          <br /><small>Example: Doe</small>
        </p>
      </div>

      <div class="yuno">
        <p><strong><code>legal_name</code></strong> <small>string</small>
          <br />The beneficiary's name (Max: 80). Only necessary when <code>national_entity</code> is
          <code>ENTITY</code>.
          <br /><small>Example: Arcos dorados S.A.</small>
        </p>
      </div>

      <div class="yuno">
        <p><strong><code>email</code></strong> <small>string</small>
          <br />The beneficiary's email (MAX 255; MIN 3).
          <br /><small>Example: john.doe@email.com</small>
        </p>
      </div>

      <div class="yuno">
        <p><strong><code>country</code></strong> <small>enum</small>
          <br />The beneficiary's country (MAX 2; MIN 2; <a href='https://en.wikipedia.org/wiki/ISO_3166-1'>ISO 3166-1</a>).
          <br /><small>Possible enum values: Check the <a href='country-reference'>Country reference</a>. </small>
        </p>
      </div>

      <div class="yuno">
        <p><strong><code>date_of_birth</code></strong> <small>date</small>
          <br />The beneficiary's date of birth in the YYYY-MM-DD format (MAX 10; MIN 10).
          <br /><small>Example: 1990-02-28</small>
        </p>
      </div>
      
      <details class="yuno">
        <summary><strong><code>document</code></strong> <small>object</small>
          <br />
          <p>Specifies the beneficiary's document object, including its number and type.</p>
        </summary>
        <div>

          <div class="yuno">
            <p><strong><code>document_number</code></strong> <small>string</small>
              <br />The beneficiary's document number (MAX 40; MIN 3).
              <br /><small>Example: 1093333333 </small>
            </p>
          </div>

          <div class="yuno">
            <p><strong><code>document_type</code></strong> <small>enum</small>
              <br />The beneficiary's document type (MAX 6, MIN 2).
              <br /><small>Possible enum values: Check the <a href='country-reference'>Country reference.</a></small>
            </p>
          </div>

        </div>
      </details>
      
      <details class="yuno">
        <summary><strong><code>phone</code></strong> <small>object</small>
          <br />
          <p>Specifies the beneficiary's phone number object.</p>
        </summary>
        <div>

          <div class="yuno">
            <p><strong><code>country_code</code></strong> <small>string</small>
              <br />The country calling code of the beneficiary's phone (MAX 3; MIN 1). Possible values: Check the <a
                href="country-reference">
                Country reference</a>.
              <br /><small> Example: 57 </small>
            </p>
          </div>

          <div class="yuno">
            <p><strong><code>number</code></strong> <small>string</small>
              <br />The beneficiary's phone number, without the country calling code (MAX 32; MIN 1).
              <br /><small>Example: 3132450765 </small>
            </p>
          </div>

        </div>
      </details>
      
     <details class="yuno">
    <summary><strong><code>address</code></strong> <small>object</small>
      <br />
      <p>Specifies the beneficiary's address object.</p>
    </summary>
    <div>

          <div class="yuno">
            <p><strong><code>address_line_1</code></strong> <small>string </small>
              <br />The beneficiary's primary address line (MAX 255; MIN 3).
              <br /><small>Example: Calle 34 # 56 - 78 </small>
            </p>
          </div>

          <div class="yuno">
            <p><strong><code>address_line_2</code></strong> <small>string</small>
              <br />The beneficiary's secondary address line (MAX 255; MIN 3).
              <br /><small>Example: Apartamento 502, Torre I </small>
            </p>
          </div>

          <div class="yuno">
            <p><strong><code>city</code></strong> <small>string</small>
              <br />The city considered for the beneficiary address (MAX 255; MIN 3).
              <br /><small>Example: Bogotá </small>
            </p>
          </div>

          <div class="yuno">
            <p><strong><code>country</code></strong> <small>enum</small>
              <br />The country of the beneficiary address (MAX 2; MIN 2; <a href='https://en.wikipedia.org/wiki/ISO_3166-1'>ISO 3166-1</a>).
              <br /><small>Possible enum values: Check the <a href='country-reference'>Country reference</a>. </small>
            </p>
          </div>

          <div class="yuno">
            <p><strong><code>state</code></strong> <small>string</small>
              <br />The beneficiary's state or province address (MAX 255; MIN 3).
              <br /><small>Example: Cundinamarca </small>
            </p>
          </div>

          <div class="yuno">
            <p><strong><code>zip_code</code></strong> <small>string</small>
              <br />The zipcode considered for the beneficiary address (MAX 11; MIN 4).
              <br /><small>Example: 111111</small>
            </p>
          </div>

        </div>
      </details>
      

    </div>
  </details>


  <details class="yuno">
    <summary><strong><code>withdrawal_method</code></strong> <small>object</small>
      <br />
      <p>Specifies the beneficiary's withdrawal_method object.</p>
    </summary>
    <div>

      <div class="yuno">
        <p><strong><code>type</code></strong> <small>enum</small>
          <br />The withdrawal_method type.
          <br /><small>Example: ASTROPAY_WALLET</small>
        </p>
      </div>
      <div class="yuno">
        <p><strong><code>provider_id</code></strong> <small>enum</small>
          <br />The provider to process the payout with.
          <br /><small>Example: ASTROPAY</small>
        </p>
      </div>
      <div class="yuno">
        <p><strong><code>vaulted_token</code></strong> <small>string</small>
          <br />The vaulted_token represents a securely stored payment_method. Mainly for credti/debit cards in Payouts.
          <br /><small>Example: 41032411d-5df9-429e-1238-ad41abea1cft</small>
        </p>
      </div>
      
      <div class="yuno">
        <p><strong><code>original_transaction_id</code></strong> <small>string</small>
          <br />Id of the referenced payment transaction. Only for payouts to CARD. (MAX 64 ; MIN 36).
          <br /><small>Example: 9104911d-5df9-429e-8488-ad41abea1a4b</small>
        </p>
      </div>
      
       <div class="yuno">
        <p><strong><code>on_hold</code></strong> <small>bool</small>
          <br />Defines if the merchant wants to hold the payout and sets it to be processed later using the Release payout endpoint. False by default.
          <br /><small>Example: false</small>
        </p>
      </div>

      
        <details class="yuno">
          <summary><strong><code>detail</code></strong> <small>object</small>
            <br />
            <p>Specifies the withdrawal_method details.</p>
          </summary>
          <div>

            <details class="yuno">
        		 <summary><strong><code>bank_transfer</code></strong> <small>object</small>
                        <br />
                        <p>Specifies the beneficiary's withdrawal_method object.</p>
                      </summary>
                      <div>

                        <div class="yuno">
                          <p><strong><code>code</code></strong> <small>string</small>
                            <br />The beneficiary's financial institution code (MAX 3; MIN 3).
                            <br /><small>Example: 246</small>
                          </p>
                        </div>

                        <div class="yuno">
                          <p><strong><code>branch</code></strong> <small>string</small>
                            <br />The beneficiary's specific financial institution branch (MAX 3; MIN 3).
                            <br /><small>Example: XXX</small>
                          </p>
                        </div>

                        <div class="yuno">
                          <p><strong><code>branch_digit</code></strong> <small>string</small>
                            <br />The beneficiary's specific financial institution branch digit (MAX 3; MIN 3).
                            <br /><small>Example: 123</small>
                          </p>
                        </div>
                        
                        <details class="yuno">
                          <summary><strong><code>account</code></strong> <small>object</small>
                            <br />
                            <p>Specifies the beneficiary's bank_transfer account object.</p>
                          </summary>
                          <div>

                            <div class="yuno">
                              <p><strong><code>number</code></strong> <small>string</small>
                                <br />Beneficiary's financial institution account number or financial institution account alias, such as Clabe
                                for MX (MAX 255; MIN 3).
                                <br /><small>Example: 1093333333</small>
                              </p>
                            </div>

                            <div class="yuno">
                              <p><strong><code>digit</code></strong> <small>string</small>
                                <br />Beneficiary's financial institution account digit (MAX 3; MIN 1).
                                <br /><small>Example: 123</small>
                              </p>
                            </div>

                            <div class="yuno">
                              <p><strong><code>type</code></strong> <small>enum</small>
                                <br />Beneficiary's account type (MAX 255; MIN 3).
                                <br /><small>Possible enum values: <code>CHECKINGS</code>, <code>SAVINGS</code>, <code>VISTA</code>,
                                  <code>PIX_EMAIL</code>, <code>PIX_PHONE</code>, <code>PIX_DOCUMENT_ID</code>,
                                  <code>PIX_BANK_ACCOUNT</code></small>
                              </p>
                            </div>

                          </div>
                        </details>
                        <details class="yuno">
                        <summary><strong><code>address</code></strong> <small>object</small>
                            <br />
                            <p>Specifies the beneficiary's address object.</p>
                          </summary>
                          <div>

                                <div class="yuno">
                                  <p><strong><code>address_line_1</code></strong> <small>string </small>
                                    <br />The beneficiary's primary address line (MAX 255; MIN 3).
                                    <br /><small>Example: Calle 34 # 56 - 78 </small>
                                  </p>
                                </div>

                                <div class="yuno">
                                  <p><strong><code>address_line_2</code></strong> <small>string</small>
                                    <br />The beneficiary's secondary address line (MAX 255; MIN 3).
                                    <br /><small>Example: Apartamento 502, Torre I </small>
                                  </p>
                                </div>

                                <div class="yuno">
                                  <p><strong><code>city</code></strong> <small>string</small>
                                    <br />The city considered for the beneficiary address (MAX 255; MIN 3).
                                    <br /><small>Example: Bogotá </small>
                                  </p>
                                </div>

                                <div class="yuno">
                                  <p><strong><code>country</code></strong> <small>enum</small>
                                    <br />The country of the beneficiary address (MAX 2; MIN 2; <a href='https://en.wikipedia.org/wiki/ISO_3166-1'>ISO 3166-1</a>).
                                    <br /><small>Possible enum values: Check the <a href='country-reference'>Country reference</a>. </small>
                                  </p>
                                </div>

                                <div class="yuno">
                                  <p><strong><code>state</code></strong> <small>string</small>
                                    <br />The beneficiary's state or province address (MAX 255; MIN 3).
                                    <br /><small>Example: Cundinamarca </small>
                                  </p>
                                </div>

                                <div class="yuno">
                                  <p><strong><code>zip_code</code></strong> <small>string</small>
                                    <br />The zipcode considered for the beneficiary address (MAX 11; MIN 4).
                                    <br /><small>Example: 111111</small>
                                  </p>
                                </div>
                              </div>
                          </details>

                </div>
              </details>
              <details class="yuno">
        		 <summary>
               <strong><code>wallet</code></strong> <small>object</small>
               <br />
                <p>Specifies the beneficiary's withdrawal_method object.</p>
                </summary>
                 <div>
											
                        <div class="yuno">
                          <p><strong><code>code</code></strong> <small>string</small>
                            <br />The beneficiary's wallet code (MAX 3; MIN 3).
                            <br /><small>Example: 246</small>
                          </p>
                        </div>

                        <div class="yuno">
                          <p><strong><code>email</code></strong> <small>string</small>
                            <br />The beneficiary's specific wallet email (MAX 3; MIN 3).
                            <br /><small>Example: john.doe@gmail.com</small>
                          </p>
                        </div>

                         <div class="yuno">
                          <p><strong><code>country</code></strong> <small>enum</small>
                            <br />The beneficiary's wallet country (MAX 2; MIN 2; <a href='https://en.wikipedia.org/wiki/ISO_3166-1'>ISO 3166-1</a>).
                            <br /><small>Possible enum values: Check the <a href='country-reference'>Country reference</a>. </small>
                          </p>
                        </div>

                       <details class="yuno">
                          <summary><strong><code>document</code></strong> <small>object</small>
                            <br />
                            <p>Specifies the beneficiary's document object, including its number and type.</p>
                          </summary>
                          <div>

                            <div class="yuno">
                              <p><strong><code>document_number</code></strong> <small>string</small>
                                <br />The beneficiary's document number (MAX 40; MIN 3).
                                <br /><small>Example: 1093333333 </small>
                              </p>
                            </div>

                            <div class="yuno">
                              <p><strong><code>document_type</code></strong> <small>enum</small>
                                <br />The beneficiary's document type (MAX 6, MIN 2).
                                <br /><small>Possible enum values: Check the <a href='country-reference'>Country reference.</a></small>
                              </p>
                            </div>

                          </div>
                        </details>

                        <details class="yuno">
                          <summary><strong><code>phone</code></strong> <small>object</small>
                            <br />
                            <p>Specifies the beneficiary's phone number object.</p>
                          </summary>
                          <div>

                            <div class="yuno">
                              <p><strong><code>country_code</code></strong> <small>string</small>
                                <br />The country calling code of the beneficiary's phone (MAX 3; MIN 1). Possible values: Check the <a
                                  href="country-reference">
                                  Country reference</a>.
                                <br /><small> Example: 57 </small>
                              </p>
                            </div>

                            <div class="yuno">
                              <p><strong><code>number</code></strong> <small>string</small>
                                <br />The beneficiary's phone number, without the country calling code (MAX 32; MIN 1).
                                <br /><small>Example: 3132450765 </small>
                              </p>
                            </div>

                          </div>
                        </details>
									
                </div>
              </details>
          
          

        </div>
      </details>

    </div>
  </details>

  <details class="yuno">
    <summary><strong><code>transactions</code></strong> <small>array of objects</small>
      <br />
      <p>Specifies a list of payouts objects.</p>
    </summary>
    <div>

      <div class="yuno">
        <p><strong><code>id</code></strong> <small>string</small>
          <br />The unique identifier for the payout intent (MAX 64 ; MIN 36).
          <br /><small>Example: 9104911d-5df9-429e-8488-ad41abea1a4b</small>
        </p>
      </div>

      <div class="yuno">
        <p><strong><code>type</code></strong> <small>enum</small>
          <br />The payout intent type (MAX 255; MIN 3).
          <br /><small></small>
        </p>
      </div>

      <div class="yuno">
        <p><strong><code>status</code></strong> <small>enum</small>
          <br />The payout intent status (MAX 255; MIN 3).
          <br /><small></small>
        </p>
      </div>

      <div class="yuno">
        <p><strong><code>response_code</code></strong> <small>enum</small>
          <br />The response code indicates the status of the payout intent request (MAX 255; MIN 3).
          <br /><small></small>
        </p>
      </div>

      <div class="yuno">
        <p><strong><code>merchant_reference</code></strong> <small>string</small>
          <br />The payout transaction identification defined by the merchant (MAX 255; MIN 3).
          <br /><small>Example: AAB01-432245</small>
        </p>
      </div>
      
      <details class="yuno">
        <summary><strong><code>amount</code></strong> <small>object</small>
          <br />
          <p>Specifies the payout amount object, with the value and currency.</p>
        </summary>
        <div>

          <div class="yuno">
            <p><strong><code>value</code></strong> <small>number</small>
              <br />The payout amount (multiple of 0.0001).
              <br /><small>Example: 10000</small>
            </p>
          </div>

          <div class="yuno">
            <p><strong><code>currency</code></strong> <small>enum</small>
              <br />The currency used to make the payout (MAX 3; MIN 3; <a href='https://en.wikipedia.org/wiki/ISO_4217'>ISO 4217</a>).
              <br /><small>Possible enum values: Check the <a href='country-reference'>Country reference</a>.</small>
            </p>
          </div>

        </div>
      </details>


      <div class="yuno">
        <p><strong><code>purpose</code></strong> <small>enum</small>
          <br />Specifies the purpose for the payout.
        </p>
      </div>

      <div class="yuno">
        <p><strong><code>description</code></strong> <small>string</small>
          <br />Description for the payout (MAX 255; MIN 3).
          <br /><small>Example: Salary</small>
        </p>
      </div>
      
      <details class="yuno">
    <summary><strong><code>provider_data</code></strong> <small>object</small>
      <br />
      <p>Specifies the data provider.</p>
    </summary>
    <div>

      		<div class="yuno">
            <p><strong><code>id</code></strong> <small>enum</small>
              <br />The data provider identification.
              <br /><small>Possible values: <code>ADDI</code>, <code>MERCADO_PAGO</code>, <code>SPINPAY</code>,
                <code>WOMPI</code></small>
            </p>
          </div>

          <div class="yuno">
            <p><strong><code>transaction_id</code></strong> <small>string</small>
              <br />The unique identifier of the payment from the provider.
              <br /><small>Example: 12345678</small>
            </p>
          </div>

          <div class="yuno">
            <p><strong><code>account_id</code></strong> <small>string</small>
              <br />The merchant's payment provider account id.
              <br /><small>Example: 9990128</small>
            </p>
          </div>

          <div class="yuno">
            <p><strong><code>status</code></strong> <small>string</small>
              <br />Provider's status of the transaction (MAX 255; MIN 3).
              <br /><small>Example: accredited</small>
            </p>
          </div>

          <div class="yuno">
            <p><strong><code>status_detail</code></strong> <small>string</small>
              <br />The data provider's detailed status of the transaction (MAX 255; MIN 3).
              <br /><small>Example: approved</small>
            </p>
          </div>

          <div class="yuno">
            <p><strong><code>raw_response</code></strong> <small>string</small>
              <br />The data provider raw response. The format depends on the provider's response.
              <br /><small>The response will vary for each data provider.</small>
            </p>
          </div>

          <div class="yuno">
            <p><strong><code>created_at</code></strong> <small>timestamp</small>
              <br />Transactions creation date (MAX 27; MIN 27, <a href='https://en.wikipedia.org/wiki/ISO_8601'>ISO
                8601</a>).
              <br /><small>Example: 2022-05-09T20:46:54.786342Z</small>
            </p>
          </div>

          <div class="yuno">
            <p><strong><code>updated_at</code></strong> <small>timestamp</small>
              <br />The last transactions update date (MAX 27; MIN 27, <a href='https://en.wikipedia.org/wiki/ISO_8601'>ISO
                8601</a>).
              <br /><small>Example: 2022-05-09T20:46:54.786342Z</small>
            </p>
          </div>

        </div>
      </details>


    </div>
  </details>

  
  <details class="yuno">
    <summary><strong><code>metadata</code></strong> <small>array of objects</small>
      <br />
      <p>Specifies a list of metadata objects. You can add up to 50 metadata objects.</p>
    </summary>
    <div>

      <details class="yuno">
        <summary><strong><code>metadata object</code></strong> <small>object</small>
          <br />
          <p>Specifies a metadata key and the respective value.</p>
        </summary>
        <div>

          <div class="yuno">
            <p><strong><code>key</code></strong> <small>string</small>
              <br />The metadata key (MAX 48 ; MIN 1).
              <br /><small>Example: order_id</small>
            </p>
          </div>

          <div class="yuno">
            <p><strong><code>value</code></strong> <small>string</small>
              <br />The metadata key value (MAX 512 ; MIN 1).
              <br /><small>Example: AA001</small>
            </p>
          </div>

        </div>
      </details>

    </div>
  </details>

  <div class="yuno">
    <p><strong><code>created_at</code></strong> <small>timestamp</small>
      <br />Transactions creation date (MAX 27; MIN 27, <a href='https://en.wikipedia.org/wiki/ISO_8601'>ISO 8601</a>).
      <br /><small>Example: 2022-05-09T20:46:54.786342Z</small>
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>updated_at</code></strong> <small>timestamp</small>
      <br />The last transactions update date (MAX 27; MIN 27, <a href='https://en.wikipedia.org/wiki/ISO_8601'>ISO
        8601</a>).
      <br /><small>Example: 2022-05-09T20:46:54.786342Z</small>
    </p>
  </div>
</body>
`}</HTMLBlock>