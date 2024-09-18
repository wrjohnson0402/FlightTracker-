const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5001;  // Make sure this matches the port you're using

// Enable CORS to allow requests from the frontend
app.use(cors());

// AviationStack API credentials
const API_KEY = 'your_aviationstack_api_key';  // Replace with your actual API key

// Define the flight route
app.get('/flight/:flightNumber', async (req, res) => {
  const flightNumber = req.params.flightNumber;
  console.log(`Received request for flight number: ${flightNumber}`);

  try {
    // Call the AviationStack API
    const response = await axios.get(`http://api.aviationstack.com/v1/flights?access_key=${API_KEY}&flight_iata=${flightNumber}`);
    const flightData = response.data.data[0];

    if (flightData) {
      const flightInfo = {
        departure_city: flightData.departure.airport || 'Unknown',
        arrival_city: flightData.arrival.airport || 'Unknown',
        time_departed: flightData.departure.actual || 'N/A',
        time_landed: flightData.arrival.actual || 'N/A',
      };

      console.log('Sending Flight Info:', flightInfo);  // Log the processed data
      res.json(flightInfo);  // Send JSON response
    } else {
      console.log('No flight data found.');
      res.status(404).json({ message: 'Flight not found' });
    }
  } catch (error) {
    console.error('Error fetching flight data:', error);
    res.status(500).send('Error fetching flight data');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
