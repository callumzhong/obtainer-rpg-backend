const catchAsync = require('../helpers/catchAsync');
const AppError = require('../helpers/appError');
const userService = require('../service/user.service');

const signUp = catchAsync(async (req, res) => {
  const {
    email, password, confirmPassword, account,
  } = req.body;
  if (password !== confirmPassword) {
    throw new AppError(400, '密碼不一致!');
  }
  const result = await userService.signUp({
    email,
    password,
    account,
  });
  res.status(200).json(result);
});

const signIn = catchAsync(async (req, res) => {
  const { account, password } = req.body;
  const result = await userService.signIn({ account, password });
  if (typeof result === 'string') {
    throw new AppError(400, result);
  }
  res.status(200).json(result);
});

const updatePassword = catchAsync(async (req, res) => {
  const { password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    throw new AppError(400, '密碼不一致!');
  }
  const result = await userService.updatePassword({
    userId: req.user.id,
    password,
  });

  res.status(200).json(result);
});

const updateProfile = catchAsync(async (req, res) => {
  const { email } = req.body;
  const user = userService.updateProfile({ userId: req.user.id, email });
  res.status(200).json(user);
});

const getProfile = catchAsync(async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = {
  signUp,
  signIn,
  updateProfile,
  updatePassword,
  getProfile,
};
