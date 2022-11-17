const model = require('../models');
const { verifyProductId } = require('./validations/validatedProducts');

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

const createProduct = async (productName) => {
  const id = await model.productsModel.insertProduct(productName);
  return { type: null, message: { id, name: productName } };
};

const updateProduct = async (name, productId) => {
  const verifyId = await verifyProductId(productId);
  if (verifyId.type) return verifyId;

  const id = await model.productsModel.updateProduct(name, productId);
  return { type: null, message: { id, name } };
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
  updateProduct,
};
