const axios = require('axios');
require('dotenv').config();



class Busquedas{
    historial = ['Tegucigalpa', 'Madrid', 'San José'];

    constructor() {
        //TODO: Leer db si existe
    }

    get paramsMapbox() {
        return {
            'access_key': process.env.MAPBOX_KEY,
            'limit': '5',
            'lang': 'es'
        }
    }

    async ciudad(lugar = '') {
        // Petición http
        // console.log('ciudad:'+ lugar);
        const instance = axios.create({
            baseURL: `http://api.positionstack.com/v1/forward?query=${lugar}`,
            params: this.paramsMapbox
        });

        try {
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
}

module.exports = Busquedas;