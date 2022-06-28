const errorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).send(err.message);
  } else {
    console.error('出現重大錯誤', err);
    res.status(500).send('系統錯誤，請恰系統管理員');
  }
};

module.exports = errorProd;
