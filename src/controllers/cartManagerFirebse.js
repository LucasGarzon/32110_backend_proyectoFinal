import db from '../daos/loaderFirebase.js'
import {seleccionarProducto} from './productManagerFirebase.js'

const carts = db.collection('carritos')

export class ManagerCarrito {

  async findAllCarts(req, res) {
    const listaCarritos = []
    const snapshot = await carts.get()
    snapshot.forEach(doc => {
      listaCarritos.push({id: doc.id, ...doc.data()})
    })
    return res.status(200).json(listaCarritos) 
  }

  async createCart(req,res) {
    //Crear producto
    const producto = await seleccionarProducto(req.body.id)
    const newCart = {
      timestamp: new Date().toLocaleString(),
      produtos: [producto]
    }
    const createNewCart = await carts.add(newCart)
    const doc = await carts.doc(createNewCart.id).get()
    const cart = {
      id: req.body.id,
      ...doc.data()
    }
    return res.status(200).json({message: 'Carrito creado!', carrito: cart})
  }
  
  async deleteCart(req, res) {
    const { id } = req.params
    const doc = await carts.doc(id).get()  
    if (!doc.data()) return res.status(404).json({ message: 'Carrito no encontrado'}) 
    await carts.doc(id).delete()  
    return res.status(200).json({message: 'Carrito eliminado!'})  
  }

  async findCartById(req, res) {
    const { id } = req.params
    const doc = await carts.doc(id).get()
    const cart = {
      id: id,
      ...doc.data()
    }
    return res.status(200).json(cart) 
  }
  
  async updateCart(req, res) {
    const { id } = req.params
    const producto = await seleccionarProducto(req.body.id)
    if (producto === 'Producto no encontrado') return res.status(404).json({ message: producto}) 
    const getArray = await carts.doc(id).get()
    const nuevosProductos = getArray.data().productos
    nuevosProductos.push(producto)
    await carts.doc(id).set({productos:nuevosProductos})     
    const doc = await carts.doc(id).get()
    const cart = {
      id: id,
      ...doc.data()
    }
    return res.status(200).json(cart)       
  }

  async deleteCartProduct(req, res) {
    const { id, id_prod } = req.params
    const getArray = await carts.doc(id).get()
    const nuevosProductos = getArray.data().productos.filter(item => item.id !== id_prod)
    await carts.doc(id).set({productos:nuevosProductos})     
    const doc = await carts.doc(id).get()
    const cart = {
      id: id,
      ...doc.data()
    }
    return res.status(200).json(cart)        
  }
}