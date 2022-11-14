const HTTP_BAD_REQUEST_STATUS = 400;
const HTTP_UNPROCESSABLE_ENTITY_STATUS = 422;

const validatedProductName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(HTTP_BAD_REQUEST_STATUS).send({ message: '"name" is required' });
  }
  if (name.length < 5) {
    return res.status(HTTP_UNPROCESSABLE_ENTITY_STATUS)
      .send({ message: '"name" length must be at least 5 characters long' });
  }
  return next();
};

module.exports = validatedProductName;