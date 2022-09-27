const mongoose = require('mongoose');
const attributesSchema = require('./subdocuments/attributes.schema');

const characterSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, '請輸入用戶'],
    },
    name: {
      type: String,
      required: [true, '請輸入名稱'],
      maxLength: 8,
      minLength: 2,
      unique: true,
    },
    url: {
      type: String,
      required: [true, '請輸入圖檔'],
    },
    attributes: {
      type: attributesSchema,
      required: [true, '請輸入屬性'],
    },
    createdAt: { type: Date, select: false },
    updatedAt: { type: Date, select: false },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

characterSchema.virtual('inventory', {
  ref: 'Inventory',
  foreignField: 'character',
  localField: '_id',
});

const Character = mongoose.model(
  'Character',
  characterSchema,
);

module.exports = Character;
