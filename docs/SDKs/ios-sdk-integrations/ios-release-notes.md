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
        * **FIX**: Resolved a crash in automation processes.<br/\>
        * **IMPROVE**: Enhanced NuPay enrollment to filter passport information.<br/\>
        * **NEW**: Added support for NuPay installments.<br/\>
        * **IMPROVE**: Migrated old Alternative Payment Methods (APMs) to flexible actions, simplifying the code and removing unnecessary UI elements.<br/\>
        * **IMPROVE**: Standardized the CVV input field for enrolled generic cards.<br/\>
        * **NEW**: Integrated Mercado Pago 3DS for enhanced fraud protection.<br/\>
        * **FIX**: Corrected an issue with keyboard avoidance on screen views.<br/\>
        * **FIX**: Ensured installments are displayed even when the ID is null.<br/\>
        * **IMPROVE**: Implemented socket connection based on a backend flag.<br/\>
        * **FIX**: Adjusted card preview margin for better visual presentation.<br/\>
        * **FIX**: Corrected the gradient background display.<br/\>
        * **NEW**: Added support for informational actions within flexible actions (e.g., Transfiya).<br/\>
        * **IMPROVE**: Reordered payment buttons for a more intuitive user experience.<br/\>
        * **NEW**: Added support for APM neighborhood information.<br/\>
        * **NEW**: Integrated Airwallex anti-fraud capabilities.<br/\>
        * **NEW**: Added support for 3DS Unlimit.<br/\>
        * **NEW**: Included a neighborhood text field for customer information.
      </td\>
    </tr\>
    <tr\>
      <td\>1.25.0</td\>
      <td\>
        * **NEW**: Added support for Astropay enrollment.<br/\>
        * **NEW**: Implemented support for redirect-type enrollment.
      </td\>
    </tr\>
    <tr\>
      <td\>1.24.2</td\>
      <td\>
        * **IMPROVE**: Enhanced loader display with recursive presentation.
      </td\>
    </tr\>
    <tr\>
      <td\>1.24.1</td\>
      <td\>
        * **IMPROVE**: Added notification for full payment view size.
      </td\>
    </tr\>
    <tr\>
      <td\>1.24.0</td\>
      <td\>
        * **FIX**: Corrected issues with the enrolled card view.<br/\>
        * **CHANGE**: Switched Mercado Pago Checkout Pro redirect from webview to an in-app browser.<br/\>
        * **FIX**: Resolved various migration-related issues.<br/\>
        * **FIX**: Corrected the card preview design.<br/\>
        * **FIX**: Addressed issues with installments in dynamic enrolled cards.<br/\>
        * **CHANGE**: Modified the 3DS flow.<br/\>
        * **IMPROVE**: Enhanced the visualization of enrolled card methods.<br/\>
        * **NEW**: Enabled setting brand information for enrolled cards.<br/\>
        * **FIX**: Corrected CVV validation for enrolled cards based on brand information.<br/\>
        * **FIX**: Eliminated error messages in dropdowns once information is set.<br/\>
        * **FIX**: Ensured error messages are removed only when the user modifies data in a field.<br/\>
        * **FIX**: Prevented card data from being deleted when the INN service responds.<br/\>
        * **FIX**: Removed minor visual jumps when fields do not receive special characters.<br/\>
        * **CHANGE**: Updated the keyboard type enumeration in the dynamic SDK.<br/\>
        * **FIX**: Resolved rebase changes and ensured required CVV fields are handled correctly.<br/\>
        * **NEW**: Added support for extended forms in the full payment list.<br/\>
        * **FIX**: Corrected WebSockets for Nequi QR.<br/\>
        * **FIX**: Addressed cancel notifications when an action is closed.<br/\>
        * **FIX**: Corrected copy text in the download image banner.<br/\>
        * **FIX**: Resolved issues with image downloading.<br/\>
        * **REVERT**: Reverted card component logic for CVV handling.<br/\>
        * **NEW**: Added support for loading URLs for 3DS challenges.<br/\>
        * **NEW**: Implemented preselected payment methods.<br/\>
        * **IMPROVE**: Migrated the full payment list to SwiftUI.<br/\>
        * **IMPROVE**: Standardized keyboard type behavior.<br/\>
        * **IMPROVE**: Standardized keyboard "next" button behavior.<br/\>
        * **NEW**: Added styling support for flexible actions.<br/\>
        * **NEW**: Added a QR button to flexible actions.<br/\>
        * **NEW**: Implemented CVV logic for required fields.<br/\>
        * **FIX**: Corrected animation for card view.<br/\>
        * **IMPROVE**: Enabled setting keyboard type in relevant fields.<br/\>
        * **FIX**: Resolved installment calculation when a card is enrolled (projected value).<br/\>
        * **FIX**: Corrected design inconsistencies in enrolled card dynamic display.<br/\>
        * **FIX**: Fixed CVV enrolled validation based on card information size.
      </td\>
    </tr\>
    <tr\>
      <td\>1.23.2</td\>
      <td\>
        * **NEW**: Implemented notification for \`cancelByUser\` when the user closes enrollment forms.
      </td\>
    </tr\>
    <tr\>
      <td\>1.23.1</td\>
      <td\>
        * **NEW**: Implemented notification for \`cancelByUser\` when the user closes the Apple Pay modal.
      </td\>
    </tr\>
    <tr\>
      <td\>1.23.0</td\>
      <td\>
        * **NEW**: Added support for generic enrollment forms and websocket connectivity (tested with Bancolombia button).
      </td\>
    </tr\>
    <tr\>
      <td\>1.22.1</td\>
      <td\>
        * **IMPROVE**: Ensured \`anyPublisher\` is returned directly for embedded web views (redirects) instead of a protocol.
      </td\>
    </tr\>
    <tr\>
      <td\>1.22.0</td\>
      <td\>
        * **FIX**: Corrected error feedback for selected document types.<br/\>
        * **REMOVE**: Removed nationality from required fields.<br/\>
        * **FIX**: Resolved a memory leak issue in \`dynamicViewController\`.<br/\>
        * **FIX**: Corrected an issue where the installments dropdown did not show the selected installment.<br/\>
        * **NEW**: Created an OTP view within flexible actions.<br/\>
        * **NEW**: Added \`x-sdk-type\` to all request headers.<br/\>
        * **NEW**: Implemented enrolled card support for the dynamic SDK.<br/\>
        * **NEW**: Added notification for authorized substatus.<br/\>
        * **FIX**: Corrected an issue where the installments dropdown did not show with cards having an installment plan.<br/\>
        * **FIX**: Resolved CVV feedback when a user pays without first providing CVV.<br/\>
        * **FIX**: Corrected text alignment in dynamic SDK.<br/\>
        * **FIX**: Fixed safe area background in dynamic SDK.<br/\>
        * **NEW**: Added accessibility identifiers to image actions in dynamic actions.<br/\>
        * **IMPROVE**: Updated animations to align with Figma designs.<br/\>
        * **NEW**: Added tests for \`AnalyticsReporter\`, \`BPXLUUIDHandler\`, \`CardViewmodel+Validation\`, \`YunoPyamentDelegate\`, and \`EnrollmentActionFactory\`.<br/\>
        * **IMPROVE**: Allowed empty regex validation in dynamic SDK.<br/\>
        * **NEW**: Enabled image views inside dropdown views if they exist.<br/\>
        * **REMOVE**: Removed the background image of waves from the status screen.<br/\>
        * **NEW**: Added dynamic SDK fixes and iPad demo.<br/\>
        * **NEW**: Supported downloaded fonts for the dynamic SDK.
      </td\>
    </tr\>
    <tr\>
      <td\>1.21.2</td\>
      <td\>
        * **NEW**: Added \`anyCancellables\` to \`YunoEnrollmentHeadlessImpl\`.
      </td\>
    </tr\>
    <tr\>
      <td\>1.21.1</td\>
      <td\>
        * **REMOVE**: Removed Koin dependency.
      </td\>
    </tr\>
    <tr\>
      <td\>1.21.0</td\>
      <td\>
        * **CHANGE**: Updated Inswitch copy.<br/\>
        * **CHANGE**: Default action view is now used only for Pluxee.<br/\>
        * **FIX**: Corrected issues with voucher handling.<br/\>
        * **FIX**: Resolved instructions for installments.<br/\>
        * **FIX**: Corrected spacing in dynamic actions.<br/\>
        * **FIX**: Addressed issues with the payment button.<br/\>
        * **FIX**: Corrected Indonesian copy.<br/\>
        * **IMPROVE**: Ensured only credit options are displayed.<br/\>
        * **FIX**: Corrected design issues.<br/\>
        * **FIX**: Corrected alignment.<br/\>
        * **FIX**: Corrected regular font display.<br/\>
        * **NEW**: Added support for payment codes in flexible actions.<br/\>
        * **NEW**: Added support for barcodes in flexible actions.<br/\>
        * **NEW**: Integrated Xendit - Indoramart payment method.<br/\>
        * **NEW**: Added MetricKit and URLSessionTaskMetrics for performance monitoring.<br/\>
        * **FIX**: Corrected the one-step card header.<br/\>
        * **NEW**: Added dynamic actions - IMAGE.<br/\>
        * **NEW**: Added payment flow helper tests.<br/\>
        * **NEW**: Implemented combined payment and enrollment flow.
      </td\>
    </tr\>
    <tr\>
      <td\>1.20.0</td\>
      <td\>
        * **NEW**: Integrated Koin SDK into the general package.swift.<br/\>
        * **FIX**: Corrected the pay button.<br/\>
        * **FIX**: Resolved issues with truncated strings in modals.<br/\>
        * **NEW**: Implemented a delayed provider response screen.<br/\>
        * **IMPROVE**: Enabled saving keys with different accounts.<br/\>
        * **FIX**: Corrected the PIX checkbox.<br/\>
        * **FIX**: Resolved issues with succeeded status.<br/\>
        * **NEW**: Added browser information collection from WebView.<br/\>
        * **NEW**: Implemented saving and sending C2P tokens in user defaults.<br/\>
        * **IMPROVE**: Enabled C2P rendering based on a feature flag.<br/\>
        * **CHANGE**: Adjusted the cardholder limit.<br/\>
        * **NEW**: Implemented Koin PIX Parcelado for reading sockets.<br/\>
        * **NEW**: Integrated Koin PIX Parcelado.<br/\>
        * **NEW**: Added "In review" information for Koin.<br/\>
        * **NEW**: Implemented "Waiting for OTP" for Koin.
      </td\>
    </tr\>
    <tr\>
      <td\>1.19.3</td\>
      <td\>
        * **NEW**: Added NuPay redirect payment.
      </td\>
    </tr\>
    <tr\>
      <td\>1.19.2</td\>
      <td\>
        * **IMPROVE**: Enabled socket connection when substatus is authorized.
      </td\>
    </tr\>
    <tr\>
      <td\>1.19.1</td\>
      <td\>
        * **NEW**: Added document required field in enrollment.
      </td\>
    </tr\>
    <tr\>
      <td\>1.19.0</td\>
      <td\>
        * **FIX**: Corrected QRIS socket confirmation.<br/\>
        * **FIX**: Applied fix for Inswitch.<br/\>
        * **NEW**: Added a tag to branches where QA versions are generated.<br/\>
        * **NEW**: Integrated Inswitch - cash payment method.<br/\>
        * **NEW**: Integrated Inswitch - bank transfer payment method.<br/\>
        * **NEW**: Added Lane to upload IPA to Lambdatest.<br/\>
        * **NEW**: Integrated Xendit QRIS.
      </td\>
    </tr\>
    <tr\>
      <td\>1.18.0</td\>
      <td\>
        * **FIX**: Resolved crash in WebView.<br/\>
        * **FIX**: Corrected Fintoc redirect.<br/\>
        * **REMOVE**: Removed \`OptionalStateValue\` from dynamic SDK.<br/\>
        * **NEW**: Added tests for \`CardFormViewModel\`.<br/\>
        * **NEW**: Added utility tests.<br/\>
        * **NEW**: Implemented RUT and masks.<br/\>
        * **REMOVE**: Removed \`YunoDynamicConnection\` class.<br/\>
        * **FEATURE**: Added SDK seamless integration.
      </td\>
    </tr\>
    <tr\>
      <td\>1.17.0</td\>
      <td\>
        * **FIX**: Corrected BFF issues.<br/\>
        * **FIX**: Corrected voucher copy.<br/\>
        * **NEW**: Added copy voucher in enrollment flow.<br/\>
        * **IMPROVE**: Added dependencies for dynamic SDK conditions.<br/\>
        * **IMPROVE**: Restricted allowed characters in dynamic SDK text fields (CARD).<br/\>
        * **IMPROVE**: Restricted allowed characters in dynamic SDK text fields (APM).<br/\>
        * **CHANGE**: Updated validations.<br/\>
        * **CHANGE**: Modified sockets protocol.<br/\>
        * **IMPROVE**: Validated BFF functionalities.<br/\>
        * **IMPROVE**: Validated voucher, UATP, and card type validations.<br/\>
        * **IMPROVE**: Enhanced event and log mapping based on documentation.
      </td\>
    </tr\>
    <tr\>
      <td\>1.16.0</td\>
      <td\>
        * **NEW**: Added FAC 3DS action.<br/\>
        * **NEW**: Added default type in \`codeViewController\`.<br/\>
        * **NEW**: Added benefit type and accepted any views in buttons.<br/\>
        * **NEW**: Implemented enrolled card form in dynamic SDK.<br/\>
        * **NEW**: Implemented step-by-step card form in dynamic SDK.<br/\>
        * **IMPROVE**: Dynamically fetched all icons and names of views from the backend.<br/\>
        * **FIX**: Resolved an issue where OTT is created with an empty expiration date when focus is on the installments dropdown.<br/\>
        * **FIX**: Modified validation for creating a customer during card enrollment.<br/\>
        * **FIX**: Disabled card number validation in the enrolled card form for installments.
      </td\>
    </tr\>
    <tr\>
      <td\>1.15.0</td\>
      <td\>
        * **NEW**: Added tests.<br/\>
        * **NEW**: Implemented step-by-step functionality in dynamic SDK.<br/\>
        * **NEW**: Added RUT validation.<br/\>
        * **NEW**: Added \`termClicked\` event and \`onLoaded\`/\`onClosed\` lifecycle view events.<br/\>
        * **NEW**: Added all accessibility identifiers to the sample App for automation.<br/\>
        * **NEW**: Added analytics for dynamic SDK.<br/\>
        * **NEW**: Implemented required fields for the enrolled card form.<br/\>
        * **REMOVE**: Removed CNPJ for NuPay enrollment.
      </td\>
    </tr\>
    <tr\>
      <td\>1.9.0</td\>
      <td\>
        * **NEW**: Added loader and service timeout, and improved analytics event flow.
      </td\>
    </tr\>
    <tr\>
      <td\>1.6.2</td\>
      <td\>
        * **FIX**: Ensured that external provider ID generation failures are not reported as trade errors.<br/\>
        * **IMPROVE**: Added validation to query payment status when the App returns from background.
      </td\>
    </tr\>
  </tbody\>
</table\>
`}</HTMLBlock>