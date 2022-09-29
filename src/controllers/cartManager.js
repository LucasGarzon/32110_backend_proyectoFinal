const fs = require('fs')
const ManagerProduct = require('./productManager.js')
const manager = new ManagerProduct()

const pathToFile = './src/data/carts.json'

class ManagerCarrito {
  createCart = async (newCart) => {
    try {
      let producto = await manager.findById(newCart.idProducto)
      if (producto.hasOwnProperty("error")) return producto
      if (fs.existsSync(pathToFile)) {
        let data = await fs.promises.readFile(pathToFile, 'utf-8')
        let carts = JSON.parse(data)
        let id = carts[carts.length-1].id+1
        newCart = {
          id,
          timestamp : new Date().toLocaleString(),
          productos: [producto]
        }
        carts.push(newCart)
        await fs.promises.writeFile(pathToFile, JSON.stringify(carts, null, 2))
        return newCart
      } else {
        let id = 1
        newCart = {
          id, 
          timestamp : new Date().toLocaleString(),
          productos: [producto]
        }
        await fs.promises.writeFile(pathToFile, JSON.stringify([newCart], null, 2))
        return [newCart]
      }
    } catch (err) {
      return {status: "error", message: err.message}
    }
  }

  deleteCart = async (id) => {
    if (!fs.existsSync(pathToFile)) return {error: 0, descripcion: "No existe la BD"}
    let data = await fs.promises.readFile(pathToFile, 'utf-8')
    let carts = JSON.parse(data)
    id = parseInt(id)
    if (!carts.find(item => item.id === id)) return {error:0, descripcion:"no se encontró el carrito"}
    let newCarts = carts.filter(item => item.id !== id)
    carts = newCarts
    await fs.promises.writeFile(pathToFile, JSON.stringify(carts, null, 2))
    return carts
  }

  findCartById = async (id) => {
    if (!fs.existsSync(pathToFile)) return {error: 0, descripcion: "No existe la BD"}
    let data = await fs.promises.readFile(pathToFile, 'utf-8')
    let carts = JSON.parse(data)
    let cart = carts.find(item => item.id === parseInt(id))
    if (!cart) return {error:0, descripcion:"no se encontró el carrito"}
    return cart.productos
  } 

  updateCart = async (id, newProduct) => {
    if (!fs.existsSync(pathToFile)) return {error: 0, descripcion: "No existe la BD"}
    let data = await fs.promises.readFile(pathToFile, 'utf-8')
    let carts = JSON.parse(data)
    let cart = carts.find(item => item.id === parseInt(id))
    if (!cart) return {error:0, descripcion:"no se encontró el carrito"}
    let producto = await manager.findById(newProduct.idProducto)
    if (producto.hasOwnProperty("error")) return producto
    cart.productos.push(producto)
    await fs.promises.writeFile(pathToFile, JSON.stringify(carts, null, 2))
    return cart
  }

  deleteCartProduct = async (id, id_prod) => {
    if (!fs.existsSync(pathToFile)) return {error: 0, descripcion: "No existe la BD"}
    let data = await fs.promises.readFile(pathToFile, 'utf-8')
    let carts = JSON.parse(data)
    let cart = carts.find(item => item.id === parseInt(id))
    if (!cart) return {error:0, descripcion:"no se encontró el carrito"}
    if (!cart.productos.find(item => item.id === parseInt(id_prod))) return {error: 0, descripcion: "producto no encontrado en carrito"}
    let newProducts = cart.productos.filter(item => item.id !== parseInt(id_prod))
    cart.productos = newProducts
    if (cart.productos.length === 0 ) return this.deleteCart(id)
    await fs.promises.writeFile(pathToFile, JSON.stringify(carts, null, 2))
    return carts
  }

}

module.exports = ManagerCarrito