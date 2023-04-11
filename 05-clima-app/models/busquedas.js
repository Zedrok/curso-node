const fs = require('fs');
require('dotenv').config();

const axios = require('axios');



class Busquedas{
    historial = []
    dbPath = './db/database.json'

    constructor() {
        this.leerDB();
    }

    get historialCapitalizado() {
        return this.historial.map(lugar => {
            let palabras = lugar.split(' ');
            palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1));

            return palabras.join(' ');
        });
    }

    get paramsMapbox() {
        return {
            'access_key': process.env.MAPBOX_KEY,
            'limit': '5',
            'lang': 'es'
        }
    }

    get paramsWeather() {
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang': 'es'
        }
    }

    async ciudad(lugar = '') {
        // Petición http
        try {
            const instance = axios.create({
                baseURL: `http://api.positionstack.com/v1/forward?query=${lugar}`,
                params: this.paramsMapbox
            });

            const resp = await instance.get();
            return resp.data.data.map(lugar => ({
                nombre: lugar.label,
                lng: lugar.longitude,
                lat: lugar.latitude
            }));
            
            //Retornar lugares que coincidan con el lugar
        } catch(error) {
            
            return [];    
        }
    }

    async climaLugar( lat, lon) {
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramsWeather, lat, lon}
            });
            
            const resp = await instance.get()
            const { weather, main } = resp.data

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }
        } catch (error) {
            console.log('Errorazo');
        }
    }

    agregarHistorial(lugar = '') {
        // TODO: Prevenir duplicados

        if (this.historial.includes(lugar.toLocaleLowerCase())) {
            return;
        }

        this.historial = this.historial.splice(0, 5);

        this.historial.unshift(lugar.toLocaleLowerCase());

        //Grabar en DB
        this.guardarDB();
    }

    guardarDB() {
        const payload = {
            historial: this.historial
        };

        fs.writeFileSync(this.dbPath, JSON.stringify(payload))
    }

    leerDB() {
        if (!fs.existsSync(this.dbPath)) {
            return null;
        }
    
        const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
        
        const data = JSON.parse(info).historial;
        this.historial = data;
    }
}

module.exports = Busquedas;