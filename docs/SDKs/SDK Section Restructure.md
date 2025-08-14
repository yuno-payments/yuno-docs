# SDK Section Restructure - New Structure Implementation

## Overview

We're restructuring the SDKs section to create a more intuitive, version-based organization that puts the latest versions first. This restructuring includes merging the "BUILD YOUR INTEGRATION" section into the "SDKs" section to consolidate all SDK-related documentation in one place.

## Phases development

### Phase 1: BUILD YOUR INTEGRATION Migration
- [x] `seamless-sdk.md` → `sdk-web/sdk-v1.3/seamless-full/`
- [x] `full-sdk-workflow.md` → `sdk-web/sdk-v1.3/full/`
- [x] `the-ultimate-checkout-lite.md` → `sdk-web/sdk-v1.3/lite/`
- [x] `enrollment-lite.md` → `sdk-web/sdk-v1.3/lite/`
- [x] `secure-fields.md` → `sdk-web/sdk-v1.3/secured-fields/payment/`
- [x] `headless-sdk-integration.md` → `sdk-web/sdk-v1.3/headless/`
- [x] `headless-sdk-enrollment-steps.md` → `sdk-web/sdk-v1.3/headless/`

### Phase 2: Web SDK Integrations Migration
- [ ] Move `web-sdk-integrations/full-checkout-sdk/` → `sdk-web/sdk-v1.3/full/`
- [ ] Move `web-sdk-integrations/lite-checkout-sdk/` → `sdk-web/sdk-v1.3/lite/`
- [ ] Move `web-sdk-integrations/secure-fields-web/` → `sdk-web/sdk-v1.3/secured-fields/`
- [ ] Move `web-sdk-integrations/alternative-sdks/` → appropriate version folders

### Phase 3: Overview Files Migration
- [ ] Move `choose-the-right-integration-for-you.md` → `sdk-web/sdk-v1.3/`
- [ ] Move `direct-flow.md` → `sdk-web/sdk-v1.3/`
- [ ] Create unified navigation structure

### Phase 4: Cleanup & Finalization
- [ ] Remove old BUILD YOUR INTEGRATION section
- [ ] Update all internal links and cross-references
- [ ] Test navigation and user experience
- [ ] Validate new structure

## New SDK Structure

```
sdk-web/
├── sdk-v1.3/          ← Latest version FIRST
│   ├── instalacion/
│   ├── implementacion/
│   ├── full/
│   ├── lite/
│   ├── secured-fields/
│   │   ├── payment/
│   │   └── enrollment/
│   ├── headless/
│   ├── seamless-full/
│   └── seamless-lite/
├── sdk-v1.2/
├── sdk-v1.1/
└── sdk-v1.0/          ← Oldest version LAST
```