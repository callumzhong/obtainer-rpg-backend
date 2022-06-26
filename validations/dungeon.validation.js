const Joi = require('joi');
const validations = require('../helpers/validations');

const create = {
  body: Joi.object({
    name: Joi.string().required(),
    url: Joi.string().required(),
    description: Joi.string().required(),
    pointByX: Joi.number().required(),
    pointByY: Joi.number().required(),
    monsters: Joi.array().items(
      Joi.object({
        monster: validations.JoiObjectId().required(),
        pointByX: Joi.number().required(),
        pointByY: Joi.number().required(),
      }),
    ),
  }).required(),
};

const getOne = {
  params: Joi.object({
    id: validations.JoiObjectId().required(),
  }).required(),
};

const deleteOne = {
  params: Joi.object({
    id: validations.JoiObjectId().required(),
  }).required(),
};

const updateMonster = {
  params: Joi.object({
    id: validations.JoiObjectId().required(),
  }).required(),
  body: Joi.array()
    .items(
      Joi.object({
        monster: validations.JoiObjectId().required(),
        pointByX: Joi.number().required(),
        pointByY: Joi.number().required(),
      }),
    )
    .required(),
};

const deleteMonster = {
  params: Joi.object({
    id: validations.JoiObjectId().required(),
  }).required(),
};

module.exports = {
  create,
  getOne,
  deleteOne,
  updateMonster,
  deleteMonster,
};
