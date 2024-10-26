import React, { useState } from 'react';
import FlightSearch from './components/FlightSearch';
import FlightsMap from './components/FlightsMap';

function App() {
  const [flights, setFlights] = useState([]); // State to hold the flights data

  // Function to update flights data based on search results
  const handleFlightsUpdate = (newFlights) => {
    setFlights(newFlights);
  };

  return (
    <div>
      <h1>DFW Flight Tracker</h1>
      <FlightSearch onFlightsUpdate={handleFlightsUpdate} />
      <FlightsMap flights={flights} />
    </div>
  );
}

export default App;
