const Prop = require('../models/prop.model');

const create = async ({
  type, name, url, description, effect,
}) => {
  const model = {
    type,
    name,
    url,
    description,
  };
  if (Object.keys(effect).length > 0) {
    model.effect = effect;
  }

  const prop = await Prop.create(model);
  return prop;
};

const getAll = async () => {
  const props = await Prop.find()
    .lean();
  return props;
};

const getOne = async (propId) => {
  const prop = await Prop.findById(propId)
    .lean();
  return prop;
};

module.exports = {
  create,
  getAll,
  getOne,
};
