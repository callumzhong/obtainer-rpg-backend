const jwt = require('jsonwebtoken');
const AppError = require('../helpers/appError');
const catchAsync = require('../helpers/catchAsync');
const userService = require('../service/user.service');

const isAuth = catchAsync(async (req, res, next) => {
  // 確認 token 是否存在
  let token = '';
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ').pop();
  }

  if (!token) {
    throw new AppError(401, '你尚未登入!');
  }

  // 驗證 token 正確性
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const currentUser = await userService.getOne(decoded.id);
  console.log(currentUser);
  if (!currentUser) {
    throw new AppError(400, '查無用戶');
  }
  req.user = currentUser;
  next();
});

module.exports = isAuth;
