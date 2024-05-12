const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sensorTypeSchema = new mongoose.Schema({
  deviceid: {
    type: Schema.Types.ObjectId,
    ref: 'Device'
  },
  sensorname: {
    type: String,
    required: true
  }
});

const SensorType = mongoose.model('SensorType', sensorTypeSchema);

module.exports = SensorType;
