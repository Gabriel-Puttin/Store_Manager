const express = require('express');
const productController = require('../controllers/products.controller');

const router = express.Router();

router.get('/', productController.getAllProducts);

router.get('/:id', productController.getProductsById);

router.post('/', productController.createProduct);

module.exports = router;