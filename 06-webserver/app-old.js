const http = require('http');

http.createServer((req, res) => {
    // res.setHeader('Content-Disposition', 'attachment; filename=listado.csv')
    // res.writeHead(200, { 'Content-Type': 'application/csv' });

    res.write('Hola mundo')
    res.end()

}).listen(8080)

console.log('Escuchando el puerto 8080');