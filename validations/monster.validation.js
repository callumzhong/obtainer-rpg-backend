const Joi = require('joi');
const validations = require('../helpers/validations');

const create = {
  body: Joi.object({
    name: Joi.string().required(),
    url: Joi.string().required(),
    experience: Joi.number().required(),
    blood: Joi.number().required(),
    drops: Joi.array().items(
      Joi.object({
        material: validations.JoiObjectId().required(),
        min: Joi.number().required(),
        max: Joi.number().required(),
      }),
    ),
    coin: Joi.object({
      min: Joi.number().required(),
      max: Joi.number().required(),
    }).required(),
  }).required(),
};

const getOne = {
  params: Joi.object({
    id: validations.JoiObjectId().required(),
  }).required(),
};

const updateDrop = {
  params: Joi.object({
    id: validations.JoiObjectId().required(),
  }).required(),
  body: Joi.array()
    .items(
      Joi.object({
        material: validations.JoiObjectId().required(),
        min: Joi.number().required(),
        max: Joi.number().required(),
      }),
    )
    .required(),
};

const deleteDrop = {
  params: Joi.object({
    id: validations.JoiObjectId().required(),
  }).required(),
};

module.exports = {
  create,
  getOne,
  updateDrop,
  deleteDrop,
};
