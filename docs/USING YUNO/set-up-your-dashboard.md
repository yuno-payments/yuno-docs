---
title: Set Up Your Dashboard
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
As presented in the [Quickstart](doc:quickstart) page, the first step to start integrating with Yuno is to have access to the [Yuno Merchant Dashboard](https://auth.y.uno/u/login?). From there, you will be able to get your credentials and set up essential configurations, such as connections, smart routing, and checkout builder.  

<HTMLBlock>{`
<body>
  <section class="starting_cards">
    <div class="first_shelf">
      <a class="item_1" onclick="window.location='authentication-credentials';">
        <div class="content">
          <div class="svg_container">
            <svg xmlns="http://www.w3.org/2000/svg" width="43" height="43" viewBox="0 0 43 43" fill="none">
              <path d="M26.875 2.6875C24.7541 2.6894 22.6637 3.19288 20.7745 4.15682C18.8853 5.12077 17.2508 6.51785 16.0045 8.234C14.7583 9.95015 13.9356 11.9367 13.6036 14.0315C13.2716 16.1263 13.4397 18.2699 14.0943 20.2873L4.4243 29.9555C4.29955 30.0804 4.20063 30.2287 4.13319 30.3918C4.06575 30.5549 4.03111 30.7297 4.03125 30.9062V37.625C4.03125 37.9814 4.17282 38.3232 4.42483 38.5752C4.67683 38.8272 5.01862 38.9688 5.375 38.9688H12.0938C12.4501 38.9688 12.7919 38.8272 13.0439 38.5752C13.2959 38.3232 13.4375 37.9814 13.4375 37.625V34.9375H16.125C16.4814 34.9375 16.8232 34.7959 17.0752 34.5439C17.3272 34.2919 17.4688 33.9501 17.4688 33.5938V30.9062H20.1562C20.3328 30.9064 20.5076 30.8717 20.6707 30.8043C20.8338 30.7369 20.9821 30.6379 21.107 30.5132L22.7127 28.9057C24.5596 29.5054 26.5145 29.6976 28.4427 29.4692C30.371 29.2409 32.2269 28.5973 33.8826 27.5828C35.5383 26.5684 36.9544 25.2072 38.0336 23.5929C39.1127 21.9786 39.8292 20.1496 40.1336 18.2319C40.438 16.3141 40.3233 14.3532 39.7971 12.4841C39.271 10.615 38.3461 8.88206 37.086 7.40471C35.8258 5.92736 34.2605 4.74066 32.4978 3.92632C30.735 3.11198 28.8168 2.68934 26.875 2.6875ZM30.2344 15.4531C29.7028 15.4531 29.1832 15.2955 28.7413 15.0002C28.2993 14.7049 27.9549 14.2852 27.7514 13.7941C27.548 13.303 27.4948 12.7626 27.5985 12.2413C27.7022 11.72 27.9582 11.2411 28.334 10.8653C28.7099 10.4894 29.1887 10.2335 29.7101 10.1298C30.2314 10.0261 30.7718 10.0793 31.2628 10.2827C31.7539 10.4861 32.1736 10.8306 32.469 11.2725C32.7643 11.7145 32.9219 12.2341 32.9219 12.7656C32.9219 13.4784 32.6387 14.162 32.1347 14.666C31.6307 15.17 30.9471 15.4531 30.2344 15.4531Z" fill="#513CE1"/>
            </svg>
            <svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M24.75 8V21C24.75 21.1989 24.671 21.3897 24.5303 21.5303C24.3896 21.671 24.1989 21.75 24 21.75C23.8011 21.75 23.6103 21.671 23.4696 21.5303C23.329 21.3897 23.25 21.1989 23.25 21V9.81L8.52997 24.53C8.38779 24.6625 8.19975 24.7346 8.00545 24.7312C7.81115 24.7277 7.62576 24.649 7.48835 24.5116C7.35093 24.3742 7.27222 24.1888 7.26879 23.9945C7.26537 23.8002 7.33749 23.6122 7.46997 23.47L22.19 8.75H11C10.8011 8.75 10.6103 8.67098 10.4696 8.53033C10.329 8.38968 10.25 8.19891 10.25 8C10.25 7.80109 10.329 7.61032 10.4696 7.46967C10.6103 7.32902 10.8011 7.25 11 7.25H24C24.1989 7.25 24.3896 7.32902 24.5303 7.46967C24.671 7.61032 24.75 7.80109 24.75 8Z" fill="#513CE1"/>
            </svg>
          </div>
          <h2>1. Authentication Credentials</h2>
          <p>
            Obtain the API credentials in the Yuno Dashboard. They are used to authenticate your operations.
          </p>
        </div>
      </a>
      <a class="item_2" onclick="window.location='connections';">
        <div class="content">
          <div class="svg_container">
            <h2>2. Connections</h2>
            <svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M24.75 8V21C24.75 21.1989 24.671 21.3897 24.5303 21.5303C24.3896 21.671 24.1989 21.75 24 21.75C23.8011 21.75 23.6103 21.671 23.4696 21.5303C23.329 21.3897 23.25 21.1989 23.25 21V9.81L8.52997 24.53C8.38779 24.6625 8.19975 24.7346 8.00545 24.7312C7.81115 24.7277 7.62576 24.649 7.48835 24.5116C7.35093 24.3742 7.27222 24.1888 7.26879 23.9945C7.26537 23.8002 7.33749 23.6122 7.46997 23.47L22.19 8.75H11C10.8011 8.75 10.6103 8.67098 10.4696 8.53033C10.329 8.38968 10.25 8.19891 10.25 8C10.25 7.80109 10.329 7.61032 10.4696 7.46967C10.6103 7.32902 10.8011 7.25 11 7.25H24C24.1989 7.25 24.3896 7.32902 24.5303 7.46967C24.671 7.61032 24.75 7.80109 24.75 8Z" fill="#FCFCFF"/>
            </svg>
          </div>
          <p>
            Select the payment methods and providers you want to connect to your Yuno account. Here you'll provide the details required by each connection. 
          </p>
        </div>
      </a>
    </div>

    <div class="second_shelf">
      <a class="item_3" onclick="window.location='configure-dynamic-routing';">
        <div class="content">
          <div class="svg_container">
            <h2>3. Configure Smart Routing</h2>
            <svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M24.75 8V21C24.75 21.1989 24.671 21.3897 24.5303 21.5303C24.3896 21.671 24.1989 21.75 24 21.75C23.8011 21.75 23.6103 21.671 23.4696 21.5303C23.329 21.3897 23.25 21.1989 23.25 21V9.81L8.52997 24.53C8.38779 24.6625 8.19975 24.7346 8.00545 24.7312C7.81115 24.7277 7.62576 24.649 7.48835 24.5116C7.35093 24.3742 7.27222 24.1888 7.26879 23.9945C7.26537 23.8002 7.33749 23.6122 7.46997 23.47L22.19 8.75H11C10.8011 8.75 10.6103 8.67098 10.4696 8.53033C10.329 8.38968 10.25 8.19891 10.25 8C10.25 7.80109 10.329 7.61032 10.4696 7.46967C10.6103 7.32902 10.8011 7.25 11 7.25H24C24.1989 7.25 24.3896 7.32902 24.5303 7.46967C24.671 7.61032 24.75 7.80109 24.75 8Z" fill="#513CE1"/>
            </svg>
          </div>
          <p>
            Define business rules and create payment flow to automate payment validation and processing.
          </p>
        </div>
      </a>

      <a class="item_4" onclick="window.location='manage-your-checkout';">
        <div class="content">
          <div class="svg_container">
            <h2>4. Manage your Checkout</h2>
            <svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M24.75 8V21C24.75 21.1989 24.671 21.3897 24.5303 21.5303C24.3896 21.671 24.1989 21.75 24 21.75C23.8011 21.75 23.6103 21.671 23.4696 21.5303C23.329 21.3897 23.25 21.1989 23.25 21V9.81L8.52997 24.53C8.38779 24.6625 8.19975 24.7346 8.00545 24.7312C7.81115 24.7277 7.62576 24.649 7.48835 24.5116C7.35093 24.3742 7.27222 24.1888 7.26879 23.9945C7.26537 23.8002 7.33749 23.6122 7.46997 23.47L22.19 8.75H11C10.8011 8.75 10.6103 8.67098 10.4696 8.53033C10.329 8.38968 10.25 8.19891 10.25 8C10.25 7.80109 10.329 7.61032 10.4696 7.46967C10.6103 7.32902 10.8011 7.25 11 7.25H24C24.1989 7.25 24.3896 7.32902 24.5303 7.46967C24.671 7.61032 24.75 7.80109 24.75 8Z" fill="#513CE1"/>
            </svg>
          </div>
          <p>
            Select the payment methods available for your customers using a graphical interface.
          </p>
        </div>
      </a>
    </div>
  </section>
  
</body>
`}</HTMLBlock>

{/*sssssss*/}

{/*Yuno simplifies the process of creating and overseeing team members to enhance your security measures. Utilizing the Yuno Merchant Dashboard, you can effortlessly add members and regulate their roles, ensuring appropriate access levels for each individual. The role allocated to each user determines their permissions within the Yuno system. Check the [Manage Members]() page for additional information........*/}

{/*sssssss*/}

{/*Yuno Docs is built with Readme.io, which enables our documentation to provide references and examples for developers. Here in our documentation, you can test requests directly through your web browser. If it is your first time using Readme.io or you need guidance on how to get code examples and test requests, please, access [How to Use Yuno Docs]() for instructions........*/}
