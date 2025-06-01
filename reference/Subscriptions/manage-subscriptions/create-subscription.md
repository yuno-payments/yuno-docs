---
title: Create Subscription
excerpt: ''
api:
  file: subscription.json
  operationId: create-subscription
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
<HTMLBlock>{`
<body>
  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <div class="contentContainer">
        <p>
          The fields <code>billing_cycles</code> and <code>availability.finish_at</code> have an impact on each other. If both are completed during the subscription creation, it will transition to the <code>COMPLETED</code> state upon reaching the nearest event defined in these fields, whether it is the billing cycle or the corresponding <code>finish_at</code>.
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

Refer to the [HTTP Response Codes](ref:response-codes) section for details on possible error outcomes.
