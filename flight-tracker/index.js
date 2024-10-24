// Load environment variables from .env.local file
require('dotenv').config({ path: '.env.local' });

// Import necessary modules
const express = require('express');
const axios = require('./node_modules/axios/index.d.cts');
const cors = require('cors');

// Initialize Express app
const app = express();
const PORT = 5001; // Server will run on port 5001

// Enable CORS to allow cross-origin requests from the frontend
app.use(cors());

// Get the API key from environment variables
const API_KEY = process.env.AVIATION_STACK_API_KEY;

// Route to get flight information by flight number
app.get('/flight/:flightNumber', async (req, res) => {
  const flightNumber = req.params.flightNumber;
  console.log(`Received request for flight number: ${flightNumber}`);

  try {
    // Make a request to the AviationStack API
    const response = await axios.get('http://api.aviationstack.com/v1/flights', {
      params: {
        access_key: API_KEY,
        flight_iata: flightNumber,
      },
    });

    const flightData = response.data.data[0];

    if (flightData) {
      // Prepare relevant flight information
      const flightInfo = {
        departure_city: flightData.departure.airport || 'Unknown',
        arrival_city: flightData.arrival.airport || 'Unknown',
        time_departed: flightData.departure.actual || 'N/A',
        time_landed: flightData.arrival.actual || 'N/A',
        is_in_air: flightData.live && !flightData.live.is_ground, // Check if flight is in the air
      };

      console.log('Sending Flight Info:', flightInfo);
      res.json(flightInfo); // Send flight data as JSON
    } else {
      console.log('No flight data found.');
      res.status(404).json({ message: 'Flight not found' });
    }
  } catch (error) {
    console.error('Error fetching flight data:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error fetching flight data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
