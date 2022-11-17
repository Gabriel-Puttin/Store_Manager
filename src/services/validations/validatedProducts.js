const model = require('../../models');

const verifyProductId = async (id) => {
  const validationId = await model.productsModel.findById(id);

  if (!validationId) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: '' };
};

module.exports = {
  verifyProductId,
};