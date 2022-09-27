const Joi = require('joi');
const validations = require('../helpers/validations');

const getAll = {
  query: Joi.object({
    type: Joi.string().valid('MATERIAL', 'PROP').required(),
  }).required(),
};

const reduceProp = {
  body: Joi.object({
    propId: validations.JoiObjectId().required(),
  }).required(),
};

module.exports = {
  getAll,
  reduceProp,
};
