const express = require('express');
const productRouter = require('./routes/api/products'); 
const cartRouter = require('./routes/api/carts'); 

const app = express();
app.use(express.json()); 


app.use('/api/products', productRouter); 
app.use('/api/carts', cartRouter); 

const PORT = 8080; 
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});