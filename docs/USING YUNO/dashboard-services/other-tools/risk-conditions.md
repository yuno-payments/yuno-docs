---
title: Risk Conditions
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
Yuno's **Risk conditions** empower merchants with advanced fraud prevention tools. This feature allows you to create and manage user lists and custom rules tailored to your business model, offering the flexibility to adapt protection strategies to your specific needs. Using the Risk conditions section reduces unnecessary requests to fraud prevention providers, optimizing resources and enhancing operational efficiency.

<body>
  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <h3>Go to the routing section to include your lists and rules in your routes</h3>
      <div class="contentContainer">
        <p>
          Activate the Risk Conditions provider in the Connections section. Once the connection is established, add it to your routes, where you can then select the specific list(s) and/or rule(s) you want to use for each condition set.</a>.
				</p>
      </div>
    </div>
  </div>
</body>

Currently, the Risk conditions section provides three main tabs:

- [Rules](#rules)
- [Blocklists](#blocklists) 
- [Allowlists](#allowlists) 

## Rules

Yuno offers customizable velocity rules to help detect and respond to suspicious behaviour patterns, such as sudden surges in transaction volume over a short period. This proactive approach helps mitigate risks associated with stolen cards or compromised accounts exploited by cybercriminals.

With Yuno, you can create protection rules tailored to your specific business needs. These rules monitor transaction frequency and volume per individual account, allowing you to detect unusual activity in real time. You can select from multiple rule types and combine them to target specific fraudulent behaviours with precision.

[block:html]
{
  "html": "<style>\n.infoBlockContainer h3 {\n  margin: 0;\n  }\n</style>\n\n<body>\n  <div class=\"infoBlockContainer alert\">\n    <div class=\"verticalLineAlert\"></div>\n    <div>\n      <div class=\"contentContainer\">\n        <h3>Rule example</h3>\n        <p>\n\t\t\t\t\tBlock payments if the number of payments per user exceeds 5, with an amount greater than 50 USD per payment, within a 10-minute timeframe, at the account level in Colombia. \n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


[block:html]
{
  "html": "<div style=\"background-color: #FFFFF; padding: 16px; display: flex; justify-content: center; border-radius:14px;\">\n  <video src=\"https://github.com/writechoiceorg/yuno-images/raw/main/doc/yourPaymentsOperationSystem/routing-v2.mp4\" loop autoplay muted playsinline style=\"width:100%; height:100%; border-radius:14px; display:block; object-fit:cover; background-color:rgba(0, 0, 0, 0); object-position:50% 50%; box-shadow: 0px 0px 0px 0px rgba(40, 42, 47, 0.05), 0px 3px 6px 0px rgba(40, 42, 47, 0.05), 0px 11px 11px 0px rgba(40, 42, 47, 0.04), 0px 25px 15px 0px rgba(40, 42, 47, 0.02), 0px 44px 18px 0px rgba(40, 42, 47, 0.01), 0px 69px 19px 0px rgba(40, 42, 47, 0.00);\"></video>\n</div>"
}
[/block]


In addition to blocking fraudulent payments, Yuno's rules also help identify secure transactions. You can automatically bypass Fraud Screening or 3DS for verified payments to streamline the user experience. However, it's important to configure these rules carefully, as incorrect settings may lead to security gaps or unintended transaction blocks.

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer\">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <h3>Remove rules and lists (blocklists and allowlist)</h3>\n      <div class=\"contentContainer\">\n        <p>\n          You can't delete allowlists, blocklists, or rules. Yuno uses this approach to ensure you'll have access to the history of affected payments. If you want to stop using a rule or a list, you only need to remove it from your routes.\n        </p>\n      </div>\n    </div>\n  </div>\n</body>\n\n"
}
[/block]


Within the **Rules** tab, select **Create rule** to configure your own rules. Set the following parameters based on your needs:

- **Name**: Give your rule a memorable name and description.
- **Rule type**: Track the number of payments or cards used by a user within a specific timeframe. Add conditions to track shipping changes, IP addresses, card brands, and more.
- **Settings**: Define the parameter used to count users, the types of payments to include (succeded, declined, etc.), and whether to count payments across the organization or the only current account.
- **Outcome**: Choose to allow, block, review, or test payments when a rule is triggered.
- **Apply this list to other accounts**: Choose whether to apply the rule to other accounts.

## Blocklists

Blocklists help prevent fraudulent activity by automatically declining payments from users that match specific parameters. You can manually add users to the list or upload a CSV file to block multiple users at once. It's also possible to configure an automatic removal period for each entry.

A payment will be blocked if it matches any of the following:

- Email
- Phone number
- Card BIN
- IP address
- Merchant customer ID
- Card BIN + last 4 digits
- Document number
- Customer ID
- Card/bank account holder name
- Device ID
- Shipping address

From the **Blocklists** tab, click **Create blocklist** to configure these parameters:

1. **List name**: Enter a clear, descriptive name for the blocklist.
2. **List type**: Select the parameter you want to block by (email, phone number, card BIN, device ID, etc.).
3. **Add emails**: You can either:
   - Enter individual values directly into the field (separated by commas or tabs), or
   - Upload a CSV file containing a batch of entries.
   - Optionally, enable the setting to **automatically remove entries** after a specified period of time.
4. **Apply this list to other accounts**: Select which accounts the blocklist should apply to. By default, it only applies to the current account, but you can include other accounts by checking them from the list.

## Allowlists

Allowlists let you automatically approve transactions from trusted users based on matching parameters. This reduces friction and improves the experience for known, verified customers. You can add users manually or in bulk via CSV, and also configure automatic expiration for each entry.

Users can be allowlisted based on:

- Email
- Phone number
- Card BIN
- IP address
- Merchant customer ID
- Card BIN + Last 4 digits
- Document number
- Customer ID
- Card/bank account holder name
- Device ID
- Shipping address

From the **Allowlists** tab, click **Create allowlist** to configure these parameters:

1. **List name**: Enter a descriptive name for the allowlist.
2. **List type**: Choose the parameter to match against, such as an email, card BIN, or device ID.
3. **List outcome**: Select what happens when a match is found:
   - Skip fraud screening
   - Skip 3DS
   - Skip both fraud screening and 3DS
4. **Add emails**: Add addresses manually (separated by commas or tabs) or upload a CSV file.
5. **Auto-remove**: Optionally enable automatic removal after a defined period of time.
6. **Apply to accounts**: Choose which accounts the list should apply to. By default, it's limited to the current account, but you can apply it to others as needed.

## Adding the Risk conditions connection

You must configure the **Risk conditions** connection to enable rules and lists. Follow these steps to set it up once you have created your rules and lists:

1. Navigate to **Connections** in the dashboard, search for **Risk conditions**, and click **Connect**.
2. Follow the simple on-screen instructions to add the Risk condition connection. 
3. Access **Routing** in the dashboard, select a route and add **Risk conditions** to it. From here, you can select which rules and lists to use for that payment method.
4. Publish your route to activate the changes.

[block:html]
{
  "html": "<div style=\"background-color: #FFFFF; padding: 16px; display: flex; justify-content: center; border-radius:14px;\">\n  <video src=\"https://github.com/writechoiceorg/yuno-images/raw/main/doc/yourPaymentsOperationSystem/risk_routing.mp4\" loop autoplay muted playsinline style=\"width:100%; height:100%; border-radius:14px; display:block; object-fit:cover; background-color:rgba(0, 0, 0, 0); object-position:50% 50%; box-shadow: 0px 0px 0px 0px rgba(40, 42, 47, 0.05), 0px 3px 6px 0px rgba(40, 42, 47, 0.05), 0px 11px 11px 0px rgba(40, 42, 47, 0.04), 0px 25px 15px 0px rgba(40, 42, 47, 0.02), 0px 44px 18px 0px rgba(40, 42, 47, 0.01), 0px 69px 19px 0px rgba(40, 42, 47, 0.00);\"></video>\n</div>"
}
[/block]


[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer\">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <h3>Remove rules and blocklists</h3>\n      <div class=\"contentContainer\">\n        <p>\n          You can't delete blocklists or rules. Yuno uses this approach to ensure you'll have access to the history of affected payments. If you want to stop using a rule or blocklist, you only need to remove it from your routes.\n        </p>\n      </div>\n    </div>\n  </div>\n</body>\n\n"
}
[/block]