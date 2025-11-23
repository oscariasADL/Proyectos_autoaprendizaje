// Índice de configuraciones ESLint disponibles.
// Permite importar programáticamente si se desea.

module.exports = {
	base: require('./base'),
	react: require('./react'),
	typescript: require('./typescript'),
	node: require('./node'),
	angular: require('./angular')
};

// Uso típico en .eslintrc.cjs:
// module.exports = { extends: ['adl-prettier-linter/eslint/base', 'adl-prettier-linter/eslint/react'] };
