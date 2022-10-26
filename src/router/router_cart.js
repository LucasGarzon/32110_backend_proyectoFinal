import {Router} from 'express';
const routes= Router();

import {ManagerCarrito} from '../controllers/cartManagerMongo.js'
const manager = new ManagerCarrito()

routes.post('/', manager.createCart)

const cartRouter = routes;
export {cartRouter};