import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  minify: false,
  target: 'es2022',
  outDir: 'dist',
  splitting: false,
  treeshake: true,
  external: [
    // Peer dependencies - no las bundleamos
    'eslint',
    'prettier', 
    'stylelint',
    '@typescript-eslint/parser',
    '@typescript-eslint/eslint-plugin',
    'eslint-plugin-react',
    'eslint-plugin-react-hooks',
    'eslint-plugin-jsx-a11y',
    'eslint-plugin-import',
    'eslint-plugin-node',
    '@angular-eslint/eslint-plugin',
    '@angular-eslint/eslint-plugin-template',
    '@angular-eslint/template-parser',
    'eslint-config-prettier',
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-scss',
    'stylelint-order'
  ],
  esbuildOptions(options) {
    options.conditions = ['module'];
  }
});
