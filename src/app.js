import express from 'express'
import {productRouter} from './router/router_products.js'
import {cartRouter} from './router/router_cart.js'
import loader from './daos/productsLoader.js'

loader.start()

const app = express()
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => console.log(`Server up on port ${PORT}`))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/productos', productRouter)
app.use('/api/carrito', cartRouter)
app.use((req, res) => {
  res.status(404).send({error: -2, descripcion: `ruta ${req.baseUrl}${req.url} método ${req.method} no implementada`});
});
