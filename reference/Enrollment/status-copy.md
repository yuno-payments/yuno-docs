---
title: Status (COPY)
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
### Overview

Yuno gives customers the possibility to enroll a payment method in order to use it for future purchases and have a seamless payment experience. That payment method enrollment can be used either in our [Full](https://docs.y.uno/docs/the-ultimate-checkout-full#full-enrollment-implementation) or [Lite](https://docs.y.uno/docs/the-ultimate-checkout-lite#lite-enrollment-implementation) payment implementation and could have one of the following statuses. 

### Workflow

<Image align="center" src="https://files.readme.io/bd36fb7-enroll_workflow1.png" />

### Payment method status

<HTMLBlock>{`
<body>
  <div class="table-div">

    <table>
      <thead>
        <tr>
          <th>Status</th>
          <th>Transaction type</th>
          <th>Transaction Status</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="status" rowspan="2">CREATED</td>
          <td class="">Enrollment</td>
          <td></td>
          <td>Initial state at the time of creating a payment.</td>
        </tr>
        <tr>
          <td class="">Verify</td>
          <td>CREATED</td>
          <td>Initial state at the time of creating a payment.</td>
        </tr>
        <!--<tr>-->
        <tr>
          <td class="status">EXPIRED</td>
          <td class="">Enrollment</td>
          <td></td>
          <td>The payment method has been expired.</td>
        </tr>
        <!--<tr>-->
        <tr>
          <td class="status" rowspan="2">REJECTED</td>
          <td class="">Enrollment</td>
          <td></td>
          <td>Yuno has rejected the payment method enrollment.</td>
        </tr>
        <tr>
          <td class="">Verify</td>
          <td>REJECTED</td>
          <td>Yuno verification of payment method has been rejected.</td>
        </tr>
        <!--<tr>-->
        <tr>
          <td class="status">READY_TO_ENROLL</td>
          <td class="">Enrollment</td>
          <td></td>
          <td>The payment method is available for enrollment.</td>
        </tr>
        <!--<tr>-->
        <tr>
          <td class="status" rowspan="2">DECLINED</td>
          <td class="">Enrollment</td>
          <td></td>
          <td>The payment method has been declined.</td>
        </tr>
        <tr>
          <td class="">Verify</td>
          <td>DECLINED</td>
          <td>The verification of the payment method has been declined.</td>
        </tr>
        <!--<tr>-->
        <tr>
          <td class="status">CANCELED</td>
          <td class="">Enrollment</td>
          <td></td>
          <td>The payment method has been canceled.</td>
        </tr>
        <!--<tr>-->
        <tr>
          <td class="status" rowspan="2">ENROLL_IN_PROCESS</td>
          <td class="">Enrollment</td>
          <td></td>
          <td>The payment method enrollment is being processed.</td>
        </tr>
        <tr>
          <td class="">Verify</td>
          <td>PENDING</td>
          <td>The verification for the enrollment of the payment method is currently being processed.</td>
        </tr>
        <!--<tr>-->
        <tr>
          <td class="status" rowspan="2">ENROLLED</td>
          <td class="">Enrollment</td>
          <td></td>
          <td>The enrollment of the payment method has been successful.</td>
        </tr>
        <tr>
          <td class="">Verify</td>
          <td>SUCCEEDED</td>
          <td>The enrollment verification for the payment method has been successfully completed.</td>
        </tr>
        <!--<tr>-->
        <tr>
          <td class="status">UNENROLL_IN_PROCESS</td>
          <td class="">Enrollment</td>
          <td></td>
          <td>The payment method unenrollment is being processed.</td>
        </tr>
        <!--<tr>-->
        <tr>
          <td class="status">UNENROLLED</td>
          <td class="">Enrollment</td>
          <td></td>
          <td>The payment method has been unenrolled.</td>
        </tr>
        <!--<tr>-->
        <tr>
          <td class="status">ERROR</td>
          <td class="">Verify</td>
          <td>ERROR</td>
          <td>An error occured while verifying the payment method.</td>
        </tr>
        <!--<tr>-->
      </tbody>
    </table>
  </div>
</body>
`}</HTMLBlock>
