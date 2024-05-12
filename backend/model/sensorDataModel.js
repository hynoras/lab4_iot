const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sensorDataSchema = new mongoose.Schema({
  deviceid: {
    type: Schema.Types.ObjectId,
    ref: 'Device'
  },
  sensorid: {
    type: Schema.Types.ObjectId,
    ref: 'SensorType'
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  value: {
    type: Number,
    required: true
  }
});

const SensorData = mongoose.model('SensorData', sensorDataSchema);

module.exports = SensorData;
