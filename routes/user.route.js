const express = require('express');
const userController = require('../controllers/user.controller');
const userValidation = require('../validations/user.validation');
const validator = require('../middlewares/validator');
const isAuth = require('../middlewares/isAuth');

const router = express.Router();

/**
 * @typedef {object} signIn
 * @property {string} account.required
 * @property {string} password.required
 */

/**
 * @typedef {object} signUp
 * @property {string} account.required
 * @property {string} email.required
 * @property {string} password.required
 * @property {string} confirmPassword.required
 */

/**
 * @typedef {object} updateProfile
 * @property {string} email.required
 */

/**
 * @typedef {object} updatePassword
 * @property {string} password.required
 * @property {string} confirmPassword.required
 */

/**
 * GET /api/user/profile
 * @summary 取得個人資料
 * @tags user
 * @security apiKeyAuth
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
router.get('/profile', isAuth, userController.getProfile);

/**
 * POST /api/user/sign_in
 * @summary 登入
 * @tags user
 * @param {signIn} request.body.required
 * @example request
{
  "account":"qq123",
  "password": "12345678"
}
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
router.post('/sign_in', validator(userValidation.signIn), userController.signIn);

/**
 * POST /api/user/sign_up
 * @summary 註冊
 * @tags user
 * @param {signUp} request.body.required
 * @example request
{
  "account":"qq123",
  "email": "qq123@123.com",
  "password": "12345678",
  "confirmPassword":"12345678"
}
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
router.post('/sign_up', validator(userValidation.signUp), userController.signUp);

/**
 * PATCH /api/user/profile
 * @summary 更新個人資料
 * @tags user
 * @security apiKeyAuth
 * @param {updateProfile} request.body.required
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
router.patch(
  '/profile',
  isAuth,
  validator(userValidation.updateProfile),
  userController.updateProfile,
);

/**
 * POST /api/user/update_password
 * @summary 重設密碼
 * @tags user
 * @security apiKeyAuth
 * @param {updatePassword} request.body.required
 * @return {object} 200 - success response - application/json
 * @return {object} 400 - Bad request response
 */
router.post(
  '/update_password',
  isAuth,
  validator(userValidation.updatePassword),
  userController.updatePassword,
);

module.exports = router;
