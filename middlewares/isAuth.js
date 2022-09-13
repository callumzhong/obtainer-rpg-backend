const jwt = require('jsonwebtoken');
const AppError = require('../helpers/appError');
const catchAsync = require('../helpers/catchAsync');
const userService = require('../service/user.service');

const isAuth = catchAsync(async (req, res, next) => {
  // 確認 token 是否存在
  let token = '';
  if (
    req.headers.authorization
    && req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ').pop();
  }

  if (!token) {
    throw new AppError(401, '沒有權限');
  }

  // 驗證 token 正確性
  return jwt.verify(
    token,
    process.env.JWT_SECRET,
    async (err, decoded) => {
      if (err) {
        throw new AppError(400, '令牌不合法');
      }
      const currentUser = await userService.getOne(
        decoded._id,
      );
      if (!currentUser) {
        throw new AppError(400, '用戶不存在或權限到期');
      }
      req.user = currentUser;
      next();
    },
  );
});

module.exports = isAuth;
