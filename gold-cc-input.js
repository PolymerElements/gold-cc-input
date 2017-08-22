import '../polymer/polymer.js';
import '../iron-flex-layout/iron-flex-layout.js';
import { PaperInputBehavior } from '../paper-input/paper-input-behavior.js';
import '../paper-input/paper-input-container.js';
import '../paper-input/paper-input-error.js';
import '../iron-input/iron-input.js';
import { IronFormElementBehavior } from '../iron-form-element-behavior/iron-form-element-behavior.js';
import '../iron-icon/iron-icon.js';
import { Polymer } from '../polymer/lib/legacy/polymer-fn.js';
import { IronValidatableBehavior } from '../iron-validatable-behavior/iron-validatable-behavior.js';
import { Element } from '../polymer/polymer-element.js';
import { DomModule } from '../polymer/lib/elements/dom-module.js';
import './cc-validator.js';
const $_documentContainer = document.createElement('div');
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

document.head.appendChild($_documentContainer);
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
    label: {
      type: String,
      value: "Card number"
    },

    /**
     * The type of the credit card, if it is valid. Empty otherwise.
     */
    cardType: {
      type: String,
      notify: true
    },

    /**
     * A list of allowable card-types. If empty, all card-types are valid
     */
    cardTypes: {
      type: Array,
      observer: '_onCardTypesChanged'
    },

    value: {
      type: String,
      observer: '_onValueChanged'
    },
  },

  observers: [
    '_onFocusedChanged(focused)'
  ],

  ready: function() {
    if (!this.value && Element) {
      this.value = '';
    }

    if (this.value && !Element) {
       this._handleAutoValidate();
    }
  },

  beforeRegister: function() {
    this._beforeRegister();
  },

  _beforeRegister: function() {
    var template = DomModule.import('gold-cc-input', 'template');
    var version = Element ? 'v1' : 'v0';
    var inputTemplate = DomModule.import('gold-cc-input', 'template#' + version);
    var inputPlaceholder = template.content.querySelector('#template-placeholder');
    if (inputPlaceholder) {
      inputPlaceholder.parentNode.replaceChild(inputTemplate.content, inputPlaceholder);
    }
  },

  /**
  * Returns a reference to the focusable element. Overridden from PaperInputBehavior
  * to correctly focus the native input.
  */
  get _focusableElement() {
    return Element ? this.inputElement._inputElement : this.inputElement;
  },

  // Note: This event is only available in the 2.0 version of this element.
  // In 1.0, the functionality of `_onIronInputReady` is done in
  // PaperInputBehavior::attached.
  listeners: {
    'iron-input-ready': '_onIronInputReady'
  },

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
    var previousCharASpace = value ? this.value.charAt(start - 1) == ' ' : false;

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
      this.$.input.selectionStart = start+1;
      this.$.input.selectionEnd = start+1;
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

    this.$.container.updateAddons({
      inputElement: this.$.input,
      value: this.value,
      invalid: !valid
    });

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
