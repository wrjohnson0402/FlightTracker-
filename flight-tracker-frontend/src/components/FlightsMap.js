import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Helper function to validate if a coordinate is correct
const isValidCoordinate = (lat, lon) => lat !== null && lon !== null && !isNaN(lat) && !isNaN(lon);

const FlightsMap = ({ flights }) => {
  const mapCenter = [32.8998, -97.0403]; // DFW Airport coordinates
  const mapZoom = 7;

  // Debugging: Log the flights data to ensure it's correct
  useEffect(() => {
    console.log('Flights data:', JSON.stringify(flights, null, 2));
  }, [flights]);

  // Helper function to determine if a flight is live
  const isLiveFlight = (flight) => flight.live && isValidCoordinate(flight.live.latitude, flight.live.longitude);

  return (
    <div style={{ height: '600px', width: '100%' }}>
      <h2>DFW-Related Flights</h2>
      <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Render flights data if available */}
        {flights.map((flight, index) => {
          // Validate the coordinates before using them
          const departurePosition = isValidCoordinate(flight.departure.location.lat, flight.departure.location.lon)
            ? [flight.departure.location.lat, flight.departure.location.lon]
            : null;

          const arrivalPosition = isValidCoordinate(flight.arrival.location.lat, flight.arrival.location.lon)
            ? [flight.arrival.location.lat, flight.arrival.location.lon]
            : null;

          const livePosition = isLiveFlight(flight)
            ? [flight.live.latitude, flight.live.longitude]
            : null;

          return (
            <React.Fragment key={index}>
              {/* Render a red dot for departure airport */}
              {departurePosition && (
                <Marker position={departurePosition}>
                  <Popup>
                    <strong>Departure Airport: {flight.departure.airport}</strong><br />
                    Scheduled: {flight.departure.scheduled}<br />
                    Estimated: {flight.departure.estimated}<br />
                    Actual: {flight.departure.actual}
                  </Popup>
                  <Circle center={departurePosition} pathOptions={{ color: 'red' }} radius={10000} />
                </Marker>
              )}
              {/* Render a red dot for arrival airport */}
              {arrivalPosition && (
                <Marker position={arrivalPosition}>
                  <Popup>
                    <strong>Arrival Airport: {flight.arrival.airport}</strong><br />
                    Scheduled: {flight.arrival.scheduled}<br />
                    Estimated: {flight.arrival.estimated}<br />
                    Actual: {flight.arrival.actual}
                  </Popup>
                  <Circle center={arrivalPosition} pathOptions={{ color: 'red' }} radius={10000} />
                </Marker>
              )}
              {/* Render a blue dot if the flight is live */}
              {livePosition && (
                <Marker position={livePosition}>
                  <Popup>
                    <strong>{flight.airline} Flight {flight.flightNumber}</strong><br />
                    <strong>Live Location</strong><br />
                    Altitude: {flight.live.altitude} meters<br />
                    Speed: {flight.live.speed} km/h<br />
                    <strong>Flight Details:</strong><br />
                    <em>Departure:</em> {flight.departure.airport}<br />
                    <em>Arrival:</em> {flight.arrival.airport}<br />
                    Scheduled Departure: {flight.departure.scheduled}<br />
                    Estimated Departure: {flight.departure.estimated}<br />
                    Actual Departure: {flight.departure.actual}<br />
                    Scheduled Arrival: {flight.arrival.scheduled}<br />
                    Estimated Arrival: {flight.arrival.estimated}<br />
                    Actual Arrival: {flight.arrival.actual}
                  </Popup>
                  <Circle center={livePosition} pathOptions={{ color: 'blue' }} radius={5000} />
                </Marker>
              )}
            </React.Fragment>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default FlightsMap;
