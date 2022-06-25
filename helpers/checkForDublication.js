const AppError = require('./appError');

const translateKeys = {
  account: '帳號',
  email: '電子郵件',
  name: '名稱',
};

const checkForDuplication = async (Model, searchQuery) => {
  const result = await Model.findOne({ $or: searchQuery });
  if (!result) {
    return;
  }
  searchQuery.forEach((singleObject) => {
    const key = Object.keys(singleObject)[0];
    if (result[key] === singleObject[key]) {
      throw new AppError(400, `${translateKeys[key]}已存在`);
    }
  });
};

module.exports = checkForDuplication;
