import { defineConfig } from 'cypress'

export default defineConfig({
  
  e2e: {
    baseUrl: 'http://localhost:4200',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    
    // Configuración específica para headless
    video: false, // Desactiva la grabación de video
    screenshotOnRunFailure: false, // Toma screenshots solo en fallos
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    
    // Configuración del navegador headless
    chromeWebSecurity: false,
    
    // Reporter para consola
    reporter: 'spec',
    
    // Configuración para CI
    retries: {
      runMode: 2,
      openMode: 0
    }
  },
  
  
  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts'
  }
  
})