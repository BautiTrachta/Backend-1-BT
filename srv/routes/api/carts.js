const express = require('express');
const router = express.Router();
const CartManager = require('../../managers/cartManager');

const cartManager = new CartManager();

// Ruta POST /api/carts/ que crea un nuevo carrito
router.post('/', async (req, res) => {
  try {
    const newCart = await cartManager.createCart();

    res.status(201).json(newCart); 
  } catch (error) {
    res.status(500).json({ error: 'Error al crear carrito' });
  }
});

// Ruta GET /api/carts/:cid que obtiene los productos de un carrito específico
router.get('/:cid', async (req, res) => {
  const { cid } = req.params; 

  try {
    const cart = await cartManager.getCartById(cid);

    if (cart) {
      res.json(cart); 
    } else {
      res.status(404).json({ error: 'Carrito no encontrado' }); 
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener carrito' });
  }
});

// Ruta POST /api/carts/:cid/product/:pid que agrega un producto a un carrito
router.post('/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params; 
  
  try {
    const updatedCart = await cartManager.addProductToCart(cid, pid);

    res.json(updatedCart); 
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar producto al carrito' });
  }
});

module.exports = router;