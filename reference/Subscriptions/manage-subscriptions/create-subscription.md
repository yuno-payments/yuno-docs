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
[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer\">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <div class=\"contentContainer\">\n        <p>\n          The fields <code>billing_cycles</code> and <code>availability.finish_at</code> have an impact on each other. If both are completed during the subscription creation, it will transition to the <code>COMPLETED</code> state upon reaching the nearest event defined in these fields, whether it is the billing cycle or the corresponding <code>finish_at</code>.\n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


Refer to the [HTTP Response Codes](ref:response-codes) section for details on possible error outcomes.