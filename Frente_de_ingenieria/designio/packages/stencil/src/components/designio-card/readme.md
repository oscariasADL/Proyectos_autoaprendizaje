# designio-card

<!-- Auto Generated Below -->

## Properties

| Property              | Attribute               | Description                                                                                                                 | Type                                           | Default     |
| --------------------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- | ----------- |
| `bodyText`            | `body-text`             | Text body of card                                                                                                           | `string`                                       | `undefined` |
| `borderType`          | `border-type`           | type of border for card (BOCC only)                                                                                         | `"darger" \| "default" \| "info" \| "success"` | `'default'` |
| `boxHeight`           | `box-height`            | height of card (Only for BBOG)                                                                                              | `string`                                       | `undefined` |
| `boxWidth`            | `box-width`             | width of card (Only for BBOG)                                                                                               | `string`                                       | `undefined` |
| `buttonText`          | `button-text`           | Text used for button (Only for BBOG)                                                                                        | `string`                                       | `''`        |
| `buttonTextSecondary` | `button-text-secondary` | Text used for secondary button (Only for BBOG card notification)                                                            | `string`                                       | `undefined` |
| `buttonType`          | `button-type`           | define if it's button or link (Only for BBOG)                                                                               | `"link" \| "secondary"`                        | `'link'`    |
| `cardHasBorder`       | `card-has-border`       | Border contain card, if false it does not show (BAVV only)                                                                  | `boolean`                                      | `false`     |
| `cardPadding`         | `card-padding`          | Padding of component, it can have 3 values: 12 \| 24 \| 36 (BAVV only)                                                      | `12 \| 24 \| 36`                               | `12`        |
| `cardType`            | `card-type`             | Type of card for BBOG                                                                                                       | `"access" \| "notification"`                   | `'access'`  |
| `colorTextAvatar`     | `color-text-avatar`     | define color for text in avatar (Only for BBOG)                                                                             | `string`                                       | `undefined` |
| `displayFooter`       | `display-footer`        | enable footer of card (BOCC only)                                                                                           | `boolean`                                      | `false`     |
| `displayHeader`       | `display-header`        | enable header of card (BOCC only)                                                                                           | `boolean`                                      | `false`     |
| `enable`              | `enable`                | enable or disable component (Only for BBOG access) and used for badge in avatar (Only for BBOG notification)                | `boolean`                                      | `undefined` |
| `footerText`          | `footer-text`           | Text used for footer (only BOCC)                                                                                            | `string`                                       | `undefined` |
| `hasButtons`          | `has-buttons`           | define if it's button or link for access card in true for button, in notification define if has two buttons (Only for BBOG) | `boolean`                                      | `false`     |
| `headerText`          | `header-text`           | Text used for header (only BOCC)                                                                                            | `string`                                       | `undefined` |
| `idCard`              | `id-card`               | Id of card                                                                                                                  | `string`                                       | `undefined` |
| `idFooter`            | `id-footer`             | id of footer (BOCC only)                                                                                                    | `string`                                       | `undefined` |
| `idHeader`            | `id-header`             | id of header (BOCC only)                                                                                                    | `string`                                       | `undefined` |
| `isTagSolid`          | `is-tag-solid`          | define tag solid or with border (Only for BBOG)                                                                             | `boolean`                                      | `false`     |
| `secondaryText`       | `secondary-text`        | Text secondary of card (only BBOG)                                                                                          | `string`                                       | `undefined` |
| `tagLabel`            | `tag-label`             | Text used for tag (Only for BBOG)                                                                                           | `string`                                       | `undefined` |
| `textAvatar`          | `text-avatar`           | text for avatar (Only for BBOG)                                                                                             | `string`                                       | `undefined` |
| `titleCard`           | `title-card`            | define title for card (Only for BBOG)                                                                                       | `string`                                       | `''`        |
| `titleHasOneLine`     | `title-has-one-line`    | define title in one line or two (Only for BBOG)                                                                             | `boolean`                                      | `undefined` |
| `type`                | `type`                  | Type or entity form buttom                                                                                                  | `"bavv" \| "bbog" \| "bocc" \| "bpop"`         | `'bocc'`    |
| `typeAvatar`          | `type-avatar`           | define avatar type (Only for BBOG)                                                                                          | `"icon" \| "img" \| "text"`                    | `'icon'`    |
| `typeIcon`            | `type-icon`             | define type icon (Only for BBOG)                                                                                            | `string`                                       | `undefined` |
| `typeLogo`            | `type-logo`             | Type of logo for access card (Only for BBOG)                                                                                | `string`                                       | `undefined` |
| `typePicto`           | `type-picto`            | define type for pictogram (Only for BBOG)                                                                                   | `string`                                       | `undefined` |
| `typeTag`             | `type-tag`              | define type tag (Only for BBOG)                                                                                             | `string`                                       | `undefined` |
| `unread`              | `unread`                | define state of card (Only for BBOG)                                                                                        | `boolean`                                      | `false`     |
| `urlImgAvatar`        | `url-img-avatar`        | link for image of avatar (Only for BBOG)                                                                                    | `string`                                       | `undefined` |
| `userOptions`         | `user-options`          | options for card in bbog (Only for BBOG)                                                                                    | `string`                                       | `undefined` |

## Events

| Event               | Description                                            | Type                |
| ------------------- | ------------------------------------------------------ | ------------------- |
| `cardClicked`       | Event emitted when the card is clicked (Only for BBOG) | `CustomEvent<void>` |
| `linkClicked`       | Event emitted for button or link (Only for BBOG)       | `CustomEvent<void>` |
| `linkClickedSecond` | Event emitted for secondary button (Only for BBOG)     | `CustomEvent<void>` |
| `optionMenuClicked` | Event emitted for options menu (Only for BBOG)         | `CustomEvent<void>` |

---

_Built with [StencilJS](https://stenciljs.com/)_
