const apiKey = "731c3a33700e46ab8ee190347250510";

function getWeather() {
    const location = document.getElementById("locationInput").value;
    const errorEl = document.getElementById("error");
    const card = document.getElementById("weatherCard");

    errorEl.textContent = "";
    card.style.display = "none";

    if (location === "") {
        errorEl.textContent = "Please enter a city name.";
        return;
    }

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("city").textContent =
                `${data.location.name}, ${data.location.country}`;

            document.getElementById("temperature").textContent =
                `${data.current.temp_c}°C`;

            document.getElementById("condition").textContent =
                data.current.condition.text;

            document.getElementById("icon").src =
                "https:" + data.current.condition.icon;

            document.getElementById("humidity").textContent =
                `Humidity: ${data.current.humidity}%`;

            document.getElementById("wind").textContent =
                `Wind: ${data.current.wind_kph} km/h`;

            card.style.display = "block";
        })
        .catch(error => {
            errorEl.textContent = "Unable to fetch weather data.";
        });
}
