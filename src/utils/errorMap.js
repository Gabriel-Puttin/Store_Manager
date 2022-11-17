const errorMap = {
  QUANTITY_REQUIRED: 400,
  INVALID_QUANTITY: 422,
  PRODUCT_ID_REQUIRED: 400,
  PRODUCT_NOT_FOUND: 404,
  SALES_NOT_FOUND: 404,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  errorMap,
  mapError,
};