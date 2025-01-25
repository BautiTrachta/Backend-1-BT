const express = require('express');
const router = express.Router();
const ProductManager = require('../../managers/productManager');

const productManager = new ProductManager();

// Ruta GET /api/products/ que lista todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await productManager.getProducts(); 
    res.json(products); 
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// Ruta GET /api/products/:pid que lista un producto por su id
router.get('/:pid', async (req, res) => {
  const { pid } = req.params; 
  try {
    const product = await productManager.getProductById(pid); 
    if (product) {
      res.json(product); 
    } else {
      res.status(404).json({ error: 'Producto no encontrado' }); 
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener producto' });
  }
});

// Ruta POST /api/products/ que agrega un nuevo producto
router.post('/', async (req, res) => {
  const { title, description, code, price, status, stock, category, thumbnails } = req.body;
  
  try {
    const newProduct = {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails
    };

   
    const addedProduct = await productManager.addProduct(newProduct);

    res.status(201).json(addedProduct); 
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar producto' });
  }
});

// Ruta PUT /api/products/:pid que actualiza un producto por su id
router.put('/:pid', async (req, res) => {
  const { pid } = req.params; 
  const { title, description, code, price, status, stock, category, thumbnails } = req.body; // Obtiene los datos del body
  
  try {
    const updatedProduct = await productManager.updateProduct(pid, { title, description, code, price, status, stock, category, thumbnails });

    if (updatedProduct) {
      res.json(updatedProduct); 
    } else {
      res.status(404).json({ error: 'Producto no encontrado' }); 
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
});

// Ruta DELETE /api/products/:pid que elimina un producto por su id
router.delete('/:pid', async (req, res) => {
  const { pid } = req.params; 

  try {
    const result = await productManager.deleteProduct(pid);

    if (result) {
      res.json({ message: 'Producto eliminado' }); 
    } else {
      res.status(404).json({ error: 'Producto no encontrado' }); 
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

module.exports = router;