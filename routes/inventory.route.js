const express = require('express');
const inventoryController = require('../controllers/inventory.controller');
const inventoryValidation = require('../validations/inventory.validation');
const validator = require('../middlewares/validator');
const isAuth = require('../middlewares/isAuth');

const router = express.Router();

/**
 * GET /api/inventory
 * @summary 取得物品欄資料
 * @security apiKeyAuth
 * @tags inventory
 * @param {string} type.query.required - type param description
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
router.get(
  '/',
  isAuth,
  validator(inventoryValidation.getAll),
  inventoryController.getAll,
);
/**
 * GET /api/inventory/gashapon
 * @summary 取得扭蛋獎品
 * @security apiKeyAuth
 * @tags inventory
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
router.get(
  '/gashapon',
  isAuth,
  inventoryController.getGashaponProp,
);

module.exports = router;
