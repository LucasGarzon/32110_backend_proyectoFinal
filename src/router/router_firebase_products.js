import {Router} from 'express';
const routes = Router()

import {ProductosFirebase} from '../controllers/productManagerFirebase.js'
const manager = new ProductosFirebase()

routes.post('/', manager.create)
routes.get('/', manager.findAll)
routes.get('/:id', manager.findById)
routes.put('/:id', manager.update)
routes.delete('/:id', manager.delete)

const productFsRouter = routes;
export {productFsRouter};