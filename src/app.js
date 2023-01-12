const express = require('express');
const { productRouter } = require('./router/router_products.js');
const { cartRouter } = require('./router/router_cart.js');
const { userRouter } = require('./router/router_user.js');
const loader = require('./daos/dataBaseLoader.js');

loader.start();

const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => console.log(`Server up on port ${PORT}`));

app.use('/content', express.static('./public'));
app.set('views', 'src/views');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/productos', productRouter);
app.use('/api/carrito', cartRouter);
app.use('/', userRouter);
app.use((req, res) => {
res.status(404).send({error: -2, descripcion: `ruta ${req.baseUrl}${req.url} método ${req.method} no implementada`});
}); 