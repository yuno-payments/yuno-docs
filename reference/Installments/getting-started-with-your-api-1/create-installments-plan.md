---
title: Create Installments Plan
excerpt: ''
api:
  file: installments.json
  operationId: create-installments-plan
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
Yuno allows you to create installment plans to offer to your customers. These plans can be used based on factors such as the amount to pay, currency, and card used, as described below:

* **Filtered by Amount Range (mandatory):** The system checks if the installment plan is suitable for the specific amount of your transaction. Only plans that can handle that amount are considered.
* **Card BIN:** The system verifies if the BIN of your card matches those allowed for certain installment plans. If there's a match, that plan is considered.
* **Specific Currency:** Only plans that work with the currency you are using are considered.
* **Plan Availability:** The system checks if the installment plan is active. Only plans that have not expired and are available are considered.

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <h3>Defining the Plan ID</h3>
      <div class="contentContainer">
        <p>
					The <code>plan_id</code> is only necessary when applying a fixed installment plan that doesn't change during the purchase. If the <code>installment.plan_id</code> is not provided, the SDK will automatically search through all available installment plans associated with that account and select the one it considers most suitable. 
				</p>
        <p>
					You should include the <code>plan_id</code> to ensure that a specific plan is applied.
        </p>
  </div>  
</div>  
</div>  
</body>
`}</HTMLBlock>

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <h3>Merchants Installments</h3>
      <div class="contentContainer">
        <p>
					This endpoint is only required for
          <a href="https://docs.y.uno/docs/installments">Merchant installments integration</a>. For Provider defined installments, we use the installment plan define by your payment provider.
        </p>
  </div>  
</div>  
</div>  
</body>
`}</HTMLBlock>

For merchant-created installments, you also have the possibility of specifying the plan for every checkout session by using the `plan_id` while [creating the session](ref:create-checkout-session). If you do not send it, we will use the installment plan that matches the conditions set for the checkout session.