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

### Payment method status

[block:html]
{
  "html": "<body>\n  <div class=\"table-div\">\n\n    <table>\n      <thead>\n        <tr>\n          <th>Status</th>\n          <th>Transaction type</th>\n          <th>Transaction Status</th>\n          <th>Description</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr>\n          <td class=\"status\" rowspan=\"2\">CREATED</td>\n          <td class=\"\">Enrollment</td>\n          <td></td>\n          <td>Initial state at the time of creating a payment.</td>\n        </tr>\n        <tr>\n          <td class=\"\">Verify</td>\n          <td>CREATED</td>\n          <td>Initial state at the time of creating a payment.</td>\n        </tr>\n        <!--<tr>-->\n        <tr>\n          <td class=\"status\">EXPIRED</td>\n          <td class=\"\">Enrollment</td>\n          <td></td>\n          <td>The payment method has been expired.</td>\n        </tr>\n        <!--<tr>-->\n        <tr>\n          <td class=\"status\" rowspan=\"2\">REJECTED</td>\n          <td class=\"\">Enrollment</td>\n          <td></td>\n          <td>Yuno has rejected the payment method enrollment.</td>\n        </tr>\n        <tr>\n          <td class=\"\">Verify</td>\n          <td>REJECTED</td>\n          <td>Yuno verification of payment method has been rejected.</td>\n        </tr>\n        <!--<tr>-->\n        <tr>\n          <td class=\"status\">READY_TO_ENROLL</td>\n          <td class=\"\">Enrollment</td>\n          <td></td>\n          <td>The payment method is available for enrollment.</td>\n        </tr>\n        <!--<tr>-->\n        <tr>\n          <td class=\"status\" rowspan=\"2\">DECLINED</td>\n          <td class=\"\">Enrollment</td>\n          <td></td>\n          <td>The payment method has been declined.</td>\n        </tr>\n        <tr>\n          <td class=\"\">Verify</td>\n          <td>DECLINED</td>\n          <td>The verification of the payment method has been declined.</td>\n        </tr>\n        <!--<tr>-->\n        <tr>\n          <td class=\"status\">CANCELED</td>\n          <td class=\"\">Enrollment</td>\n          <td></td>\n          <td>The payment method has been canceled.</td>\n        </tr>\n        <!--<tr>-->\n        <tr>\n          <td class=\"status\" rowspan=\"2\">ENROLL_IN_PROCESS</td>\n          <td class=\"\">Enrollment</td>\n          <td></td>\n          <td>The payment method enrollment is being processed.</td>\n        </tr>\n        <tr>\n          <td class=\"\">Verify</td>\n          <td>PENDING</td>\n          <td>The verification for the enrollment of the payment method is currently being processed.</td>\n        </tr>\n        <!--<tr>-->\n        <tr>\n          <td class=\"status\" rowspan=\"2\">ENROLLED</td>\n          <td class=\"\">Enrollment</td>\n          <td></td>\n          <td>The enrollment of the payment method has been successful.</td>\n        </tr>\n        <tr>\n          <td class=\"\">Verify</td>\n          <td>SUCCEEDED</td>\n          <td>The enrollment verification for the payment method has been successfully completed.</td>\n        </tr>\n        <!--<tr>-->\n        <tr>\n          <td class=\"status\">UNENROLL_IN_PROCESS</td>\n          <td class=\"\">Enrollment</td>\n          <td></td>\n          <td>The payment method unenrollment is being processed.</td>\n        </tr>\n        <!--<tr>-->\n        <tr>\n          <td class=\"status\">UNENROLLED</td>\n          <td class=\"\">Enrollment</td>\n          <td></td>\n          <td>The payment method has been unenrolled.</td>\n        </tr>\n        <!--<tr>-->\n        <tr>\n          <td class=\"status\">ERROR</td>\n          <td class=\"\">Verify</td>\n          <td>ERROR</td>\n          <td>An error occured while verifying the payment method.</td>\n        </tr>\n        <!--<tr>-->\n      </tbody>\n    </table>\n  </div>\n</body>"
}
[/block]