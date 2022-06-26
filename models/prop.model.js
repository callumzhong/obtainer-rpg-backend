const mongoose = require('mongoose');
const effectSchema = require('./subdocuments/effect.schema');

const propSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['KEY', 'ARM'],
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
    effect: effectSchema,
    formula: [
      {
        material: { type: mongoose.Types.ObjectId, ref: 'material' },
        amount: {
          type: Number,
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

const Prop = mongoose.model('Prop', propSchema);

module.exports = Prop;
