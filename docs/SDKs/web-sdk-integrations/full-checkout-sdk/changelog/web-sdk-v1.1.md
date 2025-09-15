---
title: Web SDK v1.1 Changelog  
excerpt: 'Major performance improvements and async method updates'
deprecated: false
hidden: false
metadata:
  title: 'Web SDK v1.1 Changelog'
  description: 'Web SDK v1.1 introduces major performance improvements, async methods, and enhanced 3DS handling'
  robots: index
next:
  description: ''
---

# Web SDK v1.1 Changelog

**Release Date**: April 2025  
**Status**: Previous version (superseded by v1.2)

## What's New in v1.1

Version 1.1 represents a major evolution of Yuno's Web SDK, introducing asynchronous operations, enhanced payment flows, and significant performance improvements for modern web applications.

### Async Method Updates
Key SDK methods now support Promise-based operations for better integration with modern JavaScript frameworks.

1. **Promise-based Methods**: Key methods such as `initialize()`, `mountCheckout()`, and `startCheckout()` now return Promises. This change supports better handling of dynamic flows like 3DS, PayPal redirects, and custom UI rendering.

```javascript
// v1.1 async implementation
const yuno = await Yuno.initialize(PUBLIC_API_KEY)
```

### Enhanced `continuePayment` Method
The `continuePayment` method becomes essential for handling complex payment flows and ensuring payment completion.

2. **Critical Payment Continuation**: With the introduction of new payment methods and dynamic flows in SDK v1.1, the `continuePayment` method became more important for completing customer payment experiences after payment creation.

   - **When to use**: When the API response includes `sdk_action_required: true`, you must call `continuePayment` to resume the process
   - **Automatic handling**: The SDK automatically renders necessary screens (3DS authentication, external wallet steps)
   - **Return behavior**: May return a redirect object for merchant-side handling, otherwise returns `null`

### 3DS Enhancements (June 5, 2025)
Streamlined 3DS authentication process with improved reliability and simplified integration requirements.

3. **Simplified 3DS Integration**: Updated 3DS flow to increase reliability and simplify integration:

   - **No separate setup service**: 3DS data collection and setup now included in payment creation
   - **Asynchronous transactions**: All 3DS transactions use redirection for device information and challenges  
   - **Required implementation**: Must implement `continuePayment()` and `yunoPaymentResult()` after payment creation
   - **Performance optimization**: SDK triggers `collect` step only when 3DS is required

### Performance Improvements
Comprehensive optimizations across all SDK operations for faster, more reliable payment processing.

4. **Optimized Flows**: 
   - Reduced unnecessary API calls
   - Improved overall performance  
   - Better visual consistency
   - Enhanced security features

### Click-to-Pay (C2P) Dynamic Behavior
Improved click-to-pay functionality with enhanced user experience and dynamic behavior support.

5. **Enhanced C2P**: Improved click-to-pay functionality with dynamic behavior support

## Implementation Changes

Significant architectural changes that require updates to existing integrations.

### Breaking Changes from v1.0

- **Async methods**: All major methods now return Promises and require `await`
- **`continuePayment` importance**: Now critical for payment completion flows
- **3DS flow changes**: Separate 3DS setup no longer required

### Script Tag
Updated script source for v1.1 with new URL structure:

```html
<script src="https://sdk-web.y.uno/v1.1/main.js"></script>
```

### Migration Example
Comparison showing the key differences between v1.0 and v1.1 implementations:

```javascript
// v1.0 (synchronous)
const yuno = Yuno.initialize(PUBLIC_API_KEY);
yuno.startCheckout(config);

// v1.1 (asynchronous) 
const yuno = await Yuno.initialize(PUBLIC_API_KEY);
await yuno.startCheckout(config);

// Essential: Implement continuePayment for dynamic flows
if (paymentResponse.sdk_action_required) {
  const result = await yuno.continuePayment();
  // Handle result appropriately
}
```

## Migration from v1.0

Essential steps for upgrading existing v1.0 implementations to v1.1.

**Required Changes:**
1. Update script source to v1.1
2. Add `await` to `initialize()`, `mountCheckout()`, and `startCheckout()` calls
3. Implement `continuePayment()` handling for dynamic payment flows
4. Ensure `yunoPaymentResult()` callback is properly configured
5. Remove any separate 3DS setup service calls

**Timeline:**
- **Sandbox**: Changes active from June 5, 2025
- **Production**: Changes active from September 5, 2025

## What's Deprecated in v1.1

Features and patterns that are no longer recommended or supported in v1.1.

- **Separate 3DS setup service**: No longer required; integrated into payment creation
- **Synchronous method calls**: Methods now return Promises and should use `await`
- **Manual 3DS handling**: SDK now handles 3DS flows automatically
