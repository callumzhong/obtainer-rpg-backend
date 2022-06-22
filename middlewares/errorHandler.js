const errorDev = require('../helpers/errorDev');
const errorProd = require('../helpers/errorProd');

const errorHandler = (err, req, res, next) => {
	// dev
	err.statusCode = err.statusCode || 500;
	if (process.env.NODE_ENV === 'dev') {
		return errorDev(err, res);
	}
	// production
	if (err.name === 'ValidationError') {
		err.message = '資料欄位未填寫正確，請重新輸入！';
		err.isOperational = true;
		return errorProd(err, res);
	}
	errorProd(err, res);
};

module.exports = errorHandler;
