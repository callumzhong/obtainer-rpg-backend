const express = require('express');
const characterController = require('../controllers/character.controller');
const characterValidation = require('../validations/character.validation');
const validator = require('../middlewares/validator');
const isAuth = require('../middlewares/isAuth');

const router = express.Router();

/**
 * @typedef {object} attributes
 * @property {number} str.required
 * @property {number} crit.required
 * @property {number} speed.required
 */

/**
 * @typedef {object} createCharacter
 * @property {string} name.required
 * @property {string} url.required
 * @property {attributes} attributes.required
 */

/**
 * @typedef {object} updatedName
 * @property {string} name.required
 */

/**
 * GET /api/character
 * @summary 取得角色
 * @tags character
 * @security apiKeyAuth
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
router.get('/', isAuth, characterController.getOne);

/**
 * POST /api/character
 * @summary 新增角色
 * @tags character
 * @security apiKeyAuth
 * @param {createCharacter} request.body.required
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
router.post(
  '/',
  isAuth,
  validator(characterValidation.create),
  characterController.create,
);

/**
 * DELETE /api/character/{id}
 * @summary 刪除角色
 * @tags character
 * @security apiKeyAuth
 * @param {string} id.path.required - characterId
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
router.delete(
  '/:id',
  isAuth,
  validator(characterValidation.deleteOne),
  characterController.deleteOne,
);

/**
 * PATCH /api/character/{id}
 * @summary 重新命名
 * @tags character
 * @security apiKeyAuth
 * @param {string} id.path.required - characterId
 * @param {updatedName} request.body.required
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
router.patch(
  '/:id',
  isAuth,
  validator(characterValidation.updatedName),
  characterController.updatedName,
);

module.exports = router;
