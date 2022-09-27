const inventoryService = require('../service/inventory.service');
const characterService = require('../service/character.service');
const catchAsync = require('../helpers/catchAsync');

const getAll = catchAsync(async (req, res) => {
  const { type } = req.query;
  const character = await characterService.getOne(
    req.user._id.toString(),
  );

  let inventory = [];
  if (type === 'MATERIAL') {
    inventory = await inventoryService.getInventoryByMaterial({
      characterId: character._id.toString(),
    });
  }
  if (type === 'PROP') {
    inventory = await inventoryService.getInventoryByProp({
      characterId: character._id.toString(),
    });
  }

  res.status(200).json(inventory);
});

const getGashaponProp = catchAsync(async (req, res) => {
  const character = await characterService.getOne(
    req.user._id.toString(),
  );
  const test = await inventoryService.getGashaponProp({
    characterId: character._id.toString(),
  });
  res.status(200).json(test);
});

module.exports = { getAll, getGashaponProp };
