const express = require('express');
const inventoryController = require('../controllers/inventory.controller');
const inventoryValidation = require('../validations/inventory.validation');
const validator = require('../middlewares/validator');
const isAuth = require('../middlewares/isAuth');

const router = express.Router();

/**
 * @typedef {object} reduceProp
 * @property {string} propId
 */

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
/**
 * POST /api/inventory/use_prop
 * @summary 使用道具
 * @security apiKeyAuth
 * @tags inventory
 * @param {reduceProp} request.body.required
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
router.post(
  '/use_prop',
  isAuth,
  validator(inventoryValidation.reduceProp),
  inventoryController.reduceProp,
);

module.exports = router;
