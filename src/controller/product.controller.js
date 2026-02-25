const orderService = require("../service/product.service");
const redisClient = require("../config/redis.config");

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
    const cacheKey = "products:all";

    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      console.log("✅ Cache HIT");
      return res.status(200).json(JSON.parse(cachedData));
    }

    console.log("❌ Cache MISS");

    const products = await orderService.displayProducts();

    await redisClient.set(cacheKey, JSON.stringify(products), { EX: 60 });

    console.log("Saved to Redis");

    res.status(200).json(products);
  } catch (error) {
    console.log("Error:", error);
  }
}

module.exports = { createProduct, displayProducts };
