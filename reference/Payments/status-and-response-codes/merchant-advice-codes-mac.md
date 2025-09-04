---
title: Merchant Advice Codes (MAC)
deprecated: false
hidden: true
metadata:
  robots: index
---
When transactions are declined, Merchant Advice Codes (MAC) serve as guiding signals indicating whether and when a declined transaction should be retried. To assist decision making and transparency, Yuno has implemented normalized and raw response codes into its public APIs. Understanding MACs will prove extremely useful when trying to understand the reason for a decline, and what to adjust in case you're allowed to retry it, such as routing or customer information. 

## About retries

When a card purchase is declined, any subsequent attempt to complete the purchase using the same card is a retry. Fees and thresholds for retries are defined by each card network. How many times you can retry before fees apply varies by brand. Merchants that don’t comply may be charged fees for exceeded transactions.

The payments industry, together with ABECS, standardized response codes for card transaction declines. These attempts are categorized into two types:

* **Reversible**: A potentially temporary denial that may change over time. The issuer may deny the transaction due to insufficient funds, system issues, or too many unsuccessful PIN attempts.
* **Irreversible**: Any authorization after an irreversible decline that doesn’t change message fields will fail. This could mean the card has been cancelled or fraud has been confirmed.

Visa, Mastercard, and Elo updated their policies to limit authorization retry attempts after a decline, and they charge fees for attempts beyond those limits. See each brand’s rules below.

* VISA
* Mastercard
* Elo
* Other brands

### MAC fields on transactions

Yuno has implemented several fields within its public API to streamline the use of MACs in your implementation and ease the gathering of information.

First, we have Yuno-normalized fields:

* **`transactions.merchant_advice_code`**: A Yuno-normalized MAC returned upon transaction decline. Understanding the meaning of this code will provide vital guidance regarding the reason for the denial, whether it can be retried, and potential actions you need to perform before trying again.
* **`transactions.merchant_advice_code_message`**: This fields complements the `merchant_advice_code` seen above, providing an explanation of the code in human‑readable terms. This message will allow you to act on the information without having to memorize the meaning of each code.

We also provide raw MAC fields for transparency from each provider.

* **`transactions.provider_data.merchant_advice_code`**: Raw MAC as sent by the provider.
* **`transactions.provider_data.merchant_advice_code_message`**: Raw provider message associated with the MAC.

## Mastercard (program details)

Mastercard’s Transaction Processing Excellence (TPE) has two components:

### Excessive attempts

Monitors retries of declined transactions for both card‑present and card‑not‑present flows. Charges apply when brand retry limits are exceeded.

* Fees apply when a merchant exceeds the brand’s retry limits. Mastercard also monitors approved nominal‑value authorizations later reversed (under ~1 unit of currency).
* Monitoring applies to retries of declined and approved purchase transactions in both CP and CNP.
* A retry is any authorization attempt using the same card and the same merchant identifier.
* Brand rule changes have lowered the daily/monthly attempt thresholds, limiting to 8 daily attempts and introduced a 30‑day rolling cap. Even if a daily cap isn’t exceeded, exceeding the monthly cap can still trigger fees.

### Merchant Advice Code Transaction Excellence (MAC)

Monitors retries for irreversible declines in card‑not‑present flows. Under this component, brand charges specifically target MAC 03 and MAC 21.

* Fees under MAC Transaction Excellence focus on irreversible declines with MAC 03 and MAC 21. Other MACs (01, 02, 04, 24–30, 40, 41, 43) are not charged under the MAC component, but may be charged under Excessive Attempts if retry limits are exceeded.
* Since Oct 14, 2022, MAC 24–30 are issued alongside response code 51 (insufficient funds) to signal specific defer windows (1h, 24h, 2d, 4d, 6d, 8d, 10d) so the merchant can choose the best action.

| Provider MAC Code (Mastercard)                 | `merchant_advice_code`     | `merchant_advice_code_message`        |
| :--------------------------------------------- | :------------------------- | :------------------------------------ |
| 01 - Updated account information available     | UPDATE_INFORMATION         | Updated/additional information needed |
| 02 - Try again later                           | TRY_AGAIN_LATER            | Retry within 30 days                  |
| 03 - Do not try again                          | DO_NOT_TRY_AGAIN           | Do not try again                      |
| 04 - Token requirements not fulfilled          | REQUIREMENTS_NOT_FULFILLED | Token requirements not fulfilled      |
| 21 - Recurring plan cancelled                  | NO_RETRY_LIFE_CYCLE        | No retry life cycle                   |
| 24 - Retry after 1 hour (insufficient funds)   | RETRY_AFTER_1_H            | Retry after 1 hours                   |
| 25 - Retry after 24 hours (insufficient funds) | RETRY_AFTER_24_H           | Retry after 24 hours                  |
| 26 - Retry after 2 days (insufficient funds)   | RETRY_AFTER_2_D            | Retry after 2 days                    |
| 27 - Retry after 4 days (insufficient funds)   | RETRY_AFTER_4_D            | Retry after 4 days                    |
| 28 - Retry after 6 days (insufficient funds)   | RETRY_AFTER_6_D            | Retry after 6 days                    |
| 29 - Retry after 8 days (insufficient funds)   | RETRY_AFTER_8_D            | Retry after 8 days                    |
| 30 - Retry after 10 days (insufficient funds)  | RETRY_AFTER_10_D           | Retry after 10 days                   |
| 40 - Non-rechargeable prepaid card             | NO_RETRY_POLICY            | No retry policy                       |
| 42 - Sanction score exceeded                   | NO_RETRY_SECURITY          | No retry security                     |
| 43 - Multiple-use virtual card                 | MULTIPLE_USE_CARD          | Multiple-use virtual card             |

* Some legacy issuer codes may no longer be sent (e.g., 04, 14, 43, 54, 57, 62, 63). Mastercard can consolidate issuer responses into proprietary categories 79 (Life cycle), 82 (Policy), and 83 (Fraud/Security) and attach a MAC to indicate retry guidance.

**Example**: when an issuer returns 54 (expired card), Mastercard may replace it with 79 (life‑cycle decline) and include the appropriate MAC to indicate whether to retry.

* **MAC 03 and MAC 21 retries**: Applies to card‑not‑present transactions. Any payment attempt using the same card and the same merchant counts as a retry. For MAC 03 and MAC 21, retries are counted regardless of the original response code. “Excess” is measured from the first retry within a 30‑day window, and the counter resets after 30 days. If limits are exceeded, fees may be charged under both the MAC 03/21 program and the Excessive Attempts program. Fee amounts and thresholds are set by the network and can vary by market/period.

## Visa

Visa charges apply when a merchant exceeds the brand’s retry rules. The goal is to keep the ecosystem balanced, reduce unnecessary retries, and require issuers to use precise (non‑generic) decline codes.

The policy is applied depending on the decline type:

* **Reversible**: Up to 20 attempts on the same transaction (same card, transaction, expiry, amount, and merchant) within a 30‑day windo. After the 21st attempt within that window, fees apply. After 30 days from the first attempt, any retry of that same transaction is charged.
* **Irreversible**: Only the first attempt is allowed. The second attempt is charged, regardless of timing.

> 📘 Fees
>
> Exceeding the attempt limits will trigger a charge for each additional transaction.
>
> * **Domestic**: USD 0.10 + 13.83% tax
> * **Cross‑border**: USD 0.25 + 13.83% tax

Visa return codes are organized in four categories:

* **Category 1 (issuer will never approve)**: Irreversible, signals the card was canceled or never existed, or that the denial is the result of a permanent restriction or error that will block future approval. Fees from the second attempt.
* **Category 2 (issuer cannot approve at this time)**: Reversible, means the denial results from a temporary condition such as credit risk or other card restrictions that may allow a retry of the transaction to be approved. Some cases require action by the cardholder or issuer to remove the restriction before approval.
* **Category 3 (data quality)**: Reversible, is triggered by a data error identified by the issuer. Merchants must revalidate payment data before retrying. These denial codes may signal potential fraud risks to merchants.

> 🚧 Category 3 Charges
>
> Merchants can carry out up to 25,000 transactions in a 30-day period (in this case, considering only the merchant number and denied codes). If the limit is exceeded, all declined transactions under category 3 will be charged.

* **Category 4 (generic response codes)**: Reversible, includes all other decline response codes not in categories 1, 2, and 3, as there may be cases where there is no response code value for a specific decline. Issuers may use other response code values ​​defined in the VisaNet Technical Specifications. However, minimal use is advised.

Issuers should use response codes that most accurately reflect the reason for declines. This means focusing on categories 1 (issuer never approves), 2 (issuer cannot approve at this time), and 3 (data quality), and avoiding 4 (generic response code) as much as possible. The Category 4 fee is charged to ensure that no more than the regionally approved percentage of the issuer's total declines are categorized as Category 4. Issuers that exceed the regionally defined threshold will be charged the Generic Response Code Fee on a per transaction basis.

> 📘 Allowed Retries
>
> The number of retries allowed by Visa after declining codes in **categories 2, 3 and 4** was increased in May 2025 from 15 to 20 attempts in 30 days.

The following rules apply to both purchase transactions and Zero Auth transactions.

### Visa refusal categories and retry rules

| Category                                                                          | Type         | Codes                                                                                                                                               | Retry rule                                                                                                               |
| :-------------------------------------------------------------------------------- | :----------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------- |
| Category 1 — Issuer will not approve further attempts                             | Irreversible | `04`, `07`, `12*`, `15*`, `41`, `43`, `46`, `57`, `R0`, `R1`, `R3`                                                                                  | Fee charged from the 2nd attempt                                                                                         |
| Category 2 — Issuer will not approve at this time; further attempts are permitted | Reversible   | `03`, `19`, `39***`, `51`, `52***`, `53***`, `59`, `61`, `62`, `65`, `75`, `78`, `86`, `91`, `93`, `96`, `N3`, `N4`, `Z5****`, `5C*****`, `9G*****` | Up to 20 attempts within 30 days; fees from the 21st attempt. After 30 days from the first attempt, any retry is charged |
| Category 3 — Data quality                                                         | Reversible   | `14**`, `54`, `55`, `70`, `82`, `1A`, `6P`, `N7`                                                                                                    | Up to 20 attempts within 30 days; fees from the 21st attempt. After 30 days from the first attempt, any retry is charged |
| Category 4 — Generic response codes                                               | Reversible   | Generic response codes not listed in Categories 1–3                                                                                                 | Up to 20 attempts within 30 days; fees from the 21st attempt. After 30 days from the first attempt, any retry is charged |

/* Codes `12` and `15` are being converted by Visa to code `05`.

** Code `14` has been reclassified from Category 1 to Category 3.

*** Codes `39`, `52` and `53` will migrate from Category 4 to Category 2.

**** Code `Z5` is a new code in Category 2.

***** Codes `5C` and `9G` are effective 2025‑11‑04 and are in Category 2.

### Yuno MAC to Visa response code mapping

Use this mapping to build routing and retry rules. Yuno returns normalized MACs in `merchant_advice_code` and provider raw values under `provider_data`.

| `merchant_advice_code` | `merchant_advice_code_message`                            | Visa response codes                                            |
| :--------------------- | :-------------------------------------------------------- | :------------------------------------------------------------- |
| UPDATE_INFORMATION     | Updated/additional information needed                     | —                                                              |
| TRY_AGAIN_LATER        | Retry within 30 days                                      | 51, 59, 04, 06, 38, 61, 62, 65, 75, 78, 91                     |
| DO_NOT_TRY_AGAIN       | Do not try again                                          | 57, 14, 56, 46, FM, 19, 12, 30, 13, 23, 41, 43, 64, 83, 76, 77 |
| INVALID_DATA           | Incorrect payment information; revalidate before retrying | 54, 55, 82, 63                                                 |

## Elo

Elo implemented rules in January 2025, aiming to reduce unnecessary retries by merchants and acquirers. Transactions are counted from the 1st to the last calendar day of the month.

> 📘 Elo Fees
>
> BRL 0.80 per attempt that exceeds the group limit.

### Elo groups and retry rules

Elo classifies reversible and irreversible codes into three separate groups:

| Group   | Type         | Description                                                                                        | Charge rule                                                      |
| :------ | :----------- | :------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------- |
| Group 1 | Irreversible | CNP transactions denied with irreversible codes (same card, same establishment CNPJ, same amount)  | Charged from the 2nd attempt within the month of assessment      |
| Group 2 | Reversible   | CNP transactions declined with reversible codes                                                    | Charged from the 16th attempt within the month of assessment     |
| Group 3 | Data quality | CNP declines with characteristics of brute‑force attacks (considering the same merchant Root CNPJ) | Charged from 10,001 denied transactions if >5% of total refusals |

### Elo code classifications

* **Group 1 - Issuer will never approve (Irreversible)**: 57 (Not allowed), 14 or 56 (Invalid card), 58 (Invalid merchant), 46 (Account closed), FM (Using the chip), 19 (Consult the purchaser), 12 (Card error), 30 (Message format error), 13 (Invalid transaction value), 23 (Invalid installment amount), 41 (Lost card), 43 (Stolen card), 64 (Invalid minimum transaction amount), 83 (Password encryption error), 76 (Invalid destination account), 77 (Invalid source account)

* **Group 2 - Issuer cannot approve at this time (Reversible)**: 51 (Insufficient limit), 59 (Suspicion of fraud), 04 (Redo the transaction), 06 (Consult acquirer), 38 (Excessive password attempts), 61 (Exceeds withdrawal amount), 62 (Temporary blocking), 65 (Withdrawal amount exceeded), 75 (Password/withdrawal attempts exceeded), 78 (New card not unlocked or blocked by app/NFC/e‑com), 91 (Issuer offline)

* **Group 3 - Data quality, revalidate information**: 54 (Expired card), 55 (Invalid password), 82 (Invalid card cryptogram), 63 (Invalid or missing CVE)

<Callout icon="📘" theme="info">
  “CNPJ” refers to the Brazilian business taxpayer identification for the establishment (Root CNPJ at the group level).
</Callout>

### Yuno MAC Elo response code mapping

| `merchant_advice_code` | `merchant_advice_code_message`                            | Elo response codes                                                 |
| :--------------------- | :-------------------------------------------------------- | :----------------------------------------------------------------- |
| TRY_AGAIN_LATER        | Retry within 30 days                                      | 51, 59, 04, 06, 38, 61, 62, 65, 75, 78, 91                         |
| DO_NOT_TRY_AGAIN       | Do not try again                                          | 57, 14, 56, 58, 46, FM, 19, 12, 30, 13, 23, 41, 43, 64, 83, 76, 77 |
| INVALID_DATA           | Incorrect payment information; revalidate before retrying | 54, 55, 82, 63                                                     |

## Other brands

* **Reversible codes**: Retry attempts are allowed for the same customer and card. There is no limit or pre-established time limit.

> 🚧 Attention
>
> Before attempting again, follow the guidance received in the denied transaction response.

* **Irreversible Codes**: Authorizations for the same card or establishment will not be allowed after receiving the first refusal response from the issuer.

## Routing with MAC

Retry behavior should be implemented via [routing](doc:routing) conditions. Update routes to include the new MAC conditions.

When creating a decline group in the [Yuno dashboard](https://dashboard.y.uno/), you can choose to add conditions by Response Code or by MAC Code.

> 🚧 Transition Period
>
> Until all integrations emit MAC separately, some MAC values will appear under both Response Codes and MAC Codes. This is expected while the feature's rollout completes.

![](https://files.readme.io/6edf0af703e5b18774fd6e5b59a9432b734346233edf38d1050fe363255af3e8-image.png)

<br />
