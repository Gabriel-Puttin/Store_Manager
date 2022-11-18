const productsService = require('../services/products.service');
const errorMap = require('../utils/errorMap');

const HTTP_OK_STATUS = 200;
const HTTP_NO_CONTENT_STATUS = 204;
const HTTP_NOT_FOUND_STATUS = 404;
const HTTP_CREATE_STATUS = 201;

const getAllProducts = async (_req, res) => {
  const result = await productsService.getAllProducts();
  if (result.type !== null) {
    return res.status(HTTP_NOT_FOUND_STATUS).send({ message: result.message });
  }
  res.status(HTTP_OK_STATUS).json(result.message);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;
  const result = await productsService.getProductsById(Number(id));
  if (result.type !== null) {
    return res.status(HTTP_NOT_FOUND_STATUS).send({ message: result.message });
  }
  res.status(HTTP_OK_STATUS).json(result.message);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const result = await productsService.createProduct(name);
  res.status(HTTP_CREATE_STATUS).json(result.message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { type, message } = await productsService.updateProduct(name, Number(id));
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(HTTP_OK_STATUS).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.deleteProduct(Number(id));
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(HTTP_NO_CONTENT_STATUS).end();
};

const searchProducts = async (req, res) => {
  const { q } = req.query;
  const { message } = await productsService.searchProducts(q);
  res.status(HTTP_OK_STATUS).json(message);
};

module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
};
