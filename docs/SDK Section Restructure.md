# SDK Section Restructure - New Structure Implementation

## Overview
We're restructuring the SDKs section to create a more intuitive, version-based organization that puts the latest versions first. **This restructuring includes merging the "BUILD YOUR INTEGRATION" section into the "SDKs" section** to consolidate all SDK-related documentation in one place. This approach follows the developer's feedback and focuses on the best user experience and simplicity.

## New SDK Structure

### **Primary Focus: sdk-web (Latest First)**
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

## Implementation Tasks

### 0. **BUILD YOUR INTEGRATION Section Merge**
- [ ] **Audit Current Content**: Review all files in `docs/BUILD YOUR INTEGRATION/` and `docs/BUILD YOUR INTEGRATION/build-your-integration/`
- [ ] **Content Mapping**: Map each file to its new location in the SDKs structure
- [ ] **Dependency Analysis**: Identify all internal links and cross-references that need updating
- [ ] **Merge Planning**: Create detailed migration plan for each content piece
- [ ] **Section Removal**: After successful migration, remove the old "BUILD YOUR INTEGRATION" section entirely

### 1. **Create New SDK Web Structure**
- [ ] Create `docs/SDKs/sdk-web/` directory
- [ ] Create version subdirectories (v1.3, v1.2, v1.1, v1.0)
- [ ] Create consistent subfolder structure in each version
- [ ] Update `_order.yaml` to reflect new structure

### 2. **Content Migration from Build Your Integration**
- [ ] Move `seamless-sdk.md` → `docs/SDKs/sdk-web/sdk-v1.3/seamless-full/`
- [ ] Move `full-sdk-workflow.md` → `docs/SDKs/sdk-web/sdk-v1.3/full/`
- [ ] Move `the-ultimate-checkout-lite.md` → `docs/SDKs/sdk-web/sdk-v1.3/lite/`
- [ ] Move `secure-fields.md` → `docs/SDKs/sdk-web/sdk-v1.3/secured-fields/`
- [ ] Move `headless-sdk-integration.md` → `docs/SDKs/sdk-web/sdk-v1.3/headless/`
- [ ] Move `headless-sdk-enrollment-steps.md` → `docs/SDKs/sdk-web/sdk-v1.3/headless/`
- [ ] Move `enrollment-lite.md` → `docs/SDKs/sdk-web/sdk-v1.3/lite/`

### 3. **Content Migration from Existing Web SDK Structure**
- [ ] Move `docs/SDKs/web-sdk-integrations/full-checkout-sdk/` content → `docs/SDKs/sdk-web/sdk-v1.3/full/`
- [ ] Move `docs/SDKs/web-sdk-integrations/lite-checkout-sdk/` content → `docs/SDKs/sdk-web/sdk-v1.3/lite/`
- [ ] Move `docs/SDKs/web-sdk-integrations/secure-fields-web/` content → `docs/SDKs/sdk-web/sdk-v1.3/secured-fields/`
- [ ] Move `docs/SDKs/web-sdk-integrations/alternative-sdks/` content → appropriate version folders
- [ ] Move `docs/SDKs/seamless-sdk-recommended/` web content → `docs/SDKs/sdk-web/sdk-v1.3/seamless-full/`

### 4. **Version-Specific Content Organization**
- [ ] Create `instalacion/` folder with platform-specific installation guides
- [ ] Create `implementacion/` folder with getting started and configuration guides
- [ ] Organize existing content by SDK type (full, lite, secured-fields, headless, seamless)
- [ ] Ensure each version has consistent folder structure

### 5. **Content Updates and Standardization**
- [ ] Rename articles to match new structure (e.g., `web-installation-v1.3.md`)
- [ ] Update all internal links and cross-references
- [ ] Create consistent navigation between related articles
- [ ] Ensure logical flow: Installation → Implementation → Specific Features

### 6. **Navigation and Menu Updates**
- [ ] Update main navigation to prioritize sdk-web
- [ ] Update breadcrumbs to reflect new structure
- [ ] Test navigation flow and user experience
- [ ] Ensure latest version (v1.3) is prominently featured

### 7. **Quality Assurance**
- [ ] Verify no content is lost during migration
- [ ] Test all internal links and navigation
- [ ] Ensure consistent formatting and styling
- [ ] Validate new structure meets user experience goals

