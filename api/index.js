const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000; // Use PORT from .env or default to 3000

app.use(bodyParser.json());

app.post('/light', (req, res) => {
    const { light, temperature } = req.body;
    console.log("Received data:", { light, temperature });
    const numLights = calculateLights(light);
    res.json({
      error: false,
      message: "Light intensity and temperature received and processed",
      data: {
        numLights: numLights,
        temperature: temperature
      }
    });
  });
  

function calculateLights(intensity) {
  if (intensity < 100) return 0;
  else if (intensity < 500) return 1;
  else if (intensity < 800) return 2;
  else return 3;
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
