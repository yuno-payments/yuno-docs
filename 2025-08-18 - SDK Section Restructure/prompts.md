List the information we discussed about the "SDK section improvement" migration we are working on in the meeting "2025-09-08-meeting-transcription.md."

## SDK Section Improvement Migration Details

### 1. **Build Your Integration + SDKs Consolidation**
- Moving "Build Your Integration" content together with the SDKs section
- **Important**: No content will be lost - it's just a reordering/reorganisation
- This work was already started in a branch and the content has been moved without removal

### 2. **Version Management Strategy**
- **Problem**: Currently each SDK article has multiple versions (1.1, 1.2, 1.3) listed, which becomes unwieldy as development continues
- **Solution**: Implement a changelog-based approach:
  - Keep only **one article per SDK** showing the **latest version**
  - Move older version information to **changelog pages**
  - Each changelog will have:
    - "What's new" section for the current version
    - "What's deprecated" section for older functionality that's no longer available
  - When new versions are released (e.g., 1.4 or 2.0), update the main article and create a new changelog page

### 3. **Changelog Improvements**
- **Current Problem**: Changelog titles are terrible (just dates like "January 2025")
- **Solution**: Create descriptive titles that actually explain what changed
- **Example**: Instead of "January 2025", use titles like "Additional tickets and subscription first payments"
- Remove generic placeholder text like "There have been some updates" and replace with specific, descriptive content

### 4. **Implementation Approach**
- Work will be done in **one branch** to showcase the complete end result
- Add a callout at the start of each SDK article stating: "These instructions are for version X.X, which is the latest version. If you need information on previous versions, refer to the changelog"
- Link to the changelog for users who need older version information

### 5. **Additional Context**
- This is part of a larger documentation improvement effort
- Timeline pressure: Need to complete this work by end of month for a company presentation in October
- The goal is to make the SDK documentation cleaner and more maintainable while preserving all historical information

The approach ensures that users always see the most current information first, but can still access older version details when needed through the changelog system.
