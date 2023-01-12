import express from 'express';

const router = express.Router();

import {ProductosMongo} from '../controllers/productManagerMongo.js'
const manager = new ProductosMongo()

router.post('/', manager.create)
router.get('/', manager.findAll)
router.get('/:id', manager.findById)
router.put('/:id', manager.update)
router.delete('/:id', manager.delete)

const productRouter = router;
export {productRouter};