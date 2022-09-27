const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema(
  {
    character: {
      type: mongoose.Types.ObjectId,
      ref: 'Character',
      required: [true, '請輸入角色ID'],
    },
    prop: {
      type: mongoose.Types.ObjectId,
      ref: 'Prop',
      required: [
        function check() {
          return !this.material;
        },
        '請輸入道具 || 素材',
      ],
    },
    material: {
      type: mongoose.Types.ObjectId,
      ref: 'Material',
      required: [
        function check() {
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
