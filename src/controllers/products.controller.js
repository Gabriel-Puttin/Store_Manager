const productsService = require('../services/products.service');

const HTTP_OK_STATUS = 200;
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

module.exports = {
  getAllProducts,
  getProductsById,
  createProduct,
};
