---
title: Secure Fields (OLD)
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
Secure Fields creates a seamless and secure checkout flow on your website or app. With a set of prebuilt UI components available for Web, Android, and iOS, Secure Fields simplifies the process of collecting and tokenizing sensitive payment details, all without compromising the security of your server.

When collecting client card information, Secure Fields offers a comprehensive set of prebuilt UI components to streamline the payment process. With fields for the card number, ZIP code, and expiration date, this optimized payment form ensures a hassle-free experience for your customers. Moreover, Secure Fields automatically validates and formats the input as customers type, minimizing errors and enhancing usability.

<Image align="center" width="350px" src="https://files.readme.io/e680627-Untitled.png" />

Secure Fields allows you to customize the UI, ensuring that the design matches the look and feel of your website or app. Custom styling rules give you complete control over the visual appearance, providing a cohesive and professional user interface and maintaining a consistent brand experience. Maintaining a consistent visual identity can reinforce your brand presence throughout checkout, fostering trust and recognition. 

Secure Fields lets you choose which fields to present to your customers. This allows you to create a checkout that offers a tailored and intuitive payment experience. In addition, to enhance the user experience and minimize errors, Secure Fields includes built-in features to guide your customers through the checkout process. Incomplete fields and potential filling errors are highlighted, ensuring customers complete the necessary information accurately and efficiently.

To keep your customers' payment information secure, Secure Fields strictly adheres to PCI security standards, eliminating your need to handle sensitive data. By tokenizing payment details, we ensure that card information never touches your server, protecting against potential data breaches.

With Secure Fields and Yuno UI Components, you can elevate your checkout experience to new heights. Simplify payment collection, enhance security, and create a seamless process that delights your customers.

### Choose a platform below to start building your integration

<HTMLBlock>{`
<style>
  .secure-fields-buttons-shelf {
    display: flex;
    justify-content: space-evenly;
    gap: 5%;

  }

  .secure-fields-buttons {
    
    padding: 10px;
    flex: 1;
    
    border-radius: 7px;
    border: 1px solid var(--yuno-purple);
    transition: transform .2s;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .secure-fields-buttons:hover {
    transform: scale(1.02);
    box-shadow: 0 5px 5px var(--yuno-purple-10);
    cursor: pointer;
  }

  .secure-fields-buttons svg {
    color: var(--yuno-purple);
    height: 25px;
    width: 25px;
    margin-bottom: 15px;
  }

  .secure-fields-buttons h3 {
    font-size: 0.8rem;
    color: var(--yuno-purple);
    margin: 0 0 0 0;
    display: flex;
    align-items: center;
  }
  
  
  /* ------------------------ define the configuration for DARK Mode ------------------------  */

  @media (prefers-color-scheme: dark) {
    .secure-fields-buttons {
      border: 1px solid var(--yuno-purple-50);
    }

    .secure-fields-buttons:hover {
      box-shadow: none;
    }

    .secure-fields-buttons svg {
      color: var(--yuno-purple-50);
    }

    .secure-fields-buttons h3 {
      color: var(--yuno-purple-50);
    }
  }

  [data-color-mode="dark"] .secure-fields-buttons {
      border: 1px solid var(--yuno-purple-50);
    }

  [data-color-mode="dark"]  .secure-fields-buttons:hover {
      box-shadow: none;
    }

  [data-color-mode="dark"]  .secure-fields-buttons svg {
      color: var(--yuno-purple-50);
    }

  [data-color-mode="dark"]  .secure-fields-buttons h3 {
      color: var(--yuno-purple-50);
    }
</style>

<body>
  <section class="secure-fields-buttons-shelf">
    <div class="secure-fields-buttons" onclick="window.location='https://docs.y.uno/v2.0/docs/web-sdk-integration#use-checkout-secure-fields';">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-globe"
        viewBox="0 0 16 16">
        <path
          d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
      </svg>
      <h3>
        Web
      </h3>
    </div>
    <div class="secure-fields-buttons" onclick="window.location='https://docs.y.uno/v2.0/docs/ios-sdk-integration';">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-apple"
        viewBox="0 0 16 16">
        <path
          d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z" />
        <path
          d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z" />
      </svg>
      <h3>
        iOS
      </h3>
    </div>
    <div class="secure-fields-buttons" onclick="window.location='https://docs.y.uno/v2.0/docs/android-sdk-integration#secure-fields-create-your-own-card-form-flow';">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-android2"
        viewBox="0 0 16 16">
        <path
          d="m10.213 1.471.691-1.26c.046-.083.03-.147-.048-.192-.085-.038-.15-.019-.195.058l-.7 1.27A4.832 4.832 0 0 0 8.005.941c-.688 0-1.34.135-1.956.404l-.7-1.27C5.303 0 5.239-.018 5.154.02c-.078.046-.094.11-.049.193l.691 1.259a4.25 4.25 0 0 0-1.673 1.476A3.697 3.697 0 0 0 3.5 5.02h9c0-.75-.208-1.44-.623-2.072a4.266 4.266 0 0 0-1.664-1.476ZM6.22 3.303a.367.367 0 0 1-.267.11.35.35 0 0 1-.263-.11.366.366 0 0 1-.107-.264.37.37 0 0 1 .107-.265.351.351 0 0 1 .263-.11c.103 0 .193.037.267.11a.36.36 0 0 1 .112.265.36.36 0 0 1-.112.264Zm4.101 0a.351.351 0 0 1-.262.11.366.366 0 0 1-.268-.11.358.358 0 0 1-.112-.264c0-.103.037-.191.112-.265a.367.367 0 0 1 .268-.11c.104 0 .19.037.262.11a.367.367 0 0 1 .107.265c0 .102-.035.19-.107.264ZM3.5 11.77c0 .294.104.544.311.75.208.204.46.307.76.307h.758l.01 2.182c0 .276.097.51.292.703a.961.961 0 0 0 .7.288.973.973 0 0 0 .71-.288.95.95 0 0 0 .292-.703v-2.182h1.343v2.182c0 .276.097.51.292.703a.972.972 0 0 0 .71.288.973.973 0 0 0 .71-.288.95.95 0 0 0 .292-.703v-2.182h.76c.291 0 .54-.103.749-.308.207-.205.311-.455.311-.75V5.365h-9v6.404Zm10.495-6.587a.983.983 0 0 0-.702.278.91.91 0 0 0-.293.685v4.063c0 .271.098.501.293.69a.97.97 0 0 0 .702.284c.28 0 .517-.095.712-.284a.924.924 0 0 0 .293-.69V6.146a.91.91 0 0 0-.293-.685.995.995 0 0 0-.712-.278Zm-12.702.283a.985.985 0 0 1 .712-.283c.273 0 .507.094.702.283a.913.913 0 0 1 .293.68v4.063a.932.932 0 0 1-.288.69.97.97 0 0 1-.707.284.986.986 0 0 1-.712-.284.924.924 0 0 1-.293-.69V6.146c0-.264.098-.491.293-.68Z" />
      </svg>
      <h3>
        Android
      </h3>
    </div>
  </section>
</body>
`}</HTMLBlock>

<HTMLBlock>{`
<style>
  .navigation-button-shelf {
    margin: 0 0 0 0;
    display: flex;
    justify-content: flex-end;
  }

  .navigation-button {
    padding: 0.3rem;
    border-radius: 5px;
    border: 1px solid var(--yuno-purple);
    transition: transform .2s;
    display: flex;
    flex-direction: row;
  }

  .navigation-button:hover {
    transform: scale(1.02);
    box-shadow: 0 5px 5px var(--yuno-purple-10);
    cursor: pointer;
  }

  .navigation-button svg {
    color: var(--yuno-purple);
    height: 25px;
    width: 25px;
  }

  .navigation-button h4 {
    font-size: 0.8rem;
    color: var(--yuno-purple);
    margin: 0 0 0 10px;
    display: flex;
    align-items: center;
  }

  @media only screen and (max-width: 600px) {
    .navigation-button h4 {
      font-size: 0.7rem;
    }

    .navigation-button svg {
      color: var(--yuno-purple);
      height: 20px;
      width: 20px;
    }
  }
  
  /* ------------------------ define the configuration for DARK Mode ------------------------  */

  @media (prefers-color-scheme: dark) {
    .navigation-button {
      border: 1px solid var(--yuno-purple-50);
    }

    .navigation-button:hover {
      box-shadow: none;
    }

    .navigation-button svg {
      color: var(--yuno-purple-50);
    }
    
     .navigation-button h4 {
      color: var(--yuno-purple-50);
    }
  }

  [data-color-mode="dark"] .navigation-button {
      border: 1px solid var(--yuno-purple-50);
    }

   [data-color-mode="dark"] .navigation-button:hover {
      box-shadow: none;
    }

   [data-color-mode="dark"] .navigation-button svg {
      color: var(--yuno-purple-50);
    }
  
   [data-color-mode="dark"] .navigation-button h4 {
      color: var(--yuno-purple-50);
    }
</style>

<body>
  <br />
  <br />
  <section class="navigation-button-shelf">
    <div class="navigation-button" onclick="window.location='https://forms.gle/ufNUzah5hAqjhKPi7';">
     <?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
<path style="fill:#303C42;" d="M426.667,21.333h-384C19.146,21.333,0,40.469,0,64v416c0,4.313,2.604,8.208,6.583,9.854
	c1.312,0.552,2.708,0.813,4.083,0.813c2.771,0,5.5-1.083,7.542-3.125L121.75,384h304.917c23.521,0,42.667-19.135,42.667-42.667V64
	C469.333,40.469,450.188,21.333,426.667,21.333z"/>
<path style="fill:#15BEF0;" d="M448,341.333c0,11.76-9.563,21.333-21.333,21.333H117.333c-2.833,0-5.542,1.125-7.542,3.125
	L21.333,454.25V64c0-11.76,9.563-21.333,21.333-21.333h384C438.438,42.667,448,52.24,448,64V341.333z"/>
<path style="opacity:0.1;enable-background:new    ;" d="M426.667,42.667v245.839c0,29.176-23.652,52.828-52.828,52.828H96
	c-2.829,0-5.542,1.124-7.542,3.124l-36.955,36.956c-19.317,19.318-30.17,45.518-30.17,72.837v0l88.46-88.46
	c2-2,4.712-3.123,7.54-3.123h309.333c11.782,0,21.333-9.551,21.333-21.333V64C448,52.24,438.438,42.667,426.667,42.667z"/>
<g>
	<path style="fill:#303C42;" d="M352,149.333H117.333c-5.896,0-10.667-4.771-10.667-10.667S111.438,128,117.333,128H352
		c5.896,0,10.667,4.771,10.667,10.667S357.896,149.333,352,149.333z"/>
	<path style="fill:#303C42;" d="M330.646,213.333H117.333c-5.896,0-10.667-4.771-10.667-10.667S111.438,192,117.333,192h213.313
		c5.896,0,10.667,4.771,10.667,10.667S336.542,213.333,330.646,213.333z"/>
	<path style="fill:#303C42;" d="M245.333,277.333h-128c-5.896,0-10.667-4.771-10.667-10.667c0-5.896,4.771-10.667,10.667-10.667h128
		c5.896,0,10.667,4.771,10.667,10.667C256,272.563,251.229,277.333,245.333,277.333z"/>
	<path style="fill:#303C42;" d="M471.167,64c-10.771,0-21.292,4.365-28.875,11.958L312.458,205.771c-1.5,1.49-2.5,3.385-2.917,5.448
		l-10.667,53.354c-0.708,3.5,0.396,7.115,2.917,9.635c2.021,2.021,4.75,3.125,7.542,3.125c0.688,0,1.396-0.073,2.083-0.208
		l53.313-10.667c2.083-0.417,3.979-1.427,5.458-2.917l106.676-106.659c0,0,0.008-0.004,0.012-0.008s0.004-0.007,0.004-0.007
		l23.163-23.16c0,0,0,0,0-0.01c7.604-7.604,11.958-18.125,11.958-28.865C512,82.313,493.688,64,471.167,64z"/>
</g>
<polygon style="fill:#FFFFFF;" points="357.396,246.177 322.938,253.073 329.833,218.573 426.661,121.745 454.249,149.332 "/>
<path style="fill:#FFCA28;" d="M484.958,118.625l-15.625,15.625l-27.589-27.589l15.63-15.63c3.625-3.615,8.646-5.698,13.792-5.698
	c10.75,0,19.5,8.75,19.5,19.5C490.667,109.958,488.583,114.99,484.958,118.625z"/>
<linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="-29.8042" y1="636.3796" x2="-24.6018" y2="631.1702" gradientTransform="matrix(21.3333 0 0 -21.3333 996.3334 13791.667)">
	<stop  offset="0" style="stop-color:#000000;stop-opacity:0.1"/>
	<stop  offset="1" style="stop-color:#000000;stop-opacity:0"/>
</linearGradient>
<path style="fill:url(#SVGID_1_);" d="M370.188,263.542c-1.479,1.49-3.375,2.5-5.458,2.917l-53.313,10.667
	c-0.688,0.135-1.396,0.208-2.083,0.208c-2.792,0-5.521-1.104-7.542-3.125l88.458,88.458h36.417c11.771,0,21.333-9.573,21.333-21.333
	V185.741L370.188,263.542z"/>
<linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="-48.4597" y1="640.1601" x2="-25.0701" y2="629.2543" gradientTransform="matrix(21.3333 0 0 -21.3333 996.3334 13791.667)">
	<stop  offset="0" style="stop-color:#FFFFFF;stop-opacity:0.2"/>
	<stop  offset="1" style="stop-color:#FFFFFF;stop-opacity:0"/>
</linearGradient>
<path style="fill:url(#SVGID_2_);" d="M471.167,64c-0.618,0-1.217,0.155-1.833,0.184V64c0-23.531-19.146-42.667-42.667-42.667h-384
	C19.146,21.333,0,40.469,0,64v416c0,4.313,2.604,8.208,6.583,9.854c1.312,0.552,2.708,0.813,4.083,0.813
	c2.771,0,5.5-1.083,7.542-3.125L121.75,384h304.917c23.521,0,42.667-19.135,42.667-42.667V164.411l7.53-7.529
	c0,0,0.008-0.004,0.012-0.008s0.004-0.007,0.004-0.007l23.163-23.16c0,0,0,0,0-0.01c7.604-7.604,11.958-18.125,11.958-28.865
	C512,82.313,493.688,64,471.167,64z"/>
</svg>
      <h4>
        Send feedback
      </h4>
    </div>
  </section>
</body>
`}</HTMLBlock>
