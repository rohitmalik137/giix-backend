const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const filesSchema = new Schema(
  {
    files: {
      type: String,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('File', filesSchema);
