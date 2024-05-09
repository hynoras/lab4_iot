const SensorData = require('../model/sensorDataModel');
const Device = require('../model/deviceModel');
const SensorType = require('../model/sensorTypeModel');

module.exports = {
    saveSystemInformation: async (req, res) => {
        try {
          const { deviceid, sensorid, value, devicename, sensorname } = req.body;

            const newDevice = new Device({ devicename });
            await newDevice.save();

            const newSensorType = new SensorType({ deviceid: newDevice._id, sensorname });
            await newSensorType.save();

            const newSensorData = new SensorData({ deviceid: newDevice._id, sensorid: newSensorType._id, value });
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
      },
    
    getData: async (req, res) => {
      try {
        const devices = await Device.find();
        res.status(200).json(devices);
      } catch (error) {
        console.error("Error retrieving devices:", error);
        res.status(500).json({
          error: true,
          message: "An error occurred while retrieving devices"
        });
      }
    },
    
    getAllData: async (req, res) => {
      try {
        const devices = await Device.find();
        const sensorTypes = await SensorType.find();
        const sensorData = await SensorData.find();
        
        const allData = {
          devices: devices,
          sensorTypes: sensorTypes,
          sensorData: sensorData
        };
    
        res.status(200).json(allData);
      } catch (error) {
        console.error("Error retrieving data:", error);
        res.status(500).json({
          error: true,
          message: "An error occurred while retrieving data"
        });
      }
    },


}

