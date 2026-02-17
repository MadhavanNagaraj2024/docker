const productSchema = require("../model/product.model");

async function addProduct(product, price) {
  return productSchema.create({ product, price });
}

async function displayProducts() {
  return productSchema.find({}, { product: 1, price: 1, _id: 1 });
}

module.exports = { addProduct, displayProducts };
