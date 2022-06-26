const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const checkForDuplication = require('../helpers/checkForDublication');
const AppError = require('../helpers/appError');

const generateSendJWT = (user) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_DAY,
  });
  return { token };
};

const signUp = async ({ account, password, email }) => {
  const hashed = await bcrypt.hash(password, 12);
  await checkForDuplication(User, [{ account }, { email }]);
  const user = await User.create({
    account,
    passwordHash: hashed,
    email,
  });
  const createdToken = generateSendJWT(user);
  return createdToken;
};

const signIn = async ({ account, password }) => {
  const user = await User.findOne({ account }).select('+passwordHash');
  if (!user) {
    throw new AppError(400, '用戶不存在');
  }
  const auth = await bcrypt.compare(password, user.passwordHash);
  if (!auth) {
    throw new AppError(400, '密碼不正確');
  }
  const createdToken = generateSendJWT(user);
  return createdToken;
};

const updatePassword = async ({ password, userId }) => {
  const newPassword = await bcrypt.hash(password, 12);
  const user = await User.findByIdAndUpdate(userId, {
    passwordHash: newPassword,
  });
  const createdToken = generateSendJWT(user);
  return createdToken;
};

const updateProfile = async ({ userId, email }) => {
  const update = {};
  if (email) {
    update.email = email;
  }
  const user = await User.findByIdAndUpdate(userId, update);
  return user;
};

const getOne = async (id) => {
  const user = await User.findById(id).select('+email').lean();
  return user;
};

module.exports = {
  signUp,
  signIn,
  updatePassword,
  updateProfile,
  getOne,
};
