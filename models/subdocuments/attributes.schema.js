const mongoose = require('mongoose');

const attributesSchema = new mongoose.Schema({
  str: {
    type: Number,
    required: [true, '請輸入攻擊值'],
  },
  crit: {
    type: Number,
    required: [true, '請輸入爆擊值'],
  },
  speed: {
    type: Number,
    required: [true, '請輸入速度值'],
  },
});

module.exports = attributesSchema;
