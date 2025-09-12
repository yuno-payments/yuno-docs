---
title: Web SDK v1.0 Changelog
excerpt: 'Initial release of Web SDK version 1.0'
deprecated: false
hidden: false
metadata:
  title: Web SDK v1.0 Changelog
  description: 'Initial features and functionality in Web SDK version 1.0'
  robots: index
---

# Web SDK v1.0 Changelog

This changelog documents the initial release and features of Web SDK version 1.0.

## What's New in v1.0

### Initial Release Features
- **Core payment functionality**: Basic payment processing capabilities
- **Multiple payment methods**: Support for various payment methods
- **SDK initialization**: `Yuno.initialize()` method for SDK setup
- **Checkout process**: `yuno.startCheckout()` for starting payment flows
- **Payment mounting**: `yuno.mountCheckout()` for displaying payment forms
- **Payment initiation**: `yuno.startPayment()` for initiating payments
- **One-time token**: `yunoCreatePayment()` for handling payment tokens

### Supported Features
- **Country coverage**: Support for multiple countries
- **Language support**: Basic language options (es, en, pt, fil, id, ms, th)
- **Payment status**: `showPaymentStatus` parameter for payment status display
- **Loading control**: `showLoading` parameter for loading states
- **Issuer forms**: `issuersFormEnable` for bank selection forms
- **Card processing**: Credit card processing with `isCreditCardProcessingOnly` option

### Technical Implementation
- **Script inclusion**: HTML script tag integration
- **TypeScript support**: TypeScript library available
- **Error handling**: Basic error handling capabilities
- **Callback functions**: Support for various callback functions

## What's Deprecated in v1.0

No features were deprecated in v1.0 (initial release).

## Migration Guide

### Getting Started with v1.0

1. **Include the library**: Add the SDK script to your HTML
   ```html
   <script src="https://sdk-web.y.uno/v1/static/js/main.min.js"></script>
   ```

2. **Initialize the SDK**: Create a Yuno instance
   ```javascript
   const yuno = Yuno.initialize(PUBLIC_API_KEY);
   ```

3. **Start checkout**: Configure and start the payment process
   ```javascript
   yuno.startCheckout({
     checkoutSession: "your-checkout-session",
     elementSelector: "#root",
     countryCode: "US",
     language: "en"
   });
   ```

## Version Information
- **Release Date**: [To be filled]
- **Previous Version**: N/A (Initial release)
- **Next Version**: v1.1

## Related Documentation
- [Current Web SDK Documentation](/docs/web-sdk-integrations/full-checkout-sdk)
- [Web SDK v1.1 Changelog](/changelog/web-sdk-v1.1)
