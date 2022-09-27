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
          "timestamp" : new Date().toLocaleString(),
          "nombre": producto.nombre,
          "descripcion": producto.descripcion,
          "codigo": producto.codigo,
          "foto" : producto.foto,
          "precio": parseInt(producto.precio),
          "stock": parseInt(producto.stock)
        }
        products.push(producto)
        await fs.promises.writeFile(pathToFile, JSON.stringify(products, null, 2))
        return producto
      } else {
        let id = 1
        producto = {
          id,
          "timestamp" : new Date().toLocaleString(),
          "nombre": producto.nombre,
          "descripcion": producto.descripcion,
          "codigo": producto.codigo,
          "foto" : producto.foto,
          "precio": parseInt(producto.precio),
          "stock": parseInt(producto.stock)
        }
        await fs.promises.writeFile(pathToFile, JSON.stringify([producto], null, 2))
        console.log([producto])
        return [producto]
      }
    } catch(err) {
       return {status: "error", message: err.message}
    }
  } 

  findAll = async () => {
    let productos = []
    if (fs.existsSync(pathToFile)) {
      let data = await fs.promises.readFile(pathToFile, 'utf-8')
      productos = JSON.parse(data)
      return productos
    } else {
      return {error:"No existen productos"}
    }
  }

}

module.exports = ManagerProducto