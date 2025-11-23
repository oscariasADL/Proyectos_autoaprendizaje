# designio-badge

<!-- Auto Generated Below -->

## Properties

| Property     | Attribute     | Description                                                  | Type                                   | Default     |
| ------------ | ------------- | ------------------------------------------------------------ | -------------------------------------- | ----------- |
| `classNames` | `class-names` | Clases CSS adicionales (BOCC)                                | `string`                               | `undefined` |
| `idBadge`    | `id-badge`    | Identificador único para el badge/subcomponente              | `string`                               | `undefined` |
| `isSolid`    | `is-solid`    | Modo sólido (BBOG)                                           | `boolean`                              | `undefined` |
| `isSquare`   | `is-square`   | Forma cuadrada (BOCC). Para BAVV use shape.                  | `boolean`                              | `undefined` |
| `isVisible`  | `is-visible`  | Visibilidad del badge (BOCC). Si es false, no se muestra.    | `boolean`                              | `undefined` |
| `label`      | `label`       | Texto del badge (si no se usa el slot)                       | `string`                               | `undefined` |
| `prefixIcon` | `prefix-icon` | Ícono de prefijo (soportado en bpop y bocc)                  | `string`                               | `undefined` |
| `removeTag`  | `remove-tag`  | Muestra botón de cierre (BBOG)                               | `boolean`                              | `undefined` |
| `shape`      | `shape`       | Forma del borde (BAVV)                                       | `string`                               | `undefined` |
| `size`       | `size`        | Tamaño del badge (valores dependen del banco)                | `string`                               | `undefined` |
| `suffixIcon` | `suffix-icon` | Ícono de sufijo (soportado en bpop)                          | `string`                               | `undefined` |
| `type`       | `type`        | Tipo/entidad del badge que determina el adapter a renderizar | `"bavv" \| "bbog" \| "bocc" \| "bpop"` | `'bbog'`    |
| `variant`    | `variant`     | Variante visual (mapeada por banco)                          | `string`                               | `undefined` |

## Events

| Event          | Description                                | Type                                                                                        |
| -------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------- |
| `badgeClicked` | Evento emitido al interactuar con el badge | `CustomEvent<{ type: "bpop" \| "bavv" \| "bbog" \| "bocc"; id?: string; label?: string; }>` |

---

_Built with [StencilJS](https://stenciljs.com/)_
