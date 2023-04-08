const inquirer = import('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: '1. Crear tarea',
            },
            {
                value: '2',
                name: '2. Listar tareas',
            },
            {
                value: '3',
                name: '3. Listar tareas completadas',
            },
            {
                value: '4',
                name: '4. Listar tareas pendientes',
            },
            {
                value: '5',
                name: '5. Completar tarea(s)',
            },
            {
                value: '6',
                name: '6. Borrar tarea',
            },
            {
                value: '0',
                name: '0. Salir',
            },
        ]
    }
]

const inquirerMenu = async () => {
    console.log('======================='.green);
    console.log(' Seleccione una opción'.green);
    console.log('======================='.green);

    let prompt = (await inquirer).createPromptModule();
    const { opcion } = await prompt(preguntas);
    return opcion;
}

const pausa = async () => {
    let prompt = (await inquirer).createPromptModule();
    console.log('\n');
    const { opcion } = await prompt(
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'Enter'.green} para continuar.\n`,
        }
    )
    return opcion
}

const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor, ingrese un valor';
                }
                return true;
            }
        }
    ];

    let prompt = (await inquirer).createPromptModule();

    const { desc } = await prompt(question);
    return desc;
}

const listadoTareasBorrar = async (tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        const idx = `${i+1}.`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        };
    })

    choices.unshift({
        value: '0',
        name: '0. '.green + 'Cancelar'
    })

    const question = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ];

    let prompt = (await inquirer).createPromptModule()
    const { id } = await prompt(question)
    return id;
}

const confirmar = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    let prompt = (await inquirer).createPromptModule();
    const { ok } = await prompt(question);

    return ok;
}

const mostrarListadoChecklist = async (tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        const idx = `${i+1}.`.green;
        return {
            value: tarea.id,
            name: ` ${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        };
    })

    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ];

    let prompt = (await inquirer).createPromptModule()
    const { ids } = await prompt(question)
    return ids;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
}