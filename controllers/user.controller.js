const catchAsync = require('../helpers/catchAsync');
const test = catchAsync(async (req, res, next) => {
	res.status(200).json(123);
});

module.exports = {
	test,
};
