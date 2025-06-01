---
title: Initiate Recovery Outreach for Abandoned User Flows
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
This API allows merchants to notify Yuno's Recovery Agent when a user abandons their purchase flow, such as during product selection or after initiating checkout, before completing a payment. The submitted data enables Yuno to follow up with the user via call or WhatsApp to encourage completion of the transaction.

* **Endpoint**: `https://prod.y.uno/ai-caller-ms/recovery-payment/external`  
* **Method**: `POST`  
* **Content-Type**: `application/json`

## Request body

```json
{
  "customer": {
    "full_name": "Jane Doe",
    "phone_number": "+573001234567",
    "email": "jane.doe@example.com",
    "country_code": "CO",
    "language": "es"
  },
  "session": {
    "abandonment_timestamp": "2025-05-13T22:45:00Z",
    "flow_stage": "checkout",
    "platform": "web",
    "session_id": "sess_abc123xyz"
  },
  "cart": {
    "total_value": 149.99,
    "currency": "COP",
    "items": [
      {
        "name": "Wireless Headphones",
        "sku": "WH-1000XM5",
        "quantity": 1,
        "price": 149.99
      }
    ]
  },
  "engagement": {
    "preferred_channel": "auto",
    "reason": "user_abandoned_checkout",
    "metadata": {
      "utm_campaign": "spring_sale",
      "last_clicked_button": "Proceed to Payment"
    }
  }
}

 
```

## Field definitions

### `customer`

* `full_name` (string, required): Customer's full name.  
* `phone_number` (string, required): Customer's phone number in E.164 format.  
* `email` (string, optional): Customer's email address.  
* `country_code` (string, required): ISO 3166-1 alpha-2 country code (e.g., `"CO"`).  
* `language` (string, optional): Preferred language for communication (e.g., `"es"`, `"en"`).

### `session`

* `abandonment_timestamp` (ISO 8601 string, required): Timestamp when the user abandoned the flow.  
* `flow_stage` (string, required): Stage where the user dropped off. Accepted values:
  * `product_selection`
  * `cart_review`
  * `checkout`
  * `payment`
* `platform` (string, required): User's platform. Accepted values:
  * `web`
  * `ios`
  * `android`
* `session_id` (string, optional): Unique identifier for the user's session.

### `cart`

* `total_value` (number, optional): Total value of the cart.  
* `currency` (string, optional): Currency code (e.g., `"COP"`).  
* `items` (array of objects, optional): List of items in the cart. Each item includes:
  * `name` (string): Item name.  
  * `sku` (string): Stock Keeping Unit identifier.  
  * `quantity` (integer): Number of units.  
  * `price` (number): Price per unit.

### `engagement`

* `preferred_channel` (string, optional): Preferred communication channel. Accepted values:
  * `call`
  * `whatsapp`
  * `auto` (default; Yuno selects the optimal channel)
* `reason` (string, optional): Reason for abandonment, if known.  
* `metadata` (object, optional): Additional contextual information (e.g., UTM parameters, last user actions).

## Validation rules

* **Required Fields**:  
  * `customer.full_name`  
  * `customer.phone_number`  
  * `customer.country_code`  
  * `session.abandonment_timestamp`  
  * `session.flow_stage`  
  * `session.platform`

* **Phone Number**: Must be in [E.164](https://en.wikipedia.org/wiki/E.164) format.

* **Country Code**: Must be a valid [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) code.

* **Flow Stage**: Must be one of the accepted values:\
  `product_selection`, `cart_review`, `checkout`, `payment`

* **Platform**: Must be one of the accepted values:\
  `web`, `ios`, `android`

## Security & compliance

* **Authentication**: API access requires a valid API key provided in the request headers.

* **Data Protection**: All data must be transmitted over HTTPS. Yuno adheres to relevant data protection regulations, including **GDPR** and **LGPD**.

* **Data Usage**: Submitted data will be used solely for the purpose of customer engagement and will not be stored beyond the necessary duration.

## 📘 Example use case

A user named Jane Doe adds a pair of wireless headphones to her cart on a merchant's website but abandons the checkout process. The merchant's system detects this and sends the relevant payload to Yuno’s Recovery Agent API. Yuno then initiates a WhatsApp message to Jane, reminding her of the items left in her cart and offering assistance to complete the purchase.
