const catchAsync = require('../helpers/catchAsync');
const questService = require('../service/quest.service');

const create = catchAsync(async (req, res) => {
  const {
    title,
    type,
    expectedMinutePoint,
    notionKey,
    characterId,
  } = req.body;
  const model = {
    userId: req.user._id.toString(),
    title,
    type,
    character: characterId,
    expectedMinutePoint,
    notionKey,
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
  const { character } = req.query;
  const quests = await questService.getAll(character);
  res.status(200).json(quests);
});

const updatedConsumed = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { consumedMinutePoint } = req.body;
  await questService.updatedConsumed({
    questId: id,
    consumedMinutePoint,
  });
  res.status(200).json();
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
  updatedConsumed,
};
