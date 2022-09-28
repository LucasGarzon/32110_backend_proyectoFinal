const express = require('express')
const router = express.Router()

const Manager = require('../controllers/cartManager.js')
const manager = new Manager()

router.get('/:id/productos', (req, res) => {
  if (isNaN(req.params.id)) return res.status(404).send({error: -2, descripcion:`ruta ${req.baseUrl} método ${req.method} no implementada`})
  manager.findCartById(req.params.id).then(result => res.send(result))
})

router.post('/', (req, res) => {
  manager.createCart(req.body).then(result => res.send(result))
})

router.delete('/:id', (req, res) => {
  if (isNaN(req.params.id)) return res.status(404).send({error: -2, descripcion:`ruta ${req.baseUrl} método ${req.method} no implementada`})
  manager.deleteCart(req.params.id).then(result => {
    if (!result) return res.send({error: 0, descripcion:'carrito no encontrado'})
    res.send({status: 200, message: 'Cart deleted', carts:result})
  })
})

router.delete('/:id/productos/:id_prod', (req, res) => {
  if (isNaN(req.params.id) || isNaN(req.params.id_prod)) return res.status(404).send({error: -2, descripcion:`ruta ${req.baseUrl} método ${req.method} no implementada`})
  manager.deleteCartProduct(req.params.id, req.params.id_prod).then(result => res.send(result))
})

router.put('/:id/productos', (req, res) => {
  if (isNaN(req.params.id)) return res.status(404).send({error: -2, descripcion:`ruta ${req.baseUrl} método ${req.method} no implementada`})
  if (!req.body.idProducto) return res.send({error: 0, descripcion:'Faltan datos obligatorios'})
  manager.updateCart(req.params.id, req.body).then(result => res.send(result))
})


module.exports = router