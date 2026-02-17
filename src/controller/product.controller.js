const orderService = require("../service/product.service");

async function createProduct(req, res) {
  try {
    const { product, price } = req.body;

    const result = await orderService.addProduct(product, price);
    res.status(201).json(result);
  } catch (error) {
    console.log("Error while adding product ....?", error);
  }
}

async function displayProducts(req, res) {
  try {
    const products = await orderService.displayProducts();

    res.status(200).json(products);
  } catch (error) {
    console.log("Error while getting PRoducts ...?", error);
  }
}

module.exports = { createProduct, displayProducts };
