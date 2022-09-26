const Joi = require('joi');
const validations = require('../helpers/validations');

const create = {
  body: Joi.object({
    type: Joi.string()
      .valid('DISH', 'ACTIVITY', 'LUXURY')
      .required(),
    name: Joi.string().max(20).required(),
    url: Joi.string().required(),
    description: Joi.string().required(),
    attributes: Joi.object({
      satiety: Joi.number(),
      mood: Joi.number(),
    }),
  }).required(),
};

const getOne = {
  params: Joi.object({
    id: validations.JoiObjectId().required(),
  }).required(),
};

const updatePropFormula = {
  params: Joi.object({
    id: validations.JoiObjectId().required(),
  }).required(),
  body: Joi.array()
    .items(
      Joi.object({
        material: validations.JoiObjectId().required(),
        amount: Joi.number().required(),
      }),
    )
    .required(),
};

const deletePropFormula = {
  params: Joi.object({
    id: validations.JoiObjectId().required(),
  }).required(),
};

module.exports = {
  create,
  getOne,
  updatePropFormula,
  deletePropFormula,
};
