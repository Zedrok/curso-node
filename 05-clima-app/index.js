

const { inquirerMenu, pausa, leerInput, listadoLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async () => {
    let opt = 0;
    const busquedas = new Busquedas();

    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                // Mostrar mensaje
                const termino = await leerInput('Indique el lugar a buscar: ');
                const lugares = await busquedas.ciudad(termino)
                const id = await listadoLugares(lugares);

                const lugarSeleccionado = lugares.find(lugar => {
                    return lugar.nombre === id
                });


                // Seleccionar el lugar
                // Clima
                // Mostrar resultado
                console.log('Información de la ciudad'.green);
                console.log('Ciudad: ', lugarSeleccionado.nombre);
                console.log('Lat: ', lugarSeleccionado.lat);
                console.log('Lng: ', lugarSeleccionado.lng);
                console.log('Temperatura: ');
                console.log('Mínima: ');
                console.log('Máxima: ');
                break;
            case 2:
                break;
            case 0:
                break;
        }
    } while (opt != 0)

    await pausa();


}

main();