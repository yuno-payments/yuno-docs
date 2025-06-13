---
title: Workflows
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
A workflow is a series of sequential steps crafted to handle a specific use case. These workflows are customized to suit the unique needs of individual businesses, guaranteeing a smooth and efficient payment processing journey.

You can use the Yuno payment solutions through two types of workflows:

* **Checkout**: Yuno Checkout is an integration solution based on SDKs. 
* **Direct**: The Direct is a back-to-back integration solution based entirely on API endpoints usage. 

In addition to those two workflows, Yuno also provides integration through e-commerce plugins.

## Checkout

With the Checkout workflow, the Yuno integration into your system will require less code. In addition, Checkout workflow integration options eliminate or reduce your PCI responsibility. You can choose between the three variations available. Access the [Checkout (SDK)](doc:checkout-sdk) page for additional information regarding the available Checkout options, or check the summary table on the [Integration methods](doc:workflows#integration-methods) below to compare all available options.

## Direct

This back-to-back integration approach gives users complete control over the checkout process and allows for a server-to-server connection. Thus, you can build your customized user interface to give your customers a unique and tailored experience. By leveraging Yuno's APIs and server-to-server connection, the Direct workflow is accessible on any platform capable of performing API requests. While this integration method offers great flexibility, it also has higher PCI compliance responsibilities. Access the [Direct page](doc:direct-back-to-back) for additional information.

## Plugins

Yuno plugins offer e-commerce platforms a convenient and secure option for processing payments. By integrating a Yuno plugin into these platforms, merchants can enjoy seamless payment integration with any code requirements and processing with security measures.

## Integration methods

The below table presents a summary of the integration methods offered by Yuno, comparing relevant aspects. For further information, check the pages [Checkout (SDK)](doc:checkout-sdk) or [Direct](doc:direct-back-to-back).

<HTMLBlock>{`
<style>
  .integration-table-container {
    display: flex;
    justify-content: center;
  }

  .integration-table .no-content-cell {
    border: 0;
  }

  .integration-table th,
  .integration-table td {
    padding: 0.5rem 0.5rem !important;
    text-align: center;
  }

  .integration-table th {
    min-width: 125px;
  }

  .integration-table .left-cell,
  .integration-table .top-cell {
    background-color: #9686e4;
    border: 1px solid var(--color-bg-page);
  }

  .integration-table .left-cell {
    border-radius: 30px 0 0 30px;
    text-align: left;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .integration-table .table-icon {
    background-color: white;
    border-radius: 50%;
    margin-right: 10px;
    height: 30px;
    width: 30px !important;
    min-width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .integration-table .top-cell {
    border-radius: 30px 30px 0 0;
    padding: 15px 15px;
    text-align: center;
  }

  .integration-table .line {
    background-color: var(--yuno-purple-40);
    border: 1px solid var(--color-bg-page);
  }

  .integration-table .bold-text {
    font-weight: 600;
    color: white;
  }

  .integration-table {
    display: block !important; 
    overflow-x: auto !important;
  }

  .integration-table svg {
    color: #614ad6;
  }

  .markdown-body table:not(.plain) tr:nth-child(2n){
    background-color: transparent !important;
  }

  .markdown-body table tr + tr {
    border-top: none;
  }

  @media (prefers-color-scheme: dark) {
    .integration-table .line {
      background-color: var(--yuno-purple-50);
      border: 1px solid var(--color-bg-page);
    }
  }

  [data-color-mode="dark"] .card-ultimate {
    border: 1px solid  var(--yuno-purple-50);
  }

  [data-color-mode="dark"] .card-ultimate:hover {
    box-shadow: none;
  }

  [data-color-mode="dark"] .card-ultimate svg {
    color:  var(--yuno-purple-50);
  }

  [data-color-mode="dark"] .card-ultimate h3 {
    color:  var(--yuno-purple-50);
  }
</style>


<body>
  <div class="integration-table-container">
   <table class="integration-table">
      <tr class="">
        <th class="no-content-cell"></th>
        <th class="bold-text top-cell">Direct Flow</th>
        <th class="bold-text top-cell">Secure Fields </th>
        <th class="bold-text top-cell">Lite Checkout</th>
        <th class="bold-text top-cell">Full Checkout </th>
      </tr>
      <tr class="">
        <td class="bold-text left-cell">
          <div class="table-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tools"
              viewBox="0 0 16 16">
              <path
                d="M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3c0-.269-.035-.53-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814L1 0Zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708ZM3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026L3 11Z" />
            </svg>
          </div>
          <div>Integration effort </div>
        </td>
        <td class="line ">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill"
            viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="8" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill"
            viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="8" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill"
            viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="8" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill"
            viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="8" />
          </svg>
        </td>
        <td class="line ">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill"
            viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="8" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill"
            viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="8" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill"
            viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="8" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle"
            viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          </svg>

        </td>
        <td class="line ">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill"
            viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="8" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill"
            viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="8" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle"
            viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle"
            viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          </svg>
        </td>
        <td class="line ">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill"
            viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="8" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle"
            viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle"
            viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle"
            viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          </svg>
        </td>
      </tr>
      <tr class="">
        <td class="bold-text left-cell">
          <div class="table-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
              class="bi bi-window-fullscreen" viewBox="0 0 16 16">
              <path
                d="M3 3.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm1.5 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm1 .5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z" />
              <path
                d="M.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5h15a.5.5 0 0 0 .5-.5v-13a.5.5 0 0 0-.5-.5H.5ZM1 5V2h14v3H1Zm0 1h14v8H1V6Z" />
            </svg>
          </div>
          <div> UI customization</div>
        </td>
        <td class="line ">Full</td>
        <td class="line ">UI</td>
        <td class="line ">Branding</td>
        <td class="line ">Branding</td>
      </tr>
      <tr class="">
        <td class="bold-text left-cell ">
          <div class="table-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-shield-lock"
              viewBox="0 0 16 16">
              <path
                d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z" />
              <path
                d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415z" />
            </svg>
          </div>
          <div> PCI compliance</div>
        </td>
        <td class="line ">AOC - PSI DSS</td>
        <td class="line ">SAQ-A</td>
        <td class="line ">N/A</td>
        <td class="line ">N/A</td>
      </tr>
      <tr class="">
        <td class="bold-text left-cell ">
          <div class="table-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-toggles"
              viewBox="0 0 16 16">
              <path
                d="M4.5 9a3.5 3.5 0 1 0 0 7h7a3.5 3.5 0 1 0 0-7h-7zm7 6a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm-7-14a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm2.45 0A3.49 3.49 0 0 1 8 3.5 3.49 3.49 0 0 1 6.95 6h4.55a2.5 2.5 0 0 0 0-5H6.95zM4.5 0h7a3.5 3.5 0 1 1 0 7h-7a3.5 3.5 0 1 1 0-7z" />
            </svg>
          </div>
          <div> Payment flow control</div>
        </td>
        <td class="line ">Yes</td>
        <td class="line ">Yes</td>
        <td class="line ">No</td>
        <td class="line ">No</td>
      </tr>
    </table>
  </div>
</body>
`}</HTMLBlock>

**Checkout SDK** (Full Checkout and Lite Checkout):

* Full control of your own payment experience. Merchants have control of which payment methods they want to show to the user in the checkout and enroll to their platform.
* Available for Web/iOS/Android.
* Use cases: Adaptation to merchant’s experience - shared checkout.

**Secure Fields SDK**:

* Adheres to PCI security standards and eliminates the need your handle sensitive data.
* It provides a pre-built UI that you can customize to fit your brand.
* Available for Web/iOS/Android.

**Direct Flow**:

* It enables you to build your own UI.
* Take advantage of Yuno's APIs and server-to-server connection.
* Available for any platform capable of performing API requests.

In addition to the above options, Yuno also provides **Plugins** for e-commerce platforms. Plugins provide an easy, fast, and secure way to integrate new payment methods into your checkout.

Yuno solutions provide flexibility to help you improve your user payment experience and improve your conversion. You can easily integrate multiple payment methods into your checkout process, including credit cards, debit cards, local bank transfers, and cash payments. 

## Integration methods

You can use different options to integrate Yuno. Below you find an explanation related to each integration option available. Click on the desired option to be redirected to the specific page to get more details regarding how each integration works and the integration process.

<HTMLBlock>{`
<style>
  .card-ultimate-shelf {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    gap: 10px
  }

  .card-ultimate {
    /* grid-column: span 2; */
    display: grid;
    grid-template-columns: 50px 1fr;
    padding: 0.7rem;
    flex: 1;
    border-radius: 7px;
    border: 1px solid var(--yuno-purple);
    transition: transform .2s;
  }

  /* .card-ultimate:nth-last-child(1):nth-child(odd) {
    grid-column: 2 / span 2;
  } */

  .card-ultimate:hover {
    transform: scale(1.02);
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  .card-ultimate svg {
    color: var(--yuno-purple);
    height: 30px;
    width: 30px;
    margin-bottom: 10px;
  }

  .card-ultimate h3 {
    font-size: 1rem;
    color: var(--yuno-purple);
    margin: 0 0 0.5rem 0;
    display: flex;
    align-items: center;
  }

  .card-ultimate h3 svg {
    margin: 0 15px 0 0;
  }

  .card-ultimate p {
    margin: 0;
  }

  .card-ultimate a {
    text-decoration: none;
    color: inherit;
  }

  /* ------------------------ define the configuration for DARK Mode ------------------------  */

  @media (prefers-color-scheme: dark) {
    .card-ultimate {
      border: 1px solid var(--yuno-purple-50);
    }

    .card-ultimate:hover {
      box-shadow: none;
    }

    .card-ultimate svg {
      color: var(--yuno-purple-50);
    }

    .card-ultimate h3 {
      color: var(--yuno-purple-50);
    }
  }

  [data-color-mode="dark"] .card-ultimate {
    border: 1px solid var(--yuno-purple-50);
  }

  [data-color-mode="dark"] .card-ultimate:hover {
    box-shadow: none;
  }

  [data-color-mode="dark"] .card-ultimate svg {
    color: var(--yuno-purple-50);
  }

  [data-color-mode="dark"] .card-ultimate h3 {
    color: var(--yuno-purple-50);
  }
</style>

<body>
  <section class="card-ultimate-shelf">
    <div class="card-ultimate" onclick="window.location='the-ultimate-checkout-full';">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-box"
        viewBox="0 0 16 16">
        <path
          d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z" />
      </svg>
      <div>
        <h3>
          Full Checkout
        </h3>
        <p>
          The Full Checkout SDK will render the payment methods your company has available both in the checkout and in the user profile to enroll with your platform. 
        </p>
      </div>
    </div>
    <div class="card-ultimate" onclick="window.location='the-ultimate-checkout-lite';">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-list-check"
        viewBox="0 0 16 16">
        <path fill-rule="evenodd"
          d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z" />
      </svg>
      <div>
        <h3>
          Lite Checkout
        </h3>
        <p>
          With the Lite Checkout SDK, you can access a service that provides a list of available payment methods for both payment and enrollment. You have the power to decide which payment methods are displayed to the user.
        </p>
      </div>
    </div>
        <div class="card-ultimate" onclick="window.location='secure-fields';">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-lock"
        viewBox="0 0 16 16">
        <path
          d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 5.996V14H3s-1 0-1-1 1-4 6-4c.564 0 1.077.038 1.544.107a4.524 4.524 0 0 0-.803.918A10.46 10.46 0 0 0 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h5ZM9 13a1 1 0 0 1 1-1v-1a2 2 0 1 1 4 0v1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2Zm3-3a1 1 0 0 0-1 1v1h2v-1a1 1 0 0 0-1-1Z" />
      </svg>
      <div>
        <h3>
          Secure Fields
        </h3>
        <p>
          Create your own checkout user experience without the need of being PCI compliant.
        </p>
      </div>
    </div>
    <!-- <div class="card-ultimate" onclick="window.location='https://docs.y.uno/docs/the-ultimate-checkout';">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" class="bi bi-bag-check"
        viewBox="0 0 16 16">
        <path fill-rule="evenodd"
          d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
        <path
          d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
      </svg>
      <h3>
        Ultimate Checkout
      </h3>
      <p>
        Use Yuno’s fully unified checkout experience. Add a web and mobile optimized UI to your service and provide
        payment methods personalized by you using our no-code Merchant Dashboard.
      </p>
    </div> -->
    <div class="card-ultimate" onclick="window.location='direct-flow';">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" class="bi bi-compass"
        viewBox="0 0 16 16">
        <path
          d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016zm6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
        <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z" />
      </svg>
      <div>
        <h3>
          Direct Flow
        </h3>
        <p>
          Build your own UI, and process transactions using only Yuno's APIs and a server-to-server connection.
          Create your personalized payments checkout experience.
        </p>
      </div>
    </div>

    <div class="card-ultimate" onclick="window.location='vtex';">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plugin" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1 8a7 7 0 1 1 2.898 5.673c-.167-.121-.216-.406-.002-.62l1.8-1.8a3.5 3.5 0 0 0 4.572-.328l1.414-1.415a.5.5 0 0 0 0-.707l-.707-.707 1.559-1.563a.5.5 0 1 0-.708-.706l-1.559 1.562-1.414-1.414 1.56-1.562a.5.5 0 1 0-.707-.706l-1.56 1.56-.707-.706a.5.5 0 0 0-.707 0L5.318 5.975a3.5 3.5 0 0 0-.328 4.571l-1.8 1.8c-.58.58-.62 1.6.121 2.137A8 8 0 1 0 0 8a.5.5 0 0 0 1 0Z"/>
</svg>
      <div>
        <h3>
          Yuno Plugins
        </h3>
        <p>
          Yuno plugins offer e-commerce platforms a convenient and secure option for processing payments.
          By integrating a Yuno plugin into these platforms, merchants can enjoy seamless payment processing with
          security measures.
        </p>
      </div>
    </div>
  </section>
</body>
`}</HTMLBlock>
