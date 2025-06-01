---
title: Choose The Right Integration For You (Working to add Headless)
excerpt: ''
deprecated: false
hidden: true
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
This section will cover why choosing the proper integration is important, the relevant factors you need to consider, and the pros and cons of each alternative.

## Why is choosing the right integration important?

The type of integration you choose is important because it is going to impact your business in several aspects:

1. **Integration and maintenance effort**: The type of integration defines the time you are going to take to build the integration and also the level of maintenance you will need to give it.
2. **The effort to add and manage payment methods**: depending on the integration you implement, the effort to add or manage payment methods will vary. Our most complete solution allows you to add and manage payment methods from our dashboard with no code. However, other implementations could need some work from your development team.
3. **Compliance requirements**: some implementations require a level of compliance, like PCI-DSS certifications or ISO certifications, to work. In order to use these integrations, you will need to provide these certifications to Yuno.

## Types of integration

Yuno provides 6 types of integrations. Below, you can see the all the specifications for each of them.

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
</style>
`}</HTMLBlock>

<HTMLBlock>{`
 <table>
    <thead>
      <tr>
        <th>Feature</th>
        <th>SDK Full</th>
        <th>SDK Lite</th>
        <th>Secure fields</th>
        <th>Headless SDK</th>
        <th>Direct</th>
        <th>Plugins</th>
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
    </tbody>
  </table>
`}</HTMLBlock>

### Full SDK

This alternative is the most complete solution that Yuno provides. Using our Full SDK, you can integrate Yuno, minimizing integration, maintenance, and operational efforts without any need for compliance.

With the Full SDK, Yuno handles the user experience and allows you to customize the checkout and payment methods you are showing to your users from our dashboard. This gives you a lot of flexibility and reduces the need to write more code in the future when you add new payment methods and features to your payment stack.

### Lite SDK

With the Lite SDK implementation, you have full control of your checkout frontend. Yuno will provide your backend with all the available payment methods you can offer to your clients. With this information, you can decide which payment methods to show in your checkout.

### Secure Fields

Secure Fields creates a seamless and secure checkout flow on your website or app. With a set of prebuilt UI components available for Web, Android, and iOS, Secure Fields simplifies the process of collecting and tokenizing sensitive payment card details. 

### Headless SDK

Headless SDK was designed for merchants who want complete control over the checkout UX and UI. When using the Headless SDK solution, you capture card data in your frontend and send it directly to Yuno. Yuno returns a token you can store on your server and use to create payments. As a result, you have control over the forms used to acquire card data, and you don't need to be PCI-compliant, as the card information will never reach your server.

### Direct Flow

Besides our SDK integrations, we allow merchants to connect directly to Yuno's APIs to process payments in case you have specific requirements that need to be addressed with a back-to-implementation. Your company must be PCI-certified to use our server-to-server card payments service, and we will require you to forward your AOC certification to your account manager before beginning the implementation.

Although our main features are not available in this type of integration, you still have access to our standardized API, which allows you to handle hundreds of payment methods and tools with just one API.

### Plugins

The most important benefit of plugin integrations is the ease of implementation. With just a few clicks and configuration, you can have our solution. The most evident disadvantage is that the availability of Yuno's features depends on the platform, and some features may not be available.

Currently, we support a plugin integration with the VTEX platform.

<HTMLBlock>{`
<style>
  table tr td:not(:first-child){
    text-align: center !important;
  }
  table tr th:not(:first-child){
    text-align: center !important;
  }
<style>
`}</HTMLBlock>
