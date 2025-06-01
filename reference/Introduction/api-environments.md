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

* Sandbox
* Production

These environments are also available on the Dashboard, enabling you to connect and test different connections without requiring you to add the real account data. 

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer alert">
    <div class="verticalLine verticalLineAlert"></div>
    <div>
      <h3>Credentials</h3>
      <div class="contentContainer">
        <p>
					The credentials to use Yuno API in Sandbox are different from the Production credentials. Depending on the environment you select when accessing the Dashboard, you find diferent API keys and Account information.
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

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

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <h3>Processing time</h3>
      <div class="contentContainer">
        <p>
					The processing time for each request varies depending on the processor/acquirer executing the transaction.
				</p>
        <p>
          The total processing time is the sum of Yuno's and the processor/acquirer's processing time.
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <h3>Timeout</h3>
      <div class="contentContainer">
        <p>
					Yuno uses a timeout value of 60 seconds for all endpoints. Therefore, the total time available for a request to be processed and answered by our APIs is 60 seconds.
        </p>
        <p>
					The timeout value of 60 seconds is used to cover all cases from the processor/acquirer since their response time varies.
        </p>
        <p>
          <b>Important</b>: The response time will usually be a fraction of the timeout.
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>
