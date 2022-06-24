const mongoose = require('mongoose');
const mainConnection = require('../connections/main.connection');
const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, '請輸入名字'],
		},
		account: {
			type: String,
			required: [true, '請輸入帳號'],
			maxLength: 12,
			minLength: 4,
		},
		passwordHash: {
			type: String,
			required: [true, '請輸入密碼隱碼'],
			maxLength: 12,
			minLength: 12,
			select: false,
		},
		email: {
			type: String,
			required: [true, '請填寫email'],
			unique: true,
			lowercase: true,
			select: false,
		},
		roles: [
			{
				type: mongoose.Types.ObjectId,
				ref: 'role',
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

const User = mainConnection.model('User', userSchema);

module.exports = User;
