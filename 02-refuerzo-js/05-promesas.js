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

const getEmpleado = (id) => {
    const promesa = new Promise((resolve, reject) => {        
        const empleado = empleados.find((empleado) => empleado.id === id)?.nombre;

        (empleado) ?
            resolve(empleado):
            reject(`No existe el empleado con id ${id}`);
    })
    return promesa;
}

const getSalario = (id) => {
    const promesa = new Promise((resolve, reject) => {
        const salario = salarios.find((e) => e.id === id)?.salario

        salario ?
            resolve(salario) :
            reject(`El usuario ${id} no tiene salario`);
    })

    return promesa;
}

// getEmpleado(id)
//     .then(empleado => console.log(empleado))
//     .catch(err => console.log(err));

// getSalario(id)
//     .then(salario => console.log(salario))
//     .catch(err => console.log(err))

const id = 3;
let nombre;

getEmpleado(id).then(empleado => {
    nombre = empleado
    return getSalario(id)
})
    .then(salario => console.log(`El empleado ${nombre} tiene un salario de ${salario}`))
    .catch(err => console.log(err)
)