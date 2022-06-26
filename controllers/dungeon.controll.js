const dungeonService = require('../service/dungeon.service');
const catchAsync = require('../helpers/catchAsync');

const create = catchAsync(async (req, res) => {
  const {
    name, description, url, pointByX, pointByY, monsters,
  } = req.body;

  const dungeon = await dungeonService.create({
    name,
    description,
    url,
    pointByX,
    pointByY,
    monsters,
  });
  res.status(201).json(dungeon);
});

const getAll = catchAsync(async (req, res) => {
  const dungeons = await dungeonService.getAll();
  res.status(200).json(dungeons);
});

const getOne = catchAsync(async (req, res) => {
  const { id } = req.params;
  const dungeon = await dungeonService.getOne(id);
  res.status(200).json(dungeon);
});

const deleteOne = catchAsync(async (req, res) => {
  const { id } = req.params;
  await dungeonService.deleteOne(id);
  res.status(200).json();
});

const updateMonster = catchAsync(async (req, res) => {
  const { id } = req.params;
  const monsters = req.body;
  const dungeon = await dungeonService.updateMonster({ dungeonId: id, monsters });
  res.status(200).json(dungeon);
});

const deleteMonster = catchAsync(async (req, res) => {
  const { id } = req.params;
  const dungeon = await dungeonService.deleteMonster(id);
  res.status(200).json(dungeon);
});

module.exports = {
  create,
  getAll,
  getOne,
  deleteOne,
  updateMonster,
  deleteMonster,
};
