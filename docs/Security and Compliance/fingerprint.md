---
title: Card Fingerprint
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
Card fingerprints are a cryptographic hash of the card's PAN that uniquely identifies a specific payment card. Yuno returns this value as `fingerprint` on the [Payment Method object](ref:the-payment-method-object-api). When the same card is enrolled multiple times by the same customer, Yuno creates separate enrollments with distinct `vaulted_token` values, and the fingerprint helps you detect duplicates.

**Key Properties:**
- **Remains consistent** across multiple enrollments of the same card
- **Is unique** to each distinct card number  
- **Protects PCI compliance** by not exposing the full card number
- **Enables deduplication** without storing or accessing sensitive card data

## How It Works

### Same Card, Multiple Enrollments

```json
// First enrollment
{
  "vaulted_token": "b82b7682-def1-4d46-ad51-7da446b2966c",
  "card_data": {
    "fingerprint": "fp_abc123xyz789",
    "iin": "41111111",
    "lfd": "1111"
  }
}

// Second enrollment of the SAME card
{
  "vaulted_token": "7ce53292-c402-4e3d-8ddd-a49268633294",  // Different token
  "card_data": {
    "fingerprint": "fp_abc123xyz789",  // Same fingerprint!
    "iin": "41111111",
    "lfd": "1111"
  }
}
```

### Different Cards

```json
{
  "vaulted_token": "...",
  "card_data": {
    "fingerprint": "fp_different456",  // Different fingerprint
    "iin": "52222222",
    "lfd": "2222"
  }
}
```

## Why Duplicate Enrollments Occur

To avoid operational issues, Yuno does not automatically prevent duplicate card enrollments. When a customer enrolls the same card multiple times:

- Each enrollment creates a **new `vaulted_token`**
- **No automatic deduplication** occurs
- This applies **regardless** of whether expiration date or cardholder info changes

Implement deduplication on your side using fingerprints.

## Implementation Guide

### Step 1: Retrieve Existing Payment Methods

Use the [Retrieve Enrolled Payment Methods](ref:retrieve-enrolled-payment-methods-api) endpoint to list the customer's existing cards.

```bash
GET /v1/customers/{customer_id}/payment-methods
```

**Response:**
```json
{
  "payment_methods": [
    {
      "vaulted_token": "token_1",
      "card_data": {
        "fingerprint": "fp_abc123",
        "iin": "41111111",
        "lfd": "1111",
        "brand": "VISA"
      }
    },
    {
      "vaulted_token": "token_2",
      "card_data": {
        "fingerprint": "fp_xyz789",
        "iin": "52222222",
        "lfd": "2222",
        "brand": "MASTERCARD"
      }
    }
  ]
}
```

### Step 2: Check for Duplicates After Enrollment

```javascript
async function checkForDuplicates(customerId, newCardFingerprint) {
  // Get existing payment methods
  const existingMethods = await getCustomerPaymentMethods(customerId);
  
  // Extract fingerprints (filter out nulls)
  const existingFingerprints = existingMethods
    .map(method => method.card_data?.fingerprint)
    .filter(Boolean);
  
  // Check for duplicates
  const isDuplicate = existingFingerprints.includes(newCardFingerprint);
  
  if (isDuplicate) {
    // Handle duplicate (see options below)
    console.log('Duplicate card detected');
  }
  
  return isDuplicate;
}
```

### Step 3: Handle Duplicates

You have several options when a duplicate is detected:

#### Option A: Prevent Enrollment (Recommended for Best UX)

```javascript
// Before enrollment, fetch existing cards and display them
// Show user: "You already have these cards saved:"
// - VISA ending in 1111
// - MASTERCARD ending in 2222
//
// This prevents the duplicate enrollment from happening
```

#### Option B: Notify After Enrollment

```javascript
yunoEnrollmentStatus: async ({ status, vaultedToken }) => {
  if (status === 'ENROLLED' && vaultedToken) {
    const newCard = await getPaymentMethodDetails(customerId, vaultedToken);
    const isDuplicate = await checkForDuplicates(
      customerId, 
      newCard.card_data?.fingerprint
    );
    
    if (isDuplicate) {
      // Notify user
      showNotification("This card was already saved. We've removed the duplicate.");
      
      // Optionally remove the duplicate
      await unenrollPaymentMethod(customerId, vaultedToken);
    } else {
      showNotification("Card saved successfully!");
    }
  }
}
```

#### Option C: Keep Both Enrollments

```javascript
// Allow duplicates for customer flexibility
// Display all cards with visual indicators:
// - VISA •••• 1111 (Primary)
// - VISA •••• 1111 (Duplicate - added Jan 15)
```

## Complete Implementation Example

```javascript
// Enrollment flow with duplicate detection
const enrollmentFlow = {
  
  // 1. Customer completes enrollment via SDK
  yunoEnrollmentStatus: async ({ status, vaultedToken }) => {
    if (status !== 'ENROLLED' || !vaultedToken) {
      return;
    }
    
    try {
      // 2. Fetch the newly enrolled payment method
      const newCard = await fetch(
        `/api/payment-methods/${vaultedToken}`
      ).then(r => r.json());
      
      const newFingerprint = newCard.card_data?.fingerprint;
      
      // 3. Handle cases where fingerprint is not available
      if (!newFingerprint) {
        console.warn('Fingerprint not available for this card');
        showNotification("Card saved successfully!");
        return;
      }
      
      // 4. Get existing cards for this customer
      const existingCards = await fetch(
        `/api/customers/${customerId}/payment-methods`
      ).then(r => r.json());
      
      // 5. Check for duplicates
      const duplicates = existingCards.payment_methods.filter(card => 
        card.card_data?.fingerprint === newFingerprint &&
        card.vaulted_token !== vaultedToken  // Exclude the newly enrolled card
      );
      
      // 6. Handle duplicate
      if (duplicates.length > 0) {
        const confirmRemove = await showConfirmDialog(
          "This card is already saved to your account. " +
          "Would you like to remove the duplicate?"
        );
        
        if (confirmRemove) {
          await fetch(
            `/api/payment-methods/${vaultedToken}`,
            { method: 'DELETE' }
          );
          showNotification("Duplicate card removed.");
        } else {
          showNotification("Card saved. You now have multiple copies of this card.");
        }
      } else {
        showNotification("Card saved successfully!");
      }
      
    } catch (error) {
      console.error('Error checking for duplicates:', error);
      // Fail gracefully - card is still enrolled
      showNotification("Card saved successfully!");
    }
  }
};
```

## Important Considerations

### Timing Limitation

<Callout icon="⚠️" theme="warning">
  You cannot check fingerprints before the customer enters their card information. This is a PCI compliance requirement.
</Callout>

**Workaround:** Display existing saved cards before the enrollment form so customers can see what they already have saved.

### Fingerprint Availability

The `fingerprint` field may be `null` for some payment methods or providers. Always check if the fingerprint exists before using it:

```javascript
const fingerprint = card.card_data?.fingerprint;

if (!fingerprint) {
  // Handle this case gracefully
  // Option 1: Skip duplicate detection
  // Option 2: Use alternative matching (IIN + LFD)
  // Option 3: Log and notify your team
  console.warn('Fingerprint not available');
}
```

**Alternative matching:**
```javascript
// Fallback: Match by IIN + LFD + expiration
const isSameCard = (card1, card2) => {
  return card1.card_data?.iin === card2.card_data?.iin &&
         card1.card_data?.lfd === card2.card_data?.lfd &&
         card1.card_data?.expiration_month === card2.card_data?.expiration_month &&
         card1.card_data?.expiration_year === card2.card_data?.expiration_year;
};
```

<Callout icon="⚠️" theme="warning">
  Different cards may share the same IIN and LFD.
</Callout>

### Card Updates

The fingerprint behavior with card updates:

| Change | Fingerprint Behavior |
|--------|---------------------|
| **Card number changes** | ✅ **New** fingerprint generated |
| **Expiration date changes** | ❌ Fingerprint **stays the same** |
| **Cardholder name changes** | ❌ Fingerprint **stays the same** |
| **Card reissued (same number)** | ❌ Fingerprint **stays the same** |

## Use Cases

### 1. Prevent Wallet Clutter
Help users avoid saving the same card multiple times:

```javascript
// Show before enrollment form
"You already have these cards saved:
 - VISA ending in 1111
 - MASTERCARD ending in 2222"
```

### 2. Improve User Experience
Automatically clean up duplicates:

```javascript
if (isDuplicate) {
  await removeOlderDuplicate(vaultedToken);
  showMessage("We updated your saved card.");
}
```

### 3. Data Cleanup
Identify and remove duplicate enrollments in batch:

```javascript
async function cleanupDuplicates(customerId) {
  const cards = await getPaymentMethods(customerId);
  const fingerprints = new Map();
  
  for (const card of cards.payment_methods) {
    const fp = card.card_data?.fingerprint;
    if (!fp) continue;
    
    if (fingerprints.has(fp)) {
      // Keep the most recent, remove older duplicates
      const existing = fingerprints.get(fp);
      const newerCard = new Date(card.created_at) > new Date(existing.created_at) 
        ? card 
        : existing;
      const olderCard = newerCard === card ? existing : card;
      
      await unenrollPaymentMethod(customerId, olderCard.vaulted_token);
      fingerprints.set(fp, newerCard);
    } else {
      fingerprints.set(fp, card);
    }
  }
}
```

### 4. Analytics and Monitoring
Track duplicate enrollment rates:

```javascript
// Log duplicate events for monitoring
if (isDuplicate) {
  analytics.track('duplicate_card_enrolled', {
    customer_id: customerId,
    fingerprint: fingerprint.substring(0, 10), // Partial for privacy
    duplicate_count: duplicates.length + 1
  });
}
```