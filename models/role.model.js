const mongoose = require('mongoose');
const attributesSchema = require('./subdocuments/attributes.schema');

/**
 * 經驗值採用 subdocuments
 * 未來使用經驗加倍券等狀況
 */
const experienceSchema = new mongoose.Schema({
  current: {
    type: Number,
    default: 0,
  },
  next: {
    type: Number,
    default: 50,
  },
});

const roleSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
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
    level: {
      type: Number,
      default: 1,
    },
    experience: {
      type: experienceSchema,
      default: () => ({}),
    },
    attributes: {
      type: attributesSchema,
      required: [true, '請輸入屬性'],
    },
    coin: {
      type: Number,
      default: 0,
    },
    inventoryUpperLimit: {
      type: Number,
      default: 24,
    },
    createdAt: { type: Date, select: false },
    updatedAt: { type: Date, select: false },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

roleSchema.virtual('inventory', {
  ref: 'inventory',
  foreignField: 'role',
  localField: '_id',
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
