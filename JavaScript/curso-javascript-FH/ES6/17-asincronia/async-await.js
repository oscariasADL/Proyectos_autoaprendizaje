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


const getEmpleado = async( id ) => {

    const empleadoDB = empleados.find( empleado => empleado.id === id);

    if( !empleadoDB ) {
        throw new Error(`Async: El empleado con id ${id}, no existe en la base de datos`);
    }else{
        return empleadoDB;
    }    

}


const getSalario = async( empleado ) => {

    const salarioDB = salarios.find( salario => salario.id === empleado.id);

    if( !salarioDB ) {
        throw new Error(`Async: El salario de ${empleado.nombre}, no existe en la base de datos`);
    } else {
        return{
            nombre: empleado.nombre,
            salario: salarioDB.salario,
            id: empleado.id
        };
    }  
}

const getInfoUsuario = async( id ) => {

    const empleado = await getEmpleado( id );
    const resp = await getSalario( empleado );
    return `${resp.nombre} tiene un salario de $${resp.salario}`;
    
}

getInfoUsuario(1).then( mensaje => {
    console.log(mensaje);
}).catch( err => {
    console.error(err);
});