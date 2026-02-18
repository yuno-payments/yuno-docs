---
title: Get Transfers
deprecated: false
hidden: true
metadata:
  robots: index
---
## Use cases

### Use case 1: Verify transfer completion

Create a transfer and verify it succeeded.

1. **Initiate transfer**

```
   POST /v1/recipients/A/onboardings/O1/transfer
```

**Response**

```
{ "id": "T1", ... }
```

2. **Check status**

```
   GET /v1/transfers/T1
```

Response:

```json
   {
     "id": "T1",
     "destination_onboarding": { "status": "SUCCEEDED" }
   }
```

3. **Result**: Transfer succeeded ✓

**To determine success:**

* Check `destination_onboarding.status`
* `SUCCEEDED`: Transfer completed successfully
* `PENDING`: Transfer still in progress
* `FAILED`: Transfer failed

<br />

### Use case 2: Display seller transfer history

Display all transfers for a seller in a marketplace dashboard.

1. **Load seller profile page**: `seller_id = "770e8400-..."`
2. **Fetch transfer history**

```
GET /v1/recipients/770e8400-.../transfers
```

**Response**

```json
[
  { "id": "T1", "created_at": "2026-01-15T16:59:22Z", ... },
  { "id": "T2", "created_at": "2026-01-10T08:30:00Z", ... }
]
```

3. **Display in UI**

| Date       | From       | To         | Status    |
| ---------- | ---------- | ---------- | --------- |
| 2026-01-15 | seller-123 | seller-456 | Succeeded |
| 2026-01-10 | seller-123 | seller-789 | Succeeded |

<br />

### Use case 3: Audit transfer chain with reversals

Track an onboarding that was transferred and then reversed.

1. **Original transfer**: O1 from Recipient A to Recipient B — Transfer T1 created
2. **Later reversed**: O1 back from Recipient B to Recipient A — Transfer T2 created (reversal)
3. **Audit trail**

```
GET /v1/onboardings/O1/transfers
```

Response:

```json
[
  {
    "id": "T1",
    "origin_onboarding": { "id": "O1", "recipient": { "id": "A" } },
    "destination_onboarding": { "id": "O2", "recipient": { "id": "B" } },
    "created_at": "2026-01-15T10:00:00Z"
  },
  {
    "id": "T2",
    "origin_onboarding": { "id": "O2", "recipient": { "id": "B" } },
    "destination_onboarding": { "id": "O1", "recipient": { "id": "A" } },
    "created_at": "2026-01-16T11:00:00Z"
  }
]
```

4. **Analysis**: Onboarding transferred out then reversed back

<br />

### Use case 4: Support ticket investigation

Look up a failed transfer to identify and resolve the root cause.

1. **"Transfer T1 failed, can you help?"**
2. **Look up the transfer**

```
GET /v1/transfers/T1
```

**Response**

```json
{
  "id": "T1",
  "origin_onboarding": {
    "id": "O1",
    "status": "TRANSFERRED",
    "recipient": { "id": "A", "email": "seller@example.com" }
  },
  "destination_onboarding": {
    "id": "O2",
    "status": "FAILED",
    "response_message": "Invalid bank account",
    "recipient": { "id": "B", "email": "newseller@example.com" }
  }
}
```

3. **Root cause identified**: Invalid bank account on destination
4. **Action**: Ask recipient B to update bank details

<br />

### Use case 5: Compliance audit

Verify all transfers for a recipient.

1. **Request transfer report**

```
GET /v1/recipients/770e8400-.../transfers
```

2. **System returns all transfers**

```json
[
  { "id": "T1", "created_at": "...", ... },
  { "id": "T2", "created_at": "...", ... },
  { "id": "T3", "created_at": "...", ... }
]
```

3. **Export to CSV for compliance records**
4. **Report includes**:
   * Transfer dates
   * Origin/destination details
   * Current status
   * Provider information
