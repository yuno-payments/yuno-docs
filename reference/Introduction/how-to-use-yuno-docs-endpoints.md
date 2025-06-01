---
title: How to use Yuno Docs Endpoints (depricated)
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
Yuno Docs is built with Readme.io, providing all the needed information to use Yuno API. In addition, in the [API Reference](ref:introduction), you can also perform requests to understand and test Yuno API directly through your browser.

On the left panels of API Reference, all sections with  HTTP verb tags provide code examples and the option to perform requests:

[block:image]
{
  "images": [
    {
      "image": [
        "https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/getStarted/howToUseYunoDocs/how_to_docs1.png",
        null,
        ""
      ],
      "align": "center",
      "sizing": "250px"
    }
  ]
}
[/block]

Here we are going to use the [Create Customer](ref:create-customer) case to explore the available information and operations you can perform directly with Yuno Docs.

## Page overview

Accessing the [Create Customer](ref:create-customer) page or another page with an HTTP verb tag, you will see:

1. A description with relevant information about the request and your request history. All tests performed are listed in the **Your Request History** area, where you can view requests for up to 30 days.
2. Parameter fields to edit your request data accompanied by a brief description. By entering data into these fields, Yuno Docs automatically generate the request code for you. The generated code is shown on the code block shown in 6.
3. Response list with possible responses for the request and its response body description.
4. Available languages to generate the request code.
5. API credentials fields. You must provide your credentials here to successfully test your requests to the Yuno API.
6. Testing request area with requests and responses code examples. It presents the Request card on top and the Response Card on the bottom. The generated code by entering data into the parameter fields is provided here.

[block:image]
{
  "images": [
    {
      "image": [
        "https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/getStarted/howToUseYunoDocs/how_to_docs2.png",
        null,
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]

### Selecting the programming language

Yuno Docs provides a complete list of programming languages to automatically generate the request code example. Selecting the desired language provides the requested code and code to install necessary libraries.

[block:image]
{
  "images": [
    {
      "image": [
        "https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/getStarted/howToUseYunoDocs/how_to_docs3.png",
        null,
        ""
      ],
      "align": "center",
      "sizing": "500px"
    }
  ]
}
[/block]

### Code examples

You can access Yuno Docs code examples for requests and responses. Clicking on **Examples** will pop up a list of options to select. After selecting the desired one, the request or response code will be replaced on the respective card.

[block:image]
{
  "images": [
    {
      "image": [
        "https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/getStarted/howToUseYunoDocs/how_to_docs4.png",
        null,
        ""
      ],
      "align": "center",
      "sizing": "400px"
    }
  ]
}
[/block]

[block:image]
{
  "images": [
    {
      "image": [
        "https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/getStarted/howToUseYunoDocs/how_to_docs5.png",
        null,
        ""
      ],
      "align": "center",
      "sizing": "400px"
    }
  ]
}
[/block]

### Testing requests

After entering the request data through the parameter fields or loading an example and providing your credentials, you can test your request. By clicking on **Try It!**, Yuno Docs sends your request using code inside the **Request Card**. In addition, you can copy the request code using the copy button on the left bottom of the **Request Card**.

[block:image]
{
  "images": [
    {
      "image": [
        "https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/getStarted/howToUseYunoDocs/how_to_docs6.png",
        null,
        ""
      ],
      "align": "center",
      "sizing": "400px"
    }
  ]
}
[/block]

Yuno Docs will present the response on the **Response Card**, just below the Request Card, containing the status code and body data received.

[block:image]
{
  "images": [
    {
      "image": [
        "https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/getStarted/howToUseYunoDocs/how_to_docs7.png",
        null,
        ""
      ],
      "align": "center",
      "sizing": "400px"
    }
  ]
}
[/block]

You can copy the response body using the copy button on the left bottom of the **Response Card**.