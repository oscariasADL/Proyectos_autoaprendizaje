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


const getEmpleado = (id, callback) => {
    const empleadoDB = empleados.find( empleado => empleado.id === id);
    if( !empleadoDB ) {
        callback(`El empleado con id ${id}, no existe en la base de datos`);
    } else {
        callback( null, empleadoDB );
    }
}

const getSalario = (empleado, callback) => {
    const salarioDB = salarios.find( salario => salario.id === empleado.id);
    if( !salarioDB ) {
        callback(`El salario de ${empleado.nombre}, no existe en la base de datos`);
    } else {
        callback( null, {
            nombre: empleado.nombre,
            salario: salarioDB.salario,
            id: empleado.id
        } );
    }
}

getEmpleado(5, (err, empleado) => {
    if( err ) {
        return console.log(err);
    }

    console.log('Empleado de base de datos', empleado);

    getSalario(empleado, (err, resp) => {
        if( err ) {
            return console.log(err);
        }
        console.log('El salario de:', resp.nombre, 'es de:', resp.salario);
    });

    
});




