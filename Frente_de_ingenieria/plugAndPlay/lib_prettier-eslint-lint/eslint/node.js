// Configuración ESLint para proyectos Node.js.
// Uso: extends: ["adl-prettier-linter/eslint/base", "adl-prettier-linter/eslint/node"]

module.exports = {
	env: {
		node: true,
		es2021: true
	},
	plugins: ["node"],
	extends: [
		"eslint:recommended",
		"plugin:import/recommended",
		"prettier"
	],
	rules: {
		// Node específico
		"callback-return": "warn",
		"handle-callback-err": "warn",
		"no-buffer-constructor": "error",
		"no-process-exit": "warn",
		"no-sync": "off", // Se puede ajustar según preferencia
		// Estándar
		"no-console": "off", // En Node normalmente permitido
		"import/no-commonjs": "off", // Permitimos CommonJS en Node
		// Import orden
		"import/order": [
			"warn",
			{
				groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
				"newlines-between": "always",
				alphabetize: { order: "asc", caseInsensitive: true }
			}
		]
	}
};
