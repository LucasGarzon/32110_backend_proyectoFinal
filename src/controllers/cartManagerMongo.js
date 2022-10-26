import '../daos/productsDaosMongo.js'
import { EsquemaCarrito } from '../models/cartModel.js'
import {ProductosMongo} from './productManagerMongo.js'
const manager = new ProductosMongo()

export class ManagerCarrito {

  async findAllCarts(req, res) {
    try {
      const response = await EsquemaCarrito.find();
      res.status(200).json(response)
    } catch (error) {
      res.status(400).json({error: 'No se encontraron carritos'})
    }    
  }

  async createCart(req,res) {
    const id  = req.body.id
    let product = await manager.seleccionarProducto(id)
    if (product == 'Producto no encontrado') return res.status(400).json({message: product})
    const createdCart = await EsquemaCarrito.create({productos:[product]})
    return res.status(200).json(createdCart)
  }
  
  async deleteCart(req, res) {
    const { id } = req.params
    if (!id) return res.status(400).json({error: error, ruta: req.originalUrl, metodo: req.method})
    const response = await EsquemaCarrito.deleteOne({ _id: id })
    return res.status(200).json({message: 'Carrito eliminado'})
  }

  async findCartById(req, res) {
    const { id } = req.params
    const cart = await EsquemaCarrito.findById(id)
    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado'})
    return res.status(200).json(cart)
  }
  
  async updateCart(req, res) {
    try {
      const { id } = req.params
      const idProducto  = req.body.id
      let product = await manager.seleccionarProducto(idProducto)
      if (product == 'Producto no encontrado') return res.status(400).json({message: product})
      await EsquemaCarrito.findByIdAndUpdate(id, { $push: { productos: product }})
      return res.status(200).json({ message: 'Carrito actualizado!'})
    } catch(err) {
      return res.status(404).json({ message: 'Falló la actualización!'})
    }    
  }

  async deleteCartProduct(req, res) {
    try {
      const { id, id_prod } = req.params
      let product = await manager.seleccionarProducto(id_prod)
      if (product == 'Producto no encontrado') return res.status(400).json({message: product})
      await EsquemaCarrito.findByIdAndUpdate(id, { $pull: { productos: product }})
      const cart = await EsquemaCarrito.findById(id)
      if (cart.productos.length === 0) {
        const response = await EsquemaCarrito.deleteOne({ _id: id })
        return res.status(200).json({ message: 'Carrito actualizado y eliminado por falta de productos'})
      } else {
        return res.status(200).json({ message: 'Carrito actualizado!'})
      }
    } catch(err) {
      return res.status(404).json({ message: 'Falló la actualización!'})
    }   
  }
}