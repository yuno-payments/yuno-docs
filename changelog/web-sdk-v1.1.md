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

Starting April 2025, Yuno launched version 1.1 of its Web SDKs with major performance improvements, a more flexible checkout experience, better visual consistency, and new features that improve both security and usability.

### Async Method Updates
1. **Promise-based Methods**: Key methods such as `initialize()`, `mountCheckout()`, and `startCheckout()` now return Promises. This change supports better handling of dynamic flows like 3DS, PayPal redirects, and custom UI rendering.

```javascript
// v1.1 async implementation
const yuno = await Yuno.initialize(PUBLIC_API_KEY)
```

### Enhanced `continuePayment` Method  
2. **Critical Payment Continuation**: With the introduction of new payment methods and dynamic flows in SDK v1.1, the `continuePayment` method became more important for completing customer payment experiences after payment creation.

   - **When to use**: When the API response includes `sdk_action_required: true`, you must call `continuePayment` to resume the process
   - **Automatic handling**: The SDK automatically renders necessary screens (3DS authentication, external wallet steps)
   - **Return behavior**: May return a redirect object for merchant-side handling, otherwise returns `null`

### 3DS Enhancements (June 5, 2025)
3. **Simplified 3DS Integration**: Updated 3DS flow to increase reliability and simplify integration:

   - **No separate setup service**: 3DS data collection and setup now included in payment creation
   - **Asynchronous transactions**: All 3DS transactions use redirection for device information and challenges  
   - **Required implementation**: Must implement `continuePayment()` and `yunoPaymentResult()` after payment creation
   - **Performance optimization**: SDK triggers `collect` step only when 3DS is required

### Performance Improvements
4. **Optimized Flows**: 
   - Reduced unnecessary API calls
   - Improved overall performance  
   - Better visual consistency
   - Enhanced security features

### Click-to-Pay (C2P) Dynamic Behavior
5. **Enhanced C2P**: Improved click-to-pay functionality with dynamic behavior support

## Implementation Changes

### Breaking Changes from v1.0

- **Async methods**: All major methods now return Promises and require `await`
- **`continuePayment` importance**: Now critical for payment completion flows
- **3DS flow changes**: Separate 3DS setup no longer required

### Script Tag

```html
<script src="https://sdk-web.y.uno/v1.1/main.js"></script>
```

### Migration Example

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

- **Separate 3DS setup service**: No longer required; integrated into payment creation
- **Synchronous method calls**: Methods now return Promises and should use `await`
- **Manual 3DS handling**: SDK now handles 3DS flows automatically
