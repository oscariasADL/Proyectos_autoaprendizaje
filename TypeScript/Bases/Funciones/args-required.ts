(() => {

    //En typescript los argumentos son obligatorios por defecto
    
    //firsName y lastName son los parámetros de la función y son obligatorios
    const fullName = (firstName: string, lastName: string): string => {

        return `${firstName} ${lastName}`;

    }

    const name = fullName('Tony', 'Stark'); //Aquí se pasan los argumentos
    console.log({ name });


})();