const express = require('express');
const dungeonController = require('../controllers/dungeon.controll');
const isAuth = require('../middlewares/isAuth');

const router = express.Router();

/**
 * GET /api/dungeons
 * @summary 取得全部地牢
 * @security apiKeyAuth
 * @tags dungeons
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
router.get('/', isAuth, dungeonController.getAll);

module.exports = router;
