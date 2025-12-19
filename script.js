// Replace with your OpenWeatherMap API key
const API_KEY = "YOUR_API_KEY_HERE";

document.getElementById("searchBtn").addEventListener("click", getWeather);

function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const errorMsg = document.getElementById("errorMsg");
    const weatherResult = document.getElementById("weatherResult");

    // Clear previous messages
    errorMsg.textContent = "";
    weatherResult.classList.add("hidden");

    if (!city) {
        errorMsg.textContent = "Please enter a city name.";
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
            document.getElementById("temperature").textContent = `Temperature: ${data.main.temp}°C`;
            document.getElementById("description").textContent = `Condition: ${data.weather[0].description}`;
            document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            weatherResult.classList.remove("hidden");
        })
        .catch(error => {
            errorMsg.textContent = error.message;
        });
}
