const express = require('express');
const router = express.Router();
const {ManagerCarrito} = require('../controllers/cartManagerMongo.js');
const manager = new ManagerCarrito()

router.post('/', manager.createCart)
router.get('/', manager.findAllCarts)
router.get('/:id', manager.findCartById)
router.put('/:id', manager.updateCart)
router.delete('/:id/productos/:id_prod', manager.deleteCartProduct)
router.delete('/:id', manager.deleteCart)

const cartRouter = router;
module.exports = {cartRouter};
