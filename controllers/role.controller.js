const catchAsync = require('../helpers/catchAsync');
const roleService = require('../service/role.service');

const create = catchAsync(async (req, res) => {
  const { name, url, attributes } = req.body;
  const role = await roleService.create({
    userId: req.user._id.toString(),
    name,
    url,
    attributes,
  });
  res.status(200).json(role);
});

const getAll = catchAsync(async (req, res) => {
  const role = await roleService.getAll(req.user._id.toString());
  res.status(200).json(role);
});

const deleteOne = catchAsync(async (req, res) => {
  const { id: roleId } = req.params;
  await roleService.deleteOne(roleId);
  res.status(200).json();
});

const updatedName = catchAsync(async (req, res) => {
  const { id: roleId } = req.params;
  const { name } = req.body;
  let role = await roleService.updatedName({
    roleId,
    name,
  });
  role = await roleService.getOne(role.id);
  res.status(200).json(role);
});

module.exports = {
  create,
  getAll,
  deleteOne,
  updatedName,
};
