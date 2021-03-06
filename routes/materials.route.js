const express = require('express');
const materialController = require('../controllers/material.controller');
const isAuth = require('../middlewares/isAuth');

const router = express.Router();

/**
 * GET /api/materials
 * @summary 取得全部素材
 * @security apiKeyAuth
 * @tags materials
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
router.get('/', isAuth, materialController.getAll);

module.exports = router;
