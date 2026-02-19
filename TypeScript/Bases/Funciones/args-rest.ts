(() => {

   //Parametros REST - Agrupar argumentos en un arreglo
   function sumar(...numeros: number[]): number {
      return numeros.reduce((acum, numero) => acum + numero, 0);
   }

   const resultado = sumar(1, 2, 3, 4, 5);
   console.log('Resultado de la suma:', resultado); // Resultado de la suma: 15


})();