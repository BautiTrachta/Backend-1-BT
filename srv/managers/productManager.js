const fs = require('fs');
const path = require('path');

class ProductManager {
  constructor() {
    this.filePath = path.join(__dirname, '../data/products.json');
  }

  async getAllProducts() {
    try {
      const data = await fs.promises.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      throw new Error('Error al leer los productos');
    }
  }

  async getProductById(pid) {
    try {
      const products = await this.getAllProducts();
      return products.find(product => product.id === pid);
    } catch (error) {
      throw new Error('Error al obtener el producto');
    }
  }

  async addProduct(product) {
    try {
      const products = await this.getAllProducts();
      const newId = Date.now().toString();
      const newProduct = { ...product, id: newId };
      products.push(newProduct);
      await fs.promises.writeFile(this.filePath, JSON.stringify(products, null, 2));
      return newProduct;
    } catch (error) {
      throw new Error('Error al agregar el producto');
    }
  }

  async updateProduct(pid, updatedData) {
    try {
      const products = await this.getAllProducts();
      const productIndex = products.findIndex(product => product.id === pid);

      if (productIndex === -1) return null;

      const updatedProduct = { ...products[productIndex], ...updatedData };
      products[productIndex] = updatedProduct;
      await fs.promises.writeFile(this.filePath, JSON.stringify(products, null, 2));
      return updatedProduct;
    } catch (error) {
      throw new Error('Error al actualizar el producto');
    }
  }

  async deleteProduct(pid) {
    try {
      const products = await this.getAllProducts();
      const updatedProducts = products.filter(product => product.id !== pid);
      
      if (products.length === updatedProducts.length) return null;

      await fs.promises.writeFile(this.filePath, JSON.stringify(updatedProducts, null, 2));
      return true;
    } catch (error) {
      throw new Error('Error al eliminar el producto');
    }
  }
}

module.exports = ProductManager;