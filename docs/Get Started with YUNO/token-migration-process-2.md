---
title: Token Migration Process
excerpt: ''
deprecated: false
hidden: true
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
Token migration is the process by which the card numbers stored in a provider are transferred to Yuno's vault. This process involves the generation of a new token for each card.

> 📘 First step
> 
> In order to start the token migration process, you must first contact your business advisor at Yuno to review times and feasibility of the process.

Considering that the migration process contains confidential information, the following process was defined by Yuno:

![token migration progress](https://files.readme.io/e38db66-tokens_copiar_Prancheta_1.png)

## Importing cards from a gateway account

To import cards data to Yuno from an existing gateway, you need to follow these steps:

1. Initiate communication with the existing third-party vault/gateway to request an export of the payment method data, following their specified process and protocols.
2. Carefully review the export documentation provided by the gateway to ensure that the data format aligns with Yuno's data format for migration.
3. Submit a formal request to Yuno, providing the environment key where the data will be imported, in accordance with Yuno's data transfer procedures.
4. The gateway's process and its response to the export request will determine the data transfer process.
   - If the gateway requires SFTP setup for the transfer, our PGP key will be shared with them to obtain the necessary credentials. (Note: S/MIME encryption with an RSA key of at least 2048 bits will be used.)
   - Alternatively, if Yuno's SFTP is preferred, we will request the public PGP key of the third-party vault/gateway. This key will be used to encrypt credentials for a Yuno-created SFTP server, where the gateway can drop the exported payment methods for us to retrieve. Ideally, the public PGP key of the gateway should be hosted on a publicly accessible page.

We will collaborate directly with the third-party vault/gateway if needed to facilitate the import process. It is the responsibility of Yuno customers to manage communication with their gateway providers during this process.

Please, note that customer subscription information, including amounts, dates, etc., must be obtained directly from the exporting entity, as Yuno will not extract this data from encrypted files.

## Managing communications

Yunos connects you, the merchant, to payment processors. The data is tokenized and encrypted to ensure data security throughout the connection process. At the same time, Yuno simplifies the PCI compliance process. However, it is important to clarify that you remain responsible for managing and protecting your customer's (the buyer's) data. In addition, it is your responsibility to communicate any additional fees or other issues to your customer.  

## Data format

Yuno defines a list of the required parameters for each customer and credit card to proceed with the migration process. The list of the required parameters is present below:

- Account ID
- Merchant customer ID
- First name
- Last Name
- Email
- Country
- Document number
- Document type
- Payment method type
- Payment method ID
- Payment method token

You can use the [Customer Object](https://docs.y.uno/reference/the-customer-object) and [Payment Method Object](https://docs.y.uno/reference/the-payment-method-object-api) to find all the possible parameters that can be used when importing/creating customers or enrolling payment objects.

Different technical limitations associated with alternative payment methods may render them ineligible for migration between service providers. If you're contemplating the migration of alternative payment method tokens, such as Apple Pay, Google Pay, etc., to the Yuno vault, we recommend contacting our support team for further information.

> 📘 Data transfer security
> 
> All data throughout the migration process is encripted and transfered using a safe method, such as SFTP.

## Data validation

To ensure efficient processing and prevent delays, please include the following information when communicating with Support:

- The external identifier name to be used for the import.
- An approximate count of the expected number of payment methods to be included (a rough estimate is acceptable).
- Any known data gaps, such as missing names or expiration dates.

Please note that we do not validate expiration dates during credit card import.

## Migration options

Yuno provides two options for merchants to perform the token migration process. 

- With the first one, you will use the Yuno API to add customers and enroll payment methods. The results can be confirmed by the API responses or by using data-retrieving endpoints.
- The second uses batch files. In this case, you will provide customers' data through CSV files to Yuno's team, which will add the customers and enroll payment methods. As a result of the migration, Yuno will provide a new CSV file with additional data for each customer created at the end of the process. 

Get more details on each method by clicking on the following cards:

[block:html]
{
  "html": "\n<style>\n  .card-ultimate-shelf {\n    margin: 0 0 0 0;\n    display: grid;\n    grid-template-columns: repeat(2, 1fr);\n    grid-column-gap: 10px;\n    grid-row-gap: 10px;\n  }\n\n  .card-ultimate {\n    padding: 0.7rem;\n    flex: 1;\n    border-radius: 7px;\n    border: 1px solid #614ad67a;\n    transition: transform .2s;\n  }\n\n  .card-ultimate :first-child {\n    display: flex;\n  }\n\n  .card-ultimate:hover {\n    transform: scale(1.02);\n    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);\n    cursor: pointer;\n  }\n\n  .card-ultimate svg {\n    color: #614ad6;\n    height: 30px;\n    width: 30px;\n    margin-right: 10px;\n    margin-bottom: 10px;\n\n  }\n\n  .card-ultimate h3 {\n    font-size: 1rem;\n    color: #614ad6;\n    margin: 0 0 0.5rem 0;\n    display: flex;\n    align-items: center;\n  }\n\n  .card-ultimate h3 svg {\n    margin: 0 15px 0 0;\n  }\n\n  .card-ultimate p {\n    margin: 0;\n  }\n\n  .card-ultimate a {\n    text-decoration: none;\n    color: inherit;\n  }\n\n  @media only screen and (max-width: 600px) {\n    .card-ultimate-shelf {\n      display: flex;\n      flex-wrap: nowrap;\n      flex-direction: column;\n    }\n  }\n</style>\n\n<body>\n  <section class=\"card-ultimate-shelf\">\n    <div class=\"card-ultimate\" onclick=\"window.location='https://docs.y.uno/v2.0/docs/token-migration-via-api';\">\n      <div>\n        <svg x=\"0px\" y=\"0px\" viewBox=\"0 0 512 512\" style=\"enable-background:new 0 0 512 512;\" xml:space=\"preserve\"\n          width=\"512\" height=\"512\">\n          <g>\n            <path\n              style=\"fill:none;stroke:currentColor;stroke-width:15;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;\"\n              d=\"&#10;&#9;&#9;M327.7,186.794c-0.59,0.049-1.18,0.168-1.756,0.36l-17.836,5.945c-1.858,0.619-3.889,0.494-5.645-0.373&#10;&#9;&#9;c-4.066-2.006-8.28-3.757-12.621-5.233c-1.852-0.629-3.374-1.976-4.249-3.726l-8.405-16.809c-1.27-2.541-3.867-4.146-6.708-4.146&#10;&#9;&#9;h-28.96c-2.841,0-5.438,1.605-6.708,4.146l-8.405,16.809c-0.875,1.75-2.396,3.097-4.249,3.726&#10;&#9;&#9;c-4.342,1.475-8.556,3.226-12.621,5.233c-1.757,0.867-3.787,0.992-5.645,0.373l-17.836-5.945c-2.695-0.898-5.666-0.197-7.675,1.812&#10;&#9;&#9;l-20.478,20.478c-2.009,2.009-2.71,4.98-1.812,7.675l5.945,17.836c0.62,1.858,0.494,3.889-0.373,5.645&#10;&#9;&#9;c-2.006,4.066-3.757,8.28-5.233,12.621c-0.629,1.852-1.976,3.374-3.726,4.249l-16.809,8.405c-2.541,1.27-4.146,3.867-4.146,6.708&#10;&#9;&#9;v28.96c0,2.841,1.605,5.438,4.146,6.708l16.809,8.405c1.75,0.875,3.097,2.396,3.726,4.249c1.475,4.342,3.226,8.556,5.233,12.621&#10;&#9;&#9;c0.867,1.757,0.992,3.787,0.373,5.645l-5.945,17.836c-0.898,2.695-0.197,5.666,1.812,7.675l20.478,20.478&#10;&#9;&#9;c2.009,2.009,4.98,2.71,7.675,1.812l17.836-5.945c1.858-0.62,3.889-0.494,5.645,0.373c4.066,2.006,8.28,3.757,12.621,5.233&#10;&#9;&#9;c1.852,0.629,3.374,1.976,4.249,3.726l8.405,16.809c1.27,2.541,3.867,4.146,6.708,4.146h28.96c2.841,0,5.438-1.605,6.708-4.146&#10;&#9;&#9;l8.405-16.809c0.875-1.75,2.396-3.097,4.249-3.726c4.342-1.475,8.556-3.226,12.621-5.233c1.757-0.867,3.787-0.992,5.645-0.373&#10;&#9;&#9;l17.836,5.945c2.695,0.898,5.666,0.197,7.675-1.812l20.478-20.478c2.009-2.009,2.71-4.98,1.812-7.675l-5.945-17.836&#10;&#9;&#9;c-0.62-1.858-0.494-3.889,0.373-5.645c2.006-4.066,3.757-8.28,5.233-12.621c0.629-1.852,1.976-3.374,3.726-4.249l16.809-8.405&#10;&#9;&#9;c2.541-1.27,4.146-3.867,4.146-6.708v-28.96c0-2.841-1.605-5.438-4.146-6.708l-16.809-8.405c-1.75-0.875-3.097-2.396-3.726-4.249&#10;&#9;&#9;c-1.475-4.342-3.226-8.556-5.233-12.621c-0.867-1.757-0.992-3.787-0.373-5.645l5.945-17.836c0.898-2.695,0.197-5.666-1.812-7.675\" />\n\n            <polyline\n              style=\"fill:none;stroke:currentColor;stroke-width:15;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;\"\n              points=\"&#10;&#9;&#9;209.406,256 178.344,287.062 209.406,318.125 &#9;\" />\n\n            <polyline\n              style=\"fill:none;stroke:currentColor;stroke-width:15;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;\"\n              points=\"&#10;&#9;&#9;302.594,256 333.656,287.062 302.594,318.125 &#9;\" />\n\n            <line\n              style=\"fill:none;stroke:currentColor;stroke-width:15;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;\"\n              x1=\"271.531\" y1=\"256\" x2=\"240.469\" y2=\"318.125\" />\n            <path\n              style=\"fill:none;stroke:currentColor;stroke-width:15;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;\"\n              d=\"&#10;&#9;&#9;M126.366,457.906H479.5c13.807,0,25-11.193,25-25V116.219\" />\n            <path\n              style=\"fill:none;stroke:currentColor;stroke-width:15;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;\"\n              d=\"&#10;&#9;&#9;M7.5,116.219v316.688c0,13.807,11.193,25,25,25h58.866\" />\n            <path\n              style=\"fill:none;stroke:currentColor;stroke-width:15;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;\"\n              d=\"&#10;&#9;&#9;M55.653,54.094H32.5c-13.807,0-25,11.193-25,25v37.125h497V79.094c0-13.807-11.193-25-25-25H90.653\" />\n            <g>\n              <g>\n\n                <line\n                  style=\"fill:none;stroke:currentColor;stroke-width:15;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;\"\n                  x1=\"473.438\" y1=\"85.156\" x2=\"473.438\" y2=\"85.156\" />\n              </g>\n            </g>\n            <g>\n              <g>\n\n                <line\n                  style=\"fill:none;stroke:currentColor;stroke-width:15;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;\"\n                  x1=\"442.375\" y1=\"85.156\" x2=\"442.375\" y2=\"85.156\" />\n              </g>\n            </g>\n            <g>\n              <g>\n\n                <line\n                  style=\"fill:none;stroke:currentColor;stroke-width:15;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;\"\n                  x1=\"411.312\" y1=\"85.156\" x2=\"411.312\" y2=\"85.156\" />\n              </g>\n            </g>\n          </g>\n        </svg>\n        <h3>\n          Via API\n        </h3>\n      </div>\n\n      <p>\n        The merchant uses Yuno API endpoints to create customers and enroll payment methods.\n      </p>\n    </div>\n    <div class=\"card-ultimate\" onclick=\"window.location='https://docs.y.uno/v2.0/docs/token-migration-via-batch-file';\">\n      <div>\n        <svg viewBox=\"0 0 60 60\" width=\"512\" height=\"512\" fill=\"currentColor\">\n          <path\n            d=\"M30,33A13,13,0,1,0,17,20,13.015,13.015,0,0,0,30,33ZM30,9A11,11,0,1,1,19,20,11.013,11.013,0,0,1,30,9Z\" />\n          <path\n            d=\"M60,32a2.987,2.987,0,0,0-1.883-2.807L46.3,24.39l2.3-.92a2.115,2.115,0,0,0,1.319-1.742C49.975,21.2,50,20.638,50,20s-.025-1.2-.076-1.718A2.12,2.12,0,0,0,48.6,16.529l-2.591-1.035a16.582,16.582,0,0,0-1.5-3.625L45.6,9.3a2.067,2.067,0,0,0-.3-2.169c-.321-.389-.687-.791-1.166-1.281-.475-.464-.877-.83-1.251-1.139A2.075,2.075,0,0,0,40.7,4.4l-2.569,1.1a16.582,16.582,0,0,0-3.625-1.5L33.47,1.4A2.115,2.115,0,0,0,31.728.077a19.442,19.442,0,0,0-3.446,0A2.12,2.12,0,0,0,26.529,1.4L25.494,3.989a16.582,16.582,0,0,0-3.625,1.5L19.3,4.4a2.069,2.069,0,0,0-2.169.3c-.389.321-.791.687-1.281,1.166-.464.475-.83.877-1.139,1.251A2.075,2.075,0,0,0,14.4,9.3l1.1,2.569a16.582,16.582,0,0,0-1.5,3.625L11.4,16.53a2.115,2.115,0,0,0-1.319,1.742C10.025,18.8,10,19.362,10,20s.025,1.2.076,1.718A2.12,2.12,0,0,0,11.4,23.471l2.3.919L1.88,29.2a3.033,3.033,0,0,0,0,5.612l1.705.693-1.708.7a3.033,3.033,0,0,0,0,5.612l1.705.693-1.708.7a3.033,3.033,0,0,0,0,5.612L28.862,59.775a2.994,2.994,0,0,0,2.275,0L58.12,48.805a3.032,3.032,0,0,0,0-5.611L56.411,42.5l1.709-.7a3.032,3.032,0,0,0,0-5.611L56.411,35.5l1.709-.7A2.985,2.985,0,0,0,60,32ZM12.067,21.53C12.022,21.072,12,20.571,12,20s.022-1.072.068-1.54a.117.117,0,0,1,.073-.073L15.2,17.165a1,1,0,0,0,.6-.688,14.546,14.546,0,0,1,1.668-4.023,1,1,0,0,0,.063-.908L16.235,8.515l0-.111c.285-.344.615-.707,1.024-1.125.433-.424.8-.754,1.14-1.039,0,0,.106,0,.111,0l3.031,1.294a1,1,0,0,0,.908-.063A14.546,14.546,0,0,1,26.477,5.8a1,1,0,0,0,.688-.6l1.221-3.055a.116.116,0,0,1,.084-.076,17.487,17.487,0,0,1,3.07,0,.117.117,0,0,1,.073.073L32.835,5.2a1,1,0,0,0,.688.6,14.546,14.546,0,0,1,4.023,1.668,1,1,0,0,0,.908.063l3.031-1.294.111,0c.344.285.707.615,1.125,1.024.424.433.754.8,1.039,1.14,0,.005,0,.106.005.111l-1.294,3.031a1,1,0,0,0,.063.908A14.546,14.546,0,0,1,44.2,16.477a1,1,0,0,0,.6.688l3.055,1.221a.116.116,0,0,1,.076.084c.045.458.067.959.067,1.53s-.022,1.072-.068,1.54a.117.117,0,0,1-.073.073L44.8,22.835a1,1,0,0,0-.6.688,14.546,14.546,0,0,1-1.668,4.023,1,1,0,0,0-.063.908l1.294,3.031-.005.111c-.285.344-.615.707-1.024,1.125-.433.424-.8.754-1.14,1.039,0,0-.106,0-.111.005l-3.031-1.294a1,1,0,0,0-.908.063A14.546,14.546,0,0,1,33.523,34.2a1,1,0,0,0-.688.6l-1.221,3.055a.116.116,0,0,1-.084.076,17.487,17.487,0,0,1-3.07,0,.117.117,0,0,1-.073-.073L27.165,34.8a1,1,0,0,0-.688-.6,14.546,14.546,0,0,1-4.023-1.668,1,1,0,0,0-.908-.063l-3.031,1.294L18.4,33.76c-.344-.285-.707-.615-1.125-1.024-.424-.433-.754-.8-1.039-1.14,0,0,0-.106,0-.111l1.294-3.031a1,1,0,0,0-.063-.908A14.546,14.546,0,0,1,15.8,23.523a1,1,0,0,0-.6-.688l-3.055-1.221A.116.116,0,0,1,12.067,21.53ZM57.36,45.045a1.032,1.032,0,0,1,0,1.908L30.382,57.924a1.013,1.013,0,0,1-.765,0L2.64,46.955a1.033,1.033,0,0,1,0-1.909l3.605-1.467,22.62,9.2a2.994,2.994,0,0,0,2.275,0l22.621-9.2Zm0-7a1.032,1.032,0,0,1,0,1.908L30.382,50.924a1.013,1.013,0,0,1-.765,0L2.64,39.955a1.033,1.033,0,0,1,0-1.909l3.605-1.467,22.62,9.2a2.994,2.994,0,0,0,2.275,0l22.621-9.2Zm0-5.092L30.382,43.924a1.013,1.013,0,0,1-.765,0L2.64,32.955a1.032,1.032,0,0,1,0-1.908l11.937-4.853a16.786,16.786,0,0,0,.919,1.937L14.4,30.7a2.067,2.067,0,0,0,.3,2.169c.321.389.687.791,1.166,1.281.475.464.877.83,1.251,1.139A2.079,2.079,0,0,0,19.3,35.6l2.569-1.1a16.582,16.582,0,0,0,3.625,1.5L26.53,38.6a2.115,2.115,0,0,0,1.742,1.319C28.8,39.975,29.362,40,30,40s1.2-.025,1.718-.076A2.12,2.12,0,0,0,33.471,38.6l1.035-2.591a16.582,16.582,0,0,0,3.625-1.5L40.7,35.6a2.069,2.069,0,0,0,2.169-.3c.389-.321.791-.687,1.281-1.166.464-.475.83-.877,1.139-1.251A2.075,2.075,0,0,0,45.6,30.7l-1.1-2.569a16.622,16.622,0,0,0,.919-1.937L57.36,31.045a1.032,1.032,0,0,1,0,1.908Z\" />\n          <path\n            d=\"M24,23a1,1,0,0,0,.707-.293l2-2a1,1,0,0,0-1.414-1.414l-.246.246A4.989,4.989,0,0,1,30,15a1,1,0,0,0,0-2,7,7,0,0,0-6.98,6.606l-.313-.313a1,1,0,0,0-1.414,1.414l2,2A1,1,0,0,0,24,23Z\" />\n          <path\n            d=\"M34.707,20.707l.246-.246A4.989,4.989,0,0,1,30,25a1,1,0,0,0,0,2,7,7,0,0,0,6.98-6.606l.313.313a1,1,0,0,0,1.414-1.414l-2-2a1,1,0,0,0-1.414,0l-2,2a1,1,0,0,0,1.414,1.414Z\" />\n        </svg>\n        <h3>\n          Via Batch File\n        </h3>\n      </div>\n      <p>\n        The merchant provides Yuno with the customers' data using CSV files. The Yuno's team will create customers and enroll payment methods.\n      </p>\n    </div>\n  </section>\n</body>\n\n"
}
[/block]