import React, { useState } from 'react';
import logo from './Assets/wind.png';
import logo1 from './Assets/humidity.png';
import logo2 from './Assets/location.png';


const api = {
  key: "16687c4d4c0335f52b91e4ad8edf9b66",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
          });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className= 'app'>
      <main>
        <div className="search-box">
          Weather.org
          <input
            type="text"
            className="search-bar"
            placeholder="Search City name..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />  
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>  
          <div className="location-box">
            <div className="location"><img src={logo2} alt="Logo" width="25" height="25"/>  {weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°C
            </div>
            <div className="max-min">
              Max: {weather.main.temp_max}°C | Min: {weather.main.temp_min}°C
            </div>
            <div className="weather">
              Weather description: {weather.weather[0].description}
            </div>
            <div className="humidity">
              <img src={logo1} alt="Logo" width="20" height="20"/>  Humidity: {weather.main.humidity}%
            </div>
            <div className="wind">
              <img src={logo} alt="Logo" width="20" height="20"/>  Wind Speed: {weather.wind.speed} m/s
            </div>
            <div className="visibility">
              Visibility: {weather.visibility} 
            </div>
          </div>
        </div>  
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
