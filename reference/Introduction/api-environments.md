---
title: Environments
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
You can interact with the Yuno API using two environments: 

- Sandbox
- Production

These environments are also available on the Dashboard, enabling you to connect and test different connections without requiring you to add the real account data. 

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer alert\">\n    <div class=\"verticalLine verticalLineAlert\"></div>\n    <div>\n      <h3>Credentials</h3>\n      <div class=\"contentContainer\">\n        <p>\n\t\t\t\t\tThe credentials to use Yuno API in Sandbox are different from the Production credentials. Depending on the environment you select when accessing the Dashboard, you find diferent API keys and Account information.\n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


## Sandbox

This is a controlled development environment where you can conduct tests during implementation. When performing tests in Sandbox, they do not affect live data and accounting since the data used during the test mode is false.

The base URL used for the Yuno API running in the Sandbox environment is formatted as shown below:

```curl
https://api-sandbox.y.uno
```

## Production

This is the environment where real events occur, affecting accounting and metrics. This environment is consumed once the integration tests have finished, and it is time to open it to the public.

```curl
https://api.y.uno
```

[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer\">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <h3>Processing time</h3>\n      <div class=\"contentContainer\">\n        <p>\n\t\t\t\t\tThe processing time for each request varies depending on the processor/acquirer executing the transaction.\n\t\t\t\t</p>\n        <p>\n          The total processing time is the sum of Yuno's and the processor/acquirer's processing time.\n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]


[block:html]
{
  "html": "<body>\n  <div class=\"infoBlockContainer\">\n    <div class=\"verticalLine\"></div>\n    <div>\n      <h3>Timeout</h3>\n      <div class=\"contentContainer\">\n        <p>\n\t\t\t\t\tYuno uses a timeout value of 60 seconds for all endpoints. Therefore, the total time available for a request to be processed and answered by our APIs is 60 seconds.\n        </p>\n        <p>\n\t\t\t\t\tThe timeout value of 60 seconds is used to cover all cases from the processor/acquirer since their response time varies.\n        </p>\n        <p>\n          <b>Important</b>: The response time will usually be a fraction of the timeout.\n        </p>\n      </div>\n    </div>\n  </div>\n</body>"
}
[/block]