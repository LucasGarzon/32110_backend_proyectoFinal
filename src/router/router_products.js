import {Router} from 'express';
const routes = Router()

import {ProductosMongo} from '../controllers/productManagerMongo.js'
const manager = new ProductosMongo()

routes.post('/', manager.create)
routes.get('/', manager.findAll)
routes.get('/:id', manager.findById)
routes.put('/:id', manager.update)
routes.delete('/:id', manager.delete)

const productRouter = routes;
export {productRouter};