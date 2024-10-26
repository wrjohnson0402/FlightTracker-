import React, { useState } from 'react';
import axios from 'axios';

const FlightSearch = ({ onFlightsUpdate }) => {
  const [flightNumber, setFlightNumber] = useState('');
  const [error, setError] = useState(''); // State for error messages

  // Handle search by flight number
  const searchByFlightNumber = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/flights/number/${flightNumber}`);
      onFlightsUpdate(response.data);
      setError(''); // Clear any previous error
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError('This flight is not related to DFW.');
      } else {
        setError('An error occurred while fetching flight data.');
      }
      onFlightsUpdate([]); // Clear flight data if there's an error
    }
  };

  return (
    <div>
      <h2>Search Flights</h2>
      <div>
        <input
          type="text"
          placeholder="Flight Number"
          value={flightNumber}
          onChange={(e) => setFlightNumber(e.target.value)}
        />
        <button onClick={searchByFlightNumber}>Search by Flight Number</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
    </div>
  );
};

export default FlightSearch;
