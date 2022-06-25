const Joi = require('joi');
const { Types } = require('mongoose');

const JoiObjectId = () => Joi.string().custom((value, helpers) => {
  if (!Types.ObjectId.isValid(value)) {
    return helpers.error('any.invalid');
  }
  return value;
}, 'ObjectId validation');

module.exports = {
  JoiObjectId,
};
