---
title: Lite SDK (Enrollment)
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: Lite SDK (Enrollment)
  description: >-
    Similarly to the Full Payment Implementation, if you want to enroll/save the
    customer's payment method for a frictionless purchase experience using our
    payment_method_token, you must follow a few steps on this page.
  robots: index
next:
  description: ''
---
The **Lite SDK** provides full control over your payment experience. It allows you to:

* Control the payment methods displayed to your customers.
* Enroll new payment methods to the customer’s account.

This page focuses on the **enrollment** process. For details on the payment process, refer to [Lite SDK (Payment)](doc:the-ultimate-checkout-lite).

If you wish to save cards during the payment, you can do so while the customer pays. For more information, see [Lite SDK (Payment)](doc:the-ultimate-checkout-lite#enroll-a-credit-card-while-paying).

## Enrollment workflow

The following diagram describes the complete enrollment workflow. Each step is explained in detail below:

![](https://files.readme.io/deacb45-Diagrama_-_SDK_Lite_enrollment.png)

### SDK Lite Enrollment Flow

This diagram illustrates the payment method enrollment process using the SDK Lite, detailing the interactions between the Merchant Client, Merchant Server, Yuno Server, and Yuno SDK. It outlines the steps for adding a payment method and initiating its enrollment, through to receiving the final enrollment result.

#### Merchant Client

The Merchant Client represents your frontend application that interacts with both your backend server and the Yuno SDK. It handles the user-facing aspects of the enrollment flow, including:

* Add payment method
* Display payment methods to enroll
* User selects payment method to enroll
* Initiate enrollment
* Initiate SDK to continue enrollment

#### Merchant Server

The Merchant Server represents your backend application that handles server-side operations and communicates with Yuno's servers. Its key responsibilities include:

* Create Customer
* Create customer session
* Request available payment methods to enroll
* Create enrollment
* Receive enrollment result via webhook

#### Yuno Server

The Yuno Server handles all backend operations related to customer management, enrollment sessions, and payment method processing. Its main responsibilities include:

* Creates Customer
* Creates customer session
* Returns available payment method
* Creates enrollment in the payment provider
* Receive enrollment results from payment provider

#### Yuno SDK

The Yuno SDK handles the user interface and enrollment flow on the client side, managing payment method selection and enrollment completion. Its key responsibilities include:

* Continue enrollment flow
* Shows screens for the user to complete enrollment
* Display enrollment result (optional)

#### Flow

The following steps outline the complete interaction flow between all components of the SDK Lite Enrollment integration, detailing how each request and response moves through the system:

1. Merchant Server: Create Customer --> Yuno Server: Creates Customer
2. Merchant Client: Add payment method --> Merchant Server: Create customer session
3. Merchant Server: Create customer session --> Yuno Server: Creates customer session
4. Merchant Client: Display payment methods to enroll --> Merchant Server: Request available payment methods to enroll
5. Merchant Server: Request available payment methods to enroll --> Yuno Server: Returns available payment method
6. Merchant Client: Display payment methods to enroll --> Merchant Client: User selects payment method to enroll
7. Merchant Client: User selects payment method to enroll --> Merchant Client: Initiate enrollment
8. Merchant Client: Initiate enrollment --> Merchant Client: Initiate SDK to continue enrollment
9. Merchant Client: Initiate SDK to continue enrollment --> Yuno SDK: Continue enrollment flow
10. Yuno SDK: Continue enrollment flow  --> Yuno SDK: Shows screens for the user to complete enrollment
11. Merchant Server: Receive enrollment result via webhook --> Yuno Server: Receive enrollment results from payment provider
12. Yuno Server: Receive enrollment results from payment provider --> Yuno SDK: Display enrollment result (optional)

## Platform-specific SDK setup

To implement the Full SDK integration, follow the platform-specific guides below:

<Shelf classname="platform_shelf">
  <YunoCard title="Web" href="/docs/enrollment-lite-sdk" />

  <YunoCard title="iOS" href="/docs/enrollment-ios" />

  <YunoCard title="Android" href="/docs/enrollment-android" />

  <YunoCard title="Flutter" href="/docs/lite-sdk-enrollment-flutter" />
</Shelf>