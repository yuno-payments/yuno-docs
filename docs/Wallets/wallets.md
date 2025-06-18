---
title: Wallets Overview
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: >-
    Here you find the complete list of Wallets' connections available on Yuno.
    Select the desired wallet to access more information.
  robots: index
next:
  description: ''
---
Here you find the complete list of Wallets' connections available on Yuno. Wallets let your customers use the stored cards they have with different providers. Select the desired wallet to access more information.

<TableWrapper>
  <CompanyCard title="Apple Pay" image="https://icons.prod.y.uno/applepay_logosimbolo.png" href="/docs/apple-pay" />

  <CompanyCard title="Google Pay" image="https://icons.prod.y.uno/googlepay_logosimbolo.png" href="/docs/google-pay" />

  <CompanyCard title="Click to Pay" image="https://icons.prod.y.uno/clicktopay_logosimbolo.png" href="/docs/click-to-pay" />
</TableWrapper>

<br />

<HTMLBlock>{`
<style>
  .content-body {
    margin: 0 !important;
  }

  .content-toc {
    display: none;
  }

  .shelf-country-connections {
    margin: 0;
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

  .detail-country-connections-card-title .title {
    margin: 2rem 0 1rem 0;
    font-weight: 600;
    font-size: 0.85rem;
    border-bottom: 1px solid #BABABA;
    padding-bottom: 4px !important;
  }

  .detail-country-connections-card-content {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 1fr;
    column-gap: 10px;
    row-gap: 10px;
    align-items: center;
    font-size: 0.85rem;
  }

  @media only screen and (max-width: 1210px) {
    .detail-country-connections-card-content {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media only screen and (max-width: 850px) {
    .detail-country-connections-card-content {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media only screen and (max-width: 768px) {
    .detail-country-connections-card-content {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media only screen and (max-width: 650px) {
    .detail-country-connections-card-content {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media only screen and (max-width: 415px) {
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

  /* ------------------------ define the configuration for DARK Mode ------------------------  */

  @media (prefers-color-scheme: dark) {
    .details-card-on-click-effects:hover {
      box-shadow: none !important;
    }
  }

  [data-color-mode="dark"] .details-card-on-click-effects:hover {
    box-shadow: none !important;
  }
</style>

<body class="custom-page-country">
  <div class="shelf-country-connections">
    <div class="country-connections-card">
      <section class="detail-country-connections-card ">
        <div class="detail-country-connections-card-content">

          <a class="details-card details-card-on-click-effects" href="/docs/apple-pay">
            <div class="card-logo">
              <div>
                <img src="https://icons.prod.y.uno/applepay_logosimbolo.png" alt="apple logo">
              </div>
            </div>
            <span class='card-title'>Apple Pay</span>
          </a>

          <a class="details-card details-card-on-click-effects" href="/docs/google-pay">
            <div class="card-logo">
              <div>
                <img src="https://icons.prod.y.uno/googlepay_logosimbolo.png" alt="google logo">
              </div>
            </div>
            <span class='card-title'>Google Pay</span>
          </a>

          <a class="details-card details-card-on-click-effects" href="/docs/click-to-pay">
            <div class="card-logo">
              <div>
                <img src="https://icons.prod.y.uno/clicktopay_logosimbolo.png" alt="click to pay logo">
              </div>
            </div>
            <span class='card-title'>Click to Pay</span>
          </a>

      </section>
    </div>
  </div>
</body>
`}</HTMLBlock>