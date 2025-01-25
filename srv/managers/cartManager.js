const fs = require('fs');
const path = require('path');

class CartManager {
  constructor() {
    this.filePath = path.join(__dirname, '../data/carts.json');
  }

  async getAllCarts() {
    try {
      const data = await fs.promises.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      throw new Error('Error al leer los carritos');
    }
  }

  async getCartById(cid) {
    try {
      const carts = await this.getAllCarts();
      return carts.find(cart => cart.id === cid);
    } catch (error) {
      throw new Error('Error al obtener el carrito');
    }
  }

  async createCart() {
    try {
      const carts = await this.getAllCarts();
      const newId = Date.now().toString();
      const newCart = { id: newId, products: [] };
      carts.push(newCart);
      await fs.promises.writeFile(this.filePath, JSON.stringify(carts, null, 2));
      return newCart;
    } catch (error) {
      throw new Error('Error al crear el carrito');
    }
  }

  async addProductToCart(cid, pid) {
    try {
      const carts = await this.getAllCarts();
      const cart = carts.find(cart => cart.id === cid);

      if (!cart) return null;

      const existingProduct = cart.products.find(item => item.product === pid);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.products.push({ product: pid, quantity: 1 });
      }

      await fs.promises.writeFile(this.filePath, JSON.stringify(carts, null, 2));
      return cart;
    } catch (error) {
      throw new Error('Error al agregar producto al carrito');
    }
  }
}

module.exports = CartManager;