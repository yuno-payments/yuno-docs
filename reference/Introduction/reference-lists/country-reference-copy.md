---
title: Country reference (COPY)
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
On this page, you will find the country's information you need when using Yuno API endpoints. The below table provides standard codes for the country's identification, currencies, document types used in each country, and phone codes. Use this page to understand and have access to standard values for each piece of information.

<HTMLBlock>{`
<style>
  .card-ultimate-shelf {
    margin: 0 0 0 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .card-ultimate {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    border-radius: 7px;
    border: 1px solid var(--yuno-purple);
    transition: transform .2s;
    width: fit-content;
    margin: 0.3rem;
  }

  .card-ultimate:hover {
    transform: scale(1.02);
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  .card-ultimate img {
    max-width: 100px;
    margin-top: 1rem;
  }

  .card-ultimate h4 {
    color: #513CE1;
  }

  /* ------------------------ define the configuration for DARK Mode ------------------------  */

  @media (prefers-color-scheme: dark) {
    .card-ultimate {
      border: 2px solid var(--yuno-purple-50);
    }

    .card-ultimate:hover {
      transform: scale(1.02);
      cursor: pointer;
    }

    .card-ultimate svg {
      color: var(--yuno-purple-50);
    }

    .card-ultimate h3 {
      color: var(--yuno-purple-50);
    }
  }

  [data-color-mode="dark"] .card-ultimate {
    border: 2px solid var(--yuno-purple-50);
  }

  [data-color-mode="dark"] .card-ultimate:hover {
    transform: scale(1.02);
    cursor: pointer;
  }

  [data-color-mode="dark"] .card-ultimate svg {
    color: var(--yuno-purple-50);
  }

  [data-color-mode="dark"] .card-ultimate h3 {
    color: var(--yuno-purple-50);
  }
</style>

<body>
  <section class="card-ultimate-shelf">

    <div class="card-ultimate" onclick="window.location='country-reference#africa';">
      <img src="https://raw.githubusercontent.com/cassianomoraes/yuno_card_images/main/yuno-icons/africa-min.png" alt="">
      <h4>Africa</h4>
    </div>
    <div class="card-ultimate" onclick="window.location='country-reference#americas';">
      <img src="https://raw.githubusercontent.com/cassianomoraes/yuno_card_images/main/yuno-icons/south-america-min.png" alt="">
      <h4>Americas</h4>
    </div>
    <div class="card-ultimate" onclick="window.location='country-reference#asia-pacific';">
      <img src="https://raw.githubusercontent.com/cassianomoraes/yuno_card_images/main/yuno-icons/asia-min.png" alt="">
      <h4>Asia Pacific</h4>
    </div>
    <div class="card-ultimate" onclick="window.location='country-reference#europe';">
      <img src="https://raw.githubusercontent.com/cassianomoraes/yuno_card_images/main/yuno-icons/europe-min.png" alt="">
      <h4>Europe</h4>
    </div>    

  </section>
</body>
`}</HTMLBlock>

<HTMLBlock>{`
<style>
  .region-buttons-shelf {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 1fr;
    gap: 3%;
    margin-bottom: 40px;
  }

  .region-buttons {
    padding: 10px;
    border-radius: 7px;
    border: 1px solid var(--yuno-purple);
    transition: transform .2s;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  @media only screen and (max-width: 700px) {
    .region-buttons-shelf {
      grid-template-columns: 1fr 1fr;
      gap: 3%;
    }
  }

  @media only screen and (max-width: 400px) {
    .region-buttons-shelf {
      grid-template-columns: 1fr;
      gap: 2%;
    }
  }



  .region-buttons:hover {
    transform: scale(1.02);
    box-shadow: 0 5px 5px var(--yuno-purple-10);
    cursor: pointer;
  }

  .region-buttons .container-region-img {
    border-radius: 50%;
    background-color: rgba(197, 78, 230, 0.1);
    padding: 0.4rem;
    margin-bottom: 15px;
  }

  .region-buttons svg,
  .region-buttons img {
    color: var(--yuno-purple);
    height: 50px;
    /* width: 45px; */
  }
  
  .region-buttons .central-america-map {
    height: 50px;
    width: 45px;
  }

  .region-buttons h3 {
    font-size: 0.9rem;
    color: var(--yuno-purple);
    margin: 0 0 0 0;
    text-align: center;
  }
  
   /* ------------------------ define the configuration for DARK Mode ------------------------  */

  @media (prefers-color-scheme: dark) {
    .region-buttons {
      border: 1px solid var(--yuno-purple-50);
    }

      .region-buttons:hover {
      box-shadow: none;
    }

      .region-buttons .container-region-img {
      background-color: var(--yuno-off-white);
    }

      .region-buttons svg,
    .region-buttons img {
      color: var(--yuno-purple-50);

    }

      .region-buttons h3 {
      color: var(--yuno-purple-50);
    }
  }

  [data-color-mode="dark"] .region-buttons {
      border: 1px solid var(--yuno-purple-50);
    }

     [data-color-mode="dark"]  .region-buttons:hover {
      box-shadow: none;
    }

     [data-color-mode="dark"]  .region-buttons .container-region-img {
      background-color: var(--yuno-off-white);
    }

     [data-color-mode="dark"]  .region-buttons svg,
    [data-color-mode="dark"] .region-buttons img {
      color: var(--yuno-purple-50);

    }

     [data-color-mode="dark"]  .region-buttons h3 {
      color: var(--yuno-purple-50);
    }
</style>

<body>
  <section class="region-buttons-shelf">
    <div class="region-buttons" onclick="window.location='country-reference#africa';">
      <div class="container-region-img">
        <img class="county-img"
          src="https://github.com/cassianomoraes/yuno_card_images/blob/main/yuno-icons/africa-min.png?raw=true"
          alt="Africa map">
      </div>
      <h3>
        Africa
      </h3>
    </div>
    <div class="region-buttons" onclick="window.location='country-reference#america';">
      <div class="container-region-img">
        <img class="county-img"
          src="https://github.com/cassianomoraes/yuno_card_images/blob/main/yuno-icons/south-america-min.png?raw=true"
          alt="America map">
      </div>
      <h3>
        America
      </h3>
      </div>
    <div class="region-buttons" onclick="window.location='country-reference#asia-paciic';">
      <div class="container-region-img">
        <img class="county-img"
          src="https://github.com/cassianomoraes/yuno_card_images/blob/main/yuno-icons/asia-min.png?raw=true"
          alt="Asia-Pacific map">
      </div>
      <h3>
        Asia Pacific
      </h3>
    </div>
    <!--<div class="region-buttons" onclick="window.location='yuno-connections#central-america-and-caribbean-region-country-list';">
      <div class="container-region-img">
        <img class="county-img"
          src="https://github.com/cassianomoraes/yuno_card_images/blob/main/yuno-icons/central-america-caribbean-min.png?raw=true"
          alt="Central America and Caribbean Region map">
      </div>
      <h3>
        Central America and Caribbean Region
      </h3>
    </div>-->
    <div class="region-buttons" onclick="window.location='country-reference#europe';">
      <div class="container-region-img">
        <img class="county-img"
          src="https://github.com/cassianomoraes/yuno_card_images/blob/main/yuno-icons/europe-min.png?raw=true"
          alt="Europe map">
      </div>
      <h3>
        Europe
      </h3>
    </div>
    <!--<div class="region-buttons" onclick="window.location='yuno-connections#north-america-country-list';">
      <div class="container-region-img">
        <img class="county-img"
          src="https://github.com/cassianomoraes/yuno_card_images/blob/main/yuno-icons/north-america-min.png?raw=true"
          alt="North America map">
      </div>
      <h3>
        North America
      </h3>
    </div>
    <div class="region-buttons" onclick="window.location='yuno-connections#south-america-country-list';">
      <div class="container-region-img">
        <img class="county-img"
          src="https://github.com/cassianomoraes/yuno_card_images/blob/main/yuno-icons/south-america-min.png?raw=true"
          alt="South America map">
      </div>
      <h3>
        South America
      </h3>
    </div>-->
  </section>
</body>
`}</HTMLBlock>

# Americas

<Table>
  <thead>
    <tr>
      <th>
        Name
      </th>

      <th>
        Country code (ISO 3166-1)
      </th>

      <th>
        Currency code (ISO 4217)
      </th>

      <th>
        Currency decimal points
      </th>

      <th>
        Document type
      </th>

      <th>
        Phone code
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Anguilla
      </td>

      <td>
        AI
      </td>

      <td>
        XCD
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        1-264
      </td>
    </tr>

    <tr>
      <td>
        Antigua And Barbuda
      </td>

      <td>
        AG
      </td>

      <td>
        XCD
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        1-268
      </td>
    </tr>

    <tr>
      <td>
        Argentina
      </td>

      <td>
        AR
      </td>

      <td>
        ARS
      </td>

      <td>
        2
      </td>

      <td>
        * \*DNI\*\* (National Identity Document)  
        * \*CI\*\* (Identity Card)  
        * \*LC\*\* (Civic Notebook)  
        * \*LE\*\* (Book Enlistment)  
        * \*CUIT\*\* (Single Tax Identification)  
        * \*CUIL\*\* (Unique Labor Identification Code)  
        * \*PAS\*\* (Passport)
      </td>

      <td>
        54
      </td>
    </tr>

    <tr>
      <td>
        Aruba
      </td>

      <td>
        AW
      </td>

      <td>
        AWG
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)  
        * \*PIN\*\* (individual Identity number)
      </td>

      <td>
        297
      </td>
    </tr>

    <tr>
      <td>
        Bahamas
      </td>

      <td>
        BS
      </td>

      <td>
        BSD
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        1-242
      </td>
    </tr>

    <tr>
      <td>
        Barbados
      </td>

      <td>
        BB
      </td>

      <td>
        BBD
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)\
          National ID Card
      </td>

      <td>
        1-246
      </td>
    </tr>

    <tr>
      <td>
        Belize
      </td>

      <td>
        BZ
      </td>

      <td>
        BZD
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)\
          Social Security Card\
          Driver's license
      </td>

      <td>
        501
      </td>
    </tr>

    <tr>
      <td>
        Bermuda
      </td>

      <td>
        BM
      </td>

      <td>
        BMD
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        1-441
      </td>
    </tr>

    <tr>
      <td>
        Bolivia
      </td>

      <td>
        BO
      </td>

      <td>
        BOB\
        BOV
      </td>

      <td>
        2\
        2
      </td>

      <td>
        * \*CI\*\* (Identity Card)  
        * \*PAS\*\* (Passport)
      </td>

      <td>
        591
      </td>
    </tr>

    <tr>
      <td>
        Brazil
      </td>

      <td>
        BR
      </td>

      <td>
        BRL
      </td>

      <td>
        2
      </td>

      <td>
        * \*RG\*\* (Identity Card)  
        * \*CPF\*\* (Natural Persons Register)  
        * \*CNH\*\* (Driver License)  
        * \*CNPJ\*\* (National Registry of Legal Entities)  
        * \*PAS\*\* (Passport)
      </td>

      <td>
        55
      </td>
    </tr>

    <tr>
      <td>
        Canada
      </td>

      <td>
        CA
      </td>

      <td>
        CAD
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)\
          Driver's license\
          National ID Card
      </td>

      <td>
        1
      </td>
    </tr>

    <tr>
      <td>
        Cayman Islands
      </td>

      <td>
        KY
      </td>

      <td>
        KYD
      </td>

      <td>
        2
      </td>

      <td>
        Voter ID Card\
        Driver's License  

        * \*PAS\*\* (Passport)
      </td>

      <td>
        1-345
      </td>
    </tr>

    <tr>
      <td>
        Chile
      </td>

      <td>
        CL
      </td>

      <td>
        CLP\
        CLF
      </td>

      <td>
        0\
        0
      </td>

      <td>
        * \*CI\*\* (Identity Card)  
        * \*RUT\*\* (Unique Tax Role)  
        * \*RUN\*\* (Unique National Role)  
        * \*PAS\*\* (Passport)
      </td>

      <td>
        56
      </td>
    </tr>

    <tr>
      <td>
        Colombia
      </td>

      <td>
        CO
      </td>

      <td>
        COP\
        COU
      </td>

      <td>
        2\
        2
      </td>

      <td>
        * \*CC\*\* (Citizenship Card)  
        * \*CE\*\* (Foreign Certificate)  
        * \*NIT\*\* (Tax Identification Number)  
        * \*PAS\*\* (Passport)
      </td>

      <td>
        57
      </td>
    </tr>

    <tr>
      <td>
        Costa Rica
      </td>

      <td>
        CR
      </td>

      <td>
        CRC
      </td>

      <td>
        2
      </td>

      <td>
        * \*CI\*\* (Identity Card)  
        * \*PAS\*\* (Passport)
      </td>

      <td>
        506
      </td>
    </tr>

    <tr>
      <td>
        Cuba
      </td>

      <td>
        CU
      </td>

      <td>
        CUP\
        CUC
      </td>

      <td>
        2\
        2
      </td>

      <td>

      </td>

      <td>
        53
      </td>
    </tr>

    <tr>
      <td>
        Curacao
      </td>

      <td>
        CW
      </td>

      <td>
        ANG
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)\
          Identity Card\
          Driver's license
      </td>

      <td>
        599
      </td>
    </tr>

    <tr>
      <td>
        Dominica
      </td>

      <td>
        DM
      </td>

      <td>
        XCD
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)\
          National ID Card
      </td>

      <td>
        1-767
      </td>
    </tr>

    <tr>
      <td>
        Dominican Republic
      </td>

      <td>
        DO
      </td>

      <td>
        DOP
      </td>

      <td>
        2
      </td>

      <td>
        * \*CI\*\* (Identity Card)\
          Cédula de menor
      </td>

      <td>
        1-809\
        1-829\
        1-849
      </td>
    </tr>

    <tr>
      <td>
        Ecuador
      </td>

      <td>
        EC
      </td>

      <td>
        USD
      </td>

      <td>
        2
      </td>

      <td>
        * \*CI\*\* (Identity Card)  
        * \*PAS\*\* (Passport)
      </td>

      <td>
        593
      </td>
    </tr>

    <tr>
      <td>
        El Salvador
      </td>

      <td>
        SV
      </td>

      <td>
        USD
      </td>

      <td>
        2
      </td>

      <td>
        * \*DU&#x49;**(Unique Identity Document)\&#xA;**&#x50;IC\*\*  
        * \*PAS\*\* (Passport)
      </td>

      <td>
        503
      </td>
    </tr>

    <tr>
      <td>
        Falkland Islands
      </td>

      <td>
        FK
      </td>

      <td>
        FKP
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)\
          National ID Card
      </td>

      <td>
        500
      </td>
    </tr>

    <tr>
      <td>
        French Guiana
      </td>

      <td>
        GF
      </td>

      <td>
        EUR
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)\
          National ID Card
      </td>

      <td>
        594
      </td>
    </tr>

    <tr>
      <td>
        Grenada
      </td>

      <td>
        GD
      </td>

      <td>
        XCD
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)\
          National ID Card
      </td>

      <td>
        473
      </td>
    </tr>

    <tr>
      <td>
        Guadeloupe
      </td>

      <td>
        GP
      </td>

      <td>
        EUR
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)\
          National ID Card
      </td>

      <td>
        590
      </td>
    </tr>

    <tr>
      <td>
        Guatemala
      </td>

      <td>
        GT
      </td>

      <td>
        GTQ
      </td>

      <td>
        2
      </td>

      <td>
        * \*DPI\*\* (Personal Identification Document)  
        * \*CUI\*\* (Unique Identification Code)  
        * \*PAS\*\* (Passport)
      </td>

      <td>
        502
      </td>
    </tr>

    <tr>
      <td>
        Guyana
      </td>

      <td>
        GY
      </td>

      <td>
        GYD
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        592
      </td>
    </tr>

    <tr>
      <td>
        Haiti
      </td>

      <td>
        HT
      </td>

      <td>
        HTG\
        USD
      </td>

      <td>
        2\
        2
      </td>

      <td>
        * \*CIN\*\*(Carte d'Identification Nationale)
      </td>

      <td>
        509
      </td>
    </tr>

    <tr>
      <td>
        Honduras
      </td>

      <td>
        HN
      </td>

      <td>
        HNL
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)  
        * \*DNI\*\* (National Identification Document)
      </td>

      <td>
        504
      </td>
    </tr>

    <tr>
      <td>
        Jamaica
      </td>

      <td>
        JM
      </td>

      <td>
        JMD
      </td>

      <td>
        2
      </td>

      <td>
        National ID Card
      </td>

      <td>
        1-876
      </td>
    </tr>

    <tr>
      <td>
        Martinique
      </td>

      <td>
        MQ
      </td>

      <td>
        EUR
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        596
      </td>
    </tr>

    <tr>
      <td>
        Mexico
      </td>

      <td>
        MX
      </td>

      <td>
        MXN\
        MXV
      </td>

      <td>
        2\
        2
      </td>

      <td>
        * \*IFE\*\* (Federal Electoral Institute)  
        * \*INE\*\* (National Electoral Institute)  
        * \*CP\*\* (Professional ID)  
        * \*PAS\*\* (Passport)  
        * \*RFC\*\* (Federal Taxpayer Registry)  
        * \*CURP\*\* (Unique Population Registry Code)
      </td>

      <td>
        52
      </td>
    </tr>

    <tr>
      <td>
        Montserrat
      </td>

      <td>
        MS
      </td>

      <td>
        XCD
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        1-664
      </td>
    </tr>

    <tr>
      <td>
        Nicaragua
      </td>

      <td>
        NI
      </td>

      <td>
        NIO
      </td>

      <td>
        2
      </td>

      <td>
        * \*CI\*\* (Identity Card)  
        * \*PAS\*\* (Passport)
      </td>

      <td>
        505
      </td>
    </tr>

    <tr>
      <td>
        Panama
      </td>

      <td>
        PA
      </td>

      <td>
        PAB\
        USD
      </td>

      <td>
        2\
        2
      </td>

      <td>
        * \*CIP\*\* (Identity Card)  
        * \*PAS\*\* (Passport)
      </td>

      <td>
        507
      </td>
    </tr>

    <tr>
      <td>
        Paraguay
      </td>

      <td>
        PY
      </td>

      <td>
        PYG
      </td>

      <td>
        0
      </td>

      <td>
        **CIC**  

        * \*CI\*\* (Identity Card)  
        * \*PAS\*\* (Passport)
      </td>

      <td>
        595
      </td>
    </tr>

    <tr>
      <td>
        Peru
      </td>

      <td>
        PE
      </td>

      <td>
        PEN
      </td>

      <td>
        2
      </td>

      <td>
        * \*DNI\*\* (National Identification Document)  
        * \*CE\*\* (Immigration Card)  
        * \*RUC\*\* (Single Registry of Taxpayers)
      </td>

      <td>
        51
      </td>
    </tr>

    <tr>
      <td>
        Puerto Rico
      </td>

      <td>
        PR
      </td>

      <td>
        USD
      </td>

      <td>
        2
      </td>

      <td>
        * \*NIS\*\* (Numero de identificacion social)  
        * \*LC\*\* (Licencia de conducir)
      </td>

      <td>
        1-787\
        1-939
      </td>
    </tr>

    <tr>
      <td>
        Saint Kitts And Nevis
      </td>

      <td>
        KN
      </td>

      <td>
        XCD
      </td>

      <td>
        2
      </td>

      <td>
        National ID Card
      </td>

      <td>
        1-869
      </td>
    </tr>

    <tr>
      <td>
        Saint Lucia
      </td>

      <td>
        LC
      </td>

      <td>
        XCD
      </td>

      <td>
        2
      </td>

      <td>
        National ID Card
      </td>

      <td>
        1-758
      </td>
    </tr>

    <tr>
      <td>
        Saint Martin
      </td>

      <td>
        MF
      </td>

      <td>
        EUR
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)\
          National ID Card
      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        Saint Pierre And Miquelon
      </td>

      <td>
        PM
      </td>

      <td>
        EUR
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        508
      </td>
    </tr>

    <tr>
      <td>
        Saint Vincent And The Grenadines
      </td>

      <td>
        VC
      </td>

      <td>
        XCD
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        1-784
      </td>
    </tr>

    <tr>
      <td>
        Suriname
      </td>

      <td>
        SR
      </td>

      <td>
        SRD
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        597
      </td>
    </tr>

    <tr>
      <td>
        Trinidad And Tobago
      </td>

      <td>
        TT
      </td>

      <td>
        TTD
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        1-868
      </td>
    </tr>

    <tr>
      <td>
        Turks And Caicos Islands
      </td>

      <td>
        TC
      </td>

      <td>
        USD
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        1-649
      </td>
    </tr>

    <tr>
      <td>
        United States
      </td>

      <td>
        US
      </td>

      <td>
        USD
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)
      </td>

      <td>
        1
      </td>
    </tr>

    <tr>
      <td>
        United States Minor Outlying Islands
      </td>

      <td>
        UM
      </td>

      <td>
        USD
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        1
      </td>
    </tr>

    <tr>
      <td>
        Uruguay
      </td>

      <td>
        UY
      </td>

      <td>
        UYU\
        UYI
      </td>

      <td>
        2\
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)  
        * \*CI\*\* (Identity Card)
      </td>

      <td>
        598
      </td>
    </tr>

    <tr>
      <td>
        Venezuela, Bolivarian Republic Of
      </td>

      <td>
        VE
      </td>

      <td>
        VEF
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        58
      </td>
    </tr>

    <tr>
      <td>
        Virgin Islands (British)
      </td>

      <td>
        VG
      </td>

      <td>
        USD
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        1-284
      </td>
    </tr>

    <tr>
      <td>
        Virgin Islands (US)
      </td>

      <td>
        VI
      </td>

      <td>
        USD
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        1-340
      </td>
    </tr>
  </tbody>
</Table>

#

# Africa

<Table>
  <thead>
    <tr>
      <th>
        Name
      </th>

      <th>
        Country code (ISO 3166-1)
      </th>

      <th>
        Currency code (ISO 4217)
      </th>

      <th>
        Currency decimal points
      </th>

      <th>
        Document type
      </th>

      <th>
        Phone code
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Algeria
      </td>

      <td>
        DZ
      </td>

      <td>
        DZD
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        213
      </td>
    </tr>

    <tr>
      <td>
        Angola
      </td>

      <td>
        AO
      </td>

      <td>
        AOA
      </td>

      <td>
        2
      </td>

      <td>
        Cartão de Identificação do Cidadão
      </td>

      <td>
        244
      </td>
    </tr>

    <tr>
      <td>
        Benin
      </td>

      <td>
        BJ
      </td>

      <td>
        XOF
      </td>

      <td>
        0
      </td>

      <td>
        * \*CNIP\*\* (Carte Nationale d'Identité Personnelle)
      </td>

      <td>
        229
      </td>
    </tr>

    <tr>
      <td>
        Botswana
      </td>

      <td>
        BW
      </td>

      <td>
        BWP
      </td>

      <td>
        2
      </td>

      <td>
        * \*ID\*\* (National Identity Card)
      </td>

      <td>
        267
      </td>
    </tr>

    <tr>
      <td>
        Burkina Faso
      </td>

      <td>
        BF
      </td>

      <td>
        XOF
      </td>

      <td>
        0
      </td>

      <td>
        * \*CNI\*\* (Carte Nationale d'Identité)
      </td>

      <td>
        226
      </td>
    </tr>

    <tr>
      <td>
        Burundi
      </td>

      <td>
        BI
      </td>

      <td>
        BIF
      </td>

      <td>
        0
      </td>

      <td>
        * \*CNI\*\* (Carte Nationale d'Identité)
      </td>

      <td>
        257
      </td>
    </tr>

    <tr>
      <td>
        Cameroon
      </td>

      <td>
        CM
      </td>

      <td>
        XAF
      </td>

      <td>
        0
      </td>

      <td>
        * \*CNI\*\* (Carte Nationale d'Identité)
      </td>

      <td>
        237
      </td>
    </tr>

    <tr>
      <td>
        Cape Verde
      </td>

      <td>
        CV
      </td>

      <td>
        CVE
      </td>

      <td>
        0
      </td>

      <td>
        * \*BI\*\* (Bilhete de Identidade)
      </td>

      <td>
        238
      </td>
    </tr>

    <tr>
      <td>
        Central African Republic
      </td>

      <td>
        CF
      </td>

      <td>
        XAF
      </td>

      <td>
        0
      </td>

      <td>
        * \*PAS\*\* (Passport)  National ID Card
      </td>

      <td>
        236
      </td>
    </tr>

    <tr>
      <td>
        Chad
      </td>

      <td>
        TD
      </td>

      <td>
        XAF
      </td>

      <td>
        0
      </td>

      <td>

      </td>

      <td>
        235
      </td>
    </tr>

    <tr>
      <td>
        Comoros
      </td>

      <td>
        KM
      </td>

      <td>
        KMF
      </td>

      <td>
        0
      </td>

      <td>
        Carte d'Identité Nationale
      </td>

      <td>
        269
      </td>
    </tr>

    <tr>
      <td>
        Democratic Republic Of Congo
      </td>

      <td>
        CD
      </td>

      <td>
        CDF
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\*(Passport)\
          National ID Card
      </td>

      <td>
        243
      </td>
    </tr>

    <tr>
      <td>
        Djibouti
      </td>

      <td>
        DJ
      </td>

      <td>
        DJF
      </td>

      <td>
        0
      </td>

      <td>
        * \*PAS\*\* (Passport)  National ID Card
      </td>

      <td>
        253
      </td>
    </tr>

    <tr>
      <td>
        Egypt
      </td>

      <td>
        EG
      </td>

      <td>
        EGP
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)  National ID Card\
          Driver's license
      </td>

      <td>
        20
      </td>
    </tr>

    <tr>
      <td>
        Equatorial Guinea
      </td>

      <td>
        GQ
      </td>

      <td>
        XAF
      </td>

      <td>
        0
      </td>

      <td>
        * \*PAS\*\* (Passport)  National ID Card
      </td>

      <td>
        240
      </td>
    </tr>

    <tr>
      <td>
        Eritrea
      </td>

      <td>
        ER
      </td>

      <td>
        ERN
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)  National ID Card
      </td>

      <td>
        291
      </td>
    </tr>

    <tr>
      <td>
        Ethiopia
      </td>

      <td>
        ET
      </td>

      <td>
        ETB
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)  National ID Card\
          Driver's license
      </td>

      <td>
        251
      </td>
    </tr>

    <tr>
      <td>
        French Southern Territories
      </td>

      <td>
        TF
      </td>

      <td>
        EUR
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>

      </td>
    </tr>

    <tr>
      <td>
        Gabon Republic
      </td>

      <td>
        GA
      </td>

      <td>
        XAF
      </td>

      <td>
        0
      </td>

      <td>
        * \*PAS\*\* (Passport)  National ID Card
      </td>

      <td>
        241
      </td>
    </tr>

    <tr>
      <td>
        Gambia
      </td>

      <td>
        GM
      </td>

      <td>
        GMD
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)  National ID Card
      </td>

      <td>
        220
      </td>
    </tr>

    <tr>
      <td>
        Ghana
      </td>

      <td>
        GH
      </td>

      <td>
        GHS
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)  National ID Card\
          Voter ID Card
      </td>

      <td>
        233
      </td>
    </tr>

    <tr>
      <td>
        Guinea-bissau
      </td>

      <td>
        GW
      </td>

      <td>
        XOF
      </td>

      <td>
        0
      </td>

      <td>

      </td>

      <td>
        245
      </td>
    </tr>

    <tr>
      <td>
        Guinea
      </td>

      <td>
        GN
      </td>

      <td>
        GNF
      </td>

      <td>
        0
      </td>

      <td>
        * \*PAS\*\* (Passport)  National ID Card
      </td>

      <td>
        224
      </td>
    </tr>

    <tr>
      <td>
        Kenya
      </td>

      <td>
        KE
      </td>

      <td>
        KES
      </td>

      <td>
        2
      </td>

      <td>
        National ID Card
      </td>

      <td>
        254
      </td>
    </tr>

    <tr>
      <td>
        Lesotho
      </td>

      <td>
        LS
      </td>

      <td>
        LSL\
        ZAR
      </td>

      <td>
        2\
        2
      </td>

      <td>
        National ID Card
      </td>

      <td>
        266
      </td>
    </tr>

    <tr>
      <td>
        Liberia
      </td>

      <td>
        LR
      </td>

      <td>
        LRD
      </td>

      <td>
        2
      </td>

      <td>
        National Identification Registry Card
      </td>

      <td>
        231
      </td>
    </tr>

    <tr>
      <td>
        Libya
      </td>

      <td>
        LY
      </td>

      <td>
        LYD
      </td>

      <td>
        3
      </td>

      <td>
        National ID Card
      </td>

      <td>
        218
      </td>
    </tr>

    <tr>
      <td>
        Madagascar
      </td>

      <td>
        MG
      </td>

      <td>
        MGA
      </td>

      <td>
        0.7[8]
      </td>

      <td>
        National ID Card
      </td>

      <td>
        261
      </td>
    </tr>

    <tr>
      <td>
        Malawi
      </td>

      <td>
        MW
      </td>

      <td>
        MWK
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        265
      </td>
    </tr>

    <tr>
      <td>
        Mali
      </td>

      <td>
        ML
      </td>

      <td>
        XOF
      </td>

      <td>
        0
      </td>

      <td>

      </td>

      <td>
        223
      </td>
    </tr>

    <tr>
      <td>
        Mauritania
      </td>

      <td>
        MR
      </td>

      <td>
        MRO
      </td>

      <td>
        0.7[8]
      </td>

      <td>

      </td>

      <td>
        222
      </td>
    </tr>

    <tr>
      <td>
        Mauritius
      </td>

      <td>
        MU
      </td>

      <td>
        MUR
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        230
      </td>
    </tr>

    <tr>
      <td>
        Mayotte
      </td>

      <td>
        YT
      </td>

      <td>
        EUR
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        262
      </td>
    </tr>

    <tr>
      <td>
        Morocco
      </td>

      <td>
        MA
      </td>

      <td>
        MAD
      </td>

      <td>
        2
      </td>

      <td>
        National ID Card
      </td>

      <td>
        212
      </td>
    </tr>

    <tr>
      <td>
        Mozambique
      </td>

      <td>
        MZ
      </td>

      <td>
        MZN
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        258
      </td>
    </tr>

    <tr>
      <td>
        Namibia
      </td>

      <td>
        NA
      </td>

      <td>
        NAD\
        ZAR
      </td>

      <td>
        2\
        2
      </td>

      <td>

      </td>

      <td>
        264
      </td>
    </tr>

    <tr>
      <td>
        Niger
      </td>

      <td>
        NE
      </td>

      <td>
        XOF
      </td>

      <td>
        0
      </td>

      <td>

      </td>

      <td>
        227
      </td>
    </tr>

    <tr>
      <td>
        Nigeria
      </td>

      <td>
        NG
      </td>

      <td>
        NGN
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        234
      </td>
    </tr>

    <tr>
      <td>
        Republic Of Congo
      </td>

      <td>
        CG
      </td>

      <td>
        XAF
      </td>

      <td>
        0
      </td>

      <td>
        * \*PAS\*\* (Passport)\
          National ID Card
      </td>

      <td>
        242
      </td>
    </tr>

    <tr>
      <td>
        Reunion
      </td>

      <td>
        RE
      </td>

      <td>
        EUR
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        262
      </td>
    </tr>

    <tr>
      <td>
        Rwanda
      </td>

      <td>
        RW
      </td>

      <td>
        RWF
      </td>

      <td>
        0
      </td>

      <td>

      </td>

      <td>
        250
      </td>
    </tr>

    <tr>
      <td>
        Saint Helena, Ascension And Tristan Da Cunha
      </td>

      <td>
        SH
      </td>

      <td>
        SHP
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        290
      </td>
    </tr>

    <tr>
      <td>
        São Tomé and Príncipe
      </td>

      <td>
        ST
      </td>

      <td>
        STD
      </td>

      <td>
        0
      </td>

      <td>

      </td>

      <td>
        239
      </td>
    </tr>

    <tr>
      <td>
        Senegal
      </td>

      <td>
        SN
      </td>

      <td>
        XOF
      </td>

      <td>
        0
      </td>

      <td>

      </td>

      <td>
        221
      </td>
    </tr>

    <tr>
      <td>
        Seychelles
      </td>

      <td>
        SC
      </td>

      <td>
        SCR
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        248
      </td>
    </tr>

    <tr>
      <td>
        Sierra Leone
      </td>

      <td>
        SL
      </td>

      <td>
        SLL
      </td>

      <td>
        0
      </td>

      <td>

      </td>

      <td>
        232
      </td>
    </tr>

    <tr>
      <td>
        Somalia
      </td>

      <td>
        SO
      </td>

      <td>
        SOS
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        252
      </td>
    </tr>

    <tr>
      <td>
        South Africa
      </td>

      <td>
        ZA
      </td>

      <td>
        ZAR
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        27
      </td>
    </tr>

    <tr>
      <td>
        South Sudan
      </td>

      <td>
        SS
      </td>

      <td>
        SSP
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        211
      </td>
    </tr>

    <tr>
      <td>
        Sudan
      </td>

      <td>
        SD
      </td>

      <td>
        SDG
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        249
      </td>
    </tr>

    <tr>
      <td>
        Swaziland
      </td>

      <td>
        SZ
      </td>

      <td>
        SZL
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        268
      </td>
    </tr>

    <tr>
      <td>
        Tanzania, United Republic Of
      </td>

      <td>
        TZ
      </td>

      <td>
        TZS
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        255
      </td>
    </tr>

    <tr>
      <td>
        Togo
      </td>

      <td>
        TG
      </td>

      <td>
        XOF
      </td>

      <td>
        0
      </td>

      <td>

      </td>

      <td>
        228
      </td>
    </tr>

    <tr>
      <td>
        Tunisia
      </td>

      <td>
        TN
      </td>

      <td>
        TND
      </td>

      <td>
        3
      </td>

      <td>

      </td>

      <td>
        216
      </td>
    </tr>

    <tr>
      <td>
        Uganda
      </td>

      <td>
        UG
      </td>

      <td>
        UGX
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        256
      </td>
    </tr>

    <tr>
      <td>
        Western Sahara
      </td>

      <td>
        EH
      </td>

      <td>
        MAD
      </td>

      <td>
        2
      </td>

      <td>
        No se emiten documentos de identidad reconocidos
      </td>

      <td>
        212
      </td>
    </tr>

    <tr>
      <td>
        Zambia
      </td>

      <td>
        ZM
      </td>

      <td>
        ZMW
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        260
      </td>
    </tr>
  </tbody>
</Table>

# Asia Pacific

<Table>
  <thead>
    <tr>
      <th>
        Name
      </th>

      <th>
        Country code (ISO 3166-1)
      </th>

      <th>
        Currency code (ISO 4217)
      </th>

      <th>
        Currency decimal points
      </th>

      <th>
        Document type
      </th>

      <th>
        Phone code
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Afghanistan
      </td>

      <td>
        AF
      </td>

      <td>
        AFN
      </td>

      <td>
        2
      </td>

      <td>
        Tazkira
      </td>

      <td>
        93
      </td>
    </tr>

    <tr>
      <td>
        Armenia
      </td>

      <td>
        AM
      </td>

      <td>
        AMD
      </td>

      <td>
        2
      </td>

      <td>
        Tarjeta de Identidad
      </td>

      <td>
        374
      </td>
    </tr>

    <tr>
      <td>
        Australia
      </td>

      <td>
        AU
      </td>

      <td>
        AUD
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)\
          ID Card
      </td>

      <td>
        61
      </td>
    </tr>

    <tr>
      <td>
        Azerbaijan
      </td>

      <td>
        AZ
      </td>

      <td>
        AZN
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)  National ID Card
      </td>

      <td>
        994
      </td>
    </tr>

    <tr>
      <td>
        Bahrain
      </td>

      <td>
        BH
      </td>

      <td>
        BHD
      </td>

      <td>
        3
      </td>

      <td>

      </td>

      <td>
        973
      </td>
    </tr>

    <tr>
      <td>
        Bangladesh
      </td>

      <td>
        BD
      </td>

      <td>
        BDT
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)  National ID Card
      </td>

      <td>
        880
      </td>
    </tr>

    <tr>
      <td>
        Bhutan
      </td>

      <td>
        BT
      </td>

      <td>
        INR\
        BTN
      </td>

      <td>
        2\
        2
      </td>

      <td>

      </td>

      <td>
        975
      </td>
    </tr>

    <tr>
      <td>
        Brunei Darussalam
      </td>

      <td>
        BN
      </td>

      <td>
        BND
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        673
      </td>
    </tr>

    <tr>
      <td>
        Cambodia
      </td>

      <td>
        KH
      </td>

      <td>
        KHR
      </td>

      <td>
        2
      </td>

      <td>
        National ID Card
      </td>

      <td>
        855
      </td>
    </tr>

    <tr>
      <td>
        China
      </td>

      <td>
        CN
      </td>

      <td>
        CNY
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        86
      </td>
    </tr>

    <tr>
      <td>
        Christmas Island
      </td>

      <td>
        CX
      </td>

      <td>
        AUD
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)\
          Australian driver's license
      </td>

      <td>
        61
      </td>
    </tr>

    <tr>
      <td>
        Cocos (Keeling) Islands
      </td>

      <td>
        CC
      </td>

      <td>
        AUD
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)\
          Australian driver's licenses
      </td>

      <td>
        61
      </td>
    </tr>

    <tr>
      <td>
        Cook Islands
      </td>

      <td>
        CK
      </td>

      <td>
        NZD
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)\
          Driver's license\
          National ID Card\
          Birth certificate
      </td>

      <td>
        682
      </td>
    </tr>

    <tr>
      <td>
        Fiji
      </td>

      <td>
        FJ
      </td>

      <td>
        FJD
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)
      </td>

      <td>
        679
      </td>
    </tr>

    <tr>
      <td>
        French Polynesia
      </td>

      <td>
        PF
      </td>

      <td>
        XPF
      </td>

      <td>
        0
      </td>

      <td>

      </td>

      <td>
        689
      </td>
    </tr>

    <tr>
      <td>
        Guam
      </td>

      <td>
        GU
      </td>

      <td>
        USD
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        1-671
      </td>
    </tr>

    <tr>
      <td>
        Hong Kong
      </td>

      <td>
        HK
      </td>

      <td>
        HKD
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        852
      </td>
    </tr>

    <tr>
      <td>
        India
      </td>

      <td>
        IN
      </td>

      <td>
        INR
      </td>

      <td>
        2
      </td>

      <td>
        Aadhaar Card
      </td>

      <td>
        91
      </td>
    </tr>

    <tr>
      <td>
        Indonesia
      </td>

      <td>
        ID
      </td>

      <td>
        IDR
      </td>

      <td>
        2
      </td>

      <td>
        * \*KTP\*\* (Kartu Tanda Penduduk)
      </td>

      <td>
        62
      </td>
    </tr>

    <tr>
      <td>
        Iran
      </td>

      <td>
        IR
      </td>

      <td>
        IRR
      </td>

      <td>
        0
      </td>

      <td>
        National Card
      </td>

      <td>
        98
      </td>
    </tr>

    <tr>
      <td>
        Iraq
      </td>

      <td>
        IQ
      </td>

      <td>
        IQD
      </td>

      <td>
        3
      </td>

      <td>
        National Card
      </td>

      <td>
        964
      </td>
    </tr>

    <tr>
      <td>
        Israel
      </td>

      <td>
        IL
      </td>

      <td>
        ILS
      </td>

      <td>
        2
      </td>

      <td>
        Teudat Zehut
      </td>

      <td>
        972
      </td>
    </tr>

    <tr>
      <td>
        Japan
      </td>

      <td>
        JP
      </td>

      <td>
        JPY
      </td>

      <td>
        0
      </td>

      <td>
        My Number Card
      </td>

      <td>
        81
      </td>
    </tr>

    <tr>
      <td>
        Jordan
      </td>

      <td>
        JO
      </td>

      <td>
        JOD
      </td>

      <td>
        3
      </td>

      <td>
        National ID Card
      </td>

      <td>
        962
      </td>
    </tr>

    <tr>
      <td>
        Kazakhstan
      </td>

      <td>
        KZ
      </td>

      <td>
        KZT
      </td>

      <td>
        2
      </td>

      <td>
        National ID Card
      </td>

      <td>
        7
      </td>
    </tr>

    <tr>
      <td>
        Kiribati
      </td>

      <td>
        KI
      </td>

      <td>
        AUD
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)
      </td>

      <td>
        686
      </td>
    </tr>

    <tr>
      <td>
        Kuwait
      </td>

      <td>
        KW
      </td>

      <td>
        KWD
      </td>

      <td>
        3
      </td>

      <td>
        Civil ID Card
      </td>

      <td>
        965
      </td>
    </tr>

    <tr>
      <td>
        Kyrgyzstan
      </td>

      <td>
        KG
      </td>

      <td>
        KGS
      </td>

      <td>
        2
      </td>

      <td>
        National ID Card
      </td>

      <td>
        996
      </td>
    </tr>

    <tr>
      <td>
        Lebanon
      </td>

      <td>
        LB
      </td>

      <td>
        LBP
      </td>

      <td>
        0
      </td>

      <td>
        National ID Card
      </td>

      <td>
        961
      </td>
    </tr>

    <tr>
      <td>
        Macao
      </td>

      <td>
        MO
      </td>

      <td>
        MOP
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        853
      </td>
    </tr>

    <tr>
      <td>
        Malaysia
      </td>

      <td>
        MY
      </td>

      <td>
        MYR
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        60
      </td>
    </tr>

    <tr>
      <td>
        Maldives
      </td>

      <td>
        MV
      </td>

      <td>
        MVR
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        960
      </td>
    </tr>

    <tr>
      <td>
        Marshall Islands
      </td>

      <td>
        MH
      </td>

      <td>
        USD
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)
      </td>

      <td>
        692
      </td>
    </tr>

    <tr>
      <td>
        Micronesia
      </td>

      <td>
        FM
      </td>

      <td>
        USD
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)\
          National ID Card
      </td>

      <td>
        691
      </td>
    </tr>

    <tr>
      <td>
        Mongolia
      </td>

      <td>
        MN
      </td>

      <td>
        MNT
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        976
      </td>
    </tr>

    <tr>
      <td>
        Myanmar
      </td>

      <td>
        MM
      </td>

      <td>
        MMK
      </td>

      <td>
        0
      </td>

      <td>

      </td>

      <td>
        95
      </td>
    </tr>

    <tr>
      <td>
        Nauru
      </td>

      <td>
        NR
      </td>

      <td>
        AUD
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)
      </td>

      <td>
        674
      </td>
    </tr>

    <tr>
      <td>
        Nepal
      </td>

      <td>
        NP
      </td>

      <td>
        NPR
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        977
      </td>
    </tr>

    <tr>
      <td>
        New Caledonia
      </td>

      <td>
        NC
      </td>

      <td>
        XPF
      </td>

      <td>
        0
      </td>

      <td>
        Carte d'identité de Nouvelle-Calédonie
      </td>

      <td>
        687
      </td>
    </tr>

    <tr>
      <td>
        New Zealand
      </td>

      <td>
        NZ
      </td>

      <td>
        NZD
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)\
          Tarjeta de Identificación
      </td>

      <td>
        64
      </td>
    </tr>

    <tr>
      <td>
        Niue
      </td>

      <td>
        NU
      </td>

      <td>
        NZD
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        683
      </td>
    </tr>

    <tr>
      <td>
        Norfolk Island
      </td>

      <td>
        NF
      </td>

      <td>
        AUD
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        672
      </td>
    </tr>

    <tr>
      <td>
        Northern Mariana Islands
      </td>

      <td>
        MP
      </td>

      <td>
        USD
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        1-670
      </td>
    </tr>

    <tr>
      <td>
        Oman
      </td>

      <td>
        OM
      </td>

      <td>
        OMR
      </td>

      <td>
        3
      </td>

      <td>

      </td>

      <td>
        968
      </td>
    </tr>

    <tr>
      <td>
        Pakistan
      </td>

      <td>
        PK
      </td>

      <td>
        PKR
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        92
      </td>
    </tr>

    <tr>
      <td>
        Palau
      </td>

      <td>
        PW
      </td>

      <td>
        USD
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)
      </td>

      <td>
        680
      </td>
    </tr>

    <tr>
      <td>
        Papua New Guinea
      </td>

      <td>
        PG
      </td>

      <td>
        PGK
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)
      </td>

      <td>
        675
      </td>
    </tr>

    <tr>
      <td>
        Philippines
      </td>

      <td>
        PH
      </td>

      <td>
        PHP
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        63
      </td>
    </tr>

    <tr>
      <td>
        Pitcairn Islands
      </td>

      <td>
        PN
      </td>

      <td>
        NZD
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        872
      </td>
    </tr>

    <tr>
      <td>
        Qatar
      </td>

      <td>
        QA
      </td>

      <td>
        QAR
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        974
      </td>
    </tr>

    <tr>
      <td>
        Samoa
      </td>

      <td>
        WS
      </td>

      <td>
        WST
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        685
      </td>
    </tr>

    <tr>
      <td>
        Saudi Arabia
      </td>

      <td>
        SA
      </td>

      <td>
        SAR
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        966
      </td>
    </tr>

    <tr>
      <td>
        Singapore
      </td>

      <td>
        SG
      </td>

      <td>
        SGD
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        65
      </td>
    </tr>

    <tr>
      <td>
        Solomon Islands
      </td>

      <td>
        SB
      </td>

      <td>
        SBD
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)
      </td>

      <td>
        677
      </td>
    </tr>

    <tr>
      <td>
        South Korea
      </td>

      <td>
        KR
      </td>

      <td>
        KRW
      </td>

      <td>
        0
      </td>

      <td>
        * \*RRN\*\*(Resident Registration Number)
      </td>

      <td>
        82
      </td>
    </tr>

    <tr>
      <td>
        Sri Lanka
      </td>

      <td>
        LK
      </td>

      <td>
        LKR
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)\
          National ID Card
      </td>

      <td>
        94
      </td>
    </tr>

    <tr>
      <td>
        Syria
      </td>

      <td>
        SY
      </td>

      <td>
        SYP
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        963
      </td>
    </tr>

    <tr>
      <td>
        Taiwan
      </td>

      <td>
        TW
      </td>

      <td>
        TWD
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        886
      </td>
    </tr>

    <tr>
      <td>
        Tajikistan
      </td>

      <td>
        TJ
      </td>

      <td>
        TJS
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        992
      </td>
    </tr>

    <tr>
      <td>
        Thailand
      </td>

      <td>
        TH
      </td>

      <td>
        THB
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        66
      </td>
    </tr>

    <tr>
      <td>
        Tokelau
      </td>

      <td>
        TK
      </td>

      <td>
        NZD
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        690
      </td>
    </tr>

    <tr>
      <td>
        Tonga
      </td>

      <td>
        TO
      </td>

      <td>
        TOP
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)
      </td>

      <td>
        676
      </td>
    </tr>

    <tr>
      <td>
        Turkmenistan
      </td>

      <td>
        TM
      </td>

      <td>
        TMT
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        993
      </td>
    </tr>

    <tr>
      <td>
        Tuvalu
      </td>

      <td>
        TV
      </td>

      <td>
        AUD
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)
      </td>

      <td>
        688
      </td>
    </tr>

    <tr>
      <td>
        United Arab Emirates
      </td>

      <td>
        AE
      </td>

      <td>
        AED
      </td>

      <td>
        2
      </td>

      <td>
        Emirates ID
      </td>

      <td>
        971
      </td>
    </tr>

    <tr>
      <td>
        Uzbekistan
      </td>

      <td>
        UZ
      </td>

      <td>
        UZS
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        998
      </td>
    </tr>

    <tr>
      <td>
        Vanuatu
      </td>

      <td>
        VU
      </td>

      <td>
        VUV
      </td>

      <td>
        0
      </td>

      <td>
        * \*PAS\*\* (Passport)
      </td>

      <td>
        678
      </td>
    </tr>

    <tr>
      <td>
        Vietnam
      </td>

      <td>
        VN
      </td>

      <td>
        VND
      </td>

      <td>
        0
      </td>

      <td>

      </td>

      <td>
        84
      </td>
    </tr>

    <tr>
      <td>
        Wallis and Futuna
      </td>

      <td>
        WF
      </td>

      <td>
        XPF
      </td>

      <td>
        0
      </td>

      <td>
        Carte d'identité territoriale de Wallis-et-Futuna
      </td>

      <td>
        681
      </td>
    </tr>

    <tr>
      <td>
        Yemen
      </td>

      <td>
        YE
      </td>

      <td>
        YER
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        967
      </td>
    </tr>
  </tbody>
</Table>

# Europe

<Table>
  <thead>
    <tr>
      <th>
        Name
      </th>

      <th>
        Country code (ISO 3166-1)
      </th>

      <th>
        Currency code (ISO 4217)
      </th>

      <th>
        Currency decimal points
      </th>

      <th>
        Document type
      </th>

      <th>
        Phone code
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        Åland Islands
      </td>

      <td>
        AX
      </td>

      <td>
        EUR
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)\
          National ID card
      </td>

      <td>
        358
      </td>
    </tr>

    <tr>
      <td>
        Albania
      </td>

      <td>
        AL
      </td>

      <td>
        ALL
      </td>

      <td>
        2
      </td>

      <td>
        Tarjeta de Identidad Electrónica
      </td>

      <td>
        355
      </td>
    </tr>

    <tr>
      <td>
        Andorra
      </td>

      <td>
        AD
      </td>

      <td>
        EUR
      </td>

      <td>
        2
      </td>

      <td>
        Targeta de Resident
      </td>

      <td>
        376
      </td>
    </tr>

    <tr>
      <td>
        Austria
      </td>

      <td>
        AT
      </td>

      <td>
        EUR
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        43
      </td>
    </tr>

    <tr>
      <td>
        Belarus
      </td>

      <td>
        BY
      </td>

      <td>
        BYR
      </td>

      <td>
        0
      </td>

      <td>
        * \*PAS\*\* (Passport)\
          National ID Card
      </td>

      <td>
        375
      </td>
    </tr>

    <tr>
      <td>
        Belgium
      </td>

      <td>
        BE
      </td>

      <td>
        EUR
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)\
          National ID Card
      </td>

      <td>
        32
      </td>
    </tr>

    <tr>
      <td>
        Bosnia & Herzegovina
      </td>

      <td>
        BA
      </td>

      <td>
        BAM
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)\
          National ID Card
      </td>

      <td>
        387
      </td>
    </tr>

    <tr>
      <td>
        Bulgaria
      </td>

      <td>
        BG
      </td>

      <td>
        BGN
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        359
      </td>
    </tr>

    <tr>
      <td>
        Croatia
      </td>

      <td>
        HR
      </td>

      <td>
        HRK
      </td>

      <td>
        2
      </td>

      <td>
        * \*OI\*\* (Osobna iskaznica)
      </td>

      <td>
        385
      </td>
    </tr>

    <tr>
      <td>
        Cyprus
      </td>

      <td>
        CY
      </td>

      <td>
        EUR
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)\
          National ID Card
      </td>

      <td>
        357
      </td>
    </tr>

    <tr>
      <td>
        Czech Republic
      </td>

      <td>
        CZ
      </td>

      <td>
        VZK
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)\
          National ID Card\
          Driver's license
      </td>

      <td>
        420
      </td>
    </tr>

    <tr>
      <td>
        Denmark
      </td>

      <td>
        DK
      </td>

      <td>
        DKK
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)\
          National ID Card\
          Driver's license
      </td>

      <td>
        45
      </td>
    </tr>

    <tr>
      <td>
        Estonia
      </td>

      <td>
        EE
      </td>

      <td>
        EUR
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)\
          National ID Card
      </td>

      <td>
        372
      </td>
    </tr>

    <tr>
      <td>
        Faroe Islands
      </td>

      <td>
        FO
      </td>

      <td>
        DKK
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)\
          Driver's licenses\
          National ID Card
      </td>

      <td>
        298
      </td>
    </tr>

    <tr>
      <td>
        Finland
      </td>

      <td>
        FI
      </td>

      <td>
        EUR
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)\
          National ID Card\
          Driver's license
      </td>

      <td>
        358
      </td>
    </tr>

    <tr>
      <td>
        France
      </td>

      <td>
        FR
      </td>

      <td>
        EUR
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)\
          National ID Card\
          Driver's license
      </td>

      <td>
        33
      </td>
    </tr>

    <tr>
      <td>
        Georgia
      </td>

      <td>
        GE
      </td>

      <td>
        GEL
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)\
          National ID Card
      </td>

      <td>
        995
      </td>
    </tr>

    <tr>
      <td>
        Germany
      </td>

      <td>
        DE
      </td>

      <td>
        EUR
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)\
          National ID Card\
          Driver's license
      </td>

      <td>
        49
      </td>
    </tr>

    <tr>
      <td>
        Gibraltar
      </td>

      <td>
        GI
      </td>

      <td>
        GIP
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)\
          National ID Card
      </td>

      <td>
        350
      </td>
    </tr>

    <tr>
      <td>
        Greece
      </td>

      <td>
        GR
      </td>

      <td>
        EUR
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)\
          National ID Card
      </td>

      <td>
        30
      </td>
    </tr>

    <tr>
      <td>
        Greenland
      </td>

      <td>
        GL
      </td>

      <td>
        DKK
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)\
          National ID Card
      </td>

      <td>
        299
      </td>
    </tr>

    <tr>
      <td>
        Guernsey
      </td>

      <td>
        GG
      </td>

      <td>
        GBP
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)\
          National ID Card
      </td>

      <td>
        44
      </td>
    </tr>

    <tr>
      <td>
        Hungary
      </td>

      <td>
        HU
      </td>

      <td>
        HUF
      </td>

      <td>
        2
      </td>

      <td>
        * \*SZIG\*\* (Személyazonosító igazolvány)
      </td>

      <td>
        36
      </td>
    </tr>

    <tr>
      <td>
        Iceland
      </td>

      <td>
        IS
      </td>

      <td>
        ISK
      </td>

      <td>
        0
      </td>

      <td>
        Kennitala
      </td>

      <td>
        354
      </td>
    </tr>

    <tr>
      <td>
        Ireland
      </td>

      <td>
        IE
      </td>

      <td>
        EUR
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)
      </td>

      <td>
        353
      </td>
    </tr>

    <tr>
      <td>
        Isle Of Man
      </td>

      <td>
        IM
      </td>

      <td>
        GBP
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)\
          Driving License
      </td>

      <td>
        44
      </td>
    </tr>

    <tr>
      <td>
        Italy
      </td>

      <td>
        IT
      </td>

      <td>
        EUR
      </td>

      <td>
        2
      </td>

      <td>
        Carta d'Identità
      </td>

      <td>
        39
      </td>
    </tr>

    <tr>
      <td>
        Jersey
      </td>

      <td>
        JE
      </td>

      <td>
        GBP
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)\
          Driving License
      </td>

      <td>
        44
      </td>
    </tr>

    <tr>
      <td>
        Latvia
      </td>

      <td>
        LV
      </td>

      <td>
        EUR
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)\
          Personal ID Card
      </td>

      <td>
        371
      </td>
    </tr>

    <tr>
      <td>
        Liechtenstein
      </td>

      <td>
        LI
      </td>

      <td>
        CHF
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)\
          ID Card\
          Resident Permit
      </td>

      <td>
        423
      </td>
    </tr>

    <tr>
      <td>
        Lithuania
      </td>

      <td>
        LT
      </td>

      <td>
        EUR
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)\
          Personal ID Card
      </td>

      <td>
        370
      </td>
    </tr>

    <tr>
      <td>
        Luxembourg
      </td>

      <td>
        LU
      </td>

      <td>
        EUR
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)\
          National ID Card
      </td>

      <td>
        352
      </td>
    </tr>

    <tr>
      <td>
        Malta
      </td>

      <td>
        MT
      </td>

      <td>
        EUR
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        356
      </td>
    </tr>

    <tr>
      <td>
        Moldova
      </td>

      <td>
        MD
      </td>

      <td>
        MDL
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)\
          National ID Card
      </td>

      <td>
        373
      </td>
    </tr>

    <tr>
      <td>
        Monaco
      </td>

      <td>
        MC
      </td>

      <td>
        EUR
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)\
          National ID Card
      </td>

      <td>
        377
      </td>
    </tr>

    <tr>
      <td>
        Montenegro
      </td>

      <td>
        ME
      </td>

      <td>
        EUR
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)\
          ID Card
      </td>

      <td>
        382
      </td>
    </tr>

    <tr>
      <td>
        Netherlands
      </td>

      <td>
        NL
      </td>

      <td>
        EUR
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        31
      </td>
    </tr>

    <tr>
      <td>
        North Macedonia
      </td>

      <td>
        MK
      </td>

      <td>
        MKD
      </td>

      <td>
        0
      </td>

      <td>

      </td>

      <td>
        389
      </td>
    </tr>

    <tr>
      <td>
        Norway
      </td>

      <td>
        NO
      </td>

      <td>
        NOK
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        47
      </td>
    </tr>

    <tr>
      <td>
        Poland
      </td>

      <td>
        PL
      </td>

      <td>
        PLN
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        48
      </td>
    </tr>

    <tr>
      <td>
        Portugal
      </td>

      <td>
        PT
      </td>

      <td>
        EUR
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        351
      </td>
    </tr>

    <tr>
      <td>
        Romania
      </td>

      <td>
        RO
      </td>

      <td>
        RON
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        40
      </td>
    </tr>

    <tr>
      <td>
        Russia
      </td>

      <td>
        RU
      </td>

      <td>
        RUB
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        7
      </td>
    </tr>

    <tr>
      <td>
        San Marino
      </td>

      <td>
        SM
      </td>

      <td>
        EUR
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        378
      </td>
    </tr>

    <tr>
      <td>
        Serbia
      </td>

      <td>
        RS
      </td>

      <td>
        RSD
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        381
      </td>
    </tr>

    <tr>
      <td>
        Slovakia
      </td>

      <td>
        SK
      </td>

      <td>
        EUR
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        421
      </td>
    </tr>

    <tr>
      <td>
        Slovenia
      </td>

      <td>
        SI
      </td>

      <td>
        EUR
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        386
      </td>
    </tr>

    <tr>
      <td>
        Spain
      </td>

      <td>
        ES
      </td>

      <td>
        EUR
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)\
          National ID Card\
          Driver's license
      </td>

      <td>
        34
      </td>
    </tr>

    <tr>
      <td>
        Svalbard and Jan Mayen
      </td>

      <td>
        SJ
      </td>

      <td>
        NOK
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        47
      </td>
    </tr>

    <tr>
      <td>
        Sweden
      </td>

      <td>
        SE
      </td>

      <td>
        SEK
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        46
      </td>
    </tr>

    <tr>
      <td>
        Switzerland
      </td>

      <td>
        CH
      </td>

      <td>
        CHF\
        CHE\
        CHW
      </td>

      <td>
        2\
        2\
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)\
          National ID Card\
          Driver's license
      </td>

      <td>
        41
      </td>
    </tr>

    <tr>
      <td>
        Turkey
      </td>

      <td>
        TR
      </td>

      <td>
        TRY
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        90
      </td>
    </tr>

    <tr>
      <td>
        Ukraine
      </td>

      <td>
        UA
      </td>

      <td>
        UAH
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        380
      </td>
    </tr>

    <tr>
      <td>
        United Kingdom
      </td>

      <td>
        GB
      </td>

      <td>
        GBP
      </td>

      <td>
        2
      </td>

      <td>
        * \*PAS\*\* (Passport)\
          National ID Card\
          Driver's licenses
      </td>

      <td>
        44
      </td>
    </tr>

    <tr>
      <td>
        Vatican City State
      </td>

      <td>
        VA
      </td>

      <td>
        EUR
      </td>

      <td>
        2
      </td>

      <td>

      </td>

      <td>
        379
      </td>
    </tr>
  </tbody>
</Table>

<HTMLBlock>{`
<style>
  td, th {
    text-align: center !important;
  }
</style>
`}</HTMLBlock>

<br />

<br />

<HTMLBlock>{`
<style>
  .tabs {
    display: flex;
    border-bottom: 2px solid #ddd;
    margin-bottom: 20px;
  }

  input[type="radio"] {
    display: none;
  }

  label {
    text-decoration: none;
    color: #333;
    padding: 10px 20px;
    transition: all 0.3s ease;
    font-size: 16px;
    margin-right: 10px;
    border-bottom: 2px solid transparent;
    cursor: pointer;
  }

  label:hover,
  label:focus {
    color: #000;
  }

  .tab-content {
    display: none;
  }

  /* Show content when corresponding radio button is checked */
  #web:checked~.tab-content#web,
  #ios:checked~.tab-content#ios {
    display: block;
  }

  /* Style active tab */
  #web:checked~.tabs label[for="web"],
  #ios:checked~.tabs label[for="ios"] {
    color: #000;
    border-bottom: 2px solid #513CE1;
  }

  .table-card {
    border-radius: 10px;
    border: 1px solid #614ad623;
    display: flex;
    transition: all .2s;
  }

  .table-card:hover {
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
  }

  .table-card .control-icon {
    fill: rebeccapurple;
    transition: .3s ease;
    pointer-events: none;
  }

  .table-card .control-icon-close {
    display: none;
  }

  details[open] .control-icon-close {
    display: initial;
    transition: .3s ease;
  }

  details[open] .control-icon-expand {
    display: none;
  }

  details[open] summary {
    border: 1px solid #614ad623;
  }


  .table-card summary {
    padding: 0.8rem 1rem;
    border-radius: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
  }

  .table-card summary .table-call {
    display: block;
    padding: 0;
    margin: 0;
    font-size: 1rem;

  }


  .table-card summary .sumary-icon {
    display: flex;
    justify-content: flex-end;
    flex-grow: 1;
  }

  .table-card .table-div {
    margin: 0.5rem 0;
    padding: 0 0.5rem;
  }

  .table-card .table-div table {
    margin: 0 !important;
  }

  /*.table-card .table-div th {
    text-align: left;
  }*/

  /* .table-card .table-div tbody tr {
    font-size: 0.8rem;
    overflow-wrap: break-word;
  }
  
  .table-card .table-div tbody tr :first-child {
		font-weight: 600;    
  }*/

  table:only-child thead th {
    text-align: left;
  }




  @media only screen and (max-width: 700px) {
    .table-card .table-div table {
      display: block !important;
      overflow-x: auto !important;
    }
  }




  details[open] div {
    animation: sweep .3s ease-in-out;
  }

  @keyframes sweep {
    0% {
      opacity: 0;
      margin-left: -10px
    }

    100% {
      opacity: 1;
      margin-left: 0px
    }
  }
</style>

<body>
  <input type="radio" id="SandBox" name="tabs" checked>
  <input type="radio" id="Production" name="tabs">

  <div class="tabs">
    <label for="SandBox">SandBox</label>
    <label for="Production">Production</label>
  </div>

  <div class="tab-content" id="SandBox">

    <p>Tab content</p>

  </div>

  <div class="tab-content" id="Production">

    <p>Tab production</p>

  </div>
</body>
`}</HTMLBlock>
