---
title: Adyen
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
Accepts online payments on any device or channel, whatever your business model, so you can give customers the experiences they expect.

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
            Card <br>
            Pix
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
            BRL, MXN
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
              <img class="county-img" src="https://img.icons8.com/color/344/brazil-circular.png" alt="brazil-flag">
            </div>
            <span>Brazil</span>
          </div>
          <div class="contry-badge">
            <div class="container-county-img">
              <img class="county-img" src="https://img.icons8.com/color/344/mexico-circular.png" alt="mexico-flag">
            </div>
            <span>Mexico</span>
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
            Account Code <br>
            x-api-key
          </p>
        </div>
      </section>
    </div>
  </div>
</body>
`}</HTMLBlock>

<HTMLBlock>{`
<!DOCTYPE html>
<html lang="en">
<style>
  .navigation-button-shelf {
    margin: 0 0 0 0;
    display: flex;
    justify-content: flex-end;
  }

  .navigation-button {
    padding: 0.3rem;
    background: rgba(255, 255, 255, 0.23);
    border-radius: 5px;
    border: 1px solid #614ad67a;
    transition: transform .2s;
    display: flex;
    flex-direction: row;
  }

  .navigation-button:hover {
    transform: scale(1.02);
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  .navigation-button svg {
    color: #614ad6;
    height: 25px;
    width: 25px;
  }

  .navigation-button h4 {
    font-size: 0.8rem;
    color: #614ad6;
    margin: 0 0 0 10px;
    display: flex;
    align-items: center;
  }

  @media only screen and (max-width: 600px) {
    .navigation-button h4 {
      font-size: 0.7rem;
    }

    .navigation-button svg {
      color: #614ad6;
      height: 20px;
      width: 20px;
    }
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

</html>
`}</HTMLBlock>
