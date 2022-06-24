const mongoose = require('mongoose');
const mainConnection = require('../connections/main.connection');
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
					default: 1,
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

const Inventory = mainConnection.model('Inventory', propSchema);

module.exports = Inventory;
