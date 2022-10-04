const Joi = require('joi');
const validations = require('../helpers/validations');

const create = {
  body: Joi.object({
    name: Joi.string().min(2).max(8).required(),
    // url: Joi.string().required(),
    // attributes: Joi.object({
    //   str: Joi.number().required(),
    //   crit: Joi.number().required(),
    //   speed: Joi.number().required(),
    // }).required(),
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

const updateAttributes = {
  params: Joi.object({
    id: validations.JoiObjectId().required(),
  }),
  body: Joi.object({
    satiety: Joi.number().required(),
    mood: Joi.number().required(),
  }).required(),
};

module.exports = {
  create,
  deleteOne,
  updatedName,
  updateAttributes,
};
