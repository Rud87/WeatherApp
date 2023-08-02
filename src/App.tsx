import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather, Weather } from './redux/weatherSlice'; 
import './App.css';
import { RootState } from './redux/store';



const App: React.FC = () => {
  const [city, setCity] = useState('');
  const weatherData: Weather | null = useSelector((state: RootState) => state.weather.data);
  const loading: boolean = useSelector((state: RootState) => state.weather.loading);
  const error: string | null = useSelector((state: RootState) => state.weather.error);
  const dispatch = useDispatch();

  const handleFetchWeather = async () => {
    if (city) {
        await dispatch(fetchWeather(city) as any); 
        setCity('');
     {
      }
    }
  };
  return (
    <div className="app-container">
      <h1>Weather App</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleFetchWeather} disabled={loading}>
          {loading ? 'Loading...' : 'Get Weather'}
        </button>
      </div>
      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.city}</h2>
          <p>{weatherData.description}</p>
          <p>{weatherData.temperature} °C</p>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default App;
