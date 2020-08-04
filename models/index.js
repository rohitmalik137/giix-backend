const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const filesSchema = new Schema({
  files: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model('File', filesSchema);
