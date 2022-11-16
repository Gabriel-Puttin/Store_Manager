const model = require('../models');

const createNewSalesProducts = async (arr) => {
  const saleId = await model.salesModel.insertSales();
  const response = arr
    .map(async (sale) => model.salesModel.insertSalesProducts(saleId, sale));
  await Promise.all(response);
  return { type: null, message: { id: saleId, itemsSold: arr } };
};

module.exports = {
  createNewSalesProducts,
};