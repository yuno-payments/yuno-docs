---
title: Microsoft Entra ID SSO Guide
deprecated: false
hidden: true
metadata:
  robots: index
---
This guide explains how to connect Yuno to Microsoft Entra ID (formerly Azure Active Directory) using SAML 2.0.

## Prerequisites

* A Microsoft Entra ID tenant
* An application for use with Yuno
* Entra ID admin privileges to manage SSO settings
* Access to the [Yuno dashboard](https://dashboard.y.uno/)

## Step 1: Configure the basic SAML settings

First, go to the dashboard and click your profile image, then open **Security**. Navigate to the Single Sign-On (SSO) tab, click **Set up** and gather this info:

* Identifier (Entity ID)
* Assertion Consumer Service URL

<Image border={false} src="https://files.readme.io/26c0986966dcf9f51615f2b1943b32ddc33dcc462a069a921e267899e39e3614-image.png" />

In Microsoft Entra ID, go to:

**Enterprise applications → All applications → Your application → Single sign-on**

Under **Basic SAML configuration**, enter the values from the Yuno dashboard.

<Image border={false} src="https://files.readme.io/ea9bccfc34e1bcffa9d18689a54979173b570b4a50f4cca39b9a856be64cea98-image.png" />

## Step 2: Export and upload the federation metadata XML

In Microsoft Entra ID, navigate to the **SAML certificates** section and download the **Federation Metadata XML** file.

<Image border={false} src="https://files.readme.io/94f94d8a3974bb690612c7075878bbb13ac05c20c0ba4a38761f559ac22434a1-image.png" />

Then, in the Yuno dashboard:

1. Upload the XML file under **Yuno configuration → Option A: Upload metadata XML**
2. Wait for the **Upload completed** confirmation
3. Click **Save**

<Image border={false} src="https://files.readme.io/6c703d7539262c66a14ac419ab6197e8e9b5583ab5bb94e623d609f414a81350-image.png" />

Alternatively, you can take the information listed in **Option B** and enter it manually.

## Step 3: Verify SAML certificate settings

In Microsoft Entra ID, open **SAML certificates** and make sure:

* The signing option is **Sign SAML response and assertion**
* The signing algorithm is **SHA-256**

Click **Save** to apply the changes.

## Troubleshooting

If you cannot set up the SSO connection or run into issues after initial configuration:

* Remember Yuno requires **signed SAML responses**, check:
  * Both the SAML response and the assertion are signed
  * The signing algorithm is **SHA-256**
  * The signing certificate matches the one uploaded to Yuno
* Review SSO logs in the Yuno dashboard under **Security → Single sign-on (SSO)**
