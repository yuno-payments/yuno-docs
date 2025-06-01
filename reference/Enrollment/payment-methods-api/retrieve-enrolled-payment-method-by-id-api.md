---
title: Retrieve Enrolled Payment Method by Id
excerpt: ''
api:
  file: customer-api.json
  operationId: retrieve-enrolled-payment-method-by-id-api
deprecated: false
hidden: false
metadata:
  title: ''
  description: Retrieve a specific payment method that a user has enrolled in.
  robots: index
next:
  description: ''
---
Retrieve a specific payment method that a user has enrolled in.

<HTMLBlock>{`
<div class="infoBlockContainer">
  <div class="verticalLine"></div>
  <div>      
    <div class="contentContainer">
      <p>
        To recover the enrolled payment method information, you need to provide the <code>payment_method_id</code>, which is the <code>vaulted_token</code> received when using the <a href="/reference/enroll-payment-method-api">Enroll Payment Method</a> endpoint.
      </p>
    </div>  
  </div>  
</div>  
`}</HTMLBlock>
