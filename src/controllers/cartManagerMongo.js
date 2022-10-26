import '../daos/productsDaosMongo.js'
import { EsquemaCarrito } from '../models/productModel.js'
import {ProductosMongo} from './productManagerMongo.js'
const manager = new ProductosMongo()

export class ManagerCarrito {
  async createCart(req,res) {
    const { id } = req.params
    let product = manager.seleccionarProducto(id)
    const createdCart = await EsquemaCarrito.create({productos:[product]})
    return res.status(200).json(createdCart)
  }
  
  async deleteCart(req, res) {
    const { id } = req.params
    if (!id) return res.status(400).json({error: error, ruta: req.originalUrl, metodo: req.method})
    const response = await CartsModel.deleteOne({ _id: id })
    return res.status(200).json({message: 'Carrito eliminado'})
  }
}