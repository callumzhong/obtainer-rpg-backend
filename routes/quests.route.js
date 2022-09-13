const express = require('express');
const questController = require('../controllers/quest.controller');
const questValidation = require('../validations/quest.validation');
const validator = require('../middlewares/validator');
const isAuth = require('../middlewares/isAuth');

const router = express.Router();

/**
 * GET /api/quests
 * @summary 取得全部探索
 * @security apiKeyAuth
 * @tags quests
 * @param {string} character.query.required - characterId
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
router.get(
  '/',
  isAuth,
  validator(questValidation.getAll),
  questController.getAll,
);

module.exports = router;
