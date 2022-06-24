const mongoose = require('mongoose');
const mainConnection = require('../connections/main.connection');

const dungeonSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, '請輸入名稱'],
		},
		description: {
			type: String,
			default: null,
		},
		url: {
			type: String,
			required: [true, '請輸入圖檔'],
		},
		initialPoint: {
			type: String,
			required: [true, '請輸入角色初始點'],
		},
		monsters: [
			{
				monster: { type: mongoose.Types.ObjectId, ref: 'monster' },
				initialPoint: {
					type: String,
					required: [true, '請輸入怪物初始點'],
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

const Dungeon = mainConnection.model('Dungeon', dungeonSchema);

module.exports = Dungeon;
