const productsService = require('../services/products.service');

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND_STATUS = 404;
const HTTP_SERVER_ERROR_STATUS = 500;

const getAllProducts = async (_req, res) => {
  try {
    const result = await productsService.getAllProducts();
    if (result.type !== null) {
      return res.status(HTTP_NOT_FOUND_STATUS).send({ message: result.message });
    }
    res.status(HTTP_OK_STATUS).json(result.message);
  } catch (error) {
    res.status(HTTP_SERVER_ERROR_STATUS).send({ message: error.message });
  }
};

const getProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productsService.getProductsById(Number(id));
    if (result.type !== null) {
      return res.status(HTTP_NOT_FOUND_STATUS).send({ message: result.message });
    }
    res.status(HTTP_OK_STATUS).json(result.message);
  } catch (error) {
    res.status(HTTP_SERVER_ERROR_STATUS).send({ message: error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductsById,
};