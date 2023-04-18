require('dotenv').config();
const express = require('express')
var hbs = require('hbs');

const app = express()
const port = process.env.PORT;

// Handlebars
app.set('view engine', 'hbs');
hbs.registerPartials( __dirname + '/views/partials', function (err) {});

// Servir contenido estático
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home', {
        nombre: 'Fernando Herrera',
        titulo: 'Curso Node'
    })
}
)
app.get('/home', (req, res) => {
    res.render('home', {
        nombre: 'Fernando Herrera',
        titulo: 'Curso Node'
    })
})

app.get('/generic', (req, res) => {
    res.render('generic', {
        nombre: 'Fernando Herrera',
        titulo: 'Curso Node'
    })
})

app.get('/elements', (req, res) => {
    res.render('elements', {
        nombre: 'Fernando Herrera',
        titulo: 'Curso Node'
    })
})

app.get('*', (req, res) => {
    res.send('404 | Page not found')
    // res.sendFile(__dirname + 'public/404.html');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})