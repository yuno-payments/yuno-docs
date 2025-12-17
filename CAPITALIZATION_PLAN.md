# Site-Wide Capitalization Fix Plan

## Overview
This plan outlines the systematic approach to fix capitalization inconsistencies across the entire Yuno documentation site, ensuring compliance with the established capitalization rules.

## Capitalization Rules

### Rule 1: UI Components, Platforms, and Technologies
**Capitalize** names of UI components, platforms, and technologies:
- ✅ Yuno Dashboard
- ✅ Secure Fields SDK
- ✅ One-Time Token
- ✅ Form Card Modal
- ✅ APM Modal
- ✅ Status, Status Lite
- ✅ Payment Status (when referring to the UI component)
- ✅ Card forms (when referring to the UI component type)

### Rule 2: General Concepts and References
**Use lowercase** for concepts or general references:
- ✅ checkout session
- ✅ payment method
- ✅ payment status (when referring to the general concept)
- ✅ form card modal element
- ✅ APM modal element
- ✅ card number input
- ✅ expiration input
- ✅ CVV input

### Rule 3: Titles
**Only capitalize the first word**, as well as proper names or brands:
- ✅ "Stay updated" (not "Stay Updated")
- ✅ "Address autocomplete" (not "Address Autocomplete")
- ✅ "Default Design" (proper name/brand)
- ✅ "Deprecated Design" (proper name/brand)
- ✅ "Modal customization requirements" (not "Modal Customization Requirements")

## Documentation Structure

The documentation is organized into the following main sections:

1. **Get Started with YUNO** (~4 files)
2. **How yuno works** (~12 files)
3. **SDKs** (~74 files)
   - web-sdk-integrations (✅ COMPLETED)
   - ios-sdk-integrations
   - android-sdk-integrations
   - web-secure-fields
   - build-your-integration
4. **USING YUNO** (~28 files)
   - dashboard-services
   - settings
5. **DIRECT INTEGRATION USE CASES** (~9 files)
6. **Payment Features** (~15 files)
7. **Payouts and Disputes** (~4 files)
8. **Webhooks** (~5 files)
9. **Wallets** (~15 files)
10. **AI Capabilities** (~5 files)
11. **Security and Compliance** (~12 files)
12. **PLUGINS** (~4 files)
13. **Additional Services** (~5 files)

**Total: ~164+ markdown files**

## Execution Plan

### Phase 1: High-Priority Sections (Week 1)
**Focus: Most frequently accessed documentation**

1. **SDKs Section** (74 files)
   - ✅ web-sdk-integrations (COMPLETED)
   - ⏳ ios-sdk-integrations (~11 files)
   - ⏳ android-sdk-integrations (~14 files)
   - ⏳ web-secure-fields (~4 files)
   - ⏳ build-your-integration (~8 files)
   - ⏳ Other SDK files (~37 files)

2. **Get Started with YUNO** (~4 files)
   - Critical for new users

3. **How yuno works** (~12 files)
   - Core concepts documentation

### Phase 2: Medium-Priority Sections (Week 2)
**Focus: Feature documentation**

4. **Payment Features** (~15 files)
5. **Wallets** (~15 files)
6. **DIRECT INTEGRATION USE CASES** (~9 files)
7. **Webhooks** (~5 files)

### Phase 3: Lower-Priority Sections (Week 3)
**Focus: Administrative and advanced features**

8. **USING YUNO** (~28 files)
9. **Security and Compliance** (~12 files)
10. **Payouts and Disputes** (~4 files)
11. **AI Capabilities** (~5 files)
12. **PLUGINS** (~4 files)
13. **Additional Services** (~5 files)

## Workflow for Each File

### Step 1: Analysis
1. Read the file
2. Identify all instances of:
   - UI component names
   - General concepts
   - Titles and headings
   - Proper names/brands

### Step 2: Fix Capitalization
1. Apply Rule 1: Capitalize UI components/platforms/technologies
2. Apply Rule 2: Lowercase general concepts
3. Apply Rule 3: Fix title capitalization

### Step 3: Validation
1. Review changes
2. Check for consistency within the file
3. Verify against capitalization rules

### Step 4: Documentation
1. Track completed files
2. Note any edge cases or questions
3. Update progress tracker

## Common Patterns to Look For

### UI Components (Capitalize)
- Form Card Modal
- APM Modal
- Payment Status (component)
- Status, Status Lite
- Secure Fields SDK
- Full SDK, Lite SDK
- Headless SDK
- Seamless SDK
- Card forms (as component type)

### General Concepts (Lowercase)
- checkout session
- payment method
- payment status (concept)
- form card modal element
- APM modal element
- card number input
- expiration input
- CVV input
- card owner
- error message
- modal content
- button element
- input element
- dropdown element

### Titles (First Word + Proper Names Only)
- "Stay updated" ✅
- "Address autocomplete" ✅
- "Modal customization requirements" ✅
- "Default Design" ✅ (proper name)
- "Deprecated Design" ✅ (proper name)

## Quality Assurance

### Pre-Commit Checklist
- [ ] All UI component names capitalized
- [ ] All general concepts lowercase
- [ ] All titles follow Rule 3
- [ ] Consistency checked within file
- [ ] No false positives (e.g., code examples, CSS classes)

### Review Process
1. Self-review before committing
2. Cross-reference with similar files
3. Check for edge cases
4. Validate against rules

## Progress Tracking

### Completed Sections
- ✅ web-sdk-integrations (5 files)
- ✅ ios-sdk-integrations (11 files)
- ✅ android-sdk-integrations (15 files)
- ✅ web-secure-fields (4 files)
- ✅ build-your-integration (8 files)
- ✅ Get Started with YUNO (3 files)
- ✅ How yuno works (12 files)
- ✅ Payment Features (15 files)
- ✅ Wallets (13 files)
- ✅ DIRECT INTEGRATION USE CASES (9 files)
- ✅ Webhooks (4 files)

### In Progress
- ⏳ None

### Pending
- ⏳ All other sections

## Tools and Automation

### Manual Review Required
- Context-dependent capitalization
- Proper name identification
- Edge case handling

### Potential Automation
- Grep searches for common patterns
- Title capitalization checks
- Consistency validation

## Estimated Timeline

- **Phase 1**: 5-7 days (high-priority sections)
- **Phase 2**: 3-4 days (medium-priority sections)
- **Phase 3**: 2-3 days (lower-priority sections)
- **Total**: ~10-14 days for complete site-wide fix

## Notes

- Some terms may be ambiguous (e.g., "Payment Status" vs "payment status")
- Context is critical for proper capitalization
- Code examples and CSS class names should NOT be changed
- Maintain consistency across related files
- When in doubt, refer to the capitalization rules

## Next Steps

1. Begin with Phase 1, starting with iOS SDK integrations
2. Create a checklist for each section
3. Track progress in this document
4. Review and adjust plan as needed

---

## PR Information

### Branch Name
```
docs/site-wide-capitalization-fix-plan
```

### PR Title
```
Add site-wide capitalization fix plan and fix web-sdk-integrations section
```

### PR Description
```markdown
## Summary
This PR introduces a comprehensive plan for fixing capitalization inconsistencies across the entire Yuno documentation site and implements the first phase by fixing the `web-sdk-integrations` section.

## Changes

### Phase 1 Implementation (Completed)
- ✅ Fixed capitalization in `web-sdk-integrations` section (5 files)
  - `payment-status.md`
  - `seamless-sdk-payment-web.md`
  - `sdk-customizations/index.md`
  - `sdk-customizations/sdk-customizations-default-design.md`
  - `sdk-customizations/sdk-customizations-deprecated-design.md`

### Capitalization Rules Applied
- ✅ **UI Components & Technologies**: Capitalized proper names (e.g., Form Card Modal, APM Modal, Status, Status Lite, Card forms)
- ✅ **General Concepts**: Ensured lowercase for general references (e.g., checkout session, payment method, form card modal element, payment status)
- ✅ **Titles**: Applied title case rules (only first word capitalized, plus proper names/brands)

### Planning Document
- 📋 Added `CAPITALIZATION_PLAN.md` with:
  - Complete capitalization rules and guidelines
  - Documentation structure analysis (~164+ files)
  - Phased execution plan (3 phases, ~10-14 days)
  - Quality assurance checklist
  - Progress tracking framework

## Files Modified
- `docs/SDKs/web-sdk-integrations/payment-status.md`
- `docs/SDKs/web-sdk-integrations/seamless-sdk-payment-web.md`
- `docs/SDKs/web-sdk-integrations/sdk-customizations/index.md`
- `docs/SDKs/web-sdk-integrations/sdk-customizations/sdk-customizations-default-design.md`
- `docs/SDKs/web-sdk-integrations/sdk-customizations/sdk-customizations-deprecated-design.md`

## Files Added
- `CAPITALIZATION_PLAN.md` - Comprehensive plan for site-wide capitalization fixes

## Next Steps
Following this PR, the plan outlines:
1. **Phase 1** (Week 1): High-priority sections (SDKs, Get Started, How yuno works)
2. **Phase 2** (Week 2): Medium-priority sections (Payment Features, Wallets, Direct Integration)
3. **Phase 3** (Week 3): Lower-priority sections (USING YUNO, Security, etc.)

## Capitalization Rules Summary
1. **Capitalize** UI components, platforms, and technologies (e.g., Yuno Dashboard, Secure Fields SDK, Form Card Modal)
2. **Lowercase** general concepts and references (e.g., checkout session, payment method, form card modal element)
3. **Titles**: Only capitalize the first word, plus proper names/brands (e.g., "Stay updated", "Address autocomplete", "Default Design")

## Impact
- Improves documentation consistency
- Establishes clear capitalization guidelines
- Provides roadmap for complete site-wide fix
- Enhances readability and professionalism
```

