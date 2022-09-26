const mongoose = require('mongoose');

const attributesSchema = new mongoose.Schema({
  satiety: {
    type: Number,
    required: [true, '請輸入飽食值'],
  },
  mood: {
    type: Number,
    required: [true, '請輸入情緒值'],
  },
});

module.exports = attributesSchema;
