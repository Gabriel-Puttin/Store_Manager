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

const deleteProduct = async (productId) => {
  const verifyId = await verifyProductId(productId);
  if (verifyId.type) return verifyId;

  const id = await model.productsModel.deleteProduct(productId);
  return { type: null, message: id };
};

const searchProducts = async (name) => {
  const result = await model.productsModel.searchProductByName(name);
  return { type: null, message: result };
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
};
