# designio-radio-button

<!-- Auto Generated Below -->

## Properties

| Property           | Attribute           | Description                               | Type                                                                   | Default     |
| ------------------ | ------------------- | ----------------------------------------- | ---------------------------------------------------------------------- | ----------- |
| `allowUnselect`    | `allow-unselect`    | Allow unselecting the radio button.       | `boolean`                                                              | `false`     |
| `checked`          | `checked`           | Whether the radio button is checked.      | `boolean`                                                              | `false`     |
| `container`        | `container`         | Whether to wrap the radio in a container. | `boolean`                                                              | `false`     |
| `customAttributes` | `custom-attributes` | Custom attributes for the radio button.   | `RadioButtonAttributes \| string`                                      | `undefined` |
| `disabled`         | `disabled`          | Whether the radio button is disabled.     | `boolean`                                                              | `false`     |
| `invertLabel`      | `invert-label`      | Whether to invert the label position.     | `boolean`                                                              | `false`     |
| `label`            | `label`             | The label for the radio button.           | `string`                                                               | `undefined` |
| `name`             | `name`              | The group name for the radio button.      | `string`                                                               | `undefined` |
| `radioId`          | `radio-id`          | The unique id for the radio button.       | `string`                                                               | `undefined` |
| `showLabel`        | `show-label`        | Show the label next to the radio button.  | `boolean`                                                              | `true`      |
| `size`             | `size`              | The size of the radio button.             | `"default" \| "large" \| "medium" \| "small"`                          | `'default'` |
| `state`            | `state`             | The visual state of the radio button.     | `"checked" \| "default" \| "disabled" \| "error" \| "hover" \| "info"` | `'default'` |
| `type`             | `type`              | The type of radio button (design system). | `"bavv" \| "bbog" \| "bocc" \| "bpop"`                                 | `'bpop'`    |
| `value`            | `value`             | The value of the radio button.            | `string`                                                               | `undefined` |

## Events

| Event         | Description                            | Type                                   |
| ------------- | -------------------------------------- | -------------------------------------- |
| `radioChange` | Emitted when the radio button changes. | `CustomEvent<RadioButtonChangeDetail>` |

---

_Built with [StencilJS](https://stenciljs.com/)_
