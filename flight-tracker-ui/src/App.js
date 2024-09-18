import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [flightNumber, setFlightNumber] = useState('');  // Flight number input
  const [flightData, setFlightData] = useState(null);  // Flight data to display
  const [error, setError] = useState(null);  // Error handling

  // Function to get flight information
  const getFlightInfo = async () => {
    try {
      console.log(`Fetching flight data for: ${flightNumber}`);
      const response = await axios.get(`http://localhost:5001/flight/${flightNumber}`);  // API request to backend
      console.log('Flight Info Response:', response.data);  // Log the response
      setFlightData(response.data);  // Set the flight data
      setError(null);  // Clear any previous error
    } catch (error) {
      console.error('Error fetching flight data:', error);  // Log the error
      setFlightData(null);  // Clear any previous data
      setError('Error fetching flight data. Please check the flight number.');  // Set the error message
    }
  };

  return (
    <div className="App">
      <h1>Flight Tracker</h1>
      <input
        type="text"
        placeholder="Enter Flight Number (e.g., AA460)"
        value={flightNumber}
        onChange={(e) => setFlightNumber(e.target.value)}  // Update flight number input
      />
      <button onClick={getFlightInfo}>Get Flight Info</button>  {/* Trigger the API call */}

      {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Display error if any */}

      {flightData && (  // Display flight information if available
        <div>
          <h2>Flight Information</h2>
          <p><strong>Departure City:</strong> {flightData.departure_city}</p>
          <p><strong>Arrival City:</strong> {flightData.arrival_city}</p>
          <p><strong>Time Departed:</strong> {flightData.time_departed}</p>
          <p><strong>Time Landed:</strong> {flightData.time_landed}</p>
        </div>
      )}
    </div>
  );
}

export default App;
