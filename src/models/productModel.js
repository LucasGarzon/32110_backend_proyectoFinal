const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductsSchema = new Schema({
    id: Schema.ObjectId,
    timestamp: {type: Date, default: Date.now},
    nombre: {type: String, require: true , max: 48},
    descripcion: {type: String, require: true , max: 124},
    codigo: {type: String, require: true , max: 24},
    foto: {type: String, require: true},
    precio: {type: Number, require: true},
    stock: {type: Number, require: true}
})

const EsquemaProductos = mongoose.model("productos", ProductsSchema);
module.exports = { EsquemaProductos };
