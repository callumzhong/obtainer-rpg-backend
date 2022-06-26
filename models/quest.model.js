const mongoose = require('mongoose');
const dungeonKeySchema = require('./subdocuments/dungeonKey.schema');

const notionSchema = new mongoose.Schema({
  key: {
    type: String,
    required: [true, '請輸入 key'],
  },
  initialMinutePoint: {
    type: Number,
    default: 0,
  },
});

const questSchema = new mongoose.Schema(
  {
    role: {
      type: mongoose.Types.ObjectId,
      ref: 'role',
      required: [true, '請輸入角色'],
    },
    type: {
      type: String,
      enum: ['NOTION', 'PRIVATE'],
    },
    notion: {
      type: notionSchema,
      required: [() => this.type === 'NOTION', '請輸入 notion 任務資訊'],
    },
    title: {
      type: String,
      required: [true, '請輸入任務標題'],
    },
    description: {
      type: String,
      required: [true, '請輸入任務描述'],
    },
    key: {
      type: dungeonKeySchema,
      required: [true, '請輸入鑰匙'],
    },
    consumedMinutePoint: {
      type: Number,
      default: 0,
    },
    createdAt: { type: Date, select: false },
    updatedAt: { type: Date, select: false },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const Quest = mongoose.model('Quest', questSchema);

module.exports = Quest;
