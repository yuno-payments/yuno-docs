---
title: iOS SDK Release notes
deprecated: false
hidden: false
metadata:
  robots: index
---
<HTMLBlock>{`
# Release Notes

<table>
  <thead>
    <tr>
      <th>Version</th>
      <th>Changes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>2.0.0</td>
      <td>
        * **FIX**: Crash on automation flow<br/>
        * **FIX**: Keyboard overlap in view<br/>
        * **FIX**: Card preview margin and gradient background<br/>
        * **NEW**: Mercado Pago 3DS support<br/>
        * **NEW**: Standardized CVV view for enrolled cards<br/>
        * **NEW**: Support for installments even when ID is null<br/>
        * **NEW**: Socket connection based on backend flag<br/>
        * **NEW**: Info action in flexible actions (e.g., Transfiya)
      </td>
    </tr>
    <tr>
      <td>1.25.0</td>
      <td>
        * **NEW**: Astropay enrollment support<br/>
        * **NEW**: Redirect-type enrollment flow
      </td>
    </tr>
    <tr>
      <td>1.24.2</td>
      <td>
        * **NEW**: Recursive loader support in full view
      </td>
    </tr>
    <tr>
      <td>1.24.1</td>
      <td>
        * **NEW**: Notify full view size on payment
      </td>
    </tr>
    <tr>
      <td>1.24.0</td>
      <td>
        * **FIX**: Enrolled card layout and CVV brand logic<br/>
        * **CHANGE**: MP Checkout Pro uses in-app browser instead of WebView<br/>
        * **IMPROVE**: Error handling on dropdowns and field validation<br/>
        * **FIX**: Field UI jumps and keyboard behavior<br/>
        * **IMPROVE**: Design consistency and behavior for dynamic SDK
      </td>
    </tr>
    <tr>
      <td>1.23.2</td>
      <td>
        * **NEW**: Notify cancelByUser when enrollment form is closed
      </td>
    </tr>
    <tr>
      <td>1.23.1</td>
      <td>
        * **NEW**: Notify cancelByUser when Apple Pay modal is closed
      </td>
    </tr>
    <tr>
      <td>1.23.0</td>
      <td>
        * **NEW**: Generic enrollment form and WebSocket support
      </td>
    </tr>
    <tr>
      <td>1.22.1</td>
      <td>
        * **CHANGE**: Return AnyPublisher from embedded redirect view
      </td>
    </tr>
    <tr>
      <td>1.22.0</td>
      <td>
        * **FIX**: Installments dropdown selection<br/>
        * **IMPROVE**: CVV feedback and validation<br/>
        * **NEW**: OTP view and accessibility tags<br/>
        * **REMOVE**: Nationality from required fields
      </td>
    </tr>
    <tr>
      <td>1.21.2</td>
      <td>
        * **NEW**: Add cancellables to enrollment headless flow
      </td>
    </tr>
    <tr>
      <td>1.21.1</td>
      <td>
        * **REMOVE**: Koin dependency
      </td>
    </tr>
    <tr>
      <td>1.21.0</td>
      <td>
        * **FIX**: Voucher and installment instruction issues<br/>
        * **NEW**: Pluxee default action view<br/>
        * **IMPROVE**: Font, layout, and design adjustments<br/>
        * **NEW**: Barcode and payment code in flexible actions
      </td>
    </tr>
    <tr>
      <td>1.20.0</td>
      <td>
        * **NEW**: Koin SDK in Package.swift<br/>
        * **IMPROVE**: UI fixes for checkbox, modals, and timeout screens<br/>
        * **NEW**: Metrics collection using MetricKit<br/>
        * **NEW**: PIX Parcelado support and C2P flag rendering
      </td>
    </tr>
    <tr>
      <td>1.19.3</td>
      <td>
        * **NEW**: NuPay redirect support
      </td>
    </tr>
    <tr>
      <td>1.19.2</td>
      <td>
        * **NEW**: Connect to socket on authorized substatus
      </td>
    </tr>
    <tr>
      <td>1.19.1</td>
      <td>
        * **NEW**: Required document field in enrollment
      </td>
    </tr>
    <tr>
      <td>1.19.0</td>
      <td>
        * **NEW**: Tests for QRIS and Inswitch fixes<br/>
        * **NEW**: Support for Inswitch Cash and Bank Transfer<br/>
        * **NEW**: Lamdatest upload integration
      </td>
    </tr>
    <tr>
      <td>1.18.0</td>
      <td>
        * **FIX**: WebView crash and Fintoc redirect<br/>
        * **REMOVE**: OptionalStateValue class<br/>
        * **NEW**: CardFormViewModel and util tests<br/>
        * **NEW**: Seamless SDK integration<br/>
        * **IMPROVE**: BFF validations and input restrictions
      </td>
    </tr>
    <tr>
      <td>1.17.0</td>
      <td>
        * **FIX**: Voucher copy and BFF logic<br/>
        * **NEW**: Field validation and dynamic SDK enhancements
      </td>
    </tr>
    <tr>
      <td>1.16.0</td>
      <td>
        * **NEW**: FAC 3DS, benefit type support, and dynamic enrolled form<br/>
        * **FIX**: Card validation, OTT creation logic, and dropdown selection
      </td>
    </tr>
    <tr>
      <td>1.15.0</td>
      <td>
        * **NEW**: Step-by-step form and automation accessibility<br/>
        * **IMPROVE**: Analytics, lifecycle events, and required field logic<br/>
        * **CHANGE**: Removed CNPJ from NuPay enrollment
      </td>
    </tr>
    <tr>
      <td>1.9.0</td>
      <td>
        * **NEW**: Loader, timeout handling, and analytics flow improvements
      </td>
    </tr>
    <tr>
      <td>1.6.2</td>
      <td>
        * **FIX**: Prevent ID generation errors from being treated as transaction failures<br/>
        * **NEW**: Status query on app background return
      </td>
    </tr>
  </tbody>
</table>
`}</HTMLBlock>