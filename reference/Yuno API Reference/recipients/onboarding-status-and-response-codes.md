---
title: Onboarding Status and Response Codes
deprecated: false
hidden: true
metadata:
  robots: index
---
Onboarding tracks the lifecycle of recipient (submerchant) registration with providers for split payments. Use the onboarding `status` to understand where a recipient is in the process and whether any action is required.

See also:

* [Create Onboarding](ref:create-onboarding)
* [Continue Onboarding](ref:continue-onboarding)

## Onboarding statuses

The onboarding flow can have the following statuses.

<br />

<HTMLBlock>{`
<style>
  .table-div .status {
    font-size: 12px;
  }
  .table-div .action {
    font-size: 12px;
    word-wrap: break-word;
    word-break: break-word;
  }
</style>

<body>
  <div class="table-div">
    <table>
      <thead>
        <tr>
          <th>Status</th>
          <th>Description</th>
          <th>Required action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="status"><code>CREATED</code></td>
          <td>Onboarding object created. Validation has not yet started.</td>
          <td class="action">Provide requested data and documents if not already supplied.</td>
        </tr>
        <tr>
          <td class="status"><code>PENDING</code></td>
          <td>Onboarding is in progress. Data has been submitted and is under review by Yuno and/or the provider.</td>
          <td class="action">No action needed unless additional information is requested.</td>
        </tr>
        <tr>
          <td class="status"><code>PENDING_ADDITIONAL_DOCUMENTATION</code></td>
          <td>Provider or compliance review requires more documentation or clarifications.</td>
          <td class="action">Upload or submit the missing documentation as indicated.</td>
        </tr>
        <tr>
          <td class="status"><code>PENDING_RECIPIENT_ACTION</code></td>
          <td>Recipient must complete one or more steps (e.g., accept terms, complete KYC questionnaire, email/phone verification).</td>
          <td class="action">Complete the pending task(s) in the onboarding flow.</td>
        </tr>
        <tr>
          <td class="status"><code>SUCCEEDED</code></td>
          <td>Onboarding completed successfully. The recipient is ready to receive split payments through the configured provider(s).</td>
          <td class="action">Start processing payments or link recipient in payment splits.</td>
        </tr>
        <tr>
          <td class="status"><code>FAILED</code></td>
          <td>Onboarding attempt failed due to an error (e.g., technical issue or invalid data).</td>
          <td class="action">Review the error details, correct the data, and retry the onboarding.</td>
        </tr>
        <tr>
          <td class="status"><code>DECLINED</code></td>
          <td>Provider declined the onboarding after review.</td>
          <td class="action">Evaluate the decline reason, update information or documentation, and re-submit if applicable.</td>
        </tr>
        <tr>
          <td class="status"><code>BLOCKED</code></td>
          <td>Onboarding is temporarily blocked due to risk/compliance policy or review.</td>
          <td class="action">Contact support or your Yuno representative for next steps.</td>
        </tr>
        <tr>
          <td class="status"><code>REJECTED</code></td>
          <td>Onboarding was rejected during Yuno pre-validation before submission to the provider.</td>
          <td class="action">Fix the issues reported and create a new onboarding or resubmit.</td>
        </tr>
        <tr>
          <td class="status"><code>ERROR</code></td>
          <td>An error occurred while processing the onboarding (e.g., timeout, connectivity).</td>
          <td class="action">Retry the operation. If the problem persists, contact support.</td>
        </tr>
        <tr>
          <td class="status"><code>CANCELLED</code></td>
          <td>Onboarding was cancelled by the merchant/recipient or automatically due to workflow cancellation.</td>
          <td class="action">Create a new onboarding when ready to proceed.</td>
        </tr>
        <tr>
          <td class="status"><code>EXPIRED</code></td>
          <td>Onboarding was not completed in time and expired.</td>
          <td class="action">Restart the process by creating a new onboarding.</td>
        </tr>
      </tbody>
    </table>
  </div>
</body>
`}</HTMLBlock>
