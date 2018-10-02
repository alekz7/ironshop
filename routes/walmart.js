const express = require('express');
const walmart  = express.Router();
const fetch = require("node-fetch");

walmart.get('/walmart', (req, res, next) => {
  fetch("http://api.walmartlabs.com/v1/search?apiKey=" + process.env.WALMART_API_KEY +"&query=ipod")
    .then(res => res.json())
    .then(
      (result) => {
        res.status(200);
        // console.log(result);
        console.log("http://api.walmartlabs.com/v1/search?apiKey=" + process.env.WALMART_API_KEY +"&query=ipod");
        res.json(result);
      },
      (error) => {
        console.log("Error al consultar la API");
      }
    )
});

walmart.get('/walmart/:itemABuscar', (req, res, next) => {
  const itemABuscar = req.params.itemABuscar;
  fetch("http://api.walmartlabs.com/v1/search?apiKey=" + process.env.WALMART_API_KEY +"&query=" + itemABuscar)
    .then(res => res.json())
    .then(
      (result) => {
        res.status(200);
        // console.log(result);
        console.log("http://api.walmartlabs.com/v1/search?apiKey=" + process.env.WALMART_API_KEY +"&query=" + itemABuscar);
        res.json(result);
      },
      (error) => {
        console.log("Error al consultar la API");        
      }
    )
});


module.exports = walmart;
