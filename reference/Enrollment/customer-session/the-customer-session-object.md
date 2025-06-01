---
title: The Customer Session Object
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: >-
    The object representing a customer session that can be created in order to
    enroll a customer's payment methods.
  robots: index
next:
  description: ''
---
## Attributes

This object represents a customer session that can be created in order to enroll a customer's payment methods. 

[block:html]
{
  "html": "<div>\n  <div class=\"yuno\">\n    <p><strong><code>customer_session</code></strong> <small>string</small>\n      <br/>The customer session that has been created for the enrollment (MAX 64; MIN 36).\n  \t  <br/><small>  Example: fe50d39a-5a1c-11ed-9b6a-0242ac120002  </small>\n    </p>\t\n  </div>\n  \n  <div class=\"yuno\">\n    <p><strong><code>customer_id</code></strong> <small>string</small>\n      <br/>The unique identifier of the customer (MAX 64; MIN 36).\n   \t  <br/><small>  Example: 3956053c-5a1d-11ed-9b6a-0242ac120002  </small>\n    </p>\t\n  </div>\n  \n  <div class=\"yuno\">\n    <p><strong><code>country</code></strong> <small>enum</small>\n      <br/>The customer's country (MAX 2; MIN 2;  <a href=\"country-reference\">ISO 3166-1</a>).    \n      <br/><small> Possible enum values: Check the  <a href=\"country-reference\">Country reference</a>.</small>\n    </p>\t\n  </div>\n  \n  <div class=\"yuno\">\n    <p><strong><code>callback_url</code></strong> <small>string</small>\n      <br/>The URL to redirect your customer after the enrollment is made in the provider´s environment (MAX 526; MIN 3).    \n   \t  <br/><small>  Example: www.your-url.com  </small>\n    </p>\t\n  </div>\n\n  <div class=\"yuno\">\n    <p><strong><code>created_at</code></strong> <small>timestamp</small>\n      <br/>Customer Session creation date and time (MAX 27; MIN 27; <a href=\"https://en.wikipedia.org/wiki/ISO_8601\">ISO 8601</a>).\n      <br/><small> Example: 2022-05-09T20:46:54.786342Z  </small>\n    </p>\t\n  </div>\n</div>\n\n<style>\n  :root {\n    --yuno-main-color: #614AD6;\n    --yellow: #CEE65A;\n  }\n  details {\n    display: flex;\n    overflow: hidden;\n  }\n  p {\n    margin-left: 20px;\n  }\n  .yuno {\n    --highlight: var(#eee);\n    background: #eee;\n    margin: 1.5em;\n    border-radius: 5px;\n    border-left: 15px solid var(--yuno-main-color);\n    padding: 0.25em;\n  }\n</style>\n"
}
[/block]