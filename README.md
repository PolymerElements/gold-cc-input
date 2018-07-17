[![Published on NPM](https://img.shields.io/npm/v/@polymer/gold-cc-input.svg)](https://www.npmjs.com/package/@polymer/gold-cc-input)
[![Build status](https://travis-ci.org/PolymerElements/gold-cc-input.svg?branch=master)](https://travis-ci.org/PolymerElements/gold-cc-input)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://webcomponents.org/element/@polymer/gold-cc-input)


## &lt;gold-cc-input&gt;

`gold-cc-input` is a single-line text field with Material Design styling
for entering a credit card number. As the user types, the number will be
formatted by adding a space every 4 digits.

See: [Documentation](https://www.webcomponents.org/element/@polymer/gold-cc-input),
  [Demo](https://www.webcomponents.org/element/@polymer/gold-cc-input/demo/demo/index.html).

## Usage

### Installation
```
npm install --save @polymer/gold-cc-input
```

### In an html file
```html
<html>
  <head>
    <script type="module">
      import '@polymer/gold-cc-input/gold-cc-input.js';
    </script>
  </head>
  <body>
    <gold-cc-input
          auto-validate
          label="Card number"
          error-message="Enter valid visa or mastercard!"
          card-types='["visa", "mastercard"]'
          value="6011 0000 0000 1233"
          required>
    </gold-cc-input>
  </body>
</html>
```
### In a Polymer 3 element
```js
import {PolymerElement, html} from '@polymer/polymer';
import '@polymer/gold-cc-input/gold-cc-input.js';

class SampleElement extends PolymerElement {
  static get template() {
    return html`
      <gold-cc-input
          auto-validate
          label="Card number"
          error-message="Enter valid visa or mastercard!"
          card-types='["visa", "mastercard"]'
          value="6011 0000 0000 1233"
          required>
      </gold-cc-input>
    `;
  }
}
customElements.define('sample-element', SampleElement);
```

## Contributing
If you want to send a PR to this element, here are
the instructions for running the tests and demo locally:

### Installation
```sh
git clone https://github.com/PolymerElements/gold-cc-input
cd gold-cc-input
npm install
npm install -g polymer-cli
```

### Running the demo locally
```sh
polymer serve --npm
open http://127.0.0.1:<port>/demo/
```

### Running the tests
```sh
polymer test --npm
```