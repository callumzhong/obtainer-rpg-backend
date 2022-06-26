const express = require('express');
const monsterController = require('../controllers/monster.controller');
const monsterValidation = require('../validations/monster.validation');
const validator = require('../middlewares/validator');
const isAuth = require('../middlewares/isAuth');

const router = express.Router();

/**
 * @typedef {object} drop
 * @property {string} material
 * @property {number} min
 * @property {number} max
 */

/**
 * @typedef {object} coin
 * @property {number} min
 * @property {number} max
 */

/**
 * @typedef {object} createMonster
 * @property {string} name
 * @property {string} url
 * @property {number} experience
 * @property {number} blood
 * @property {array<drop>} drops
 * @property {coin} coin
 */

/**
 * POST /api/monster
 * @summary 新增怪物
 * @security apiKeyAuth
 * @tags monster
 * @param {createMonster} request.body.required
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
router.post('/', isAuth, validator(monsterValidation.create), monsterController.create);

/**
 * GET /api/monster/{id}
 * @summary 取得怪物
 * @security apiKeyAuth
 * @tags monster
 * @param {string} id.path.required - monsterId
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
router.get('/:id', isAuth, validator(monsterValidation.getOne), monsterController.getOne);

/**
 * PATCH /api/monster/drop/{id}
 * @summary 更新掉落物
 * @security apiKeyAuth
 * @tags monster
 * @param {string} id.path.required - monsterId
 * @param {array<drop>} request.body.required
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
router.patch(
  '/drop/:id',
  isAuth,
  validator(monsterValidation.updateDrop),
  monsterController.updateDrop,
);

/**
 * DELETE /api/monster/drop/{id}
 * @summary 清空掉落物
 * @security apiKeyAuth
 * @tags monster
 * @param {string} id.path.required - monsterId
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
router.delete(
  '/drop/:id',
  isAuth,
  validator(monsterValidation.deleteDrop),
  monsterController.deleteDrop,
);

module.exports = router;
