# designio-modal

<!-- Auto Generated Below -->

## Properties

| Property                | Attribute               | Description                          | Type                                   | Default      |
| ----------------------- | ----------------------- | ------------------------------------ | -------------------------------------- | ------------ |
| `alignTitle`            | `align-title`           | Title alignment.                     | `"center" \| "left" \| "right"`        | `'center'`   |
| `customClass`           | `custom-class`          | Custom CSS class for the modal.      | `string`                               | `undefined`  |
| `direction`             | `direction`             | Direction of the modal buttons.      | `"horizontal" \| "vertical"`           | `'vertical'` |
| `elementId`             | `element-id`            | Optional element id for the modal.   | `string`                               | `undefined`  |
| `hideClose`             | `hide-close`            | Hide close button in the modal.      | `boolean`                              | `false`      |
| `icon`                  | `icon`                  | Icon name for the modal.             | `string`                               | `undefined`  |
| `illustratedIcon`       | `illustrated-icon`      | Illustrated icon name for the modal. | `string`                               | `undefined`  |
| `modalId`               | `modal-id`              | Custom modal ID.                     | `string`                               | `undefined`  |
| `modalTitle`            | `modal-title`           | Title of the modal.                  | `string`                               | `undefined`  |
| `primaryButtonConfig`   | --                      | Primary button configuration.        | `BdoButtonStandard`                    | `undefined`  |
| `secondaryButtonConfig` | --                      | Secondary button configuration.      | `BdoButtonStandard`                    | `undefined`  |
| `showClose`             | `show-close`            | Show close button in the modal.      | `boolean`                              | `false`      |
| `showPrimaryButton`     | `show-primary-button`   | Show primary button in the modal.    | `boolean`                              | `false`      |
| `showSecondaryButton`   | `show-secondary-button` | Show secondary button in the modal.  | `boolean`                              | `false`      |
| `size`                  | `size`                  | Size of the modal.                   | `"lg" \| "md" \| "sm"`                 | `'md'`       |
| `subtitle`              | `subtitle`              | Subtitle of the modal.               | `string`                               | `undefined`  |
| `type`                  | `type`                  | Modal type to display.               | `"bavv" \| "bbog" \| "bocc" \| "bpop"` | `'bbog'`     |

## Events

| Event    | Description                             | Type                                              |
| -------- | --------------------------------------- | ------------------------------------------------- |
| `closed` | Event emitted when the modal is closed. | `CustomEvent<{ type: string; modalId: string; }>` |
| `opened` | Event emitted when the modal is opened. | `CustomEvent<{ type: string; modalId: string; }>` |

## Methods

### `closeModal() => Promise<void>`

Closes the modal programmatically.

#### Returns

Type: `Promise<void>`

### `openModal() => Promise<void>`

Opens the modal programmatically.

#### Returns

Type: `Promise<void>`

---

_Built with [StencilJS](https://stenciljs.com/)_
