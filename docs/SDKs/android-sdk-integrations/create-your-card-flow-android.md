---
title: Create your own card form flow
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
For this, you must follow the following steps:

### First Step

Create a new layout resource file called `screen_payment_card_form.xml` to override the current xml and implement your own design.

### Second Step

After creating `screen_payment_card_form.xml`, you can use your own design while ensuring the use of Yuno Secure Fields components. This is so that the Yuno SDK can retrieve credit card information.

#### The following are the components you should use:

- CardNumberEditText:  
  This is where the user can enter the credit card number. You must use it with its defined android id:

```XML
<com.yuno.payments.features.base.ui.views.CardNumberEditText
    android:id="@+id/textField_number" />
```

- CardExpiryDateEditText:  
  This is where the user can enter the credit card's expiration date. You must use it with its defined android id:

```XML
<com.yuno.payments.features.base.ui.views.CardExpiryDateEditText
    android:id="@+id/textField_expiration_date" />
```

- TextFieldItemView for CVV code:  
  This is where the user can enter the credit card's verification code (CVV). You must use it with its defined android id:

```XML
<com.yuno.payments.features.base.ui.views.TextFieldItemView
android:id="@+id/textField_verification_code" />
```

- TextFieldItemView for card holder's name:  
  This is where the user can enter the credit card holder's name. You must use it with its defined android id:

```XML
<com.yuno.payments.features.base.ui.views.TextFieldItemView
    android:id="@+id/textField_name" />
```

- SpinnerFieldItemView for identification document type:  
  This is where the user can choose the type of identification document the credit card holder holds. You must use it with its defined android id:

```XML
<com.yuno.payments.features.base.ui.views.SpinnerFieldItemView
    android:id="@+id/spinner_document_type" />
```

- TextFieldItemView for identification document number:  
  This is where the user can enter the credit card holder's identification document number. You must use it with its defined android id:

```XML
<com.yuno.payments.features.base.ui.views.TextFieldItemView
    android:id="@+id/textField_user_document" />
```

- AppCompatCheckBox for save card:  
  This is where the user can choose whether to save the credit card for future purchases. You must use it with its defined android id:

```XML
<androidx.appcompat.widget.AppCompatCheckBox
android:id="@+id/checkBox_save_card" />
```

- Button for validate card form and continue with the payment process:  
  This is the component used to submit the form and send the credit card information to Yuno. You must use it with its defined android id:

```XML
<Button
    android:id="@+id/button_complete_form" />
```