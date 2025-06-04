---
title: iOS SDK Release notes
deprecated: false
hidden: true
metadata:
  robots: index
---
<Table>
  <thead>
    <tr>
      <th>
        Version
      </th>

      <th>
        Changes
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **2.0.0**
      </td>

      <td>
        * Fix crash on automation flow
        * Fix keyboard overlap
        * Fix layout issues in card previews
        * Add Mercado Pago 3DS support
        * Standardize CVV view for enrolled cards
        * Support installments even if ID is null
        * Connect to socket based on backend flag
        * Add "Info" action in flexible actions
      </td>
    </tr>

    <tr>
      <td>
        **1.25.0**
      </td>

      <td>
        * Add Astropay enrollment support
        * Support redirect-type enrollment
      </td>
    </tr>

    <tr>
      <td>
        **1.24.2**
      </td>

      <td>
        * Show loaders using recursive presentation
      </td>
    </tr>

    <tr>
      <td>
        **1.24.1**
      </td>

      <td>
        * Notify payment full view size
      </td>
    </tr>

    <tr>
      <td>
        **1.24.0**
      </td>

      <td>
        * Fix enrolled card layout and validation
        * Use in-app browser for MP Checkout Pro
        * Improve dropdown feedback and field behavior
        * Standardize keyboard handling
      </td>
    </tr>

    <tr>
      <td>
        **1.23.2**
      </td>

      <td>
        * Notify `cancelByUser` on enrollment form close
      </td>
    </tr>

    <tr>
      <td>
        **1.23.1**
      </td>

      <td>
        * Notify `cancelByUser` on Apple Pay modal close
      </td>
    </tr>

    <tr>
      <td>
        **1.23.0**
      </td>

      <td>
        * Support generic enrollment form with WebSocket
      </td>
    </tr>

    <tr>
      <td>
        **1.22.1**
      </td>

      <td>
        * Return embedded web view as publisher instead of protocol
      </td>
    </tr>

    <tr>
      <td>
        **1.22.0**
      </td>

      <td>
        * Fix installments dropdown
        * Improve CVV validation
        * Add OTP view and accessibility tags
        * Remove nationality as required field
      </td>
    </tr>

    <tr>
      <td>
        **1.21.2**
      </td>

      <td>
        * Add `cancellables` to headless enrollment flow
      </td>
    </tr>

    <tr>
      <td>
        **1.21.1**
      </td>

      <td>
        * Remove Koin dependency
      </td>
    </tr>

    <tr>
      <td>
        **1.21.0**
      </td>

      <td>
        * Fix voucher and installment behavior
        * Improve dynamic layout, fonts, and button alignment
        * Add barcode and payment code in flexible actions
      </td>
    </tr>

    <tr>
      <td>
        **1.20.0**
      </td>

      <td>
        * Add Koin SDK to Swift Package\<br>- Improve UI components (checkbox, modal, timeout screen)\<br>- Add PIX Parcelado support\<br>- Integrate MetricKit for metrics
      </td>
    </tr>

    <tr>
      <td>
        **1.19.3**
      </td>

      <td>
        * Add NuPay redirect support
      </td>
    </tr>

    <tr>
      <td>
        **1.19.2**
      </td>

      <td>
        * Enable socket connection for specific statuses
      </td>
    </tr>

    <tr>
      <td>
        **1.19.1**
      </td>

      <td>
        * Add required document field in enrollment
      </td>
    </tr>

    <tr>
      <td>
        **1.19.0**
      </td>

      <td>
        * Add tests and support for Inswitch (Cash/Bank Transfer)
        * Integrate with Lamdatest
      </td>
    </tr>

    <tr>
      <td>
        **1.18.0**
      </td>

      <td>
        * Fix WebView crash and redirect bugs
        * Remove unused classes
        * Add CardFormViewModel tests
        * Support seamless SDK integration
      </td>
    </tr>

    <tr>
      <td>
        **1.17.0**
      </td>

      <td>
        * Fix voucher copy and BFF issues
        * Improve validation and allowed input
      </td>
    </tr>

    <tr>
      <td>
        **1.16.0**
      </td>

      <td>
        * Add FAC 3DS support and dynamic enrolled card form
        * Fix OTT creation and validation bugs
      </td>
    </tr>

    <tr>
      <td>
        **1.15.0**
      </td>

      <td>
        * Add dynamic step-by-step form
        * Add analytics and accessibility support
        * Remove CNPJ for NuPay enrollment
      </td>
    </tr>

    <tr>
      <td>
        **1.9.0**
      </td>

      <td>
        * Add loader timeout support and improve analytics events
      </td>
    </tr>

    <tr>
      <td>
        **1.6.2**
      </td>

      <td>
        * Prevent error propagation from external ID failures
        * Add status check when app resumes
      </td>
    </tr>
  </tbody>
</Table>

<br />

<HTMLBlock>{`
Here's the iOS SDK release notes page, formatted similarly to your Android SDK notes, with improved descriptions and without Jira ticket numbers:

# Release notes - iOS SDK

-----

<table\>
  <thead\>
    <tr\>
      <th\>Version</th\>
      <th\>Changes</th\>
    </tr\>
  </thead\>
  <tbody\>
    <tr\>
      <td\>2.0.0</td\>
      <td\>
        * <b>FIX</b>: Resolved a crash in automation processes.<br/\>
        * <b>IMPROVE</b>: Enhanced NuPay enrollment to filter passport information.<br/\>
        * <b>NEW</b>: Added support for NuPay installments.<br/\>
        * <b>IMPROVE</b>: Migrated old Alternative Payment Methods (APMs) to flexible actions, simplifying the code and removing unnecessary UI elements.<br/\>
        * <b>IMPROVE</b>: Standardized the CVV input field for enrolled generic cards.<br/\>
        * <b>NEW</b>: Integrated Mercado Pago 3DS for enhanced fraud protection.<br/\>
        * <b>FIX</b>: Corrected an issue with keyboard avoidance on screen views.<br/\>
        * <b>FIX</b>: Ensured installments are displayed even when the ID is null.<br/\>
        * <b>IMPROVE</b>: Implemented socket connection based on a backend flag.<br/\>
        * <b>FIX</b>: Adjusted card preview margin for better visual presentation.<br/\>
        * <b>FIX</b>: Corrected the gradient background display.<br/\>
        * <b>NEW</b>: Added support for informational actions within flexible actions (e.g., Transfiya).<br/\>
        * <b>IMPROVE</b>: Reordered payment buttons for a more intuitive user experience.<br/\>
        * <b>NEW</b>: Added support for APM neighborhood information.<br/\>
        * <b>NEW</b>: Integrated Airwallex anti-fraud capabilities.<br/\>
        * <b>NEW</b>: Added support for 3DS Unlimit.<br/\>
        * <b>NEW</b>: Included a neighborhood text field for customer information.
      </td\>
    </tr\>
    <tr\>
      <td\>1.25.0</td\>
      <td\>
        * <b>NEW</b>: Added support for Astropay enrollment.<br/\>
        * <b>NEW</b>: Implemented support for redirect-type enrollment.
      </td\>
    </tr\>
    <tr\>
      <td\>1.24.2</td\>
      <td\>
        * <b>IMPROVE</b>: Enhanced loader display with recursive presentation.
      </td\>
    </tr\>
    <tr\>
      <td\>1.24.1</td\>
      <td\>
        * <b>IMPROVE</b>: Added notification for full payment view size.
      </td\>
    </tr\>
    <tr\>
      <td\>1.24.0</td\>
      <td\>
        * <b>FIX</b>: Corrected issues with the enrolled card view.<br/\>
        * <b>CHANGE</b>: Switched Mercado Pago Checkout Pro redirect from webview to an in-app browser.<br/\>
        * <b>FIX</b>: Resolved various migration-related issues.<br/\>
        * <b>FIX</b>: Corrected the card preview design.<br/\>
        * <b>FIX</b>: Addressed issues with installments in dynamic enrolled cards.<br/\>
        * <b>CHANGE</b>: Modified the 3DS flow.<br/\>
        * <b>IMPROVE</b>: Enhanced the visualization of enrolled card methods.<br/\>
        * <b>NEW</b>: Enabled setting brand information for enrolled cards.<br/\>
        * <b>FIX</b>: Corrected CVV validation for enrolled cards based on brand information.<br/\>
        * <b>FIX</b>: Eliminated error messages in dropdowns once information is set.<br/\>
        * <b>FIX</b>: Ensured error messages are removed only when the user modifies data in a field.<br/\>
        * <b>FIX</b>: Prevented card data from being deleted when the INN service responds.<br/\>
        * <b>FIX</b>: Removed minor visual jumps when fields do not receive special characters.<br/\>
        * <b>CHANGE</b>: Updated the keyboard type enumeration in the dynamic SDK.<br/\>
        * <b>FIX</b>: Resolved rebase changes and ensured required CVV fields are handled correctly.<br/\>
        * <b>NEW</b>: Added support for extended forms in the full payment list.<br/\>
        * <b>FIX</b>: Corrected WebSockets for Nequi QR.<br/\>
        * <b>FIX</b>: Addressed cancel notifications when an action is closed.<br/\>
        * <b>FIX</b>: Corrected copy text in the download image banner.<br/\>
        * <b>FIX</b>: Resolved issues with image downloading.<br/\>
        * <b>REVERT</b>: Reverted card component logic for CVV handling.<br/\>
        * <b>NEW</b>: Added support for loading URLs for 3DS challenges.<br/\>
        * <b>NEW</b>: Implemented preselected payment methods.<br/\>
        * <b>IMPROVE</b>: Migrated the full payment list to SwiftUI.<br/\>
        * <b>IMPROVE</b>: Standardized keyboard type behavior.<br/\>
        * <b>IMPROVE</b>: Standardized keyboard "next" button behavior.<br/\>
        * <b>NEW</b>: Added styling support for flexible actions.<br/\>
        * <b>NEW</b>: Added a QR button to flexible actions.<br/\>
        * <b>NEW</b>: Implemented CVV logic for required fields.<br/\>
        * <b>FIX</b>: Corrected animation for card view.<br/\>
        * <b>IMPROVE</b>: Enabled setting keyboard type in relevant fields.<br/\>
        * <b>FIX</b>: Resolved installment calculation when a card is enrolled (projected value).<br/\>
        * <b>FIX</b>: Corrected design inconsistencies in enrolled card dynamic display.<br/\>
        * <b>FIX</b>: Fixed CVV enrolled validation based on card information size.
      </td\>
    </tr\>
    <tr\>
      <td\>1.23.2</td\>
      <td\>
        * <b>NEW</b>: Implemented notification for \`cancelByUser\` when the user closes enrollment forms.
      </td\>
    </tr\>
    <tr\>
      <td\>1.23.1</td\>
      <td\>
        * <b>NEW</b>: Implemented notification for \`cancelByUser\` when the user closes the Apple Pay modal.
      </td\>
    </tr\>
    <tr\>
      <td\>1.23.0</td\>
      <td\>
        * <b>NEW</b>: Added support for generic enrollment forms and websocket connectivity (tested with Bancolombia button).
      </td\>
    </tr\>
    <tr\>
      <td\>1.22.1</td\>
      <td\>
        * <b>IMPROVE</b>: Ensured \`anyPublisher\` is returned directly for embedded web views (redirects) instead of a protocol.
      </td\>
    </tr\>
    <tr\>
      <td\>1.22.0</td\>
      <td\>
        * <b>FIX</b>: Corrected error feedback for selected document types.<br/\>
        * <b>REMOVE</b>: Removed nationality from required fields.<br/\>
        * <b>FIX</b>: Resolved a memory leak issue in \`dynamicViewController\`.<br/\>
        * <b>FIX</b>: Corrected an issue where the installments dropdown did not show the selected installment.<br/\>
        * <b>NEW</b>: Created an OTP view within flexible actions.<br/\>
        * <b>NEW</b>: Added \`x-sdk-type\` to all request headers.<br/\>
        * <b>NEW</b>: Implemented enrolled card support for the dynamic SDK.<br/\>
        * <b>NEW</b>: Added notification for authorized substatus.<br/\>
        * <b>FIX</b>: Corrected an issue where the installments dropdown did not show with cards having an installment plan.<br/\>
        * <b>FIX</b>: Resolved CVV feedback when a user pays without first providing CVV.<br/\>
        * <b>FIX</b>: Corrected text alignment in dynamic SDK.<br/\>
        * <b>FIX</b>: Fixed safe area background in dynamic SDK.<br/\>
        * <b>NEW</b>: Added accessibility identifiers to image actions in dynamic actions.<br/\>
        * <b>IMPROVE</b>: Updated animations to align with Figma designs.<br/\>
        * <b>NEW</b>: Added tests for \`AnalyticsReporter\`, \`BPXLUUIDHandler\`, \`CardViewmodel+Validation\`, \`YunoPyamentDelegate\`, and \`EnrollmentActionFactory\`.<br/\>
        * <b>IMPROVE</b>: Allowed empty regex validation in dynamic SDK.<br/\>
        * <b>NEW</b>: Enabled image views inside dropdown views if they exist.<br/\>
        * <b>REMOVE</b>: Removed the background image of waves from the status screen.<br/\>
        * <b>NEW</b>: Added dynamic SDK fixes and iPad demo.<br/\>
        * <b>NEW</b>: Supported downloaded fonts for the dynamic SDK.
      </td\>
    </tr\>
    <tr\>
      <td\>1.21.2</td\>
      <td\>
        * <b>NEW</b>: Added \`anyCancellables\` to \`YunoEnrollmentHeadlessImpl\`.
      </td\>
    </tr\>
    <tr\>
      <td\>1.21.1</td\>
      <td\>
        * <b>REMOVE</b>: Removed Koin dependency.
      </td\>
    </tr\>
    <tr\>
      <td\>1.21.0</td\>
      <td\>
        * <b>CHANGE</b>: Updated Inswitch copy.<br/\>
        * <b>CHANGE</b>: Default action view is now used only for Pluxee.<br/\>
        * <b>FIX</b>: Corrected issues with voucher handling.<br/\>
        * <b>FIX</b>: Resolved instructions for installments.<br/\>
        * <b>FIX</b>: Corrected spacing in dynamic actions.<br/\>
        * <b>FIX</b>: Addressed issues with the payment button.<br/\>
        * <b>FIX</b>: Corrected Indonesian copy.<br/\>
        * <b>IMPROVE</b>: Ensured only credit options are displayed.<br/\>
        * <b>FIX</b>: Corrected design issues.<br/\>
        * <b>FIX</b>: Corrected alignment.<br/\>
        * <b>FIX</b>: Corrected regular font display.<br/\>
        * <b>NEW</b>: Added support for payment codes in flexible actions.<br/\>
        * <b>NEW</b>: Added support for barcodes in flexible actions.<br/\>
        * <b>NEW</b>: Integrated Xendit - Indoramart payment method.<br/\>
        * <b>NEW</b>: Added MetricKit and URLSessionTaskMetrics for performance monitoring.<br/\>
        * <b>FIX</b>: Corrected the one-step card header.<br/\>
        * <b>NEW</b>: Added dynamic actions - IMAGE.<br/\>
        * <b>NEW</b>: Added payment flow helper tests.<br/\>
        * <b>NEW</b>: Implemented combined payment and enrollment flow.
      </td\>
    </tr\>
    <tr\>
      <td\>1.20.0</td\>
      <td\>
        * <b>NEW</b>: Integrated Koin SDK into the general package.swift.<br/\>
        * <b>FIX</b>: Corrected the pay button.<br/\>
        * <b>FIX</b>: Resolved issues with truncated strings in modals.<br/\>
        * <b>NEW</b>: Implemented a delayed provider response screen.<br/\>
        * <b>IMPROVE</b>: Enabled saving keys with different accounts.<br/\>
        * <b>FIX</b>: Corrected the PIX checkbox.<br/\>
        * <b>FIX</b>: Resolved issues with succeeded status.<br/\>
        * <b>NEW</b>: Added browser information collection from WebView.<br/\>
        * <b>NEW</b>: Implemented saving and sending C2P tokens in user defaults.<br/\>
        * <b>IMPROVE</b>: Enabled C2P rendering based on a feature flag.<br/\>
        * <b>CHANGE</b>: Adjusted the cardholder limit.<br/\>
        * <b>NEW</b>: Implemented Koin PIX Parcelado for reading sockets.<br/\>
        * <b>NEW</b>: Integrated Koin PIX Parcelado.<br/\>
        * <b>NEW</b>: Added "In review" information for Koin.<br/\>
        * <b>NEW</b>: Implemented "Waiting for OTP" for Koin.
      </td\>
    </tr\>
    <tr\>
      <td\>1.19.3</td\>
      <td\>
        * <b>NEW</b>: Added NuPay redirect payment.
      </td\>
    </tr\>
    <tr\>
      <td\>1.19.2</td\>
      <td\>
        * <b>IMPROVE</b>: Enabled socket connection when substatus is authorized.
      </td\>
    </tr\>
    <tr\>
      <td\>1.19.1</td\>
      <td\>
        * <b>NEW</b>: Added document required field in enrollment.
      </td\>
    </tr\>
    <tr\>
      <td\>1.19.0</td\>
      <td\>
        * <b>FIX</b>: Corrected QRIS socket confirmation.<br/\>
        * <b>FIX</b>: Applied fix for Inswitch.<br/\>
        * <b>NEW</b>: Added a tag to branches where QA versions are generated.<br/\>
        * <b>NEW</b>: Integrated Inswitch - cash payment method.<br/\>
        * <b>NEW</b>: Integrated Inswitch - bank transfer payment method.<br/\>
        * <b>NEW</b>: Added Lane to upload IPA to Lambdatest.<br/\>
        * <b>NEW</b>: Integrated Xendit QRIS.
      </td\>
    </tr\>
    <tr\>
      <td\>1.18.0</td\>
      <td\>
        * <b>FIX</b>: Resolved crash in WebView.<br/\>
        * <b>FIX</b>: Corrected Fintoc redirect.<br/\>
        * <b>REMOVE</b>: Removed \`OptionalStateValue\` from dynamic SDK.<br/\>
        * <b>NEW</b>: Added tests for \`CardFormViewModel\`.<br/\>
        * <b>NEW</b>: Added utility tests.<br/\>
        * <b>NEW</b>: Implemented RUT and masks.<br/\>
        * <b>REMOVE</b>: Removed \`YunoDynamicConnection\` class.<br/\>
        * <b>FEATURE</b>: Added SDK seamless integration.
      </td\>
    </tr\>
    <tr\>
      <td\>1.17.0</td\>
      <td\>
        * <b>FIX</b>: Corrected BFF issues.<br/\>
        * <b>FIX</b>: Corrected voucher copy.<br/\>
        * <b>NEW</b>: Added copy voucher in enrollment flow.<br/\>
        * <b>IMPROVE</b>: Added dependencies for dynamic SDK conditions.<br/\>
        * <b>IMPROVE</b>: Restricted allowed characters in dynamic SDK text fields (CARD).<br/\>
        * <b>IMPROVE</b>: Restricted allowed characters in dynamic SDK text fields (APM).<br/\>
        * <b>CHANGE</b>: Updated validations.<br/\>
        * <b>CHANGE</b>: Modified sockets protocol.<br/\>
        * <b>IMPROVE</b>: Validated BFF functionalities.<br/\>
        * <b>IMPROVE</b>: Validated voucher, UATP, and card type validations.<br/\>
        * <b>IMPROVE</b>: Enhanced event and log mapping based on documentation.
      </td\>
    </tr\>
    <tr\>
      <td\>1.16.0</td\>
      <td\>
        * <b>NEW</b>: Added FAC 3DS action.<br/\>
        * <b>NEW</b>: Added default type in \`codeViewController\`.<br/\>
        * <b>NEW</b>: Added benefit type and accepted any views in buttons.<br/\>
        * <b>NEW</b>: Implemented enrolled card form in dynamic SDK.<br/\>
        * <b>NEW</b>: Implemented step-by-step card form in dynamic SDK.<br/\>
        * <b>IMPROVE</b>: Dynamically fetched all icons and names of views from the backend.<br/\>
        * <b>FIX</b>: Resolved an issue where OTT is created with an empty expiration date when focus is on the installments dropdown.<br/\>
        * <b>FIX</b>: Modified validation for creating a customer during card enrollment.<br/\>
        * <b>FIX</b>: Disabled card number validation in the enrolled card form for installments.
      </td\>
    </tr\>
    <tr\>
      <td\>1.15.0</td\>
      <td\>
        * <b>NEW</b>: Added tests.<br/\>
        * <b>NEW</b>: Implemented step-by-step functionality in dynamic SDK.<br/\>
        * <b>NEW</b>: Added RUT validation.<br/\>
        * <b>NEW</b>: Added \`termClicked\` event and \`onLoaded\`/\`onClosed\` lifecycle view events.<br/\>
        * <b>NEW</b>: Added all accessibility identifiers to the sample App for automation.<br/\>
        * <b>NEW</b>: Added analytics for dynamic SDK.<br/\>
        * <b>NEW</b>: Implemented required fields for the enrolled card form.<br/\>
        * <b>REMOVE</b>: Removed CNPJ for NuPay enrollment.
      </td\>
    </tr\>
    <tr\>
      <td\>1.9.0</td\>
      <td\>
        * <b>NEW</b>: Added loader and service timeout, and improved analytics event flow.
      </td\>
    </tr\>
    <tr\>
      <td\>1.6.2</td\>
      <td\>
        * <b>FIX</b>: Ensured that external provider ID generation failures are not reported as trade errors.<br/\>
        * <b>IMPROVE</b>: Added validation to query payment status when the App returns from background.
      </td\>
    </tr\>
  </tbody\>
</table\>
`}</HTMLBlock>