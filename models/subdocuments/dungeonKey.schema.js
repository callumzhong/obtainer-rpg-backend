const mongoose = require('mongoose');

const dungeonKeySchema = new mongoose.Schema({
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

module.exports = dungeonKeySchema;
