---
title: The Webhook Object
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
This object represents a webhook subscription that has been registered to your `account_id`. 

<HTMLBlock>{`
<div>
  <div class="yuno">
    <p><strong>id</strong> <small>string</small>
      <br/>The unique identifier of the webhook (MAX 64; MIN 36).
      <br/><small> Example: 5104911d-5df9-229e-8468-bd41abea1. </small>
    </p>	
  </div>
  
  <div class="yuno">
    <p><strong>name</strong> <small>string</small>
      <br/>The webhook name (MAX 255; MIN 1).
      <br/><small> Example: webhook_1 </small>
    </p>	
  </div>
  
  <div class="yuno">
    <p><strong>description</strong> <small>string</small>
      <br/>The webhook description (MAX 255; MIN 1).
      <br/><small> Example: 2022-05-09T20:46:54.786Z. </small>
    </p>	
  </div>
  
  <div class="yuno">
    <p><strong>status</strong> <small>enum</small>
      <br/>The webhook endpoint status.
      <br/><small> Possible enum values: <code>ENABLED</code> or <code>DISABLED</code> </small>
    </p>	
  </div>

  <div class="yuno">
    <p><strong>type</strong> <small>list</small>
      <br/>The type of webhook. Could be one, a list of many or “ALL”. If null, then ALL (to subscribe to all events, send only an ALL string) (MAX 64; MIN 5).
      <br/><small> Example: payment </small>
</p>	
  </div>
  
  <div class="yuno">
    <p><strong>type_event</strong> <small>list</small>
      <br/>The subtype of webhook. To subscribe to all events.actions, send only an ALL string. If null, then ALL (MAX 64; MIN 5).
      <br/><small> Example: payment.purchase  </small>
    </p>	
  </div>
  
  <div class="yuno">
    <p><strong>url</strong> <small>string</small>
      <br/>The webhook endpoint URL (MAX 255; MIN 36).
      <br/><small> Example: http://merchant-host.com/callback  </small>
</p>	
  </div>
  
  <div class="yuno">
    <p><strong>account_id</strong> <small>enum</small>
      <br/>The unique identifier of the account (MAX 64; MIN 36).
      <br/><small> Example: 525278  </small>
    </p>	
  </div>
  
    <div class="yuno">
    <p><strong>retries</strong> <small>int</small>
      <br/>The number of times the webhook was sent (MAX 7; MIN 1).  
      <br/><small> Example: 3 </small>
      </p>	
  </div>
  
  <div class="yuno">
    <p><strong>version</strong> <small>int</small>
      <br/>The version of the webhook received. Today by default will be 2. Not available to define by customer.   
      <br/><small> Example: 2 </small>
      </p>	
  </div>
  
<details class="yuno">
    <summary><strong>headers</strong> <small>object</small>
      <br/><p>Specifies the headers that we will send in the webhook. </p>
    </summary>
    <div>
      <p><strong>key_name</strong> <small>string</small>
        <br/>Merchants public API Key to receive Webhooks. 
        <br/><small>   </small>  </p>
      <p><strong>key_value</strong> <small>string</small>
        <br/>Merchant’s Secret Key to receive webhooks. 
        <br/><small> Example: Basic bG9sOnNlY3VyZQ==  </small> </p>
    </div>
  </details>
  <div class="yuno">
    <p><strong>created_at</strong> <small>timestamp</small>
      <br/>The Webhook creation date (<a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>; MAX 27; MIN 27).   
      <br/><small> Example: 2022-05-09T20:46:54.786342Z </small>
      </p>	
  </div>
  <div class="yuno">
    <p><strong>updated_at</strong> <small>timestamp</small>
      <br/>The Webhook update date (<a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>; MAX 27; MIN 27).   
      <br/><small> Example: 2022-05-09T20:46:54.786342Z </small>
      </p>	
  </div>
</body>
<style>
  :root {
    --yuno-main-color: #614AD6;
    --yellow: #CEE65A;
  }
  details {
    display: flex;
    overflow: hidden;
  }
    p {
      margin-left: 20px;
    }
    .yuno {
   	  --highlight: var(#eee) ;
    	background: #eee;
      margin: 1.5em;
      border-radius: 5px;
      border-left: 15px solid var(--yuno-main-color);
      padding: 0.25em;
    }
</style>
`}</HTMLBlock>
