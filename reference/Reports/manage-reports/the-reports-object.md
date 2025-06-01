---
title: The Reports Object
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: The object representing a report.
  robots: index
next:
  description: ''
---
<HTMLBlock>{`
<div>
  <div class="yuno">
    <p><strong><code>id</code></strong> <small>string</small>
      <br/>The unique identifier of the report (MAX 64 ; MIN 36).
      <br/><small> Example: 5104911d-5df9-229e-8468-bd41abea1. </small>
    </p>	
  </div>
  
  <div class="yuno">
    <p><strong><code>type</code></strong> <small>enum</small>
      <br/>The type of the report to run (MAX 255; MIN 3).
      <br/><small> Possible enum values: <code>PAYOUTS</code>,<code>PAYMENTS</code>,<code>TRANSACTIONS</code> or <code>SETTLEMENTS</code>. </small>
    </p>	
  </div>
  
  <div class="yuno">
    <p><strong><code>start_date</code></strong> <small>timestamp</small>
      <br/>Starting timestamp of data to be included in the report run (MAX 24; MIN 24; <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>).
      <br/><small> Example: 2022-05-09T20:46:54.786Z. </small>
    </p>	
  </div>
  
  <div class="yuno">
    <p><strong><code>end_date</code></strong> <small>timestamp</small>
      <br/>Ending timestamp of data to be included in the report run (MAX 24; MIN 24; <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>).
      <br/><small> Example: 2022-05-09T20:46:54.786Z. </small>
    </p>	
  </div>

  <div class="yuno">
    <p><strong><code>merchant_reference_id</code></strong> <small>string</small>
      <br/>The unique identifier of the report at the merchant side (MAX 255; MIN 3).
      <br/><small> Example: Merchant_report_1234. </small>
</p>	
  </div>
  
  <div class="yuno">
    <p><strong><code>created_at</code></strong> <small>timestamp</small>
      <br/>Report creation date and time (MAX 27; MIN 27; <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>).
      <br/><small> Example: 2022-05-09T20:46:54.786342Z.  </small>
    </p>	
  </div>
  
  <div class="yuno">
    <p><strong><code>updated_at</code></strong> <small>timestamp</small>
      <br/>Report the last updated date and time (MAX 27; MIN 27; <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>).
      <br/><small> Example: 2022-05-09T20:46:54.786342Z.  </small>
</p>	
  </div>
  
  <div class="yuno">
    <p><strong><code>expires_at</code></strong> <small>timestamp</small>
      <br/>The time at which the file expires and is no longer available (MAX 27; MIN 27; <a href="https://en.wikipedia.org/wiki/ISO_8601">ISO 8601</a>).
      <br/><small> Example: 2022-05-09T20:46:54.786342Z.  </small>
    </p>	
  </div>
  
    <div class="yuno">
    <p><strong><code>status</code></strong> <small>enum</small>
      <br/>Report status (MAX 255; MIN 3).  
      <br/><small> Possible enum values: <code>IN_PROCESS</code>,<code>SUCCEEDED</code>, <code>DOWNLOADED</code>,<code>EXPIRED</code>, <code>FAILED</code> or <code>ERROR</code>. </small>
      </p>	
  </div>

<style>
  details {
    display: flex;
    overflow: hidden;
  }
    p {
      margin-left: 20px;
    }
    .yuno {
   	  --highlight: var(--yuno-card-background) ;
    	background: var(--yuno-card-background);
      margin: 1.5em;
      border-radius: 5px;
      border-left: 15px solid var(--yuno-purple);
      padding: 0.25em;
    }
</style>
`}</HTMLBlock>
