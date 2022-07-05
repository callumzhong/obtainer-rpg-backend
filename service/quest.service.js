const Quest = require('../models/quest.model');
const AppError = require('../helpers/appError');

const create = async ({
  userId,
  title,
  description,
  type,
  role,
  expectedMinutePoint,
  notionKey,
}) => {
  const model = {
    user: userId,
    role,
    type,
    title,
    description,
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

const getAll = async (roleId) => {
  const quests = await Quest.find({ role: roleId }).lean();
  return quests;
};

const getOne = async (questId) => {
  const quest = await Quest.findById(questId).lean();
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
};
