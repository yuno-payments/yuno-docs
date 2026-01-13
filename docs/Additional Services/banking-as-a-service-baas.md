---
title: Banking as a Service (BaaS)
deprecated: false
hidden: true
metadata:
  robots: index
---
Embedded Banking as a Service (BaaS) is a model in which licensed banks or virtual banks offer banking infrastructure to partners. This includes virtual accounts, fund custody, transfers, and payment instruments (cards), allowing partners to embed financial services seamlessly into their own products.

## Main Functionalities

### 1. Register/Enroll User (Physical Person)

Allows partners (merchants) to register a user (physical person). This typically requires KYC (Know Your Customer) verification with the following key features:

* Customer identity verification
* KYC compliance
* User profile creation
* Document validation

### 2. Register/Enroll Entity (Legal Person)

Facilitates partners to register an entity (legal person). This typically requires KYB (Know Your Business) verification and additional company data, with key features including:

* Business verification
* KYB compliance
* Corporate documentation
* Authorized representatives management

### 3. Account Creation and Management

Enables partners to create a virtual bank account on behalf of the user for processing transfers. These accounts normally have limits and comply with banking regulations, with key features including:

* Virtual bank account creation
* Account balance management
* Transaction limits and controls
* Regulatory compliance

### 4. Transfer Management

Allows partner users to receive and send balance, locally or internationally, depending on the banking partner. Supported payment schemes include:

* **ACH** (Automated Clearing House) - US
* **PIX** - Brazil
* **IBAN** (International Bank Account Number) - Europe
* **SWIFT** - International
* **Interac** - Canada

### 5. Card Management

Enables partner users to request a physical or virtual card. Users can manage card status, view card details, and more. This operates under PCI DSS environments with key features including:

* Virtual and physical card issuance
* Card activation and deactivation
* Card details viewing (secure)
* PCI DSS compliant operations
* Transaction monitoring

## Additional Functionalities

* **Bill Payments**: Allows partners to offer bill payment services on their platform, enabling users to pay utilities, services, and other bills directly from their accounts.

* **Add Balance: eCash**: Facilitates partners to allow their users to top up their account with cash through various channels and locations.

* **High Yield Savings Account**: Enables partner users to have their balance in savings accounts that provide returns. These returns are normally annual.

* **P2P Transactions**: Allows partners to perform transfers between accounts under the same bank institution, enabling peer-to-peer payments.

## End-to-End Integration Flows

### Flow 1: Onboard User and Account Creation

Complete flow for registering a new user and creating their banking account.

1. **Register User**
   * User registers an account with the merchant's platform
   * User provides basic information and creates credentials

2. **Create Customer**
   * Merchant creates a customer in Yuno using the [Create Customer endpoint](ref:create-customer)
   * Customer information is sent to Yuno's system

3. **Customer Created**
   * Yuno validates and stores the customer information
   * Yuno returns customer confirmation to the merchant

4. **Onboard Customer**
   * Merchant initiates customer onboarding using Yuno's onboarding endpoint
   * KYC/KYB verification process begins with required documents and information

5. **Onboard User**
   * Yuno forwards the onboarding request to the banking provider
   * Provider performs identity verification and compliance checks

6. **User Onboarded**
   * Provider completes user verification and validates identity
   * Provider confirms user onboarding back to Yuno

7. **Customer Onboarded**
   * Yuno receives provider confirmation
   * Yuno notifies merchant that customer onboarding is complete

8. **Create Virtual Bank Account**
   * User requests to create a virtual bank account through the merchant's platform
   * Merchant prepares account creation request

9. **Create Account**
   * Merchant sends account creation request to Yuno
   * Account parameters and limits are specified

10. **Create Account (Provider)**
    * Yuno forwards account creation request to the provider
    * Provider creates the actual bank account

11. **Account Created (Provider Response)**
    * Provider generates account number and routing details
    * Provider confirms account creation back to Yuno

12. **Account Created (Yuno Response)**
    * Yuno receives account details from provider
    * Yuno confirms account creation to merchant

13. **Display Account Number**
    * Merchant receives account details
    * Merchant displays account number and information to user
    * Account is active and ready for transactions

### Flow 2: Incoming and Outgoing Transfers

Complete flow for receiving payments (Payin) and sending funds (Payout) through various payment schemes.

#### Incoming Transfer Flow (Payin)

1. **Incoming Transfer**
   * Provider receives funds through payment scheme (ACH, PIX, SWIFT, etc.)
   * Provider notifies Yuno of the incoming transfer

2. **Create and Notify Payment**
   * Yuno validates the transfer details and performs compliance checks
   * Yuno creates a payment record
   * Yuno notifies the merchant of the successful payment

3. **Display Added Balance**
   * Merchant updates the user's account balance
   * Merchant displays the added balance and transaction details to the user
   * User can now access the received funds

#### Outgoing Transfer Flow (Payout)

1. **Send Balance to X Account**
   * User requests to send balance to an external account through the merchant's platform
   * User provides destination account details and transfer amount

2. **Create Payout Request**
   * Merchant creates a payout request in Yuno
   * Request includes destination account information and transfer amount

3. **Request Outgoing Transfer**
   * Yuno validates account balance and transfer limits
   * Yuno performs fraud and compliance checks
   * Yuno requests the outgoing transfer from the provider

4. **Notify Transfer Completion**
   * Provider processes the transfer through payment scheme (ACH, PIX, SWIFT, etc.)
   * Provider notifies Yuno of transfer completion

5. **Notify Payout Succeeded**
   * Yuno updates the payout status
   * Yuno notifies the merchant that the payout succeeded

6. **Notify and Display New Balance**
   * Merchant updates the user's account balance
   * Merchant notifies the user and displays the new balance
   * Transaction record is maintained

### Flow 3: Card Management

Complete flow for requesting, managing, and viewing card details for physical and virtual cards. Card information is tokenized and never stored directly - Yuno's PCI DSS compliant infrastructure handles all sensitive card data securely through tokenization.

1. **Request Card**
   * User requests a card through the merchant's platform
   * User specifies card type (physical or virtual) and preferences

2. **Create Card**
   * Merchant sends card creation request to Yuno
   * Request includes user details, card type, and spending limits

3. **Request Card Creation**
   * Yuno forwards the card creation request to the provider
   * Provider initiates card generation process

4. **Card Created**
   * Provider generates the card with secure details (card number, CVV, expiration)
   * Card information is tokenized (not stored directly)
   * Token is stored in Yuno's PCI DSS compliant environment
   * Provider confirms card creation to Yuno SDK

5. **Card Created Succeeded**
   * Yuno SDK receives card creation confirmation
   * Yuno notifies merchant that card was created successfully

6. **Notifies Card Created**
   * Merchant receives confirmation
   * Merchant notifies user that their card is ready
   * For virtual cards: Instantly available; For physical cards: Shipping initiated

7. **Show Card Details**
   * User requests to view card details through the merchant's platform
   * User initiates secure card details retrieval

8. **View Card Details**
   * Merchant forwards the request to Yuno SDK
   * Request is authenticated and validated

9. **Show Card Details (SDK to Provider)**
   * Yuno SDK uses token to request actual card details from provider
   * Secure PCI DSS compliant retrieval initiated
   * Yuno's PCI compliance infrastructure ensures secure handling

10. **Display Card Details (Provider Response)**
    * Provider retrieves actual card details using the token
    * Card information is encrypted and securely transmitted back to Yuno SDK
    * Sensitive data never exposed to merchant systems

11. **Display Card Details (SDK Response)**
    * Yuno SDK receives encrypted card details
    * Details are prepared for secure display to merchant

12. **Display Card Details (Final)**
    * Merchant receives time-limited, encrypted card details through Yuno SDK
    * Card information is displayed securely to the user
    * Yuno's PCI DSS compliant infrastructure handles all sensitive data
    * Card details are tokenized, encrypted, and time-limited
    * Merchant never stores actual card information
