const mongoose = require('mongoose');
const attributesSchema = require('./attributes.schema');

const effectSchema = attributesSchema.clone();

effectSchema.add({
  dungeon: {
    type: mongoose.Types.ObjectId,
    ref: 'dungeon',
  },
});

module.exports = effectSchema;
