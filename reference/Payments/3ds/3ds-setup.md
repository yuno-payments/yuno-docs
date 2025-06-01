---
title: Setup
excerpt: ''
api:
  file: 3ds-setup.json
  operationId: 3ds-setup
deprecated: false
hidden: true
metadata:
  title: ''
  description: 3DS Setup
  robots: index
next:
  description: ''
---
This endpoint is used to identify the process of collecting customer data required to execute the 3DS process. The Setup endpoint itself does not collect any data. The Yuno SDK carries out the data collection. 

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer alert\">\n    <div class=\"verticalLineAlert\"></div>\n    <div>\n      <h3>Important</h3>\n      <div class=\"contentContainer\">\n        <p>\n\t\t\t\tThe option to send card information through this endpoint is only available to merchants with PCI Compliance.\n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


The parameter returned by the endpoint, `collect_url`, `token`, and `provider_id`, provide additional information for the merchant. However, they are not used in the payment process.