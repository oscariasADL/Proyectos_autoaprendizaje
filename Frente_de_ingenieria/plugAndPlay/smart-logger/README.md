# ADL Console SDK

Controla la visibilidad de las salidas de consola (`log`, `info`, `warn`, `error`) en aplicaciones frontend (React, Angular, Vanilla JS) según entorno y flags remotos (ConfigCat).

## Objetivo

En producción y staging muchas organizaciones desean silenciar la consola para evitar:

- Exponer información sensible
- Ruido durante auditorías o debugging de terceros
- Impacto visual en herramientas de monitoreo

Esta librería centraliza esa lógica y permite re-habilitar de forma segura la consola por entorno o por feature flag remoto.

## Características

- Singleton: una única instancia por aplicación
- Deshabilita dinámicamente `console.log/info/warn/error` si no está permitido
- Permite configuración por entorno (`staging`, `production`) mediante flags locales
- Integración opcional con ConfigCat para toggles remotos
- API minimalista: mismos métodos que `console`

## Instalación

```bash
npm install sdk-adl-console

```

## Uso básico

```ts
import { ADLConsole } from "sdk-adl-console";

// Ejemplo en staging permitiendo logs
const logger = new ADLConsole({
  environment: "staging",
  showInStage: true,
});

logger.log("Visible solo si permitido");
logger.warn("Warn controlado");
```

Si `showInStage` fuese `false`, los métodos no harían nada.

## Configuración (`Config`)

```ts
interface Config {
  environment: "development" | "staging" | "production";
  showInProduction?: boolean; // habilita logs locales en prod (si no hay flag remoto)
  showInStage?: boolean; // habilita logs locales en staging (si no hay flag remoto)
  configCat?: {
    configCatKey: string; // SDK Key de ConfigCat
    productionFlag: string; // Nombre del flag booleano para producción
    stageFlag?: string; // Nombre del flag booleano para staging
  };
}
```

### Prioridad de decisión

1. Si `environment === 'development'` => siempre permitido (la consola no se silencia en desarrollo)
2. Si se pasa configuración de ConfigCat y existe flag para el entorno (`production` o `staging`) => se evalúa async y su resultado define si se muestran logs
3. Si no hay flag remoto configurado para el entorno => se usan `showInProduction` o `showInStage`
4. Por defecto (no configurado) => consola silenciada en `staging` y `production`

> Nota: Durante el breve lapso antes de que se resuelva el flag remoto, la consola estará silenciada si dependes de ConfigCat (esto no afecta a `development`).

## Integración con ConfigCat

```ts
import { ADLConsole } from "sdk-adl-console";

const logger = new ADLConsole({
  environment: "production",
  configCat: {
    configCatKey: "YOUR-CONFIGCAT-SDK-KEY",
    productionFlag: "enable_prod_console",
    stageFlag: "enable_stage_console",
  },
  showInProduction: false, // fallback si no hay flag o no se definió productionFlag
});

// Debido a que la evaluación es async, espera un tick si necesitas garantizar el estado
setTimeout(() => {
  logger.log("Mensaje posiblemente habilitado por flag remoto");
}, 0);
```

## Ejemplo en React

.env.staging

```ts
REACT_APP_ENV = "staging";
```

```tsx
import React from "react";
import { ADLConsole } from "sdk-adl-console";

const logger = new ADLConsole({
  environment: process.env.REACT_APP_ENV,
  showInStage: true, // solo relevante si eliges 'staging'
});

export const App: React.FC = () => {
  logger.info("Render App");
  return <div>Hola</div>;
};
```

## Ejemplo en Angular

```ts
// enviroment.stg.ts

name = "staging";

// logger.service.ts
import { Injectable } from "@angular/core";
import { ADLConsole } from "sdk-adl-console";
import { enviroment } from "@enviroments/enviroment";

@Injectable({ providedIn: "root" })
export class LoggerService {
  private logger = new ADLConsole({
    environment: enviroment.name,
    showInProduction: false,
  });

  log(...args: any[]) {
    this.logger.log(...args);
  }
  warn(...args: any[]) {
    this.logger.warn(...args);
  }
  error(...args: any[]) {
    this.logger.error(...args);
  }
  info(...args: any[]) {
    this.logger.info(...args);
  }
}

// uso en componente
// constructor(private logger: LoggerService) {}
// this.logger.log('Hola Angular');
```

## Vanilla JS / Script Tag

Compila tu bundler (Vite/Webpack/Rollup) y usa:

```js
import { ADLConsole } from "sdk-adl-console";
const logger = new ADLConsole({ environment: "staging", showInStage: true });
logger.log("Hola");
```

## Singleton

La clase devuelve siempre la primera instancia creada:

```ts
const a = new ADLConsole({ environment: "development" });
const b = new ADLConsole({ environment: "production", showInProduction: true });
console.assert(a === b, "Siempre misma instancia");
```

Si necesitas cambiar configuración, deberás ajustar el diseño (actualmente no soporta reconfiguración dinámica una vez creada).

## Métodos disponibles

- `log(...args)`
- `info(...args)`
- `warn(...args)`
- `error(...args)`

Si no está permitido, no hacen nada (no lanzan error).

## Consideraciones de entorno

Esta librería espera estar en un entorno browser (usa `window.console`). Para SSR o Node:

- Asegúrate de definir `global.window = { console }` antes de instanciar en tests o entornos simulados.

## Testing

Puedes mockear ConfigCat si quieres forzar resultados:

```ts
jest.mock("configcat-js", () => ({
  getClient: () => ({
    getValueAsync: () => Promise.resolve(true),
    dispose: () => {},
  }),
  PollingMode: { LazyLoad: "LazyLoad" },
}));
```

## Limitaciones actuales

- No existe API pública para reactivar o cambiar configuración tras crear la instancia.
- Evaluación remota es asíncrona y no expone un `ready` promise (no sabrás exactamente cuándo se habilitó por flag remoto).
- No hay método para forzar silenciar `development` (por diseño actual siempre está habilitado).
- No soporta filtrado por niveles, solo on/off global.
