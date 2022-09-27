const mongoose = require('mongoose');
const attributesSchema = require('./subdocuments/attributes.schema');

const propSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['DISH', 'ACTIVITY', 'LUXURY'],
    },
    name: {
      type: String,
      required: [true, '請輸入名字'],
      maxLength: 20,
    },
    url: {
      type: String,
      required: [true, '請輸入圖檔'],
    },
    description: {
      type: String,
      default: null,
    },
    attributes: {
      type: attributesSchema,
      required: [true, '請輸入屬性'],
    },
    dropRate: {
      type: Number,
      required: [true, '請輸入掉落機率'],
    },
    createdAt: { type: Date, select: false },
    updatedAt: { type: Date, select: false },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Prop = mongoose.model('Prop', propSchema);

module.exports = Prop;
