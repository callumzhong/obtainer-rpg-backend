const mongoose = require('mongoose');
const coinSchema = require('./subdocuments/coin.schema');

const keySchema = new mongoose.Schema({
  prop: {
    type: mongoose.Types.ObjectId,
    ref: 'prop',
    required: [true, '請輸入道具ID'],
  },
  minutePoint: {
    type: Number,
    required: [true, '請輸入有效分鐘數'],
  },
});

const taskManualSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, '請輸入任務標題'],
    },
    description: {
      type: String,
      required: [true, '請輸入任務描述'],
    },
    type: {
      type: String,
      enum: ['PUBLIC', 'PRIVATE'],
    },
    experience: {
      type: Number,
      default: 0,
    },
    key: keySchema,
    coin: coinSchema,
    deletedAt: { type: Date, select: false },
    createdAt: { type: Date, select: false },
    updatedAt: { type: Date, select: false },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const TaskManual = mongoose.model('TaskManual', taskManualSchema);

module.exports = TaskManual;
