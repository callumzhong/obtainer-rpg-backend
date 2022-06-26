const AppError = require('../helpers/appError');
const Monster = require('../models/monster.model');

const getOne = async (monsterId) => {
  const monster = await Monster.findById(monsterId).lean();
  if (!monster) {
    throw new AppError(400, '怪物不存在');
  }
  return monster;
};

const create = async ({
  name, url, experience, blood, drops, coin,
}) => {
  const model = {
    name,
    url,
    experience,
    blood,
    coin,
  };
  if (drops) {
    model.drops = drops;
  }

  const monster = await Monster.create(model);
  return monster;
};

const getAll = async () => {
  const monsters = await Monster.find().lean();
  return monsters;
};

const updateDrop = async ({ monsterId, drops }) => {
  const monster = await Monster.findById(monsterId);
  if (!monster) {
    throw new AppError(400, '怪物不存在');
  }
  monster.drops = drops;
  monster.markModified('drops');
  await monster.save();
  const updatedMonster = await getOne(monsterId);
  return updatedMonster;
};

const deleteDrop = async (monsterId) => {
  const monster = await Monster.findById(monsterId);
  if (!monster) {
    throw new AppError(400, '怪物不存在');
  }
  monster.drops = [];
  monster.markModified('drops');
  await monster.save();
  const updatedMonster = await getOne(monsterId);
  return updatedMonster;
};

module.exports = {
  create,
  getAll,
  getOne,
  updateDrop,
  deleteDrop,
};
