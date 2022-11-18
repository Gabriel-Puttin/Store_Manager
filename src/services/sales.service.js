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

const getAllSales = async () => {
  const sales = await model.salesModel.findAll();

  return { type: null, message: sales };
};

const getSalesById = async (id) => {
  const saleIdValidation = await salesValidations.validateSaleId(id);
  if (saleIdValidation.type) return saleIdValidation;
  const sale = await model.salesModel.findById(id);
  return { type: null, message: sale };
};

const deleteSale = async (saleId) => {
  const verifySaleId = await salesValidations.validateSaleId(saleId);
  if (verifySaleId.type) return verifySaleId;

  const id = await model.salesModel.deleteSale(saleId);
  return { type: null, message: id };
};

const updateSales = async (arr, id) => {
  const quantityValidation = salesValidations.validateQuantity(arr);
  if (quantityValidation.type) return quantityValidation;

  const productIdValidation = await salesValidations.validatedProductId(arr);
  if (productIdValidation.type) return productIdValidation;

  const verifySaleId = await salesValidations.validateSaleId(id);
  if (verifySaleId.type) return verifySaleId;

  const response = arr
    .map(async (sale) => model.salesModel.updateSales(sale, id));
  await Promise.all(response);
  return { type: null, message: arr };
};

module.exports = {
  createNewSalesProducts,
  getAllSales,
  getSalesById,
  deleteSale,
  updateSales,
};