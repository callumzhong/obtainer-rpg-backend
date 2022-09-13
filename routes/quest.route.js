const express = require('express');
const questController = require('../controllers/quest.controller');
const questValidation = require('../validations/quest.validation');
const validator = require('../middlewares/validator');
const isAuth = require('../middlewares/isAuth');

const router = express.Router();

/**
 * @typedef {object} notion
 * @property {string} key
 * @property {number} initialMinutePoint
 */

/**
 * @typedef {object} createQuest
 * @property {string} title
 * @property {string} description
 * @property {string} type
 * @property {string} characterId
 * @property {string} propId
 * @property {number} expectedMinutePoint
 * @property {notion} notion
 */

/**
 * @typedef {object} updatedConsumed
 * @property {number} consumedMinutePoint
 */

/**
 * POST /api/quest
 * @summary 新增探索
 * @security apiKeyAuth
 * @tags quest
 * @param {createQuest} request.body.required
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
router.post(
  '/',
  isAuth,
  validator(questValidation.create),
  questController.create,
);

/**
 * GET /api/quest/{id}
 * @summary 取得探索
 * @tags quest
 * @security apiKeyAuth
 * @param {string} id.path.required - questId
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
router.get(
  '/:id',
  isAuth,
  validator(questValidation.getOne),
  questController.getOne,
);

/**
 * PATCH /api/quest/{id}
 * @summary 更新耗用時間
 * @tags quest
 * @security apiKeyAuth
 * @param {string} id.path.required - questId
 * @param {updatedConsumed} request.body.required
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
router.patch(
  '/:id',
  isAuth,
  validator(questValidation.updatedConsumed),
  questController.updatedConsumed,
);

/**
 * DELETE /api/quest/{id}
 * @summary 刪除探索
 * @tags quest
 * @security apiKeyAuth
 * @param {string} id.path.required - propId
 * @param {}
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
router.delete(
  '/:id',
  isAuth,
  validator(questValidation.deleteOne),
  questController.deleteOne,
);

module.exports = router;
