---
title: The Subscription Object
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
## Attributes

This object represents a subscription that can be associated with a customer

<HTMLBlock>{`
<head>
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
</head>

<body>
  <div class="yuno">
    <p><strong><code>id</code></strong> <small>string</small> <br />The unique identifier of the subscription (MAX 64 ; MIN 36).
      <br /> <small>Example: 7304911d-5df9-429e-8488-ad41abea1a4c</small>
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>name</code></strong> <small>string</small> <br />The subscription name (MAX 255; MIN 3).
      <br /> <small>Example: sub_001</small>
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>description</code></strong> <small>string</small> <br />The subscription description (MAX 255; MIN 3).
      <br /> <small>Example: Servicio de streaming</small>
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>account_id</code></strong> <small>string</small> <br />The unique identifier of the account that will have the
      subscription plan available to use (MAX 64 ; MIN 36).
      <br /> <small>Example: 2404911d-5df9-429e-8488-ad41abea1a4b</small>
    </p>
  </div>

  <div class="yuno">
    <p><strong><code>merchant_reference</code></strong> <small>string</small> <br />Identification of the subscription plan (MAX 255;
      MIN 3). <br /> <small>Example: 001_marzo_23</small></p>
  </div>

  <div class="yuno">
    <p><strong><code>country</code></strong> <small>string</small> <br />The subscription's country. <br /> <small>Example:
        CO</small></p>
  </div>

  <div class="yuno">
    <p><strong><code>status</code></strong> <small>enum</small> <br />Status of the subscription.
      <br /> <small>Possible values:</small>
    <ul>
      <li><small><code>ACTIVE</code>=The subscription has been created with an associated customer and is already
          active.</small></li>
      <li><small><code>PAUSED</code>=The subscription has been paused and can be reactivated.</small></li>
      <li><small><code>COMPLETED</code>=The subscription is completed because it reached the end date and time.</small>
      </li>
      <li><small><code>CANCELED</code>=Subscription canceled.</small></p>
      </li>
    </ul>

  </div>

  <details class="yuno">
    <summary>
      <strong><code>amount</code></strong> <small>object</small>
      <br />
      <p>Specifies the subscription amount object, with the value and currency.</p>
    </summary>
    <div>
      <p><strong><code>currency</code></strong> <small>enum</small>
        <br />The currency used to make the payment (MAX 3; MIN 3; <a href="country-reference">ISO 4217</a>).
        <br /><small> Possible enum values: Check the <a href="country-reference">Country reference</a>.</small>
      </p>
      <p><strong><code>value</code></strong> <small>number</small>
        <br />The payment amount (multiple of 0.0001).
        <br /><small> Example: 12100.00 </small>
      </p>
    </div>
  </details>

  <details class="yuno">
    <summary>
      <strong><code>frequency</code></strong> <small>object</small>
      <br />
      <p>
        The frequency defined for the payment subscription.<br />
        If not set, defaults are MONTH for type and 1 for value.
      </p>
    </summary>
    <div>
      <div class="yuno">
        <p><strong><code>type</code></strong> <small>enum</small> <br />The type of interval the subscription will have in time (DAY,
          WEEK, MONTH). If not set, always MONTH by default.
          <br /> <small>Possible enum values: <code>DAY</code>, <code>MONTH</code>, or <code>YEAR</code>.</small>
        </p>
      </div>

      <div class="yuno">
        <p><strong><code>value</code></strong> <small>int</small> <br />The value between each interval the subscription will have
          in time. If not set, always 1 by default. <br /><small> Example: 1</small></p>
      </div>

    </div>
  </details>

  <details class="yuno">
    <summary>
      <strong><code>billing_cycles</code></strong> <small>object</small>
      <br />
      <p>Specifies the billing_cycles object.</p>
    </summary>
    <div>
      <div class="yuno">
        <p><strong><code>total</code></strong> <small>number</small> <br />Total amount of billing cycles.<br /><small> Example:
            10</small></p>
      </div>

      <div class="yuno">
        <p><strong><code>current</code></strong> <small>number</small> <br />Value of the current billing cycle.<br /><small>
            Example: 2</small></p>
      </div>

      <div class="yuno">
        <p><strong><code>next_at</code></strong> <small>Timestamp</small> <br />The date of the next payment for the subscription.
          <br /><small> Example: 2023-02-16T20:00:00.786342Z</small>
        </p>
      </div>

    </div>
  </details>

  <details class="yuno">
    <summary>
      <strong><code>billing_date</code></strong> <small>object</small>
      <br />
      <p>[Optional] Specifies the billing_date object. Mutually exclusive with the frequency object.</p>
    </summary>
    <div>
      <div class="yuno">
        <p><strong><code>type</code></strong> <small>number</small> <br />The type of billing_date the subscription will have in
          time. PREPAID, POSTDATE, DAY. If not set, the creation date for the plan will be set by default.<br /><small>
            Example:
            PLAN_CREATION_DATE</small></p>
      </div>

      <div class="yuno">
        <p><strong><code>day</code></strong> <small>number</small> <br />The day of the month to charge the subscription if the type
          is set to DAY. Always 1 by default.<br /><small>
            Example: 2</small></p>
      </div>

    </div>
  </details>

  <details class="yuno">
    <summary>
      <strong><code>customer_payer</code></strong> <small>object</small>
      <br />
      <p>Specifies the customer_payer object.</p>
    </summary>
    <div>
      <div class="yuno">
        <p><strong><code>id*</code></strong> <small>string</small> <br />The unique identifier of the customer (MAX 255; MIN 3).
          <br /><small> Example: 3t04911d-5df9-429e-8488-ad41abea1a2c</small>
        </p>
      </div>

    </div>
  </details>

  <details class="yuno">
    <summary>
      <strong><code>payment_method</code></strong> <small>array of objects</small>
      <br />
      <p>Specifies the payment_method object.</p>
    </summary>
    <div>
      <div class="yuno">
        <p><strong><code>type</code></strong> <small>enum</small> <br />Type of the payment method. <br /><small> Possible enum
            values: <code>CARD</code></small></p>
      </div>

      <div class="yuno">
        <p><strong><code>token</code></strong> <small>string</small> <br />The one-time use payment method token provided by Yuno SDK
          (MAX 64; MIN 36). <br /><small> Example: 9104911d-5df9-429e-8488-ad41abea1a4b</small></p>
      </div>

      <div class="yuno">
        <p><strong><code>vaulted_token</code></strong> <small>string</small> <br />The vaulted token of the stored payment method
          (MAX: 64; MIN: 36).
          <br /><small> Example: 6104911d-5df9-429e-8488-ad41abea1a4b</small>
        </p>
      </div>


      <details class="yuno">
        <summary>
          <strong><code>card</code></strong> <small>object</small>
          <br />
          <p>Specifies the card object.</p>
        </summary>
        <div>
          <div class="yuno">
            <p><strong><code>verify</code></strong> <small>boolean</small> <br />Using amount = 0 and verify = true, you can verify
              the user's card without authorizing a real amount.
              <br /><small> Possible values: <code>ture</code> or
                <code>false</code>.</small>
            </p>
          </div>

          <details class="yuno">
            <summary>
              <strong><code>card_data</code></strong> <small>object</small>
              <br />
              <p>Specifies the card_data object.</p>
            </summary>
            <div>
              <div class="yuno">
                <p><strong><code>number</code></strong> <small>string</small> <br />Card's number without any separators (MAX 19;
                  MIN 8) - only available for PCI certified merchants. <br /><small> Example: 4507990000000010</small>
                </p>
              </div>

              <div class="yuno">
                <p><strong><code>expiration_month</code></strong> <small>number</small> <br />Card's expiration month - MM (MAX 2;
                  MIN 2) - only available for PCI certified merchants. <br /><small> Example: 10</small></p>
              </div>

              <div class="yuno">
                <p><strong><code>expiration_year</code></strong> <small>number</small> <br />Card's expiration year - YYYY (MAX 4;
                  MIN 4) - only available for PCI certified merchants. <br /><small> Example: 2025</small></p>
              </div>

              <div class="yuno">
                <p><strong><code>security_code</code></strong> <small>number</small> <br />Card's security code (MAX 4; MIN 3) - only
                  available for PCI certified merchants. <br /><small> Example: 123</small></p>
              </div>

              <div class="yuno">
                <p><strong><code>holder_name</code></strong> <small>string</small> <br />Cardholder's full name as it appears on the
                  card (MAX 26; MIN 3) - only available for PCI certified merchants. <br /><small> Example: JOHN
                    DOE</small>
                </p>
              </div>

            </div>
          </details>

        </div>
      </details>
    </div>
  </details>

  <details class="yuno">
    <summary>
      <strong><code>trial_period</code></strong> <small>object</small>
      <br />
      <p>Specifies the trial_period object.</p>
    </summary>
    <div>
      <div class="yuno">
        <p><strong><code>billing_cycles</code></strong> <small>number</small> <br />Total amount of billing cycles the free_trial
          should apply to.<br /><small> Example:
            1</small></p>
      </div>

      <details class="yuno">
        <summary>
          <strong><code>amount</code></strong> <small>object</small>
          <br />
          <p>Amount to be discounted for the trial period.</p>
        </summary>
        <div>
          <div class="yuno">
            <p><strong><code>currency</code></strong> <small>string</small> <br />The currency used to make the trial period. (ISO
              4217 MAX 3; MIN 3). <br /><small> Example: COP</small>
            </p>
          </div>

          <div class="yuno">
            <p><strong><code>value</code></strong> <small>number</small> <br />Card's expiration month - MM (MAX 2;
              MIN 2) - only available for PCI certified merchants. <br /><small> Example: 10</small></p>
          </div>

        </div>
      </details>

    </div>
  </details>

  <details class="yuno">
    <summary>
      <strong><code>availability</code></strong> <small>object</small>
      <br />
      <p>Specifies the availability object. The dates that the subscription will be available. If null the start date
        will be the day of the creation and it will not have a finish date.</p>
    </summary>
    <div>
      <div class="yuno">
        <p><strong><code>start_at</code></strong> <small>Timestamp</small> <br />The start date that the subscription will be
          available to use. <br /><small> Example: 2024-01-16T00:00:00.786342Z</small></p>
      </div>

      <div class="yuno">
        <p><strong><code>finish_at</code></strong> <small>Timestamp</small> <br />The end date until the subscription will be
          available to use. <br /><small> Example: 2024-05-26T20:00:00.786342Z</small></p>
      </div>
    </div>
  </details>

  <details class="yuno">
    <summary>
      <strong><code>retries</code></strong> <small>object</small>
      <br />
      <p>Specifies the retries object. If we need to retry declined transactions in Yuno and the amount if necessary.
      </p>
    </summary>
    <div>
      <p><strong><code>retry_on_decline</code></strong> <small>bool</small>
        <br />If we should retry a payment or not after a first decline. False by default..
        <br /><small> Example: TRUE </small>
      </p>
      <p><strong><code>amount</code></strong> <small>number</small>
        <br />The number of retries that the subscription plan will have to completion. If not set, or higher than 7, 7
        will be defined as default. Max: 7
        <br /><small> Example: 4 </small>
      </p>
    </div>
  </details>

  <div class="yuno">
    <p><strong><code>initial_payment_validation</code></strong> <small>bool</small> <br />Flag to identify if the subscription should
      wait for the first payment in order to continue. False by default.
      MIN 27). <br /><small> Example: false</small></p>
  </div>

  <details class="yuno">
    <summary>
      <strong><code>metadata</code></strong> <small>object</small>
      <br />
      <p>Specifies the metadata object. Set of key-value pairs that you can be attached to an object. This
        can be useful for storing additional information about the object in a structured format. Individual keys can be
        unset by posting an empty value to them. All keys can be unset by posting an empty value to metadata.</p>
    </summary>
    <div>
      <div class="yuno">
        <p><strong><code>key</code></strong> <small>string</small> <br />Object title that represents the key-value pair inside the
          metadata (MAX 48; MIN 1). <br /><small> Example: sub_ext_id</small></p>
      </div>

      <div class="yuno">
        <p><strong><code>value</code></strong> <small>string</small> <br />Object value for the key defined (MAX 512; MIN 1).
          <br /><small> Example: AA001</small>
        </p>
      </div>
    </div>
  </details>

  <details class="yuno">
    <summary>
      <strong><code>payments</code></strong> <small>Array of strings</small>
      <br />
      <p>Specifies the payments array.</p>
    </summary>
    <div>
      <div class="yuno">
        <p><strong><code>id*</code></strong> <small>string</small> <br />The unique identifier of the payment (MAX 64 ; MIN 36).
          <br /><small> Example: 5104911d-5df9-229e-8468-bd41abea1a4s</small>
        </p>
      </div>

    </div>
  </details>

  <div class="yuno">
    <p><strong><code>created_at</code></strong> <small>Timestamp</small> <br />Subscription creation date and time (<a
        href="https://en.wikipedia.org/wiki/ISO_8601" target="_blank">ISO 8601</a> MAX 27;
      MIN 27). <br /><small> Example: 2023-12-16T20:46:54.786342Z</small></p>
  </div>

  <div class="yuno">
    <p><strong><code>updated_at</code></strong> <small>Timestamp</small> <br />Subscription last updated date and time (<a
        href="https://en.wikipedia.org/wiki/ISO_8601" target="_blank">ISO 8601</a> MAX
      27; MIN 27). <br /><small> Example: 2023-12-16T21:00:54.786342Z</small></p>
  </div>

  <details class="yuno">
    <summary>
      <strong><code>additional_data</code></strong> <small>object</small>
      <br />
      <p>Specifies the additional_data object. This object is not mandatory. However, if you send this information, the
        payment experience will be enhanced for your user.</p>
    </summary>
    <details class="yuno">
      <summary>
        <strong><code>order</code></strong> <small>object</small>
        <br />
        <p>Specifies the order object. </p>
      </summary>
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
      </div>
    </details>



</body>
`}</HTMLBlock>
