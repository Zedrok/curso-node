const empleados = [
    {
        id: 1,
        nombre: 'Fernando',
    },
    {
        id: 2,
        nombre: 'Linda',
    },
    {
        id: 3,
        nombre: 'Karen',
    },

]

const salarios = [
    {
        id: 1,
        salario: 1000,
    },
    {
        id: 2,
        salario: 2000,
    },
]

const getEmpleado = (id, callback) => {
    const empleado = empleados.find((empleado) => {
        return empleado.id === id;
    })

    if (empleado) {    
        callback(null, empleado);
    } else {
        callback(`Empleado con id ${id} no existe`)
    }
}

const getSalario = (id, callback) => {
    const salario = salarios.find((e) => e.id === id)?.salario

    if (salario) {
        callback(null, salario);
    } else {   
        callback(`error`)
    }
}

const id = 3;

getEmpleado(id, (err, empleado) => {
    if (err) {
        console.log('No existe el empleado con id ', id);
        return console.log(err);
    }

    getSalario(id, (err, salario) => {
        if (err) {
            return console.log('El empleado ', empleado.nombre, ' no tiene salario');
        }
        console.log('El empleado ', empleado.nombre,' tiene un salario de ', salario);
    })
})




