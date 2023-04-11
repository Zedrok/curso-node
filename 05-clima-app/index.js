const { inquirerMenu, pausa, leerInput, listadoLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async () => {
    let opt = 0;
    const busquedas = new Busquedas();

    do {
        // Mostrar mensaje
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                // Seleccionar el lugar
                const termino = await leerInput('Indique el lugar a buscar: ');
                const lugares = await busquedas.ciudad(termino)
                const id = await listadoLugares(lugares);

                if (id === '0') continue;

                const lugarSeleccionado = lugares.find(lugar => {
                    return lugar.nombre === id
                });

                busquedas.agregarHistorial(lugarSeleccionado.nombre)

                // Clima
                const clima = await busquedas.climaLugar(lugarSeleccionado.lat, lugarSeleccionado.lng)

                // Mostrar resultado
                console.clear();
                console.log('Información de la ciudad'.green);
                console.log('Ciudad: ', lugarSeleccionado.nombre.green);
                console.log('Lat: ', lugarSeleccionado.lat);
                console.log('Lng: ', lugarSeleccionado.lng);

                console.log('Temperatura: ', clima.temp);
                console.log('Mínima: ', clima.min);
                console.log('Máxima: ', clima.max);
                console.log('El clima está: ', clima.desc.green );
                break;
            case 2:
                busquedas.historialCapitalizado.forEach((lugar, i) => {
                    const idx = `${i+1}. `.green
                    console.log(`${idx} ${lugar}`);
                })
                break;
            case 0:
                break;
        }
    } while (opt != 0)

    await pausa();


}

main();