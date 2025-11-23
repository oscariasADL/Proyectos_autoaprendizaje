// Configuración ESLint para proyectos React.
// Uso: extends: ["adl-prettier-linter/eslint/base", "adl-prettier-linter/eslint/react"]

module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	plugins: ["react", "react-hooks", "jsx-a11y"],
	extends: [
		"plugin:react/recommended",
		"plugin:react-hooks/recommended",
		"plugin:jsx-a11y/recommended",
		"prettier"
	],
	settings: {
		react: {
			version: "detect"
		}
	},
	rules: {
		// React
		"react/prop-types": "off", // Normalmente se usa TS o JSDoc
		"react/react-in-jsx-scope": "off", // Desde React 17 no es necesario importar React
		"react/jsx-uses-react": "off",
		"react/jsx-uses-vars": "error",
		"react/jsx-no-target-blank": ["error", { enforceDynamicLinks: "always" }],
		// Hooks
		"react-hooks/rules-of-hooks": "error",
		"react-hooks/exhaustive-deps": ["warn", { additionalHooks: "^(useMemoOne|useDeepCompareEffect)$" }],
		// Accesibilidad
		"jsx-a11y/alt-text": "warn",
		"jsx-a11y/anchor-is-valid": ["warn", { components: ["Link"], specialLink: ["to"], aspects: ["noHref", "invalidHref", "preferButton"] }],
		// Estilo / buenas prácticas
		"react/jsx-curly-spacing": ["warn", { when: "never", children: { when: "always" } }],
		"react/jsx-sort-props": ["off"],
		"react/self-closing-comp": ["error"],
		"react/jsx-no-useless-fragment": ["error", { allowExpressions: true }]
	}
};
