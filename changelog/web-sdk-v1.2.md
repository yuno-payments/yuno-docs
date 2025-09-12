---
title: Web SDK v1.2 Changelog
excerpt: 'What\'s new and what\'s deprecated in Web SDK version 1.2'
deprecated: false
hidden: false
metadata:
  title: Web SDK v1.2 Changelog
  description: 'Changes, new features, and deprecated functionality in Web SDK version 1.2'
  robots: index
---

# Web SDK v1.2 Changelog

This changelog documents the changes, new features, and deprecated functionality in Web SDK version 1.2.

## What's New in v1.2

### New Features
- **Optional `options` parameter in `Yuno.initialize`**: Support for an optional `options` parameter in `Yuno.initialize`, giving you more control over SDK behavior. This addition is intended for teams with advanced use cases or custom session and tracking requirements.
- **Enhanced `continuePayment` method**: Starting from version 1.2.0, the `continuePayment` method now accepts additional properties that were previously only available in `startCheckout`. This allows you to override specific configurations when continuing a payment.

### Enhanced `continuePayment` Method

The `continuePayment` method can now receive the following new properties:

```typescript
continuePayment({
  checkoutSession?: string
  showPaymentStatus?: boolean
  yunoPaymentResult?: (status: string) => void
  yunoError?: (message: string, data?: unknown) => void
  countryCode?: string
  language?: string
})
```

### New Parameters Available

| Parameter | Description |
|-----------|-------------|
| `checkoutSession` | The checkout session for the current payment. Example: `'438413b7-4921-41e4-b8f3-28a5a0141638'` |
| `showPaymentStatus` | Controls whether to show the Yuno Payment Status page. By default, it's `true`. |
| `yunoPaymentResult` | Callback function that executes when the payment result is obtained. Receives the payment status as a parameter. |
| `yunoError` | Callback function that executes when an error occurs during the payment process. Receives the error message and optional additional data. |
| `countryCode` | Specifies the country code for the payment process. Use an `ENUM` value representing the desired country code. |
| `language` | Defines the language to be used in the payment forms. You can set it to one of the available language options: es (Spanish), en (English), pt (Portuguese), fil (Filipino), id (Indonesian), ms (Malay), th (Thai), zh-TW (Chinese Traditional, Taiwan), zh-CN (Chinese Simplified, China), vi (Vietnamese), fr (French), pl (Polish), it (Italian), de (German), ru (Russian), tr (Turkish), nl (Dutch), sv (Swedish), ko (Korean), ja (Japanese). |

### Implementation Example

```javascript
yuno.continuePayment({
  checkoutSession: "438413b7-4921-41e4-b8f3-28a5a0141638",
  showPaymentStatus: true,
  countryCode: "FR",
  language: "fr",
  yunoPaymentResult: (status) => {
    console.log("Payment result:", status);
  },
  yunoError: (message, data) => {
    console.error("Payment error:", message, data);
  },
});
```

## What's Deprecated in v1.2

No features were deprecated in v1.2.

## Migration Guide

### From v1.1 to v1.2

1. **Optional `options` parameter**: If you need advanced configuration, you can now use the optional `options` parameter in `Yuno.initialize()`:
   ```javascript
   const yuno = await Yuno.initialize(PUBLIC_API_KEY, undefined, options);
   ```

2. **Enhanced `continuePayment`**: You can now pass additional parameters to `continuePayment()` that were previously only available in `startCheckout()`.

## Version Information
- **Release Date**: [To be filled]
- **Previous Version**: v1.1
- **Next Version**: v1.3

## Related Documentation
- [Current Web SDK Documentation](/docs/web-sdk-integrations/full-checkout-sdk)
- [Web SDK v1.3 Changelog](/changelog/web-sdk-v1.3)
- [Web SDK v1.1 Changelog](/changelog/web-sdk-v1.1)
