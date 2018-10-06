const express = require('express');
const pedido  = express.Router();
const Pedido = require('../models/pedido.js');

pedido.get('/pedidos', (req, res, next) => {
  Pedido.find()
  .then(pedidos => {
    res.status(200);
    res.json({
      mensaje: "pedidos consultados (todos)",
      items: pedidos
    });
  })
  .catch(error => {
    res.status(407);
    res.json({mensaje: error});
  })
});
pedido.get('/pedidos/:usuario', (req, res, next) => {
  const usuario = req.params.usuario;
  Pedido.find({usuario: usuario})
    .then(pedidos => {
      res.status(200);
      res.json({
        mensaje: "pedidos consultados",
        items: pedidos
      });
    })
    .catch(error => {
      res.status(406);
      res.json({mensaje: error});
    })
});
pedido.get('/pedido/:id', (req, res, next) => {
  let pedidoId = req.params.id;
  console.log(pedidoId);
  Pedido.findOne({'_id': pedidoId})
    .then(pedido => {
      console.log(pedido);
      res.render("pedido-detail", { pedido });
    })
    .catch(error => {
      console.log(error)
    });
});
pedido.post('/pedidos/add', (req, res, next) => {
  const newPedido = new Pedido({
    usuario: "alekz",
    estatus: "empacando",
    carrito: req.body });
  newPedido.save()
    .then((pedido) => {
      res.status(200);
      res.json({mensaje: "pedido colocado"});
    })
    .catch((error) => {
      res.status(405);
      res.json({mensaje: error});
    });
});
pedido.post('/pedidos/edit', (req, res, next) => {
  console.log(req.query.pedido_id);
  const { position } = req.body;
  Pedido.update({ _id: req.query.pedido_id}, { $set: { usuario:'xxx', estatus:'en camino', selectedPosition: position } }, { new: true })
  .then((pedido) => {
    res.status(200);
    res.json({mensaje: "pedido actualizado"});    
  })
  .catch((error) => {
    console.log(error);
  });
});

module.exports = pedido;
