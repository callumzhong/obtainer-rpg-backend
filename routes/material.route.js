const express = require('express');
const materialController = require('../controllers/material.controller');
const materialValidation = require('../validations/material.validation');
const validator = require('../middlewares/validator');
const isAuth = require('../middlewares/isAuth');

const router = express.Router();

/**
 * @typedef {object} createMaterial
 * @property {string} type
 * @property {string} rarity
 * @property {string} name
 * @property {string} url
 * @property {string} description
 */

/**
 * POST /api/material
 * @summary 新增素材
 * @security apiKeyAuth
 * @tags material
 * @param {createMaterial} request.body.required
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
router.post('/', isAuth, validator(materialValidation.create), materialController.create);

/**
 * GET /api/material/{id}
 * @summary 取得素材
 * @security apiKeyAuth
 * @tags material
 * @param {string} id.path.required - materialId
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
router.get('/:id', isAuth, validator(materialValidation.getOne), materialController.getOne);

/**
 * DELETE /api/material/{id}
 * @summary 刪除素材
 * @tags material
 * @security apiKeyAuth
 * @param {string} id.path.required - materialId
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
router.delete(
  '/:id',
  isAuth,
  validator(materialValidation.deleteOne),
  materialController.deleteOne,
);

module.exports = router;
