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

### Initial Release
The first version of Yuno's Web SDK providing comprehensive payment integration capabilities.

### Core Features
1. **Full Checkout SDK**: Complete payment form with multiple payment methods
2. **Lite Checkout SDK**: Streamlined payment flow for simpler integrations  
3. **Seamless SDK**: Customizable payment components
4. **Headless SDK**: API-first approach for custom UI implementations

### Payment Method Support
- Credit and debit cards
- Digital wallets
- Bank transfers
- Local payment methods
- Multiple currencies and countries

### Integration Methods
- **HTML Script Tag**: Simple script inclusion
- **Dynamic JavaScript**: Programmatic loading
- **NPM Module**: Modern JavaScript framework integration

### Multi-language Support
Initial language support including:
- Spanish (es)
- English (en)
- Portuguese (pt)
- Filipino (fil)
- Indonesian (id)
- Malay (ms)
- Thai (th)

## Implementation

### Script Tag
```html
<script src="https://sdk-web.y.uno/v1/static/js/main.min.js"></script>
```

### Basic Usage
```javascript
// v1.0 synchronous initialization
const yuno = Yuno.initialize(PUBLIC_API_KEY)

yuno.startCheckout({
  checkoutSession: "438413b7-4921-41e4-b8f3-28a5a0141638",
  elementSelector: "#root",
  country_code: "FR",
  language: "fr",
  showLoading: true,
  issuersFormEnable: true,
  showPaymentStatus: true,
  card: {
    isCreditCardProcessingOnly: true,
  },
  onLoading: (args) => {
    console.log(args);
  },
  yunoPaymentMethodSelected: () => {
    console.log("Payment method selected");
  },
  yunoPaymentResult: (status) => {
    console.log("Payment result:", status);
  },
  yunoError: (message, data) => {
    console.error("Payment error:", message, data);
  },
});
```

### Key Methods
- `Yuno.initialize()`: Initialize SDK with API key
- `startCheckout()`: Begin payment process
- `mountCheckout()`: Mount payment form to DOM element

## What's Deprecated

This is the initial release - no deprecated features.
