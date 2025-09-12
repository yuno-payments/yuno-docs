---
title: Web SDK v1.0 Changelog
excerpt: 'Initial release of Yuno Web SDK'
deprecated: false
hidden: false
metadata:
  title: 'Web SDK v1.0 Changelog'
  description: 'Initial release of Yuno Web SDK with core payment functionality'
  robots: index
next:
  description: ''
---

# Web SDK v1.0 Changelog

**Release Date**: Early 2025  
**Status**: Original version (superseded by v1.1)

## What's New in v1.0

### 🎉 Initial Release
The first version of Yuno's Web SDK providing comprehensive payment integration capabilities.

### 🛠️ Core Features
1. **Full Checkout SDK**: Complete payment form with multiple payment methods
2. **Lite Checkout SDK**: Streamlined payment flow for simpler integrations  
3. **Seamless SDK**: Customizable payment components
4. **Headless SDK**: API-first approach for custom UI implementations

### 💳 Payment Method Support
- Credit and debit cards
- Digital wallets
- Bank transfers
- Local payment methods
- Multiple currencies and countries

### 🔧 Integration Methods
- **HTML Script Tag**: Simple script inclusion
- **Dynamic JavaScript**: Programmatic loading
- **NPM Module**: Modern JavaScript framework integration

### 🌍 Multi-language Support
Initial language support including:
- English (en)
- Spanish (es)  
- Portuguese (pt)
- And additional regional languages

## Implementation

### Script Tag
```html
<script src="https://sdk-web.y.uno/v1.0/main.js"></script>
```

### Basic Usage
```javascript
// v1.0 synchronous initialization
const yuno = Yuno.initialize(PUBLIC_API_KEY);

yuno.startCheckout({
  checkoutSession: "session-id",
  elementSelector: "#payment-container",
  countryCode: "US",
  language: "en",
  // ... other configuration
});
```

### Key Methods
- `Yuno.initialize()`: Initialize SDK with API key
- `startCheckout()`: Begin payment process
- `mountCheckout()`: Mount payment form to DOM element

## What's Deprecated

This is the initial release - no deprecated features.

---

## Need Help?

- **Latest Documentation**: [Web SDK Integration Guide](../docs/SDKs/web-sdk-integrations/full-checkout-sdk)
- **Next Version**: [Web SDK v1.1 Changelog](web-sdk-v1.1)
- **Support**: Contact our team for implementation assistance
