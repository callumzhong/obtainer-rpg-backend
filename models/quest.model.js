const mongoose = require('mongoose');

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
    notionKey: {
      type: String,
      required: [() => this.type === 'NOTION', '請輸入 notion key'],
    },
    title: {
      type: String,
      required: [true, '請輸入任務標題'],
    },
    description: {
      type: String,
      required: [true, '請輸入任務描述'],
    },
    expectedMinutePoint: {
      type: Number,
      required: [true, '請輸入預期時數(分)'],
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
