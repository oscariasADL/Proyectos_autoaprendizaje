
# CURSO DE RXJS



*****

## Instalaciones necesarias para trabajar con RXJS

[text](https://gist.github.com/Klerith/edf1218926a60fe79d9d2f20f83349d0)



*****

# CONCEPTOS BASICOS DE RXJS

*(Reactive Extensions for JavaScript) es una librería para programación reactiva que te permite trabajar con observables, es decir, flujos de datos que cambian con el tiempo.*


## Diagramas de canicas

Los diagramas de canicas (también llamados marble diagrams) son una forma visual de representar cómo funcionan los observables y los operadores en programación reactiva, especialmente en RxJS.


## ¿Por qué usar RXJS?

Porque todos queremos tener informacion en tiempo real y manejar eventos de manera eficiente. Algunas razones para usar RXJS incluyen:

- **Manejo de eventos asíncronos**: RXJS facilita el trabajo con eventos que ocurren de manera asíncrona, como clics de botones, respuestas de API, etc.
- **Composición de operaciones**: Permite componer operaciones de manera declarativa, lo que hace que el código sea más fácil de entender y mantener.
- **Cancelación de operaciones**: Puedes cancelar operaciones en curso de manera sencilla, lo que es útil para evitar fugas de memoria y mejorar el rendimiento.

Por ejemplo, en una aplicación web, podrías usar RXJS para manejar eventos de usuario, como clics y entradas de teclado, y actualizar la interfaz de usuario en tiempo real sin bloquear el hilo principal. (por ejemplo, en una aplicación de chat en tiempo real, redes sociales, etc.).


## Cuando usar RXJS?

- *Eventos en la interfaz de usuario*
- *Cuando es necesario notificar sobre cambios en un objeto*
- *Comunicacion por sockets*
- *Trabajar con flujos de informacion (streams)*


## Piezas fundamentales de RXJS

- **Observables**: Son flujos de datos que pueden emitir múltiples valores a lo largo del tiempo. Puedes pensar en ellos como una colección de eventos futuros.

  - *Son la fuente de información en RXJS.*
  - *Pueden emitir multiples valores a lo largo del tiempo.*
  - *Pueden emitir errores o completarse.*
  - *Pueden ser infinito o finito.(completarse)*
  - *Pueden ser sincronos o asincronos.*

- **Subscribers**: Son las funciones que se ejecutan cuando un observable emite un valor. Puedes pensar en ellos como los "oyentes" que reaccionan a los eventos emitidos por el observable.

  - *Se suscriben a un observable es decir estan pendientes de lo que realiza el observable*
  - *Consumen/Observan la data del observable*
  - *Pueden recibir los errores y eventos del observable*
  - *Desconocen todo lo que se encuentra detras del observable*

- **Operators**: Son funciones que permiten transformar, filtrar y combinar observables. Los operadores son una parte fundamental de RXJS y te permiten crear flujos de datos complejos de manera sencilla.

- *Usados para transformar observables (map, group, scan ...)*
- *Filtrar valores (filter, distinct, take ...)*
- *Combinar múltiples observables (merge, concat, zip ...)*
- *Crear nuevos observables (of, from, interval ...)*


## Patrones de diseño en RXJS

- **Observers**: Son objetos que definen cómo reaccionar a los valores emitidos por un observable. Un observer puede tener métodos para manejar valores, errores y la finalización del flujo.

Es un patron de diseño de software que define una dependencia del tipo uno a muchos entre objetos, de manera que cuando un objeto cambia de estado, todos sus dependientes son notificados y actualizados automáticamente.

Por ejemplo un semaforo es un observable porque es quien emite la informacion y los carros son los observers que estan suscritos a ese semaforo, cuando el semaforo cambia de color los carros reaccionan a ese cambio y cancelan la suscripcion.

- **Subscriptions**: Representan la ejecución de un observable. Cuando te suscribes a un observable, obtienes una suscripción que puedes usar para cancelar la suscripción si es necesario.

- **Patron iterador**: Define una interfaz que declara los metodos necesarios para acceder secuencialmente a los elementos de una coleccion sin exponer su representacion subyacente.

[1,2,3,4,5,6,7,8,9]

Primero(), Siguiente(), hayMas(), elementoActual()
  1           2          true           1    


Manguera -> Observable -> Agua -> Observer
Punta de la manguera -> Operador que envia el agua como lo necesitemos


*****

## Instalación

Para usar RXJS en tu proyecto, puedes instalarlo a través de npm:

```bash
npm install rxjs
```


## Primeros pasos

Aquí tienes un ejemplo básico de cómo crear un observable y suscribirte a él:

```javascript
import { Observable } from 'rxjs';

const observable = new Observable(subscriber => {
  subscriber.next('Hola');
  subscriber.next('Mundo');
  subscriber.complete();
});

observable.subscribe({
  next(value) { console.log(value); },
  complete() { console.log('Completado'); }
});