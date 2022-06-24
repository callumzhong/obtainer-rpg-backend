const mongoose = require('mongoose');

const coinSchema = new mongoose.Schema({
	min: {
		type: Number,
		default: 1,
	},
	max: {
		type: Number,
		default: 10,
	},
});

module.exports = coinSchema;
