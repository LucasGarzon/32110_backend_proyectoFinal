const express = require('express')
const router = express.Router()

const Manager = require('../controllers/productManager.js')
const manager = new Manager()

router.get('/', (req, res) => {
  manager.findAll().then(result => res.send({status: 200, message: 'Hello GET By Id', products:result}))
})

router.get('/:id', (req, res) => { 
  manager.findById(req.params.id).then(result => {
    if (!result) return res.send({error: 'product was not found'})
    res.send({status: 200, message: 'Hello GET By Id', product:result})
  })
})

router.post('/', (req, res) => {
  if (!req.body) return res.send({error: 'data is required'})
  manager.create(req.body).then(result => res.send({status: 200, message: 'Hello POST', newProduct:result}))
})

router.put('/:id', (req, res) => {
  manager.update(req.params.id, req.body).then(result => {
    // if (!req.body.nomb || !req.body.price || !req.body.thumbnail) return res.send({error: 'data is required'})
    if (!result) return res.send({error: 'product was not found'})
    res.send({status: 200, message: 'Hello PUT', productUpdated:result}) 
  })
})

router.delete('/:id', (req, res) => {
  manager.delete(req.params.id).then(result => {
    if (!result) return res.send({error: 'product was not found'})
    res.send({status: 200, message: 'Product deleted', products:result})
  })
})

module.exports = router