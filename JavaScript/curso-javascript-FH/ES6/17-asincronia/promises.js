const empleados = [{
    id: 1,
    nombre: 'Oscar'
}, {
    id: 2,
    nombre: 'Ana'
}, {
    id: 3,
    nombre: 'Luis'
}];


const salarios = [{
    id: 1,
    salario: 1000
}, {
    id: 2,
    salario: 1500
}];


const getEmpleado = ( id ) => {

    const promesa = new Promise( (resolve, reject)=> {

        const empleadoDB = empleados.find( empleado => empleado.id === id);

        if( !empleadoDB ) {
            reject(`Promise: El empleado con id ${id}, no existe en la base de datos`);
        } else {
            resolve( empleadoDB );
        }

    });

    return promesa;
}


const getSalario = (empleado) => {

    return new Promise( (resolve, reject) => {

        const salarioDB = salarios.find( salario => salario.id === empleado.id);

        if( !salarioDB ) {
            reject(`El salario de ${empleado.nombre}, no existe en la base de datos`);
        } else {
            resolve({
                nombre: empleado.nombre,
                salario: salarioDB.salario,
                id: empleado.id
            } );
        }

    });   

}


getEmpleado(1).then( empleado => {
    return getSalario( empleado );
})
.then( resp => {
    console.log( resp );
})
.catch( err => {
    console.log(err);
});

/* ES LO MISMO QUE
getEmpleado(1)
    .then( getSalario )
    .then( resp => console.log(resp) )
.catch( err => {
        console.log(err);
});

*/