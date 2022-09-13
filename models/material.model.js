const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['ORE', 'METAL', 'WOOD', 'MEAT'],
    },
    rarity: {
      type: String,
      enum: ['WHITE', 'GREEN', 'BLUE', 'PURPLE', 'ORANGE'],
    },
    name: {
      type: String,
      required: [true, '請輸入名稱'],
    },
    url: {
      type: String,
      required: [true, '請輸入圖檔'],
    },
    description: {
      type: String,
      default: null,
    },
    createdAt: { type: Date, select: false },
    updatedAt: { type: Date, select: false },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Material = mongoose.model('Material', materialSchema);

module.exports = Material;
