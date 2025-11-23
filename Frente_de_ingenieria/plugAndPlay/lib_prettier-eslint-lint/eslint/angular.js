// Configuración ESLint para proyectos Angular.
// Requiere instalar: @angular-eslint/eslint-plugin, @angular-eslint/eslint-plugin-template, @angular-eslint/template-parser
// Uso: extends: ["adl-prettier-linter/eslint/base", "adl-prettier-linter/eslint/typescript", "adl-prettier-linter/eslint/angular"]

module.exports = {
	overrides: [
		{
			files: ["*.ts"],
			extends: [
				"plugin:@angular-eslint/recommended",
				"plugin:@angular-eslint/template/process-inline-templates",
				"prettier"
			],
			rules: {
				// Ajustes Angular
				"@angular-eslint/component-class-suffix": ["error", { suffixes: ["Component"] }],
				"@angular-eslint/directive-class-suffix": ["error", { suffixes: ["Directive"] }],
				"@angular-eslint/no-empty-lifecycle-method": "warn",
				"@angular-eslint/prefer-on-push-component-change-detection": "warn",
				"@angular-eslint/use-lifecycle-interface": "off", // TS >= 16 no requiere implementar explícitamente
				// Estilo TS adicional
				"@typescript-eslint/no-explicit-any": "warn"
			}
		},
		{
			files: ["*.html"],
			parser: "@angular-eslint/template-parser",
			extends: ["plugin:@angular-eslint/template/recommended"],
			rules: {
				"@angular-eslint/template/click-events-have-key-events": "warn",
				"@angular-eslint/template/interactive-supports-focus": "warn",
				"@angular-eslint/template/alt-text": "warn"
			}
		}
	]
};
