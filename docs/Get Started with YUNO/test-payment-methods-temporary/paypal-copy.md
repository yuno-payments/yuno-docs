---
title: PayPal (COPY)
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
Allows you to make online payments to your customers almost anywhere in the world.

# Gateway Guide

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

  .psp-card {
    background-color: #F6F7FB;
    border-radius: 10px;
    border: 1px solid #614ad67a;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.05);
    max-width: 800px;

  }

  .detail-psp-card {
    max-width: 800px;
    margin: 30px 0 0 0;
    padding: 0px 30px 50px 55px;
  }

  .detail-psp-card-title .title {
    margin: 1rem 0;
    font-weight: 500;
    font-size: 1rem;
    color: #000000;
    border-bottom: 1px solid #BABABA;
    padding-bottom: 4px !important;
  }

  .detail-psp-card-title .icon {
    position: absolute;
    margin-left: -33px;
    margin-top: -4px;
    border-radius: 50%;
    padding: 0rem;
    width: 28px;
    height: 28px;
    background-size: 70%;
    background-repeat: no-repeat;
    background-position: center;
  }

  .detail-psp-card-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1rem;
  }

  .detail-psp-card-content .label {
    font-weight: 500;
    width: 50%;
    margin: 0.6rem 0;
  }

  .detail-psp-card-content .content {
    font-weight: 400;
    width: 45%;
    margin: 0.6rem 0;
  }

  .sucess-icon {
    background: rgba(59, 166, 43, 0.8);
    width: 8px;
    height: 8px;
    display: inline-block;
    margin-right: 5px;
    border-radius: 10px;
    margin-left: -18px;
  }

  .sumary-icon {
    filter: invert(31%) sepia(46%) saturate(2061%) hue-rotate(227deg) brightness(94%) contrast(99%);
  }

  .detail-psp-card-content-countries {
    display: grid;
    grid-template-columns: 20% 20% 20% 20%;
    column-gap: 5%;
    justify-content: space-between;
  }

  .contry-badge {
    display: flex;
    align-items: center;
    border-radius: 7px;
    margin-bottom: 16px;
  }

  .detail-psp-card-content-countries .container-county-img {
    border-radius: 50%;
    background-color: rgba(197, 78, 230, 0.1);
    padding: 0.1rem;
    margin-right: 7px;
  }

  .detail-psp-card-content-countries .container-county-img .county-img {
    max-width: 25px;
  }

  .div-test {
    border-bottom: 1px solid rgb(235, 235, 235);
  }
</style>

<body>
  <div class="shelf">
    <div class=" psp-card Mercado-Pago">
      <section class="detail-psp-card ">
        <div class="detail-psp-card-title">
          <div class="icon sumary-icon"
            style="background-image: url('https://raw.githubusercontent.com/cassianomoraes/yuno_card_images/4baa08426d27941706d05b5c61e7b2e2dcc5c22b/yuno-icons/development.svg')">
          </div>
          <p class="title">Services and compatibility</p>
        </div>
        <div class="detail-psp-card-content">
          <p class="label">Supported operations:</p>
          <p class="content">
            <span class="sucess-icon"></span>
            Purchase and Refund. <br>
            Authorization and capture.
          </p>
        </div>
        <div class="div-test"></div>
        <div class="detail-psp-card-content">
          <p class="label">Supported payment types:</p>
          <p class="content">
            <span class="sucess-icon"></span>
            PayPal
          </p>
        </div>
        <div class="detail-psp-card-title">
          <div class="icon sumary-icon"
            style="background-image: url('https://raw.githubusercontent.com/cassianomoraes/yuno_card_images/b9c6c343a13b3814cf4f70099fe2a0dfb17b1a16/yuno-icons/money.svg')">
          </div>
          <p class="title">Currency acceptance</p>
        </div>
        <div class="detail-psp-card-content">
          <p class="label">Supported currencies:</p>
          <p class="content">
            <span class="sucess-icon"></span>
            ALL, AMD, AOA, ARS, AUD, AWG, BOB, BRL, CAD, CHF, CLP, COP, CRC, CZK, DKK, DOP, DZD, EGP, EUR, GBP, GTQ, HNL, HRK, IDR, ILS, INR, ISK, JMD, JPY, MXN, NGN, NIO, PAB, PEN, PLN, PYG, QAR, RSD, RUB, SEK, THB, TTD, UAH, USD, UYU, VEF, VND, XAF, ZAR
          </p>
        </div>
        <div class="detail-psp-card-title">
          <div class="icon sumary-icon"
            style="background-image: url('https://raw.githubusercontent.com/cassianomoraes/yuno_card_images/47e683b43964ce49fd31c307ee84b7676bf5ec31/yuno-icons/coronavirus.svg')">
          </div>
          <p class="title">Onboarding merchants in</p>
        </div>
        <div class="detail-psp-card-content-countries">

          <div class="contry-badge">
            <div class="container-county-img">
              <img class="county-img" src="https://img.icons8.com/color/344/argentina-circular.png" alt="Argentina-flag">
            </div>
            <span>Argentina</span>
          </div>
     
          <div class="contry-badge">
            <div class="container-county-img">
              <img class="county-img" src="https://img.icons8.com/color/344/aruba-circular.png" alt="Aruba-flag">
            </div>
            <span>Aruba</span>
          </div>       
  
  
          <div class="contry-badge">
            <div class="container-county-img">
              <img class="county-img" src="https://img.icons8.com/color/344/bolivia-circular.png" alt="Bolivia-flag">
            </div>
            <span>Bolivia</span>
          </div>   
          <div class="contry-badge">
            <div class="container-county-img">
              <img class="county-img" src="https://img.icons8.com/color/344/brazil-circular.png" alt="Brazil-flag">
            </div>
            <span>Brazil</span>
          </div>   


          <div class="contry-badge">
            <div class="container-county-img">
              <img class="county-img" src="https://img.icons8.com/color/344/chile-circular.png" alt="chile-flag">
            </div>
            <span>Chile</span>
          </div>   
          <div class="contry-badge">
            <div class="container-county-img">
              <img class="county-img" src="https://img.icons8.com/color/344/colombia-circular.png" alt="Colombia-flag">
            </div>
            <span>Colombia</span>
          </div>   
          <div class="contry-badge">
            <div class="container-county-img">
              <img class="county-img" src="https://img.icons8.com/color/452/casta-rica-circular.png" alt="Costa Rica-flag">
            </div>
            <span>Costa Rica</span>
          </div>   

  
          <div class="contry-badge">
            <div class="container-county-img">
              <img class="county-img" src="https://img.icons8.com/color/344/dominican-republic-circular.png" alt="Dominican Republic-flag">
            </div>
            <span>Dominican Republic</span>
          </div>   

          <div class="contry-badge">
            <div class="container-county-img">
              <img class="county-img" src="https://img.icons8.com/color/344/ecuador-circular.png" alt="Ecuador-flag">
            </div>
            <span>Ecuador</span>
          </div>   
  
          <div class="contry-badge">
            <div class="container-county-img">
              <img class="county-img" src="https://img.icons8.com/color/344/el-salvador-circular.png" alt="El Salvador-flag">
            </div>
            <span>El Salvador</span>
          </div>   



          <div class="contry-badge">
            <div class="container-county-img">
              <img class="county-img" src="https://img.icons8.com/color/344/guatemala-circular.png" alt="Guatemala-flag">
            </div>
            <span>Guatemala</span>
          </div>   
          <div class="contry-badge">
            <div class="container-county-img">
              <img class="county-img" src="https://img.icons8.com/color/344/honduras-circular.png" alt="Honduras-flag">
            </div>
            <span>Honduras</span>
          </div>   
          <div class="contry-badge">
            <div class="container-county-img">
              <img class="county-img" src="https://img.icons8.com/color/344/jamaica-circular.png" alt="Jamaica-flag">
            </div>
            <span>Jamaica</span>
          </div>   
          <div class="contry-badge">
            <div class="container-county-img">
              <img class="county-img" src="https://img.icons8.com/color/344/mexico-circular.png" alt="Mexico-flag">
            </div>
            <span>Mexico</span>
          </div>   
          <div class="contry-badge">
            <div class="container-county-img">
              <img class="county-img" src="https://img.icons8.com/color/344/nicaragua-circular.png" alt="Nicaragua-flag">
            </div>
            <span>Nicaragua</span>
          </div>   
          <div class="contry-badge">
            <div class="container-county-img">
              <img class="county-img" src="https://img.icons8.com/color/344/panama-circular.png" alt="Panama-flag">
            </div>
            <span>Panama</span>
          </div>   
          <div class="contry-badge">
            <div class="container-county-img">
              <img class="county-img" src="https://img.icons8.com/color/344/paraguay-circular.png" alt="Paraguay-flag">
            </div>
            <span>Paraguay</span>
          </div>   
          <div class="contry-badge">
            <div class="container-county-img">
              <img class="county-img" src="https://img.icons8.com/color/344/peru-circular.png" alt="Peru-flag">
            </div>
            <span>Peru</span>
          </div>   
          
	  <div class="contry-badge">
            <div class="container-county-img">
              <img class="county-img" src="https://img.icons8.com/color/344/trinidad-and-tobago-circular.png" alt="Trinidad and Tobago-flag">
            </div>
            <span>Trinidad and Tobago</span>
          </div>  
          
          <div class="contry-badge">
            <div class="container-county-img">
              <img class="county-img" src="https://img.icons8.com/color/344/uruguay-circular.png" alt="Uruguay-flag">
            </div>
            <span>Uruguay</span>
          </div>   
          <div class="contry-badge">
            <div class="container-county-img">
              <img class="county-img" src="https://img.icons8.com/color/344/venezuela-circular.png" alt="Venezuela-flag">
            </div>
            <span>Venezuela</span>
          </div>   

        </div>
        <div class="detail-psp-card-title">
          <div class="icon sumary-icon"
            style="background-image: url('https://raw.githubusercontent.com/cassianomoraes/yuno_card_images/47e683b43964ce49fd31c307ee84b7676bf5ec31/yuno-icons/authentication.svg')">
          </div>
          <p class="title">Authentication and security</p>
        </div>
        <div class="detail-psp-card-content">
          <p class="label">Specific names for credentials:</p>
          <p class="content">
            Secret ID <br>
            Client ID 
          </p>
        </div>
      </section>
    </div>
  </div>
</body>
`}</HTMLBlock>
