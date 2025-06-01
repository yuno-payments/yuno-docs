---
title: Enrollment Status
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: >-
    Yuno gives customers the possibility to enroll a payment method in order to
    use it for future purchases and have a seamless payment experience. That
    payment method enrollment can be used either in our Full or Lite payment
    implementation and could have one of the following statuses.
  robots: index
next:
  description: ''
---
Yuno gives customers the possibility to enroll a payment method to use it for future purchases and have a seamless payment experience. That payment method enrollment can be used either in our [Full](https://docs.y.uno/docs/full-sdk-workflow) or [Lite](https://docs.y.uno/docs/the-ultimate-checkout-lite#lite-enrollment-implementation) payment implementation and could have one of the following statuses. 

## Workflow

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/bd36fb7-enroll_workflow1.png",
        null,
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


## Payment method status

| Status              | Transaction Type | Description                                             |
| :------------------ | :--------------- | :------------------------------------------------------ |
| CREATED             | Enrollment       | Initial state at the time of creating a payment method. |
| EXPIRED             | Enrollment       | The payment method has been expired.                    |
| REJECTED            | Enrollment       | Yuno has rejected the payment method enrollment.        |
| READY_TO_ENROLL     | Enrollment       | The payment method is available for enrollment.         |
| DECLINED            | Enrollment       | The payment method has been declined.                   |
| CANCELED            | Enrollment       | The payment method has been canceled.                   |
| ENROLL_IN_PROCESS   | Enrollment       | The payment method enrollment is being processed.       |
| ENROLLED            | Enrollment       | The payment method enrollment has been successful.      |
| UNENROLL_IN_PROCESS | Enrollment       | The payment method unenrollment is being processed.     |
| UNENROLLED          | Enrollment       | The payment method has been unenrolled.                 |