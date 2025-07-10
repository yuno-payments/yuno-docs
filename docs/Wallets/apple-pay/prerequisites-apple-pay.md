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
Before you can configure Apple Pay in the [Yuno dashboard](https://auth.y.uno/u/login?), you must complete several setup steps in your Apple Developer account. This section guides you through the required prerequisites.

## Step 1: Create a merchant identifier

To begin, register a merchant identifier in the Apple Developer dashboard:

1. Log in to the [Apple Developer](https://idmsa.apple.com/IDMSWebAuth/signin?appIdKey=891bd3417a7776362562d2197f89480a8547b108fd934911bcbea0110d07f757\&path=%2Faccount%2F\&rv=1) portal.
2. In **Certificates, Identifiers & Profiles**, select **Register a new identifier**.
3. Choose **Merchant IDs** and click **Continue**.

<Image align="center" src="https://files.readme.io/ab500a4-image-1.png" />

4. Enter a **Description** to identify the merchant (for example, **Apple Pay Integration**). For the **Identifier**, use the format `merchant.com.y.uno.SomeIdentifier`.

<Image align="center" src="https://files.readme.io/52f4ba5-image-2.png" />

5. Click **Continue** to complete the registration.

## Step 2: Create a payment processing certificate

Before you can generate your payment processing certificate, create a directory on your computer (for example, `Downloads/ApplePayFiles`) to store all files related to this process. Keeping your certificate files organized will help you complete the following steps smoothly.

To generate a **Payment Processing Certificate** on macOS, follow these steps:

1. Open **Keychain Access** on your Mac.
2. In the menu bar, go to **Keychain Access > Certificate Assistant > Request a Certificate from a Certificate Authority**.

<Image align="center" src="https://files.readme.io/e8dc051-image_1.png" />

3. Complete the certificate request form as follows:
   - **Email Address**: Enter your email address.
   - **Common Name**: Enter a name to identify the private key (for example, **John Doe ProcessingCertificate**).
   - **CA Email Address**: Leave this field blank.
   - Select **Saved to disk**.
   - Select **Let me specify key pair information**.
4. Click **Continue**.
5. Save the certificate signing request (CSR) as `CertificateSigningRequestPaymentProcessingCertificate.certSigningRequest` in the directory you created earlier.
6. When prompted for key pair information, use the following settings:
   - **Key Size**: RSA 2048 bits
   - **Algorithm**: EC
7. Click **Continue** to finish creating the CSR file.

## Step 3: Get the payment processing certificate

After you have created the certificate signing request (CSR), you need to obtain and convert your Apple Pay payment processing certificate. Follow these steps:

1. Go to the [Apple Developer portal](https://developer.apple.com/account/resources/identifiers/list/merchant).
2. Select your Merchant ID, then click **Create Certificate** under **Apple Pay Payment Processing Certificate**.

<Image align="center" src="https://files.readme.io/f3dbeec-Picture1.png" />

3. When asked, "Will payments associated with this Merchant ID be processed exclusively in China mainland?", select **No**.
4. Click **Upload a Certificate Signing Request**, choose the CSR file you created earlier (`CertificateSigningRequestPaymentProcessingCertificate.certSigningRequest`), and click **Continue**.
5. Download the signed certificate (`apple_pay.cer`) from Apple and save it in your ApplePayFiles directory.

<Image align="center" src="https://files.readme.io/6a03caf-Picture2.png" />

6. Convert the certificate to PEM format by running the following command in your ApplePayFiles directory:

```shell
openssl x509 -inform DER -in apple_pay.cer -out apple_pay.pem
```

## Step 4: Export the private key

To use your payment processing certificate, you need to export its private key and convert it to the correct format. Follow these steps:

1. Open **Keychain Access** on your Mac.
2. Locate the entry you created in Step 2 (for example, **John Doe ProcessingCertificate**).

<Image align="center" src="https://files.readme.io/83a0096-Picture3.png" />

3. Right-click the entry and select **Export**. Choose the `.p12` format (for example, `JohnDoeProcessingCertificate.p12`).
4. Set a password for the exported file (for example, `Yuno2024`) and save it in the directory you created earlier. You may be prompted to enter your computer password to complete the export.
5. After exporting the `.p12` file, convert the private key to PEM format. Open a terminal, navigate to the directory where you saved the file, and run the following command:

```
openssl pkcs12 -in JohnDoeProcessingCertificate.p12 -nocerts -nodes | sed -ne '/-BEGIN PRIVATE KEY-/,/-END PRIVATE KEY-/p' > ProcessingCertificatePrivateKey.pem
```

The private key will be saved in the `ProcessingCertificatePrivateKey.pem` file.

## Step 5: Register the payment processing certificate and key

After exporting and converting your certificate and private key, you need to register them in the Yuno Dashboard.

To do this:

1. Go to the [Yuno Dashboard](https://auth.y.uno/u/login?).
2. Upload the contents of `ProcessingCertificatePrivateKey.pem` into the **Payment processing key** field.
3. Upload the contents of `apple_pay.pem` into the **Payment processing certificate** field.

The image below shows where to add this information in the Yuno Dashboard:

<Image align="center" src="https://files.readme.io/abab730-image_3.png" />

## Step 6: Create a merchant identity certificate

Next, you need to create a Merchant Identity Certificate on your Mac. This certificate is required for Apple Pay domain verification and secure communication.

Follow these steps:

1. Open **Keychain Access** on your Mac.
2. In the menu, select **Keychain Access > Certificate Assistant > Request a Certificate from a Certificate Authority**.
3. Complete the certificate request form:
   - **Email Address**: Enter your email address.
   - **Common Name**: Enter a name for the private key (for example, **John Doe MerchantIdentityCertificate**).
   - **CA Email Address**: Leave this field blank.
   - Select **Saved to disk**.
4. Click **Continue**.
5. Save the CSR as `CertificateSigningRequestMerchantIdentityCertificate.certSigningRequest` in the directory you created earlier.
6. Click **Continue** to finish creating the CSR.

## Step 7: Get the merchant identity certificate

Now that you have created the Certificate Signing Request (CSR), you need to obtain your Merchant Identity Certificate from Apple and convert it to the correct format for use with Yuno.

Follow these steps:

1. Go to the [Apple Developer portal](https://developer.apple.com/account/resources/identifiers/list/merchant).
2. Select your Merchant ID and click **Create Certificate** under **Apple Pay Merchant Identity Certificate**.
3. Click **Upload a Certificate Signing Request** and select the CSR file you created in Step 6 (`CertificateSigningRequestMerchantIdentityCertificate.certSigningRequest`).
4. Click **Continue** to proceed.
5. Download the signed certificate (`merchant_id.cer`) from Apple and save it in the directory you created earlier.
6. Open a terminal, navigate to the directory where you saved the certificate, and run the following command to convert it to PEM format:

```shell
openssl x509 -inform DER -in merchant_id.cer -out merchant_id.pem
```

## Step 8: Export the merchant private key

To complete the Apple Pay setup, you need to export your merchant private key from Keychain Access and convert it to the correct format for Yuno.

Follow these steps:

1. Open **Keychain Access** on your Mac.
2. Locate the entry you created in Step 6 (for example, **John Doe MerchantIdentityCertificate**).
3. Right-click the entry and select **Export**. Choose the `.p12` format (for example, `JohnDoeMerchantIdentityCertificate.p12`).
4. Set a password for the export (for example, `Yuno2024`) and save the file in your working directory. You may be prompted to enter your computer password to complete the export.
5. After exporting, convert the private key to PEM format. Open a terminal, navigate to the directory where you saved the `.p12` file, and run the following command:

```
openssl pkcs12 -in JohnDoeMerchantIdentityCertificate.p12 -nocerts -nodes | sed -ne '/-BEGIN PRIVATE KEY-/,/-END PRIVATE KEY-/p' > MerchantIdentityCertificatePrivateKey.pem
```

The private key content will be available in the `MerchantIdentityCertificatePrivateKey.pem` file.

## Step 9: Register the merchant identity certificates

Register your merchant’s private key and certificate in the Yuno dashboard to enable secure Apple Pay transactions. 

Follow these steps:

1. Go to the [Yuno dashboard](https://auth.y.uno/u/login?).
2. In the Apple Pay connection settings, upload the contents of `MerchantIdentityCertificatePrivateKey.pem` into the **Merchant identity key** field.
3. Upload the contents of `merchant_id.pem` into the **Merchant identity certificate** field.

The image below shows where to add this information in the Yuno dashboard:

<Image align="center" src="https://files.readme.io/abab730-image_3.png" />

## Step 10: Register merchant domains

To complete the Apple Pay setup, you must register your merchant domains in the Apple Developer portal. This step ensures your domains are authorized to process Apple Pay transactions.

Follow these steps:

1. Go to the [Apple Developer portal](https://developer.apple.com/account/resources/identifiers/list/merchant).
2. Select your **Merchant ID** and click **Add Domain** under **Merchant Domains**.
3. Enter your domain (for example, `demo.y.uno`) and click **Save**.

---

After completing these steps, you are ready to integrate Yuno with your system. Choose your preferred integration method:

- [SDK integration](doc:sdk-integration-apple)
- [Direct integration](doc:direct-integration)
