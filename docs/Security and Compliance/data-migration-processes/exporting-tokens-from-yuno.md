---
title: Exporting Tokens from Yuno
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
Yuno offers a secure and PCI DSS-compliant process to export tokens from our vault to your systems, or a third-party provider. This guide explains the requirements, encryption protocols, data format, and delivery method to ensure safe and compliant migration of sensitive card data.  

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <h3>Security requirements</h3>
      <div class="contentContainer">
        <p>
					Token export requests are handled with the same level of rigor and encryption used to protect data in production. Only eligible clients with validated use cases and PCI DSS compliance may initiate this process.
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

## When to request a token export

You may request an export of your tokenized data from Yuno when:

* You are switching to a different payment processor or tokenization provider.  
* You need to manage tokens within your own PCI DSS-certified infrastructure.

## Eligibility and prerequisites

To proceed with an export, the following conditions must be met in this order:

### 1. Formal request

The client must submit a written request that includes:  

* A formal request from the third party who wants to receive the merchant data
* Authorization to export the tokenized data.  
* Confirmation of the recipient (internal team or third-party provider).  
* Legal and compliance approval on the client's side.

Please submit this written request to your primary Yuno point of contact, and also send a copy via email to [security-migrations@y.uno](mailto:security-migrations@y.uno) to ensure both teams are informed.

### 2. PCI DSS certification

Since the exported data contains card data, the receiving entity must be certified under PCI DSS. This certification is required regardless of whether you are:

* Switching to a different payment provider
* Requesting your own data for internal use

We require:  

* A valid Attestation of Compliance (AOC) from the receiving entity
* The AOC must be current and valid at the time of the export request

### 3. Technical requirements for secure data transfer

After the formal request is approved and PCI DSS compliance is verified, the following technical requirements must be met:

#### a. PGP public key for encryption

The receiving entity must provide a PGP public key to encrypt the exported files. This ensures that the data remains secure both in transit and at rest.  

* The receiving entity must submit the key
* Yuno will validate the key format and compatibility

#### b. SFTP access credentials

Yuno will provision access to a secure Yuno-hosted SFTP server. To do this, we'll need:  

* A static IP address from which the file will be accessed
* An SSH public key for authentication
* We'll create a dedicated SFTP user account for this purpose

## File format

The exported file will be encrypted using the provided PGP key and follow the structure below:

| Field              | Description                  |
| ------------------ | ---------------------------- |
| `holder_name`      | Name of the cardholder       |
| `number`           | Primary Account Number (PAN) |
| `token`            | Token stored in Yuno's vault |
| `expiration_year`  | Expiration year of the card  |
| `expiration_month` | Expiration month of the card |

* The file will be formatted as a `.csv`   
* All fields are UTF-8 encoded.

## Secure delivery process

Once all prerequisites are met:

1. Yuno's security team will:
   * Prepare the export file with the card data
   * Encrypt the file using the provided PGP key
   * Create the SFTP user account for file retrieval
   * Upload the file to the secure SFTP location

2. You will be notified when:
   * The file is ready for download
   * The SFTP access is configured
   * The access window is active

3. You can then:
   * Access the secure SFTP location using your SSH key and whitelisted IP
   * Download the encrypted file within the defined time window
   * The file will be automatically removed from the server after the access window expires

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer">
    <div class="verticalLine"></div>
    <div>
      <h3>Secure channel required</h3>
      <div class="contentContainer">
        <p>
					The file is never sent by email or made publicly accessible. Access is strictly limited to the configured secure channel.
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

## Security and compliance

Yuno is certified under PCI DSS Level 1 and adheres to strict encryption, access control, and data retention practices throughout this process.

We ensure that:

* All exports are logged and monitored.  
* Only authorized personnel handle encrypted data.  
* Files are never stored longer than the required access window.
