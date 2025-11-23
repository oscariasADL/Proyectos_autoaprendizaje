// Configuración recomendada de Prettier para ADL.
// Uso: en prettier.config.cjs => module.exports = require('adl-prettier-linter/prettier');

module.exports = {
	printWidth: 100,
	tabWidth: 2,
	useTabs: false,
	semi: true,
	singleQuote: true,
	quoteProps: 'as-needed',
	jsxSingleQuote: false,
	trailingComma: 'all',
	bracketSpacing: true,
	bracketSameLine: false,
	arrowParens: 'always',
	proseWrap: 'preserve',
	endOfLine: 'lf',
	overrides: [
		{
			files: '*.md',
			options: {
				printWidth: 80
			}
		},
		{
			files: ['*.yml', '*.yaml'],
			options: {
				tabWidth: 2
			}
		}
	]
};
