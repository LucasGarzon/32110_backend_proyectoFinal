const express = require('express')
const productRouter = require('./router/router_products.js')


const app = express()
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => console.log(`Server up on port ${PORT}`))


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/productos', productRouter)

