const propService = require('../service/prop.service');
const catchAsync = require('../helpers/catchAsync');

const create = catchAsync(async (req, res) => {
  const {
    type, name, url, description, effect,
  } = req.body;

  const prop = await propService.create({
    type,
    name,
    url,
    description,
    effect,
  });
  res.status(201).json(prop);
});

const getAll = catchAsync(async (req, res) => {
  const props = await propService.getAll();
  res.status(200).json(props);
});

const getOne = catchAsync(async (req, res) => {
  const { id } = req.params;
  const prop = await propService.getAll(id);
  res.status(200).json(prop);
});

module.exports = {
  create,
  getAll,
  getOne,
};
