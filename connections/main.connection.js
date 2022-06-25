const {
  MONGO_PASSWORD, MONGO_USERNAME, MONGO_DB_NAME, MONGO_HOST,
} = process.env;
const mongoose = require('mongoose');

mongoose.connect(
  `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB_NAME}?retryWrites=true&w=majority`,
);
