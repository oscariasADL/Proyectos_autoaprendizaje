// karma-timing-reporter/index.js
const fs = require('fs');
const path = require('path');

function TimingReporter(baseReporterDecorator, config) {
  baseReporterDecorator(this);

  const reporterConfig = config.timingReporter || {};
  const outputFile = reporterConfig.outputFile || 'test-timing-results.json';
  const slowTestThreshold = reporterConfig.slowTestThreshold || 1000; // ms
  const topSlowestTests = reporterConfig.topSlowestTests || 20;
  const createReport = reporterConfig.createReport || false;

  let allTests = [];
  let currentSuite = '';

  this.onSpecComplete = function (browser, result) {
    const duration = result.time;

    if (result.suite && result.suite.length > 0) {
      currentSuite = result.suite.join(' > ');
    }

    allTests.push({
      name: result.description,
      suite: currentSuite,
      duration: duration,
      status: result.success ? 'PASSED' : 'FAILED',
      fullName: `${currentSuite} > ${result.description}`
    });
  };

  this.onRunComplete = function () {
    if (allTests.length === 0) {
      console.log('No se registraron pruebas o no se ejecutó ninguna prueba.');
      return;
    }

    allTests.sort((a, b) => b.duration - a.duration);

    console.log('\n');
    console.log('=== PRUEBAS MÁS LENTAS ===');
    console.log('--------------------------');

    for (let i = 0; i < Math.min(topSlowestTests, allTests.length); i++) {
      const test = allTests[i];
      const slowIndicator = test.duration > slowTestThreshold ? '⚠️ ' : '';
      console.log(
        `${i + 1}. ${slowIndicator}${test.fullName}: ${test.duration}ms (${
          test.status
        })`
      );
    }

    const totalTime = allTests.reduce((sum, test) => sum + test.duration, 0);
    const averageTime = Math.round(totalTime / allTests.length);
    const slowestTest = allTests[0];
    const outputPath = path.resolve(outputFile);

    if (createReport) {
      let accTime = 0;
      const top20slowTests = allTests.slice(0, topSlowestTests);
      for (let index = 0; index < top20slowTests.length; index++) {
        accTime += top20slowTests[index].duration;
      }
      fs.writeFileSync(
        outputPath,
        JSON.stringify(
          {
            timestamp: new Date().toISOString(),
            totalTests: allTests.length,
            totalTime: totalTime,
            averageTime: averageTime,
            slowestTest: {
              name: slowestTest.fullName,
              duration: slowestTest.duration,
              status: slowestTest.status
            },
            statistics: {
              slowestTestsTimeConsumptionRelation: `${
                (accTime / totalTime).toFixed(4) * 100
              }%`
            },
            slowestTests: allTests.slice(0, topSlowestTests),
            allTests: allTests
          },
          null,
          2
        )
      );
      console.log('\nInforme completo guardado en:', outputPath);
    }

    console.log(`Total de pruebas: ${allTests.length}`);
    console.log(
      `Prueba más lenta: ${slowestTest.fullName} (${slowestTest.duration}ms)`
    );
    console.log(`Tiempo promedio: ${averageTime}ms`);
    console.log(
      `Tiempo total: ${totalTime}ms (${(totalTime / 1000).toFixed(2)} segundos)`
    );

    allTests = [];
  };
}

TimingReporter.$inject = ['baseReporterDecorator', 'config'];

module.exports = {
  'reporter:timing': ['type', TimingReporter]
};
