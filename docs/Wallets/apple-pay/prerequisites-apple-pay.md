---
title: Prerequisites
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
To integrate Apple Pay into the Yuno solution, you must complete some steps covered on this page. Follow the steps described below before configuring Apple Pay in the[ Yuno dashboard](https://auth.y.uno/u/login?).

## Step 1: Create a merchant identifier

In the Apple Developer dashboard, register a merchant identifier by following the steps:

1. Log in to the [Apple developer](https://idmsa.apple.com/IDMSWebAuth/signin?appIdKey=891bd3417a7776362562d2197f89480a8547b108fd934911bcbea0110d07f757&path=%2Faccount%2F&rv=1).
2. In **Certificates, Identifiers & Profiles**, select **Register a new identifier**.
3. Select **Merchant IDs** and click **Continue**.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/ab500a4-image-1.png",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


4. Add a **Description ** to describe the merchant you are registering, such as **Apple Pay Integration**. For the **Identifier**, enter the prefix `merchant.com.y.uno.SomeIdentifier`. 

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/52f4ba5-image-2.png",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


5. Click **Continue**

## Step 2: Create a payment processing certificate

To start, create a new directory (e.g., `Downloads/ApplePayFiles`) to store the files required for generating certificates. You must save certificates and other files from Apple Pay through the process.

To create a **PaymentProcessingCertificate** on your MacOS, follow the steps presented below:

1. Open **Keychain Access** on your MacOS.
2. In the Keychain Access application, navigate to **Keychain Access > Certificate Assistant > Request a Certificate from a Certificate Authority**.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/e8dc051-image_1.png",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


3. Fill in the certificate information according to the following instructions:
   1. **Email Address**: Enter your email address.
   2. **Name**: Enter a name for the private key (e.g., **John Doe ProcessingCertificate**).
   3. **CA Email Address**: Leave this field empty.
   4. Select **Saved to disk**.
   5. Select **Let me specify key pair information.**
4. Click **Continue**.
5. Save the CSR with the name `CertificateSigningRequestPaymentProcessingCertificate.certSigningRequest` in the previously created directory.
6. For the key pair, use the following configurations:
   1. **Key Size**: RSA 2048 bits
   2. **Algorithm**: EC
7. Click **Continue** to finish creating the CSR.

## Step 3: Get the payment processing certificate

After creating the CSR, you need to get and convert the certificate. Follow the steps:

1. Access the [Apple Developer](https://developer.apple.com/account/resources/identifiers/list/merchant) portal.
2. Select your Merchant ID, and click **Create Certificate** under **Apple Pay Payment Processing Certificate**.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/f3dbeec-Picture1.png",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


3. For **Will payments associated with this Merchant ID be processed exclusively in China mainland?**, select **No**.
4. Click **Upload a Certificate Signing Request**, and select the previously created CSR named  `CertificateSigningRequestPaymentProcessingCertificate.certSigningRequest`, and click **Continue**.
5. Download the signed certificate (`apple_pay.cer`) from Apple and save it in the previously created directory (ApplePayFiles).

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/6a03caf-Picture2.png",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


6. Convert the certificate using the following command. Remember to navigate to the previously created `ApplePayFiles` directory:

```shell
openssl x509 -inform DER -in apple_pay.cer -out apple_pay.pem
```

## Step 4: Export the private key information

1. Access the **Keychain Access** on your computer.
2. Find the entry previously created in Step 2 (e.g., **John Doe ProcessingCertificate**).

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/83a0096-Picture3.png",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


3. Right-click and export the private key in `.p12` format (e.g., `JohnDoeProcessingCertificate.p12`).
4. Set a password (e.g., Yuno2024) and save it in the previously created directory. You will have to provide your computer password to export the `.p12` file.
5. After exporting, we need to convert the private key. Access the directory where you saved the private key, open the terminal, and run the following command:

```
openssl pkcs12 -in JohnDoeProcessingCertificate.p12 -nocerts -nodes | sed -ne '/-BEGIN PRIVATE KEY-/,/-END PRIVATE KEY-/p' > ProcessingCertificatePrivateKey.pem
```

The private key content will be available in the `ProcessingCertificatePrivateKey.pem` file.

## Step 5: Register the certificate and private

You can register the private key and the certificate into the Yuno Dashboard. Follow the steps below:

1. Access the [Yuno Dashboard](https://auth.y.uno/u/login?).
2. Upload the contents of `ProcessingCertificatePrivateKey.pem` to the **Payment processing key** field.
3. Upload the contents of `apple_pay.pem` to the **Payment processing certificate** field.

The following image presents where to add the information to the Yuno Dashboard.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/abab730-image_3.png",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


## Step 6: Create a merchant identity certificate

To create a **MerchantIdentityCertificate** on your MacOS, follow the steps presented below:

1. Open **Keychain Access** on your MacOS.
2. In the Keychain Access application, navigate to **Keychain Access > Certificate Assistant > Request a Certificate from a Certificate Authority**.
3. Fill in the certificate information according to the following instructions:
   1. **Email Address**: Enter your email address.
   2. **Common Name**: Enter a name for the private key (e.g., **John Doe MerchantIdentityCertificate**).
   3. **CA Email Address**: Leave this field empty.
   4. Select **Saved to disk**.
4. Click **Continue**.
5. Save the CSR with the name `CertificateSigningRequestMerchantIdentityCertificate.certSigningRequest` in the previously created directory.
6. Click **Continue** to finish creating the CSR.

## Step 7: Get the merchant identity certificate

After creating the CSR, you need to get and convert the certificate. Follow the steps:

1. Access the [Apple Developer](https://developer.apple.com/account/resources/identifiers/list/merchant) portal.
2. Select your Merchant ID, and click **Create Certificate** under **Apple Pay Merchant Identity Certificate**.
3. Click **Upload a Certificate Signing Request** and select the certificate created in Step 6 (`CertificateSigningRequestMerchantIdentityCertificate.certSigningRequest`).
4. Click **Continue**.
5. Download the signed certificate (`merchant_id.cer`) from Apple and save it in the previously created directory.
6. Access the directory where you saved the certificate, open the terminal, and run the following command to convert it to the required format:

```shell
openssl x509 -inform DER -in merchant_id.cer -out merchant_id.pem
```

## Step 8: Export the merchant private key

1. Access the **Keychain Access** on your computer.
2. Find the entry previously created in Step 6 (e.g., **John Doe MerchantIdentityCertificate**).
3. Right-click and export the private key in `.p12` format (e.g., `JohnDoeMerchantIdentityCertificate.p12`).
4. Set a password (e.g., Yuno2024) and save it in the previously created directory. You will have to provide your computer password to export the `.p12` file.
5. After exporting, we need to convert the private key. Access the directory where you saved the private key, open the terminal, and run the following command:

```
openssl pkcs12 -in JohnDoeMerchantIdentityCertificate.p12 -nocerts -nodes | sed -ne '/-BEGIN PRIVATE KEY-/,/-END PRIVATE KEY-/p' > MerchantIdentityCertificatePrivateKey.pem
```

The private key content will be available in the `MerchantIdentityCertificatePrivateKey.pem` file.

## Step 9: Register the merchant identity certificates

You can register the merchant's private key and certificate in the Yuno Dashboard. Follow the steps below:

1. Access the [Yuno Dashboard](https://auth.y.uno/u/login?).
2. Upload the contents of `MerchantIdentityCertificatePrivateKey.pem` to the **Merchant Identity key** field.
3. Upload the contents of `merchant_id.pem` to the **Merchant Identity Password** field.

The following image presents where to add the information to the Yuno Dashboard.

[block:image]
{
  "images": [
    {
      "image": [
        "https://files.readme.io/abab730-image_3.png",
        "",
        ""
      ],
      "align": "center"
    }
  ]
}
[/block]


## Step 10: Register merchant domains

As the last step, you have to register the merchant domains into the Apple Dashboard. Follow the steps below to complete the process: 

1. Access the [Apple Developer](https://developer.apple.com/account/resources/identifiers/list/merchant).
2. Select your **Merchant ID**, and click **Add Domain** under **Merchant Domains**.
3. Enter the domain (e.g., `demo.y.uno`) and click **Save**.

After finishing this step, you can start the Yuno solution integration. You can choose between the following options to integrate Yuno into your system:

- [SDK Integration](doc:sdk-integration-apple)
- [Direct Integration](doc:direct-integration)