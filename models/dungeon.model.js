const mongoose = require('mongoose');

const dungeonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, '請輸入名稱'],
    },
    description: {
      type: String,
      default: null,
    },
    url: {
      type: String,
      required: [true, '請輸入圖檔'],
    },
    pointByX: {
      type: String,
      required: [true, '請輸入角色 X 軸'],
    },
    pointByY: {
      type: String,
      required: [true, '請輸入角色 Y 軸'],
    },
    monsters: [
      {
        monster: { type: mongoose.Types.ObjectId, ref: 'monster' },
        pointByX: {
          type: String,
          required: [true, '請輸入怪物 X 軸'],
        },
        pointByY: {
          type: String,
          required: [true, '請輸入怪物 Y 軸'],
        },
      },
    ],
    createdAt: { type: Date, select: false },
    updatedAt: { type: Date, select: false },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Dungeon = mongoose.model('Dungeon', dungeonSchema);

module.exports = Dungeon;
