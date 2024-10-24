import React, { useState } from 'react';
import axios from 'axios';

const FlightSearch = () => {
  const [flightNumber, setFlightNumber] = useState('');
  const [flightData, setFlightData] = useState(null);
  const [error, setError] = useState(null);

  // Function to handle form submission
  const handleSearch = async (event) => {
    event.preventDefault();
    setError(null);  // Reset error state
    setFlightData(null);  // Reset flight data

    try {
      // Make a request to your backend server
      const response = await axios.get(`http://localhost:5001/flight/${flightNumber}`);
      setFlightData(response.data);
    } catch (err) {
      // Handle errors
      setError('Could not fetch flight data. Please check the flight number and try again.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Flight Tracker</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter Flight Number"
          value={flightNumber}
          onChange={(e) => setFlightNumber(e.target.value)}
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <button type="submit" style={{ marginLeft: '10px', padding: '10px' }}>
          Search
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {flightData && (
        <div style={{ marginTop: '20px' }}>
          <h2>Flight Information:</h2>
          <p><strong>Departure City:</strong> {flightData.departure_city}</p>
          <p><strong>Arrival City:</strong> {flightData.arrival_city}</p>
          <p><strong>Time Departed:</strong> {flightData.time_departed}</p>
          <p><strong>Time Landed:</strong> {flightData.time_landed}</p>
          <p><strong>In Air:</strong> {flightData.is_in_air ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  );
};

export default FlightSearch;
