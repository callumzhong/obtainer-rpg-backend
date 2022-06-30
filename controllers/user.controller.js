const catchAsync = require('../helpers/catchAsync');
const userService = require('../service/user.service');

const signUp = catchAsync(async (req, res) => {
  const { email, password, account } = req.body;
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
  res.status(200).json(result);
});

const updatePassword = catchAsync(async (req, res) => {
  const { password } = req.body;
  const result = await userService.updatePassword({
    userId: req.user._id.toString(),
    password,
  });

  res.status(200).json(result);
});

const updateProfile = catchAsync(async (req, res) => {
  const { email } = req.body;
  const user = await userService.updateProfile({
    userId: req.user._id.toString(),
    email,
  });
  res.status(200).json(user);
});

const getProfile = catchAsync(async (req, res) => {
  res.status(200).json(req.user);
});

const checkAuth = catchAsync(async (req, res) => {
  res.status(200).send('已授權');
});

module.exports = {
  signUp,
  signIn,
  updateProfile,
  updatePassword,
  getProfile,
  checkAuth,
};
