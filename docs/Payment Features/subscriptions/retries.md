---
title: Smart Retries
excerpt: >-
  Enhance payment success rates using Yuno's Smart Retries. Utilize machine
  learning to optimize transaction retry attempts.
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
Yuno's Smart Retries employ advanced machine learning techniques to identify the optimal timing for retrying a declined recurring credit card payment. By analyzing extensive data points and transaction attributes, it improves the probability of payment success, ensuring a steady flow of revenue and reducing involuntary subscriber churn.

### Key advantages

- _Data-driven decision-making_: Utilizes machine learning to establish the most effective retry schedule.
- _Enhanced revenue retrieval_: Boosts the likelihood of successfully collecting payments.
- _Decreased subscriber turnover_: Reduces disruptions and involuntary subscriber departures.
- _Flexible logic_: Customizes retry schedules to maximize success opportunities.
- _Comprehensive approach_: Complements other revenue recovery strategies.

### Retry schedule

Yuno implements a personalized approach for each unsuccessful payment, informed by continuous analysis and machine learning. This approach evolves over time, striving to pinpoint the optimal moment for reattempting a transaction. 

| Event       | Deadline after the first try |
| :---------- | :--------------------------- |
| First try   | -                            |
| Second try  | 5 minutes                    |
| Third try   | 60 minutes                   |
| Fourth try  | 5 hours                      |
| Fifth try   | 24 hours                     |
| Sixth try   | 48 hours                     |
| Seventh try | 96 hours                     |

### Customization

Since every business model varies, we enable merchants to define specific rules to enhance the flexibility of our retry schedule. While you create the subscription object you can use the `retries` structure to make adjustments: 

| Parameter        | Type   | Description                                                                                                                                  | Example |
| :--------------- | :----- | :------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| retry_on_decline | bool   | If we should retry a payment or not after a first decline. False by default.                                                                 | TRUE    |
| amount           | number | The number of retries that the subscription plan will have to completion. If not set, or higher than 7, 7 will be defined as default. Max: 7 | 4       |