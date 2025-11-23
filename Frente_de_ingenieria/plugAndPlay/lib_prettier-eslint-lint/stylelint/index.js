// Índice de configuraciones Stylelint.
module.exports = {
	base: require('./base'),
	css: require('./css'),
	scss: require('./scss')
};

// Uso ejemplo en stylelint.config.cjs:
// module.exports = { extends: ['adl-prettier-linter/stylelint/base', 'adl-prettier-linter/stylelint/scss'] };
