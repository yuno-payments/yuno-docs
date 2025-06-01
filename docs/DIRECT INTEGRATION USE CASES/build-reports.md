---
title: Build Reports
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: Build Reports
  description: >-
    Yuno reports provides a practical way to acquire information regarding
    different stages of payments. You can effortlessly request and download
    various reports associated with your Yuno operations.
  robots: index
next:
  description: ''
---
Yuno reports provides a practical way to acquire information regarding different stages of payments. You can effortlessly request and download various reports associated with your Yuno operations. Yuno provides four types of reports:

* Payment
* Transaction
* Transaction Reconciliation
* Settlement

You can check the detailed description for each one by accessing the [Reports page](ref:introduction-reports). The Transaction Reconciliation and Settlement reports provide information related to reconciliation. To examine all fields available on each report and their description, access the [Reports Fields page](ref:reports-fields).

## Requirements

To request a report, you will need to:

* Access your [API credentials](doc:developers-credentials) on the Yuno Dashboard, which consist of:
  * `public-api-key`
  * `private-secrete-key`

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <h3>Explore Yuno Postman Collections</h3>
      <div class="contentContainer">
        <p>
          Yuno provides <a href='/reference/postman-collections'>Postman Collections</a> that you can use to replicate the use cases locally.        
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

## Steps summary

The process to receive a report when using Yuno is composed of two steps:

1. [Create a Report](ref:create-a-report)
2. [Download a Report](ref:download-a-report)

## Access a report

As shown in the summary of the steps, you need to complete two steps before accessing your report.

### Step 1: Create a report

To initiate the report generation process, request Yuno to create the report using the [Create a Report endpoint](ref:create-a-report). First, select the desired report type (`type`), which will determine the content of the generated report. Secondly, define the date range you wish to incorporate data into the report by setting the parameters `start_date` and `end_date`.

When creating the report, you can filter the added data by specifying the values for some fields. For example, you may want to receive data only related to transactions performed in Argentina and Brazil. In this case, you would provide the `AR,BR` content for the parameter `country`.

You have the option to filter the following fields when creating the report:

* `payment_status`
* `payment_sub_status`
* `payment_method`
* `currency`
* `country`
* `transaction_type`
* `transaction_status`
* `updated_at_start`
* `updated_at_end`

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <h3>Filter values format</h3>
      <div class="contentContainer">
        <p>
					When defining the filter values, provide them in a string value list, such as in the example below:
          <br>
          <code>"payment_status": "CREATED,READY_TO_PAY,DECLINED"</code>
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

For Payment or Transaction reports, you also have the option to select the fields included in the final report using the parameter `columns`.

When you use the [Create a Report endpoint](ref:create-a-report) to request a report creation, on the response, you will receive the report `id` and `status`. You will use the `id` when requesting the report download on [Step 3](doc:build-reports#3-download-your-report). The `status` informs if it is ready to download.

### Step 2: Check if the report is ready

After requesting the report creation, you can use endpoints [Retrieve a Report](ref:retrieve-a-report) or [List All Reports](ref:list-all-reports) to check if it is ready for download. When using the [Retrieve a Report endpoint](ref:retrieve-a-report), you need to provide the report `id`. On the other hand, with the  [List All Reports endpoint](ref:list-all-reports), you need to inform your `account_id` to receive a list of all existing reports and their status.

When the report has the status `SUCCEEDED`, you can request its download. Access the [Report status page](ref:report-status) to check all possible report status.

### Step 3: Download your report

Use the [Download a Report](ref:download-a-report) to receive your report providing its `id`. You will receive the report in a .zip file. However, for Settlement reports, the API will return a .csv file.
