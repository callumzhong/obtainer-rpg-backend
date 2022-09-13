const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const checkForDuplication = require('../helpers/checkForDuplication');
const AppError = require('../helpers/appError');

const generateSendJWT = (user) => {
  const token = jwt.sign(
    { _id: user._id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_DAY,
    },
  );
  return { token };
};

const getOne = async (_id) => {
  const user = await User.findById(_id).lean();

  if (!user) {
    throw new AppError(400, '用戶不存在');
  }
  return user;
};

const signUp = async ({ account, password, email }) => {
  const hashed = await bcrypt.hash(password, 12);
  const check = [{ account }];
  if (email) {
    check.push({ email });
  }
  await checkForDuplication(User, check);
  const create = {
    account,
    passwordHash: hashed,
  };
  if (email) {
    create.email = email;
  }
  const user = await User.create(create);
  const createdToken = generateSendJWT(user);
  return createdToken;
};

const signIn = async ({ account, password }) => {
  const user = await User.findOne({ account }).select(
    '+passwordHash',
  );
  if (!user) {
    throw new AppError(400, '用戶不存在');
  }
  const auth = await bcrypt.compare(
    password,
    user.passwordHash,
  );
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
  if (!user) {
    throw new AppError(400, '用戶不存在');
  }
  const updatedUser = await getOne(userId);
  return updatedUser;
};

module.exports = {
  signUp,
  signIn,
  updatePassword,
  updateProfile,
  getOne,
};
