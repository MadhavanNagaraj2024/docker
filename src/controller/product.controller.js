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

    const catchedData = await redisClient.get(cacheKey);

    if (catchedData) {
      console.log("✅ Data from cache...!");
      return res.status(200).json(JSON.parse(catchedData));
    }

    console.log("❌ Cache MISS");

    const products = await orderService.displayProducts();

    await redisClient.set(cacheKey, JSON.stringify(products), {
      EX: 60,
    });

    for (let i = 0; i < 10000; i++) {
      process.stdout.write(`\rCounter : ${i + 1}`);
    }

    res.status(200).json(products);
  } catch (error) {
    console.log("Error while getting PRoducts ...?", error);
  }
}

module.exports = { createProduct, displayProducts };
