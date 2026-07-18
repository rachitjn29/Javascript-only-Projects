const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");

const weatherCard = document.querySelector(".weather-card");

const city = document.getElementById("city");
const icon = document.getElementById("icon");
const temp = document.getElementById("temp");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

const message = document.getElementById("message");

const weatherCode = {
    0: ["☀️", "Clear Sky"],
    1: ["🌤️", "Mainly Clear"],
    2: ["⛅", "Partly Cloudy"],
    3: ["☁️", "Cloudy"],
    45: ["🌫️", "Fog"],
    61: ["🌧️", "Rain"],
    71: ["❄️", "Snow"],
    95: ["⛈️", "Thunderstorm"]
};

searchBtn.addEventListener("click", async function () {

    let cityName = cityInput.value.trim();

    if (cityName === "") {
        message.textContent = "Enter City Name";
        return;
    }

    message.textContent = "Loading...";
    weatherCard.style.display = "none";

    let response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`);

    let data = await response.json();

    if (!data.results) {
        message.textContent = "City Not Found";
        return;
    }

    let lat = data.results[0].latitude;
    let lon = data.results[0].longitude;

    let weather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`);

    let weatherData = await weather.json();

    let current = weatherData.current;

    city.textContent = data.results[0].name ;

    temp.textContent = current.temperature_2m + "°C";

    humidity.textContent = current.relative_humidity_2m + "%";

    wind.textContent = current.wind_speed_10m + " km/h";

    icon.textContent = weatherCode[current.weather_code]?.[0] || "🌍";

    condition.textContent = weatherCode[current.weather_code]?.[1] || "Unknown";

    weatherCard.style.display = "block";

    message.textContent = "";

});