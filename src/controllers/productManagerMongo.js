import '../daos/productsDaosMongo.js'
import { EsquemaProductos } from '../models/productModel.js'

export class ProductosMongo { 
  async create(req, res) {
    const createdProduct = await EsquemaProductos.create(req.body)
    return res.status(200).json(createdProduct)
  }

  async findAll(req, res) {
    const products = await EsquemaProductos.find()
    return res.status(200).json(products)
  }

  async findById(req, res) {
    const { id } = req.params
    const product = await EsquemaProductos.findById(id)
    if (!product) return res.status(404).json({ message: 'Producto no encontrado'})
    return res.status(200).json(product)
  }

  async update(req, res) {
    try {
      const { id } = req.params
      await EsquemaProductos.findByIdAndUpdate(id, req.body)
      return res.status(200).json({ message: 'Producto actualizado!'})
    } catch(err) {
      return res.status(404).json({ message: 'Falló la actualización!'})
    }
  }

  async delete(req, res) {
    const { id } = req.params
    const productDeleted = await EsquemaProductos.findByIdAndDelete(id)
    if (!productDeleted) return res.status(404).json({ message: 'Producto no encontrado'})
    return res.status(200).json({ message: 'Producto eliminado!'})
  }

  async seleccionarProducto(id) {
    const { id } = req.params
    const product = await EsquemaProductos.findById(id)
    if (!product) return res.status(404).json({ message: 'Producto no encontrado'})
    return product
  }

}