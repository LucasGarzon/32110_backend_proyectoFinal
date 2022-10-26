import {Router} from 'express';
const routes= Router();

import {ManagerCarrito} from '../controllers/cartManagerMongo.js'
const manager = new ManagerCarrito()

routes.post('/', manager.createCart)
routes.get('/', manager.findAllCarts)
routes.get('/:id', manager.findCartById)
routes.put('/:id', manager.updateCart)
routes.delete('/:id/productos/:id_prod', manager.deleteCartProduct)
routes.delete('/:id', manager.deleteCart)

const cartRouter = routes;
export {cartRouter};