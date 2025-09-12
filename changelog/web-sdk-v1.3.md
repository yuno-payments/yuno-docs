---
title: Web SDK v1.3 Changelog
excerpt: 'Enhanced UI grouping and multilingual support'
deprecated: false
hidden: false
metadata:
  title: 'Web SDK v1.3 Changelog'
  description: 'Latest updates to Yuno Web SDK including improved payment method grouping and expanded language support'
  robots: index
next:
  description: ''
---

# Web SDK v1.3 Changelog

**Release Date**: Latest Version  
**Status**: Current production version

## What's New in v1.3

### 🎯 Enhanced User Experience
1. **Smart Payment Method Grouping**: When a customer has an enrolled payment method, other available payment methods are now grouped under a "More options" dropdown. The enrolled method is displayed prominently by default, and customers can expand the dropdown to choose a different method.

### 🌍 Expanded Language Support  
2. **Multilingual Enhancement**: Added support for multiple Asian and European languages:
   - German (de)
   - Dutch (nl) 
   - Swedish (sv)
   - French (fr)
   - Italian (it)
   - Japanese (ja)
   - Korean (ko)

### 🛠️ Quality & Performance Improvements
3. **General Bug Fixes**: Resolved various issues to improve stability and reliability
4. **Enhanced Styling and Branding**: Improvements to visual consistency and customization options

## Implementation

> 📘 Current Version Implementation
>
> For complete implementation instructions using v1.3, visit the [Web SDK documentation](../docs/SDKs/web-sdk-integrations/full-checkout-sdk).

### Key Changes from v1.2

- **No breaking changes**: v1.3 is fully backward compatible
- **Language parameter**: Expanded options now include the new Asian and European languages
- **UI behavior**: Enrolled payment methods now display with improved grouping logic

### Script Tag Update

```html
<script src="https://sdk-web.y.uno/v1.3/main.js"></script>
```

## Migration from v1.2

Upgrading from v1.2 to v1.3 requires minimal changes:

1. Update your script source to point to v1.3
2. Optionally, take advantage of the new language options
3. No code changes required for existing implementations

## What's Deprecated

No features were deprecated in v1.3. All previous functionality remains available and supported.

---

## Need Help?

- **Latest Documentation**: [Web SDK Integration Guide](../docs/SDKs/web-sdk-integrations/full-checkout-sdk)
- **Previous Version**: [Web SDK v1.2 Changelog](web-sdk-v1.2)
- **Support**: Contact our team for implementation assistance
