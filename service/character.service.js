const Character = require('../models/character.model');
const checkForDuplication = require('../helpers/checkForDuplication');
const AppError = require('../helpers/appError');
const inventoryService = require('./inventory.service');

const create = async ({
  userId,
  name,
  url,
  attributes,
}) => {
  const isNotNull = await Character.find({
    user: userId,
  }).count();
  if (isNotNull) {
    throw new AppError(400, '帳號已存在角色');
  }
  await checkForDuplication(Character, [{ name }]);
  const character = await Character.create({
    user: userId,
    name,
    url,
    attributes,
  });
  return character;
};

const deleteOne = async (characterId) => {
  const character = await Character.findByIdAndDelete(
    characterId,
  );
  if (!character) {
    throw new AppError(400, '人物不存在');
  }
  return character;
};

const updatedName = async ({ characterId, name }) => {
  await checkForDuplication(Character, [{ name }]);
  const character = await Character.findByIdAndUpdate(
    characterId,
    {
      name,
    },
  );
  if (!character) {
    throw new AppError(400, '人物不存在');
  }
  return character;
};

// 暫時只開放玩家只能建立一個人物
const getOne = async (userId) => {
  const character = await Character.findOne({
    user: userId,
  }).select('+updatedAt');
  if (!character) {
    throw new AppError(400, '人物不存在');
  }
  return character;
};

const updateAttributes = async (
  characterId,
  attributes,
) => {
  const temp = attributes;
  Object.keys(attributes).forEach((key) => {
    temp[key] = attributes[key] <= 0 ? 0 : attributes[key];
  });
  const character = await Character.findByIdAndUpdate(
    characterId,
    {
      $set: {
        attributes: temp,
      },
    },
  );

  if (!character) {
    throw new AppError(400, '人物不存在');
  }

  return character;
};

const updateDeath = async (characterId) => {
  const character = await Character.findById(characterId);
  if (!character) {
    throw new AppError(400, '人物不存在');
  }
  await inventoryService.deleteInventoryCharacter(
    characterId,
  );
  await updateAttributes(characterId, {
    satiety: 300,
    mood: 100,
  });
};

// const getOne = async () => {
//   const character = await Character.findById().lean().populate('inventory');
//   return character;
// };

module.exports = {
  create,
  deleteOne,
  updatedName,
  getOne,
  updateAttributes,
  updateDeath,
};
