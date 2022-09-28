const express = require('express')
const router = express.Router()

const Manager = require('../controllers/productManager.js')
const manager = new Manager()

const admin = true

router.get('/', (req, res) => {
  manager.findAll()
    .then(result => res.send(result))
    .catch(err => res.send({error: 0, descripcion:err}))
})

router.get('/:id', (req, res) => { 
  if (isNaN(req.params.id)) return res.status(404).send({error: -2, descripcion:`ruta ${req.baseUrl} método ${req.method} no implementada`})
  manager.findById(req.params.id).then(result => {
    if (!result) return res.send({error: 0, descripcion:'producto no encontrado'})
    res.send({status: 200, message: 'Hello GET By Id', product:result})
  })
})

router.post('/', (req, res) => {
  if (admin === false) return res.send({error: 1, descripcion:`ruta ${req.baseUrl} método ${req.method} no autorizada`})
  if (!req.body.nombre || !req.body.descripcion || !req.body.codigo || !req.body.foto || !req.body.precio || !req.body.stock) return res.send({error: 0, descripcion:'Faltan datos obligatorios'})
  manager.create(req.body).then(result => res.send({status: 200, message: 'Hello POST', newProduct:result}))
})

router.put('/:id', (req, res) => {
  if (isNaN(req.params.id)) return res.status(404).send({error: -2, descripcion:`ruta ${req.baseUrl} método ${req.method} no implementada`})
  if (admin === false) return res.send({error: 1, descripcion:`ruta ${req.baseUrl} método ${req.method} no autorizada`})
  if (!req.body.nombre || !req.body.descripcion || !req.body.codigo || !req.body.foto || !req.body.precio || !req.body.stock) return res.send({error: 0, descripcion:'Faltan datos obligatorios'})
  manager.update(req.params.id, req.body).then(result => {
    if (!result) return res.send({error: 0, descripcion:'producto no encontrado'})
    res.send({status: 200, message: 'Hello PUT', productUpdated:result}) 
  })
})

router.delete('/:id', (req, res) => {
  if (isNaN(req.params.id)) return res.status(404).send({error: -2, descripcion:`ruta ${req.baseUrl} método ${req.method} no implementada`})
  if (admin === false) return res.send({error: 1, descripcion:`ruta ${req.baseUrl} método ${req.method} no autorizada`})
  manager.delete(req.params.id).then(result => {
    if (!result) return res.send({error: 0, descripcion:'producto no encontrado'})
    res.send({status: 200, message: 'Product deleted', products:result})
  })
})

module.exports = router