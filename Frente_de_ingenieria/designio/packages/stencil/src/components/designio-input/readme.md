# designio-input

<!-- Auto Generated Below -->

## Properties

| Property                        | Attribute                          | Description                                                                                                                 | Type                                   | Default                  |
| ------------------------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ------------------------ |
| `autocomplete`                  | `autocomplete`                     | The autocomplete attribute.                                                                                                 | `string`                               | `'off'`                  |
| `bavvButtonText`                | `bavv-button-text`                 | Optional button text to display on the right side of the input for BAVV.                                                    | `string`                               | `''`                     |
| `bavvIconName`                  | `bavv-icon-name`                   | The icon name for the input of BAVV.                                                                                        | `string`                               | `''`                     |
| `bavvIconPosition`              | `bavv-icon-position`               | The icon position for the input of BAVV.                                                                                    | `"" \| "left" \| "right"`              | `''`                     |
| `bbogAutoSelect`                | `bbog-auto-select`                 | Autoselect of BBOG.                                                                                                         | `boolean`                              | `false`                  |
| `bbogDecimalQuantity`           | `bbog-decimal-quantity`            | The decimal quantity of BBOG.                                                                                               | `number`                               | `undefined`              |
| `bbogEmailValidationOnBlur`     | `bbog-email-validation-on-blur`    | Email validation on blur of BBOG.                                                                                           | `boolean`                              | `false`                  |
| `bbogIcon`                      | `bbog-icon`                        | Name of the icon to render of BBOG.                                                                                         | `string`                               | `''`                     |
| `bbogInteractiveTooltipMessage` | `bbog-interactive-tooltip-message` | The interactive tooltip message of BBOG                                                                                     | `string`                               | `undefined`              |
| `bbogLeftIcon`                  | `bbog-left-icon`                   | Name of the left icon to render of BBOG.                                                                                    | `string`                               | `undefined`              |
| `bbogPasswordMode`              | `bbog-password-mode`               | Enables/Disables the hide password mode.                                                                                    | `boolean`                              | `false`                  |
| `bbogStatus`                    | `bbog-status`                      | Enables/Disables the control of BBOG.                                                                                       | `string`                               | `'ENABLED'`              |
| `bbogTooltip`                   | `bbog-tooltip`                     | Show/Hide tooltip of BBOG.                                                                                                  | `boolean`                              | `false`                  |
| `bbogTooltipMessage`            | `bbog-tooltip-message`             | The tooltip message of BBOG                                                                                                 | `string`                               | `undefined`              |
| `bbogTooltipPosition`           | `bbog-tooltip-position`            | The tooltip position of BBOG                                                                                                | `string`                               | `'right'`                |
| `bbogTooltipTitle`              | `bbog-tooltip-title`               | The tooltip title of BBOG                                                                                                   | `string`                               | `undefined`              |
| `bbogViewMode`                  | `bbog-view-mode`                   | View mode of BBOG.                                                                                                          | `boolean`                              | `false`                  |
| `boccAttributes`                | `bocc-attributes`                  | The attributes of the input field of BOCC                                                                                   | `Input \| string`                      | `undefined`              |
| `boccFieldStatus`               | `bocc-field-status`                | The field status of the input field of BOCC                                                                                 | `FIELD_STATUS \| string`               | `undefined`              |
| `boccMaximumDecimalsAllowed`    | `bocc-maximum-decimals-allowed`    | The maximum number of decimals allowed of BOCC                                                                              | `number`                               | `0`                      |
| `boccPrefixText`                | `bocc-prefix-text`                 | The prefix text of the input field of BOCC                                                                                  | `string`                               | `''`                     |
| `bpopAriaDescribedBy`           | `bpop-aria-described-by`           | IDs to describe via `aria-describedby` of BPOP.                                                                             | `string`                               | `''`                     |
| `bpopAriaLabelProp`             | `bpop-aria-label-prop`             | Aria label for the input of BPOP.                                                                                           | `string`                               | `''`                     |
| `bpopAutocapitalizeProp`        | `bpop-autocapitalize-prop`         | Input `autocapitalize` attribute of BPOP.                                                                                   | `string`                               | `''`                     |
| `bpopButtonText`                | `bpop-button-text`                 | Text of the embedded button (right side) of BPOP.                                                                           | `string`                               | `''`                     |
| `bpopIconName`                  | `bpop-icon-name`                   | Name of the icon to render of BPOP.                                                                                         | `string`                               | `''`                     |
| `bpopIconPosition`              | `bpop-icon-position`               | Icon position (`left`/`right`) of BPOP.                                                                                     | `"" \| "left" \| "right"`              | `''`                     |
| `bpopSize`                      | `bpop-size`                        | HTML `size` attribute of BPOP.                                                                                              | `number`                               | `undefined`              |
| `bpopSpellcheckProp`            | `bpop-spellcheck-prop`             | HTML `spellcheck` attribute of BPOP.                                                                                        | `boolean`                              | `false`                  |
| `bpopStepSize`                  | `bpop-step-size`                   | Step size (number/date) of BPOP.                                                                                            | `number \| string`                     | `undefined`              |
| `bpopTabIndexProp`              | `bpop-tab-index-prop`              | `tabindex` to apply of BPOP.                                                                                                | `number`                               | `undefined`              |
| `bpopTitleProp`                 | `bpop-title-prop`                  | HTML `title` attribute of BPOP.                                                                                             | `string`                               | `''`                     |
| `disabled`                      | `disabled`                         | Whether the input is disabled for BAVV, BPOP or BOCC. It doesn't apply to BBOG. For BBOG please use the bbogStatus property | `boolean`                              | `false`                  |
| `entity`                        | `entity`                           | Entity for the input                                                                                                        | `"bavv" \| "bbog" \| "bocc" \| "bpop"` | `'bbog'`                 |
| `helper`                        | `helper`                           | The text shown as helper below the input for BAVV, BPOP or BBOG. It doesn't apply to BOCC.                                  | `string`                               | `undefined`              |
| `idProp`                        | `id-prop`                          | The ID attribute of the input.                                                                                              | `string`                               | `''`                     |
| `inputModeProp`                 | `input-mode-prop`                  | The input mode (e.g., numeric, text) for BAVV, BPOP or BOCC. It doesn't apply to BBOG.                                      | `string`                               | `undefined`              |
| `label`                         | `label`                            | Label text displayed with the input field.                                                                                  | `string`                               | `''`                     |
| `max`                           | `max`                              | The maximum value (for number/date inputs).                                                                                 | `number \| string`                     | `undefined`              |
| `maxLength`                     | `max-length`                       | The maxlength attribute defining max number of characters.                                                                  | `number`                               | `undefined`              |
| `min`                           | `min`                              | The minimum value (for number/date inputs).                                                                                 | `number \| string`                     | `undefined`              |
| `minLength`                     | `min-length`                       | The minlength attribute defining min number of characters.                                                                  | `number`                               | `undefined`              |
| `name`                          | `name`                             | The name attribute of the input.                                                                                            | `string`                               | `''`                     |
| `pattern`                       | `pattern`                          | The pattern attribute for regex validation.                                                                                 | `string`                               | `undefined`              |
| `placeholder`                   | `placeholder`                      | The placeholder text displayed when the input is empty.                                                                     | `string`                               | `''`                     |
| `readonly`                      | `readonly`                         | Whether the input is readonly.                                                                                              | `boolean`                              | `false`                  |
| `required`                      | `required`                         | Whether the input is required.                                                                                              | `boolean`                              | `false`                  |
| `type`                          | `type`                             | The type of input (e.g., text, password, email, number, etc.).                                                              | `DesignioInputType`                    | `DesignioInputType.Text` |
| `value`                         | `value`                            | The value of the input.                                                                                                     | `string`                               | `''`                     |

## Events

| Event                  | Description                                               | Type                |
| ---------------------- | --------------------------------------------------------- | ------------------- |
| `bavvButtonClick`      | Emitted when the user clicks on BAVV button.              | `CustomEvent<void>` |
| `bavvInputBlur`        | Emitted when the BAVV input loses focus on.               | `CustomEvent<void>` |
| `bavvInputChange`      | Emitted when the BAVV input changes.                      | `CustomEvent<void>` |
| `bavvInputFocus`       | Emitted when the BAVV input gets focus on.                | `CustomEvent<void>` |
| `bavvValueChange`      | Emitted when the BAVV input value changes.                | `CustomEvent<void>` |
| `bbogAtInputChanged`   | Emitted when the user input of BBOG changes.              | `CustomEvent<void>` |
| `bbogAtInputEnterKey`  | Emitted when the user enters the enter key on BBOG input. | `CustomEvent<void>` |
| `bbogAtInputOnBlur`    | Emitted when it looses focus on BBOG input.               | `CustomEvent<void>` |
| `bbogAtInputOnFocus`   | Emitted when it gains focus on BBOG input.                | `CustomEvent<void>` |
| `bbogAtInputOnKeyDown` | Emitted when the user enters any key down on BBOG input.  | `CustomEvent<void>` |
| `bbogAtInputUpdated`   | Emitted when the user input of BBOG is updated.           | `CustomEvent<void>` |
| `bbogOnInputIconClick` | Emitted when the user clicks on the input icon of BBOG.   | `CustomEvent<void>` |

---

_Built with [StencilJS](https://stenciljs.com/)_
