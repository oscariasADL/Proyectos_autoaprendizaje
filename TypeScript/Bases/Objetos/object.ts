(() => {

    let flash: { nombre: string, edad?: number, poderes: string[], getNombre?: () => string } = { 
        nombre: "Barry Allen", 
        edad: 24, 
        poderes: ["Súper Velocidad", "Viajar en el Tiempo"] 
    }

    flash = { 
        nombre: "Clark Kent", 
        //edad: 500, 
        poderes: ["Súper Fuerza", "Volar"],
        getNombre() {
            return this.nombre;
        }
    }
    
})();