(() =>{

    //Si no se define un tipo, typescript lo toma como any
    //Si le asignamos any, acepta cualquier tipo de dato
    //No se recomienda su uso ya que pierde las ventajas de tipado de TS
    let avenger:any = 123

    //El casteo de tipos consiste en forzar a que una variable de tipo any
    //se comporte como otro tipo de dato
    avenger = 'Dr Strange'
    console.log((avenger as string).charAt(0)) //D

    //También se puede hacer con la sintaxis de <>
    console.log((<string>avenger).charAt(0)) //D

})();