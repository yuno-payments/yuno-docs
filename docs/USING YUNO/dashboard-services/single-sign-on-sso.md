---
title: Single Sign-On (SSO)
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
**Single sign-on (SSO)** lets your team log in to the Yuno dashboard using your company’s existing accounts, instead of creating new credentials. SSO centralizes authentication, makes onboarding and offboarding team members easier, and ensures that only authorized users from your organization can access Yuno.

Yuno supports Single Sign-On (SSO) using the **SAML 2.0** (Security Assertion Markup Language) standard, ensuring compatibility with a wide range of identity providers that adhere to this protocol. We have successfully tested SSO integration with **Google**, **Microsoft**, **Okta**, and **Keycloak**. The dashboard is also designed to accommodate other SAML 2.0-compliant providers. Contact support for details on implementing additional providers.

## Setting up SSO

> 📘 Admin Status Required
>
> To activate SSO, you must have the Admin role in all accounts within the organization.

**Step 1: Access the security section**

1. Log in to the Yuno dashboard as an administrator.
2. Click your profile image and select **Security**. Go to the **Single sign-on** tab.

<Video src="https://github.com/writechoiceorg/yuno-images/raw/main/Insights/Video1.mov" />

**Step 2: Set up SSO**

Click **Set up** to open the SSO configuration.

1. Under **Identity provider**, select your desired option: **Google**, **Keycloack**, **Microsoft**, **Okta**, or **Other**.
2. Copy the **Identifier (Entity ID)** and **Assertion consumer service URL** provided by Yuno.

<Image border={false} src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXd7Obd6lURxHjloLWCT2JSJB_mCS0N0g_53H8mhUkqTw7Nu3RNW_cAjekMBx0gAH1wDQbhJXzhmVJQqSnCoQkbkO37anutvQLOH1dNtgW_DJP-KoGUXk2Xn0YBq2v4V2Ciw9dSf7A?key=2dldRk3J4b42VwoUCEVS3Lpu" />

**Step 3: Configure the identity provider**

Next, access the admin panel of your chosen identity provider. Here, you'll either generate a metadata XML file or obtain the necessary configuration details. Refer to your provider’s documentation for where to input Yuno’s information.

> ⚠️ Required SAML signing
>
> Yuno rejects SAML responses that are not signed. Configure your identity provider so that:
>
> * Both the **SAML response and the assertion are signed**.
> * **SHA-256** is the signing and digest algorithm.
> * The certificate used for signing matches the one you upload to Yuno (via metadata or manual entry).

1. Access your identity provider's admin panel.
2. Paste the **Identifier (Entity ID)** and **Assertion Consumer Service URL** provided by Yuno into the relevant fields.
3. Enable the response and assertion signing options.
4. Save the changes and generate the **XML metadata file**. Alternatively, you can save the Entity ID (IDP), Sign In URL, and Certificate.

**Step 4: Finalize the configuration in Yuno**

Back in the dashboard, you have two options to finish the SSO setup:

* **Option A**: Upload the metadata XML from the identity provider.
* **Option B**: Manually enter Entity ID (IDP), Sign In URL, and Certificate.

<Video src="https://github.com/writechoiceorg/yuno-images/raw/main/Insights/Video2.mov" />

**Managing SSO**

* **Disable SSO**: Administrators can go to the **Login methods** tab of the Security section to toggle SSO on and off.
* **View and edit configurations**: Admins may also modify the configuration in case of changes to the identity provider. Simply go back to the Single Sign-On (SSO) tab in the Security section.

## Using SSO as an end user

Once configured, users will see a button to **Continue with SSO** on the Yuno login page:

<Image border={false} src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXe-Fk00i8svq7UugqGxp5DzQOxatdRuwIM2oFH_NnJqS7cqEVo8GbvJzh0NrnkF3QMMWqYBSy6vG8wtE1qXibVmPXpxYC7TPQFjwnOQY_GiueV_Vz5tKfFT0a-FjlNHalgnQUv3CQ?key=2dldRk3J4b42VwoUCEVS3Lpu" />

To access Yuno using SSO:

1. Enter your corporate email address and click **Continue with SSO**.
2. You will be redirected to the identity provider for authentication.
3. Upon successful authentication, you will gain access to the Yuno dashboard.

## Troubleshooting and log access

* **Users bounce back to the login screen**: Confirm that both the SAML response and assertion are signed with SHA-256, and that the current certificate is uploaded to Yuno.
* **Certificate rotation**: Any time you rotate IdP certificates, update the configuration in Yuno to keep the signatures valid.
* **SSO sign-in logs**: Dashboard users cannot yet view audit logs for SSO attempts. If you need to investigate an authentication issue, contact Yuno Support with the user email and timestamp so the team can pull the Datadog logs for you.
