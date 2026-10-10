const apiKey = "YOUR_OPENWEATHERMAP_API_KEY";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

const weatherForm = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const message = document.getElementById("message");
const weatherInfo = document.getElementById("weatherInfo");

weatherForm.addEventListener("submit", getWeather);

async function getWeather(event) {
    event.preventDefault();

    const city = cityInput.value.trim();
    message.textContent = "Loading...";
    weatherInfo.hidden = true;

    try {
        if (apiKey === "YOUR_OPENWEATHERMAP_API_KEY") {
            throw new Error("Add your OpenWeatherMap API key in script.js first.");
        }

        const response = await fetch(
            apiUrl + "?q=" + encodeURIComponent(city) +
            "&appid=" + apiKey + "&units=metric"
        );
        const weatherData = await response.json();

        if (!response.ok) {
            throw new Error(weatherData.message || "Could not get weather for that city.");
        }

        document.getElementById("cityName").textContent = weatherData.name;
        document.getElementById("temperature").textContent = weatherData.main.temp;
        document.getElementById("condition").textContent = weatherData.weather[0].description;
        document.getElementById("humidity").textContent = weatherData.main.humidity;
        document.getElementById("windSpeed").textContent = weatherData.wind.speed;

        weatherInfo.hidden = false;
        message.textContent = "";
    } catch (error) {
        message.textContent = error.message || "A network error occurred. Please try again.";
    }
}
