const express = require('express')
const router = express.Router()

const Manager = require('../controllers/cartManager.js')
const manager = new Manager()

router.get('/', (req, res) => {
  manager.findAllCart().then(result => res.send(result))
})

router.post('/', (req, res) => {
  // if (!req.body.nombre || !req.body.descripcion || !req.body.codigo || !req.body.foto || !req.body.precio || !req.body.stock) return res.send({error: 0, descripcion:'Faltan datos obligatorios'})
  manager.createCart(req.body).then(result => res.send(result))
})

router.delete('/:id', (req, res) => {
  if (isNaN(req.params.id)) return res.status(404).send({error: -2, descripcion:`ruta ${req.baseUrl} método ${req.method} no implementada`})
  manager.deleteCart(req.params.id).then(result => {
    if (!result) return res.send({error: 0, descripcion:'carrito no encontrado'})
    res.send({status: 200, message: 'Cart deleted', carts:result})
  })
})


module.exports = router