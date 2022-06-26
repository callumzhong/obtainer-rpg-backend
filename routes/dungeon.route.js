const express = require('express');
const dungeonController = require('../controllers/dungeon.controll');
const dungeonValidation = require('../validations/dungeon.validation');
const validator = require('../middlewares/validator');
const isAuth = require('../middlewares/isAuth');

const router = express.Router();

/**
 * @typedef {object} monster
 * @property {string} monster
 * @property {number} pointByX
 * @property {number} pointByY
 */

/**
 * @typedef {object} createDungeon
 * @property {string} name
 * @property {string} url
 * @property {string} description
 * @property {number} pointByX
 * @property {number} pointByY
 * @property {array<monster>} monsters
 */

/**
 * POST /api/dungeon
 * @summary 新增地牢
 * @security apiKeyAuth
 * @tags dungeon
 * @param {createDungeon} request.body.required
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
router.post('/', isAuth, validator(dungeonValidation.create), dungeonController.create);

/**
 * GET /api/dungeon/{id}
 * @summary 取得地牢
 * @security apiKeyAuth
 * @tags dungeon
 * @param {string} id.path.required - dungeonId
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
router.get('/:id', isAuth, validator(dungeonValidation.getOne), dungeonController.getOne);

/**
 * DELETE /api/dungeon/{id}
 * @summary 刪除地牢
 * @security apiKeyAuth
 * @tags dungeon
 * @param {string} id.path.required - dungeonId
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
router.delete('/:id', isAuth, validator(dungeonValidation.deleteOne), dungeonController.deleteOne);

/**
 * PATCH /api/dungeon/monster/{id}
 * @summary 更新地牢怪物
 * @security apiKeyAuth
 * @tags dungeon
 * @param {string} id.path.required - dungeonId
 * @param {array<monster>} request.body.required
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
router.patch(
  '/monster/:id',
  isAuth,
  validator(dungeonValidation.updateMonster),
  dungeonController.updateMonster,
);

/**
 * DELETE /api/dungeon/monster/{id}
 * @summary 清空地牢怪物
 * @security apiKeyAuth
 * @tags dungeon
 * @param {string} id.path.required - dungeonId
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
router.delete(
  '/monster/:id',
  isAuth,
  validator(dungeonValidation.deleteMonster),
  dungeonController.deleteMonster,
);

module.exports = router;
