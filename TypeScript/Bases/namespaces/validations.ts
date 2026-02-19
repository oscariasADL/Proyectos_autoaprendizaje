// Los namespaces en TypeScript son una forma de organizar el código y evitar conflictos de nombres. A continuación, se muestra un ejemplo de cómo usar namespaces para organizar funciones de validación.

// Tambien sirven para reutilizar código en diferentes partes de la aplicación sin necesidad de importar módulos, ya que el código dentro del namespace estará disponible globalmente.

namespace Validations {

    export const validateText = ( text: string): boolean => {
        return ( text.length > 3 ) ? true : false;
    }

    // Es necesario exportar las funciones para que puedan ser utilizadas fuera del namespace. Si no se exportan, solo estarán disponibles dentro del namespace.
    export const validateDate = ( date: Date ): boolean => {
        return ( date.getTime() < new Date().getTime() ) ? true : false;
    }

    console.log( validateText('Hola') ); // true

}