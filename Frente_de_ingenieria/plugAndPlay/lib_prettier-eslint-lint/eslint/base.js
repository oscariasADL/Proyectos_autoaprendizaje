// Configuración base ESLint para proyectos JavaScript.
// Uso: extends: ["adl-prettier-linter/eslint/base"]

module.exports = {
	root: false, // El proyecto consumidor define su root=true si lo necesita
	env: {
		browser: true,
		es2021: true
	},
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module"
	},
	plugins: ["import"],
	extends: [
		"eslint:recommended",
		"plugin:import/recommended",
		"plugin:import/errors",
		"plugin:import/warnings",
		"prettier" // Siempre al final para desactivar reglas que chocan con Prettier
	],
	settings: {
		// Permite resolver imports sin extensiones y prioriza index y package.json exports
		"import/resolver": {
			node: {
				extensions: [".js", ".json", ".mjs"]
			}
		}
	},
	rules: {
		// Buenas prácticas generales
		"eqeqeq": ["error", "always", { null: "ignore" }],
		"no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
		"no-console": ["warn", { allow: ["warn", "error"] }],
		"no-debugger": "error",
		"curly": ["error", "all"],
		"dot-notation": "error",
		"prefer-const": ["error", { destructuring: "all" }],
		"no-var": "error",
		"object-shorthand": ["error", "always"],
		"arrow-body-style": ["error", "as-needed"],
		"no-duplicate-imports": "error",
		// Import plugin
		"import/no-unresolved": "error",
		"import/no-duplicates": "error",
		"import/order": [
			"warn",
			{
				groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
				"newlines-between": "always",
				alphabetize: { order: "asc", caseInsensitive: true }
			}
		],
		"import/newline-after-import": ["warn", { count: 1 }],
		"import/no-mutable-exports": "error"
	}
};
