const catchAsync = require('../helpers/catchAsync');
const characterService = require('../service/character.service');

const create = catchAsync(async (req, res) => {
  const { name } = req.body;
  const character = await characterService.create({
    userId: req.user._id.toString(),
    name,
    url: 'https://res.cloudinary.com/callumzhong/image/upload/v1660942761/character_rojwo3.png',
    attributes: {
      satiety: 500,
      mood: 500,
    },
  });
  res.status(200).json(character);
});

const getOne = catchAsync(async (req, res) => {
  const character = await characterService.getOne(
    req.user._id.toString(),
  );
  res.status(200).json(character);
});

const deleteOne = catchAsync(async (req, res) => {
  const { id: characterId } = req.params;
  await characterService.deleteOne(characterId);
  res.status(200).json();
});

const updatedName = catchAsync(async (req, res) => {
  const { id: characterId } = req.params;
  const { name } = req.body;
  let character = await characterService.updatedName({
    characterId,
    name,
  });
  character = await characterService.getOne(character.id);
  res.status(200).json(character);
});

module.exports = {
  create,
  getOne,
  deleteOne,
  updatedName,
};
