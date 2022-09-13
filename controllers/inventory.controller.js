const inventoryService = require('../service/inventory.service');
const characterService = require('../service/character.service');
const catchAsync = require('../helpers/catchAsync');

const getAll = catchAsync(async (req, res) => {
  const { type } = req.query;
  const character = await characterService.getOne(
    req.user._id.toString(),
  );

  // if (type === 'material') {
  const materials = await inventoryService.getAllMaterial({
    characterId: character._id.toString(),
  });
  // }

  console.log(materials);

  res.status(200).json(materials);
});

module.exports = { getAll };
