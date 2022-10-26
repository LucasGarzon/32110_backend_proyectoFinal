import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  timestamp: {type: Date, default: Date.now},
  productos: {type: Array, default: []}
});

export const EsquemaCarrito = mongoose.model("carritos", CartSchema)