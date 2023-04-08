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
            resolve(empleado) :
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

const id = 3;

const getInfoUsuario = async (id) => {
    try {
        const empleado = await getEmpleado(id);
        const salario = await (getSalario(id));

        return `El salario del empleado ${empleado} es de ${salario}`;
    } catch (error) {
        throw error;
    }

}

getInfoUsuario(id).then(
    (msg) => {
        console.log(msg);
    }
).catch(error => {
    console.log(error);
});