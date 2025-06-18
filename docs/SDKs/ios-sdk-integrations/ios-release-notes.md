---
title: iOS SDK release notes
deprecated: false
hidden: false
metadata:
  robots: index
---
The iOS SDK release notes provide a comprehensive overview of the updates, improvements, and fixes introduced in each version of the iOS SDK.

| Version | Changes                                                                                                                                            |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2.0.0   | **IMPROVE**: Enhanced NuPay enrollment to filter passport information.                                                                             |
|         | **NEW**: Added support for NuPay installments.                                                                                                     |
|         | **IMPROVE**: Migrated old Alternative Payment Methods (APMs) to flexible actions, simplifying the code and removing unnecessary UI elements.       |
|         | **IMPROVE**: Standardized the CVV input field for enrolled generic cards.                                                                          |
|         | **NEW**: Integrated Mercado Pago 3DS for enhanced fraud protection.                                                                                |
|         | **IMPROVE**: Implemented socket connection based on a backend flag.                                                                                |
|         | **NEW**: Added support for informational actions within flexible actions (e.g., Transfiya).                                                        |
|         | **IMPROVE**: Reordered payment buttons for a more intuitive user experience.                                                                       |
|         | **NEW**: Added support for APM neighborhood information.                                                                                           |
|         | **NEW**: Integrated Airwallex anti-fraud capabilities.                                                                                             |
|         | **NEW**: Added support for 3DS Unlimit.                                                                                                            |
|         | **NEW**: Included a neighborhood text field for customer information.                                                                              |
|         | **FIX**: General bug fixes and performance improvements.                                                                                           |
| 1.25.0  | **NEW**: Added support for Astropay enrollment.                                                                                                    |
|         | **NEW**: Implemented support for redirect-type enrollment.                                                                                         |
| 1.24.2  | **IMPROVE**: Enhanced loader display with recursive presentation.                                                                                  |
| 1.24.1  | **IMPROVE**: Added notification for full payment view size.                                                                                        |
| 1.24.0  | **CHANGE**: Switched Mercado Pago Checkout Pro redirect from webview to an in-app browser.                                                         |
|         | **CHANGE**: Modified the 3DS flow.                                                                                                                 |
|         | **IMPROVE**: Enhanced the visualization of enrolled card methods.                                                                                  |
|         | **NEW**: Enabled setting brand information for enrolled cards.                                                                                     |
|         | **CHANGE**: Updated the keyboard type enumeration in the dynamic SDK.                                                                              |
|         | **NEW**: Added support for extended forms in the full payment list.                                                                                |
|         | **REVERT**: Reverted card component logic for CVV handling.                                                                                        |
|         | **NEW**: Added support for loading URLs for 3DS challenges.                                                                                        |
|         | **NEW**: Implemented preselected payment methods.                                                                                                  |
|         | **IMPROVE**: Migrated the full payment list to SwiftUI.                                                                                            |
|         | **IMPROVE**: Standardized keyboard type behavior.                                                                                                  |
|         | **IMPROVE**: Standardized keyboard "next" button behavior.                                                                                         |
|         | **NEW**: Added styling support for flexible actions.                                                                                               |
|         | **NEW**: Added a QR button to flexible actions.                                                                                                    |
|         | **NEW**: Implemented CVV logic for required fields.                                                                                                |
|         | **IMPROVE**: Enabled setting keyboard type in relevant fields.                                                                                     |
|         | **FIX**: General bug fixes and performance improvements.                                                                                           |
| 1.23.2  | **NEW**: Implemented notification for `cancelByUser` when the user closes enrollment forms.                                                        |
| 1.23.1  | **NEW**: Implemented notification for `cancelByUser` when the user closes the Apple Pay modal.                                                     |
| 1.23.0  | **NEW**: Added support for generic enrollment forms and websocket connectivity (tested with Bancolombia button).                                   |
| 1.22.1  | **IMPROVE**: Ensured `anyPublisher` is returned directly for embedded web views (redirects) instead of a protocol.                                 |
| 1.22.0  | **REMOVE**: Removed nationality from required fields.                                                                                              |
|         | **NEW**: Created an OTP view within flexible actions.                                                                                              |
|         | **NEW**: Added `x-sdk-type` to all request headers.                                                                                                |
|         | **NEW**: Implemented enrolled card support for the dynamic SDK.                                                                                    |
|         | **NEW**: Added notification for authorized substatus.                                                                                              |
|         | **NEW**: Added accessibility identifiers to image actions in dynamic actions.                                                                      |
|         | **IMPROVE**: Updated animations to align with Figma designs.                                                                                       |
|         | **NEW**: Added tests for `AnalyticsReporter`, `BPXLUUIDHandler`, `CardViewmodel+Validation`, `YunoPyamentDelegate`, and `EnrollmentActionFactory`. |
|         | **IMPROVE**: Allowed empty regex validation in dynamic SDK.                                                                                        |
|         | **NEW**: Enabled image views inside dropdown views if they exist.                                                                                  |
|         | **REMOVE**: Removed the background image of waves from the status screen.                                                                          |
|         | **NEW**: Added dynamic SDK fixes and iPad demo.                                                                                                    |
|         | **NEW**: Supported downloaded fonts for the dynamic SDK.                                                                                           |
|         | **FIX**: General bug fixes and performance improvements.                                                                                           |
| 1.21.2  | **NEW**: Added `anyCancellables` to `YunoEnrollmentHeadlessImpl`.                                                                                  |
| 1.21.1  | **REMOVE**: Removed Koin dependency.                                                                                                               |
| 1.21.0  | **CHANGE**: Updated Inswitch copy.                                                                                                                 |
|         | **CHANGE**: Default action view is now used only for Pluxee.                                                                                       |
|         | **IMPROVE**: Ensured only credit options are displayed.                                                                                            |
|         | **NEW**: Added support for payment codes in flexible actions.                                                                                      |
|         | **NEW**: Added support for barcodes in flexible actions.                                                                                           |
|         | **NEW**: Integrated Xendit - Indoramart payment method.                                                                                            |
|         | **NEW**: Added MetricKit and URLSessionTaskMetrics for performance monitoring.                                                                     |
|         | **NEW**: Added dynamic actions - IMAGE.                                                                                                            |
|         | **NEW**: Added payment flow helper tests.                                                                                                          |
|         | **NEW**: Implemented combined payment and enrollment flow.                                                                                         |
|         | **FIX**: General bug fixes and performance improvements.                                                                                           |
| 1.20.0  | **NEW**: Integrated Koin SDK into the general package.swift.                                                                                       |
|         | **NEW**: Implemented a delayed provider response screen.                                                                                           |
|         | **IMPROVE**: Enabled saving keys with different accounts.                                                                                          |
|         | **NEW**: Added browser information collection from WebView.                                                                                        |
|         | **NEW**: Implemented saving and sending C2P tokens in user defaults.                                                                               |
|         | **IMPROVE**: Enabled C2P rendering based on a feature flag.                                                                                        |
|         | **CHANGE**: Adjusted the cardholder limit.                                                                                                         |
|         | **NEW**: Implemented Koin PIX Parcelado for reading sockets.                                                                                       |
|         | **NEW**: Integrated Koin PIX Parcelado.                                                                                                            |
|         | **NEW**: Added "In review" information for Koin.                                                                                                   |
|         | **NEW**: Implemented "Waiting for OTP" for Koin.                                                                                                   |
|         | **FIX**: General bug fixes and performance improvements.                                                                                           |
| 1.19.3  | **NEW**: Added NuPay redirect payment.                                                                                                             |
| 1.19.2  | **IMPROVE**: Enabled socket connection when substatus is authorized.                                                                               |
| 1.19.1  | **NEW**: Added document required field in enrollment.                                                                                              |
| 1.19.0  | **NEW**: Added a tag to branches where QA versions are generated.                                                                                  |
|         | **NEW**: Integrated Inswitch - cash payment method.                                                                                                |
|         | **NEW**: Integrated Inswitch - bank transfer payment method.                                                                                       |
|         | **NEW**: Added Lane to upload IPA to Lambdatest.                                                                                                   |
|         | **NEW**: Integrated Xendit QRIS.                                                                                                                   |
|         | **FIX**: General bug fixes and performance improvements.                                                                                           |
| 1.18.0  | **REMOVE**: Removed `OptionalStateValue` from dynamic SDK.                                                                                         |
|         | **NEW**: Added tests for `CardFormViewModel`.                                                                                                      |
|         | **NEW**: Added utility tests.                                                                                                                      |
|         | **NEW**: Implemented RUT and masks.                                                                                                                |
|         | **REMOVE**: Removed `YunoDynamicConnection` class.                                                                                                 |
|         | **FIX**: General bug fixes and performance improvements.                                                                                           |
|         | **FEATURE**: Added SDK seamless integration.                                                                                                       |
| 1.17.0  | **NEW**: Added copy voucher in enrollment flow.                                                                                                    |
|         | **IMPROVE**: Added dependencies for dynamic SDK conditions.                                                                                        |
|         | **IMPROVE**: Restricted allowed characters in dynamic SDK text fields (CARD).                                                                      |
|         | **IMPROVE**: Restricted allowed characters in dynamic SDK text fields (APM).                                                                       |
|         | **CHANGE**: Updated validations.                                                                                                                   |
|         | **CHANGE**: Modified sockets protocol.                                                                                                             |
|         | **IMPROVE**: Validated BFF functionalities.                                                                                                        |
|         | **IMPROVE**: Validated voucher, UATP, and card type validations.                                                                                   |
|         | **FIX**: General bug fixes and performance improvements.                                                                                           |
|         | **IMPROVE**: Enhanced event and log mapping based on documentation.                                                                                |
| 1.16.0  | **NEW**: Added FAC 3DS action.                                                                                                                     |
|         | **NEW**: Added default type in `codeViewController`.                                                                                               |
|         | **NEW**: Added benefit type and accepted any views in buttons.                                                                                     |
|         | **NEW**: Implemented enrolled card form in dynamic SDK.                                                                                            |
|         | **NEW**: Implemented step-by-step card form in dynamic SDK.                                                                                        |
|         | **IMPROVE**: Dynamically fetched all icons and names of views from the backend.                                                                    |
|         | **FIX**: General bug fixes and performance improvements.                                                                                           |
| 1.15.0  | **NEW**: Added tests.                                                                                                                              |
|         | **NEW**: Implemented step-by-step functionality in dynamic SDK.                                                                                    |
|         | **NEW**: Added RUT validation.                                                                                                                     |
|         | **NEW**: Added `termClicked` event and `onLoaded`/`onClosed` lifecycle view events.                                                                |
|         | **NEW**: Added all accessibility identifiers to the sample App for automation.                                                                     |
|         | **NEW**: Added analytics for dynamic SDK.                                                                                                          |
|         | **NEW**: Implemented required fields for the enrolled card form.                                                                                   |
|         | **REMOVE**: Removed CNPJ for NuPay enrollment.                                                                                                     |
| 1.9.0   | **NEW**: Added loader and service timeout, and improved analytics event flow.                                                                      |
| 1.6.2   | **FIX**: General bug fixes and performance improvements.                                                                                           |
|         | **IMPROVE**: Added validation to query payment status when the App returns from background.                                                        |