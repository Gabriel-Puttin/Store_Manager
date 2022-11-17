const model = require('../models');
const salesValidations = require('./validations/validatedSales');

const createNewSalesProducts = async (arr) => {
  const quantityValidation = salesValidations.validateQuantity(arr);
  if (quantityValidation.type) return quantityValidation;
  const productIdValidation = await salesValidations.validatedProductId(arr);
  if (productIdValidation.type) return productIdValidation;
  const saleId = await model.salesModel.insertSales();
  const response = arr
    .map(async (sale) => model.salesModel.insertSalesProducts(saleId, sale));
  await Promise.all(response);
  return { type: null, message: { id: saleId, itemsSold: arr } };
};

module.exports = {
  createNewSalesProducts,
};