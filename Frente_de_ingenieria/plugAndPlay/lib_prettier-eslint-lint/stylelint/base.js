// Configuración base Stylelint.
// Uso: extends: ["adl-prettier-linter/stylelint/base"]

module.exports = {
  extends: ["stylelint-config-standard"],
  plugins: [],
  rules: {
    // Reglas estilísticas removidas en Stylelint 16 (ahora en @stylistic) se omiten para compatibilidad.
    "color-hex-length": "short",
    "color-no-invalid-hex": true,
    "block-no-empty": true,
    "declaration-block-no-duplicate-properties": true,
    "selector-max-id": 0,
    "selector-max-universal": 1,
    "selector-class-pattern": [
      "^[a-z0-9\-]+$",
      {
        message: "Las clases deben usar kebab-case en minúsculas",
      },
    ],
    "no-descending-specificity": null,
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "apply",
          "layer",
          "variants",
          "responsive",
          "screen",
        ],
      },
    ],
  },
};
