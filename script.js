const cityName = document.querySelector("#city-name");
const form = document.querySelector("form");
const innerData = document.querySelector(".inner-container");
const loading = document.querySelector(".loading");

const apiKey = "d3608d4d906815abcad9943a67aeaf8f";

form.addEventListener("input", (event) => {
  event.preventDefault();
  innerData.innerHTML = "";
  const fetchWeather = async function () {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${apiKey}`
    );
    const responseJSON = await response.json();
    return responseJSON;
  };

  const weatherData = fetchWeather();
  weatherData.then((data) => {
    let html = `
    <div class="city-container">
        <div class="city-name">${data.name},${data.sys.country}</div>
        <div class="weather-condition">${data.weather[0].main}</div>
    </div>

    <div class="temp-container">
        <div class="weather-icon">
        <img src="http://openweathermap.org/img/wn/${
          data.weather[0].icon
        }@2x.png" alt="weather-condition-icon">
    </div>
    
    <div class="temp">${(data.main.temp - 273.15).toFixed(2)}°C</div>

    <div class="minmax">
        <div class="min">${(data.main.temp_min - 273.15).toFixed(2)}°C</div>
        <div class="max">${(data.main.temp_max - 273.15).toFixed(2)}°C</div>
    </div>
    
    </div>
    `;
    innerData.innerHTML = html;
  });
});
