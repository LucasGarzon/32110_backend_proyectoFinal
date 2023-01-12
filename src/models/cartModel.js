const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  timestamp: {type: Date, default: Date.now},
  productos: {type: Array, default: []}
});

const EsquemaCarrito = mongoose.model("carritos", CartSchema);
module.exports = { EsquemaCarrito };
