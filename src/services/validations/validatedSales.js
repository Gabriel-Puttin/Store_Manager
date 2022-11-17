const model = require('../../models');

const validateQuantity = (arr) => {
  if (arr.some(({ quantity }) => Number(quantity) <= 0)) {
    return {
      type: 'INVALID_QUANTITY',
      message: '"quantity" must be greater than or equal to 1',
    };
  }
  if (arr.some(({ quantity }) => !quantity)) {
    return { type: 'QUANTITY_REQUIRED', message: '"quantity" is required' };
  }
  return { type: null, message: '' };
};

const validatedProductId = async (arr) => {
  if (arr.some(({ productId }) => !productId)) {
    return { type: 'PRODUCT_ID_REQUIRED', message: '"productId" is required' };
  }

  const products = await Promise.all(
    arr.map(({ productId }) => model.productsModel.findById(productId)),
  );

  if (products.some((product) => !product)) {
    return {
      type: 'PRODUCT_NOT_FOUND',
      message: 'Product not found',
    };
  }
  return { type: null, message: '' };
};

const validateSaleId = async (id) => {
  const result = await model.salesModel.findById(id);
  if (result.length === 0) {
    return { type: 'SALES_NOT_FOUND', message: 'Sale not found' };
  }
  return { type: null, message: '' };
};

module.exports = {
  validateQuantity,
  validatedProductId,
  validateSaleId,
};