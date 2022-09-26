const AppError = require('../helpers/appError');
const Material = require('../models/material.model');
const getRandomNumber = require('../helpers/getRandomNumber');
const Inventory = require('../models/inventory.model');

const create = async ({
  type,
  name,
  url,
  description,
  rarity,
}) => {
  const material = await Material.create({
    type,
    name,
    url,
    rarity,
    description,
  });
  return material;
};

const collectOne = async ({ type, characterId }) => {
  const material = await Material.findOne({ type });
  const existedMaterial = await Inventory.findOne({
    material: material.id,
    character: characterId,
  });
  const collectedAmount = getRandomNumber(2, 12);
  if (existedMaterial) {
    existedMaterial.amount += collectedAmount;
    await existedMaterial.save();
  } else {
    await Inventory.create({
      material: material.id,
      character: characterId,
      amount: collectedAmount,
    });
  }

  return {
    type: material.type,
    name: material.name,
    amount: collectedAmount,
  };
};

const getAll = async () => {
  const materials = await Material.find().lean();
  return materials;
};

const getOne = async (materialId) => {
  const material = await Material.findById(
    materialId,
  ).lean();
  if (!material) {
    throw new AppError(400, '素材不存在');
  }
  return material;
};

const deleteOne = async (materialId) => {
  const material = await Material.findByIdAndDelete(
    materialId,
  ).lean();
  if (!material) {
    throw new AppError(400, '素材不存在');
  }
  return material;
};

module.exports = {
  create,
  getAll,
  getOne,
  deleteOne,
  collectOne,
};
