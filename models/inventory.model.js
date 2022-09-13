const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema(
  {
    character: {
      type: mongoose.Types.ObjectId,
      ref: 'character',
      required: [true, '請輸入角色ID'],
    },
    prop: {
      type: mongoose.Types.ObjectId,
      ref: 'prop',
      required: [
        function () {
          return !this.material;
        },
        '請輸入道具 || 素材',
      ],
    },
    material: {
      type: mongoose.Types.ObjectId,
      ref: 'material',
      required: [
        function () {
          return !this.prop;
        },
        '請輸入道具 || 素材',
      ],
    },
    amount: { type: Number },
    createdAt: { type: Date, select: false },
    updatedAt: { type: Date, select: false },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Inventory = mongoose.model(
  'Inventory',
  inventorySchema,
);

module.exports = Inventory;
