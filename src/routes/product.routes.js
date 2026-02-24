const router = require("express").Router();
const productController = require("../controller/product.controller");

router.post("/", productController.createProduct);
router.get("/", productController.displayProducts);


module.exports = router;
