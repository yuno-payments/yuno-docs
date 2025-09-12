# Yuno Documentation Style Guide

## **1\. Structure & Organization**

* **Title Structure**: Titles should follow the hierarchy and order established in the initial page provided. Do not alter the order of titles unless explicitly requested.  
  * **Example**: Use the following structure:  
    * **h1**: Page Title (e.g., Secure Fields)  
    * **h2**: Key Sections (e.g., Overview, Key Features, Payment Security)  
    * **h3**: Steps or subtopics within sections (e.g., Step 1: Create a Customer)  
    * **h4**: Subsections if needed (e.g., Omit Customer Session Step)  
* **Table of Contents (TOC)**: Include a table of contents at the top of long pages to break down the document into distinct sections with direct links. Place it right below the page title for quick access.  
* **Section Order**: Maintain the original section order unless explicitly stated otherwise (e.g., Overview → Key Features → Payment Security → Payment Workflow → Enroll a Credit Card While Paying → Support).  
* **Link Consistency**: Maintain the original links without modification and ensure they point to the correct locations.  
* **Code Blocks**: Keep original code blocks without changes. Make sure code is formatted correctly (e.g., markdown or HTML). Add placeholders or notes where code needs to be inserted if you're working with placeholder content.

---

## **2\. Writing & Style Consistency**

* **Clarity and Conciseness**: Use simple, clear, and concise language. Avoid jargon unless necessary, and provide explanations or links to glossary terms when using technical language.  
* **Tone**: Maintain a professional yet approachable tone. It should be instructional and easy to follow.  
  * **Example**: "This page provides a step-by-step guide" instead of "On this page, you will find a detailed guide."  
* **Capitalization**:  
  * Capitalize names of UI components, platforms, and technologies (e.g., Yuno Dashboard, Secure Fields SDK, One-Time Token).  
  * Use lowercase for concepts or general references (e.g., checkout session, payment method).  
  * About titles, only capitalize the first word, as well as proper names or brands.
  * Always follow the capitalization rules as specified.  
* **Spelling**: Use **U.S. spelling** throughout the documentation.  
* **Abbreviations**:  
  * First mention: Introduce abbreviations with the full term followed by the abbreviation in parentheses.  
  * Subsequent mentions: Use the full term without the abbreviation (e.g., One-Time Token (OTT) first, then "One-Time Token").

---

## **3\. Formatting & Readability**

* **Headings**: Ensure headings are clear and descriptive. Follow the hierarchy outlined in the Structure & Organization section.  
* **Bullet Points and Lists**:  
  * **Unordered Lists**: Use for grouping related items or features (e.g., use a dash (-) for bullets).  
  * **Ordered Lists**: Use for sequential steps (e.g., numbered lists for instructions).  
  * **Consistency**: Ensure consistency across lists (e.g., start each item with a capital letter).  
* **Bold Formatting**: Use bold for key features, core concepts, or important instructions only. **Do not** use bold for titles or general text.  
* **Images**: Let images be self-explanatory. Avoid phrases like "this image shows…" unless required for accessibility. Prefer short captions only when essential.  
* **Brevity for Incremental Updates**: Keep incremental feature updates brief. Use one or two sentences and link to deeper references if needed.  
* **Code Formatting**: Keep code formatting consistent with original format and instructions. Always wrap code blocks in the appropriate syntax (e.g., markdown or HTML).  
* **Links**: Use descriptive, user-focused link text (e.g., "View the full API documentation" instead of "click here"). Ensure external links open in a new tab.  
* **Colons and Bold Formatting**: When using bold for subtitles, place the colon **outside** the bold text.  
  * **Example**: **Customer session**: Use customer sessions to enroll and store a customer's payment methods.

---

## **4\. Technical Accuracy & Clarity**

* **Concept Explanations**: Ensure that all technical terms, methods, and references are up-to-date. Double-check API endpoints, parameters, and their use cases.  
* **Examples and Code**: Ensure all code examples are functional and relevant. Provide brief descriptions explaining each code example.  
* **Method References**: Follow the specified template format for method references to present requests, responses, and other details clearly.

---

## **5\. API Documentation Structure**

* **Frontmatter Configuration**: Use YAML frontmatter at the top of API documentation files to connect with JSON API definitions:
  * **Required Fields**:
    * `title`: The page title
    * `excerpt`: Brief description (can be empty)
    * `api.file`: Reference to the JSON file containing the API definition (e.g., `payments.json`)
    * `api.operationId`: The specific operation ID to link to (e.g., `retrieve-payment-link`)
    * `deprecated`: Boolean indicating if the API is deprecated
    * `hidden`: Boolean indicating if the page should be hidden
  * **Example Frontmatter**:
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
* **API Definition Connection**: The system automatically pulls API definitions from JSON files based on the `operationId` specified in the frontmatter. No manual API definition copying is required.
* **JSON File Structure**: API definitions are stored in structured JSON files (e.g., `payments.json`) containing OpenAPI specifications with paths, parameters, responses, and examples.

---

## **6\. Cross-Linking & Navigation**

* **Internal Links**: Ensure all internal links are correct and work as intended.  
* **Cross-Page References**: Use cross-links to connect related documentation sections (e.g., linking to "Create Payment" from "Payment Workflow").
* **API Cross-References**: When documenting related API operations, ensure consistent linking between related endpoints (e.g., payment links operations should cross-reference each other).

---

## **7\. Version Control & Documentation Updates**

* **Version History**: Include a version history section at the end of each page to track updates and changes (what was added, changed, or removed).  
* **Document Changes**: Ensure that documentation updates are carefully tracked, especially for new feature releases or changes to existing API endpoints.
* **API Definition Updates**: When API specifications change, update the corresponding JSON files rather than the Markdown documentation files.

---

## **8\. Consistency & Terminology Rules**

* **Consistent Terminology**: Ensure consistent naming conventions for all terms throughout the documentation:  
  * **Menu Sections**: Call them "Menu Sections" or "Navigation Categories."  
  * **Individual Pages**: Refer to pages as "Docs," "Articles," or "Guides."  
  * **Dashboard Sections**: Use distinct terms for UI elements, ensuring clarity.  
  * **Subsections**: Refer to subsections within pages as "Subsections" or "Content Sections," not just "sections."  
* **Hyphen Usage**: Use **spaces** in place of hyphens when a pause is intended (e.g., **keep in touch**). Hyphens should only be used for **compound words** (e.g., **self-esteem**).  
* **Abbreviations and Acronyms**: Introduce abbreviations with the full term followed by the abbreviation in parentheses the first time. Use the full term afterward without the abbreviation (e.g., One-Time Token (OTT) first, then "One-Time Token").

---

## **9\. Improving Efficiency and Automation**

* **Spell Checking Tools**: Use **Grammarly** or similar tools for spell-checking in **VS Code** or recommend other spell-checking solutions to ensure high-quality content.  
* **Review Process**: Implement a **content gap review process** to identify missing articles or sections. Ensure that missing or incomplete articles are flagged for future creation.  
* **Automating Repetitive Tasks**: Consider tools or automation to handle repetitive documentation tasks, such as converting content from **ReadMe** to **Ry Doc**.
* **API Documentation Automation**: Leverage the automatic API definition connection system to reduce manual copying and ensure consistency between JSON specifications and Markdown documentation.

---

## **10\. Content Gap Review Process**

* **Action**: Implement a review process that identifies **missing content**, such as missing articles or sections. Add **placeholders** for missing articles to ensure completeness and guide future content creation.
* **API Coverage**: Ensure all API operations defined in JSON files have corresponding documentation pages with proper frontmatter configuration.

---

## **11\. Detail in Instructions**

* **Action**: Ensure that instructions are **detailed** and **explicit** about actions, button names, and expected steps. Avoid vague references, and clearly outline each step to reduce ambiguity.
* **API Documentation**: Provide clear examples of request/response formats, parameter descriptions, and use cases for each API endpoint.

---

## **12\. Language and Regional Considerations**

* **Primary Language**: Use **U.S. English** as the default language for all documentation.
  * Grammar and spelling (e.g., "organisation" instead of "organization")
  * Vocabulary choices (e.g., "whilst" instead of "while")
  * Wording and phrasing
  * Maintain a casual, approachable tone appropriate for the Flagsmith brand

---

### **Applying the Guide to Future Pages**

1. **Review the content** provided and ensure it follows the outlined structure and organization.  
2. **Maintain consistency** with the original sections, titles, and links.  
3. **Format** using the prescribed bullet points, lists, and headings.  
4. **Check all technical references**, code snippets, and instructions for accuracy and clarity.  
5. **Cross-link relevant pages** as needed to maintain a seamless user experience across the documentation.
6. **Configure frontmatter** properly for API documentation to ensure automatic connection with JSON API definitions.
7. **Consider language requirements** Always use American English.


