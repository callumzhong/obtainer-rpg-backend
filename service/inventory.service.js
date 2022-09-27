const Inventory = require('../models/inventory.model');
const materialService = require('./material.service');
const propService = require('./prop.service');
const getRandomNumber = require('../helpers/getRandomNumber');
const AppError = require('../helpers/appError');

const getInventoryByMaterial = async ({ characterId }) => {
  const materials = await materialService.getAll();
  const materialInventory = await Inventory.find({
    character: characterId,
    material: {
      $exists: true,
    },
  });

  const inventory = materials.reduce((prev, curr) => {
    const existed = materialInventory.find(
      (item) => item.material.toString() === curr._id.toString(),
    );
    return [
      ...prev,
      {
        _id: curr._id,
        type: curr.type,
        name: curr.name,
        url: curr.url,
        amount: existed ? existed.amount : 0,
      },
    ];
  }, []);

  return inventory;
};

const getInventoryByProp = async ({ characterId }) => {
  const props = await propService.getAll();
  const propInventory = await Inventory.find({
    character: characterId,
    prop: {
      $exists: true,
    },
  });
  console.log(propInventory);

  const inventory = props
    .reduce((prev, curr) => {
      console.log(curr);
      const existed = propInventory.find(
        (item) => item.prop.toString() === curr._id.toString(),
      );
      console.log(existed);
      return [
        ...prev,
        {
          _id: curr._id,
          type: curr.type,
          name: curr.name,
          url: curr.url,
          description: curr.description,
          attributes: Object.keys(curr.attributes)
            .filter((key) => key !== '_id')
            .reduce(
              (obj, key) => ({
                ...obj,
                [key]: curr.attributes[key],
              }),
              {},
            ),
          amount: existed ? existed.amount : 0,
        },
      ];
    }, [])
    .sort((item) => {
      let result = 0;
      switch (item.type) {
        case 'DISH':
          result = -1;
          break;
        case 'ACTIVITY':
          result = 0;
          break;
        case 'LUXURY':
          result = 1;
          break;
        default:
          throw new Error('type is null');
      }
      return result;
    });

  return inventory;
};

const addProp = async ({ propId, characterId }) => {
  const existedProp = await Inventory.findOne({
    prop: propId,
    character: characterId,
  });
  if (existedProp) {
    existedProp.amount += 1;
    await existedProp.save();
  } else {
    await Inventory.create({
      prop: propId,
      character: characterId,
      amount: 1,
    });
  }
  const prop = await propService.getOne(propId);
  return prop;
};

const reduceProp = async ({ propId, characterId }) => {
  const existedProp = await Inventory.findOne({
    prop: propId,
    character: characterId,
  }).populate({
    path: 'prop',
  });

  if (!existedProp || existedProp.amount <= 0) {
    throw new AppError(400, '角色未擁有此道具');
  }

  existedProp.amount -= 1;
  await existedProp.save();
  return `已使用${existedProp.prop.name}`;
};

const getGashaponProp = async ({ characterId }) => {
  const materials = await getInventoryByMaterial({
    characterId,
  });

  const errorMessage = materials.reduce((str, material) => {
    let temp = str;
    if (material.amount < 50) {
      temp
        += temp.length > 0
          ? `, 缺少${material.name}`
          : `缺少${material.name}`;
    }
    return temp;
  }, '');

  if (errorMessage) {
    throw new AppError(409, errorMessage);
  }

  materials.forEach(async (material) => {
    const temp = await Inventory.findOne({
      character: characterId,
      material: material._id.toString(),
    });
    temp.amount -= 50;
    temp.markModified('amount');
    await temp.save();
  });

  let probability = new Array(100).fill(null);
  probability.fill('DISH', 0, 70);
  probability.fill('ACTIVITY', 70, 95);
  probability.fill('LUXURY', 95, 100);
  let target = getRandomNumber(0, probability.length - 1);
  const type = probability[target];
  const props = await propService.getAll({ type });
  const totalProbability = props.reduce(
    (prev, curr) => prev + curr.dropRate,
    0,
  );
  probability = new Array(totalProbability).fill(null);
  props.forEach((prop, idx, arr) => {
    const startValue = idx === 0
      ? 0
      : arr
        .slice(0, idx)
        .reduce(
          (prev, curr) => prev + curr.dropRate,
          0,
        );
    probability.fill(
      prop._id,
      startValue,
      startValue + prop.dropRate,
    );
  });

  if (type === 'DISH') {
    probability = [
      ...probability,
      ...new Array(50).fill(null),
    ];
  }
  if (type === 'ACTIVITY') {
    probability = [
      ...probability,
      ...new Array(100).fill(null),
    ];
  }
  if (type === 'LUXURY') {
    probability = [
      ...probability,
      ...new Array(200).fill(null),
    ];
  }

  probability = probability.sort(() => Math.random() - 0.5);
  target = getRandomNumber(0, probability.length - 1);
  let result = probability[target];

  if (result) {
    result = await addProp({
      propId: result,
      characterId,
    });
  }
  return result;
};

module.exports = {
  getInventoryByMaterial,
  getInventoryByProp,
  getGashaponProp,
  reduceProp,
};
