const model = require('../models');

const getAllProducts = async () => {
  const result = await model.productsModel.findAll();
  if (!result) return { type: 'Invalid Product', message: 'Product not found' };
  return { type: null, message: result };
};

const getProductsById = async (id) => {
  const result = await model.productsModel.findById(id);
  if (!result) return { type: 'Invalid Product', message: 'Product not found' };
  return { type: null, message: result };
};

module.exports = {
  getAllProducts,
  getProductsById,
};
