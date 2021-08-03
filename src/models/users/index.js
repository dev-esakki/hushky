const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const usersSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});
const Model = mongoose.model('users', usersSchema);

module.exports = Model;