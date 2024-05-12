// routes/sensorRoutes.js
const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');

router.post('/save', controller.saveSystemInformation);
router.get('/getAll', controller.getData);
router.get('/getAllData', controller.getAllData);


module.exports = router;
