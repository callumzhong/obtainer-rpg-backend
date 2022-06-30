const express = require('express');
const roleController = require('../controllers/role.controller');
const roleValidation = require('../validations/role.validation');
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
 * @typedef {object} createRole
 * @property {string} name.required
 * @property {string} url.required
 * @property {attributes} attributes.required
 */

/**
 * @typedef {object} updatedName
 * @property {string} name.required
 */

/**
 * POST /api/role
 * @summary 新增角色
 * @tags role
 * @security apiKeyAuth
 * @param {createRole} request.body.required
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
router.post(
  '/',
  isAuth,
  validator(roleValidation.create),
  roleController.create,
);

/**
 * DELETE /api/role/{id}
 * @summary 刪除角色
 * @tags role
 * @security apiKeyAuth
 * @param {string} id.path.required - roleId
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
router.delete(
  '/:id',
  isAuth,
  validator(roleValidation.deleteOne),
  roleController.deleteOne,
);

/**
 * PATCH /api/role/{id}
 * @summary 重新命名
 * @tags role
 * @security apiKeyAuth
 * @param {string} id.path.required - roleId
 * @param {updatedName} request.body.required
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
router.patch(
  '/:id',
  isAuth,
  validator(roleValidation.updatedName),
  roleController.updatedName,
);

module.exports = router;
