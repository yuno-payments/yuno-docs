---
title: React Native SDK
deprecated: false
hidden: true
metadata:
  robots: index
---
> 📘 ELF page size support
>
> The Yuno React Native SDK fully supports Google's 16 KB ELF page alignment requirements through its underlying Android SDK. All native libraries are built and verified for 16 KB memory pages, ensuring compatibility with Android 15 (API Level 35) and ARMv9 devices.

Yuno's React Native SDK is specifically designed to simplify the integration of payment processing functionality in your React Native applications for both Android and iOS platforms. Developers can implement features more efficiently, reducing the need for extensive knowledge of payment protocols and infrastructure.

## Integrations

Select one of our user-friendly React Native integrations and kickstart your journey toward efficient payment processing:

| Integration                                                        | Description                                                                                  |
| ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| [Full SDK](#full-sdk-react-native)                                 | Render the payment methods and enrollment options available to your company in the checkout. |
| [Lite SDK (Payment)](#lite-sdk-payment-react-native)               | Control which payment methods will be shown to the user during checkout.                     |
| [Lite SDK (Enrollment)](#lite-sdk-enrollment-react-native)         | Simplify payment method enrollment.                                                          |
| [Seamless Payment](#seamless-payment-react-native)                 | Headless flow for maximum UI control.                                                        |
| [Headless SDK (Payment)](#headless-sdk-payment-react-native)       | Customize the checkout without having to be PCI compliant.                                   |
| [Headless SDK (Enrollment)](#headless-sdk-enrollment-react-native) | Customize the enrollment of new payment methods.                                             |

## Requirements

To use the Yuno React Native SDK, you need to meet the following requirements:

### General requirements

| Requirement      | Version         |
| ---------------- | --------------- |
| **Node.js**      | 16.0.0 or above |
| **React Native** | 0.70 or above   |

### Android requirements

| Requirement               | Version                   |
| ------------------------- | ------------------------- |
| **Minimum SDK Version**   | 21 or above (Android 5.0) |
| **Target SDK Version**    | 33 or above               |
| **Java Version**          | 17                        |
| **Kotlin Version**        | 1.9.24 or above           |
| **Android Gradle Plugin** | 8.1.0 or above            |
| **Jetpack Compose**       | Required for native views |

### iOS requirements

| Requirement             | Version       |
| ----------------------- | ------------- |
| **Minimum iOS Version** | 14.0 or above |
| **Swift Version**       | 5.0 or above  |
| **Xcode**               | 14.0 or above |

### SDK dependencies

The React Native SDK depends on the following native SDKs:

| Platform | SDK                             | Version |
| -------- | ------------------------------- | ------- |
| Android  | `com.yuno.payments:android-sdk` | 2.8.1   |
| iOS      | `YunoSDK`                       | 2.9.0   |

## Installation

### Step 1: Install the package

Install the Yuno SDK package using npm or yarn:

```bash
# Using npm
npm install @yuno-payments/yuno-sdk-react-native

# Using yarn
yarn add @yuno-payments/yuno-sdk-react-native
```

### Step 2: Platform-specific setup

#### Android setup

##### 2.1 Add Yuno Maven repository

Update your project-level `android/build.gradle`:

```groovy
allprojects {
    repositories {
        google()
        mavenCentral()
        
        // Add Yuno's Maven repository
        maven { 
            url "https://yunopayments.jfrog.io/artifactory/snapshots-libs-release" 
        }
    }
}
```

##### 2.2 Set minimum SDK version

Ensure your `android/app/build.gradle` has the correct minimum SDK:

```groovy
android {
    defaultConfig {
        minSdkVersion 21
        targetSdkVersion 33
        // ...
    }
    
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_17
        targetCompatibility JavaVersion.VERSION_17
    }
}
```

##### 2.3 Initialize SDK in application class

Update your `android/app/src/main/java/[your-package]/MainApplication.kt`:

```kotlin
package com.yourapp

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.soloader.SoLoader
import com.yunosdkreactnative.YunoSdkModule

class MainApplication : Application(), ReactApplication {

    override val reactNativeHost: ReactNativeHost =
        object : DefaultReactNativeHost(this) {
            override fun getPackages(): List<ReactPackage> =
                PackageList(this).packages.apply {
                    // Packages that cannot be autolinked yet can be added manually here
                }

            override fun getJSMainModuleName(): String = "index"
            override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG
            override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
            override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
        }

    override val reactHost: ReactHost
        get() = getDefaultReactHost(applicationContext, reactNativeHost)

    override fun onCreate() {
        super.onCreate()
        
        // Initialize Yuno SDK
        YunoSdkModule.initialize(
            applicationContext = this,
            apiKey = "YOUR_YUNO_API_KEY"
        )
        
        SoLoader.init(this, false)
        if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
            load()
        }
    }
}
```

#### iOS Setup

##### 2.1 Install CocoaPods dependencies

```bash
cd ios && pod install && cd ..
```

##### 2.2 Set minimum iOS version

Ensure your `ios/Podfile` has the correct minimum iOS version:

```ruby
platform :ios, '14.0'
```

##### 2.3 Configure deep links (optional)

If you need to handle payment redirects, update your `ios/[YourApp]/Info.plist`:

```xml
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleTypeRole</key>
        <string>Editor</string>
        <key>CFBundleURLName</key>
        <string>com.yourapp</string>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>yourappscheme</string>
        </array>
    </dict>
</array>
```

## SDK initialization

Before using any SDK features, you must initialize the SDK in your React Native application.

### Initialize method

```javascript
import { YunoSdk, CardFlow } from '@yuno-payments/yuno-sdk-react-native';

const initializeYuno = async () => {
  try {
    await YunoSdk.initialize({
      apiKey: 'YOUR_YUNO_API_KEY',
      countryCode: 'US', // ISO 3166-1 alpha-2 country code
      yunoConfig: {
        language: 'en',
        cardFlow: CardFlow.ONE_STEP,
        saveCardEnabled: true,
        keepLoader: false,
        isDynamicViewEnabled: true,
      },
    });
    console.log('Yuno SDK initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Yuno SDK:', error);
  }
};
```

### Initialization parameters

| Parameter       | Type            | Required | Description                                              |
| --------------- | --------------- | -------- | -------------------------------------------------------- |
| `apiKey`        | `string`        | ✓        | Your Yuno API key from the Dashboard                     |
| `countryCode`   | `string`        | ✓        | ISO 3166-1 alpha-2 country code (e.g., 'US', 'BR', 'CO') |
| `yunoConfig`    | `YunoConfig`    |          | SDK configuration options                                |
| `iosConfig`     | `IosConfig`     |          | iOS-specific configuration                               |
| `androidConfig` | `AndroidConfig` |          | Android-specific configuration                           |

### YunoConfig properties

| Property               | Type       | Default    | Description                                                       |
| ---------------------- | ---------- | ---------- | ----------------------------------------------------------------- |
| `language`             | `string`   | `'en'`     | UI language code. See [Supported Languages](#supported-languages) |
| `cardFlow`             | `CardFlow` | `ONE_STEP` | Card input flow type (`ONE_STEP` or `STEP_BY_STEP`)               |
| `saveCardEnabled`      | `boolean`  | `false`    | Enable the save card checkbox                                     |
| `keepLoader`           | `boolean`  | `false`    | Keep loader visible after operations                              |
| `isDynamicViewEnabled` | `boolean`  | `false`    | Enable dynamic views                                              |
| `cardFormDeployed`     | `boolean`  | `false`    | Card form deployed state                                          |

### Supported languages

The SDK supports the following languages:

| Code    | Language              |
| ------- | --------------------- |
| `en`    | English               |
| `es`    | Spanish               |
| `pt`    | Portuguese            |
| `fr`    | French                |
| `de`    | German                |
| `it`    | Italian               |
| `id`    | Indonesian            |
| `ms`    | Malay                 |
| `pl`    | Polish                |
| `ru`    | Russian               |
| `tr`    | Turkish               |
| `nl`    | Dutch                 |
| `sv`    | Swedish               |
| `th`    | Thai                  |
| `fil`   | Filipino              |
| `vi`    | Vietnamese            |
| `zh-cn` | Chinese (Simplified)  |
| `zh-tw` | Chinese (Traditional) |

## Full SDK (React Native)

The Full SDK integration provides a complete payment UI managed by the SDK. This is the quickest way to integrate Yuno into your React Native application.

### Prerequisites

Before starting the Full SDK integration, ensure you have:

1. Completed the [Installation](#installation) steps
2. Initialized the SDK with `YunoSdk.initialize()`
3. Created a checkout session from your backend

### Implementation

#### Step 1: Subscribe to payment events

Set up event listeners before starting the payment flow:

```javascript
import { YunoSdk, YunoStatus } from '@yuno-payments/yuno-sdk-react-native';
import { useEffect } from 'react';

function PaymentScreen() {
  useEffect(() => {
    // Listen to payment status changes
    const paymentSubscription = YunoSdk.onPaymentStatus((state) => {
      console.log('Payment Status:', state.status);
      
      switch (state.status) {
        case YunoStatus.SUCCEEDED:
          console.log('✅ Payment succeeded!');
          // Navigate to success screen
          break;
          
        case YunoStatus.FAILED:
          console.log('❌ Payment failed');
          // Show error message
          break;
          
        case YunoStatus.REJECTED:
          console.log('🚫 Payment rejected');
          // Handle rejection
          break;
          
        case YunoStatus.CANCELLED_BY_USER:
          console.log('⚠️ Payment cancelled by user');
          // Return to previous screen
          break;
          
        case YunoStatus.PROCESSING:
          console.log('⏳ Payment processing...');
          // Show loading state
          break;
          
        case YunoStatus.INTERNAL_ERROR:
          console.log('🔥 Internal error occurred');
          // Show error and retry option
          break;
      }
    });
    
    // Listen to one-time tokens (OTT)
    const tokenSubscription = YunoSdk.onOneTimeToken((token) => {
      console.log('Received OTT:', token);
      // Send token to your backend for payment processing
    });
    
    // Cleanup subscriptions
    return () => {
      paymentSubscription.remove();
      tokenSubscription.remove();
    };
  }, []);

  return (
    // Your payment UI
  );
}
```

#### Step 2: Display payment methods

Use the `YunoPaymentMethods` component to display available payment methods:

```javascript
import { YunoPaymentMethods } from '@yuno-payments/yuno-sdk-react-native';
import { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';

function CheckoutScreen() {
  const [checkoutSession] = useState('your_checkout_session_id');
  const [isMethodSelected, setIsMethodSelected] = useState(false);

  return (
    <View style={styles.container}>
      <YunoPaymentMethods
        checkoutSession={checkoutSession}
        countryCode="BR"
        onPaymentMethodSelected={(event) => {
          setIsMethodSelected(event.isSelected);
        }}
        onPaymentMethodError={(event) => {
          console.error('Error loading payment methods:', event.message);
        }}
        style={styles.paymentMethods}
      />
      
      <Button
        title="Pay Now"
        disabled={!isMethodSelected}
        onPress={handlePayment}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  paymentMethods: {
    height: 400,
  },
});
```

#### Step 3: Start payment

Trigger the payment flow when the user is ready:

```javascript
const handlePayment = async () => {
  try {
    await YunoSdk.startPayment(true); // true = show payment status screen
    console.log('Payment flow started');
  } catch (error) {
    console.error('Error starting payment:', error);
  }
};
```

### `startPayment` parameters

| Parameter           | Type      | Required | Default | Description                                                |
| ------------------- | --------- | -------- | ------- | ---------------------------------------------------------- |
| `showPaymentStatus` | `boolean` | ✓        | -       | Whether to show the payment status screen after completion |

## Lite SDK (payment React Native)

The Lite SDK provides more control over the payment flow by allowing you to specify which payment method to use.

### Implementation

#### Step 1: Start payment Lite

```typescript
import { YunoSdk } from '@yuno-payments/yuno-sdk-react-native';

const handlePaymentLite = async () => {
  try {
    await YunoSdk.startPaymentLite(
      {
        checkoutSession: 'checkout_session_token_from_backend',
        methodSelected: {
          vaultedToken: 'saved_payment_method_token',
          paymentMethodType: 'CARD', // or 'PIX', 'WALLET', etc.
        },
        showPaymentStatus: true,
      },
      'US' // Optional country code override
    );
    console.log('Payment Lite flow started');
  } catch (error) {
    console.error('Payment Lite error:', error);
  }
};
```

### `startPaymentLite` parameters

#### `StartPayment` object

| Parameter           | Type             | Required | Description                                  |
| ------------------- | ---------------- | -------- | -------------------------------------------- |
| `checkoutSession`   | `string`         | ✓        | Checkout session token from your backend     |
| `methodSelected`    | `MethodSelected` | ✓        | Selected payment method details              |
| `showPaymentStatus` | `boolean`        |          | Show payment status screen (default: `true`) |

#### `MethodSelected` object

| Parameter           | Type     | Required | Description                                   |
| ------------------- | -------- | -------- | --------------------------------------------- |
| `vaultedToken`      | `string` | ✓        | Saved payment method token                    |
| `paymentMethodType` | `string` | ✓        | Payment method type (e.g., `'CARD'`, `'PIX'`) |

## Lite SDK (Enrollment React Native)

The Enrollment SDK allows users to save payment methods without making a payment.

### Implementation

#### Step 1: Subscribe to enrollment events

```javascript
import { YunoSdk, YunoStatus } from '@yuno-payments/yuno-sdk-react-native';
import { useEffect } from 'react';

function EnrollmentScreen() {
  useEffect(() => {
    const subscription = YunoSdk.onEnrollmentStatus((state) => {
      console.log('Enrollment Status:', state.status);
      
      if (state.status === YunoStatus.SUCCEEDED) {
        console.log('✅ Payment method saved successfully!');
      } else if (state.status === YunoStatus.FAILED) {
        console.log('❌ Failed to save payment method');
      }
    });
    
    return () => subscription.remove();
  }, []);

  return (
    // Your enrollment UI
  );
}
```

#### Step 2: Start enrollment

```javascript
const startEnrollment = async () => {
  try {
    await YunoSdk.enrollmentPayment({
      customerSession: 'customer_session_token_from_backend',
      countryCode: 'US',
      showPaymentStatus: true,
    });
    console.log('Enrollment flow started');
  } catch (error) {
    console.error('Enrollment error:', error);
  }
};
```

### `enrollmentPayment` parameters

| Parameter           | Type      | Required | Description                                           |
| ------------------- | --------- | -------- | ----------------------------------------------------- |
| `customerSession`   | `string`  | ✓        | Customer session token from your backend              |
| `countryCode`       | `string`  |          | Country code (uses initialized value if not provided) |
| `showPaymentStatus` | `boolean` |          | Show enrollment status (default: `true`)              |

## Seamless Payment (React Native)

The Seamless Payment flow provides maximum control over the UI while still leveraging the SDK for secure payment processing.

### Implementation

```typescript
import { YunoSdk, YunoStatus } from '@yuno-payments/yuno-sdk-react-native';

const handleSeamlessPayment = async () => {
  try {
    const status = await YunoSdk.startPaymentSeamlessLite({
      checkoutSession: 'checkout_session_token',
      countryCode: 'US',
      methodSelected: {
        vaultedToken: 'payment_method_token',
        paymentMethodType: 'CARD',
      },
      showPaymentStatus: false, // You handle the UI
    });
    
    console.log('Seamless payment status:', status);
    
    if (status === YunoStatus.SUCCEEDED) {
      navigateToSuccess();
    } else if (status === YunoStatus.PROCESSING) {
      showProcessingState();
    } else {
      handlePaymentError(status);
    }
  } catch (error) {
    console.error('Seamless payment error:', error);
  }
};
```

### `startPaymentSeamlessLite` parameters

| Parameter           | Type             | Required | Description                           |
| ------------------- | ---------------- | -------- | ------------------------------------- |
| `checkoutSession`   | `string`         | ✓        | Checkout session token                |
| `countryCode`       | `string`         |          | Country code                          |
| `methodSelected`    | `MethodSelected` | ✓        | Payment method details                |
| `showPaymentStatus` | `boolean`        |          | Show status screen (default: `false`) |

**Returns:** `Promise<YunoStatus>` - The payment status after completion

## Headless SDK (payment React Native)

The Headless SDK provides complete control over the UI while using the SDK for secure tokenization and 3D Secure handling.

### Generate token

Use `generateToken` to tokenize payment data without the SDK UI:

```javascript
import { YunoSdk, CardType } from '@yuno-payments/yuno-sdk-react-native';

const handleHeadlessPayment = async () => {
  try {
    const result = await YunoSdk.generateToken(
      {
        checkoutSession: 'checkout_session_id',
        paymentMethod: {
          type: 'CARD',
          vaultedToken: null,
          card: {
            save: false,
            detail: {
              expirationMonth: 11,
              expirationYear: 25,
              number: '4000000000001091',
              securityCode: '123',
              holderName: 'John Doe',
              type: CardType.CREDIT,
            },
          },
        },
      },
      'checkout_session_id',
      'BR'
    );

    console.log('Token:', result.token);
    
    // Send token to your backend for payment processing
    await processPaymentOnBackend(result.token);
  } catch (error) {
    console.error('Token generation failed:', error);
  }
};
```

## Handle 3D Secure challenge

After generating a token, handle 3D Secure verification if required:

```typescript
const handle3DSChallenge = async (checkoutSession: string) => {
  try {
    const challengeResult = await YunoSdk.getThreeDSecureChallenge(
      checkoutSession,
      'BR'
    );

    if (challengeResult.type === 'URL') {
      console.log('3DS URL:', challengeResult.data);
      // Open this URL in a WebView for the user to complete 3DS verification
      open3DSWebView(challengeResult.data);
    }
  } catch (error) {
    console.error('3DS challenge failed:', error);
  }
};
```

## `TokenCollectedData` structure

### `PaymentMethod` object

| Property       | Type             | Required | Description                           |
| -------------- | ---------------- | -------- | ------------------------------------- |
| `type`         | `string`         | ✓        | Payment method type (e.g., `'CARD'`)  |
| `vaultedToken` | `string \| null` |          | Token for saved payment method        |
| `card`         | `CardData`       |          | Card details (required for new cards) |
| `customer`     | `Customer`       |          | Customer information                  |

### `CardData` object

| Property      | Type          | Required | Description              |
| ------------- | ------------- | -------- | ------------------------ |
| `save`        | `boolean`     |          | Save card for future use |
| `detail`      | `Detail`      |          | Card details             |
| `installment` | `Installment` |          | Installment information  |

### `Detail` object

| Property          | Type       | Description                     |
| ----------------- | ---------- | ------------------------------- |
| `expirationMonth` | `number`   | Card expiration month (1-12)    |
| `expirationYear`  | `number`   | Card expiration year (2 digits) |
| `number`          | `string`   | Card number                     |
| `securityCode`    | `string`   | CVV/CVC                         |
| `holderName`      | `string`   | Cardholder name                 |
| `type`            | `CardType` | `CREDIT` or `DEBIT`             |

## Headless SDK (enrollment React Native)

The Headless Enrollment SDK allows you to save payment methods with complete UI control.

### Continue enrollment

```javascript
import { YunoSdk, CardType } from '@yuno-payments/yuno-sdk-react-native';

const handleHeadlessEnrollment = async () => {
  try {
    const result = await YunoSdk.continueEnrollment(
      {
        customerSession: 'customer_session_id',
        paymentMethod: {
          type: 'CARD',
          card: {
            save: true,
            detail: {
              expirationMonth: 11,
              expirationYear: 25,
              number: '4000000000001091',
              securityCode: '123',
              holderName: 'John Doe',
              type: CardType.CREDIT,
            },
          },
        },
      },
      'customer_session_id',
      'BR'
    );

    console.log('Vaulted Token:', result.vaultedToken);
  } catch (error) {
    console.error('Enrollment failed:', error);
  }
};
```

### `EnrollmentCollectedData` structure

| Property          | Type               | Required | Description            |
| ----------------- | ------------------ | -------- | ---------------------- |
| `customerSession` | `string`           | ✓        | Customer session ID    |
| `paymentMethod`   | `EnrollmentMethod` | ✓        | Payment method details |

## `YunoPaymentMethods` component

A native component that displays available payment methods using the Yuno SDK.

### Usage

```javascript
import { YunoPaymentMethods } from '@yuno-payments/yuno-sdk-react-native';

<YunoPaymentMethods
  checkoutSession="your_checkout_session_id"
  countryCode="BR"
  onPaymentMethodSelected={(event) => {
    console.log('Method selected:', event.isSelected);
  }}
  onPaymentMethodError={(event) => {
    console.error('Error:', event.message);
  }}
  style={{ height: 400 }}
  testID="payment-methods"
/>
```

### Props

| Prop                      | Type              | Required | Description                                         |
| ------------------------- | ----------------- | -------- | --------------------------------------------------- |
| `checkoutSession`         | `string`          | ✓        | Checkout session ID from Yuno API                   |
| `countryCode`             | `string`          | ✓        | ISO country code (e.g., 'US', 'BR', 'CO')           |
| `onPaymentMethodSelected` | `(event) => void` |          | Callback when payment method is selected/deselected |
| `onPaymentMethodError`    | `(event) => void` |          | Callback when an error occurs                       |
| `style`                   | `ViewStyle`       |          | Custom styles for the container                     |
| `testID`                  | `string`          |          | Test ID for automation tools                        |

### Events

#### `PaymentMethodSelectedEvent`

```typescript
interface PaymentMethodSelectedEvent {
  isSelected: boolean; // Whether a payment method is currently selected
}
```

#### `PaymentMethodErrorEvent`

```typescript
interface PaymentMethodErrorEvent {
  message: string; // Error message
}
```

## Continue payment

Resume a previously started payment that was interrupted:

```javascript
await YunoSdk.continuePayment(
  'checkout_session_token',
  'US', // Country code
  true  // Show payment status
);
```

## Handle deep links

For payment methods that redirect to external apps or browsers (iOS only):

```typescript
import { YunoSdk } from '@yuno-payments/yuno-sdk-react-native';
import { Linking } from 'react-native';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Handle initial URL (app was opened from a closed state)
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink(url);
      }
    });
    
    // Handle URL changes (app is running)
    const subscription = Linking.addEventListener('url', (event) => {
      handleDeepLink(event.url);
    });
    
    return () => {
      subscription.remove();
    };
  }, []);
  
  const handleDeepLink = async (url: string) => {
    console.log('Received deep link:', url);
    
    try {
      await YunoSdk.receiveDeeplink(url);
      console.log('Deep link processed');
    } catch (error) {
      console.error('Error processing deep link:', error);
    }
  };
  
  return (
    // Your app
  );
}
```

## Event Subscriptions

The SDK provides several event subscriptions for real-time status updates.

### `onPaymentStatus`

Listen to payment status changes:

```typescript
const subscription = YunoSdk.onPaymentStatus((state) => {
  console.log('Status:', state.status);
  console.log('Token:', state.token);
});

// Later, remove the listener
subscription.remove();
```

### `YunoPaymentState`

```typescript
interface YunoPaymentState {
  token?: string;      // One-time token (if available)
  status: YunoStatus;  // Payment status
}
```

### `onEnrollmentStatus`

Listen to enrollment status changes:

```typescript
const subscription = YunoSdk.onEnrollmentStatus((state) => {
  console.log('Enrollment status:', state.status);
});
```

### `YunoEnrollmentState`

```typescript
interface YunoEnrollmentState {
  status: YunoStatus;  // Enrollment status
}
```

### `onOneTimeToken`

Listen to one-time token generation:

```typescript
const subscription = YunoSdk.onOneTimeToken((token) => {
  console.log('Token:', token);
});
```

### `onOneTimeTokenInfo`

Listen to extended token information:

```javascript
const subscription = YunoSdk.onOneTimeTokenInfo((tokenInfo) => {
  console.log('Token:', tokenInfo.token);
  console.log('Card Brand:', tokenInfo.cardData?.brand);
  console.log('Customer Email:', tokenInfo.customer?.email);
});
```

### `OneTimeTokenInfo`

```typescript
interface OneTimeTokenInfo {
  token?: string;
  vaultedToken?: string;
  vaultOnSuccess?: boolean;
  type?: string;
  cardData?: CardInformation;
  customer?: CustomerPayerInformation;
}
```

## Utility Methods

### `hideLoader`

Manually hide the SDK loader:

```javascript
await YunoSdk.hideLoader();
```

### `getLastOneTimeToken`

Get the last generated OTT:

```javascript
const lastOtt = await YunoSdk.getLastOneTimeToken();
```

### `getLastOneTimeTokenInfo`

Get extended information about the last OTT:

```javascript
const tokenInfo = await YunoSdk.getLastOneTimeTokenInfo();
```

### `clearLastOneTimeToken`

Clear stored OTT data:

```javascript
await YunoSdk.clearLastOneTimeToken();
```

### `clearLastPaymentStatus`

Clear stored payment status:

```javascript
await YunoSdk.clearLastPaymentStatus();
```

## Enums

### `YunoStatus`

```typescript
enum YunoStatus {
  REJECTED = 'REJECTED',           // Payment/operation was rejected
  SUCCEEDED = 'SUCCEEDED',         // Payment/operation succeeded
  FAILED = 'FAILED',               // Payment/operation failed
  PROCESSING = 'PROCESSING',       // Payment is being processed
  INTERNAL_ERROR = 'INTERNAL_ERROR', // Internal error occurred
  CANCELLED_BY_USER = 'CANCELLED_BY_USER', // Cancelled by user
}
```

### `CardFlow`

```typescript
enum CardFlow {
  ONE_STEP = 'ONE_STEP',           // Single-step card input
  STEP_BY_STEP = 'STEP_BY_STEP',   // Multi-step card input
}
```

### `CardType`

```typescript
enum CardType {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
}
```

### `YunoLanguage`

```typescript
enum YunoLanguage {
  EN = 'EN',       // English
  ES = 'ES',       // Spanish
  PT = 'PT',       // Portuguese
  ID = 'ID',       // Indonesian
  MY = 'MY',       // Malay
  MS = 'MS',       // Malaysian
  FR = 'FR',       // French
  PL = 'PL',       // Polish
  IT = 'IT',       // Italian
  DE = 'DE',       // German
  RU = 'RU',       // Russian
  TR = 'TR',       // Turkish
  NL = 'NL',       // Dutch
  SV = 'SV',       // Swedish
  TH = 'TH',       // Thai
  FIL = 'FIL',     // Filipino
  VI = 'VI',       // Vietnamese
  ZH_CN = 'ZH-CN', // Chinese (Simplified)
  ZH_TW = 'ZH-TW', // Chinese (Traditional)
}
```

## Complete example

Here's a complete implementation example:

```javascript
import React, { useEffect, useState } from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';
import {
  YunoSdk,
  YunoPaymentMethods,
  YunoStatus,
  CardFlow,
} from '@yuno-payments/yuno-sdk-react-native';

function PaymentScreen() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [checkoutSession, setCheckoutSession] = useState('');
  const [isMethodSelected, setIsMethodSelected] = useState(false);

  useEffect(() => {
    initializeYuno();
    
    // Set up event listeners
    const paymentSubscription = YunoSdk.onPaymentStatus((state) => {
      if (state.status === YunoStatus.SUCCEEDED) {
        Alert.alert('Success', 'Payment completed successfully!');
      } else if (state.status === YunoStatus.FAILED) {
        Alert.alert('Error', 'Payment failed. Please try again.');
      }
    });
    
    const tokenSubscription = YunoSdk.onOneTimeToken((token) => {
      console.log('OTT received:', token);
      // Send to backend
    });
    
    return () => {
      paymentSubscription.remove();
      tokenSubscription.remove();
    };
  }, []);

  const initializeYuno = async () => {
    try {
      await YunoSdk.initialize({
        apiKey: 'YOUR_API_KEY',
        countryCode: 'US',
        yunoConfig: {
          language: 'en',
          cardFlow: CardFlow.ONE_STEP,
          saveCardEnabled: true,
        },
      });
      setIsInitialized(true);
      
      // Fetch checkout session from your backend
      const session = await fetchCheckoutSession();
      setCheckoutSession(session);
    } catch (error) {
      console.error('Initialization error:', error);
    }
  };

  const handlePayment = async () => {
    try {
      await YunoSdk.startPayment(true);
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  if (!isInitialized || !checkoutSession) {
    return null; // Or loading indicator
  }

  return (
    <View style={styles.container}>
      <YunoPaymentMethods
        checkoutSession={checkoutSession}
        countryCode="US"
        onPaymentMethodSelected={(event) => {
          setIsMethodSelected(event.isSelected);
        }}
        onPaymentMethodError={(event) => {
          Alert.alert('Error', event.message);
        }}
        style={styles.paymentMethods}
      />
      
      <Button
        title="Pay Now"
        disabled={!isMethodSelected}
        onPress={handlePayment}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  paymentMethods: {
    flex: 1,
    marginBottom: 16,
  },
});

export default PaymentScreen;
```

## Troubleshooting

### Common issues

#### "Yuno SDK is not initialized" error

**Solution:** Ensure you call `YunoSdk.initialize()` before any other SDK methods. For Android, also verify that `YunoSdkModule.initialize()` is called in your `MainApplication.onCreate()`.

#### Android: Build fails with "Could not resolve dependency"

**Solution:** Ensure you've added the Yuno Maven repository to your `android/build.gradle`:

```gradle
maven { url "https://yunopayments.jfrog.io/artifactory/snapshots-libs-release" }
```

#### iOS: Pod Install Fails

**Solution:**

```bash
cd ios
rm -rf Pods Podfile.lock
pod deintegrate
pod install
cd ..
```

### Payment events not received

**Solution:** Make sure you subscribe to events before starting the payment flow:

```typescript
useEffect(() => {
  const subscription = YunoSdk.onPaymentStatus((state) => {
    console.log('Payment status:', state.status);
  });
  
  return () => subscription.remove();
}, []);
```

### Deep links not working (iOS)

**Solution:** Verify your `Info.plist` has the correct URL scheme configuration and that you're listening to the `Linking` events.

### Debug mode

Enable debug logging:

```bash
# Android: Check logcat
adb logcat | grep -i yuno

# iOS: Check Xcode console
```

## API Reference Summary

### `YunoSdk` methods

| Method                                            | Description                    |
| ------------------------------------------------- | ------------------------------ |
| `initialize(params)`                              | Initialize the SDK             |
| `startPayment(showStatus)`                        | Start full payment flow        |
| `startPaymentLite(params, countryCode?)`          | Start lite payment flow        |
| `startPaymentSeamlessLite(params)`                | Start seamless payment flow    |
| `enrollmentPayment(params)`                       | Start enrollment flow          |
| `continuePayment(session, country?, showStatus?)` | Continue interrupted payment   |
| `generateToken(data, session, country?)`          | Generate token (headless)      |
| `getThreeDSecureChallenge(session, country?)`     | Get 3DS challenge URL          |
| `continueEnrollment(data, session, country?)`     | Continue enrollment (headless) |
| `hideLoader()`                                    | Hide SDK loader                |
| `receiveDeeplink(url)`                            | Handle deep link (iOS)         |
| `getLastOneTimeToken()`                           | Get last OTT                   |
| `getLastOneTimeTokenInfo()`                       | Get last OTT info              |
| `clearLastOneTimeToken()`                         | Clear stored OTT               |
| `clearLastPaymentStatus()`                        | Clear payment status           |
| `onPaymentStatus(listener)`                       | Subscribe to payment events    |
| `onEnrollmentStatus(listener)`                    | Subscribe to enrollment events |
| `onOneTimeToken(listener)`                        | Subscribe to OTT events        |
| `onOneTimeTokenInfo(listener)`                    | Subscribe to OTT info events   |
