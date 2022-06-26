const monsterService = require('../service/monster.service');
const catchAsync = require('../helpers/catchAsync');

const create = catchAsync(async (req, res) => {
  const {
    name, url, experience, blood, drops, coin,
  } = req.body;
  const monster = await monsterService.create({
    name,
    url,
    experience,
    blood,
    drops,
    coin,
  });
  res.status(201).json(monster);
});

const getOne = catchAsync(async (req, res) => {
  const { id } = req.params;
  const monster = await monsterService.getOne(id);
  res.status(200).json(monster);
});

const getAll = catchAsync(async (req, res) => {
  const monsters = await monsterService.getAll();
  res.status(200).json(monsters);
});

const updateDrop = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { drops } = req.body;
  const monster = await monsterService.updateDrop({
    monsterId: id,
    drops,
  });
  res.status(200).json(monster);
});

const deleteDrop = catchAsync(async (req, res) => {
  const { id } = req.params;
  const monster = await monsterService.deleteDrop(id);
  res.status(200).json(monster);
});

module.exports = {
  create,
  getAll,
  getOne,
  updateDrop,
  deleteDrop,
};
