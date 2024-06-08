document.addEventListener('DOMContentLoaded', function() {
    getWeather('Kolkata'); // Call getWeather() with Kolkata as the default city
});

document.getElementById('search-button').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    getWeather(city); // Call getWeather() with the city entered by the user
});

function getWeather(city) {
    const apiKey = 'bff37e077912f555f585db393f505897'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    // Show loading spinner
    document.getElementById('current-weather-info').innerHTML = '<div class="loader"></div>';

    // Fetch current weather data
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            const weatherIcon = getWeatherIcon(data.weather[0].main);
            const weatherInfo = `
                <div class="weather-card">
                    <h3 class="city-name">${data.name}</h3>
                    <h5>today</h5>
                    <img src="${weatherIcon}" class="weather-icon">
                    <h1 class="temperature">${Math.round(data.main.temp)}°C</h1>
                    <h4 class="feels-like">Feels like: ${Math.round(data.main.feels_like)}°C</h4>
                    <div class="details">
                        <div class="col">
                            <img src="humidityi.png">
                            <div>
                                <p class="humidity">${data.main.humidity}%</p>
                                <p>Humidity</p>
                            </div>
                        </div>
                        <div class="col">
                            <img src="windl.png">
                            <div>
                                <p class="wind">${(data.wind.speed * 3.6).toFixed(2)} km/h</p>
                                <p>Wind</p>
                            </div>
                        </div>
                    </div>
                    <div class="details1">
                        <div class="col1">
                            <img src="eye.png">
                            <div>
                                <p class="visibility">${(data.visibility / 1000).toFixed(2)} km</p>
                                <p>Visibility</p>
                            </div>
                        </div>
                        <div class="col1">
                            <img src="pressure.png">
                            <div>
                                <p class="pressure">${data.main.pressure} hPa</p>
                                <p>Pressure</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.getElementById('current-weather-info').innerHTML = weatherInfo;
        })
        .catch(error => {
            // Display error message
            document.getElementById('current-weather-info').innerHTML = `<p class="error">${error.message}</p>`;
        });

    // Fetch 5-day forecast data
    fetch(forecastUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Forecast data not available');
            }
            return response.json();
        })
        .then(data => {
            let forecastInfo = '<div class="forecast-container">';
            for (let i = 0; i < 5; i++) {
                const forecast = data.list[i * 8]; // Assuming 3-hour interval data, get daily forecast
                forecastInfo += `
                    <div class="weather-card forecast-item">
                        <h2>${new Date(forecast.dt_txt).toDateString()}</h2>
                        <img src="${getWeatherIcon(forecast.weather[0].main)}" class="weather-icon1">
                        <p>Temp: ${Math.round(forecast.main.temp)}°C</p>
                        <p>Wind: ${(forecast.wind.speed * 3.6).toFixed(2)} km/h</p>
                        <p>Humidity: ${forecast.main.humidity}%</p>
                    </div>
                `;
            }
            forecastInfo += '</div>';
            document.getElementById('forecast-info').innerHTML = forecastInfo;
        })
        .catch(error => {
            // Display error message
            document.getElementById('forecast-info').innerHTML = `<p class="error">${error.message}</p>`;
        });
}

function getWeatherIcon(weatherCondition) {
    let icon = '';
    switch (weatherCondition) {
        case 'Clear':
            icon = 'clear.png';
            break;
        case 'Clouds':
            icon = 'clouds.png';
            break;
        case 'Rain':
            icon = 'rain.png';
            break;
        case 'Snow':
            icon = 'snow.png';
            break;
        case 'Mist':
            icon = 'mist.png';
            break;
        case 'Drizzle':
            icon = 'drizzle.png';
            break;
        default:
            icon = 'clear.png';
            break;
    }
    return icon;
}
