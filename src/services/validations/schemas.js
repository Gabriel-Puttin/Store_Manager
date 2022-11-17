const Joi = require('joi');

const idSchema = Joi.number().min(1).integer().required();

module.exports = {
  idSchema,
};