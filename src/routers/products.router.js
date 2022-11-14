const express = require('express');
const productController = require('../controllers/products.controller');
const validatedProductName = require('../middlewares/validatedProductName');

const router = express.Router();

router.get('/', productController.getAllProducts);

router.get('/:id', productController.getProductsById);

router.post('/', validatedProductName, productController.createProduct);

module.exports = router;