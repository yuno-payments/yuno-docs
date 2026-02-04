---
title: Choose the right Integration for You
deprecated: false
hidden: false
metadata:
  robots: index
---
Within each platform's SDK, Yuno offers various **integration methods** allowing varying degrees of control over the UI and user experience.

The integration method you select affects the level of maintenance effort required, the ease of managing payment methods (which may range from no-code configuration in the Yuno Dashboard to hands-on developer work), and your compliance obligations, since some integration types require certifications such as **PCI-DSS** or **ISO**.

> 👍 Recommended Integration
>
> We recommend using Seamless mounting options for a smooth integration experience. This option provides a flexible payment solution with pre-built UI components and customization

## Integration Types

Below, you can see the specifications for each integration type.

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
      <th><a href="#full">Full</a></th>
      <th><a href="#seamless">Seamless</a></th>
      <th><a href="#lite">Lite</a></th>
      <th><a href="#secure-fields">Secure Fields</a></th>
      <th><a href="#headless">Headless</a></th>
      <th><a href="#direct-api">Direct API</a></th>
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
      <td><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#29d99a" viewBox="0 0 256 256">
          <path
            d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z">
          </path>
        </svg></td>
    </tr>
    <tr>
      <td>Creates Payment Seamlessly</td>
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

### Full

Our most comprehensive integration solution. It streamlines implementation, reduces maintenance and operational overhead, and removes the need to handle compliance, all while offering maximum flexibility.

* **User experience management**: Yuno manages the user experience while allowing you to customize the checkout to match your brand.
* **Payment method configuration**: Add and configure payment methods directly from the dashboard, with no extra coding.
* **Flexibility and simplicity**: Ideal for businesses that want full control over the experience without managing backend complexity.

### Seamless

A fast and efficient integration that combines API and SDK functionality to simplify payments:

* **Quick integration**: Requires minimal development effort while maintaining a great user experience.
* **Payment method management**: Users can manage their payment methods while Yuno handles the checkout flow.
* **Low maintenance**: Reduces integration and maintenance complexity, making it ideal for teams prioritizing simplicity.

### Lite

Provides full control over the checkout frontend while relying on Yuno for backend operations:

* **Backend support**: Yuno provides your backend with a list of available payment methods.
* **Frontend control**: You decide which methods to display and control the user interface.
* **Customization**: Ideal for businesses that want a customizable frontend while leveraging Yuno's backend capabilities.

### Understanding Payment and Enrollment in Lite

In the Lite integrations, Payment and Enrollment are handled as separate processes, offering flexibility and control:

**Payment Flow in Lite**: Lite provides a tailored Payment flow, allowing you to customize the user interface and experience. This gives developers full control over how payments are presented to users, from UI elements to integration details.

**Enrollment Flow in Lite**: Similarly, Lite also offers an independent Enrollment flow, enabling you to manage customer data storage and other aspects of the enrollment process separately from payments. This flexibility is ideal for applications where Payment and Enrollment need distinct handling.

By keeping these flows separate, Lite gives developers more granular control over both processes. This approach is best suited for developers who want to implement custom UI/UX and require more control over how each part of the process works.

**Full**: In contrast, Full integration combines both Payment and Enrollment into one seamless, automated flow, automatically handling payment methods, processing, and enrollment. This approach is more streamlined and suited for those seeking a comprehensive solution with minimal setup.

### Secure Fields

A secure and seamless checkout solution using prebuilt UI components (Web Only):

* **Secure data collection**: Simplifies the process of collecting and tokenizing payment card details.
* **PCI compliance**: Ensures a PCI-compliant experience while maintaining a customized UI.
* **Balanced solution**: Ideal for businesses looking for a balance between security and flexibility.

### Headless

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
* **Platform dependency**: Feature availability depends on the platform's capabilities.

Currently, Yuno supports plugin integration with [VTEX](doc:vtex).