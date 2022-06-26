const Joi = require('joi');
const validations = require('../helpers/validations');

const create = {
  body: Joi.object({
    type: Joi.string().valid('ORE', 'METAL', 'WOOD').required(),
    rarity: Joi.string().valid('WHITE', 'GREEN', 'BLUE', 'PURPLE', 'ORANGE').required(),
    name: Joi.string().required(),
    url: Joi.string().required(),
    description: Joi.string().required(),
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
};
