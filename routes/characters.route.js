const express = require('express');
const characterController = require('../controllers/character.controller');
const isAuth = require('../middlewares/isAuth');

const router = express.Router();

/**
 * GET /api/characters
 * @summary 取得全部角色
 * @tags characters
 * @security apiKeyAuth
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
router.get('/', isAuth, characterController.getAll);

module.exports = router;
