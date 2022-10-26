import db from '../daos/loaderFirebase.js'

const productos = db.collection('productos')

export class ProductosFirebase {

  async create(req, res) {
    //Crear producto
    const nuevoProducto = {
      timestamp: new Date().toLocaleString(),
      ...req.body
    }
    const createdProduct = await productos.add(nuevoProducto)
    //Listar producto para la respuesta del servidor
    const doc = await productos.doc(createdProduct.id).get()
    const producto = {
      id: createdProduct.id,
      ...doc.data()
    }
    return res.status(200).json(producto)
  }

  async findAll(req, res) {
    const listaProductos = []
    const snapshot = await productos.get()
    snapshot.forEach(doc => {
      listaProductos.push({id: doc.id, ...doc.data()})
    })
    return res.status(200).json(listaProductos)
  }

  async findById(req, res) {
    const { id } = req.params
    const doc = await productos.doc(id).get()
    const producto = {
      id: id,
      ...doc.data()
    }
    return res.status(200).json(producto)
  }

  async update(req, res) {
    const { id } = req.params
    const updated = await productos.doc(id).update(req.body)
    const doc = await productos.doc(id).get()
    const producto = {
      id: id,
      ...doc.data()
    }
    return res.status(200).json(producto)
  }

  async delete(req, res) {
    const { id } = req.params
    const producto = await productos.doc(id).get()
    if (!producto.data()) return res.status(404).json({ message: 'Producto no encontrado'})
    const productDeleted = await productos.doc(id).delete()
    return res.status(200).json({ message: 'Producto eliminado!'})
  }

}