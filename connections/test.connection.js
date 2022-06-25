const {
  TEST_MONGO_PASSWORD, TEST_MONGO_USERNAME, TEST_MONGO_DB_NAME, TEST_MONGO_HOST,
} = process.env;
const mongoose = require('mongoose');

mongoose.connect(
  `mongodb+srv://${TEST_MONGO_USERNAME}:${TEST_MONGO_PASSWORD}@${TEST_MONGO_HOST}/${TEST_MONGO_DB_NAME}?retryWrites=true&w=majority`,
);
