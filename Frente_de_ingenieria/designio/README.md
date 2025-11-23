# @avaldigitallabs/adl-commons-design-system-frontend-designio

[![ADL](https://img.shields.io/badge/%20Designio-4a41ef?style=flat&label=ADL%20Digital%20Lab%20💜&labelColor=6225f0)](https://www.adldigitallabs.com/)
![Frontend](https://img.shields.io/badge/Frontend-blue)
[![Stencil](https://img.shields.io/badge/Stencil-4.7-4942FF?logo=stencil&style=flat&logoColor=white)](https://stenciljs.com/)
[![Node.js](https://img.shields.io/badge/Node.js-%20^18.0.0%20||%20>=20.0.0-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/en/)
[![Storybook](https://img.shields.io/badge/Storybook-8.2-FF4785?logo=storybook&style=flat&logoColor=white)](https://storybook.js.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)](https://www.typescriptlang.org/)

---

## 🎨 Descripción del Proyecto

Esta es una librería de componentes visuales desarrollada por el equipo de **ADL Digital Lab** para **Banco de Occidente**, bajo el nombre de **Designio**. Está construida con [StencilJS](https://stenciljs.com/), lo que permite su uso de forma agnóstica en cualquier framework moderno como Angular, React, Vue, entre otros.

---

## 🚀 Instalación Designio en Angular

### 1️⃣ Configura el archivo `.npmrc`

Asegúrate de tener las credenciales configuradas para acceder al registry privado:

```properties
@avaldigitallabs:registry=https://avaldigitallabs.jfrog.io/artifactory/api/npm/npm-local/
//avaldigitallabs.jfrog.io/artifactory/api/npm/npm-local/:_auth=${JFROG_TOKEN}
//avaldigitallabs.jfrog.io/artifactory/api/npm/npm-local/:email=${JFROG_USERNAME}
//avaldigitallabs.jfrog.io/artifactory/api/npm/npm-local/:always-auth=true
```

### 2️⃣ Instala la librería

```bash
npm install @avaldigitallabs/adl-commons-design-system-frontend-designio
```

### 3️⃣ Agrega estilos globales

#### Para Angular 16+

```json
"assets": [
  {
    "glob": "designio.css",
    "input": "./node_modules/@avaldigitallabs/adl-commons-design-system-frontend-designio/dist/designio/",
    "output": "./assets/"
  },
  {
    "glob": "**/*",
    "input": "node_modules/@avaldigitallabs/adl-commons-design-system-frontend-designio/dist/assets/",
    "output": "./assets/"
  }
],
"styles": [
  "src/styles.scss",
  {
    "input": "./node_modules/@avaldigitallabs/adl-commons-design-system-frontend-designio/dist/designio/designio.css",
    "inject": true
  }
]
```

#### Para Angular <16

```json
"assets": [
  "src/assets",
  "src/favicon.ico",
  {
    "glob": "**/*",
    "input": "node_modules/@avaldigitallabs/adl-commons-design-system-frontend-designio/dist/assets/",
    "output": "./assets/"
  }
],
"styles": [
  "src/styles.scss",
  {
    "input": "./node_modules/@avaldigitallabs/adl-commons-design-system-frontend-designio/dist/designio/designio.css",
    "inject": true
  }
]
```

### 4️⃣ Configura `main.ts`

```ts
import { defineCustomElements as defineCustomElementsDesignio } from '@avaldigitallabs/adl-commons-design-system-frontend-designio/dist/loader';

bootstrapApplication(AppComponent, appConfig).then(() => {
  defineCustomElementsDesignio();
});
```

### 5️⃣ Importa `StencilWrapperModule`

```ts
import { StencilWrapperModule } from '@avaldigitallabs/adl-commons-design-system-frontend-designio/dist/angular-wrapper';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StencilWrapperModule],
  ...
})
```

### 6️⃣ Soporte para Microfrontends (Module Federation)

#### `bootstrap.ts`

```ts
await defineCustomElementsDesignio(); // Cargar antes de bootstrap
bootstrap(AppModule, {
  production: environment.production,
  appType: 'microfrontend'
});
```

#### `webpack.config.js`

```js
output: {
  publicPath: 'auto'
}
```

### 7️⃣ Aplicaciones tradicionales con `AppModule`

```ts
@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    StencilWrapperModule
  ]
})
export class AppModule {}
```

---

## 📁 Scripts del Proyecto

Los siguientes scripts están definidos en el archivo `package.json` y gestionan tanto el build, storybook y procesos de CI:

| Comando | Descripción |
|--------|-------------|
| `npm start` | Ejecuta todos los paquetes en modo desarrollo (via `lerna run start`). |
| `npm run watch` | Ejecuta todos los paquetes en modo observación continua. |
| `npm run test` | Ejecuta las pruebas unitarias. *(Actualmente pendiente de implementación)* |
| `npm run lint` | Ejecuta linters para validación de código. |
| `npm run prettier` | Aplica formato de código usando Prettier. |
| `npm run clean` | Limpia los artefactos generados de todos los paquetes. |
| `npm run build` | Compila todos los paquetes de forma concurrente. |
| `npm run customScript` | Compila el Storybook y copia los archivos en la carpeta `storybook-static`. |
| `npm run storybook` | Ejecuta Storybook localmente. |
| `npm run execute` | Pipeline completo: build, storybook, distribución. |

---

## 🧪 Pruebas

```bash
npm run test
```

*(Aún en desarrollo, se recomienda cubrir con Jest en componentes StencilJS)*

---

## 🧰 Arquitectura General

Este proyecto es un monorepo gestionado con [Lerna](https://lerna.js.org/), compuesto por:

- Librería principal en **StencilJS**
- Wrappers para Angular y React
- Documentación visual mediante **Storybook**
- Soporte para **CI/CD** con Jenkins y SonarQube

---

## 📦 Publicación

Las versiones se publican en el registry privado de JFrog. Recuerda que debes contar con las variables `JFROG_TOKEN` y `JFROG_USERNAME` configuradas.

---

## 🔗 Recursos

- [StencilJS](https://stenciljs.com/docs/introduction)
- [Storybook](https://storybook.js.org/docs/html/get-started/introduction)
- [Angular](https://angular.io/guide/web-components)
- [React](https://react.dev/learn/web-components)
- [Vue](https://vuejs.org/guide/extras/web-components.html)

---

## ✅ CI/CD

- **Jenkins**: [Pipeline Jenkins](https://jenkins.adl-pre-ops.net/blue/organizations/jenkins/adl-commons-design-system-frontend-designio/activity/)
- **SonarQube**: [Dashboard SonarQube](https://sonar.avaldigitallabs.com/dashboard?id=adl-commons-design-system-frontend-designio)

---

© ADL Digital Lab - Banco de Occidente. Todos los derechos reservados.
