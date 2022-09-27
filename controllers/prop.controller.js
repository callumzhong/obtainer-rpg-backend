const propService = require('../service/prop.service');
const catchAsync = require('../helpers/catchAsync');

const create = catchAsync(async (req, res) => {
  const {
    type,
    name,
    url,
    description,
    attributes,
    dropRate,
  } = req.body;

  const prop = await propService.create({
    type,
    name,
    url,
    description,
    attributes,
    dropRate,
  });
  res.status(201).json(prop);
});

const getAll = catchAsync(async (req, res) => {
  const props = await propService.getAll();
  res.status(200).json(props);
});

const getOne = catchAsync(async (req, res) => {
  const { id } = req.params;
  const prop = await propService.getOne(id);
  res.status(200).json(prop);
});

const updatePropFormula = catchAsync(async (req, res) => {
  const { id } = req.params;
  const formula = req.body;
  const prop = await propService.updatePropFormula({
    propId: id,
    formula,
  });
  res.status(200).json(prop);
});

const deletePropFormula = catchAsync(async (req, res) => {
  const { id } = req.params;
  const prop = await propService.deletePropFormula(id);
  res.status(200).json(prop);
});

module.exports = {
  create,
  getAll,
  getOne,
  updatePropFormula,
  deletePropFormula,
};
