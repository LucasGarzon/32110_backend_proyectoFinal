const express = require('express')
const router = express.Router()

const Manager = require('../controllers/productManager.js')
const manager = new Manager()

router.get('/', (req, res) => {
  manager.findAll().then(result => res.send({status: 200, message: 'Hello GET By Id', products:result}))
})

router.get('/:id', (req, res) => {
  res.send({status: 200, message: 'Hello GET By Id'})
})

router.post('/', (req, res) => {
  if (!req.body) return res.send({error: 'data is required'})
  manager.create(req.body).then(result => res.send({status: 200, message: 'Hello POST', newProduct:result}))
})

router.put('/:id', (req, res) => {
  res.send({status: 200, message: 'Hello PUT'})
})

router.delete('/:id', (req, res) => {
  res.send({status: 200, message: 'Hello DELETE'})
})

module.exports = router