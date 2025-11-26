# 🎯 Guía de Migración v1 → v2

## Cambios Principales

### ✅ Antes (v1)
```js
// .eslintrc.js
module.exports = {
  extends: [
    'adl-prettier-linter/eslint/base',
    'adl-prettier-linter/eslint/react',
    'adl-prettier-linter/eslint/typescript'
  ]
};

// prettier.config.js
module.exports = require('adl-prettier-linter/prettier');
```

### 🚀 Ahora (v2) - Recomendado
```js
// eslint.config.js
import { createReactPreset } from 'adl-prettier-linter/presets';

const { eslint } = createReactPreset({ 
  typescript: true, 
  scss: true 
});

export default eslint;

// prettier.config.js
import { createReactPreset } from 'adl-prettier-linter/presets';
const { prettier } = createReactPreset();
export default prettier;
```

### 🔧 API Builder (v2) - Avanzado
```js
// eslint.config.js
import { ESLintConfigBuilder } from 'adl-prettier-linter/utils';

const config = new ESLintConfigBuilder()
  .withFramework('react')
  .withTypeScript(true)
  .withCustomRules({ 'no-console': 'error' })
  .build();

export default config;
```

### 📦 Configuraciones Granulares (v2) - Compatibilidad
```js
// eslint.config.js - Sigue funcionando
import baseConfig from 'adl-prettier-linter/configs/eslint/base';
import reactConfig from 'adl-prettier-linter/configs/eslint/react';
import tsConfig from 'adl-prettier-linter/configs/eslint/typescript';

export default [baseConfig, reactConfig, tsConfig];
```

## 🏗️ Ejemplos Prácticos

### Proyecto React + TypeScript + SCSS
```js
import { createReactPreset } from 'adl-prettier-linter/presets';

export const { eslint, prettier, stylelint } = createReactPreset({
  typescript: true,
  scss: true,
  strict: false // o true para reglas más estrictas
});
```

### Proyecto Angular
```js
import { createAngularPreset } from 'adl-prettier-linter/presets';

export const { eslint, prettier, stylelint } = createAngularPreset({
  scss: true,
  strict: true
});
```

### Biblioteca/Librería
```js
import { createLibraryPreset } from 'adl-prettier-linter/presets';

export const { eslint, prettier } = createLibraryPreset({
  framework: 'react', // o 'angular', 'vue', null
  typescript: true,
  strict: true // Reglas más estrictas por defecto
});
```

## 🔄 Validación y Testing

```js
import { validateESLintConfig } from 'adl-prettier-linter/utils';

const config = { /* tu configuración */ };
const validation = validateESLintConfig(config);

if (!validation.valid) {
  console.error('Errores:', validation.errors);
}
if (validation.warnings.length > 0) {
  console.warn('Advertencias:', validation.warnings);
}
```

## 📋 Checklist de Migración

- [ ] Instalar v2: `npm install adl-prettier-linter@^2.0.0`
- [ ] Actualizar imports a rutas nuevas
- [ ] Cambiar a configuración ESM si es posible
- [ ] Usar presets para configuración más simple
- [ ] Aprovechar validación automática
- [ ] Actualizar scripts de build si usan tsup/vitest
- [ ] Verificar que todo funciona con `npm run build`
