import express from 'express'
export const cartRouter = express.Router()

// const Manager = require('../controllers/cartManager.js')
import {ManagerCarrito} from '../controllers/cartManager.js'
const manager = new ManagerCarrito()

// router.post('/', (req, res) => {
//   if (!req.body.idProducto) return res.send({error: 0, descripcion:'Faltan datos obligatorios'})
//   if (isNaN(req.body.idProducto)) return res.send({error: 0, descripcion:'idProducto debe ser un número'})
//   manager.createCart(req.body)
//     .then(result => res.send(result))
//     .catch(err => res.send({error: 0, descripcion:err}))
// })

// router.delete('/:id', (req, res) => {
//   if (isNaN(req.params.id)) return res.status(404).send({error: -2, descripcion:`ruta ${req.baseUrl} método ${req.method} no implementada`})
//   manager.deleteCart(req.params.id)
//     .then(result => res.send(result))
//     .catch(err => res.send({error: 0, descripcion:err}))
// })

// router.get('/:id/productos', (req, res) => {
//   if (isNaN(req.params.id)) return res.status(404).send({error: -2, descripcion:`ruta ${req.baseUrl} método ${req.method} no implementada`})
//   manager.findCartById(req.params.id)
//     .then(result => res.send(result))
//     .catch(err => res.send({error: 0, descripcion:err}))
// })

// router.put('/:id/productos', (req, res) => {
//   if (isNaN(req.params.id)) return res.status(404).send({error: -2, descripcion:`ruta ${req.baseUrl} método ${req.method} no implementada`})
//   if (!req.body.idProducto) return res.send({error: 0, descripcion:'Faltan datos obligatorios'})
//   if (isNaN(req.body.idProducto)) return res.send({error: 0, descripcion:'idProducto debe ser un número'})
//   manager.updateCart(req.params.id, req.body)
//     .then(result => res.send(result))
//     .catch(err => res.send({error: 0, descripcion:err}))
// })

// router.delete('/:id/productos/:id_prod', (req, res) => {
//   if (isNaN(req.params.id) || isNaN(req.params.id_prod)) return res.status(404).send({error: -2, descripcion:`ruta ${req.baseUrl} método ${req.method} no implementada`})
//   manager.deleteCartProduct(req.params.id, req.params.id_prod)
//     .then(result => res.send(result))
//     .catch(err => res.send({error: 0, descripcion:err}))
// })
