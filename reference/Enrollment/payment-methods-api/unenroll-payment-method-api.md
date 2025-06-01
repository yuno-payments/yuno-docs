---
title: Unenroll Payment Method
excerpt: ''
api:
  file: customer-api-register-payment-method.json
  operationId: unenroll-payment-method-api
deprecated: false
hidden: false
metadata:
  title: ''
  description: >-
    Unenroll a saved payment method for the user. Once you've done the POST to
    the unenrollment endpoint, the payment method status will be changed to
    UNENROLLED.
  robots: index
next:
  description: ''
---
Unenroll a saved payment method for the user. Once you've done the POST to the unenrollment endpoint, the payment method status will be changed to UNENROLLED.

<HTMLBlock>{`
<div class="infoBlockContainer">
  <div class="verticalLine"></div>
  <div>      
    <div class="contentContainer">
      <p>
        To unenroll the payment method, you need to provide the <code>payment_method_id</code>, which is the <code>vaulted_token</code> received when using the <a href="/reference/enroll-payment-method-api">Enroll Payment Method</a> endpoint.
      </p>
    </div>  
  </div>  
</div>  
`}</HTMLBlock>
