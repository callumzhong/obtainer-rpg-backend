const catchAsync = require('../helpers/catchAsync');
const questService = require('../service/quest.service');

const create = catchAsync(async (req, res) => {
  const {
    title, description, type, minutePoint, notion, propId, roleId,
  } = req.body;
  const model = {
    userId: req.user._id.toString(),
    title,
    description,
    type,
    role: roleId,
    prop: propId,
    minutePoint,
    notion,
  };
  const quest = await questService.create(model);
  res.status(200).json(quest);
});

const deleteOne = catchAsync(async (req, res) => {
  const { id } = req.params;
  await questService.deleteOne(id);
  res.status(200).json();
});

const getAll = catchAsync(async (req, res) => {
  const { role } = req.query;
  const quests = await questService.getAll(role);
  res.status(200).json(quests);
});

const getOne = catchAsync(async (req, res) => {
  const { id } = req.params;
  const quest = await questService.getOne(id);
  res.status(200).json(quest);
});

module.exports = {
  create,
  getAll,
  deleteOne,
  getOne,
};
