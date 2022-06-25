const Joi = require('joi');

const signUp = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')),
    account: Joi.string().min(4).max(12).required(),
  }),
};

const signIn = {
  body: Joi.object({
    account: Joi.string().required(),
    password: Joi.string().min(8).required(),
  }),
};

const updatePassword = {
  body: Joi.object({
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')),
  }),
};

const updateProfile = {
  body: Joi.object({
    email: Joi.string().email(),
  }),
};

module.exports = {
  signUp,
  signIn,
  updatePassword,
  updateProfile,
};
