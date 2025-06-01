---
title: SDK Customizations
excerpt: ''
deprecated: false
hidden: false
metadata:
  title: SDK Customizations
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
The Yuno Web SDK allows you to customize various elements, making it easy to align the design of payment forms and the checkout flow with your brand guidelines and UX/UI. Although the structure of each element remains uniform, you can adjust colors, text, buttons, and much more.

## General guidelines

* **Styles within an iframe**: Define the new styles when initializing the SDK. Each form input that receives card information is rendered within an iframe when using the Form Card Modal.
* **Styles outside an iframe**: Inject the styles directly into the page.
* **Check element structure**: Use the browser's developer mode to inspect where the element is rendered.

## Default and Deprecated Design

Use the Default Design information when customizing the Yuno Web SDK. This approach is recommended for all new customizations and ensures you use the most up-to-date styles and practices.

The Deprecated Design is available for Yuno clients needing access to CSS class information. However, this option will be removed in the future.

## Customizable elements

The following sections detail the elements that make up the Card and APM forms, along with the respective classes for each one, which can be modified to achieve a personalized style. Use the tab selector to choose between the Default and Deprecated content:

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
</style>

<body>
  <input type="radio" id="web" name="tabs" checked>
  <input type="radio" id="ios" name="tabs">

  <div class="tabs">
    <label for="web">Default</label>
    <label for="ios">Deprecated</label>
  </div>

  <div class="tab-content" id="web">

    <p>Use the following links to navigate to the desired component:</p>

    <ul>
      <li><a href="#default-input">Input</a></li>
      <li><a href="#default-dropdown">Dropdown</a></li>
      <li><a href="#default-checkbox">Checkbox</a></li>
      <li><a href="#default-button">Button</a></li>
      <li><a href="#default-card">Card</a></li>
      <li><a href="#default-alert">Alert</a></li>
      <li><a href="#default-modal">Modal</a></li>
      <ul>
        <li><a href="#default-form-card-modal">Form Card Modal</a></li>
        <li><a href="#default-apm-modal">APM Modal</a></li>
      </ul>
    </ul>


    <h3 id="default-input">Input</h3>

    <p>The classes available for customizing the input element while using the Default Design are listed in the
      following table.</p>
    <table>
      <thead>
        <tr>
          <th>CSS Class</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>.Yuno-fieldset__box</code></td>
          <td>General container for input fields.</td>
        </tr>
        <tr>
          <td><code>.Yuno-input__content</code></td>
          <td>Content area for input elements.</td>
        </tr>
        <tr>
          <td><code>.Yuno-input__label</code></td>
          <td>Label for input elements.</td>
        </tr>
        <tr>
          <td><code>.Yuno-input__base</code></td>
          <td>Base styling for input elements.</td>
        </tr>
      </tbody>
    </table>
    <p>The images below present how each class will affect the input element.</p>
    <img style="width:100%;margin-top:20px;margin-bottom:28px;"
      src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/SDKs/webSDK/customization-SDK-defaults/input-default-1.png">

    <p>You can also customize the error warnings flagged by the interface. The classes related to error warnings are
      presented in the table below.</p>

    <table>
      <thead>
        <tr>
          <th>CSS Class</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>.Yuno-input__label .Yuno-input__label--error</code></td>
          <td>Label with error styling for input elements.</td>
        </tr>
        <tr>
          <td><code>.Yuno-error-text-field__content</code></td>
          <td>Container for error message content.</td>
        </tr>
        <tr>
          <td><code>.Yuno-error-text-field__error-icon</code></td>
          <td>Icon for error messages.</td>
        </tr>
        <tr>
          <td><code>.Yuno-error-text-field__message</code></td>
          <td>Text for error messages.</td>
        </tr>
      </tbody>
    </table>

    <p>The images below present how each class will affect the input element.</p>

    <img style="width:100%;margin-top:20px;margin-bottom:28px;"
      src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/SDKs/webSDK/customization-SDK-defaults/input-default-2.png">

    <p>The code block below presents an example of how you can customize the input element. To use the following code,
      you need to add it to <code>card</code> when starting the SDK with <code>yuno.startCheckout</code>.</p>

    <div class="CodeTabs CodeTabs_initial theme-light">
      <div class="CodeTabs-toolbar" role="tablist">
        <button aria-selected="true" class="CodeTabs_active" role="tab" type="button">CSS</button>
      </div>
      <div class="CodeTabs-inner" role="tabpanel">
        <pre><code class="rdmd-code lang-css theme-light" data-lang="css" name="" tabindex="0"><div class="cm-s-neo" data-testid="SyntaxHighlighter">
  <span class="cm-variable">styles</span>: \`
  <span class="cm-variable">#root</span> {
    <span class="cm-variable">.Yuno-fieldset__box</span> {
      <span class="cm-variable">.Yuno-input__content</span>{
        <span class="cm-property">background</span>: <span class="cm-string">lavender</span>;
        <span class="cm-property">border-radius</span>: <span class="cm-number">8px</span>;
        <span class="cm-variable">.Yuno-input__base</span> {
          <span class="cm-property">background</span>: <span class="cm-string">lavender</span>;
        }
      }
    }
    <span class="cm-variable">.Yuno-pan-secure-field</span> <span class="cm-variable">.Yuno-fieldset__box</span>.<span class="cm-variable">Yuno-fieldset__box--focus</span> {
      <span class="cm-property">border-color</span>: <span class="cm-string">darkviolet !important</span>;
    }
  }
  \`,</div></code></pre>
      </div>
    </div>

    <p>The following image presents the result of the customization.</p>

    <img style="width:100%;margin-top:20px;margin-bottom:28px;"
      src="https://github.com/writechoiceorg/yuno-images/blob/main/doc/SDKs/webSDK/customization-SDK-defaults/input-default-3.png?raw=true">
    <h3 id="default-dropdown">Dropdown</h3>
    <p>The classes available for customizing the dropdown element while using the Default Design are listed in the
      following table.</p>

    <table>
      <thead>
        <tr>
          <th>CSS Class</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>.Yuno-fieldset__box</code></td>
          <td>General container for input fields.</td>
        </tr>
        <tr>
          <td><code>.Yuno-select__content</code></td>
          <td>Content area for select elements.</td>
        </tr>
        <tr>
          <td><code>.Yuno-select__label</code></td>
          <td>Label for select elements.</td>
        </tr>
        <tr>
          <td><code>.Yuno-select__button-combo-box</code></td>
          <td>Button for combo box elements.</td>
        </tr>
        <tr>
          <td><code>.Yuno-select__input</code></td>
          <td>Input area for select elements.</td>
        </tr>
        <tr>
          <td><code>.Yuno-select__arrow</code></td>
          <td>Arrow icon for select dropdown.</td>
        </tr>
        <tr>
          <td><code>.Yuno-select__list-box</code></td>
          <td>Container for dropdown list items.</td>
        </tr>
        <tr>
          <td><code>.Yuno-select__list-item</code></td>
          <td>Individual item in dropdown list.</td>
        </tr>

      </tbody>
    </table>

    <p>The images below present how each class will affect the dropdown element.</p>

    <img style="width:100%;margin-top:20px;margin-bottom:28px;"
      src="https://github.com/writechoiceorg/yuno-images/blob/main/doc/SDKs/webSDK/customization-SDK-defaults/dropdown-default-1.png?raw=true">

    <p>You can also customize the error warnings flagged by the interface. The classes related to error warnings are
      presented in the table below.</p>

    <table>
      <thead>
        <tr>
          <th>CSS Class</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>.Yuno-fieldset__box .Yuno-fieldset__box--error</code></td>
          <td>Container with error styling.</td>
        </tr>
        <tr>
          <td><code>.Yuno-select__label .Yuno-select__label--error</code></td>
          <td>Label with error styling.</td>
        </tr>
        <tr>
          <td><code>.Yuno-error-text-field__content</code></td>
          <td>Container for error message content.</td>
        </tr>
        <tr>
          <td><code>.Yuno-error-text-field__error-icon</code></td>
          <td>Icon for error messages.</td>
        </tr>
        <tr>
          <td><code>.Yuno-error-text-field__message</code></td>
          <td>Text for error messages.</td>
        </tr>
      </tbody>
    </table>

    <p>The images below present how each class will affect the dropdown element.</p>

    <img style="width:100%;margin-top:20px;margin-bottom:28px;"
      src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/SDKs/webSDK/customization-SDK-defaults/dropdown-default-2.png">

    <p>The code block below presents an example of how you can customize the dropdown element.</p>

    <div class="CodeTabs CodeTabs_initial theme-light">
      <div class="CodeTabs-toolbar" role="tablist">
        <button aria-selected="true" class="CodeTabs_active" role="tab" type="button">CSS</button>
      </div>
      <div class="CodeTabs-inner" role="tabpanel">
        <pre><code class="rdmd-code lang-css theme-light" data-lang="css" name="" tabindex="0"><div class="cm-s-neo" data-testid="SyntaxHighlighter">
<span class="cm-variable">.Yuno-fieldset__box</span> {
  <span class="cm-variable">.Yuno-select__content</span> {
    <span class="cm-property">background</span>: <span class="cm-string">lavender</span>;
    <span class="cm-property">border-radius</span>: <span class="cm-number">8px</span>;
    <span class="cm-property">border-bottom-right-radius</span>: <span class="cm-number">0px</span>;
    <span class="cm-property">border-top-right-radius</span>: <span class="cm-number">0px</span>;
    <span class="cm-variable">.Yuno-select__input</span> {
      <span class="cm-property">background</span>: <span class="cm-string">lavender</span>;
    }
    <span class="cm-variable">.Yuno-select__list-box</span> {
      <span class="cm-property">background</span>: <span class="cm-string">lavender</span>;
    }
  }
}</div></code></pre>
      </div>
    </div>

    <p>The following image presents the result of the customization.</p>

    <img style="width:100%;margin-top:20px;margin-bottom:28px;"
      src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/SDKs/webSDK/customization-SDK-defaults/dropdown-default-3.png">

    <h3 id="default-checkbox">Checkbox</h3>

    <p>The classes available for customizing the checkbox element while using the Default Design are listed in the
      following table.</p>

    <table>
      <thead>
        <tr>
          <th>CSS Class</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>.Yuno-checkbox__content</code></td>
          <td>Container for checkbox elements.</td>
        </tr>
        <tr>
          <td><code>.Yuno-checkbox__icon</code></td>
          <td>Icon for checkbox elements.</td>
        </tr>
        <tr>
          <td><code>.Yuno-checkbox__text</code></td>
          <td>Text for checkbox elements.</td>
        </tr>
      </tbody>
    </table>


    <p>The image below present how each class will affect the checkbox element.</p>

    <img style="width:100%;margin-top:20px;margin-bottom:28px;"
      src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/SDKs/webSDK/customization-SDK-defaults/checkbox-default-1.png">

    <p>The code block below presents an example of how you can customize the checkbox element. </p>

    <div class="CodeTabs CodeTabs_initial theme-light">
      <div class="CodeTabs-toolbar" role="tablist">
        <button aria-selected="true" class="CodeTabs_active" role="tab" type="button">CSS</button>
      </div>
      <div class="CodeTabs-inner" role="tabpanel">
        <pre><code class="rdmd-code lang-css theme-light" data-lang="css" name="" tabindex="0"><div class="cm-s-neo" data-testid="SyntaxHighlighter">
<span class="cm-variable">.Yuno-checkbox__content</span> {
  <span class="cm-variable">.Yuno-checkbox__text</span> {
    <span class="cm-property">color</span>: <span class="cm-string">white</span>;
  }
}</div></code></pre>
      </div>
    </div>

    <p>The following image presents the result of the customization.</p>

    <img style="width:100%;margin-top:20px;margin-bottom:28px;"
      src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/SDKs/webSDK/customization-SDK-defaults/checkbox-default-2.png">

    <h3 id="default-button">Button</h3>

    <p>The classes available for customizing the button element while using the Default Design are listed in the
      following table.</p>

    <table>
      <thead>
        <tr>
          <th>CSS Class</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>.Yuno-button .Yuno-modal-bottom__button</code></td>
          <td>Class to configure the pay button.</td>
        </tr>
      </tbody>
    </table>

    <p>The image below present how each class will affect the button element.</p>

    <img style="width:100%;margin-top:20px;margin-bottom:28px;"
      src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/SDKs/webSDK/customization-SDK-defaults/button-default-1.png">

    <p>The code block below presents an example of how you can customize the button element. </p>

    <div class="CodeTabs CodeTabs_initial theme-light">
      <div class="CodeTabs-toolbar" role="tablist">
        <button aria-selected="true" class="CodeTabs_active" role="tab" type="button">CSS</button>
      </div>
      <div class="CodeTabs-inner" role="tabpanel">
        <pre><code class="rdmd-code lang-css theme-light" data-lang="css" name="" tabindex="0"><div class="cm-s-neo" data-testid="SyntaxHighlighter">
<span class="cm-variable">.Yuno-button.Yuno-modal-bottom__button</span> {
  <span class="cm-property">background</span>: <span class="cm-string">cornflowerblue</span>;  
}</div></code></pre>
      </div>
    </div>

    <p>The following image presents the result of the customization.</p>

    <img style="width:100%;margin-top:20px;margin-bottom:28px;"
      src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/SDKs/webSDK/customization-SDK-defaults/button-default-2.png">


    <h3 id="default-card">Card</h3>

    <p>The classes available for customizing the card element while using the Default Design are listed in the
      following table.</p>

    <table>
      <thead>
        <tr>
          <th>CSS Class</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>.Yuno-front-side-card__content</code></td>
          <td>Class to configure the card element content.</td>
        </tr>
      </tbody>
    </table>

    <p>The image below present how each class will affect the card element.</p>

    <img style="width:100%;margin-top:20px;margin-bottom:28px;"
      src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/SDKs/webSDK/customization-SDK-defaults/card-default-1.png">

    <p>The code block below presents an example of how you can customize the card element. To use the following code,
      you need to add it to <code>card</code> when starting the SDK with <code>yuno.startCheckout</code>.</p>

    <div class="CodeTabs CodeTabs_initial theme-light">
      <div class="CodeTabs-toolbar" role="tablist">
        <button aria-selected="true" class="CodeTabs_active" role="tab" type="button">CSS</button>
      </div>
      <div class="CodeTabs-inner" role="tabpanel">
        <pre><code class="rdmd-code lang-css theme-light" data-lang="css" name="" tabindex="0"><div class="cm-s-neo" data-testid="SyntaxHighlighter">
  <span class="cm-variable">styles</span>: \`
  <span class="cm-variable">#root</span> {
    <span class="cm-variable">.Yuno-front-side-card__content</span> {
      <span class="cm-property">background</span>: <span class="cm-string">darkslateblue</span>;
    }
  }
\`,</div></code></pre>
      </div>
    </div>

    <p>The following image presents the result of the customization.</p>

    <img style="width:100%;margin-top:20px;margin-bottom:28px;"
      src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/SDKs/webSDK/customization-SDK-defaults/card-default-2.png">

    <h3 id="default-alert">Alert</h3>

    <p>The classes available for customizing the alert element while using the Default Design are listed in the
      following table.</p>

    <table>
      <thead>
        <tr>
          <th>CSS Class</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>.Yuno-Alert</code></td>
          <td>Configure the alert container.</td>
        </tr>
        <tr>
          <td><code>.Yuno-Alert__icon</code></td>
          <td>Enables you to change the alert icon.</td>
        </tr>
        <tr>
          <td><code>.Yuno-Alert__message</code></td>
          <td>Text for the alert element.</td>
        </tr>
      </tbody>
    </table>

    <p>The image below present how each class will affect the alert element.</p>

    <img style="width:100%;margin-top:20px;margin-bottom:28px;"
      src="https://github.com/writechoiceorg/yuno-images/blob/main/doc/SDKs/webSDK/customization-SDK-defaults/alert-default-1.png?raw=true">

    <p>The code block below presents an example of how you can customize the alert element.</p>

    <div class="CodeTabs CodeTabs_initial theme-light">
      <div class="CodeTabs-toolbar" role="tablist">
        <button aria-selected="true" class="CodeTabs_active" role="tab" type="button">CSS</button>
      </div>
      <div class="CodeTabs-inner" role="tabpanel">
        <pre><code class="rdmd-code lang-css theme-light" data-lang="css" name="" tabindex="0"><div class="cm-s-neo" data-testid="SyntaxHighlighter">
<span class="cm-variable">.yuno-modal-user-form</span> {
  <span class="cm-variable">.Yuno-Alert</span> {
    <span class="cm-property">background-color</span>: <span class="cm-string">black</span>;
    <span class="cm-variable">.Yuno-Alert__message</span> {
      <span class="cm-property">color</span>: <span class="cm-string">white</span>;
    }
  }
}</div></code></pre>
      </div>
    </div>

    <p>The following image presents the result of the customization.</p>

    <img style="width:100%;margin-top:20px;margin-bottom:28px;"
      src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/SDKs/webSDK/customization-SDK-defaults/alert-default-2.png">

    <h3 id="default-modal">Modal</h3>

    <p>The modal element provides two option you can customize:</p>
    <ul>
      <li><b>Form Card Modal</b></li>
      <li><b>APM Modal</b></li>
    </ul>

    <div class="infoBlockContainer ">
      <div class="verticalLine"></div>
      <div>
        <h3>Modal contomization requirements</h3>
        <div class="contentContainer">
          <p>
            To customize the modal component style, you must define the custom style directly within your web page.
          </p>
        </div>
      </div>
    </div>

    <h4 id="default-form-card-modal">Form Card Modal</h4>

    <p>Within the Form Card Modal, three iframes exist, where the card number input, expiration input, and CVV input are
      rendered separated. The name of the card owner is a standard input.</p>

    <p>The classes available for customizing the form card modal element while using the Default Design are listed in
      the
      following table.</p>

    <table>
      <thead>
        <tr>
          <th>CSS Class</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>Yuno-modal__modal-content</code></td>
          <td>Container for the modal content.</td>
        </tr>
        <tr>
          <td><code>Yuno-modal-header__content</code></td>
          <td>Header section of the modal.</td>
        </tr>
        <tr>
          <td><code>Yuno-modal-header__icon</code></td>
          <td>Icon in the modal header.</td>
        </tr>
        <tr>
          <td><code>Yuno-modal-header__title</code></td>
          <td>Title of the modal.</td>
        </tr>
        <tr>
          <td><code>Yuno-modal-body__content</code></td>
          <td>Body content of the modal.</td>
        </tr>
        <tr>
          <td><code>Yuno-modal-bottom__content</code></td>
          <td>Bottom section of the modal.</td>
        </tr>
      </tbody>
    </table>


    <p>The image below presents how each class will affect the form card modal element.</p>

    <img style="width:100%;margin-top:20px;margin-bottom:28px;"
      src="https://github.com/writechoiceorg/yuno-images/blob/main/doc/SDKs/webSDK/customization-SDK-defaults/form-card-modal-default-1.png?raw=true">

    <p>The code block below presents an example of how you can customize the form card modal element. </p>

    <div class="CodeTabs CodeTabs_initial theme-light">
      <div class="CodeTabs-toolbar" role="tablist">
        <button aria-selected="true" class="CodeTabs_active" role="tab" type="button">CSS</button>
      </div>
      <div class="CodeTabs-inner" role="tabpanel">
        <pre><code class="rdmd-code lang-css theme-light" data-lang="css" name="" tabindex="0"><div class="cm-s-neo" data-testid="SyntaxHighlighter">
<span class="cm-variable">.Yuno-modal__modal-content</span> {
  <span class="cm-property">background</span>: <span class="cm-string">rgb(40, 42, 48) !important</span>;

  <span class="cm-variable">& .Yuno-modal-header__title</span> {
    <span class="cm-property">color</span>: <span class="cm-string">white</span>;
  }
  <span class="cm-variable">& .Yuno-modal-bottom__content .Yuno-yuno-brand__text</span> {
    <span class="cm-property">color</span>: <span class="cm-string">white</span>;
  }
  <span class="cm-variable">& .Yuno-modal-bottom__content .Yuno-button</span> {
    <span class="cm-property">background</span>: <span class="cm-string">#35363e</span>;
  }
  <span class="cm-variable">& .Yuno-modal-body__content .Yuno-checkbox__content .Yuno-checkbox__text</span> {
    <span class="cm-property">color</span>: <span class="cm-string">white !important</span>;
  }
}</div></code></pre>
      </div>
    </div>

    <p>The following image presents the result of the customization.</p>

    <img style="width:100%;margin-top:20px;margin-bottom:28px;"
      src="https://github.com/writechoiceorg/yuno-images/blob/main/doc/SDKs/webSDK/customization-SDK-defaults/form-card-modal-default-2.png?raw=true">

    <h4 id="default-apm-modal">APM Modal</h4>


    <p>The classes available for customizing the APM modal element while using the Default Design are listed in the
      following table.</p>

    <table>
      <thead>
        <tr>
          <th>CSS Class</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>.Yuno-modal__modal-content</code></td>
          <td>Container for the modal content.</td>
        </tr>
        <tr>
          <td><code>.Yuno-modal-header__content</code></td>
          <td>Header section of the modal.</td>
        </tr>
        <tr>
          <td><code>.Yuno-modal-header__icon</code></td>
          <td>Icon in the modal header.</td>
        </tr>
        <tr>
          <td><code>.Yuno-modal-header__title</code></td>
          <td>Title of the modal.</td>
        </tr>
        <tr>
          <td><code>.Yuno-modal-header__close-button</code></td>
          <td>Close button for the modal.</td>
        </tr>
        <tr>
          <td><code>.yuno-user-form__heading .yuno-heading</code></td>
          <td>Heading for the user form.</td>
        </tr>
        <tr>
          <td><code>.yuno-user-form__form</code></td>
          <td>Form container within the user form.</td>
        </tr>
        <tr>
          <td><code>.Yuno-modal-body__content</code></td>
          <td>Body content of the modal.</td>
        </tr>
        <tr>
          <td><code>.Yuno-modal-bottom__content</code></td>
          <td>Bottom section of the modal.</td>
        </tr>
        <tr>
          <td><code>.Yuno-button .Yuno-modal-bottom__button</code></td>
          <td>Button within the bottom section of the modal.</td>
        </tr>
        <tr>
          <td><code>.Yuno-yuno-brand__content</code></td>
          <td>Content area for Yuno brand.</td>
        </tr>
        <tr>
          <td><code>.Yuno-yuno-brand__icon</code></td>
          <td>Icon for Yuno brand.</td>
        </tr>
        <tr>
          <td><code>Yuno-yuno-brand__text</code></td>
          <td>Text for Yuno brand.</td>
        </tr>
      </tbody>
    </table>

    <p>The image below presents how each class will affect the APM modal element.</p>

    <img style="width:100%;margin-top:20px;margin-bottom:28px;"
      src="https://github.com/writechoiceorg/yuno-images/blob/main/doc/SDKs/webSDK/customization-SDK-defaults/form-apm-modal-default-1-v2.png?raw=true">

    <p>The code block below presents an example of how you can customize the APM modal element. </p>

    <div class="CodeTabs CodeTabs_initial theme-light">
      <div class="CodeTabs-toolbar" role="tablist">
        <button aria-selected="true" class="CodeTabs_active" role="tab" type="button">CSS</button>
      </div>
      <div class="CodeTabs-inner" role="tabpanel">
        <pre><code class="rdmd-code lang-css theme-light" data-lang="css" name="" tabindex="0"><div class="cm-s-neo" data-testid="SyntaxHighlighter">
<span class="cm-variable">.Yuno-modal__modal-content</span> {
  <span class="cm-property">background</span>: <span class="cm-string">rgb(40, 42, 48) !important</span>;
}

<span class="cm-variable">.Yuno-modal-header__content</span> {
  <span class="cm-variable">.Yuno-modal-header__title</span> {
    <span class="cm-property">color</span>: <span class="cm-string">white</span>;
  }
}

<span class="cm-variable">.Yuno-modal-body__content</span> {
  <span class="cm-variable">.yuno-user-form__heading</span>.<span class="cm-variable">yuno-heading</span> {
    <span class="cm-property">color</span>: <span class="cm-string">white</span>;
  }
  <span class="cm-variable">.Yuno-Alert</span> {
    <span class="cm-property">background</span>: <span class="cm-string">#35363e</span>;
    <span class="cm-property">color</span>: <span class="cm-string">white</span>;

    <span class="cm-variable">.Yuno-Alert__message</span> {
      <span class="cm-property">color</span>: <span class="cm-string">white</span>;
    }
  }
  <span class="cm-variable">.yuno-terms-conditions</span> {
    <span class="cm-property">color</span>: <span class="cm-string">white</span>;
  }
}

<span class="cm-variable">.Yuno-modal-bottom__content</span> {
  <span class="cm-variable">.Yuno-button</span>.<span class="cm-variable">Yuno-modal-bottom__button</span> {
    <span class="cm-property">background</span>: <span class="cm-string">darkslateblue</span>;
  }
}</div></code></pre>
      </div>
    </div>

    <p>The following image presents the result of the customization.</p>

    <img style="width:100%;margin-top:20px;margin-bottom:28px;"
      src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/SDKs/webSDK/customization-SDK-defaults/form-apm-modal-default-2-v2.png">

  </div>

  <div class="tab-content" id="ios">

    <p>Use the following links to navigate to the desired component:</p>

    <ul>
      <li><a href="#deprecated-input">Input</a></li>
      <li><a href="#deprecated-dropdown">Dropdown</a></li>
      <li><a href="#deprecated-button">Button</a></li>
      <li><a href="#deprecated-card">Card</a></li>
      <li><a href="#deprecated-alert">Alert</a></li>
      <li><a href="#deprecated-modal">Modal</a></li>
      <ul>
        <li><a href="#deprecated-form-card-modal">Form Card Modal</a></li>
        <li><a href="#deprecated-apm-modal">APM Modal</a></li>
      </ul>
    </ul>

    <h3 id="deprecated-input">Input</h3>
    <p>The classes available for customizing the input element while using the Deprecated Design are listed in the
      following table.</p>
    <table>
      <thead>
        <tr>
          <th>CSS Class</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>.Yuno-text-field__content</code></td>
          <td>General container for text fields.</td>
        </tr>
        <tr>
          <td><code>.Yuno-text-field__label</code></td>
          <td>Label for text fields.</td>
        </tr>
        <tr>
          <td><code>.Yuno-text-field__input</code></td>
          <td>Input area for text fields.</td>
        </tr>
        <tr>
          <td><code>.Yuno-text-field__end-adornment</code></td>
          <td>End adornment for text fields.</td>
        </tr>
      </tbody>
    </table>
    <p>The images below present how each class will affect the input element.</p>
    <img style="width:100%;margin-top:20px;margin-bottom:28px;"
      src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/SDKs/webSDK/customization-SDK-depricated/input-depricated-1.png">

    <p>You can also customize the error warnings flagged by the interface. The classes related to error warnings are
      presented in the table below.</p>

    <table>
      <thead>
        <tr>
          <th>CSS Class</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>.Yuno-error-text-field__content</code></td>
          <td>Container for error message content.</td>
        </tr>
        <tr>
          <td><code>.Yuno-text-field__label</code></td>
          <td>Label for text fields.</td>
        </tr>
        <tr>
          <td><code>.Yuno-text-field__content .error</code></td>
          <td>Container for the input in case of an error.</td>
        </tr>
        <tr>
          <td><code>.Yuno-error-text-field__message</code></td>
          <td>Text for error messages.</td>
        </tr>
      </tbody>
    </table>

    <p>The images below present how each class will affect the input element.</p>

    <img style="width:100%;margin-top:20px;margin-bottom:28px;"
      src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/SDKs/webSDK/customization-SDK-depricated/input-depricated-2.png">

    <p>The code block below presents an example of how you can customize the input element. To use the following code,
      you need to add it to <code>card</code> when starting the SDK with <code>yuno.startCheckout</code>.</p>

    <div class="CodeTabs CodeTabs_initial theme-light">
      <div class="CodeTabs-toolbar" role="tablist">
        <button aria-selected="true" class="CodeTabs_active" role="tab" type="button">CSS</button>
      </div>
      <div class="CodeTabs-inner" role="tabpanel">
        <pre><code class="rdmd-code lang-css theme-light" data-lang="css" name="" tabindex="0"><div class="cm-s-neo" data-testid="SyntaxHighlighter">
<span class="cm-variable">styles</span>: \`
  <span class="cm-variable">#root</span> {
    <span class="cm-comment">// content</span>
    <span class="cm-variable">.Yuno-text-field__content</span> {
      <span class="cm-comment">// label</span>
      <span class="cm-variable">.Yuno-text-field__label</span> {
        <span class="cm-property">color</span>: <span class="cm-string">white</span>;
      }
      <span class="cm-comment">// input</span>
      <span class="cm-variable">.Yuno-text-field__input</span> {
        <span class="cm-property">background</span>: <span class="cm-string">lavender</span>;
        <span class="cm-property">border-color</span>: <span class="cm-string">#35363E</span>;
      }
      <span class="cm-comment">// input focus</span>
      <span class="cm-variable">.Yuno-text-field__input</span>:<span class="cm-variable">focus</span> {
        <span class="cm-property">border</span>: <span class="cm-string">'2px solid #35363E'</span>;
      }
    }
  }
\`,</div></code></pre>
      </div>
    </div>

    <p>The following image presents the result of the customization.</p>

    <img style="width:100%;margin-top:20px;margin-bottom:28px;"
      src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/SDKs/webSDK/customization-SDK-depricated/input-depricated-3.png">

    <h3 id="deprecated-dropdown">Dropdown</h3>
    <p>The classes available for customizing the dropdown element while using the Deprecated Design are listed in the
      following table.</p>

    <table>
      <thead>
        <tr>
          <th>CSS Class</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>.Yuno-select-field__state-select-wrapper</code></td>
          <td>Wrapper for state select field.</td>
        </tr>
        <tr>
          <td><code>.Yuno-select__button-combo-box</code></td>
          <td>Button for combo box elements.</td>
        </tr>
        <tr>
          <td><code>.Yuno-select-field__content</code></td>
          <td>Content area for select field.</td>
        </tr>
        <tr>
          <td><code>.Yuno-select-field__label</code></td>
          <td>Label for select field.</td>
        </tr>
        <tr>
          <td><code>.Yuno-select-field__select-button</code></td>
          <td>Select button for the field.</td>
        </tr>
        <tr>
          <td><code>.Yuno-select-field__list</code></td>
          <td>List container for select options.</td>
        </tr>
        <tr>
          <td><code>.Yuno-option__option</code></td>
          <td>Individual option in select list.</td>
        </tr>
      </tbody>
    </table>

    <p>The images below present how each class will affect the dropdown element.</p>

    <img style="width:100%;margin-top:20px;margin-bottom:28px;"
      src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/SDKs/webSDK/customization-SDK-depricated/dropdown-depricated-1.png">

    <p>You can also customize the error warnings flagged by the interface. The classes related to error warnings are
      presented in the table below.</p>

    <table>
      <thead>
        <tr>
          <th>CSS Class</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>.Yuno-select-field__state-select-wrapper .error</code></td>
          <td>Wrapper for state select field with error styling.</td>
        </tr>
        <tr>
          <td><code>.Yuno-error-text-field__content</code></td>
          <td>Container for error message content.</td>
        </tr>
        <tr>
          <td><code>.Yuno-select-field__label</code></td>
          <td>Label for select field.</td>
        </tr>
        <tr>
          <td><code>.Yuno-error-text-field__message</code></td>
          <td>Text for error messages.</td>
        </tr>
      </tbody>
    </table>

    <p>The images below present how each class will affect the dropdown element.</p>

    <img style="width:100%;margin-top:20px;margin-bottom:28px;"
      src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/SDKs/webSDK/customization-SDK-depricated/dropdown-depricated-2.png">

    <p>The code block below presents an example of how you can customize the dropdown element. To use the following
      code, you need to add it to <code>card</code> when starting the SDK with <code>yuno.startCheckout</code>.</p>

    <div class="CodeTabs CodeTabs_initial theme-light">
      <div class="CodeTabs-toolbar" role="tablist">
        <button aria-selected="true" class="CodeTabs_active" role="tab" type="button">CSS</button>
      </div>
      <div class="CodeTabs-inner" role="tabpanel">
        <pre><code class="rdmd-code lang-css theme-light" data-lang="css" name="" tabindex="0"><div class="cm-s-neo" data-testid="SyntaxHighlighter">
<span class="cm-variable">styles</span>: \`
  <span class="cm-variable">#root</span> {
    <span class="cm-comment">//dropdown</span>
    <span class="cm-variable">.Yuno-select-field__content</span> {
      <span class="cm-variable">.Yuno-select-field__label</span> {
        <span class="cm-property">color</span>: <span class="cm-string">white</span>;
      }
      <span class="cm-variable">.Yuno-select-field__select-button</span>{
        <span class="cm-property">background</span>: <span class="cm-string">lavender</span>;
        <span class="cm-property">border-color</span>: <span class="cm-string">#35363E</span>;
      }
      <span class="cm-variable">.Yuno-select-field__list</span>{
        <span class="cm-property">background</span>: <span class="cm-string">lavender</span>;
        <span class="cm-property">border-color</span>: <span class="cm-string">#35363E</span>;
      }
    }
  }
\`,  </div></code></pre>
      </div>
    </div>

    <p>The following image presents the result of the customization.</p>

    <img style="width:100%;margin-top:20px;margin-bottom:28px;"
      src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/SDKs/webSDK/customization-SDK-depricated/dropdown-depricated-3.png">

    <h3 id="deprecated-button">Button</h3>
    <p>The classes available for customizing the button element while using the Deprecated Design are listed in the
      following table.</p>

    <table>
      <thead>
        <tr>
          <th>CSS Class</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>.Yuno-card-form__submit</code></td>
          <td>Class to configure the button container.</td>
        </tr>
        <tr>
          <td><code>.Yuno-button</code></td>
          <td>Class to configure the pay button.</td>
        </tr>
      </tbody>
    </table>


    <p>The image below presents how each class will affect the button element.</p>

    <img style="width:100%;margin-top:20px;margin-bottom:28px;"
      src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/SDKs/webSDK/customization-SDK-depricated/button-depricated-1.png">

    <p>The code block below presents an example of how you can customize the button element. To use the following code,
      you need to add it to <code>card</code> when starting the SDK with <code>yuno.startCheckout</code>.</p>

    <div class="CodeTabs CodeTabs_initial theme-light">
      <div class="CodeTabs-toolbar" role="tablist">
        <button aria-selected="true" class="CodeTabs_active" role="tab" type="button">CSS</button>
      </div>
      <div class="CodeTabs-inner" role="tabpanel">
        <pre><code class="rdmd-code lang-css theme-light" data-lang="css" name="" tabindex="0"><div class="cm-s-neo" data-testid="SyntaxHighlighter">
<span class="cm-variable">styles</span>: \`
  <span class="cm-variable">#root</span> {
    <span class="cm-variable">.Yuno-button</span> {
      <span class="cm-property">background</span>: <span class="cm-string">rgb(40, 42, 48)</span>;
    }
  }
\`, </div></code></pre>
      </div>
    </div>

    <p>The following image presents the result of the customization.</p>

    <img style="width:100%;margin-top:20px;margin-bottom:28px;"
      src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/SDKs/webSDK/customization-SDK-depricated/button-depricated-2.png">


    <h3 id="deprecated-card">Card</h3>
    <p>The classes available for customizing the card element while using the Deprecated Design are listed in the
      following table.</p>

    <table>
      <thead>
        <tr>
          <th>CSS Class</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>.Yuno-front-side-card__content</code></td>
          <td>Class to configure the card element content.</td>
        </tr>
      </tbody>
    </table>

    <p>The image below presents how each class will affect the card element.</p>

    <img style="width:100%;margin-top:20px;margin-bottom:28px;"
      src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/SDKs/webSDK/customization-SDK-depricated/card-depricated-1.png">

    <p>The code block below presents an example of how you can customize the card element. To use the following code,
      you need to add it to <code>card</code> when starting the SDK with <code>yuno.startCheckout</code>.</p>

    <div class="CodeTabs CodeTabs_initial theme-light">
      <div class="CodeTabs-toolbar" role="tablist">
        <button aria-selected="true" class="CodeTabs_active" role="tab" type="button">CSS</button>
      </div>
      <div class="CodeTabs-inner" role="tabpanel">
        <pre><code class="rdmd-code lang-css theme-light" data-lang="css" name="" tabindex="0"><div class="cm-s-neo" data-testid="SyntaxHighlighter">
<span class="cm-variable">styles</span>: \`
  <span class="cm-variable">#root</span> {
    <span class="cm-variable">.Yuno-front-side-card__content</span> {
      <span class="cm-property">background</span>: <span class="cm-string">darkslateblue</span>;
    }
  }
\`, </div></code></pre>
      </div>
    </div>

    <p>The following image presents the result of the customization.</p>

    <img style="width:100%;margin-top:20px;margin-bottom:28px;"
      src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/SDKs/webSDK/customization-SDK-depricated/card-depricated-2.png">

    <h3 id="deprecated-alert">Alert</h3>

    <p>The classes available for customizing the alert element while using the Deprecated Design are listed in the
      following table.</p>

    <table>
      <thead>
        <tr>
          <th>CSS Class</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>.Yuno-Alert</code></td>
          <td>Configure the alert container.</td>
        </tr>
        <tr>
          <td><code>.Yuno-Alert__icon</code></td>
          <td>Enables you to change the alert icon.</td>
        </tr>
        <tr>
          <td><code>.Yuno-Alert__message</code></td>
          <td>Text for the alert element.</td>
        </tr>
      </tbody>
    </table>

    <p>The image below presents how each class will affect the alert element.</p>

    <img style="width:100%;margin-top:20px;margin-bottom:28px;"
      src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/SDKs/webSDK/customization-SDK-depricated/alert-depricated-1.png">

    <p>The code block below presents an example of how you can customize the alert element. To use the following code,
      you need to add it to <code>card</code> when starting the SDK with <code>yuno.startCheckout</code>.</p>

    <div class="CodeTabs CodeTabs_initial theme-light">
      <div class="CodeTabs-toolbar" role="tablist">
        <button aria-selected="true" class="CodeTabs_active" role="tab" type="button">CSS</button>
      </div>
      <div class="CodeTabs-inner" role="tabpanel">
        <pre><code class="rdmd-code lang-css theme-light" data-lang="css" name="" tabindex="0"><div class="cm-s-neo" data-testid="SyntaxHighlighter">
<span class="cm-variable">.yuno-modal-user-form</span> {
  <span class="cm-variable">.Yuno-Alert</span> {
    <span class="cm-property">background-color</span>: <span class="cm-string">black</span>;
    <span class="cm-variable">.Yuno-Alert__message</span> {
      <span class="cm-property">color</span>: <span class="cm-string">white</span>;
    }
  }
}</div></code></pre>
      </div>
    </div>

    <p>The following image presents the result of the customization.</p>

    <img style="width:100%;margin-top:20px;margin-bottom:28px;"
      src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/SDKs/webSDK/customization-SDK-depricated/alert-depricated-2.png">

    <h3 id="deprecated-modal">Modal</h3>

    <p>The modal element provides two option you can customize:</p>
    <ul>
      <li><b>Form Card Modal</b></li>
      <li><b>APM Modal</b></li>
    </ul>

    <div class="infoBlockContainer ">
      <div class="verticalLine"></div>
      <div>
        <h3>Modal contomization requirements</h3>
        <div class="contentContainer">
          <p>
            To customize the modal component style, you must define the custom style directly within your web page.
          </p>
        </div>
      </div>
    </div>

    <h4 id="deprecated-form-card-modal">Form Card Modal</h4>

    <p>Within the Form Card Modal, three iframes exist, where the card number input, expiration input, and CVV input are
      rendered separated. The name of the card owner is a standard input.</p>

    <p>The classes available for customizing the form card modal element while using the Deprecated Design are listed in
      the
      following table.</p>

    <table>
      <thead>
        <tr>
          <th>CSS Class</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>.yuno-modal__content</code></td>
          <td>Design the modal content.</td>
        </tr>
        <tr>
          <td><code>.yuno-modal__header</code></td>
          <td>Define the modal header style.</td>
        </tr>
        <tr>
          <td><code>.Yuno-card-container</code></td>
          <td>Configure the modal container.</td>
        </tr>
      </tbody>
    </table>

    <p>The image below presents how each class will affect the form card modal element.</p>

    <img style="width:100%;margin-top:20px;margin-bottom:28px;"
      src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/SDKs/webSDK/customization-SDK-depricated/form-card-modal-depricated-1.png">

    <p>The code block below presents an example of how you can customize the form card modal element. </p>

    <div class="CodeTabs CodeTabs_initial theme-light">
      <div class="CodeTabs-toolbar" role="tablist">
        <button aria-selected="true" class="CodeTabs_active" role="tab" type="button">CSS</button>
      </div>
      <div class="CodeTabs-inner" role="tabpanel">
        <pre><code class="rdmd-code lang-css theme-light" data-lang="css" name="" tabindex="0"><div class="cm-s-neo" data-testid="SyntaxHighlighter">
<span class="cm-variable">.yuno-modal__content</span> {
  <span class="cm-property">background</span>: <span class="cm-string">lavender !important</span>;
}</div></code></pre>
      </div>
    </div>

    <p>The following image presents the result of the customization.</p>

    <img style="width:100%;margin-top:20px;margin-bottom:28px;"
      src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/SDKs/webSDK/customization-SDK-depricated/form-card-modal-depricated-2.png">

    <h4 id="deprecated-apm-modal">APM Modal</h4>


    <p>The classes available for customizing the APM modal element while using the Deprecated Design are listed in the
      following table.</p>

    <table>
      <thead>
        <tr>
          <th>CSS Class</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>.yuno-modal__content</code></td>
          <td>Container for modal content.</td>
        </tr>
        <tr>
          <td><code>.yuno-modal__header</code></td>
          <td>Header section of the modal.</td>
        </tr>
        <tr>
          <td><code>.yuno-modal__title</code></td>
          <td>Title of the modal.</td>
        </tr>
        <tr>
          <td><code>.yuno-modal__close-btn</code></td>
          <td>Close button for the modal.</td>
        </tr>
        <tr>
          <td><code>.yuno-modal-user-form</code></td>
          <td>User form within the modal.</td>
        </tr>
        <tr>
          <td><code>.yuno-user-form__heading .yuno-heading</code></td>
          <td>Heading for the user form.</td>
        </tr>
        <tr>
          <td><code>.yuno-user-form__form</code></td>
          <td>Form container within the user form.</td>
        </tr>
      </tbody>
    </table>


    <p>The image below presents how each class will affect the APM modal element.</p>

    <img style="width:100%;margin-top:20px;margin-bottom:28px;"
      src="https://raw.githubusercontent.com/writechoiceorg/yuno-images/main/doc/SDKs/webSDK/customization-SDK-depricated/form-apm-modal-depricated-1-v3.png">

    <p>The code block below presents an example of how you can customize the APM modal element. </p>

    <div class="CodeTabs CodeTabs_initial theme-light">
      <div class="CodeTabs-toolbar" role="tablist">
        <button aria-selected="true" class="CodeTabs_active" role="tab" type="button">CSS</button>
      </div>
      <div class="CodeTabs-inner" role="tabpanel">
        <pre><code class="rdmd-code lang-css theme-light" data-lang="css" name="" tabindex="0"><div class="cm-s-neo" data-testid="SyntaxHighlighter">
<span class="cm-variable">.yuno-modal__content</span> {
  <span class="cm-property">background</span>: <span class="cm-string">rgb(40, 42, 48) !important</span>;
}

<span class="cm-variable">.Yuno-select-field__content</span> {
  <span class="cm-variable">.Yuno-select-field__label</span> {
    <span class="cm-property">color</span>: <span class="cm-string">white</span>;
  }
}

<span class="cm-variable">.yuno-modal__content</span> {
  <span class="cm-variable">.yuno-modal__header</span> {
    <span class="cm-variable">.yuno-modal__title</span> {
      <span class="cm-property">color</span>: <span class="cm-string">white</span>;
    }
  }
}

<span class="cm-variable">.yuno-modal-user-form</span> {
  <span class="cm-variable">.yuno-user-form__heading</span>.<span class="cm-variable">yuno-heading</span> {
    <span class="cm-property">color</span>: <span class="cm-string">white</span>;
  }
}

<span class="cm-variable">.Yuno-text-field__content</span> {
  <span class="cm-variable">.Yuno-text-field__label</span> {
    <span class="cm-property">color</span>: <span class="cm-string">white</span>;
  }
}

<span class="cm-variable">.yuno-grid-phone</span> <span class="cm-variable">label</span> {
  <span class="cm-property">color</span>: <span class="cm-string">white</span>;
}

<span class="cm-variable">.yuno-user-form__form</span> <span class="cm-variable">.yuno-terms-conditions</span> {
  <span class="cm-property">color</span>: <span class="cm-string">white</span>;
}</div></code></pre>
      </div>
    </div>

    <p>The following image presents the result of the customization.</p>

    <img style="width:100%;margin-top:20px;margin-bottom:28px;"
      src="https://github.com/writechoiceorg/yuno-images/blob/main/doc/SDKs/webSDK/customization-SDK-depricated/form-apm-modal-depricated-2-v2.png?raw=true">


  </div>
  </div>
</body>
`}</HTMLBlock>
