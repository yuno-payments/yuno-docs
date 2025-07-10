---
title: Prerequisites (COPY)
deprecated: false
hidden: true
metadata:
  robots: index
---
To integrate Apple Pay into the Yuno solution, you must complete some steps covered on this page. Follow the steps described below before configuring Apple Pay in the [Yuno Dashboard](https://auth.y.uno/u/login?).

## Step 1: Register a merchant identifier

In the Apple Developer dashboard:

1. Log in to [Apple Developer](https://idmsa.apple.com/IDMSWebAuth/signin?appIdKey=891bd3417a7776362562d2197f89480a8547b108fd934911bcbea0110d07f757\&path=%2Faccount%2F\&rv=1).
2. Go to **Certificates, Identifiers & Profiles**, then select **Register a new identifier**.
3. Choose **Merchant IDs** and click **Continue**.

<Image align="center" src="https://files.readme.io/ab500a4-image-1.png" />

4. Enter a **Description** (e.g., `Apple Pay Integration`) and an **Identifier** in the format `merchant.com.y.uno.YourBusinessName`.

<Image align="center" src="https://files.readme.io/52f4ba5-image-2.png" />

5. Click **Continue** and follow the steps to register.

## Step 2: Generate a payment processing certificate

1. Create a new directory (e.g., `Downloads/ApplePayFiles`) to store the certificate files.
2. Open **Keychain Access** on your Mac.
3. Go to **Keychain Access > Certificate Assistant > Request a Certificate From a Certificate Authority**.

<Image align="center" src="https://files.readme.io/e8dc051-image_1.png" />

4. Fill out the form:
   * **Email Address**: your email address
   * **Common Name**: a name for the certificate (e.g., `John Doe ProcessingCertificate`)
   * **CA Email Address**: leave blank
   * Select **Saved to disk**
   * Check **Let me specify key pair information**

5. Click **Continue**, then save the file as `CertificateSigningRequestPaymentProcessingCertificate.certSigningRequest` in your working directory.

6. When prompted for key pair settings, use:

   * **Key Type**: Elliptic Curve (EC)
   * **Key Size**: 256-bit
   * **Algorithm**: ECDSA

7. Click **Continue** to generate the CSR.

## Step 3: Retrieve and convert the payment processing certificate

1. Go to the [Apple Developer Merchant ID list](https://developer.apple.com/account/resources/identifiers/list/merchant).
2. Select your Merchant ID and click **Create Certificate** under **Apple Pay Payment Processing Certificate**.

<Image align="center" src="https://files.readme.io/f3dbeec-Picture1.png" />

3. When prompted, answer **No** to "Will payments... be processed exclusively in China mainland?"
4. Upload the file `CertificateSigningRequestPaymentProcessingCertificate.certSigningRequest`.
5. Download the signed certificate as `apple_pay.cer` and save it to your directory.

<Image align="center" src="https://files.readme.io/6a03caf-Picture2.png" />

6. Convert the certificate to PEM format:

```bash
openssl x509 -inform DER -in apple_pay.cer -out apple_pay.pem
```

## Step 4: Export the private key

1. In **Keychain Access**, find the key you created (e.g., `John Doe ProcessingCertificate`).
2. Right-click and choose **Export**.
3. Export the key as a `.p12` file (e.g., `JohnDoeProcessingCertificate.p12`) and save it to your working directory.
4. Set a strong password (you’ll use it in the next step).
5. Convert the `.p12` to a PEM-format private key:

```bash
openssl pkcs12 -in JohnDoeProcessingCertificate.p12 -nocerts -nodes | sed -ne '/-BEGIN PRIVATE KEY-/,/-END PRIVATE KEY-/p' > ProcessingCertificatePrivateKey.pem
```

The private key will be stored in `ProcessingCertificatePrivateKey.pem`.

## Step 5: Upload the certificate and key to Yuno

1. Open the Yuno Dashboard: [https://auth.y.uno/u/login](https://auth.y.uno/u/login)
2. Open `ProcessingCertificatePrivateKey.pem` in a text editor and copy its full contents, including header and footer.
3. Paste it into the **Payment processing key** field.
4. Open `apple_pay.pem` and copy its full contents.
5. Paste it into the **Payment processing certificate** field.

<Image align="center" src="https://files.readme.io/abab730-image_3.png" />

## Step 6: Generate a merchant identity certificate

1. Open **Keychain Access** and navigate to **Certificate Assistant > Request a Certificate From a Certificate Authority**.

2. Enter:
   * **Email Address**: your email
   * **Common Name**: e.g., `John Doe MerchantIdentityCertificate`
   * Leave **CA Email Address** blank
   * Select **Saved to disk**

3. Save as `CertificateSigningRequestMerchantIdentityCertificate.certSigningRequest`.

## Step 7: Retrieve and convert the merchant identity certificate

1. Go to the [Apple Developer Merchant ID list](https://developer.apple.com/account/resources/identifiers/list/merchant).
2. Select your Merchant ID and click **Create Certificate** under **Apple Pay Merchant Identity Certificate**.
3. Upload the `CertificateSigningRequestMerchantIdentityCertificate.certSigningRequest` file.
4. Download the signed certificate as `merchant_id.cer` and save it.
5. Convert it to PEM:

```bash
openssl x509 -inform DER -in merchant_id.cer -out merchant_id.pem
```

## Step 8: Export the merchant identity private key

1. In **Keychain Access**, find `John Doe MerchantIdentityCertificate`.
2. Right-click and export as `JohnDoeMerchantIdentityCertificate.p12`.
3. Set a strong password.
4. Convert the private key to PEM:

```bash
openssl pkcs12 -in JohnDoeMerchantIdentityCertificate.p12 -nocerts -nodes | sed -ne '/-BEGIN PRIVATE KEY-/,/-END PRIVATE KEY-/p' > MerchantIdentityCertificatePrivateKey.pem
```

## Step 9: Upload the merchant identity certificate and key

1. Open the Yuno Dashboard.
2. Copy the contents of `MerchantIdentityCertificatePrivateKey.pem` and paste it into the **Merchant Identity key** field.
3. Copy the contents of `merchant_id.pem` and paste it into the **Merchant Identity certificate** field.

<Image align="center" src="https://files.readme.io/abab730-image_3.png" />

## Step 10: Register your merchant domains

1. Go to [Apple Developer Merchant ID list](https://developer.apple.com/account/resources/identifiers/list/merchant).
2. Select your **Merchant ID** and click **Add Domain** under **Merchant Domains**.
3. Enter the domain (e.g., `demo.y.uno`) and click **Save**.

> ⚠️ Note: You must also host Apple’s `apple-developer-merchantid-domain-association` file at:
>
> ```
> https://yourdomain.com/.well-known/apple-developer-merchantid-domain-association
> ```

Once all steps are complete, your Apple Pay integration with Yuno is ready. You can now proceed with:

* [SDK Integration](doc:sdk-integration-apple)
* [Direct Integration](doc:direct-integration)