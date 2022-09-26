const Inventory = require('../models/inventory.model');
const materialService = require('./material.service');

const getInventoryByCharacter = async ({ characterId }) => {
  const materials = await materialService.getAll();
  const materialInventory = await Inventory.find({
    character: characterId,
    material: {
      $exists: true,
    },
  });

  const inventory = materials.reduce((prev, curr) => {
    const existed = materialInventory.find(
      (item) => item.material._id.toString()
        === curr._id.toString(),
    );
    return [
      ...prev,
      {
        type: curr.type,
        name: curr.name,
        url: curr.url,
        amount: existed ? existed.amount : 0,
      },
    ];
  }, []);

  return inventory;
};

module.exports = {
  getInventoryByCharacter,
};
