---
title: New - Choose the Right Integration for You
deprecated: false
hidden: true
metadata:
  robots: index
---
This page explains the importance of choosing the right integration, the factors to consider, and the pros and cons of each option.

## Why choosing the right integration matters

The integration method you select affects multiple aspects of your business, including:

1. **Integration and maintenance effort**: Optimize development time and ongoing maintenance.

2. **Effort to add and manage payment methods**: Some integrations allow you to manage payment methods directly from the Yuno dashboard with no coding, while others may require developer intervention.

3. **Compliance requirements**: Certain integrations require certifications like PCI-DSS or ISO compliance. If you choose one of these methods, you must provide the necessary certifications to Yuno.

## Integration Types

Yuno provides multiple integration options. Below, you can see the specifications for each of them.

<HTMLBlock>{`
<style>  
  thead th {
    background-color: #FCFCFF !important;
    border-color: #ECEFF2 !important;
    color: #282A30 !important;
    font-weight: 400 !important;
    border-width: 1px !important;
    border: none !important; 
    
  }
  
  table tr td {
    background-color: #FFFFFF !important;
    border-color: #ECEFF2 !important;
    color: #282A30 !important;
    font-weight: 400 !important;
    border-width: 1px !important;
    border: none !important; 
  }
  
  thead tr {
    border: 1px solid #ECEFF2 !important;
  }
  
  thead tr,
  tbody tr{
    height: 48px;
  }
  
  table {
    border-collapse: collapse !important; /* This ensures no spacing between table cells */
    border-color: #ECEFF2 !important;
    border-width: 1px !important;
  }
  
  table tr td:not(:first-child){
    text-align: center !important;
  }
  table tr th:not(:first-child){
    text-align: center !important;
  }
</style>
`}</HTMLBlock>

<HTMLBlock>{`
<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th><a href="#yuno-sdk">Yuno SDK</a></th>
      <th><a href="#secure-fields">Secure Fields</a></th>
      <th><a href="#headless-integration">Headless Integration</a></th>
      <th><a href="#direct-api">Direct API</a></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Add new payment methods without code</td>
      <td><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#29d99a" viewBox="0 0 256 256">
          <path
            d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z">
          </path>
        </svg></td>
      <td><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#f13f5e" viewBox="0 0 256 256">
          <path
            d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm37.66,130.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32L139.31,128Z">
          </path>
        </svg></td>
      <td><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#f13f5e" viewBox="0 0 256 256">
          <path
            d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm37.66,130.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32L139.31,128Z">
          </path>
        </svg></td>
      <td><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#f13f5e" viewBox="0 0 256 256">
          <path
            d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm37.66,130.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32L139.31,128Z">
          </path>
        </svg></td>
    </tr>
    <tr>
      <td>Handle hundreds of payment methods with a single API</td>
      <td><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#29d99a" viewBox="0 0 256 256">
          <path
            d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z">
          </path>
        </svg></td>
      <td><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#29d99a" viewBox="0 0 256 256">
          <path
            d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z">
          </path>
        </svg></td>
      <td><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#29d99a" viewBox="0 0 256 256">
          <path
            d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z">
          </path>
        </svg></td>
      <td><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#29d99a" viewBox="0 0 256 256">
          <path
            d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z">
          </path>
        </svg></td>
    </tr>
    <tr>
      <td>Tokenize cards and payment methods without code</td>
      <td><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#29d99a" viewBox="0 0 256 256">
          <path
            d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z">
          </path>
        </svg></td>
      <td><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#29d99a" viewBox="0 0 256 256">
          <path
            d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z">
          </path>
        </svg></td>
      <td><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#29d99a" viewBox="0 0 256 256">
          <path
            d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z">
          </path>
        </svg></td>
      <td><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#f13f5e" viewBox="0 0 256 256">
          <path
            d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm37.66,130.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32L139.31,128Z">
          </path>
        </svg></td>
    </tr>
    <tr>
      <td>Use Yuno's PCI-DSS Certification</td>
      <td><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#29d99a" viewBox="0 0 256 256">
          <path
            d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z">
          </path>
        </svg></td>
      <td><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#29d99a" viewBox="0 0 256 256">
          <path
            d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z">
          </path>
        </svg></td>
      <td><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#29d99a" viewBox="0 0 256 256">
          <path
            d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z">
          </path>
        </svg></td>
      <td><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#f13f5e" viewBox="0 0 256 256">
          <path
            d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm37.66,130.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32L139.31,128Z">
          </path>
        </svg></td>
    </tr>
    <tr>
      <td>Use 3D Secure</td>
      <td><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#29d99a" viewBox="0 0 256 256">
          <path
            d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z">
          </path>
        </svg></td>
      <td><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#29d99a" viewBox="0 0 256 256">
          <path
            d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z">
          </path>
        </svg></td>
      <td><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#29d99a" viewBox="0 0 256 256">
          <path
            d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z">
          </path>
        </svg></td>
      <td><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#29d99a" viewBox="0 0 256 256">
          <path
            d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z">
          </path>
        </svg></td>
    </tr>
    <tr>
      <td>Use an antifraud solution without code</td>
      <td><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#29d99a" viewBox="0 0 256 256">
          <path
            d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z">
          </path>
        </svg></td>
      <td><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#29d99a" viewBox="0 0 256 256">
          <path
            d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z">
          </path>
        </svg></td>
      <td><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#29d99a" viewBox="0 0 256 256">
          <path
            d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z">
          </path>
        </svg></td>
      <td><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#29d99a" viewBox="0 0 256 256">
          <path
            d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z">
          </path>
        </svg></td>
    </tr>
    <tr>
      <td>Set checkout conditions using our dashboard</td>
      <td><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#29d99a" viewBox="0 0 256 256">
          <path
            d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z">
          </path>
        </svg></td>
      <td><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#f13f5e" viewBox="0 0 256 256">
          <path
            d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm37.66,130.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32L139.31,128Z">
          </path>
        </svg></td>
      <td><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#f13f5e" viewBox="0 0 256 256">
          <path
            d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm37.66,130.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32L139.31,128Z">
          </path>
        </svg></td>
      <td><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#f13f5e" viewBox="0 0 256 256">
          <path
            d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm37.66,130.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32L139.31,128Z">
          </path>
        </svg></td>
    </tr>
    <tr>
      <td>Customize the look and feel of your checkout using our dashboard</td>
      <td><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#29d99a" viewBox="0 0 256 256">
          <path
            d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z">
          </path>
        </svg></td>
      <td><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#f13f5e" viewBox="0 0 256 256">
          <path
            d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm37.66,130.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32L139.31,128Z">
          </path>
        </svg></td>
      <td><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#f13f5e" viewBox="0 0 256 256">
          <path
            d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm37.66,130.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32L139.31,128Z">
          </path>
        </svg></td>
      <td><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#f13f5e" viewBox="0 0 256 256">
          <path
            d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm37.66,130.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32L139.31,128Z">
          </path>
        </svg></td>
    </tr>
  </tbody>
</table>
`}</HTMLBlock>

## Integration options

### Yuno SDK

The Yuno SDK is our recommended integration method, providing a complete payment solution with minimal development effort:

* **Pre-built UI components**: Ready-to-use payment forms and flows that work out of the box
* **Multiple mounting options**: Choose how payment methods are displayed based on your UX needs
* **Dashboard control**: Add or remove payment methods without code changes
* **Built-in security**: PCI-DSS compliance, 3DS authentication, and fraud prevention included
* **Easy maintenance**: Updates and new features deployed automatically

**Available for:** Web, iOS, Android

**[Learn more about SDK Integration →](doc:new-sdk-integration-overview)**

### Secure Fields (Web only)

A secure checkout solution using prebuilt secure iframe fields for collecting card information:

* **Custom card forms**: Build your own payment form UI while Yuno provides secure fields for sensitive data
* **Secure data collection**: Simplifies the process of collecting and tokenizing payment card details
* **PCI compliance**: Ensures a PCI-compliant experience while maintaining a customized UI
* **Balanced solution**: Ideal for businesses looking for a balance between custom design and security

**Available for:** Web only

**[Learn more about Secure Fields →](doc:secure-fields-payment)**

### Headless Integration

An advanced integration pattern for merchants that need complete control over the checkout experience:

* **Complete UI control**: You build your entire checkout UI - Yuno handles tokenization only
* **Custom data capture**: You capture payment data in your custom forms and send it to Yuno for secure tokenization
* **Tokenization process**: Yuno returns a token that you use for payment processing via API
* **Full customization**: Ideal for businesses with specific UX/UI requirements and development resources

**Available for:** Web, iOS, Android

**[Learn more about Headless Integration →](doc:headless-integration-pattern)**

### Direct API

Yuno recommends using the SDK over **Direct API** due to the additional complexity involved:

* **Manual compliance management**: Unlike the SDK, **Direct API** requires merchants to manage compliance, fraud prevention, 3DS, and payment provider-specific requirements manually
* **Custom API integration**: Merchants can connect directly to Yuno's APIs to process payments if they have custom implementation needs
* **PCI certification required**: Businesses must provide an Attestation of Compliance (AOC) before integration
* **Access to Yuno API**: While some features are unavailable with this method, you still gain access to Yuno's standardized API, supporting hundreds of payment methods

**[Learn more about Direct API →](doc:direct-flow)**

> 💡 **Using VTEX?**  
> Yuno offers a VTEX plugin for quick integration. [Learn more →](doc:vtex)

## Quick Comparison Guide

### Choose Yuno SDK when:

* You want pre-built, secure UI components
* You need to add payment methods without code changes
* You want dashboard control over checkout configuration
* You need PCI compliance without certification burden

### Choose Secure Fields when:

* You're building for Web only
* You want custom card form design with secure fields
* You need a middle ground between full SDK and headless

### Choose Headless Integration when:

* You need complete control over every UI element
* You're building a highly custom checkout experience
* You have development resources for custom UI

### Choose Direct API when:

* You have specific backend requirements SDKs can't meet
* You have PCI-DSS compliance certification
* You can manage fraud prevention and 3DS manually

## Next Steps

1. **Review SDK options**: Learn about [SDK integration patterns](doc:build-your-integration)
2. **Choose your platform**: Select [Web Flow](doc:web-sdk-integrations), [iOS Flow](doc:ios-sdk-integrations), or [Android Flow](doc:android-sdk-integrations)
3. **Get started**: Follow platform-specific implementation guides
