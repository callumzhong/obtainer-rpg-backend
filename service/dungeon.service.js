const AppError = require('../helpers/appError');
const Dungeon = require('../models/dungeon.model');

const create = async ({
  name, description, url, pointByX, pointByY, monsters,
}) => {
  const model = {
    name,
    description,
    url,
    pointByX,
    pointByY,
  };
  if (monsters) {
    model.monsters = monsters;
  }

  const dungeon = await Dungeon.create(model);

  return dungeon;
};

const getAll = async () => {
  const dungeons = await Dungeon.find().lean();
  return dungeons;
};

const getOne = async (dungeonId) => {
  const dungeon = await Dungeon.findById(dungeonId).lean();
  if (!dungeon) {
    throw new AppError(400, '地牢不存在');
  }
  return dungeon;
};

const deleteOne = async (dungeonId) => {
  const dungeon = await Dungeon.findByIdAndDelete(dungeonId).lean();
  if (!dungeon) {
    throw new AppError(400, '地牢不存在');
  }
  return dungeon;
};

const updateMonster = async ({ dungeonId, monsters }) => {
  const dungeon = await Dungeon.findById(dungeonId);
  if (!dungeon) {
    throw new AppError(400, '地牢不存在');
  }
  dungeon.monsters = monsters;
  dungeon.markModified('monsters');
  await dungeon.save();
  const updatedDungeon = await getOne(dungeonId);
  return updatedDungeon;
};

const deleteMonster = async (dungeonId) => {
  const dungeon = await Dungeon.findById(dungeonId);
  if (!dungeon) {
    throw new AppError(400, '地牢不存在');
  }
  dungeon.monsters = [];
  dungeon.markModified('monsters');
  await dungeon.save();
  const updatedDungeon = await getOne(dungeonId);
  return updatedDungeon;
};

module.exports = {
  create,
  getAll,
  getOne,
  deleteOne,
  updateMonster,
  deleteMonster,
};
