const express = require('express');
const salesController = require('../controllers/sales.controller');

const router = express.Router();

router.get('/', salesController.getAllSales);

router.get('/:id', salesController.getSaleById);

router.post('/', salesController.createSale);

router.put('/:id', salesController.updateSales);

router.delete('/:id', salesController.deleteSale);

module.exports = router;