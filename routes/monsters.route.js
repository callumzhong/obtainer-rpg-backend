const express = require('express');
const monsterController = require('../controllers/monster.controller');
const isAuth = require('../middlewares/isAuth');

const router = express.Router();

/**
 * GET /api/monsters
 * @summary 取得全部怪物
 * @security apiKeyAuth
 * @tags monsters
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
router.get('/', isAuth, monsterController.getAll);

module.exports = router;
