# adl-prettier-linter v2.0

Librería moderna de configuración centralizada para proyectos JavaScript/TypeScript en ADL. Completamente reescrita en **TypeScript** con API fluida, presets inteligentes y soporte para **ESLint**, **Prettier** y **Stylelint**.

## 🚀 Características v2.0

- **100% TypeScript** con tipado completo
- **API Fluida** con builders y presets
- **Compatibilidad ESM/CJS** dual
- **Configuración Inteligente** por framework
- **Validación Automática** de configuraciones
- **Soporte Moderno** para las últimas versiones

## Objetivos

| Área      | Beneficio                                                   |
| --------- | ----------------------------------------------------------- |
| ESLint    | Base sólida + presets por stack (React, TS, Node, Angular). |
| Prettier  | Estilo consistente de código y documentación.               |
| Stylelint | Normalización de estilos CSS/SCSS con reglas modernas.      |
| DX        | Instalación simple, mínima configuración manual.            |

## Filosofía

1. Preferir reglas que previenen bugs antes que micro estilo opinable.
2. Delegar formato a Prettier (reglas que chocan se desactivan vía `prettier`).
3. Mantener compatibilidad con últimas versiones (Stylelint 16, ESLint 8, Prettier 3).
4. Marcar dependencias específicas de cada stack como opcionales (peer opcionales) para no inflar instalaciones.

## Instalación mínima

```bash
npm install --save-dev adl-prettier-linter eslint prettier stylelint
```

## Añadir según tu stack

| Stack      | Paquetes adicionales recomendados                                                                    |
| ---------- | ---------------------------------------------------------------------------------------------------- |
| React      | eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y                                 |
| TypeScript | typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin                                |
| Angular    | @angular-eslint/eslint-plugin @angular-eslint/eslint-plugin-template @angular-eslint/template-parser |
| Node       | eslint-plugin-node                                                                                   |
| SCSS       | stylelint-config-standard-scss stylelint-scss                                                        |

Instala solo los que correspondan a tu proyecto. Ejemplo React + TS + SCSS:

```bash
npm install --save-dev \
  adl-prettier-linter eslint prettier stylelint \
  typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin \
  eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y \
  stylelint-config-standard-scss stylelint-scss
```

## 🎯 Uso Rápido con Presets

### React + TypeScript

```js
// eslint.config.js
import { createReactPreset } from 'adl-prettier-linter/presets';

const { eslint, prettier, stylelint } = createReactPreset({
  typescript: true,
  scss: true,
  strict: false
});

export default eslint;
```

```js
// prettier.config.js
import { createReactPreset } from 'adl-prettier-linter/presets';
const { prettier } = createReactPreset();
export default prettier;
```

### Angular + TypeScript

```js
// eslint.config.js
import { createAngularPreset } from 'adl-prettier-linter/presets';

const { eslint } = createAngularPreset({
  scss: true,
  strict: true
});

export default eslint;
```

### Node.js + TypeScript

```js
// eslint.config.js
import { createNodePreset } from 'adl-prettier-linter/presets';

const { eslint, prettier } = createNodePreset({
  typescript: true,
  strict: false
});

export default eslint;
```

## 🔧 Uso Avanzado con Builders

### Configuración Personalizada ESLint

```js
import { ESLintConfigBuilder } from 'adl-prettier-linter/utils';

const config = new ESLintConfigBuilder()
  .withFramework('react')
  .withTypeScript(true)
  .withCustomRules({
    'no-console': 'error',
    'react/jsx-no-leaked-render': 'error'
  })
  .withEnvironment({ jest: true })
  .build();

export default config;
```

### Configuración Personalizada Prettier

```js
import { PrettierConfigBuilder } from 'adl-prettier-linter/utils';

const config = new PrettierConfigBuilder()
  .withPrintWidth(120)
  .withSingleQuote(false)
  .withTrailingComma('es5')
  .withOverrides([
    {
      files: '*.md',
      options: { printWidth: 80 }
    }
  ])
  .build();

export default config;
```

## 🗂️ Uso Granular (Compatibilidad v1)

### ESLint

```js
// eslint.config.js
import baseConfig from 'adl-prettier-linter/configs/eslint/base';
import reactConfig from 'adl-prettier-linter/configs/eslint/react';
import typeScriptConfig from 'adl-prettier-linter/configs/eslint/typescript';

export default [baseConfig, reactConfig, typeScriptConfig];
```

### Prettier

```js
// prettier.config.js
import prettierConfig from 'adl-prettier-linter/configs/prettier';
export default prettierConfig;
```

Configuración incluida (resumen):

- printWidth: 100
- singleQuote: true
- trailingComma: all
- arrowParens: always
- endOfLine: lf
- overrides para Markdown (printWidth 80) y YAML.

Puedes sobreescribir cualquier opción en tu proyecto si lo necesitas:

```js
const base = require("adl-prettier-linter/prettier");
module.exports = { ...base, printWidth: 120 };
```

### Stylelint (estilos)

En tu `stylelint.config.cjs`:

```js
module.exports = {
  extends: [
    "adl-prettier-linter/stylelint/base",
    // Opcionales:
    // 'adl-prettier-linter/stylelint/css',
    // 'adl-prettier-linter/stylelint/scss'
  ],
};
```

Resumen de reglas base:

- Extiende `stylelint-config-standard`.
- Indentación 2 espacios, hex corto, quotes simples.
- Ignora algunos `@rules` de Tailwind para evitar falsos positivos.
- Patrón de clases en kebab-case en minúsculas.

`css` agrega reglas para zero sin unidad y valores shorthand limpios.
`scss` extiende `stylelint-config-standard-scss`, valida variables en kebab-case y controla imports parciales.

Ejemplo SCSS:

```js
module.exports = {
  extends: [
    "adl-prettier-linter/stylelint/base",
    "adl-prettier-linter/stylelint/scss",
  ],
};
```

### Dependencias opcionales

Las dependencias se declaran como peer opcionales para evitar instalaciones innecesarias. Instala únicamente las que uses; si no instalas React no se aplicarán reglas React.

## Scripts sugeridos

Agrega a tu `package.json`:

```json
{
  "scripts": {
    "lint": "npm run lint:eslint && npm run lint:style",
    "lint:eslint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "lint:style": "stylelint '**/*.{css,scss}'",
    "format": "prettier --write ."
  }
}
```

## Tests de configuración

Este repositorio incluye smoke tests (`npm test`) que:

- Cargan cada preset ESLint y ejecutan lint sobre ejemplos mínimos.
- Verifican formateo Prettier.
- Lint de CSS/SCSS con Stylelint.

## Versionado

Se siguen versiones semánticas. Cada cambio en reglas existentes implica al menos un minor. Cambios disruptivos (remover reglas, modificar severidad de forma importante) implican major.

## Publicación

Para publicar una nueva versión:

```bash
npm run release:patch   # o minor / major
```

## Roadmap

- Definir reglas concretas en cada archivo de configuración.
- Añadir tests de smoke para asegurar carga de configuraciones.
- Automatizar release con GitHub Actions.
- Añadir configuración estricta opcional (modo "strict").
- Documentar migraciones entre versiones en CHANGELOG.

## Preguntas frecuentes

**¿Por qué algunas reglas de estilo (indentation, string-quotes) no aparecen?** Stylelint 16 movió reglas estilísticas a paquetes externos; se mantienen solo reglas funcionales. Puedes añadir el plugin @stylistic si necesitas control detallado.

**¿Necesito todas las dependencias opcionales?** No, instala solo las que correspondan al stack usado (React, Angular, TS, SCSS).

**¿Cómo sobreescribo una regla?** En tu `.eslintrc` añade `rules: { "no-console": "off" }` o en Stylelint agrega `rules: { "color-hex-length": "long" }` según tu preferencia.

## Licencia

MIT
