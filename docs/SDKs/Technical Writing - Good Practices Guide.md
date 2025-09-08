# Technical Writing - Good Practices Guide

## **1\. Language Standards & Regional Considerations**

### **Primary Language Requirements**
* **Default Language**: Use **American English** throughout all documentation unless otherwise specified
* **Spelling**: U.S. spelling (e.g., "color", "center", "organization")
* **Grammar**: American English grammar conventions
* **Vocabulary**: American English word choices and terminology
* **Punctuation**: American English punctuation rules

---

## **2\. Structure & Organization**

### **Title Hierarchy**
* **h1**: Page Title (e.g., Secure Fields, API Reference)
* **h2**: Key Sections (e.g., Overview, Key Features, Implementation)
* **h3**: Steps or subtopics within sections (e.g., Step 1: Create a Customer)
* **h4**: Subsections if needed (e.g., Omit Customer Session Step)

### **Document Organization**
* **Table of Contents (TOC)**: Include at the top of long pages with direct links to sections
* **Section Order**: Maintain the original section order unless explicitly requested
* **Link Consistency**: Maintain original links without modification
* **Code Blocks**: Keep original code blocks unchanged, ensure proper formatting

---

## **3\. Writing & Style Consistency**

### **Core Writing Principles**
* **Technical Writer Expertise**: Write and review as an experienced technical writer familiar with best practices in technical documentation and marketing
* **Google Developer Style Guide**: Utilize the **Google Developer Style Guide** to ensure clear, concise, and user-focused content
* **Feature Emphasis**: Emphasize the **key features and benefits** of the software
* **User Guidance**: Guide users on **how to use the software effectively**
* **Quality Standards**: Ensure **technical accuracy** and **clarity** in the documentation
* **Language Clarity**: Use straightforward language, avoiding **jargon**, and include **step-by-step instructions** where needed

### **Tone & Clarity**
* **Tone**: Professional yet approachable, instructional and easy to follow
* **Clarity**: Use simple, clear, and concise language
* **Jargon**: Avoid unless necessary, provide explanations or glossary links
* **Examples**: "This page provides a step-by-step guide" instead of "On this page, you will find a detailed guide"

### **Capitalization Rules**
* **UI Components**: Capitalize names of UI components, platforms, and technologies
* **Concepts**: Use lowercase for general references (e.g., checkout session, payment method)
* **Titles**: Only capitalize the first word and proper names/brands
* **Consistency**: Always follow specified capitalization rules

### **Abbreviations & Acronyms**
* **First Mention**: Full term followed by abbreviation in parentheses
* **Subsequent Mentions**: Use full term without abbreviation
* **Example**: One-Time Token (OTT) first, then "One-Time Token"

---

## **4\. Formatting & Readability**

### **Lists & Bullet Points**
* **Unordered Lists**: Use dashes (-) for grouping related items or features
* **Ordered Lists**: Use numbered lists for sequential steps or instructions
* **Consistency**: Start each item with a capital letter, maintain consistent formatting

### **Text Formatting**
* **Bold**: Use for key features, core concepts, or important instructions only
* **Code**: Wrap code blocks in appropriate syntax (markdown, HTML, etc.)
* **Links**: Use descriptive, user-focused text (e.g., "View the full API documentation")
* **External Links**: Ensure they open in new tabs

### **Special Formatting**
* **Colons with Bold**: Place colon **outside** bold text
* **Example**: **Customer session**: Use customer sessions to enroll and store payment methods

---

## **5\. API Documentation Structure**

### **Frontmatter Configuration**
Use YAML frontmatter at the top of API documentation files to connect with JSON API definitions:

#### **Required Fields**
* `title`: The page title
* `excerpt`: Brief description (can be empty)
* `api.file`: Reference to JSON file containing API definition (e.g., `payments.json`)
* `api.operationId`: Specific operation ID to link to (e.g., `retrieve-payment-link`)
* `deprecated`: Boolean indicating if API is deprecated
* `hidden`: Boolean indicating if page should be hidden

#### **Example Frontmatter**
```yaml
---
title: Retrieve Payment Link
excerpt: ''
api:
  file: payments.json
  operationId: retrieve-payment-link
deprecated: false
hidden: false
metadata:
  title: ''
  description: >-
    This request enables you to retrieve details of a payment link based on its
    `id`, which needs to be provided in the request path.
  robots: index
next:
  description: ''
---
```

### **API Definition Connection**
* **Automatic Connection**: System pulls API definitions from JSON files based on `operationId`
* **No Manual Copying**: API definitions are automatically displayed
* **JSON Structure**: API definitions stored in structured JSON files with OpenAPI specifications

---

## **6\. Technical Accuracy & Clarity**

### **Content Quality**
* **Concept Explanations**: Ensure all technical terms, methods, and references are up-to-date
* **API Endpoints**: Double-check endpoints, parameters, and use cases
* **Code Examples**: Ensure all examples are functional and relevant
* **Method References**: Follow specified template formats for requests, responses, and details

### **API Documentation Best Practices**
* **Request/Response Examples**: Provide clear examples with proper formatting
* **Parameter Descriptions**: Include detailed parameter information and constraints
* **Use Cases**: Explain when and how to use each API endpoint
* **Error Handling**: Document common error scenarios and responses

---

## **7\. Cross-Linking & Navigation**

### **Internal Navigation**
* **Internal Links**: Ensure all internal links are correct and functional
* **Cross-Page References**: Connect related documentation sections
* **API Cross-References**: Link related API operations consistently
* **Navigation Flow**: Maintain logical progression between related topics

### **Link Best Practices**
* **Descriptive Text**: Use meaningful link text instead of "click here"
* **Context**: Provide context for where links will take users
* **Broken Link Prevention**: Regularly verify link functionality

---

## **8\. Version Control & Documentation Updates**

### **Change Management**
* **Version History**: Include version history section at the end of each page
* **Document Changes**: Track updates for new features and API changes
* **API Definition Updates**: Update JSON files when API specifications change
* **Change Logging**: Document what was added, changed, or removed

### **Maintenance Best Practices**
* **Regular Reviews**: Schedule periodic content reviews
* **Update Tracking**: Maintain change logs for all documentation
* **Consistency Checks**: Ensure updates maintain style guide compliance

---

## **9\. Consistency & Terminology Rules**

### **Naming Conventions**
* **Menu Sections**: "Menu Sections" or "Navigation Categories"
* **Individual Pages**: "Docs," "Articles," or "Guides"
* **Dashboard Sections**: Use distinct terms for UI elements
* **Subsections**: "Subsections" or "Content Sections"

### **Language Consistency**
* **Hyphen Usage**: Use spaces for pauses, hyphens only for compound words
* **Terminology**: Maintain consistent terms throughout documentation
* **Brand Names**: Follow proper capitalization and usage guidelines

---

## **10\. Efficiency & Automation**

### **Tools & Processes**
* **Spell Checking**: Use Grammarly or similar tools in VS Code
* **Content Gap Review**: Implement process to identify missing content
* **Automation**: Consider tools for repetitive documentation tasks
* **API Documentation**: Leverage automatic connection systems

### **Quality Assurance**
* **Review Process**: Implement systematic content review procedures
* **Placeholder Management**: Add placeholders for missing content
* **API Coverage**: Ensure all API operations have corresponding documentation

---

## **11\. Content Gap Review Process**

### **Implementation Steps**
* **Identify Missing Content**: Review existing documentation for gaps
* **Add Placeholders**: Create placeholders for missing articles/sections
* **Prioritize Content**: Determine which gaps to address first
* **API Coverage**: Ensure all API operations have proper documentation

### **Ongoing Maintenance**
* **Regular Audits**: Schedule periodic content reviews
* **User Feedback**: Incorporate user suggestions for missing content
* **Update Tracking**: Monitor content completion progress

---

## **12\. Detail in Instructions**

### **Instruction Quality**
* **Explicit Steps**: Provide detailed, step-by-step instructions
* **Button Names**: Use exact button names and UI element references
* **Expected Outcomes**: Clearly describe what users should expect
* **Avoid Ambiguity**: Eliminate vague references and unclear directions

### **API Documentation Specifics**
* **Request Format**: Show exact request structure and parameters
* **Response Examples**: Provide realistic response examples
* **Error Scenarios**: Document common error cases and solutions
* **Integration Steps**: Include step-by-step integration instructions

---

## **13\. Project-Specific Considerations**

### **Language Selection**
* **Default**: American English for most projects
* **Flagsmith Projects**: British English with casual tone
* **Other Brands**: Follow specific brand language requirements
* **Consistency**: Maintain chosen language throughout project

### **Brand Guidelines**
* **Tone**: Adjust tone to match brand personality
* **Terminology**: Use brand-specific terms and naming conventions
* **Examples**: Tailor examples to brand context
* **Visual Elements**: Follow brand visual guidelines when applicable

---

## **14\. Applying the Guide to New Projects**

### **Initial Setup**
1. **Review Requirements**: Understand project-specific language and style needs
2. **Choose Language**: Select appropriate English variant (American/British)
3. **Configure Structure**: Set up document organization and hierarchy
4. **Establish Standards**: Define project-specific terminology and conventions

### **Ongoing Implementation**
1. **Content Creation**: Follow established structure and formatting guidelines
2. **Quality Checks**: Regular review against style guide compliance
3. **Updates**: Maintain consistency when adding new content
4. **Feedback Integration**: Incorporate user and stakeholder feedback

### **Maintenance**
1. **Regular Reviews**: Schedule periodic style guide compliance checks
2. **Update Tracking**: Monitor and document style guide changes
3. **Team Training**: Ensure all team members understand and follow guidelines
4. **Continuous Improvement**: Refine guidelines based on project needs

---

## **15\. Checklist for New Documentation**

### **Pre-Writing**
- [ ] Determine language requirements (American/British English)
- [ ] Identify target audience and tone requirements
- [ ] Plan document structure and hierarchy
- [ ] Gather necessary technical information

### **Writing Process**
- [ ] Follow established title hierarchy
- [ ] Use appropriate language and spelling
- [ ] Include clear, descriptive headings
- [ ] Write concise, instructional content
- [ ] Add proper cross-links and references

### **API Documentation (if applicable)**
- [ ] Configure proper frontmatter
- [ ] Link to correct JSON API definition files
- [ ] Include request/response examples
- [ ] Document parameters and use cases
- [ ] Add error handling information

### **Post-Writing Review**
- [ ] Check spelling and grammar
- [ ] Verify all links are functional
- [ ] Ensure consistent formatting
- [ ] Review technical accuracy
- [ ] Test code examples (if applicable)
- [ ] Validate against style guide compliance

---

## **Conclusion**

This guide consolidates the best practices from both the Yuno and KISS Documentation Style Guides, providing a comprehensive reference for future technical writing projects. Adapt the guidelines based on specific project requirements while maintaining consistency within each project.

### **Key Takeaways**
* **Language Consistency**: Choose appropriate English variant and maintain throughout project
* **Structure Standards**: Follow established hierarchy and formatting guidelines
* **Quality Assurance**: Implement systematic review and compliance processes
* **Project Adaptation**: Customize guidelines for specific brand and project needs
* **Continuous Improvement**: Regularly review and update guidelines based on feedback and new requirements

### **Next Steps**
1. **Review this guide** against your current documentation practices
2. **Identify areas for improvement** based on the guidelines provided
3. **Implement changes gradually** to maintain consistency
4. **Train your team** on the key principles outlined here
5. **Regularly review and update** the guide based on project feedback



