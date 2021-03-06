const Joi = require('joi');
const validations = require('../helpers/validations');

const create = {
  body: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    type: Joi.string().valid('NOTION', 'PRIVATE').required(),
    roleId: validations.JoiObjectId().required(),
    propId: validations.JoiObjectId().required(),
    minutePoint: Joi.number().required(),
    notion: Joi.object({
      key: Joi.string(),
      initialMinutePoint: Joi.number(),
    }),
  }).required(),
};

const deleteOne = {
  params: Joi.object({
    id: validations.JoiObjectId().required(),
  }).required(),
};

const getAll = {
  query: Joi.object({
    role: validations.JoiObjectId().required(),
  }).required(),
};

const getOne = {
  params: Joi.object({
    id: validations.JoiObjectId().required(),
  }).required(),
};

module.exports = {
  create,
  getOne,
  getAll,
  deleteOne,
};
