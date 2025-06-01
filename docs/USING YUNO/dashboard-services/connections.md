---
title: Connections
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: Connections
  description: >-
    The Connections section within the dashboard enables users to integrate and
    manage various providers, including payment methods, payment processors, and
    anti-fraud solutions.
  robots: index
next:
  description: ''
---
The Connections section within the dashboard enables you to integrate and manage various providers, including payment methods, payment processors, and anti-fraud solutions. The ability to connect with providers from around the world using Yuno greatly reduces integration times and brings additional functionalities to your customers, increasing conveniency and revenue.

Let's walk through the process of adding, creating, and managing connections to enhance your payment processing and routing capabilities.

## Adding a connection

1. The **Explore** tab will display by default when opening Connections in the dashboard. From here, browse through the list of available providers or use the **Search** box to find your desired connection. Providers may include payment methods, processors, and anti-fraud solutions. Click **Connect** to proceed.

<Image align="center" src="https://files.readme.io/58912e88e076fb19b2d3270d9c014997fb701da710ce2ab95371cd339f4d85ca-Conections.png" />

2. After selecting a provider, you will start the quick three-step process to configure the connection. First, you will be asked for provider credentials, necessary to establish a secure connection. Enter a memorable name for the connection and then enter the details required. The specific information you must enter will vary by provider, though you'll most likely have this data beforehand. Feel free to reach out to the provider in case you're unsure about any of these fields or missing information. Optionally, you may check **3DS Credentials** and enter the required data to activate the feature. Click **Next**.

<Image align="center" src="https://files.readme.io/b83119ee6039bf9acdcbfd663efa5cba83e5636e850242ad805f7d11c6f47d8a-Conections_1.png" />

3. The next screen, **Set up costs**, will let you enter cost information to use in Smart Routing. Select **Set up cost** to enter costs for successful and unsuccessful payments. This option is entirely optional, so you may click **Next** without entering data.

4. **Set up accounts** lets you select the accounts that will be affected by the changes. Check specific accounts or **Current account only** and click **Save** to finish. The system will confirm the connection has been created, establishing a bridge between your Yuno account and the chosen provider.

5. With your connections set, you can proceed to the [Routing](https://docs.y.uno/docs/routing) section to configure payment processing routes using the provider and payment methods you have available within Yuno.

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <h3>Set up costs for new connections</h3>
      <div class="contentContainer">
        <p>
          When you add a new connection, you can set up its costs. This optional step allows you to set different costs for successful and unsuccessful payments to help manage fees using the <a href="/docs/routing#smart-routing">Smart Routing feature</a>.
				</p>
        <p>
					You can set default costs for all payments and add specific conditions for different situations, like setting a unique cost when a customer uses Visa.
				</p>
        <p>
					Costs are applied in the order you create them, but you can rearrange them by dragging and dropping. This setup helps Yuno Payments automatically choose the most cost-effective route for each transaction when you activate the Smart Routing.
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

## Managing connections

The **Your connections** tab within Connections allows you to manage existing connections to suit your evolving business needs. Available actions include:

* **Editing connections**: Easily update credentials or change a connection's settings by selecting the three dots next to the connection and selecting **Edit**.
* **Pausing and unpausing connections**: To temporarily halt the interaction with a specific provider, you can choose to **Pause** a connection. When ready to resume, simply **Unpause** it. This flexibility allows you to adapt to changing circumstances without having to redo your connections.
* **Deleting connections**: If a connection is no longer needed, you can delete it. Exercise caution when deleting connections, as this action is irreversible.
* **Managing multiple connections**: Check the box next to two or more connections to pause, unpause and delete connections in bulk.
