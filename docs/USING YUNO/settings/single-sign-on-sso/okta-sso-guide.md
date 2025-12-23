---
title: Okta SSO Guide
deprecated: false
hidden: false
metadata:
  robots: index
---
This guide explains how to connect Yuno to Okta using SAML 2.0.

## Prerequisites

* An Okta account
* An application for use with Yuno
* Admin privileges in Okta to manage SSO settings
* Access to the [Yuno dashboard](https://dashboard.y.uno/)

## Step 1: Create a SAML application in Okta

In Okta, go to:

**Applications → Create App Integration → SAML 2.0 → Next**

Select a name for your application and, optionally, upload a logo. You will then see the SAML configuration form.

<Image border={false} src="https://files.readme.io/b727f1773c710e85358319bf6bde4ae3d3b1f0b6776561132e48d88bf27a33f6-image.png" />

## Step 2: Configure SAML settings using Yuno values

Open the Yuno dashboard, click your profile image, then open **Security**.  Navigate to the **Single Sign-On (SSO)** tab, click **Set up**, and gather this info:

* Identifier (Entity ID)
* Assertion Consumer Service URL

Copy these values into the Okta SAML form:

* **Audience URI (SP Entity ID)** → Identifier (Entity ID)
* **Single sign-on URL** → Assertion Consumer Service URL

Click **Next**, then check the option **This is an internal app…**, and finish the setup.

<Image border={false} src="https://files.readme.io/964031ffacf8fa346dc96c5033ea0478c31610946e431bd7b4d1404d29fd93ed-image.png" />

## Step 3: Export and upload the metadata XML

In Okta, locate the **Metadata URL** under the application’s settings and open it. Save the file as `metadata.xml`.

Then, in the Yuno dashboard:

1. Upload the `metadata.xml` file under **Yuno configuration → Option A: Upload metadata XML**
2. Wait for the **Upload completed** confirmation
3. Click **Save**

<Image align="center" border={false} width="500px" src="https://files.readme.io/4c624675b74edc4ec587bec14ecd408341617a48e0c9676f5372b36a8a255e98-image.png" />

Alternatively, you can take the information listed in **Option B** and enter it manually.

## Step 4: Assign users in Okta (optional)

Once configuration is complete, you can assign Okta users or groups to the application so they can log in using SSO.

## Troubleshooting

If you cannot set up the SSO connection or run into issues after initial configuration:

* Yuno requires **signed SAML responses**, check:
  * Both the SAML response and the assertion are signed
  * The signing algorithm configured in Okta is **SHA-256**
  * The certificate used for signing matches the one included in the metadata
* Review SSO logs in the Yuno dashboard under **Security → Single sign-on (SSO)**