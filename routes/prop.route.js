const express = require('express');
const propController = require('../controllers/prop.controller');
const propValidation = require('../validations/prop.validation');
const validator = require('../middlewares/validator');
const isAuth = require('../middlewares/isAuth');

const router = express.Router();

/**
 * @typedef {object} attributes
 * @property {number} satiety
 * @property {number} mood
 */

/**
 * @typedef {object} updateFormula
 * @property {string} material
 * @property {number} amount
 */

/**
 * @typedef {object} createProp
 * @property {string} type
 * @property {string} name
 * @property {string} url
 * @property {string} description
 * @property {attributes} attributes
 */

/**
 * POST /api/prop
 * @summary 新增道具
 * @security apiKeyAuth
 * @tags prop
 * @param {createProp} request.body.required
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
router.post(
  '/',
  validator(propValidation.create),
  propController.create,
);

/**
 * GET /api/prop/{id}
 * @summary 取得道具
 * @security apiKeyAuth
 * @tags prop
 * @param {string} id.path.required - propId
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
router.get(
  '/:id',
  isAuth,
  validator(propValidation.getOne),
  propController.getOne,
);

/**
 * PATCH /api/prop/formula/{id}
 * @summary 更新道具配方
 * @security apiKeyAuth
 * @tags prop
 * @param {string} id.path.required - propId
 * @param {array<updateFormula>} request.body.required
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
router.patch(
  '/formula/:id',
  isAuth,
  validator(propValidation.updatePropFormula),
  propController.updatePropFormula,
);

/**
 * DELETE /api/prop/formula/{id}
 * @summary 刪除道具配方
 * @security apiKeyAuth
 * @tags prop
 * @param {string} id.path.required - propId
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
router.delete(
  '/formula/:id',
  isAuth,
  validator(propValidation.deletePropFormula),
  propController.deletePropFormula,
);

module.exports = router;
