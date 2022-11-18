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

const deletedProduct = {
  type: null,
  message: 1,
};

module.exports = {
  updatedProduct,
  wrongUpdatedProduct,
  deletedProduct,
};