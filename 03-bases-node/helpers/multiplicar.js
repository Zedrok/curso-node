const fs = require('fs');
const argv = require('yargs').argv;
const colors = require('colors')

const crearArchivo = async (base = 2, listar = false, hasta = 10) => {
    try {
        let salida = '';
        let consola = ''
        
        for (let i = 1; i <= hasta; i++) {
            consola += colors.yellow(base) + ` x ${i} = ${base * i}\n`;
            salida += `${base} x ${i} = ${base * i}\n`;
        }
        
        if (argv.l == true) {
            console.log('===================')
            console.log(`=== TABLA DEL ${colors.yellow(base)} ===`)
            console.log('===================')
            console.log(consola);
        }
        
        fs.writeFileSync(`./salida/tabla-${base}.txt`, salida)
        
        return `tabla-${base}.txt`;
        
    } catch (error) {
        throw error;
    }
}

module.exports = {
    crearArchivo
}