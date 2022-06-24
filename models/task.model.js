const mongoose = require('mongoose');
const mainConnection = require('../connections/main.connection');
const notionSchema = new mongoose.Schema({
	key: {
		type: String,
		required: [true, '請輸入 key'],
	},
	title: {
		type: String,
	},
	prop: {
		type: mongoose.Types.ObjectId,
		ref: 'prop',
		required: [true, '請輸入道具ID'],
	},
	minutePoint: {
		type: Number,
		required: [true, '請輸入有效分鐘數'],
	},
});

const taskSchema = new mongoose.Schema(
	{
		memo: {
			type: String,
		},
		type: {
			type: String,
			enum: ['NOTION', 'TASK_MANUAL'],
		},
		taskManual: {
			type: mongoose.Types.ObjectId,
			ref: 'taskManual',
			required: [
				function () {
					return this.type === 'TASK_MANUAL';
				},
				'請輸入任務手冊',
			],
		},
		notion: {
			type: notionSchema,
			required: [
				function () {
					return this.type === 'NOTION';
				},
				'請輸入 notion 任務資訊',
			],
		},
		consumedMinutePoint: {
			type: Number,
			required: [true, '請輸入已消耗分鐘數'],
		},
		createdAt: { type: Date, select: false },
		updatedAt: { type: Date, select: false },
	},
	{
		versionKey: false,
		timestamps: true,
	},
);

taskSchema.virtual('inventory', {
	ref: 'inventory',
	foreignField: 'role',
	localField: '_id',
});

const Role = mainConnection.model('Role', taskSchema);

module.exports = Role;
