(() => {

    //Argumentos por defecto en funciones TypeScript
    // Si no se pasa el argumento lastName, tomará el valor por defecto 'No last name', por lo cual se convierte en un argumento opcional.

    //Un argumento requerido no puede ir después de un argumento opcional.

    const fullName = (firstName: string, lastName: string = 'No last name'): string => {

        return `${firstName} ${lastName}`;

    }

    const name = fullName('Tony', 'Stark'); // Sin el argumento opcional no hay error
    console.log({ name });


})();