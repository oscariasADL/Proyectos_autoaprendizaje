// Configuración Stylelint para proyectos SCSS.
// Requiere: stylelint-config-standard-scss y stylelint-scss.
// Uso: extends: ["adl-prettier-linter/stylelint/base", "adl-prettier-linter/stylelint/scss"]

module.exports = {
  extends: ["stylelint-config-standard-scss"],
  plugins: ["stylelint-scss"],
  rules: {
    // Reglas específicas SCSS
    "scss/dollar-variable-pattern": [
      "^[a-z0-9-]+$",
      {
        message: "Variables SCSS deben usar kebab-case en minúsculas",
      },
    ],
    "scss/no-global-function-names": true,
    // Desactivar reglas que generan ruido en ciertos casos
    "no-empty-source": null,
  },
};
