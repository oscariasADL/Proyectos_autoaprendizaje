// Configuración ESLint para proyectos TypeScript.
// Uso: extends: ["adl-prettier-linter/eslint/base", "adl-prettier-linter/eslint/typescript"]

module.exports = {
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint"],
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:@typescript-eslint/recommended-requiring-type-checking",
		"prettier"
	],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		// El proyecto consumidor debe apuntar a su tsconfig.json real
		project: ["./tsconfig.json"],
		tsconfigRootDir: process.cwd()
	},
	rules: {
		// Ajustes comunes para reducir ruido
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/no-explicit-any": ["warn", { ignoreRestArgs: true }],
		"@typescript-eslint/consistent-type-imports": ["warn", { prefer: "type-imports" }],
		"@typescript-eslint/array-type": ["error", { default: "array-simple" }],
		"@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
		"@typescript-eslint/no-floating-promises": "error",
		"@typescript-eslint/restrict-template-expressions": ["warn", { allowNumber: true, allowBoolean: true, allowAny: false, allowNullish: true }],
		"@typescript-eslint/no-non-null-assertion": "warn",
		"@typescript-eslint/prefer-nullish-coalescing": ["warn", { ignoreConditionalTests: true, ignoreMixedLogicalExpressions: true }],
		"@typescript-eslint/prefer-optional-chain": "warn",
		// Estilo
		"@typescript-eslint/type-annotation-spacing": "warn"
	},
	overrides: [
		{
			files: ["*.d.ts"],
			rules: {
				"@typescript-eslint/no-unused-vars": "off"
			}
		},
		{
			files: ["*.test.ts", "*.spec.ts", "**/__tests__/**"],
			rules: {
				"@typescript-eslint/no-non-null-assertion": "off",
				"@typescript-eslint/no-explicit-any": "off"
			}
		}
	]
};
