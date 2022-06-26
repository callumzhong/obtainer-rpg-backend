const Joi = require('joi');
const validations = require('../helpers/validations');

const create = {
  body: Joi.object({
    name: Joi.string().min(2).max(8).required(),
    url: Joi.string().required(),
  }).required(),
};

const deleteOne = {
  params: Joi.object({
    id: validations.JoiObjectId().required(),
  }).required(),
};

const updatedName = {
  params: Joi.object({
    id: validations.JoiObjectId().required(),
  }),
  body: Joi.object({
    name: Joi.string().min(2).max(8).required(),
  }).required(),
};

module.exports = {
  create,
  deleteOne,
  updatedName,
};
