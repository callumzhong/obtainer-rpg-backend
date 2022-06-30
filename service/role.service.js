const Role = require('../models/role.model');
const checkForDuplication = require('../helpers/checkForDublication');
const AppError = require('../helpers/appError');

const create = async ({
  userId, name, url, attributes,
}) => {
  const isMax = (await Role.find({ user: userId }).count()) >= 3;
  if (isMax) {
    throw new AppError(400, '角色欄位不足');
  }
  await checkForDuplication(Role, [{ name }]);
  const role = await Role.create({
    user: userId,
    name,
    url,
    attributes,
  });
  return role;
};

const deleteOne = async (roleId) => {
  const role = await Role.findByIdAndDelete(roleId);
  if (!role) {
    throw new AppError(400, '角色不存在');
  }
  return role;
};

const updatedName = async ({ roleId, name }) => {
  await checkForDuplication(Role, [{ name }]);
  const role = await Role.findByIdAndUpdate(roleId, { name });
  if (!role) {
    throw new AppError(400, '角色不存在');
  }
  return role;
};

const getAll = async (userId) => {
  const role = await Role.find({ user: userId }).lean();
  return role;
};

const getOne = async (roleId) => {
  const role = await Role.findById(roleId).lean().populate('inventory');
  return role;
};

module.exports = {
  create,
  getAll,
  deleteOne,
  updatedName,
  getOne,
};
