# Changelog

## [2.0.0] - 2024-11-24

### 🚀 Major Changes - Complete TypeScript Rewrite

#### ✨ New Features
- **100% TypeScript**: Complete rewrite from JavaScript to TypeScript
- **Dual ESM/CJS Support**: Works with both module systems
- **Builder Pattern API**: Fluent API for building configurations
- **Smart Presets**: Pre-configured setups for React, Angular, Node.js, and Libraries
- **Automatic Validation**: Built-in validation for all configurations
- **Enhanced TypeScript Support**: Better type safety and IntelliSense

#### 🏗️ New Architecture
```
src/
├── types/           # TypeScript type definitions
├── configs/         # Configuration modules (ESLint, Prettier, Stylelint)
├── utils/           # Builders, validators, and utilities
├── presets/         # Ready-to-use presets by framework
└── index.ts         # Main entry point
```

#### 📦 New Exports
- `/presets` - Smart presets for quick setup
- `/utils` - Builders and utilities
- `/configs/eslint/*` - Individual ESLint configurations
- `/configs/prettier` - Prettier configuration
- `/configs/stylelint/*` - Stylelint configurations

#### 🎯 New API Examples
```typescript
// Preset API (Recommended)
import { createReactPreset } from 'adl-prettier-linter/presets';
const { eslint, prettier, stylelint } = createReactPreset();

// Builder API (Advanced)
import { ESLintConfigBuilder } from 'adl-prettier-linter/utils';
const config = new ESLintConfigBuilder()
  .withFramework('react')
  .withTypeScript(true)
  .build();

// Direct Import (Granular)
import baseConfig from 'adl-prettier-linter/configs/eslint/base';
```

### 🔧 Enhanced Configurations

#### ESLint Improvements
- **Better TypeScript Integration**: Improved parser and rule configurations
- **Enhanced React Support**: Updated for React 18+ features
- **Angular Template Support**: Complete Angular template linting
- **Node.js Optimizations**: Better Node-specific rules and environments

#### Prettier Enhancements
- **File-Specific Overrides**: Better handling for different file types
- **Modern Defaults**: Updated to Prettier 3.x standards
- **Framework Optimizations**: Tailored rules for different frameworks

#### Stylelint Upgrades
- **Stylelint 16+ Support**: Updated for latest Stylelint version
- **Enhanced SCSS Support**: Better SCSS variable and mixin handling
- **Modern CSS Features**: Support for CSS Grid, Flexbox, and Custom Properties

### ⚡ Performance Improvements
- **Tree Shaking**: Modular architecture allows better tree shaking
- **Smaller Bundle**: Only import what you need
- **Faster Builds**: Optimized for modern build tools

### 🛠️ Developer Experience
- **Full Type Safety**: Complete TypeScript types for all configurations
- **IntelliSense Support**: Auto-completion in IDEs
- **Built-in Validation**: Automatic config validation with helpful error messages
- **Better Documentation**: Enhanced README with examples

### 📋 Build System
- **Modern Tooling**: Built with `tsup` for optimal output
- **Dual Builds**: ESM and CommonJS outputs
- **Source Maps**: Full source map support
- **Vitest Testing**: Modern testing with Vitest

### 🔄 Breaking Changes
- **Minimum Node.js**: Now requires Node.js 16+
- **ESM First**: Primary focus on ESM, CJS as compatibility layer
- **New Import Paths**: Some imports have moved (see MIGRATION.md)
- **TypeScript Required**: Build now requires TypeScript in development

### 🛡️ Backward Compatibility
- **Legacy Imports**: Old import paths still work via compatibility layer
- **CommonJS Support**: Full CommonJS support maintained
- **Gradual Migration**: Can migrate incrementally

### 📚 Documentation
- **Migration Guide**: Complete v1 → v2 migration documentation
- **API Documentation**: Full TypeScript API documentation
- **Examples**: Comprehensive examples for all frameworks

---

## [1.0.0] - 2024-10-XX

### Initial Release
- Basic ESLint configurations for JavaScript/TypeScript
- Prettier configuration
- Stylelint configurations for CSS/SCSS
- Framework support for React, Angular, Node.js
- CommonJS-based architecture
