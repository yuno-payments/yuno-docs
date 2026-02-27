---
title: Smart Retries
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

| Parameter            | Type    | Description                                                                                     |
| :------------------- | :------ | :---------------------------------------------------------------------------------------------- |
| `retry_on_decline`   | boolean | Whether to retry a payment after a first decline. Defaults to `false`.                          |
| `strategy`           | string  | The retry strategy. Possible values: `DEFAULT`, `CUSTOM_SCHEDULE`.                              |
| `amount`             | integer | Number of retry attempts. Used with `DEFAULT` strategy. Max: 6. Defaults to 6 if not set.       |
| `schedule`           | array   | Custom retry schedule. Required with `CUSTOM_SCHEDULE` strategy. See schedule format below.      |
| `stop_on_hard_decline` | boolean | Whether to stop the retry schedule after a hard decline.                                       |

#### Retry strategies

Yuno supports two retry strategies. The fields you need to provide depend on the strategy you choose:

**`DEFAULT`** — Uses Yuno's built-in retry timing (see the [retry schedule](#retry-schedule) table above).

* `amount` is required. If omitted or higher than 6, defaults to 6.
* `schedule` is ignored even if provided.

**`CUSTOM_SCHEDULE`** — Lets you define your own retry intervals.

* `schedule` is required.
* `amount` is ignored; the number of retries is determined by the schedule items.

#### Schedule format

When using `CUSTOM_SCHEDULE`, provide an array of schedule items. Each item requires:

| Field           | Type    | Description                                      |
| :-------------- | :------ | :----------------------------------------------- |
| `attempt`       | integer | The retry attempt number. Must start at 1.       |
| `delay_seconds` | integer | Seconds to wait before this retry attempt fires.  |

**Validation rules:**

* Both `attempt` and `delay_seconds` are required for each item.
* Attempt numbers must be sequential starting at 1 (1, 2, 3, ...).
* Duplicate attempt numbers are not allowed.

**Example:**

```json
{
  "retries": {
    "retry_on_decline": true,
    "strategy": "CUSTOM_SCHEDULE",
    "schedule": [
      { "attempt": 1, "delay_seconds": 300 },
      { "attempt": 2, "delay_seconds": 3600 },
      { "attempt": 3, "delay_seconds": 86400 }
    ]
  }
}
```

#### Changing strategy on update

You can change the retry strategy by sending an [Update Subscription](ref:update-subscription) request:

* Switching to `CUSTOM_SCHEDULE` requires sending `schedule`.
* Switching to `DEFAULT` requires sending `amount` (or it defaults to max).

> 📘 Retries in progress
>
> If retries are already scheduled for the current billing cycle, updating the retry configuration does **not** modify them. The new configuration applies starting from the next payment.
