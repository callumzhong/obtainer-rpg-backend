const express = require('express');
const propController = require('../controllers/prop.controller');
const isAuth = require('../middlewares/isAuth');

const router = express.Router();

/**
 * GET /api/props
 * @summary 取得全部道具
 * @security apiKeyAuth
 * @tags props
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
router.get('/', isAuth, propController.getAll);

module.exports = router;
