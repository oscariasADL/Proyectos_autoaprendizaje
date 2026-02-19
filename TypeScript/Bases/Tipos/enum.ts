(() =>{

    // Los enums nos permiten definir un conjunto de valores con nombre y asociarlos a valores numéricos o de cadena.
    enum Color {
        Rojo = 1,
        Verde = 2,
        Azul = 4
    }

    // Podemos usar los enums para mejorar la legibilidad del código.
    let colorFavorito: Color = Color.Verde;
    console.log(`Mi color favorito es el número ${colorFavorito}`); // Salida: Mi color favorito es el número 2

    // Los enums también pueden ser de tipo cadena.
    enum Direccion {
        Norte = "NORTE",
        Sur = "SUR",
        Este = "ESTE",
        Oeste = "OESTE"
    }
    let direccionActual: Direccion = Direccion.Este;
    console.log(`La dirección actual es ${direccionActual}`); // Salida: La dirección actual es ESTE

    // Los enums pueden ser útiles para representar estados, opciones o categorías en nuestro código.

    enum Estado {
        Activo = "ACTIVO",
        Inactivo = "INACTIVO",
        Suspendido = "SUSPENDIDO"
    }
    let estadoUsuario: Estado = Estado.Activo;
    console.log(`El estado del usuario es ${estadoUsuario}`); // Salida: El estado del usuario es ACTIVO

})();