---
title: Checkout (SDK)
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
Checkout is one of the workflow options provided by Yuno. Yuno's Checkout is a user-friendly, no-code UI optimized for Web and mobile devices, taking user experience to the highest level. Yuno's Checkout is available for Web, IOs, and Android.

[block:html]
{
  "html": "<body>\n  <section class=\"starting_cards\">\n    <div class=\"checkoutsdk_shelf\">\n      <a class=\"item_1\" onclick=\"window.location='get-your-api-credentials';\">\n        <div class=\"content\">\n          <div class=\"svg_container\">\n            <h2>Accessible</h2>\n            <svg class=\"arrow\" xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" fill=\"none\">\n              <path d=\"M24.75 8V21C24.75 21.1989 24.671 21.3897 24.5303 21.5303C24.3896 21.671 24.1989 21.75 24 21.75C23.8011 21.75 23.6103 21.671 23.4696 21.5303C23.329 21.3897 23.25 21.1989 23.25 21V9.81L8.52997 24.53C8.38779 24.6625 8.19975 24.7346 8.00545 24.7312C7.81115 24.7277 7.62576 24.649 7.48835 24.5116C7.35093 24.3742 7.27222 24.1888 7.26879 23.9945C7.26537 23.8002 7.33749 23.6122 7.46997 23.47L22.19 8.75H11C10.8011 8.75 10.6103 8.67098 10.4696 8.53033C10.329 8.38968 10.25 8.19891 10.25 8C10.25 7.80109 10.329 7.61032 10.4696 7.46967C10.6103 7.32902 10.8011 7.25 11 7.25H24C24.1989 7.25 24.3896 7.32902 24.5303 7.46967C24.671 7.61032 24.75 7.80109 24.75 8Z\" fill=\"#FCFCFF\"/>\n            </svg>\n          </div>\n          <p>\n            Responsive UX that presents the payment methods you choose, along with 3DS and checkout modules.\n          </p>\n        </div>\n      </a>\n      <a class=\"item_2\" onclick=\"window.location='set-up-initial-connections';\">\n        <div class=\"content\">\n          <div class=\"svg_container\">\n            <h2>Flexible</h2>\n            <svg class=\"arrow\" xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" fill=\"none\">\n              <path d=\"M24.75 8V21C24.75 21.1989 24.671 21.3897 24.5303 21.5303C24.3896 21.671 24.1989 21.75 24 21.75C23.8011 21.75 23.6103 21.671 23.4696 21.5303C23.329 21.3897 23.25 21.1989 23.25 21V9.81L8.52997 24.53C8.38779 24.6625 8.19975 24.7346 8.00545 24.7312C7.81115 24.7277 7.62576 24.649 7.48835 24.5116C7.35093 24.3742 7.27222 24.1888 7.26879 23.9945C7.26537 23.8002 7.33749 23.6122 7.46997 23.47L22.19 8.75H11C10.8011 8.75 10.6103 8.67098 10.4696 8.53033C10.329 8.38968 10.25 8.19891 10.25 8C10.25 7.80109 10.329 7.61032 10.4696 7.46967C10.6103 7.32902 10.8011 7.25 11 7.25H24C24.1989 7.25 24.3896 7.32902 24.5303 7.46967C24.671 7.61032 24.75 7.80109 24.75 8Z\" fill=\"#FCFCFF\"/>\n            </svg>\n          </div>\n          <p>\n            Customizable UI that enables an outstanding user experience.\n          </p>\n        </div>\n      </a>\n      <a class=\"item_3\" onclick=\"window.location='set-up-initial-connections';\">\n        <div class=\"content\">\n          <div class=\"svg_container\">\n            <h2>Secure</h2>\n            <svg class=\"arrow\" xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" fill=\"none\">\n              <path d=\"M24.75 8V21C24.75 21.1989 24.671 21.3897 24.5303 21.5303C24.3896 21.671 24.1989 21.75 24 21.75C23.8011 21.75 23.6103 21.671 23.4696 21.5303C23.329 21.3897 23.25 21.1989 23.25 21V9.81L8.52997 24.53C8.38779 24.6625 8.19975 24.7346 8.00545 24.7312C7.81115 24.7277 7.62576 24.649 7.48835 24.5116C7.35093 24.3742 7.27222 24.1888 7.26879 23.9945C7.26537 23.8002 7.33749 23.6122 7.46997 23.47L22.19 8.75H11C10.8011 8.75 10.6103 8.67098 10.4696 8.53033C10.329 8.38968 10.25 8.19891 10.25 8C10.25 7.80109 10.329 7.61032 10.4696 7.46967C10.6103 7.32902 10.8011 7.25 11 7.25H24C24.1989 7.25 24.3896 7.32902 24.5303 7.46967C24.671 7.61032 24.75 7.80109 24.75 8Z\" fill=\"#513CE1\"/>\n            </svg>\n          </div>\n          <p>\n            PCI Level 1 compliant with a centralized vault for recurring payments.\n          </p>\n        </div>\n      </a>\n    </div>\n  </section>\n  \n</body>"
}
[/block]

With Yuno's Checkout, you can easily process "One-shot" payments or capture your clients' payment method information for future purchases and offer a seamless one-click experience.

### Available SDK integrations

Yuno offers three Checkout SDK variations so you can choose the one that best fits your company's business needs. 

- [**Full Checkout**](doc:the-ultimate-checkout-full): The Full Checkout SDK is the easier integration option provided by Yuno. The Full Checkout renders all company's payment methods available in the user profile to enable payment methods enrollment and at the checkout. You will not have PCI compliance requirements by choosing the Full Checkout integration.
- [**Lite Checkout**](doc:the-ultimate-checkout-lite): The Lite Checkout integration is almost as simple as Full Checkout. With the Lite Checkout SDK, you can access a service that lists available payment methods for payment and enrollment. You will decide which payment methods are displayed to the user. You will not have PCI compliance requirements by choosing the Lite Checkout integration.
- [**Secure Fields**](doc:secure-fields): Secure Fields is a simpler integration option. This option ensures PCI compliance by securely handling sensitive data, but you must provide an Annual Self-Assessment Questionnaire (SAQ) A. It offers a pre-built UI that can be customized to match the brand's identity, allowing businesses to create a unique checkout experience without needing PCI compliance.

### Yuno Checkout advantages

- **Diverse Payment Methods**: Yuno provides multiple payment options and tools.
- **Tokenization**: Yuno ensures the utmost security for your customers' sensitive data by tokenizing payment data and safeguarding their information.
- **Seamless 3D-Secure Authentication**: Yuno effortlessly manages complex 3D-Secure authentication flows, guaranteeing your customers a smooth and hassle-free checkout experience.
- **Streamlined APM Redirection**: Yuno effectively handles redirection flows for Alternative Payment Methods (APMs), simplifying the process and optimizing user experience.
- **Brand Customization**: With Yuno, you can customize the appearance and feel of your checkout interface, ensuring a consistent experience that aligns with your business identity.

### Payment method tokenization

By communicating directly with Yuno's PCI-L1 tokenization service, the Checkout integrations save sensitive customer data into a secure token called `payment_method_token`. This process works for customers' credit card data and wallet payments, such as MercadoPago, Paypal, and others. 

With the `payment_method_token` you can offer your customer a fast checkout experience, handle retries and fallbacks, and accept recurring payments in the future.

### Customization

Yuno's SDKs let you control the payment workflow and use our UI/UX. In addition, you can customize the appearance to adapt the SDK to your business model's special needs. Some of the customization options are:

- **Language**: Can be Spanish, English, or Portuguese. 
- **ShowLoading**: Choose to show or not the loading page. 
- **Render mode**: Choose between modal or element rendering.
- **Card form**: Render the credit card form as a single or step-by-step form.
- **Card save enabled**: Your customers can save their cards for future purchases (enroll).
- **Payment method by default**: Define a default payment method when mounting Yuno's SDK.