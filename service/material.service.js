const AppError = require('../helpers/appError');
const Material = require('../models/material.model');

const create = async ({
  type, name, url, description, rarity,
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

const getAll = async () => {
  const materials = await Material.find().lean();
  return materials;
};

const getOne = async (materialId) => {
  const material = await Material.findById(materialId).lean();
  if (!material) {
    throw new AppError(400, '素材不存在');
  }
  return material;
};

const deleteOne = async (materialId) => {
  const material = await Material.findByIdAndDelete(materialId).lean();
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
};
