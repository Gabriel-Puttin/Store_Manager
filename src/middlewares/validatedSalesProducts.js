const model = require('../models');

const HTTP_BAD_REQUEST_STATUS = 400;
const HTTP_UNPROCESSABLE_ENTITY_STATUS = 422;
const HTTP_NOT_FOUND_STATUS = 404;

const product = async (id) => {
  const response = await model.productsModel.findById(id);
  return response;
};

const validatedProductId = async (req, res, next) => {
  const arr = req.body;
  const validations = arr.map(async (item) => {
    if (!Object.keys(item).includes('productId')) {
      return res.status(HTTP_BAD_REQUEST_STATUS).send({ message: '"productId" is required' });
    }
    if (!(await product(item.productId))) {
      return res.status(HTTP_NOT_FOUND_STATUS).send({ message: 'Product not found' });
    }
  });
  await Promise.all(validations);
  return next();
};

const validatedQuantity = (req, res, next) => {
  const arr = req.body;
  arr.forEach((item) => {
    if (!Object.keys(item).includes('quantity')) {
      return res.status(HTTP_BAD_REQUEST_STATUS).send({ message: '"quantity" is required' });
    }
    if (item.quantity <= 0) {
      return res.status(HTTP_UNPROCESSABLE_ENTITY_STATUS)
        .send({ message: '"quantity" must be greater than or equal to 1' });
    }
  });
  return next();
};

module.exports = {
  validatedProductId,
  validatedQuantity,
};