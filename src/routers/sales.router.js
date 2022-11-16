const express = require('express');
const salesController = require('../controllers/sales.controller');
const {
  validatedProductId,
  validatedQuantity,
} = require('../middlewares/validatedSalesProducts');

const router = express.Router();

router.post('/',
  validatedProductId,
  validatedQuantity,
  salesController.createSale);

module.exports = router;