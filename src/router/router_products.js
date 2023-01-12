const express = require('express');
const router = express.Router();
const {ProductosMongo} = require('../controllers/productManagerMongo.js');
const manager = new ProductosMongo()

router.post('/', manager.create)
router.get('/', manager.findAll)
router.get('/:id', manager.findById)
router.put('/:id', manager.update)
router.delete('/:id', manager.delete)

const productRouter = router;
module.exports = {productRouter};
