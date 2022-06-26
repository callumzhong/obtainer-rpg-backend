const express = require('express');
const roleController = require('../controllers/role.controller');
const isAuth = require('../middlewares/isAuth');

const router = express.Router();

/**
 * GET /api/roles
 * @summary 取得全部角色
 * @tags roles
 * @security apiKeyAuth
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
router.get('/', isAuth, roleController.getAll);

module.exports = router;
