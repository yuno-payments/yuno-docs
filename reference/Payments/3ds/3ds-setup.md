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

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer alert">
    <div class="verticalLineAlert"></div>
    <div>
      <h3>Important</h3>
      <div class="contentContainer">
        <p>
				The option to send card information through this endpoint is only available to merchants with PCI Compliance.
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

The parameter returned by the endpoint, `collect_url`, `token`, and `provider_id`, provide additional information for the merchant. However, they are not used in the payment process.
