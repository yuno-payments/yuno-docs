---
title: iOS SDK release notes
deprecated: false
hidden: false
metadata:
  robots: index
---
<HTMLBlock>{`
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
        <b>IMPROVE</b>: Enhanced NuPay enrollment to filter passport information.<br /\>
        <b>NEW</b>: Added support for NuPay installments.<br /\>
        <b>IMPROVE</b>: Migrated old Alternative Payment Methods (APMs) to flexible actions, simplifying the
        code and removing unnecessary UI elements.<br /\>
        <b>IMPROVE</b>: Standardized the CVV input field for enrolled generic cards.<br /\>
        <b>NEW</b>: Integrated Mercado Pago 3DS for enhanced fraud protection.<br /\>
        <b>IMPROVE</b>: Implemented socket connection based on a backend flag.<br /\>
        <b>NEW</b>: Added support for informational actions within flexible actions (e.g., Transfiya).<br /\>
        <b>IMPROVE</b>: Reordered payment buttons for a more intuitive user experience.<br /\>
        <b>NEW</b>: Added support for APM neighborhood information.<br /\>
        <b>NEW</b>: Integrated Airwallex anti-fraud capabilities.<br /\>
        <b>NEW</b>: Added support for 3DS Unlimit.<br /\>
        <b>NEW</b>: Included a neighborhood text field for customer information.<br /\>
        <b>FIX</b>: General bug fixes and performance improvements.    
        
        </td\>
      </tr\>
    <tr\>
      <td\>1.25.0</td\>
      <td\>
        <b>NEW</b>: Added support for Astropay enrollment.<br /\>
        <b>NEW</b>: Implemented support for redirect-type enrollment.
        </td\>
      </tr\>
    <tr\>
      <td\>1.24.2</td\>
      <td\>
        <b>IMPROVE</b>: Enhanced loader display with recursive presentation.
        </td\>
      </tr\>
    <tr\>
      <td\>1.24.1</td\>
      <td\>
        <b>IMPROVE</b>: Added notification for full payment view size.
        </td\>
      </tr\>
    <tr\>
      <td\>1.24.0</td\>
      <td\>
        <b>CHANGE</b>: Switched Mercado Pago Checkout Pro redirect from webview to an in-app browser.<br /\>
        <b>CHANGE</b>: Modified the 3DS flow.<br /\>
        <b>IMPROVE</b>: Enhanced the visualization of enrolled card methods.<br /\>
        <b>NEW</b>: Enabled setting brand information for enrolled cards.<br /\>
        <b>CHANGE</b>: Updated the keyboard type enumeration in the dynamic SDK.<br /\>
        <b>NEW</b>: Added support for extended forms in the full payment list.<br /\>
        <b>REVERT</b>: Reverted card component logic for CVV handling.<br /\>
        <b>NEW</b>: Added support for loading URLs for 3DS challenges.<br /\>
        <b>NEW</b>: Implemented preselected payment methods.<br /\>
        <b>IMPROVE</b>: Migrated the full payment list to SwiftUI.<br /\>
        <b>IMPROVE</b>: Standardized keyboard type behavior.<br /\>
        <b>IMPROVE</b>: Standardized keyboard "next" button behavior.<br /\>
        <b>NEW</b>: Added styling support for flexible actions.<br /\>
        <b>NEW</b>: Added a QR button to flexible actions.<br /\>
        <b>NEW</b>: Implemented CVV logic for required fields.<br /\>
        <b>IMPROVE</b>: Enabled setting keyboard type in relevant fields.<br /\>
        <b>FIX</b>: General bug fixes and performance improvements.    
        </td\>
      </tr\>
    <tr\>
      <td\>1.23.2</td\>
      <td\>
        <b>NEW</b>: Implemented notification for <code>cancelByUser</code> when the user closes enrollment
        forms.
        </td\>
      </tr\>
    <tr\>
      <td\>1.23.1</td\>
      <td\>
        <b>NEW</b>: Implemented notification for <code>cancelByUser</code> when the user closes the Apple Pay
        modal.
        </td\>
      </tr\>
    <tr\>
      <td\>1.23.0</td\>
      <td\>
        <b>NEW</b>: Added support for generic enrollment forms and websocket connectivity (tested with
        Bancolombia button).
        </td\>
      </tr\>
    <tr\>
      <td\>1.22.1</td\>
      <td\>
        <b>IMPROVE</b>: Ensured <code>anyPublisher</code> is returned directly for embedded web views
        (redirects) instead of a protocol.
        </td\>
      </tr\>
    <tr\>
      <td\>1.22.0</td\>
      <td\>
        <b>REMOVE</b>: Removed nationality from required fields.<br /\>
        <b>NEW</b>: Created an OTP view within flexible actions.<br /\>
        <b>NEW</b>: Added <code>x-sdk-type</code> to all request headers.<br /\>
        <b>NEW</b>: Implemented enrolled card support for the dynamic SDK.<br /\>
        <b>NEW</b>: Added notification for authorized substatus.<br /\>
        <b>NEW</b>: Added accessibility identifiers to image actions in dynamic actions.<br /\>
        <b>IMPROVE</b>: Updated animations to align with Figma designs.<br /\>
        <b>NEW</b>: Added tests for <code>AnalyticsReporter</code>, <code>BPXLUUIDHandler</code>,
        <code>CardViewmodel+Validation</code>, <code>YunoPyamentDelegate</code>, and
        <code>EnrollmentActionFactory</code>.<br /\>
        <b>IMPROVE</b>: Allowed empty regex validation in dynamic SDK.<br /\>
        <b>NEW</b>: Enabled image views inside dropdown views if they exist.<br /\>
        <b>REMOVE</b>: Removed the background image of waves from the status screen.<br /\>
        <b>NEW</b>: Added dynamic SDK fixes and iPad demo.<br /\>
        <b>NEW</b>: Supported downloaded fonts for the dynamic SDK.<br /\>
        <b>FIX</b>: General bug fixes and performance improvements.    
        </td\>
      </tr\>
    <tr\>
      <td\>1.21.2</td\>
      <td\>
        <b>NEW</b>: Added <code>anyCancellables</code> to <code>YunoEnrollmentHeadlessImpl</code>.
        </td\>
      </tr\>
    <tr\>
      <td\>1.21.1</td\>
      <td\>
        <b>REMOVE</b>: Removed Koin dependency.
        </td\>
      </tr\>
    <tr\>
      <td\>1.21.0</td\>
      <td\>
        <b>CHANGE</b>: Updated Inswitch copy.<br /\>
        <b>CHANGE</b>: Default action view is now used only for Pluxee.<br /\>
        <b>IMPROVE</b>: Ensured only credit options are displayed.<br /\>
        <b>NEW</b>: Added support for payment codes in flexible actions.<br /\>
        <b>NEW</b>: Added support for barcodes in flexible actions.<br /\>
        <b>NEW</b>: Integrated Xendit - Indoramart payment method.<br /\>
        <b>NEW</b>: Added MetricKit and URLSessionTaskMetrics for performance monitoring.<br /\>
        <b>NEW</b>: Added dynamic actions - IMAGE.<br /\>
        <b>NEW</b>: Added payment flow helper tests.<br /\>
        <b>NEW</b>: Implemented combined payment and enrollment flow.<br /\>
        <b>FIX</b>: General bug fixes and performance improvements.            
        </td\>
      </tr\>
    <tr\>
      <td\>1.20.0</td\>
      <td\>
        <b>NEW</b>: Integrated Koin SDK into the general package.swift.<br /\>
        <b>NEW</b>: Implemented a delayed provider response screen.<br /\>
        <b>IMPROVE</b>: Enabled saving keys with different accounts.<br /\>
        <b>NEW</b>: Added browser information collection from WebView.<br /\>
        <b>NEW</b>: Implemented saving and sending C2P tokens in user defaults.<br /\>
        <b>IMPROVE</b>: Enabled C2P rendering based on a feature flag.<br /\>
        <b>CHANGE</b>: Adjusted the cardholder limit.<br /\>
        <b>NEW</b>: Implemented Koin PIX Parcelado for reading sockets.<br /\>
        <b>NEW</b>: Integrated Koin PIX Parcelado.<br /\>
        <b>NEW</b>: Added "In review" information for Koin.<br /\>
        <b>NEW</b>: Implemented "Waiting for OTP" for Koin.<br /\>
        <b>FIX</b>: General bug fixes and performance improvements.        
        </td\>
      </tr\>
    <tr\>
      <td\>1.19.3</td\>
      <td\>
        <b>NEW</b>: Added NuPay redirect payment.
        </td\>
      </tr\>
    <tr\>
      <td\>1.19.2</td\>
      <td\>
        <b>IMPROVE</b>: Enabled socket connection when substatus is authorized.
        </td\>
      </tr\>
    <tr\>
      <td\>1.19.1</td\>
      <td\>
        <b>NEW</b>: Added document required field in enrollment.
        </td\>
      </tr\>
    <tr\>
      <td\>1.19.0</td\>
      <td\>
    <b>NEW</b>: Added a tag to branches where QA versions are generated.<br /\>
    <b>NEW</b>: Integrated Inswitch - cash payment method.<br /\>
    <b>NEW</b>: Integrated Inswitch - bank transfer payment method.<br /\>
    <b>NEW</b>: Added Lane to upload IPA to Lambdatest.<br /\>
    <b>NEW</b>: Integrated Xendit QRIS.<br /\>
    <b>FIX</b>: General bug fixes and performance improvements.
        </td\>
      </tr\>
    <tr\>
      <td\>1.18.0</td\>
      <td\>
        <b>REMOVE</b>: Removed <code>OptionalStateValue</code> from dynamic SDK.<br /\>
        <b>NEW</b>: Added tests for <code>CardFormViewModel</code>.<br /\>
        <b>NEW</b>: Added utility tests.<br /\>
        <b>NEW</b>: Implemented RUT and masks.<br /\>
        <b>REMOVE</b>: Removed <code>YunoDynamicConnection</code> class.<br /\>
        <b>FIX</b>: General bug fixes and performance improvements.<br /\>
        <b>FEATURE</b>: Added SDK seamless integration.
        </td\>
      </tr\>
    <tr\>
      <td\>1.17.0</td\>
      <td\>
        <b>NEW</b>: Added copy voucher in enrollment flow.<br /\>
        <b>IMPROVE</b>: Added dependencies for dynamic SDK conditions.<br /\>
        <b>IMPROVE</b>: Restricted allowed characters in dynamic SDK text fields (CARD).<br /\>
        <b>IMPROVE</b>: Restricted allowed characters in dynamic SDK text fields (APM).<br /\>
        <b>CHANGE</b>: Updated validations.<br /\>
        <b>CHANGE</b>: Modified sockets protocol.<br /\>
        <b>IMPROVE</b>: Validated BFF functionalities.<br /\>
        <b>IMPROVE</b>: Validated voucher, UATP, and card type validations.<br /\>
        <b>FIX</b>: General bug fixes and performance improvements.<br /\>
        <b>IMPROVE</b>: Enhanced event and log mapping based on documentation.
        </td\>
      </tr\>
    <tr\>
      <td\>1.16.0</td\>
      <td\>
        <b>NEW</b>: Added FAC 3DS action.<br /\>
        <b>NEW</b>: Added default type in <code>codeViewController</code>.<br /\>
        <b>NEW</b>: Added benefit type and accepted any views in buttons.<br /\>
        <b>NEW</b>: Implemented enrolled card form in dynamic SDK.<br /\>
        <b>NEW</b>: Implemented step-by-step card form in dynamic SDK.<br /\>
        <b>IMPROVE</b>: Dynamically fetched all icons and names of views from the backend.<br /\>
        <b>FIX</b>: General bug fixes and performance improvements.
        </td\>
      </tr\>
    <tr\>
      <td\>1.15.0</td\>
      <td\>
        <b>NEW</b>: Added tests.<br /\>
        <b>NEW</b>: Implemented step-by-step functionality in dynamic SDK.<br /\>
        <b>NEW</b>: Added RUT validation.<br /\>
        <b>NEW</b>: Added <code>termClicked</code> event and <code>onLoaded</code>/<code>onClosed</code>
        lifecycle view events.<br /\>
        <b>NEW</b>: Added all accessibility identifiers to the sample App for automation.<br /\>
        <b>NEW</b>: Added analytics for dynamic SDK.<br /\>
        <b>NEW</b>: Implemented required fields for the enrolled card form.<br /\>
        <b>REMOVE</b>: Removed CNPJ for NuPay enrollment.
        </td\>
      </tr\>
    <tr\>
      <td\>1.9.0</td\>
      <td\>
        <b>NEW</b>: Added loader and service timeout, and improved analytics event flow.
        </td\>
      </tr\>
    <tr\>
      <td\>1.6.2</td\>
      <td\>
        <b>FIX</b>: General bug fixes and performance improvements.<br
          /\>
        <b>IMPROVE</b>: Added validation to query payment status when the App returns from background.
        </td\>
      </tr\>
    </tbody\>
</table\>
`}</HTMLBlock>