import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; 

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=0cf3d05c6cb443424f42856d18e090b3`);
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching the weather data", error);
      setWeather(null);
    }
  };

  return (
    <div className="weather-container">
      <img src="loc.jpg" className='img-fluid image' alt=""/>
      <div className="overlay"></div>
      <div className="weather-content div">
        <h1 className="weather-title mt-5">Search Weather</h1>
        <div className="weather-search mb-4">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={handleChange}
            className="weather-input"
          />
          <button onClick={handleSubmit} className="weather-button">
            Search
          </button>
        </div>
        {weather && (
          <div className="weather-details">
            <h2 className="weather-city">{weather.name}</h2>
            <h3 className="weather-temp">Temperature: {weather.main.temp} °F</h3>
            <h4 className="weather-feels-like">Feels Like: {weather.main.feels_like} °F</h4>
            <h4 className="weather-humidity">Humidity: {weather.main.humidity}%</h4>
            <h4 className="weather-wind">Wind: {weather.wind.speed} mph</h4>
            <h4 className="weather-description">{weather.weather[0].description}</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
