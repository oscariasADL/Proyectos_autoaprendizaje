#!/usr/bin/env node
/*
  Script de smoke tests para configuraciones de ESLint, Prettier y Stylelint.
  - Verifica que cada configuración puede ser requerida sin error.
  - Ejecuta ESLint sobre archivos sample con cada config.
  - Verifica formateo de Prettier.
  - Ejecuta Stylelint sobre CSS y SCSS.
*/

const path = require("path");
const fs = require("fs");

const samplesDir = path.join(__dirname, "samples");

function section(title) {
  console.log(`\n==== ${title} ====\n`);
}

function requireSafe(label, fn) {
  try {
    fn();
    console.log(`✅ ${label}`);
  } catch (e) {
    console.error(`❌ ${label}:`, e);
    process.exitCode = 1;
  }
}

section("Require configs");
requireSafe("ESLint base", () => require("../eslint/base"));
requireSafe("ESLint react", () => require("../eslint/react"));
requireSafe("ESLint typescript", () => require("../eslint/typescript"));
requireSafe("ESLint node", () => require("../eslint/node"));
requireSafe("ESLint angular", () => require("../eslint/angular"));
requireSafe("Prettier", () => require("../prettier"));
requireSafe("Stylelint base", () => require("../stylelint/base"));
requireSafe("Stylelint css", () => require("../stylelint/css"));
requireSafe("Stylelint scss", () => require("../stylelint/scss"));

section("ESLint smoke");
(async () => {
  let ESLint;
  try {
    ESLint = require("eslint").ESLint;
  } catch (e) {
    console.warn("ESLint no instalado para tests");
    return;
  }
  const basePath = path.join(__dirname, "..", "eslint");
  const map = (name) => path.join(basePath, name + ".js");
  const configs = [
    { name: "base", extends: [map("base")], patterns: ["example.js"] },
    {
      name: "react",
      extends: [map("base"), map("react")],
      patterns: ["component.jsx"],
    },
    {
      name: "typescript",
      extends: [map("base"), map("typescript")],
      patterns: ["example.ts"],
    },
    {
      name: "node",
      extends: [map("base"), map("node")],
      patterns: ["example.js"],
    },
  ];
  for (const cfg of configs) {
    try {
      const eslint = new ESLint({
        useEslintrc: false,
        overrideConfig: {
          extends: cfg.extends,
          parserOptions: { project: path.join(process.cwd(), "tsconfig.json") },
        },
      });
      const targets = cfg.patterns.map((p) => path.join(samplesDir, p));
      const results = await eslint.lintFiles(targets);
      const errorCount = results.reduce((acc, r) => acc + r.errorCount, 0);
      console.log(`Config ${cfg.name}: errores=${errorCount}`);
    } catch (e) {
      console.error(`❌ ESLint config ${cfg.name} falló:`, e.message);
      process.exitCode = 1;
    }
  }
})();

section("Prettier formato");
try {
  const prettier = require("prettier");
  const config = require("../prettier");
  const sampleFile = path.join(samplesDir, "example.js");
  const original = fs.readFileSync(sampleFile, "utf8");
  const formatted = prettier.format(original, {
    ...config,
    filepath: sampleFile,
  });
  if (formatted === original) {
    console.log("✅ Prettier: archivo ya formateado.");
  } else {
    console.log("✅ Prettier: cambios de formato aplicados.");
  }
} catch (e) {
  console.warn("❌ Prettier test falló:", e.message);
  process.exitCode = 1;
}

section("Stylelint smoke");
(async () => {
  let stylelint;
  try {
    stylelint = require("stylelint");
  } catch (e) {
    console.warn("Stylelint no instalado para tests");
    return;
  }
  const slBase = path.join(__dirname, "..", "stylelint");
  const sl = (name) => path.join(slBase, name + ".js");
  const configs = [
    { name: "base", extends: [sl("base")], files: ["styles.css"] },
    { name: "scss", extends: [sl("base"), sl("scss")], files: ["styles.scss"] },
  ];
  for (const cfg of configs) {
    const files = cfg.files.map((f) => path.join(samplesDir, f));
    const result = await stylelint.lint({
      files,
      config: { extends: cfg.extends },
    });
    const warnings = result.results.flatMap((r) => r.warnings);
    console.log(`Config ${cfg.name}: warnings=${warnings.length}`);
  }
})();

process.on("beforeExit", (code) => {
  console.log(`\nFin tests con código ${code}`);
});
