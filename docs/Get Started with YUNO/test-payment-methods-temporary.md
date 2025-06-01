---
title: Payment Methods and Processors(temporary)
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
Yuno´s integration allows you to connect to dozens of payment methods and processors within a single integration. Some of them need certain information required by the payment providers to use their sandbox environment. In this section, you will find the following information for each payment method and processor available in Yuno:

* Descriptions regarding services, compatibility, currency acceptance, countries accepted, authentication, and security.
* Guidelines for you to test each connection during your integration.

You can use the list below find e select the desired payment method or processor to get more information and test guidelines about its connection with Yuno.

<HTMLBlock>{`
<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .shelf {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .connection-shelf {
    background-color: #F6F7FB;
    /* background-color: #89898b; */
    border-radius: 10px;
    border: 1px solid #614ad67a;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.05);
    max-width: 800px;
    padding: 0 0 1rem 0;
  }

  .connection-shelf .conection-list {
    display: grid;
    grid-template-columns: 27% 27% 27%;
    justify-content: space-between;
    margin: 0 3rem;

  }

  .connection-shelf .title-container {
    margin: 2rem 3rem 0.6rem 3rem;
    font-weight: 500;
    font-size: 1rem;
    border-bottom: 1px solid #BABABA;
    padding-bottom: 4px !important;
  }

  .connection-shelf .title-container p {
    margin: 0 !important;
  }

  .connection-badge {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0.6rem 0;
    border-radius: 7px;

  }

  .connection-badge .connection-logo div {
    height: 23px;
    width: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .connection-badge .connection-name {
    font-size: 1rem;
    text-decoration: none;
    color: black;
    padding-top: 3px;
  }

  .connection-badge .connection-name a {
    text-decoration: none;
    color: black;

  }

  .connection-badge .connection-name a:hover {
    color: #614ad6;
  }

  .connection-badge img {
    max-height: 25px;
    max-width: 25px;
  }
</style>

<body>
  <section class="connection-shelf">
    <div class="title-container">
      <p>Processors</p>
    </div>
    <div class="conection-list Payment-Processor">
      <div class="connection-badge">
        <div class="connection-logo">
          <div>
            <img src="https://icons.prod.y.uno/adyen_logosimbolo.png" alt="adyen logo">
          </div>
        </div>
        <div class="connection-name">
          <a href="https://docs.y.uno/docs/adyen">
            Adyen
          </a>
        </div>
      </div>
      <div class="connection-badge">
        <div class="connection-logo">
          <div>
            <img src="https://icons.prod.y.uno/arcus_logosimbolo.png" alt="arcus logo">
          </div>
        </div>
        <div class="connection-name">
          <a href="">
            Arcus
          </a>
        </div>
      </div>
      <div class="connection-badge">
        <div class="connection-logo">
          <div>
            <img src="https://icons.prod.y.uno/bac_logosimbolo.png" alt="bac logo">
          </div>
        </div>
        <div class="connection-name">
          <a href="">
            BAC Credomatic
          </a>
        </div>
      </div>
      <div class="connection-badge">
        <div class="connection-logo">
          <div>
            <img src="https://icons.prod.y.uno/bancolombia_logosimbolo.png" alt="Bancolombia logo">
          </div>
        </div>
        <div class="connection-name">
          <a href="https://docs.y.uno/docs/bancolombia">
            Bancolombia
          </a>
        </div>
      </div>
      <div class="connection-badge">
        <div class="connection-logo">
          <div>
            <img src="https://icons.prod.y.uno/cielo_logosimbolo.png" " alt=" cielo-logo">
          </div>
        </div>
        <div class="connection-name">
          <a href="">
            Cielo
          </a>
        </div>
      </div>

      <div class="connection-badge">
        <div class="connection-logo">
          <div>
            <img src="https://icons.prod.y.uno/credibanco_logosimbolo.png" alt="credibanco logo">
          </div>
        </div>
        <div class="connection-name">
          <a href="">
            CredibanCo
          </a>
        </div>
      </div>
      <div class="connection-badge">
        <div class="connection-logo">
          <div>
            <img src="https://icons.prod.y.uno/datafast_logosimbolo.png" alt="datafast logo">
          </div>
        </div>

        <div class="connection-name">
          <a href="">
            Datafast
          </a>
        </div>
      </div>

      <div class="connection-badge">
        <div class="connection-logo">
          <div>
            <img src="https://icons.prod.y.uno/dlocal_logosimbolo.png" alt="dlocal logo">
          </div>
        </div>
        <div class="connection-name">
          <div class="connection-name">
            <a href="">
              Dlocal
            </a>
          </div>
        </div>
      </div>
      <div class="connection-badge">
        <div class="connection-logo">
          <div>
            <img src="https://icons.prod.y.uno/izipay_logosimbolo.png" alt="izipay logo">
          </div>
        </div>
        <div class="connection-name">
          <a href="">
            Izipay
          </a>
        </div>
      </div>
      <div class="connection-badge">
        <div class="connection-logo">
          <div>
            <img src="https://icons.prod.y.uno/fiserv_logosimbolo.png" alt="fiserv logo">
          </div>
        </div>
        <div class="connection-name">
          <a href="">
            Fiserv
          </a>
        </div>
      </div>
      <div class="connection-badge">
        <div class="connection-logo">
          <div>
            <img src="https://icons.prod.y.uno/getnet_logosimbolo.png" alt="Getnet logo">
          </div>
        </div>
        <div class="connection-name">
          <a href="">
            Getnet
          </a>
        </div>
      </div>
      <div class="connection-badge">
        <div class="connection-logo">
          <div>
            <img src="https://icons.prod.y.uno/klap_logosimbolo.png" alt="klap logo">
          </div>
        </div>
        <div class="connection-name">
          <div class="connection-name">
            <a href="">
              Klap
            </a>
          </div>
        </div>
      </div>
      <div class="connection-badge">
        <div class="connection-logo">
          <div>
            <img src="https://icons.prod.y.uno/kushki_logosimbolo.png" alt="Kushki logo">
          </div>
        </div>
        <div class="connection-name">
          <a href="">
            Kushki
          </a>
        </div>
      </div>
      <div class="connection-badge">
        <div class="connection-logo">
          <div>
            <img src="https://icons.prod.y.uno/medianet_logosimbolo.png" alt="medianet logo">
          </div>
        </div>
        <div class="connection-name">
          <a href="">
            Medianet
          </a>
        </div>
      </div>
      <div class="connection-badge">
        <div class="connection-logo">
          <div>
            <img src="https://icons.prod.y.uno/mercadopago_logosimbolo.png" alt="mercado pago logo">
          </div>
        </div>
        <div class="connection-name">
          <a href="https://docs.y.uno/docs/mercado-pago">
            Mercado Pago
          </a>
        </div>
      </div>
      <div class="connection-badge">
        <div class="connection-logo">
          <div>
            <img src="https://icons.prod.y.uno/nequi_logosimbolo.png" alt="nequi logo">
          </div>
        </div>
        <div class="connection-name">
          <a href="">
            Nequi
          </a>
        </div>
      </div>
      <div class="connection-badge">
        <div class="connection-logo">
          <div>
            <img src="https://icons.prod.y.uno/niubiz_logosimbolo.png" alt="niubiz-logo">
          </div>
        </div>
        <div class="connection-name">
          <a href="">
            Niubiz
          </a>
        </div>
      </div>
      <div class="connection-badge">
        <div class="connection-logo">
          <div>
            <img src="https://icons.prod.y.uno/nubank_logosimbolo.png" alt="nupay logo">
          </div>
        </div>
        <div class="connection-name">
          <a href="">
            NuPay
          </a>
        </div>
      </div>
      <div class="connection-badge">
        <div class="connection-logo">
          <div>
            <img src="https://icons.prod.y.uno/pagseguro_logosimbolo.png" alt="pagseguro logo">
          </div>
        </div>
        <div class="connection-name">
          <a href="">
            PagSeguro
          </a>
        </div>
      </div>
      <div class="connection-badge">
        <div class="connection-logo">
          <div>
            <img src="https://icons.prod.y.uno/paymentez_logosimbolo.png" alt="paymentez logo">
          </div>
        </div>
        <div class="connection-name">
          <a href="">
            Paymentez
          </a>
        </div>
      </div>
			<div class="connection-badge">
        <div class="connection-logo">
          <div>
            <img src="https://icons.prod.y.uno/paypal_logosimbolo.png" alt="paypal logo">
          </div>
        </div>
        <div class="connection-name">
          <a href="https://docs.y.uno/docs/paypal">
            PayPal
          </a>
        </div>
      </div>                    
      <div class="connection-badge">
        <div class="connection-logo">
          <div>
            <img src="https://icons.prod.y.uno/payu_logosimbolo.png" alt="payu logo">
          </div>
        </div>
        <div class="connection-name">
          <a href="https://docs.y.uno/docs/payu">
            PayU
          </a>
        </div>
      </div>

      <div class="connection-badge">
        <div class="connection-logo">
          <div>
            <img src="https://icons.prod.y.uno/payvalida_logosimbolo.png" alt="payvalida logo">
          </div>
        </div>
        <div class="connection-name">
          <a href="">
            Payválida
          </a>
        </div>
      </div>
      <div class="connection-badge">
        <div class="connection-logo">
          <div>
            <img src="https://icons.prod.y.uno/pix_logosimbolo.png" alt="pix logo">
          </div>
        </div>
        <div class="connection-name">
          <a href="">
            Pix
          </a>
        </div>
      </div>
      <div class="connection-badge">
        <div class="connection-logo">
          <div>
            <img src="https://icons.prod.y.uno/placetopay_logosimbolo.png" alt="placetopay logo">
          </div>
        </div>
        <div class="connection-name">
          <a href="">
            Placetopay
          </a>
        </div>
      </div>

      <div class="connection-badge">
        <div class="connection-logo">
          <div>
            <img src="https://icons.prod.y.uno/prosa_logosimbolo.png" alt="prosa logo">
          </div>
        </div>
        <div class="connection-name">
          <a href="">
            Prosa
          </a>
        </div>
      </div>
      <div class="connection-badge">
        <div class="connection-logo">
          <div>
            <img src="https://icons.prod.y.uno/pse_logosimbolo.png" alt="pse logo">
          </div>
        </div>
        <div class="connection-name">
          <a href="">
            PSE
          </a>
        </div>
      </div>
      <div class="connection-badge">
        <div class="connection-logo">
          <div>
            <img src="https://icons.prod.y.uno/rede_logosimbolo.png" alt="rede-logo">
          </div>
        </div>
        <div class="connection-name">
          <a href="">
            Rede
          </a>
        </div>
      </div>
      <div class="connection-badge">
        <div class="connection-logo">
          <div>
            <img src="https://icons.prod.y.uno/redeban_logosimbolo.png" alt="redeban logo">
          </div>
        </div>
        <div class="connection-name">
          <a href="">
            Redeban
          </a>
        </div>
      </div>
      <div class="connection-badge">
        <div class="connection-logo">
          <div>
            <img src="https://icons.prod.y.uno/safetypay_logosimbolo.png" alt="safetypay logo">
          </div>
        </div>
        <div class="connection-name">
          <a href="">
            Safetypay
          </a>
        </div>
      </div>
      <div class="connection-badge">
        <div class="connection-logo">
          <div>
            <img src="https://icons.prod.y.uno/stp_logosimbolo.png" alt="stp logo">
          </div>
        </div>
        <div class="connection-name">
          <a href="">
            STP
          </a>
        </div>
      </div>
      <div class="connection-badge">
        <div class="connection-logo">
          <div>
            <img src="https://icons.prod.y.uno/transbank_logosimbolo.png" alt="transbak logo">
          </div>
        </div>
        <div class="connection-name">
          <a href="">
            Transbank
          </a>
        </div>
      </div>
      <div class="connection-badge">
        <div class="connection-logo">
          <div>
            <img src="https://github.com/cassianomoraes/yuno_card_images/blob/main/acquirers-logos-svg-png-standardized/tuya-logo.png?raw=true  
                " alt="tuya-logo">
          </div>
        </div>
        <div class="connection-name">
          <a href="">
            Tuya
          </a>
        </div>
      </div>


      <div class="connection-badge">
        <div class="connection-logo">
          <div>
            <img src="https://icons.prod.y.uno/wompi_logosimbolo.png" alt="wompi logo">
          </div>
        </div>
        <div class="connection-name">
          <a href="">
            Wompi
          </a>
        </div>
      </div>
    </div>
    <div class="title-container">
      <p>Payment Methods</p>
    </div>
    <div class="conection-list Payment-Method">
      <div class="connection-badge">
        <div class="connection-logo">
          <div>
            <img src="https://icons.prod.y.uno/acuotaz_logosimbolo.png" alt="acuotaz logo">
          </div>
        </div>
        <div class="connection-name">
          <a href="https://docs.y.uno/docs/acuotaz">
            Acuotaz
          </a>
        </div>
      </div>
      <div class="connection-badge">
        <div class="connection-logo">
          <div>
            <img src="https://icons.prod.y.uno/addi_logosimbolo.png" alt="Addi logo">
          </div>
        </div>
        <div class="connection-name">
          <a href="https://docs.y.uno/docs/addi">
            Addi
          </a>
        </div>
      </div>
      <div class="connection-badge">
        <div class="connection-logo">
          <div>
            <img src="https://icons.prod.y.uno/daviplata_logosimbolo.png" alt="daviplata logo">
          </div>
        </div>
        <div class="connection-name">
          <a href="https://docs.y.uno/docs/daviplata">
            DaviPlata
          </a>
        </div>
      </div>
      
      <div class="connection-badge">
        <div class="connection-logo">
          <div>
            <img src="https://icons.prod.y.uno/wibond_logosimbolo.png" alt="wibond logo">
          </div>
        </div>
        <div class="connection-name">
          <a href="https://docs.y.uno/docs/wibond">
            Wibond
          </a>
        </div>
      </div>
    </div>
    <div class="title-container">
      <p>Fraud Solutions</p>
    </div>
    <div class="conection-list Fraud-Solution">
      <div class="connection-badge">
        <div class="connection-logo">
          <div>
            <img src="https://icons.prod.y.uno/clearsale_logosimbolo.png" " alt=" clearsale logo">
          </div>
        </div>
        <div class="connection-name">
          <a href="">
            ClearSale
          </a>
        </div>
      </div>
    </div>

  </section>
</body>
`}</HTMLBlock>
