const { crearArchivo } = require('./helpers/multiplicar');
const argv = require('./config/yargs');
var colors = require('colors');


console.clear();
console.log(argv);

// let base = 3;

crearArchivo(argv.b, argv.l, argv.h).then((nombreArchivo) => {
    return console.log(nombreArchivo, 'creado');
}).catch((error) => {
    return console.log('Error: '+error);
}) 