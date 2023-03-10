const express = require('express');
const productController = require('../controllers/products.controller');
const validatedProductName = require('../middlewares/validatedProductName');

const router = express.Router();

router.get('/search', productController.searchProducts);

router.get('/', productController.getAllProducts);

router.get('/:id', productController.getProductsById);

router.post('/', validatedProductName, productController.createProduct);

router.put('/:id', validatedProductName, productController.updateProduct);

router.delete('/:id', productController.deleteProduct);

module.exports = router;