---
title: Choose the Right Integration for You
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: Choose The Right Integration For You
  description: >-
    This page covers why choosing the proper integration is important, the
    relevant factors you need to consider, and the pros and cons of each
    alternative.
  robots: index
next:
  description: ''
  pages:
    - type: basic
      slug: build-your-integration
      title: Step by Step Integration Process
---
This page explains the importance of choosing the right integration, the factors to consider, and the pros and cons of each option.

## Why choosing the right integration matters

The integration method you select affects multiple aspects of your business, including:

1. **Integration and maintenance effort**: The integration type impacts development time and the ongoing maintenance required.

2. **Effort to add and manage payment methods**: Some integrations allow you to manage payment methods directly from the Yuno dashboard with no coding required, while others may require developer intervention.

3. **Compliance requirements**: Certain integrations require certifications like PCI-DSS or ISO compliance. If you choose one of these methods, you must provide the necessary certifications to Yuno.

## Integration Types

Yuno provides 6 types of integrations. Below, you can see the specifications for each of them.

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
      <th><a href="#full-sdk">Full SDK</a></th>
      <th><a href="#seamless-sdk">Seamless SDK</a></th>
      <th><a href="#lite-sdk">Lite SDK</a></th>
      <th><a href="#secure-fields-sdk">Secure Fields</a></th>
      <th><a href="#headless-sdk">Headless SDK</a></th>
      <th><a href="#direct-api">Direct</a></th>
      <th><a href="#plugins">Plugins</a></th>
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
      <td><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#29d99a" viewBox="0 0 256 256">
          <path
            d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z">
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
      <td><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#29d99a" viewBox="0 0 256 256">
          <path
            d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z">
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
      <td><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#29d99a" viewBox="0 0 256 256">
          <path
            d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z">
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

### Full SDK

The **Full SDK** is Yuno’s most comprehensive integration solution. It streamlines implementation, reduces maintenance and operational overhead, and removes the need to handle compliance, all while offering maximum flexibility. With the Full SDK, you can:

* **User experience management**: Yuno manages the user experience while allowing you to customize the checkout to match your brand.
* **Payment method configuration**: Add and configure payment methods directly from the dashboard, with no extra coding.
* **Flexibility and simplicity**: Ideal for businesses that want full control over the experience without managing backend complexity.

### Seamless SDK

A fast and efficient integration that combines API and SDK functionality to simplify payments:

* **Quick integration**: Requires minimal development effort while maintaining a great user experience.
* **Payment method management**: Users can manage their payment methods while Yuno handles the checkout flow.
* **Low maintenance**: Reduces integration and maintenance complexity, making it ideal for teams prioritizing simplicity.

### Lite SDK

Provides full control over the checkout frontend while relying on Yuno for backend operations:

* **Backend support**: Yuno provides your backend with a list of available payment methods.
* **Frontend control**: You decide which methods to display and control the user interface.
* **Customization**: Ideal for businesses that want a customizable frontend while leveraging Yuno’s backend capabilities.

### Understanding Payment and Enrollment in the Lite SDK

In the Lite SDK, Payment and Enrollment are handled as separate processes, offering flexibility and control:

**Payment Flow in Lite SDK**: The Lite SDK provides a tailored Payment flow, allowing you to customize the user interface and experience. This gives developers full control over how payments are presented to users, from UI elements to integration details.

**Enrollment Flow in Lite SDK**: Similarly, the Lite SDK also offers an independent Enrollment flow, enabling you to manage customer data storage and other aspects of the enrollment process separately from payments. This flexibility is ideal for applications where Payment and Enrollment need distinct handling.

By keeping these flows separate, the Lite SDK gives developers more granular control over both processes. This approach is best suited for developers who want to implement custom UI/UX and require more control over how each part of the process works.

**Full SDK**: In contrast, the Full SDK combines both Payment and Enrollment into one seamless, automated flow, automatically handling payment methods, processing, and enrollment. This approach is more streamlined and suited for those seeking a comprehensive solution with minimal setup.

### Secure Fields SDK

A secure and seamless checkout solution using prebuilt UI components for Web, Android, and iOS:

* **Secure data collection**: Simplifies the process of collecting and tokenizing payment card details.
* **PCI compliance**: Ensures a PCI-compliant experience while maintaining a customized UI.
* **Balanced solution**: Ideal for businesses looking for a balance between security and flexibility.

### Headless SDK

Designed for merchants that need complete control over the checkout experience:

* **Custom data capture**: You capture card data on your frontend and send it to Yuno for tokenization.
* **Tokenization process**: Yuno returns a token that you store and use for payment processing.
* **No PCI compliance needed**: Since card data never touches your server, PCI compliance is not required.
* **Full customization**: Ideal for businesses that want custom UX/UI without compliance burdens.

### Direct API

Yuno recommends using SDKs over **Direct API** due to the additional complexity involved:

* **Manual compliance management**: Unlike SDKs, **Direct API** requires merchants to manage compliance, fraud prevention, 3DS, and payment provider-specific requirements manually.
* **Custom API integration**: Merchants can connect directly to Yuno's APIs to process payments if they have custom implementation needs.
* **PCI certification required**: Businesses must provide an Attestation of Compliance (AOC) before integration.
* **Access to Yuno API**: While some features are unavailable with this method, you still gain access to Yuno's standardized API, supporting hundreds of payment methods.

### Plugins

Plugins offer the fastest and easiest integration with just a few clicks and basic configuration:

* **Ease of implementation**: Quick setup with minimal development effort.
* **Platform dependency**: Feature availability depends on the platform’s capabilities.

Currently, Yuno supports plugin integration with [VTEX](doc:vtex).