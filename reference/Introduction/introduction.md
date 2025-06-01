---
title: Introduction
excerpt: ''
deprecated: false
hidden: true
metadata:
  title: ''
  description: >-
    The Yuno API has been implemented around RESTful. Our API uses standard HTTP
    protocols where JSON payloads are returned in response to the HTTP requests.
    All operations can be performed via GET, POST and PATCH requests.
  robots: index
next:
  description: ''
---
The Yuno API has been implemented around RESTful. Our API uses standard HTTP protocols where JSON payloads are returned in response to the HTTP requests. All operations can be performed via GET, POST and PATCH requests.

## Environment

<hr />

You can interact with the Yuno API using the following environments: Sandbox and Production.

### Sandbox

This is a controlled development environment in which our users are able to carry out tests during the implementation. When performing tests in Sandbox, they do not have any effects on live data and accounting since the data used during the test mode is false.

The base URL used for the Yuno API running in the Sandbox environment is formatted as shown below:

```curl
https://api-sandbox.y.uno
```

### Production

This is the environment where real events occur, affecting accounting and metrics. This environment is consumed once the integration tests have finished and it is time to open it to the public.

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
          <br>
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