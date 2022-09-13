const materialService = require('../service/material.service');
const characterService = require('../service/character.service');
const catchAsync = require('../helpers/catchAsync');

const getAll = catchAsync(async (req, res) => {
  const materials = await materialService.getAll();
  res.status(200).json(materials);
});

const getOne = catchAsync(async (req, res) => {
  const { id } = req.params;
  const material = await materialService.getOne(id);
  res.status(200).json(material);
});

const deleteOne = catchAsync(async (req, res) => {
  const { id } = req.params;
  const prop = await materialService.deleteOne(id);
  res.status(200).json(prop);
});

const create = catchAsync(async (req, res) => {
  const {
    type, name, url, description, rarity,
  } = req.body;
  const material = await materialService.create({
    type,
    name,
    url,
    description,
    rarity,
  });
  res.status(201).json(material);
});

const collectOne = catchAsync(async (req, res) => {
  const { type } = req.body;
  const character = await characterService.getOne(
    req.user._id.toString(),
  );
  const collected = await materialService.collectOne({
    characterId: character._id.toString(),
    type,
  });
  res.status(201).json(collected);
});

module.exports = {
  create,
  getAll,
  getOne,
  deleteOne,
  collectOne,
};
