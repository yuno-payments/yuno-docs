---
title: Bolivia
fullscreen: false
hidden: true
metadata:
  title: ''
  description: ''
---
<HTMLBlock>{`
<style>
 
  #content-head {
    display: none !important;
  }

  .shelf-country-connections {
    margin: 2rem 0rem;
  }

  .country-connections-card {
    border-radius: 10px;
  }

  .country-connections-card .country-connections-card-header {
    display: flex;
    align-items: center;
  }

  .country-connections-card .country-connections-card-header h2 {
    margin: 30px 0 0 10px;
  }

  .country-connections-card .country-connections-card-logo {
    max-width: 50px;
    margin: 30px 0 0 30px;
  }

  .detail-country-connections-card {
    padding: 0px 30px 30px 30px;
  }

  .detail-country-connections-card-title .title {
    margin: 2rem 0 1rem 0;
    font-weight: 600;
    font-size: 0.85rem;
    color: var(--yuno-black-text);
    border-bottom: 1px solid #BABABA;
    padding-bottom: 4px !important;
  }



  .detail-country-connections-card-content {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: 1fr;
    column-gap: 7px;
    row-gap: 7px;
    align-items: center;
    font-size: 0.85rem;
  }

  @media only screen and (max-width: 1100px) {
    .detail-country-connections-card-content {
      grid-template-columns: repeat(5, 1fr);
    }
  }

  @media only screen and (max-width: 950px) {
    .detail-country-connections-card-content {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  @media only screen and (max-width: 750px) {
    .detail-country-connections-card-content {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media only screen and (max-width: 650px) {
    .detail-country-connections-card-content {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media only screen and (max-width: 400px) {
    .detail-country-connections-card-content {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  .details-card {
    border: 1px solid var(--yuno-purple-50);
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0.6rem;
    border-radius: 7px;
  }

  .details-card-on-click-effects {
    cursor: pointer;
  }

  .details-card-on-click-effects:hover {
    transform: scale(1.02);
    box-shadow: 0 5px 5px var(--yuno-purple-10);
  }

  .details-card .card-logo div {
    height: 23px;
    width: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .details-card .card-name {
    grid-area: name;
    align-self: center;
  }

  .details-card img {
    max-height: 23px;
    max-width: 23px;
  }

  .details-card .card-title {
    display: block;
    padding: 0;
    margin: 0;
  }
</style>

<body class="custom-page-country">
  <div class="shelf-country-connections">
    <div class=" country-connections-card">
      <div class="country-connections-card-header">
        <img class="country-connections-card-logo" src="https://img.icons8.com/color/452/bolivia-circular.png">
        <h2>Available Connections in Bolivia</h2>
      </div>
      <section class="detail-country-connections-card ">
        <div class="detail-country-connections-card-title">
          <!-- <div class="icon sumary-icon"
           style="background-image: url('https://raw.githubusercontent.com/cassianomoraes/yuno_card_images/09baa05c6ec36a37a0d41c8f6ddd3e5abcf623a2/yuno-icons/webpage.svg')">
         </div> -->
          <p class="title">Processors</p>
        </div>
        <div class="detail-country-connections-card-content">
          <div class="details-card details-card-on-click-effects" onclick="window.location='https://docs.y.uno/docs/dlocal';">
            <div class="card-logo">
              <div>
                <img src="https://icons.prod.y.uno/dlocal_logosimbolo.png" alt="dlocal logo">
              </div>
            </div>
            <div class="card-name">
              <span class='card-title'>
                dLocal
              </span>
            </div>
          </div>
          <div class="details-card details-card-on-click-effects"
            onclick="window.location='https://docs.y.uno/docs/worldpay';">
            <div class="card-logo">
              <div>
                <img src="https://icons.prod.y.uno/worldpay_logosimbolo.png" alt="worldpay logo">
              </div>
            </div>
            <div class="card-name">
              <span class='card-title'>
                Worldpay
              </span>
            </div>
          </div>
        </div>
        <div class="detail-country-connections-card-title">
          <!-- <div class="icon sumary-icon"
           style="background-image: url('https://raw.githubusercontent.com/cassianomoraes/yuno_card_images/4baa08426d27941706d05b5c61e7b2e2dcc5c22b/yuno-icons/development.svg')">
         </div> -->
          <p class="title">Payment Methods</p>
        </div>
        <div class="detail-country-connections-card-content">
          <div class="details-card details-card-on-click-effects"
            onclick="window.location='https://docs.y.uno/docs/paypal';">
            <div class="card-logo">
              <div>
                <img src="https://icons.prod.y.uno/paypal_logosimbolo.png" alt="paypal logo">
              </div>
            </div>
            <div class="card-name">
              <span class='card-title'>
                PayPal
              </span>
            </div>
          </div>
        </div>
        
        <div class="detail-country-connections-card-title">
          <!-- <div class="icon sumary-icon"
           style="background-image: url('https://raw.githubusercontent.com/cassianomoraes/yuno_card_images/b9c6c343a13b3814cf4f70099fe2a0dfb17b1a16/yuno-icons/money.svg')">
         </div> -->
          <p class="title">Fraud Prevention</p>
        </div>
        <div class="detail-country-connections-card-content">
          <div class="details-card details-card-on-click-effects"
            onclick="window.location='https://docs.y.uno/docs/clearsale';">
            <div class="card-logo">
              <div>
                <img src="https://icons.prod.y.uno/clearsale_logosimbolo.png
                            " alt="ClearSale logo">
              </div>
            </div>
            <span class='card-title'>
              ClearSale
            </span>
          </div>
          <div class="details-card details-card-on-click-effects"
            onclick="window.location='https://docs.y.uno/docs/cybersource';">
            <div class="card-logo">
              <div>
                <img src="https://icons.prod.y.uno/cybersource_logosimbolo.png
                            " alt="CyberSource logo">
              </div>
            </div>
            <span class='card-title'>
              CyberSource
            </span>
          </div>
        </div>
        </div>
      </section>
    </div>
  </div>
</body>
`}</HTMLBlock>
