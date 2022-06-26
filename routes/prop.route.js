const express = require('express');
const propController = require('../controllers/prop.controller');
const propValidation = require('../validations/prop.validation');
const validator = require('../middlewares/validator');
const isAuth = require('../middlewares/isAuth');

const router = express.Router();

/**
 * @typedef {object} effect
 * @property {number} str
 */

/**
 * @typedef {object} createProp
 * @property {string} type
 * @property {string} name
 * @property {string} url
 * @property {string} description
 * @property {effect} effect
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
router.post('/', isAuth, validator(propValidation.create), propController.create);

/**
 * GET /api/prop/{id}
 * @summary 取得道具
 * @security apiKeyAuth
 * @tags prop
 * @param {string} id.path.required - propId
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
router.get('/:id', isAuth, validator(propValidation.getOne), propController.getOne);

module.exports = router;
