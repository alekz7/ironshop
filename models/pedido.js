const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const pedidoSchema = new Schema({
  usuario: String,
  estatus: String,
  carrito: Object,
  selectedPosition: Object
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Pedido = mongoose.model("Pedido", pedidoSchema);
module.exports = Pedido;
