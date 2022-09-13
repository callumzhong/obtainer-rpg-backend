const express = require('express');
const inventoryController = require('../controllers/inventory.controller');
const isAuth = require('../middlewares/isAuth');

const router = express.Router();

/**
 * GET /api/inventory
 * @summary 取得物品欄資料
 * @security apiKeyAuth
 * @tags inventory
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
router.get('/', isAuth, inventoryController.getAll);

module.exports = router;
