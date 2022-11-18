const updatedProduct = {
  type: null,
  message: {
    id: 1,
    name: 'lança de odin',
  }
};

const wrongUpdatedProduct = {
  type: 'PRODUCT_NOT_FOUND',
  message: 'Product not found'
};

module.exports = {
  updatedProduct,
  wrongUpdatedProduct,
};