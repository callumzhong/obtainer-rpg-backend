const AppError = require('../helpers/appError');
const Prop = require('../models/prop.model');

const getOne = async (propId) => {
  const prop = await Prop.findById(propId).lean();
  if (!prop) {
    throw new AppError(400, '道具不存在');
  }
  return prop;
};

const create = async ({
  type,
  name,
  url,
  description,
  attributes,
  dropRate,
}) => {
  const model = {
    type,
    name,
    url,
    description,
    dropRate,
    attributes,
  };

  const prop = await Prop.create(model);
  return prop;
};

const getAll = async (search = {}) => {
  const props = await Prop.find(search).lean();
  return props;
};

const updatePropFormula = async ({ propId, formula }) => {
  const prop = await Prop.findById(propId);
  if (!prop) {
    throw new AppError(400, '道具不存在');
  }
  prop.formula = formula;
  prop.markModified('formula');
  await prop.save();
  const updatedProp = await getOne(propId);
  return updatedProp;
};

const deletePropFormula = async (propId) => {
  const prop = await Prop.findById(propId);
  if (!prop) {
    throw new AppError(400, '道具不存在');
  }
  prop.formula = [];
  prop.markModified('formula');
  await prop.save();
  const updatedProp = await getOne(propId);
  return updatedProp;
};

module.exports = {
  create,
  getAll,
  getOne,
  updatePropFormula,
  deletePropFormula,
};
