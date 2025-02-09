const express = require('express');
const { engine } = require('express-handlebars');
const http = require('http');
const socketIo = require('socket.io');
const productRouter = require('./routes/api/products');
const cartRouter = require('./routes/api/carts');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);


app.engine('handlebars', engine({
  defaultLayout: false  
}));
app.set('view engine', 'handlebars');
app.set('views', './views'); 


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

let productos = [];


app.get('/', (req, res) => {
  res.redirect('/products'); 
});


app.get('/products', (req, res) => {
  res.render('products/index', { productos });
});


app.get('/realtimeproducts', (req, res) => {
  res.render('realtimeproduct/realTimeProducts', { productos });
});


app.post('/addProduct', (req, res) => {
  const { name, price } = req.body;
  const nuevoProducto = { name, price };
  productos.push(nuevoProducto);


  io.emit('newProduct', nuevoProducto);

  res.redirect('/products');
});


app.post('/deleteProduct', (req, res) => {
  const { index } = req.body;
  productos.splice(index, 1);

 
  io.emit('deleteProduct', index);

  res.redirect('/realtimeproducts');
});


io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');
  
  
  socket.emit('initProducts', productos);
  
  
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});


const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});