const Joi = require('joi');

const getAll = {
  query: Joi.object({
    type: Joi.string().valid('MATERIAL', 'PROP').required(),
  }).required(),
};

module.exports = {
  getAll,
};
