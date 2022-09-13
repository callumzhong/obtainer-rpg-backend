const Joi = require('joi');
const validations = require('../helpers/validations');

const create = {
  body: Joi.object({
    type: Joi.string()
      .valid('ORE', 'METAL', 'WOOD', 'MEAT')
      .required(),
    rarity: Joi.string()
      .valid('WHITE', 'GREEN', 'BLUE', 'PURPLE', 'ORANGE')
      .required(),
    name: Joi.string().required(),
    url: Joi.string().required(),
    description: Joi.string().required(),
  }).required(),
};

const collectOne = {
  body: Joi.object({
    type: Joi.string()
      .valid('ORE', 'METAL', 'WOOD', 'MEAT')
      .required(),
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

module.exports = {
  create,
  getOne,
  deleteOne,
  collectOne,
};
