---
title: Risk Conditions (COPY)
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
Yuno's Risk Conditions is a module designed to empower merchants with comprehensive fraud prevention capabilities. It enables merchants to create and manage user lists and custom rules tailored to their business model. The Risk Conditions module provides flexibility and efficiency to merchants, who can customize lists and rules to suit their requirements. 

Using the Risk Conditions module, merchants reduce unnecessary requests to fraud prevention providers, optimizing resources and enhancing operational efficiency.

Currently, the Risk Conditions provides three main features:

* [Blocklists](#blocklists) 
* [Allowlists](#allowlists) 
* [Rules](#rules)

## Blocklists

Blocklists allow you to safeguard against fraudulent activities by creating a list of users whose payments you wish to decline automatically. With Blocklists, you can manually add individual entries or upload a CSV file containing a batch of blocked users. Additionally, you can remove users from the blocklist automatically after a specified period. Payments from users are automatically declined if any of the following parameters match:

* Email
* Phone number
* Card BIN
* IP address

## Allowlists

Allowlists enable you to approve users' authenticity when certain parameters match automatically. This feature is particularly useful for reducing friction for trusted users and enhancing their transaction experience. You can create Allowlists based on the following parameters:

* Email
* Phone number
* Card BIN
* IP address
* Merchant customer ID (an ID used within the merchant system to identify a customer)

If a customer's parameter matches an existing entry in the Allowlist, you can specify one of the following actions to be performed:

* Skip fraud screening
* Skip 3DS
* Skip both fraud screening and 3DS

Similar to Blocklists, you can manually add individual users to an Allowlist or upload a CSV file containing a batch of users. Additionally, you can set a period after which users are automatically removed from the Allowlist

## Rules

Yuno offers customizable velocity rules to efficiently identify and respond to suspicious behaviour patterns, such as a sudden surge in transaction volume within a short timeframe. This proactive approach helps mitigate risks associated with stolen cards or compromised accounts exploited by cybercriminals, for example.

With Yuno, you can customize protection rules to your specific needs. These rules continuously analyze transaction frequency and volume linked to individual accounts, allowing you to avoid potential threats. You can select from various rule types and combine them to target specific fraudulent behaviours precisely. Also, you can choose different parameters to count user actions and specify payment methods for monitoring.

<HTMLBlock>{`
<style>
.infoBlockContainer h3 {
  margin: 0;
  }
</style>

<body>
  <div class="infoBlockContainer alert">
    <div class="verticalLineAlert"></div>
    <div>
      <div class="contentContainer">
        <h3>Rule example</h3>
        <p>
					Block payments if the number of payments per user exceeds 5, with an amount greater than 50 USD per payment, within a 10-minute timeframe, at the account level in Colombia. 
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

<HTMLBlock>{`
<div style="background-color: #FFFFF; padding: 16px; display: flex; justify-content: center; border-radius:14px;">
  <video src="https://github.com/writechoiceorg/yuno-images/raw/main/doc/yourPaymentsOperationSystem/risk_rule.mp4" loop autoplay muted playsinline style="width:100%; height:100%; border-radius:14px; display:block; object-fit:cover; background-color:rgba(0, 0, 0, 0); object-position:50% 50%; box-shadow: 0px 0px 0px 0px rgba(40, 42, 47, 0.05), 0px 3px 6px 0px rgba(40, 42, 47, 0.05), 0px 11px 11px 0px rgba(40, 42, 47, 0.04), 0px 25px 15px 0px rgba(40, 42, 47, 0.02), 0px 44px 18px 0px rgba(40, 42, 47, 0.01), 0px 69px 19px 0px rgba(40, 42, 47, 0.00);"></video>
</div>
`}</HTMLBlock>

In addition to preventing fraudulent payments, Yuno's rules also help identify secure transactions. You can choose to bypass Fraudulent Screening or 3DS for verified payments automatically. However, exercising caution when configuring these rules is crucial, as improper settings can have significant consequences.

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <h3>Remove Rules and lists (Blocklists and Allowlist)</h3>
      <div class="contentContainer">
        <p>
          You can't delete Allowlists, Blocklists, or Rules. Yuno uses this approach to ensure you'll have access to the history of affected payments. If you want to stop using a Rule or a list, you only need to remove it from your routes.
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

## Using rules and lists

To configure and use Risk Conditions, follow the steps below:

1. First, you need to create your rules and list (allowlist or blocklist). Access **Risk Conditions** in the dashboard and select **Blocklist** or **Allowlist** to create or edit lists, or select **Rules** to create and edit velocity rules.
2. Connect your account to the **Risk Conditions** connection. Navigate to **Connections** in the dashboard, search by **Risk Conditions**, and click **Connect**.
3. Add the Risk Condition provider to the desired route(s). Access **Routing** in the dashboard, select a route and add the  **Risk Conditions** to it.
4. Add the Risk Condition to your route. You can add multiple Risk Conditions to your route, one for each condition. After adding the Risk Condition, you can select the blocklists and rules you want to use for that payment method.

<HTMLBlock>{`
<div style="background-color: #FFFFF; padding: 16px; display: flex; justify-content: center; border-radius:14px;">
  <video src="https://github.com/writechoiceorg/yuno-images/raw/main/doc/yourPaymentsOperationSystem/risk_routing.mp4" loop autoplay muted playsinline style="width:100%; height:100%; border-radius:14px; display:block; object-fit:cover; background-color:rgba(0, 0, 0, 0); object-position:50% 50%; box-shadow: 0px 0px 0px 0px rgba(40, 42, 47, 0.05), 0px 3px 6px 0px rgba(40, 42, 47, 0.05), 0px 11px 11px 0px rgba(40, 42, 47, 0.04), 0px 25px 15px 0px rgba(40, 42, 47, 0.02), 0px 44px 18px 0px rgba(40, 42, 47, 0.01), 0px 69px 19px 0px rgba(40, 42, 47, 0.00);"></video>
</div>
`}</HTMLBlock>
