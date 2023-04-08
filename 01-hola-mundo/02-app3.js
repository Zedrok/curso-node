console.log('Inicio del programa');

setTimeout(() => {
    console.log('1 timeout');
}, 3000)

setTimeout(() => {
    console.log('2 timeout');
}, 0)

setTimeout(() => {
    console.log('3 timeout');
}, 0)

console.log('Fin del programa');