// Replace with your OpenWeatherMap API key
const API_KEY = "2f3e38b8d3e5bd0f7595d9be71a0529c";

document.getElementById("searchBtn").addEventListener("click", getWeather);

function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const state = document.getElementById("stateInput").value.trim();
    const errorMsg = document.getElementById("errorMsg");
    const weatherResult = document.getElementById("weatherResult");

    // Clear previous messages
    errorMsg.textContent = "";
    weatherResult.classList.add("hidden");

    if (!city) {
        errorMsg.textContent = "Please enter a city name.";
        return;
    }

    // Build query: city,state,US (assuming US for simplicity)
    let query = city;
    if (state) {
        query += `,${state},US`;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(query)}&appid=${API_KEY}&units=imperial`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
            document.getElementById("temperature").textContent = `Temperature: ${data.main.temp}°F`;
            document.getElementById("description").textContent = `Condition: ${data.weather[0].description}`;
            document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            weatherResult.classList.remove("hidden");
        })
        .catch(error => {
            errorMsg.textContent = error.message;
        });
}
