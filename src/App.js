import React, { useState } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [city, setCity] = useState(""); // to store the input value (city)
  const [weatherData, setWeatherData] = useState(null); // to store the fetched weather data
  const [error, setError] = useState(""); // to store error messages

  const API_KEY = "0e589f722d7d07f0ed565fda8a01a184"; // Replace with your OpenWeatherMap API key

  // Fetch weather data when the user submits the city name
  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }

    setError(""); // Reset error message
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      setWeatherData(response.data); // Update state with the weather data
    } catch (err) {
      setError("City not found. Please try again.");
      setWeatherData(null); // Clear any previous data
    }
  };

  return (
    <div className="App">
      <h1>Weather Dashboard</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)} // Update city state on input change
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weatherData && (
        <div>
          <h3>Weather for {weatherData.name}, {weatherData.sys.country}</h3>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;
