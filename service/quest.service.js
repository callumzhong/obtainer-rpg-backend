const Quest = require('../models/quest.model');
const AppError = require('../helpers/appError');

const create = async ({
  userId,
  title,
  type,
  character,
  expectedMinutePoint,
  notionKey,
}) => {
  const model = {
    user: userId,
    character,
    type,
    title,
    expectedMinutePoint,
  };
  if (model.type === 'NOTION') {
    model.notionKey = notionKey;
  }
  const quest = await Quest.create(model);
  return quest;
};

const deleteOne = async (questId) => {
  const quest = await Quest.findByIdAndDelete(questId);
  if (!quest) {
    throw new AppError(400, '探索不存在');
  }
  return quest;
};

const getAll = async (characterId) => {
  const quests = await Quest.find({
    character: characterId,
  }).lean();
  return quests;
};

const getOne = async (questId) => {
  const quest = await Quest.findById(questId).lean();
  if (!quest) {
    throw new AppError(400, '探索不存在');
  }
  return quest;
};

const updatedConsumed = async ({
  questId,
  consumedMinutePoint,
}) => {
  const quest = await Quest.findByIdAndUpdate(questId, {
    consumedMinutePoint,
  });
  if (!quest) {
    throw new AppError(400, '探索不存在');
  }
  return quest;
};

module.exports = {
  create,
  getAll,
  deleteOne,
  getOne,
  updatedConsumed,
};
