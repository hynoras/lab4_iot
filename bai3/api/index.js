const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const sensorRoutes = require('./routes/sensorRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/sensor",sensorRoutes);

mongoose
  .connect(
    "mongodb+srv://hynoras:Quang23022002@cluster0.hxredev.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => {
    console.log(err);
    console.error("Could not connect to MongoDB...");
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
