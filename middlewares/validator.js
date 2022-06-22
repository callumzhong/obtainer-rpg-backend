const Joi = require('joi');
const AppError = require('../helpers/appError');
const extract = require('../helpers/extract');

const validator = (joiSchema) => (req, res, next) => {
	const validSchema = extract(joiSchema, ['params', 'query', 'body']);
	const object = extract(req, Object.keys(validSchema));
	const { value, error } = Joi.compile(validSchema)
		.prefs({
			errors: { label: 'key' },
			abortEarly: false,
		})
		.validate(object);

	if (error) {
		const message = error.details.map((detail) => detail.message).join(', ');
		return next(new AppError(400, message));
	}

	// 避免傳址異動
	Object.assign(req, value);
	return next();
};

module.exports = validator;
