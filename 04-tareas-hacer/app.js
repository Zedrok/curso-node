require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo')
const {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
} = require('./helpers/inquirer')

const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');


const main = async () => {
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if (tareasDB) {
        if (tareasDB != '') {
            tareas.cargarTareasFromArray(tareasDB);
        }
    }

    let opt = '';
    do {
        opt = await inquirerMenu();
        
        switch (opt) {
            case '1': {
                let desc = await leerInput('Descripcion');
                console.log(desc)
                tareas.crearTarea(desc);
                break;
            }
            case '2': {
                tareas.listadoCompleto();
                break;
            }
            case '3': {
                tareas.listarPendientesCompletadas();
                break;
            }
            case '4': {
                tareas.listarPendientesCompletadas(false);
                break;
            }
            case '5': {
                if (tareas.listadoArr.length > 0) {   
                    const ids = await mostrarListadoChecklist(tareas.listadoArr);
                    tareas.toggleCompletadas(ids);
                }
                break;
            }
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if ( id !== '0' ) {   
                    if (ok) {
                        const ok = await confirmar('¿Estás seguro?');
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }
                }
                break;
        }

        guardarDB(tareas.listadoArr)
        await pausa()
    }while(opt !== '0')
}

main();