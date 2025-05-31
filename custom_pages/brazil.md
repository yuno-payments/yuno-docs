---
title: Brazil
fullscreen: false
hidden: true
metadata:
  title: ''
  description: ''
---
<HTMLBlock>{`
<style>
  :root {
    /* for text */
    --yuno-purple: #513CE1;

    /* available */
    --yuno-purple-90: #624fe4;
    --yuno-purple-80: #7362e7;
    --yuno-purple-70: #8576ea;
    --yuno-purple-60: #968aed;
    --yuno-purple-50: #a89df0;
    --yuno-purple-40: #b9b1f3;
    --yuno-purple-30: #cac4f6;
    --yuno-purple-20: #dcd8f9;

    /* for card shadows */
    --yuno-purple-10: #edebfc;

    --yuno-white: #ffffff;

    --yuno-black-text: #313131;
    --yuno-black-background: #222222;

    /* for card background */
    --yuno-card-background: #F6F7FB;
  }

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
    display: inline-block;
    ;
    padding: 0;
    margin: 0;
  }
</style>

<body class="custom-page-country">
  <div class="shelf-country-connections">
    <div class="country-connections-card">
      <div class="country-connections-card-header">
        <img class="country-connections-card-logo" src="https://img.icons8.com/color/344/brazil-circular.png">
        <h2>Available Connections in Brazil</h2>
      </div>
      <section class="detail-country-connections-card ">
        <div class="detail-country-connections-card-title">
          <!-- <div class="icon sumary-icon"
           style="background-image: url('https://raw.githubusercontent.com/cassianomoraes/yuno_card_images/09baa05c6ec36a37a0d41c8f6ddd3e5abcf623a2/yuno-icons/webpage.svg')">
         </div> -->
          <p class="title">Processors</p>
        </div>
        <div class="detail-country-connections-card-content">
          <div class="details-card details-card-on-click-effects"
            onclick="window.location='https://docs.y.uno/docs/adyen';">
            <div class="card-logo">
              <div>
                <img src="https://icons.prod.y.uno/adyen_logosimbolo.png" alt="adyen logo">
              </div>
            </div>
            <div class="card-name">
              <span class='card-title'>
                Adyen
              </span>
            </div>
          </div>

          <div class="details-card details-card-on-click-effects"
            onclick="window.location='https://docs.y.uno/docs/dlocal';">
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
            onclick="window.location='https://docs.y.uno/docs/mercado-pago';">
            <div class="card-logo">
              <div>
                <img src="https://icons.prod.y.uno/mercadopago_logosimbolo.png" alt="mercado pago logo">
              </div>
            </div>
            <div class="card-name">
              <span class='card-title'>
                Mercado Pago
              </span>
            </div>
          </div>
          <div class="details-card details-card-on-click-effects"
            onclick="window.location='https://docs.y.uno/docs/paymentez';">
            <div class="card-logo">
              <div>
                <img src="https://icons.prod.y.uno/paymentez_logosimbolo.png" alt="paymentez logo">
              </div>
            </div>
            <div class="card-name">
              <span class='card-title'>
                Paymentez
              </span>
            </div>
          </div>

          <div class="details-card details-card-on-click-effects"
            onclick="window.location='https://docs.y.uno/docs/payu';">
            <div class="card-logo">
              <div>
                <img src="https://icons.prod.y.uno/payu_logosimbolo.png" alt="payu logo">
              </div>
            </div>
            <div class="card-name">
              <span class='card-title'>
                PayU
              </span>
            </div>
          </div>

          <div class="details-card details-card-on-click-effects"
            onclick="window.location='https://docs.y.uno/docs/safetypay';">
            <div class="card-logo">
              <div>
                <img src="https://icons.prod.y.uno/safetypay_logosimbolo.png" alt="safety pay logo">
              </div>
            </div>
            <div class="card-name">
              <span class='card-title'>
                Safetypay
              </span>
            </div>
          </div>
          <div class="details-card details-card-on-click-effects"
            onclick="window.location='https://docs.y.uno/docs/stripe';">
            <div class="card-logo">
              <div>
                <img src="https://icons.prod.y.uno/stripe_logosimbolo.png" alt="stripe logo">
              </div>
            </div>
            <div class="card-name">
              <span class='card-title'>
                Stripe
              </span>
            </div>
          </div>
          <div class="details-card details-card-on-click-effects"
            onclick="window.location='https://docs.y.uno/docs/worldline';">
            <div class="card-logo">
              <div>
                <img src="https://icons.prod.y.uno/worldline_logosimbolo.png" alt="paypal logo">
              </div>
            </div>
            <div class="card-name">
              <span class='card-title'>
                Worldline
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
            onclick="window.location='https://docs.y.uno/docs/addi';">
            <div class="card-logo">
              <div>
                <img src="https://icons.prod.y.uno/addi_logosimbolo.png" alt="Addi logo">
              </div>
            </div>
            <div class="card-name">
              <span class='card-title'>
                Addi
              </span>
            </div>
          </div>
          <div class="details-card details-card-on-click-effects"
            onclick="window.location='https://docs.y.uno/docs/nupay';">
            <div class="card-logo">
              <div>
                <img src="https://icons.prod.y.uno/nubank_logosimbolo.png" alt="nupay logo">
              </div>
            </div>
            <div class="card-name">
              <span class='card-title'>
                NuPay
              </span>
            </div>
          </div>
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
          <div class="details-card details-card-on-click-effects"
            onclick="window.location='https://docs.y.uno/docs/nupay-pix';">
            <div class="card-logo">
              <div>
                <img src="https://icons.prod.y.uno/pix_logosimbolo.png" alt="pix logo">
              </div>
            </div>
            <div class="card-name">
              <span class='card-title'>
                Pix
              </span>
            </div>
          </div>
        </div>
        <div class="detail-country-connections-card-title">
          <!-- <div class="icon sumary-icon"
           style="background-image: url('https://raw.githubusercontent.com/cassianomoraes/yuno_card_images/47e683b43964ce49fd31c307ee84b7676bf5ec31/yuno-icons/coronavirus.svg')">
         </div> -->
          <p class="title">Acquirers</p>
        </div>
        <div class="detail-country-connections-card-content">
          <div class="details-card details-card-on-click-effects"
            onclick="window.location='https://docs.y.uno/docs/cielo';">
            <div class="card-logo">
              <div>
                <img src="https://icons.prod.y.uno/cielo_logosimbolo.png
                       " alt="cielo-logo">
              </div>
            </div>
            <span class='card-title'>
              Cielo
            </span>
          </div>
          <div class="details-card details-card-on-click-effects"
            onclick="window.location='https://docs.y.uno/docs/pagseguro';">
            <div class="card-logo">
              <div>
                <img src="https://icons.prod.y.uno/pagseguro_logosimbolo.png" alt="pagseguro logo">
              </div>
            </div>
            <div class="card-name">
              <span class='card-title'>
                PagSeguro
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
      </section>
    </div>
  </div>
</body>
`}</HTMLBlock>
