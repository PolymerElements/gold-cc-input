/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import '@polymer/polymer/polymer-legacy.js';

import '@polymer/iron-flex-layout/iron-flex-layout.js';
import { PaperInputBehavior } from '@polymer/paper-input/paper-input-behavior.js';
import '@polymer/paper-input/paper-input-container.js';
import '@polymer/paper-input/paper-input-error.js';
import '@polymer/iron-input/iron-input.js';
import { IronFormElementBehavior } from '@polymer/iron-form-element-behavior/iron-form-element-behavior.js';
import '@polymer/iron-icon/iron-icon.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { IronValidatableBehavior } from '@polymer/iron-validatable-behavior/iron-validatable-behavior.js';
import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { DomModule } from '@polymer/polymer/lib/elements/dom-module.js';
const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<dom-module id="gold-cc-input">

  <template>

    <style>
    :host {
      display: block;
    }

    /* Use a container so that when hiding the icon, the layout doesn't jump around. */
    .icon-container {
      margin-left: 10px;
      height: 24px;
      @apply --gold-cc-input-icon-container;
    }

    iron-icon {
      --iron-icon-width: 40px;
      --iron-icon-height: 24px;
    }

    .container {
      @apply --layout-horizontal;
    }

    input {
      @apply --layout-flex;
    }

    input {
      position: relative; /* to make a stacking context */
      outline: none;
      box-shadow: none;
      padding: 0;
      width: 100%;
      max-width: 100%;
      background: transparent;
      border: none;
      color: var(--paper-input-container-input-color, var(--primary-text-color));
      -webkit-appearance: none;
      text-align: inherit;
      vertical-align: bottom;
      /* Firefox sets a min-width on the input, which can cause layout issues */
      min-width: 0;
      @apply --paper-font-subhead;
      @apply --paper-input-container-input;
    }
    input::-webkit-input-placeholder {
      color: var(--paper-input-container-color, var(--secondary-text-color));
    }
    input:-moz-placeholder {
      color: var(--paper-input-container-color, var(--secondary-text-color));
    }
    input::-moz-placeholder {
      color: var(--paper-input-container-color, var(--secondary-text-color));
    }
    input:-ms-input-placeholder {
      color: var(--paper-input-container-color, var(--secondary-text-color));
    }
    </style>

    <paper-input-container id="container" disabled\$="[[disabled]]" no-label-float="[[noLabelFloat]]" always-float-label="[[_computeAlwaysFloatLabel(alwaysFloatLabel,placeholder)]]" invalid="[[invalid]]">

      <label slot="label" hidden\$="[[!label]]">[[label]]</label>

      <span id="template-placeholder"></span>

      <template is="dom-if" if="[[errorMessage]]">
        <paper-input-error slot="add-on" id="error">
          [[errorMessage]]
        </paper-input-error>
      </template>

    </paper-input-container>
  </template>

  <template id="v0">
    <div class="container">
      <input is="iron-input" id="input" slot="input" aria-labelledby\$="[[_ariaLabelledBy]]" aria-describedby\$="[[_ariaDescribedBy]]" bind-value="{{value}}" type="tel" maxlength="30" required\$="[[required]]" allowed-pattern="[0-9 ]" prevent-invalid-input="" autocomplete="cc-number" name\$="[[name]]" disabled\$="[[disabled]]" invalid="{{invalid}}" autofocus\$="[[autofocus]]" inputmode\$="[[inputmode]]" placeholder\$="[[placeholder]]" readonly\$="[[readonly]]" size\$="[[size]]">
      <div class="icon-container"><iron-icon id="icon"></iron-icon></div>
    </div>
  </template>

  <template id="v1">
    <iron-input id="input" slot="input" allowed-pattern="[0-9 ]" bind-value="{{value}}" invalid="{{invalid}}" maxlength="30">
      <input id="nativeInput" aria-labelledby\$="[[_ariaLabelledBy]]" aria-describedby\$="[[_ariaDescribedBy]]" invalid\$="{{invalid}}" required\$="[[required]]" type="tel" prevent-invalid-input="" autocomplete="cc-number" name\$="[[name]]" disabled\$="[[disabled]]" autofocus\$="[[autofocus]]" inputmode\$="[[inputmode]]" placeholder\$="[[placeholder]]" readonly\$="[[readonly]]" size\$="[[size]]">
    </iron-input>
    <div class="icon-container" slot="suffix">
      <iron-icon id="icon"></iron-icon>
    </div>
  </template>

  

</dom-module>`;

document.head.appendChild($_documentContainer.content);
/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
/*
jQuery Credit Card Validator 1.0

Copyright 2012-2015 Pawel Decowski

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software
is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.
 */

var CreditCardValidator = (function(global) {
  'use strict';

  function validateCreditCard(input) {
    var __indexOf = [].indexOf || function(item) {
      for (var i = 0, l = this.length; i < l; i++) {
        if (i in this && this[i] === item)
          return i;
      }
      return -1;
    };
    var bind, card, card_type, card_types, get_card_type, is_valid_length,
        is_valid_luhn, normalize, validate, validate_number, _i, _len, _ref;
    card_types = [
      {
        name: 'amex',
        icon: 'images/amex.png',
        pattern: /^3[47]/,
        valid_length: [15]
      },
      {
        name: 'diners_club',
        icon: 'images/diners_club.png',
        pattern: /^30[0-5]/,
        valid_length: [14]
      },
      {
        name: 'diners_club',
        icon: 'images/diners_club.png',
        pattern: /^36/,
        valid_length: [14]
      },
      {
        name: 'jcb',
        icon: 'images/jcb.png',
        pattern: /^35(2[89]|[3-8][0-9])/,
        valid_length: [16]
      },
      {
        name: 'laser',
        pattern: /^(6304|670[69]|6771)/,
        valid_length: [16, 17, 18, 19]
      },
      {
        name: 'visa_electron',
        pattern: /^(4026|417500|4508|4844|491(3|7))/,
        valid_length: [16]
      },
      {
        name: 'visa',
        icon: 'images/visa.png',
        pattern: /^4/,
        valid_length: [16]
      },
      {
        name: 'mastercard',
        icon: 'images/mastercard.png',
        pattern: /^5[1-5]/,
        valid_length: [16]
      },
      {
        name: 'maestro',
        pattern: /^(5018|5020|5038|6304|6759|676[1-3])/,
        valid_length: [12, 13, 14, 15, 16, 17, 18, 19]
      },
      {
        name: 'discover',
        icon: 'images/discover.png',
        pattern:
            /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,
        valid_length: [16]
      }
    ];

    var options = {};

    if (options.accept == null) {
      options.accept = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = card_types.length; _i < _len; _i++) {
          card = card_types[_i];
          _results.push(card.name);
        }
        return _results;
      })();
    }
    _ref = options.accept;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      card_type = _ref[_i];
      if (__indexOf.call(
              (function() {
                var _j, _len1, _results;
                _results = [];
                for (_j = 0, _len1 = card_types.length; _j < _len1; _j++) {
                  card = card_types[_j];
                  _results.push(card.name);
                }
                return _results;
              })(),
              card_type) < 0) {
        throw 'Credit card type \'' + card_type + '\' is not supported';
      }
    }

    get_card_type = function(number) {
      var _j, _len1, _ref1;
      _ref1 = (function() {
        var _k, _len1, _ref1, _results;
        _results = [];
        for (_k = 0, _len1 = card_types.length; _k < _len1; _k++) {
          card = card_types[_k];
          if (_ref1 = card.name, __indexOf.call(options.accept, _ref1) >= 0) {
            _results.push(card);
          }
        }
        return _results;
      })();
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        card_type = _ref1[_j];
        if (number.match(card_type.pattern)) {
          return card_type;
        }
      }
      return null;
    };

    is_valid_luhn = function(number) {
      var digit, n, sum, _j, _len1, _ref1;
      sum = 0;
      _ref1 = number.split('').reverse();
      for (n = _j = 0, _len1 = _ref1.length; _j < _len1; n = ++_j) {
        digit = _ref1[n];
        digit = +digit;
        if (n % 2) {
          digit *= 2;
          if (digit < 10) {
            sum += digit;
          } else {
            sum += digit - 9;
          }
        } else {
          sum += digit;
        }
      }
      return sum % 10 === 0;
    };

    is_valid_length = function(number, card_type) {
      var _ref1;
      return _ref1 = number.length,
             __indexOf.call(card_type.valid_length, _ref1) >= 0;
    };

    validate_number = (function(_this) {
      return function(number) {
        var length_valid, luhn_valid;
        card_type = get_card_type(number);
        luhn_valid = false;
        length_valid = false;
        if (card_type != null) {
          luhn_valid = is_valid_luhn(number);
          length_valid = is_valid_length(number, card_type);
        }
        return {
          card_type: card_type,
          valid: luhn_valid && length_valid,
          luhn_valid: luhn_valid,
          length_valid: length_valid
        };
      };
    })(this);

    normalize = function(number) {
      return number.replace(/[ -]/g, '');
    };

    validate = (function(_this) {
      return function() {
        return validate_number(normalize(input));
      };
    })(this);

    return validate(input);
  };

  return {validate: validateCreditCard};
})(window);
Polymer({

  is: 'gold-cc-input',

  behaviors: [
    PaperInputBehavior,
    IronValidatableBehavior,
    IronFormElementBehavior
  ],

  properties: {
    /**
     * The label for this input.
     */
    label: {type: String, value: 'Card number'},

    /**
     * The type of the credit card, if it is valid. Empty otherwise.
     */
    cardType: {type: String, notify: true},

    /**
     * A list of allowable card-types. If empty, all card-types are valid
     */
    cardTypes: {type: Array, observer: '_onCardTypesChanged'},

    value: {type: String, observer: '_onValueChanged'},
  },

  observers: ['_onFocusedChanged(focused)'],

  ready: function() {
    if (!this.value && PolymerElement) {
      this.value = '';
    }

    if (this.value && !PolymerElement) {
      this._handleAutoValidate();
    }
  },

  beforeRegister: function() {
    this._beforeRegister();
  },

  _beforeRegister: function() {
    var template = DomModule.import('gold-cc-input', 'template');
    var version = PolymerElement ? 'v1' : 'v0';
    var inputTemplate =
        DomModule.import('gold-cc-input', 'template#' + version);
    var inputPlaceholder =
        template.content.querySelector('#template-placeholder');
    if (inputPlaceholder) {
      inputPlaceholder.parentNode.replaceChild(
          inputTemplate.content, inputPlaceholder);
    }
  },

  /**
   * Returns a reference to the focusable element. Overridden from
   * PaperInputBehavior to correctly focus the native input.
   */
  get _focusableElement() {
    return PolymerElement ? this.inputElement._inputElement :
                             this.inputElement;
  },

  // Note: This event is only available in the 2.0 version of this element.
  // In 1.0, the functionality of `_onIronInputReady` is done in
  // PaperInputBehavior::attached.
  listeners: {'iron-input-ready': '_onIronInputReady'},

  _onIronInputReady: function() {
    // Only validate when attached if the input already has a value.
    if (!!this.inputElement.bindValue) {
      this._handleAutoValidate();
    }
  },

  /**
   * A handler that is called when cardTypes changes
   */
  _onCardTypesChanged: function(cardTypes, oldValue) {
    if (this.value)
      this._handleAutoValidate();
  },

  /**
   * A handler that is called on input
   */
  _onValueChanged: function(value, oldValue) {
    if (oldValue == undefined)
      return;

    var start = this.$.input.selectionStart;
    var previousCharASpace =
        value ? this.value.charAt(start - 1) == ' ' : false;

    value = value.replace(/\s+/g, '');
    var formattedValue = '';
    for (var i = 0; i < value.length; i++) {
      // Add a space after every 4 characters.
      if ((i != 0) && (i % 4 == 0)) {
        formattedValue += ' ';
      }
      formattedValue += value[i];
    }
    this.updateValueAndPreserveCaret(formattedValue.trim());

    // If the character right before the selection is a newly inserted
    // space, we need to advance the selection to maintain the caret position.
    if (!previousCharASpace && this.value.charAt(start - 1) == ' ') {
      this.$.input.selectionStart = start + 1;
      this.$.input.selectionEnd = start + 1;
    }

    this._handleAutoValidate();
  },

  /**
   * Returns true if the element has a valid value, and sets the visual
   * error state.
   *
   * @return {boolean} Whether the input is currently valid or not.
   */
  validate: function() {
    // Empty, non-required input is valid.
    if (!this.required && this.value == '') {
      return true;
    }

    var result = CreditCardValidator.validate(this.value);
    var valid = result.valid && result.length_valid;
    if (valid && this.cardTypes && this.cardTypes.length > 0) {
      valid = this.cardTypes.indexOf(result.card_type.name) !== -1;
    }
    this.cardType = valid ? result.card_type.name : '';

    // Update the container and its addons (i.e. the custom error-message).
    this.$.container.invalid = !valid;

    this.$.container.updateAddons(
        {inputElement: this.$.input, value: this.value, invalid: !valid});

    // We don't have icons for all the card types.
    if (valid && result.card_type.icon) {
      this.$.icon.src = this.resolveUrl(result.card_type.icon);
      this.$.icon.alt = this.cardType;
      this.$.icon.hidden = false;
    } else {
      this.$.icon.src = null;
      this.$.icon.alt = '';
      this.$.icon.hidden = true;
    }

    return valid;
  },

  /**
   * Overidden from Polymer.IronControlState.
   */
  _onFocusedChanged: function(focused) {
    if (!this._focusableElement) {
      return;
    }
    if (!focused) {
      this._handleAutoValidate();
    }
  }
})
