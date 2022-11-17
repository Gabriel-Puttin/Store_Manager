const salesServices = require('../services/sales.service');
const errorMap = require('../utils/errorMap');

const HTTP_CREATE_STATUS = 201;

const createSale = async (req, res) => {
  const arr = req.body;
  const { type, message } = await salesServices.createNewSalesProducts(arr);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(HTTP_CREATE_STATUS).json(message);
};

module.exports = {
  createSale,
};