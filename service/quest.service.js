const Quest = require('../models/quest.model');
const AppError = require('../helpers/appError');

const create = async ({ userId, title, description, type, prop, role, minutePoint, notion }) => {
  const model = {
    user: userId,
    role,
    type,
    title,
    description,
    key: {
      prop,
      minutePoint,
    },
  };
  if (model.type === 'NOTION') {
    model.notion = {
      key: notion.key,
      initialMinutePoint: notion.initialMinutePoint,
    };
  }
  const quest = await Quest.create(model);
  return quest;
};

const deleteOne = async (questId) => {
  const quest = await Quest.findByIdAndDelete(questId);
  if (!quest) {
    throw new AppError(400, '查無任務無法刪除');
  }
  return quest;
};

const getAll = async (roleId) => {
  const quests = await Quest.find({ role: roleId }).lean();
  return quests;
};

const getOne = async (questId) => {
  const quest = await Quest.findById(questId).lean();
  return quest;
};

module.exports = {
  create,
  getAll,
  deleteOne,
  getOne,
};
