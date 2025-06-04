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