const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deviceSchema = new mongoose.Schema({
  devicename: {
    type: String,
    required: true
  },

  lastactive: {
    type: Date,
    default: Date.now
  },

});

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;
