const mongoose = require('mongoose');

const attributesSchema = new mongoose.Schema({
  str: {
    type: Number,
  },
});

module.exports = attributesSchema;
