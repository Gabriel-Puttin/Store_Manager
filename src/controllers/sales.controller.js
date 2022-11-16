const salesServices = require('../services/sales.service');

const HTTP_CREATE_STATUS = 201;

const createSale = async (req, res) => {
  const arr = req.body;
  const response = await salesServices.createNewSalesProducts(arr);
  res.status(HTTP_CREATE_STATUS).json(response.message);
};

module.exports = {
  createSale,
};