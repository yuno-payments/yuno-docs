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
Yuno's Smart Retries use advanced machine learning techniques to determine the best timing for retrying a declined recurring credit card payment. By analyzing a wide range of data points and transaction attributes, it increases the likelihood of payment success, ensuring a consistent revenue stream and reducing involuntary subscriber churn.

### Key advantages

Yuno's Smart Retries offer several benefits that enhance payment processes and revenue recovery:

* **Data-driven decision-making**: Leverages machine learning to create the most effective retry schedule.
* **Enhanced revenue retrieval**: Increases the chances of successfully collecting payments.
* **Decreased subscriber turnover**: Minimizes disruptions and involuntary subscriber departures.
* **Flexible logic**: Allows customization of retry schedules to maximize success opportunities.
* **Comprehensive approach**: Works in conjunction with other revenue recovery strategies.

### Retry schedule

Yuno uses a personalized approach for each unsuccessful payment, guided by continuous analysis and machine learning. This method evolves over time to identify the optimal moment for retrying a transaction.

| Event       | Deadline after the first attempt |
| :---------- | :------------------------------- |
| First try   | -                                |
| Second try  | 5 minutes                        |
| Third try   | 60 minutes                       |
| Fourth try  | 5 hours                          |
| Fifth try   | 24 hours                         |
| Sixth try   | 48 hours                         |
| Seventh try | 96 hours                         |

### Customization

Every business model is unique, so we allow merchants to define specific rules to enhance the flexibility of our retry schedule. When creating the subscription object, you can use the `retries` structure to make adjustments:

| Parameter          | Type   | Description                                                                                                                                    | Example |
| :----------------- | :----- | :--------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| retry\_on\_decline | bool   | Indicates whether to retry a payment after a first decline. Defaults to false.                                                                 | TRUE    |
| amount             | number | Specifies the number of retries the subscription plan will have to completion. If not set, or if higher than 7, the default is 7. Max: 7       | 4       |
