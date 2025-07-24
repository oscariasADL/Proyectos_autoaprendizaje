/*
Ejercicio 32:

Crea una lista de la compra en la que el usuario pueda añadir nuevos productos para comprar con un campo de textpo y un boton.

Cada vez que se añade un producto, este aparece en la lista con un boton para eliminar.

El usuario podra añadir tantos productos como quiera.

Cada producto añadido tiene un boton para borrarlo de la lista

*/

document.addEventListener("DOMContentLoaded", ()=>{

    let productoNuevo = document.querySelector("#nuevoProducto");
    let butonProductoNuevo = document.querySelector("#addProduct");
    let listaProductos = document.querySelector("#listaProductos");


    butonProductoNuevo.addEventListener("click", () => {

        let productoAgregar = productoNuevo.value.trim();
        

        if(productoAgregar){
            
            let productoFinal = document.createElement("li");
            productoFinal.textContent = productoAgregar;

            //Crear boton eliminar
            let btnEliminar = document.createElement("button");
            btnEliminar.textContent = "Borrar Producto";
            
            btnEliminar.addEventListener("click", () =>{
                productoFinal.remove();
            });

            productoFinal.appendChild(btnEliminar)
            
            //Añadir producto a la lista
            listaProductos.appendChild(productoFinal);
            productoNuevo.value = "";
        }


    })

});

