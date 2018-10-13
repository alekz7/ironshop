const express = require('express');
const mapa  = express.Router();
const fetch = require("node-fetch");
const baseApi       = 'https://maps.googleapis.com/maps/api/directions/json?';
const baseMatrixApi = 'https://maps.googleapis.com/maps/api/distancematrix/json?';
const keyMaps = process.env.GOOGLE_MAPS_ROUTES_PLACES_API_KEY;
const ironhack = '19.3977655,-99.1713954'
const centroMedico = '19.4069399,-99.157328'
const metroEtiopia = '19.395386,-99.1588178'
const parqueDelta = '19.403147,-99.156346'

mapa.post('/mapa/matrix/alex', (req, res, next) => {
  fetch(baseMatrixApi + req.body.params + keyMaps)
    .then(res => res.json())
    .then(
      (result) => {
        res.status(200);
        res.json(result);
      },
      (error) => {
        console.log("Error al consultar la API de Maps");
      }
    )
});

mapa.get('/mapa/:itemABuscar', (req, res, next) => {
  const itemABuscar = req.params.itemABuscar;
  console.log(itemABuscar);
  fetch(baseApi + 'origin=' + ironhack + '&destination=' + centroMedico + '&mode=driving&departure_time=now&traffic_model=best_guess&key=' + keyMaps)
    .then(res => res.json())
    .then(
      (result) => {
        res.status(200);
        console.log("estatus: " + result.status);
        console.log("tiempo estimado: " + result.routes[0].legs[0].duration.text);
        console.log("distancia estimada: " + result.routes[0].legs[0].distance.text);
        console.log("tiempo en el trafico: " + result.routes[0].legs[0].duration_in_traffic.text);
        console.log("encoded polyline:" + result.routes[0].overview_polyline.points);
        res.json(result);
      },
      (error) => {
        console.log("Error al consultar la API de Maps");
      }
    )
});

module.exports = mapa;
