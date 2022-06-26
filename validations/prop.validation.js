const Joi = require('joi');
const validations = require('../helpers/validations');

const create = {
  body: Joi.object({
    type: Joi.string().valid('KEY', 'ARM').required(),
    name: Joi.string().max(20).required(),
    url: Joi.string().required(),
    description: Joi.string().required(),
    effect: Joi.object({
      str: Joi.number(),
    }),
  }),
};

const getOne = {
  params: Joi.object({
    id: validations.JoiObjectId().required(),
  }),
};

module.exports = {
  create,
  getOne,
};
