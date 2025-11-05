
# CURSO DE REDUX NGRX



*****

## Instalaciones necesarias para trabajar con RXJS

[text](https://gist.github.com/Klerith/edf1218926a60fe79d9d2f20f83349d0)



*****

# CONCEPTOS BASICOS DE RXJS

Redux es un patrón (y una librería en React) para gestionar el estado de una aplicación de forma centralizada y predecible.
Imagina que tienes muchos componentes en tu app Angular.
Todos ellos necesitan leer, modificar o compartir datos comunes (como el carrito de compras, usuario logueado, configuración, etc.).

Redux propone una forma ordenada de manejar eso usando:

Concepto              	Explicación breve
Store                 	El estado global de tu aplicación (un solo lugar donde vive todo).
Actions	                Mensajes que indican qué ocurrió (por ejemplo, "Agregar producto").
Reducers	              Funciones puras que modifican el estado según la acción recibida.
Selectors	              Funciones para leer partes específicas del estado.



## ¿Qué es NgRx?

@ngrx es la implementación de Redux para Angular, usando RxJS y principios de programación reactiva.

NgRx te da herramientas como:

- **StoreModule** → para configurar el estado global
- **Actions** → para definir los eventos
- **Reducers** → para cambiar el estado
- **Effects** → para manejar acciones asíncronas (como peticiones HTTP)
- **Selectors** → para leer el estado desde los componentes



## Ideas Principales

- Toda la data de la aplicación se encuentra en una estructura previamente DEFINIDA
- Toda la informacion se encontrara almacenada en un unico lugar llamado STORE
- El store JAMAS se modifica de forma directa
- Interacciones de usuario y/o codigo dispara acciones que describen que sucedio
- El valor Actual de la información de la aplicacion se llama estado - State
- El nuevo estado es creado, en base a la combinacion del viejo estado y una accion por una funcion llamada reducer



## ¿Por qué usar NgRx?

✅ Beneficios:

- Centraliza y controla el estado global
- Escalable y predecible
- Facilita el debugging (usando DevTools como Redux DevTools)
- Ideal para apps medianas y grandes con muchos flujos de datos



## Cuando usar NgRx?

- *Eventos en la interfaz de usuario*
- *Cuando es necesario notificar sobre cambios en un objeto*
- *Comunicacion por sockets*
- *Trabajar con flujos de informacion (streams)*



## Action → Reducer → State → Store

**Accion:** Es la unica fuente de informacion que se envia por interacciones de usuario o programa, una accion tiene unicamente dos propiedades obligatorias: type y payload

Type -> Describe que tipo de accion se esta realizando (COMPLETAR_TAREA) / Obligatorio
Payload -> Es la informacion adicional que se envia con la accion

**Reducer:** Es una funcion pura que recibe el estado actual y una accion, y retorna un nuevo estado basado en la accion recibida.

Recibe dos parametros:
oldState -> Estado actual
action -> Accion que se esta ejecutando

**State:** Es la representacion de la informacion actual de la aplicacion en un momento dado, el estado es inmutable, es decir que no se puede modificar directamente, para modificar el estado se debe crear un nuevo estado basado en el estado anterior y la accion recibida.

Es de solo lectura, hay funciones prohibidas que modifican el estado directamente. (push, pop, splice, etc)

**Store:** Es el contenedor unico que mantiene el estado de la aplicacion, el store es el unico lugar donde se puede acceder al estado actual y despachar acciones para modificar el estado.

Contiene el estado actual de la aplicacion y proporciona metodos para acceder al estado y despachar acciones.

Permite la lectura del estado via: getState()
Permite crear un nuevo estado via: dispatch(action)
Permite suscribirse a cambios en el estado via: subscribe()