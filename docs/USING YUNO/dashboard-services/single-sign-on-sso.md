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
**Single sign-on (SSO)** allows users to access Yuno with a single set of credentials through a trusted Identity Provider (IdP). This simplifies user management, strengthens security, and enables teams to work more efficiently across platforms.

Yuno supports SSO using the **SAML 2.0** (Security Assertion Markup Language) standard. This ensures compatibility with any identity provider that follows the protocol, such as Google Workspace, Microsoft Azure, and others.

## Benefits of SSO in Yuno

SSO streamlines access to Yuno while improving security and the user experience.

* **Enhanced security**: Authentication is centralized through your identity provider, reducing the risks associated with multiple credentials.
* **Simplified access**: Users can log into the Yuno dashboard without remembering separate credentials.

## Compatible providers

Yuno works with any identity providers supporting the **SAML 2.0** standard.

## How to set up SSO in Yuno

<HTMLBlock>{`
<body>
  <div class="infoBlockContainer alert">
    <div class="verticalLineAlert"></div>
    <div>
      <div class="contentContainer">
        <p>
					To activate SSO (Single Sign-On) in the dashboard, the user must have the Admin role in all accounts within the organization.
          If the user does not meet this requirement, they will not be able to configure SSO. 
        </p>
      </div>
    </div>
  </div>
</body>
`}</HTMLBlock>

## Setting up SSO

You can connect Yuno with your identity provider and give your team secure, centralized access in just a few steps:

**Step 1: Access the security section**

1. Log in to the Yuno dashboard as an administrator.
2. Click your profile image and select **Security**. Go to the **Single sign-on** tab.

<HTMLBlock>{`
<div style="background-color: #FFFFF; padding: 16px; display: flex; justify-content: center; border-radius:14px;">
  <video src="https://github.com/writechoiceorg/yuno-images/raw/main/Insights/Video1.mov" loop autoplay muted playsinline style="width:100%; height:100%; border-radius:14px; display:block; object-fit:cover; background-color:rgba(0, 0, 0, 0); object-position:50% 50%; box-shadow: 0px 0px 0px 0px rgba(40, 42, 47, 0.05), 0px 3px 6px 0px rgba(40, 42, 47, 0.05), 0px 11px 11px 0px rgba(40, 42, 47, 0.04), 0px 25px 15px 0px rgba(40, 42, 47, 0.02), 0px 44px 18px 0px rgba(40, 42, 47, 0.01), 0px 69px 19px 0px rgba(40, 42, 47, 0.00);"></video>
</div>
`}</HTMLBlock>

**Step 2: Select the identity provider**

1. Choose your identity provider from the list:
   1. Google Workspace
   2. Microsoft Azure
   3. Other providers compatible with SAML 2.0
2. Copy the **Identifier (Entity ID)** and **Assertion Consumer Service URL** provided by Yuno.

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXd7Obd6lURxHjloLWCT2JSJB_mCS0N0g_53H8mhUkqTw7Nu3RNW_cAjekMBx0gAH1wDQbhJXzhmVJQqSnCoQkbkO37anutvQLOH1dNtgW_DJP-KoGUXk2Xn0YBq2v4V2Ciw9dSf7A?key=2dldRk3J4b42VwoUCEVS3Lpu)

**Step 3: Configure the identity provider**

1. Access your identity provider's admin panel.
2. Paste the **Identifier (Entity ID)** and **Assertion Consumer Service URL** provided by Yuno into the relevant fields.
3. Save the changes and generate the XML metadata file or required tokens.

**Step 4: Finalize the configuration in Yuno**

1. In the Yuno dashboard, upload the XML file provided by the identity provider or manually paste the tokens.
2. Click **Save** to confirm the configuration.

<HTMLBlock>{`
<div style="background-color: #FFFFF; padding: 16px; display: flex; justify-content: center; border-radius:14px;">
  <video src="https://github.com/writechoiceorg/yuno-images/raw/main/Insights/Video2.mov" loop autoplay muted playsinline style="width:100%; height:100%; border-radius:14px; display:block; object-fit:cover; background-color:rgba(0, 0, 0, 0); object-position:50% 50%; box-shadow: 0px 0px 0px 0px rgba(40, 42, 47, 0.05), 0px 3px 6px 0px rgba(40, 42, 47, 0.05), 0px 11px 11px 0px rgba(40, 42, 47, 0.04), 0px 25px 15px 0px rgba(40, 42, 47, 0.02), 0px 44px 18px 0px rgba(40, 42, 47, 0.01), 0px 69px 19px 0px rgba(40, 42, 47, 0.00);"></video>
</div>
`}</HTMLBlock>

**Managing SSO**

* **Disable SSO**: Administrators can go to the **Login methods** tab of the Security section to toggle SSO on and off.
* **View and edit configurations**: Admins may also modify the configuration in case of changes to the identity provider.

## Using SSO as an end user

Once configured, users will see a button to **Continue with SSO** on the Yuno login page:

![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXe-Fk00i8svq7UugqGxp5DzQOxatdRuwIM2oFH_NnJqS7cqEVo8GbvJzh0NrnkF3QMMWqYBSy6vG8wtE1qXibVmPXpxYC7TPQFjwnOQY_GiueV_Vz5tKfFT0a-FjlNHalgnQUv3CQ?key=2dldRk3J4b42VwoUCEVS3Lpu)

To access Yuno using SSO:

1. Enter your corporate email address and click **Continue with SSO**.
2. You will be redirected to the identity provider for authentication.
3. Upon successful authentication, you will gain access to the Yuno dashboard.
