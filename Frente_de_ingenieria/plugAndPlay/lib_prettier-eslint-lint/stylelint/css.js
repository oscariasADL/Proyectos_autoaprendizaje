// Configuración Stylelint para proyectos solo CSS.
// Uso: extends: ["adl-prettier-linter/stylelint/base", "adl-prettier-linter/stylelint/css"]

module.exports = {
	rules: {
		// Evitar unidades innecesarias en cero
		"length-zero-no-unit": true,
		// Control de duplicados en shorthand
		"shorthand-property-no-redundant-values": true,
		// Orden simple (se podría incorporar stylelint-order si se desea más avanzado)
		"declaration-block-single-line-max-declarations": 1,
		// Preferencia de notación hex minúscula
		"color-hex-case": "lower"
	}
};
