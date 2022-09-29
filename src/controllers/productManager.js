const fs = require('fs')

const pathToFile = './src/data/products.json'

class ManagerProducto {
  create = async (producto) => {
    try {
      if (fs.existsSync(pathToFile)) {
        let data = await fs.promises.readFile(pathToFile, 'utf-8')
        let products = JSON.parse(data) 
        let id = products[products.length-1].id+1
        producto = {
          id, 
          timestamp : new Date().toLocaleString(),
          ...producto
        }
        products.push(producto)
        await fs.promises.writeFile(pathToFile, JSON.stringify(products, null, 2))
        return producto
      } else {
        let id = 1
        producto = {
          id, 
          timestamp : new Date().toLocaleString(),
          ...producto
        }
        await fs.promises.writeFile(pathToFile, JSON.stringify([producto], null, 2))
        return [producto]
      }
    } catch(err) {
       return {status: "error", message: err.message}
    }
  } 

  findAll = async () => {
    if (!fs.existsSync(pathToFile)) return {error: 0, descripcion: "No existe la BD"}
    let data = await fs.promises.readFile(pathToFile, 'utf-8')
    return JSON.parse(data)
  }

  findById = async (id) => {
    if (!fs.existsSync(pathToFile)) return {error: 0, descripcion: "No existe la BD"}
    let data = await fs.promises.readFile(pathToFile, 'utf-8')
    let productos = JSON.parse(data)
    let producto = productos.find(item => item.id === parseInt(id))
    if (!producto) return {error: 0, descripcion: "no se encontró el producto"}
    return producto
  } 

  update = async (id, product) => {
    if (!fs.existsSync(pathToFile)) return {error: 0, descripcion: "No existe la BD"}
    let data = await fs.promises.readFile(pathToFile, 'utf-8')
    let productos = JSON.parse(data)
    id = parseInt(id)
    if (!productos.find(item => item.id === id)) return {error:0, descripcion: "no se encontró el producto"}
    let newProducts = productos.map(item => {
      if (item.id === id) {
        return {
          id, 
          timestamp: item.timestamp,
          ...product
        }
      } else return item
    })
    productos = newProducts
    await fs.promises.writeFile(pathToFile, JSON.stringify(productos, null, 2))
    return productos.find(item => item.id === id)
  }

  delete = async (id) => {
    if (!fs.existsSync(pathToFile)) return {error: 0, descripcion: "No existe la BD"}
    let data = await fs.promises.readFile(pathToFile, 'utf-8')
    let productos = JSON.parse(data)
    if (!productos.find(item => item.id === parseInt(id))) return {error:0, descripcion: "no se encontró el producto"}
    let newProducts = productos.filter(item => item.id !== parseInt(id))
    productos = newProducts
    await fs.promises.writeFile(pathToFile, JSON.stringify(productos, null, 2))
    return productos
  }
}

module.exports = ManagerProducto