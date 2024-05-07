// routes/sensorRoutes.js
const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');

router.post('/sensordata', sensorController.postSensorData);

module.exports = router;
