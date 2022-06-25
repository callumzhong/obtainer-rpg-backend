const mongoose = require('mongoose');
const mainConnection = require('../connections/main.connection');
const coinSchema = require('./subdocuments/coin.schema');

const monsterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, '請輸入名稱'],
    },
    url: {
      type: String,
      required: [true, '請輸入圖檔'],
    },
    experience: {
      type: Number,
      required: [true, '請輸入經驗值'],
    },
    blood: {
      type: Number,
      required: [true, '請輸入血量'],
    },
    drops: [
      {
        material: { type: mongoose.Types.ObjectId, ref: 'material' },
        min: {
          type: Number,
          default: 1,
        },
        max: {
          type: Number,
          default: 1,
        },
      },
    ],
    coin: coinSchema,
    createdAt: { type: Date, select: false },
    updatedAt: { type: Date, select: false },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Monster = mainConnection.model('Monster', monsterSchema);

module.exports = Monster;
