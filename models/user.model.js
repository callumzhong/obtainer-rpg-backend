const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    account: {
      type: String,
      required: [true, '請輸入帳號'],
      maxLength: 12,
      minLength: 4,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: [true, '請輸入密碼隱碼'],
      select: false,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      select: false,
      required: [true, '請輸入 Email'],
    },
    characters: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Character',
      },
    ],
    createdAt: { type: Date, select: false },
    updatedAt: { type: Date, select: false },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const User = mongoose.model('User', userSchema);

module.exports = User;
