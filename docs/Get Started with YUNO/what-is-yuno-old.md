---
title: What is Yuno?
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
Yuno is the ultimate payment orchestration solution to help you make online checkout fast, easy, and safe. Our ecosystem simplifies and scales payment integration and fraud management by providing you with dozens of connections through a single integration. By choosing Yuno, merchants step into a new era of:

* Multiple integrations
* One efficient, scalable checkout
* Graphical interface to define payment routing
* Simplified data reconciliation and reporting

### How it works

<Image align="center" src="https://files.readme.io/28a601c-what_is_yuno1.png" />

### With the Yuno platform, you will

<HTMLBlock>{`
<style>
  .card-whats-yuno-shelf {
    margin: 0 0 0 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-column-gap: 10px;
    grid-row-gap: 10px;
  }

  .card-whats-yuno {
    padding: 0.5rem;
    /* flex: 1; */

    border-radius: 7px;
    border: 1px solid var(--yuno-purple);
    transition: transform .1s;
    display: grid;
    grid-template-columns: 1fr 4fr;
    align-items: center;

  }

  .card-whats-yuno:hover {
    transform: scale(1.02);
    /* box-shadow: 0 5px 10px var(--yuno-purple-10); */
  }

  .card-whats-yuno svg {
    color: var(--yuno-purple);
    height: 45px;
    width: 45px;
    /* margin-right: 20px; */
    margin: auto;
  }


  .card-whats-yuno p {
    color: var(--yuno-purple);
    font-size: 0.95rem;
    font-weight: 600;
    margin: 0;
  }

  @media only screen and (max-width: 600px) {
    .card-whats-yuno-shelf {
      display: flex;
      flex-wrap: nowrap;
      flex-direction: column;
    }

   	.card-whats-yuno svg {
      height: 35px;
      width: 35px;
    }
  }
  
  /* ------------------------ define the configuration for DARK Mode ------------------------  */

  @media (prefers-color-scheme: dark) {
   .card-whats-yuno {
    	border: 2px solid var(--yuno-purple-50);
     	/*background-color: var(--yuno-white);*/
    }
    
    .card-whats-yuno svg {
      color: var(--yuno-purple-50);
    }

    .card-whats-yuno p {
      color: var(--yuno-purple-50);
    }
  }

  [data-color-mode="dark"] .card-whats-yuno {
    	border: 2px solid var(--yuno-purple-50);
     	/*background-color: var(--yuno-white);*/
    }
  
  [data-color-mode="dark"] .card-whats-yuno svg {
      color: var(--yuno-purple-50);
    }


  [data-color-mode="dark"] .card-whats-yuno p {
      color: var(--yuno-purple-50);
    }
</style>

<body>
  <section class="card-whats-yuno-shelf">
    <div class="card-whats-yuno">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256">
        <path
          d="M237.66,18.34a8,8,0,0,0-11.32,0l-52.4,52.41-5.37-5.38a32.05,32.05,0,0,0-45.26,0L100,88.69l-6.34-6.35A8,8,0,0,0,82.34,93.66L88.69,100,65.37,123.31a32,32,0,0,0,0,45.26l5.38,5.37-52.41,52.4a8,8,0,0,0,11.32,11.32l52.4-52.41,5.37,5.38a32,32,0,0,0,45.26,0L156,167.31l6.34,6.35a8,8,0,0,0,11.32-11.32L167.31,156l23.32-23.31a32,32,0,0,0,0-45.26l-5.38-5.37,52.41-52.4A8,8,0,0,0,237.66,18.34Zm-116.29,161a16,16,0,0,1-22.62,0L76.69,157.25a16,16,0,0,1,0-22.62L100,111.31,144.69,156Zm57.94-57.94L156,144.69,111.31,100l23.32-23.31a16,16,0,0,1,22.62,0l22.06,22A16,16,0,0,1,179.31,121.37ZM88.41,34.53a8,8,0,0,1,15.18-5.06l8,24a8,8,0,0,1-15.18,5.06Zm-64,58.94a8,8,0,0,1,10.12-5.06l24,8a8,8,0,0,1-5.06,15.18l-24-8A8,8,0,0,1,24.41,93.47Zm207.18,69.06a8,8,0,0,1-10.12,5.06l-24-8a8,8,0,0,1,5.06-15.18l24,8A8,8,0,0,1,231.59,162.53Zm-64,58.94a8,8,0,0,1-15.18,5.06l-8-24a8,8,0,0,1,15.18-5.06Z">
        </path>
      </svg>
      <!-- <img
        src="https://raw.githubusercontent.com/cassianomoraes/yuno_card_images/main/whats-yuno-page-icons/connections.png"
        width="50" height="50"> -->
      <p> Easily connect to payment methods and payment processors </p>
    </div>
    <div class="card-whats-yuno">
      <!-- <img
        src="https://raw.githubusercontent.com/cassianomoraes/yuno_card_images/main/whats-yuno-page-icons/metrics.png"
        width="50" height="50"> -->
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256">
        <path
          d="M224,128a8,8,0,0,1-8,8H128a8,8,0,0,1,0-16h88A8,8,0,0,1,224,128ZM128,72h88a8,8,0,0,0,0-16H128a8,8,0,0,0,0,16Zm88,112H128a8,8,0,0,0,0,16h88a8,8,0,0,0,0-16ZM82.34,42.34,56,68.69,45.66,58.34A8,8,0,0,0,34.34,69.66l16,16a8,8,0,0,0,11.32,0l32-32A8,8,0,0,0,82.34,42.34Zm0,64L56,132.69,45.66,122.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32,0l32-32a8,8,0,0,0-11.32-11.32Zm0,64L56,196.69,45.66,186.34a8,8,0,0,0-11.32,11.32l16,16a8,8,0,0,0,11.32,0l32-32a8,8,0,0,0-11.32-11.32Z">
        </path>
      </svg>
      <p> Track all metrics using one dashboard </p>
    </div>
    <div class="card-whats-yuno">
      <!-- <img
        src="https://raw.githubusercontent.com/cassianomoraes/yuno_card_images/main/whats-yuno-page-icons/history.png"
        width="50" height="50"> -->
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256">
        <path
          d="M136,80v43.47l36.12,21.67a8,8,0,0,1-8.24,13.72l-40-24A8,8,0,0,1,120,128V80a8,8,0,0,1,16,0Zm-8-48A95.44,95.44,0,0,0,60.08,60.15C52.81,67.51,46.35,74.59,40,82V64a8,8,0,0,0-16,0v40a8,8,0,0,0,8,8H72a8,8,0,0,0,0-16H49c7.15-8.42,14.27-16.35,22.39-24.57a80,80,0,1,1,1.66,114.75,8,8,0,1,0-11,11.64A96,96,0,1,0,128,32Z">
        </path>
      </svg>
      <p> Store your payments history in one place </p>
    </div>
    <div class="card-whats-yuno">
      <!-- <img
        src="https://raw.githubusercontent.com/cassianomoraes/yuno_card_images/main/whats-yuno-page-icons/low-code.png"
        width="50" height="50"> -->
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256">
        <path
          d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,160H40V56H216V200ZM80,84A12,12,0,1,1,68,72,12,12,0,0,1,80,84Zm40,0a12,12,0,1,1-12-12A12,12,0,0,1,120,84Z">
        </path>
      </svg>
      <p> Use low-code to configure and integrate the checkout </p>
    </div>
    <div class="card-whats-yuno">
      <!-- <img
        src="https://raw.githubusercontent.com/cassianomoraes/yuno_card_images/main/whats-yuno-page-icons/control-payment-methods.png"
        width="50" height="50"> -->
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256">
        <path
          d="M216,40H72A16,16,0,0,0,56,56V72H40A16,16,0,0,0,24,88V200a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16V184h16a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM184,88v16H40V88Zm0,112H40V120H184v80Zm32-32H200V88a16,16,0,0,0-16-16H72V56H216Z">
        </path>
      </svg>
      <p> Control available payment methods, accepted currencies, and more using intuitive panels </p>
    </div>
    <div class="card-whats-yuno">
      <!-- <img
        src="https://raw.githubusercontent.com/cassianomoraes/yuno_card_images/main/whats-yuno-page-icons/improve-user-experience.png"
        width="50" height="50"> -->
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256">
        <path
          d="M238.64,33.36a32,32,0,0,0-45.26,0h0a32,32,0,0,0,0,45.26c.29.29.6.57.9.85l-26.63,49.46a32.19,32.19,0,0,0-23.9,3.5l-20.18-20.18a32,32,0,0,0-50.2-38.89h0a32,32,0,0,0,0,45.26c.29.29.59.57.89.85L47.63,168.94a32,32,0,0,0-30.27,8.44h0a32,32,0,1,0,45.26,0c-.29-.29-.6-.57-.9-.85l26.63-49.46A32.4,32.4,0,0,0,96,128a32,32,0,0,0,16.25-4.41l20.18,20.18a32,32,0,1,0,50.2-6.38c-.29-.29-.59-.57-.89-.85l26.63-49.46A32.33,32.33,0,0,0,216,88a32,32,0,0,0,22.63-54.62ZM51.3,211.33a16,16,0,0,1-22.63-22.64h0A16,16,0,1,1,51.3,211.33Zm33.38-104a16,16,0,0,1,0-22.63h0a16,16,0,1,1,0,22.63Zm86.64,64a16,16,0,0,1-22.63-22.63h0a16,16,0,0,1,22.63,22.63Zm56-104A16,16,0,1,1,204.7,44.67h0a16,16,0,0,1,22.63,22.64Z">
        </path>
      </svg>
      <p> Improve user experience and boost conversion rate automatically using Smart Routing </p>
    </div>

  </section>
</body>
`}</HTMLBlock>
