import React from "react";
import "./weather.css";
const { useState } = require("react");

function Weather(props) {
  const [city, setCity] = useState(null);
  const [data, setData] = useState(null);
  // const key = process.env.API_KEY;
  const key = "7f5dfdc553afb9f3fe00d585003a60fa";
  console.log(key);

  function getWeatherData(e) {
    e.preventDefault();
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        return setData(data);
      })
      .catch((e) => {
        return console.log(e);
      });
  }
  function handleChange(e) {
    setCity(e.target.value);
  }
  return (
    <div className="main-div">
      <div className="card">
        <div className="container">
          <form className="form-class" onSubmit={getWeatherData}>
            <input onChange={handleChange} type="text" value={city} />
            <button type="submit">Get Weather Data</button>
          </form>
          {data && data.cod !== "404" && (
            <div>
              <p>
                Temperature:&nbsp;
                {data.main.temp}°C
              </p>
              <p>
                {" "}
                Weather:&nbsp;{data && data.weather[0].description} &#x2601;
              </p>

              <p>
                {" "}
                Wind Speed:&nbsp;{data.wind.speed}{" "}
                <span style={{}}>&#x1f32c;</span>
              </p>
            </div>
          )}
          {data && data.cod === "404" && <div>City Not Found</div>}
        </div>
      </div>
    </div>
  );
}

export default Weather;
