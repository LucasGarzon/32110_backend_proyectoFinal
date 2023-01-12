import express from 'express';

const router = express.Router();

import {ManagerCarrito} from '../controllers/cartManagerMongo.js'
const manager = new ManagerCarrito()

router.post('/', manager.createCart)
router.get('/', manager.findAllCarts)
router.get('/:id', manager.findCartById)
router.put('/:id', manager.updateCart)
router.delete('/:id/productos/:id_prod', manager.deleteCartProduct)
router.delete('/:id', manager.deleteCart)

const cartRouter = router;
export {cartRouter};