---
title: Default Design
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: SDK Customizations - Default Design
  description: >-
    SDK elements employ prefixed classes, beginning with `yuno-*`. You can
    leverage these classes to customize the SDK's appearance to align with your
    brand style. By default, the SDK utilizes the `Inter` font. To ensure its
    use, insert the following link tag into your HTML for proper `Inter` font
    import.
  robots: index
next:
  description: ''
---
Use the Default Design information when customizing the Yuno Web SDK. This approach is recommended for all new customizations and ensures you use the most up-to-date styles and practices.

Use the following links to navigate to the desired component:

* [Input](#input)
* [Input design types](#input-design-types)
* [Dropdown](#dropdown)
* [Checkbox](#checkbox)
* [Button](#button)
* [Card](#card)
* [Alert](#alert)
* [Modal](#modal)

## Input

The following table lists the classes available for customizing the input element while using the Default Design:

| CSS Class              | Description                         |
| ---------------------- | ----------------------------------- |
| `.Yuno-fieldset__box`  | General container for input fields. |
| `.Yuno-input__content` | Content area for input elements.    |
| `.Yuno-input__label`   | Label for input elements.           |
| `.Yuno-input__base`    | Base styling for input elements.    |

The images below show how each class will affect the input element.

<Image border={false} src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/SDKs/webSDK/customization-SDK-defaults/input-default-1.png" />

You can also customize the error warnings flagged by the interface. The following table lists the classes related to error warnings:

| CSS Class                                      | Description                                  |
| ---------------------------------------------- | -------------------------------------------- |
| `.Yuno-input__label .Yuno-input__label--error` | Label with error styling for input elements. |
| `.Yuno-error-text-field__content`              | Container for error message content.         |
| `.Yuno-error-text-field__error-icon`           | Icon for error messages.                     |
| `.Yuno-error-text-field__message`              | Text for error messages.                     |

The images below show how each class will affect the input element.

<Image border={false} src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/SDKs/webSDK/customization-SDK-defaults/input-default-2.png" />

The following code block shows an example of how you can customize the input element. To use the following code, you need to add it to  `card`  when starting the SDK with  `yuno.startCheckout`:

```css
styles: `
  #root {
    .Yuno-fieldset__box {
      .Yuno-input__content {
        background: lavender;
        border-radius: 8px;
        .Yuno-input__base {
          background: lavender;
        }
      }
    }
    .Yuno-pan-secure-field .Yuno-fieldset__box.Yuno-fieldset__box--focus {
      border-color: darkviolet !important;
    }
  }
  `,
```

The following image shows the result of the customization:

<Image border={false} src="https://github.com/writechoiceorg/yuno-images/blob/main/doc/SDKs/webSDK/customization-SDK-defaults/input-default-3.png?raw=true" />

## Input design types

You can customize how labels and placeholders are displayed in input fields by configuring the input design type. This property controls the visual presentation of form labels and placeholders across different SDK implementations.

### Configuration

For all SDKs (except secure fields and headless), configure the input design type when starting the checkout:

```javascript
yuno.startCheckout({
  ...config,
  inputDesignType: 'float-label' | 'float-label-static' | 'label-placeholder'
})
```

For secure fields, configure the design type in the field creation options:

```javascript
secureFields.create({
  name: 'pan',
  options: {
    ...config,
    designType: 'float-label' | 'float-label-static' | 'label-placeholder'
  }
})
```

### Available design types

#### `float-label`

The label floats above the input field when the field is focused or contains a value. When the field is empty and not focused, the label appears inside the input as placeholder text.

#### `float-label-static`

The label remains in a fixed position above the input field at all times, regardless of focus state or whether the field contains a value.

#### `label-placeholder`

The label appears as placeholder text inside the input field. The label does not float or move when the field is focused or filled.

```css
styles: `
  #root {
    .Yuno-fieldset__box {
      .Yuno-input__content {
        background: lavender;
        border-radius: 8px;
        .Yuno-input__base {
          background: lavender;
        }
      }
    }
    .Yuno-pan-secure-field .Yuno-fieldset__box.Yuno-fieldset__box--focus {
      border-color: darkviolet !important;
    }
  }
  `,
```

The following image shows the result of the customization:

<Image border={false} src="https://github.com/writechoiceorg/yuno-images/blob/main/doc/SDKs/webSDK/customization-SDK-defaults/input-default-3.png?raw=true" />

## Dropdown

The following table lists the classes available for customizing the dropdown element while using the Default Design:

| CSS Class                        | Description                         |
| -------------------------------- | ----------------------------------- |
| `.Yuno-fieldset__box`            | General container for input fields. |
| `.Yuno-select__content`          | Content area for select elements.   |
| `.Yuno-select__label`            | Label for select elements.          |
| `.Yuno-select__button-combo-box` | Button for combo box elements.      |
| `.Yuno-select__input`            | Input area for select elements.     |
| `.Yuno-select__arrow`            | Arrow icon for select dropdown.     |
| `.Yuno-select__list-box`         | Container for dropdown list items.  |
| `.Yuno-select__list-item`        | Individual item in dropdown list.   |

The images below show how each class will affect the dropdown element.

<Image border={false} src="https://github.com/writechoiceorg/yuno-images/blob/main/doc/SDKs/webSDK/customization-SDK-defaults/dropdown-default-1.png?raw=true" />

You can also customize the error warnings flagged by the interface. The following table lists the classes related to error warnings:

| CSS Class                                        | Description                          |
| ------------------------------------------------ | ------------------------------------ |
| `.Yuno-fieldset__box .Yuno-fieldset__box--error` | Container with error styling.        |
| `.Yuno-select__label .Yuno-select__label--error` | Label with error styling.            |
| `.Yuno-error-text-field__content`                | Container for error message content. |
| `.Yuno-error-text-field__error-icon`             | Icon for error messages.             |
| `.Yuno-error-text-field__message`                | Text for error messages.             |

The images below show how each class will affect the dropdown element.

<Image border={false} src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/SDKs/webSDK/customization-SDK-defaults/dropdown-default-2.png" />

The following code block shows an example of how you can customize the dropdown element:

```css
.Yuno-fieldset__box {
  .Yuno-select__content {
    background: lavender;
    border-radius: 8px;
    border-bottom-right-radius: 0px;
    border-top-right-radius: 0px;
    .Yuno-select__input {
      background: lavender;
    }
    .Yuno-select__list-box {
      background: lavender;
    }
  }
}
```

The following image shows the result of the customization:

<Image border={false} src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/SDKs/webSDK/customization-SDK-defaults/dropdown-default-3.png" />

## Checkbox

The following table lists the classes available for customizing the checkbox element while using the Default Design:

| CSS Class                 | Description                      |
| ------------------------- | -------------------------------- |
| `.Yuno-checkbox__content` | Container for checkbox elements. |
| `.Yuno-checkbox__icon`    | Icon for checkbox elements.      |
| `.Yuno-checkbox__text`    | Text for checkbox elements.      |

The image below shows how each class will affect the checkbox element.

<Image border={false} src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/SDKs/webSDK/customization-SDK-defaults/checkbox-default-1.png" />

The following code block shows an example of how you can customize the checkbox element:

```css
.Yuno-checkbox__content {
  .Yuno-checkbox__text {
    color: white;
  }
}
```

The following image shows the result of the customization:

<Image border={false} src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/SDKs/webSDK/customization-SDK-defaults/checkbox-default-2.png" />

## Button

The following table lists the classes available for customizing the button element while using the Default Design:

| CSS Class                                 | Description                        |
| ----------------------------------------- | ---------------------------------- |
| `.Yuno-button .Yuno-modal-bottom__button` | Class to configure the pay button. |

The image below shows how each class will affect the button element.

<Image border={false} src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/SDKs/webSDK/customization-SDK-defaults/button-default-1.png" />

The following code block shows an example of how you can customize the button element:

```css
.Yuno-button.Yuno-modal-bottom__button {
  background: cornflowerblue;
}
```

The following image shows the result of the customization:

<Image border={false} src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/SDKs/webSDK/customization-SDK-defaults/button-default-2.png" />

## Card

The following table lists the classes available for customizing the card element while using the Default Design:

| CSS Class                        | Description                                  |
| -------------------------------- | -------------------------------------------- |
| `.Yuno-front-side-card__content` | Class to configure the card element content. |

The image below shows how each class will affect the card element.

<Image border={false} src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/SDKs/webSDK/customization-SDK-defaults/card-default-1.png" />

The code block below presents an example of how you can customize the card element. To use the following code, you need to add it to  `card`  when starting the SDK with  `yuno.startCheckout`.

```css
styles: `
  #root {
    .Yuno-front-side-card__content {
      background: darkslateblue;
    }
  }
`,
```

The following image shows the result of the customization:

<Image border={false} src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/SDKs/webSDK/customization-SDK-defaults/card-default-2.png" />

## Alert

The following table lists the classes available for customizing the alert element while using the Default Design:

| CSS Class              | Description                           |
| ---------------------- | ------------------------------------- |
| `.Yuno-Alert`          | Configure the alert container.        |
| `.Yuno-Alert__icon`    | Enables you to change the alert icon. |
| `.Yuno-Alert__message` | Text for the alert element.           |

The image below shows how each class will affect the alert element.

<Image border={false} src="https://github.com/writechoiceorg/yuno-images/blob/main/doc/SDKs/webSDK/customization-SDK-defaults/alert-default-1.png?raw=true" />

The following code block shows an example of how you can customize the alert element:

```css
.yuno-modal-user-form {
  .Yuno-Alert {
    background-color: black;
    .Yuno-Alert__message {
      color: white;
    }
  }
}
```

The following image shows the result of the customization:

<Image border={false} src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/SDKs/webSDK/customization-SDK-defaults/alert-default-2.png" />

## Modal

The modal element provides two options you can customize:

* **Form Card Modal**
* **APM Modal**

### Modal customization requirements

To customize the modal component style, you must define the custom style directly within your web page.

#### Form Card Modal

Within the Form Card Modal, three iframes exist, where the card number input, expiration input, and CVV input are rendered separated. The name of the card owner is a standard input.

The classes available for customizing the form card modal element while using the Default Design are listed in the following table.

| CSS Class                    | Description                      |
| ---------------------------- | -------------------------------- |
| `Yuno-modal__modal-content`  | Container for the modal content. |
| `Yuno-modal-header__content` | Header section of the modal.     |
| `Yuno-modal-header__icon`    | Icon in the modal header.        |
| `Yuno-modal-header__title`   | Title of the modal.              |
| `Yuno-modal-body__content`   | Body content of the modal.       |
| `Yuno-modal-bottom__content` | Bottom section of the modal.     |

The image below presents how each class will affect the form card modal element.

<Image border={false} src="https://github.com/writechoiceorg/yuno-images/blob/main/doc/SDKs/webSDK/customization-SDK-defaults/form-card-modal-default-1.png?raw=true" />

The code block below presents an example of how you can customize the form card modal element.

```css
.Yuno-modal__modal-content {
  background: rgb(40, 42, 48) !important;

  & .Yuno-modal-header__title {
    color: white;
  }
  & .Yuno-modal-bottom__content .Yuno-yuno-brand__text {
    color: white;
  }
  & .Yuno-modal-bottom__content .Yuno-button {
    background: #35363e;
  }
  & .Yuno-modal-body__content .Yuno-checkbox__content .Yuno-checkbox__text {
    color: white !important;
  }
}
```

The following image shows the result of the customization:

<Image border={false} src="https://github.com/writechoiceorg/yuno-images/blob/main/doc/SDKs/webSDK/customization-SDK-defaults/form-card-modal-default-2.png?raw=true" />

#### APM Modal

The classes available for customizing the APM modal element while using the Default Design are listed in the following table.

| CSS Class                                 | Description                                    |
| ----------------------------------------- | ---------------------------------------------- |
| `.Yuno-modal__modal-content`              | Container for the modal content.               |
| `.Yuno-modal-header__content`             | Header section of the modal.                   |
| `.Yuno-modal-header__icon`                | Icon in the modal header.                      |
| `.Yuno-modal-header__title`               | Title of the modal.                            |
| `.Yuno-modal-header__close-button`        | Close button for the modal.                    |
| `.yuno-user-form__heading .yuno-heading`  | Heading for the user form.                     |
| `.yuno-user-form__form`                   | Form container within the user form.           |
| `.Yuno-modal-body__content`               | Body content of the modal.                     |
| `.Yuno-modal-bottom__content`             | Bottom section of the modal.                   |
| `.Yuno-button .Yuno-modal-bottom__button` | Button within the bottom section of the modal. |
| `.Yuno-yuno-brand__content`               | Content area for Yuno brand.                   |
| `.Yuno-yuno-brand__icon`                  | Icon for Yuno brand.                           |
| `Yuno-yuno-brand__text`                   | Text for Yuno brand.                           |

The image below presents how each class will affect the APM modal element.

<Image border={false} src="https://github.com/writechoiceorg/yuno-images/blob/main/doc/SDKs/webSDK/customization-SDK-defaults/form-apm-modal-default-1-v2.png?raw=true" />

The code block below presents an example of how you can customize the APM modal element.

```css
.Yuno-modal__modal-content {
  background: rgb(40, 42, 48) !important;
}

.Yuno-modal-header__content {
  .Yuno-modal-header__title {
    color: white;
  }
}

.Yuno-modal-body__content {
  .yuno-user-form__heading.yuno-heading {
    color: white;
  }
  .Yuno-Alert {
    background: #35363e;
    color: white;

    .Yuno-Alert__message {
      color: white;
    }
  }
  .yuno-terms-conditions {
    color: white;
  }
}

.Yuno-modal-bottom__content {
  .Yuno-button.Yuno-modal-bottom__button {
    background: darkslateblue;
  }
}
```

The following image shows the result of the customization:

<Image border={false} src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/SDKs/webSDK/customization-SDK-defaults/form-apm-modal-default-2-v2.png" />
