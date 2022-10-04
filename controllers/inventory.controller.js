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
  const gashapon = await inventoryService.getGashaponProp({
    characterId: character._id.toString(),
  });
  res
    .status(200)
    .json(
      gashapon
        ? { name: gashapon.name, url: gashapon.url }
        : { name: '未中獎' },
    );
});

const reduceProp = catchAsync(async (req, res) => {
  const { propId } = req.body;

  const character = await characterService.getOne(
    req.user._id.toString(),
  );
  const result = await inventoryService.reduceProp({
    propId,
    character,
  });
  res.status(200).json(result);
});

module.exports = { getAll, getGashaponProp, reduceProp };
