const SensorData = require('../models/sensorDataModel');

module.exports = {
    postSensorData: async (req, res) => {
        try {
          const { deviceid, sensorid, value } = req.body;
          const newSensorData = new SensorData({ deviceid, sensorid, value });
          await newSensorData.save();
          res.status(201).json({
            error: false,
            message: "Sensor data saved successfully"
          });
        } catch (error) {
          console.error("Error saving sensor data:", error);
          res.status(500).json({
            error: true,
            message: "An error occurred while saving sensor data"
          });
        }
      }
}

