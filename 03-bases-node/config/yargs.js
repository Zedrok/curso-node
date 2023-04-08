const argv = require('yargs')
    .options('b', {
        alias: 'base',
        type: 'number',
        demandOption: true,
        describe: 'Toma la base para la tabla de multiplicar'
    })
    .options('l', {
        alias: 'listar',
        type: 'boolean',
        default: false,
        describe: 'Muestra la tabla en consola'
    })
    .options('h',
    {
        alias: 'hasta',
        type: 'number',
        default: 10,
        describe: 'Define hasta que numero llega la tabla de la base'
    })
    .check((argv, options) => {
        if(isNaN(argv.b)){
            throw ('La base debe ser un numero');
        }
        return true;
    })
    .argv;

module.exports = argv;