(() => {

    //En typescript los argumentos son obligatorios por defecto
    
    //Para hacerlos opcionales se utiliza el símbolo "?" después del nombre del argumento
    const fullName = (firstName: string, lastName?: string): string => {

        return `${firstName} ${lastName || 'No last name'}`; // Si lastName es undefined, se puede asignar un valor por defecto

    }

    const name = fullName('Tony'); // Sin el argumento opcional no hay error
    console.log({ name });


})();