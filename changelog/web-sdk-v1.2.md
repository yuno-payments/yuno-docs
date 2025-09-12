---
title: Web SDK v1.2 Changelog
excerpt: 'Enhanced continuePayment method and optional initialization parameters'
deprecated: false
hidden: false
metadata:
  title: 'Web SDK v1.2 Changelog'
  description: 'Web SDK v1.2 introduces enhanced continuePayment functionality and optional initialization parameters for advanced use cases'
  robots: index
next:
  description: ''
---

# Web SDK v1.2 Changelog

**Release Date**: April 2025  
**Status**: Previous version (superseded by v1.3)

## What's New in v1.2

### 🚀 Advanced Initialization Options
1. **Optional `options` Parameter**: Support for an optional `options` parameter in `Yuno.initialize`, giving you more control over SDK behavior. This addition is intended for teams with advanced use cases or custom session and tracking requirements.

### 🔄 Enhanced `continuePayment` Method
2. **Extended `continuePayment` Functionality**: Starting from version 1.2.0, the `continuePayment` method now accepts additional properties that were previously only available in `startCheckout`. This allows you to override specific configurations when continuing a payment.

#### New `continuePayment` Properties

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

**Enhanced Parameters:**
- **`checkoutSession`**: Override the checkout session for the current payment
- **`showPaymentStatus`**: Control whether to show the Yuno Payment Status page
- **`yunoPaymentResult`**: Custom callback for payment result handling
- **`yunoError`**: Custom error handling callback
- **`countryCode`**: Specify country code during payment continuation
- **`language`**: Set language preference during payment continuation

### 🌍 Language Support
Includes comprehensive language support:
- Spanish (es), Portuguese (pt), Indonesian (id), Malay (ms), Thai (th)
- Filipino (fil), Chinese Traditional (zh-TW), Chinese Simplified (zh-CN)
- Vietnamese (vi), French (fr), Polish (pl), Italian (it), German (de)
- Russian (ru), Turkish (tr), Dutch (nl), Swedish (sv), Korean (ko), Japanese (ja)

## Implementation Notes

### Key Changes from v1.1

- **Enhanced `continuePayment`**: Method now accepts configuration overrides
- **Advanced initialization**: Optional parameters for custom behavior
- **Backward compatibility**: All v1.1 functionality remains supported

### Script Tag

```html
<script src="https://sdk-web.y.uno/v1.2/main.js"></script>
```

### Example Usage

```javascript
// Enhanced continuePayment with configuration override
yuno.continuePayment({
  checkoutSession: "438413b7-4921-41e4-b8f3-28a5a0141638",
  showPaymentStatus: true,
  yunoPaymentResult: (status) => {
    console.log("Payment completed with status:", status);
  },
  yunoError: (message, data) => {
    console.error("Payment error:", message, data);
  },
  countryCode: "US",
  language: "en"
});
```

## Migration from v1.1

Upgrading from v1.1 to v1.2:

1. Update script source to v1.2
2. Optionally leverage new `continuePayment` parameters for enhanced control
3. Consider using optional initialization parameters for advanced use cases
4. No breaking changes - existing implementations continue to work

## What's Deprecated

No features were deprecated in v1.2. All previous functionality remains available and supported.

---

## Need Help?

- **Latest Documentation**: [Web SDK Integration Guide](../docs/SDKs/web-sdk-integrations/full-checkout-sdk)
- **Next Version**: [Web SDK v1.3 Changelog](web-sdk-v1.3)
- **Previous Version**: [Web SDK v1.1 Changelog](web-sdk-v1.1)
- **Support**: Contact our team for implementation assistance
