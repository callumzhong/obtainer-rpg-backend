const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

const generateSendJWT = (user) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_DAY,
  });
  return { token };
};

const signUp = async ({
  account, password, email,
}) => {
  const hashed = await bcrypt.hash(password, 12);
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
    return '用戶不存在';
  }
  const auth = await bcrypt.compare(password, user.passwordHash);
  if (!auth) {
    return '密碼不正確';
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
  const user = await User.findById(id).select('+email');
  return user;
};

module.exports = {
  signUp,
  signIn,
  updatePassword,
  updateProfile,
  getOne,
};