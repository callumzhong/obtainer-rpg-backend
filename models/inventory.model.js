const mongoose = require('mongoose');
const mainConnection = require('../connections/main.connection');

const inventorySchema = new mongoose.Schema(
  {
    role: {
      type: mongoose.Types.ObjectId,
      ref: 'role',
      required: [true, '請輸入角色ID'],
    },
    prop: {
      type: mongoose.Types.ObjectId,
      ref: 'prop',
      required: [
        () => !this.material,
        '請輸入道具 || 素材',
      ],
    },
    material: {
      type: mongoose.Types.ObjectId,
      ref: 'material',
      required: [
        () => !this.prop,
        '請輸入道具 || 素材',
      ],
    },
    createdAt: { type: Date, select: false },
    updatedAt: { type: Date, select: false },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Inventory = mainConnection.model('Inventory', inventorySchema);

module.exports = Inventory;
