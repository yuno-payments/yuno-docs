---
title: Authentication
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: >-
    The Yuno API employs the ApiKey security schema to authenticate HTTP
    requests. These keys are access credentials composed of alphanumeric
    characters that authorize the use of specific features of our API.
  robots: index
next:
  description: ''
---
The Yuno API employs the ApiKey security schema to authenticate HTTP requests. These keys are access credentials composed of alphanumeric characters that authorize the use of specific features of our API. 

The requests need to include authorization headers such as `public-api-key`, `private-secret-key` and `X-idempotency-key`. You can find **your credentials**,  `public-api-key` and `private-secret-key`, in the *developers* section at the [Yuno Merchant Dashboard](https://auth.y.uno/u/login?state=hKFo2SB1dGdwd0VYZWxrOHpaLVdWck5FYWYtaW5GN0hhM25MNaFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIExidWxTMDRSNG5qYnZQQklTN3JtY0hyME5fZDBRa25xo2NpZNkgbGNIOEVyS3A3UUl2Tkx1Y0JUOXpEQlhrbXlaN25CSnc). On the other hand, the `X-idempotency-key` is composed of up to 64 characters. Check the [Idempotency](ref:authentication#idempotency) section for additional information. 

Please check the request description to get the specific authorization headers' required details.

The following code snippet shows an example of a request, including the authentication headers.  

```curl
curl --request <Method> \
     --url <URL> \
     --header 'X-Idempotency-Key: <Your X-Idempotency-Key>' \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --header 'private-secret-key: <Your private-secret-key>' \
     --header 'public-api-key: <Your public-api-key>'
```

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer alert">
    <div class="verticalLineAlert"></div>
    <div>
      <h3>Keep your keys safe</h3>
      <div class="contentContainer">
        <p>
					Do not share your secret API keys in public places like Github, Bitbucket, etc., because this opens space for malicious API calls.
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

## Idempotency

From a RESTful service perspective, idempotency is the ability to make multiple requests and always receive the same response. This functionality can be helpful when a request fails due to a communication fault and there isn’t a conclusive response. You can simply retry a request using the same idempotency key if there is a connection issue on a specific call. Our API ensures that the second call won't fail. 

It is essential for idempotency to pass a nonce to the required API request. Therefore, when making a request, the merchant must generate a unique identifier to be sent with the request as a header. This nonce can also be used to identify a specific transaction.

The `X-Idempotency-Key` of a transaction and the status returned for making that order are both stored by Yuno's idempotency system. To ensure that requests made within 24 hours of establishing the first order are not created twice, we save this data regardless of the outcome of this transaction (caught, authorized, or failed). As a result, responses to requests received with the same key will consist of a single transaction.

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer alert">
    <div class="verticalLineAlert"></div>
    <div>
      <h3>Requests with the same key and different contents in the body</h3>
      <div class="contentContainer">
        <p>
				It is crucial to stress that the API will only generate one request even if two requests are sent with the same key in the header and different contents in the body.
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

In some circumstances, it's possible that some requests are sent at the same time. As a result, it is possible that the application receives a second request before it responds to the first one. When this happens, the second request will be met with the 409 code - Conflict, indicating that there is an open call for the same `X-Idempotency-Key`.

The Yuno API behavior will not record the keys in cases of request fail for any reason, plus the API provides a type of error 400 informing there’s a problem with the request, allowing the merchant to fix the request and send it again. The same remains true for situations where any 500 error code is returned.
