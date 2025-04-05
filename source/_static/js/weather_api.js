// Using OpenWeatherMap API to get weather data
async function fetchWeatherData() {
    const apiKey = '58f0b4fecfb408ee6e2d5ac24c369a6e'; // OpenWeatherMap API Key
    
    try {
        // Show loading status
        updateWeatherDisplay({
            city: 'Locating...',
            temp: 'Loading...',
            text: 'Loading...',
            humidity: 'Loading...',
            windDir: 'Loading...',
            windScale: 'Loading...'
        });
        
        // First get user's IP address and locate the city
        const ipResponse = await fetch('https://ipapi.co/json/');
        const ipData = await ipResponse.json();
        
        console.log('IP location data:', ipData);
        
        // Use the located city to get weather
        const city = ipData.city || 'Beijing'; // If location fails, use Beijing as default
        
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=en`);
        const data = await response.json();
        
        console.log('API response data:', data); // For debugging, check the returned data structure
        
        if(data.cod === 200) { // 200 means success
            const weatherInfo = {
                city: city,
                temp: data.main.temp,
                text: data.weather[0].description,
                humidity: data.main.humidity,
                windDir: getWindDirection(data.wind.deg),
                windScale: getWindScale(data.wind.speed)
            };
            updateWeatherDisplay(weatherInfo);
        } else {
            console.error('Failed to get weather data:', data.message || 'Unknown error');
            showError('Failed to get weather data: ' + (data.message || 'Unknown error'));
        }
    } catch (error) {
        console.error('Error getting weather data:', error);
        showError('Error getting weather data: ' + error.message);
    }
}

// Convert wind direction angle to direction text
function getWindDirection(degree) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round((degree % 360) / 45) % 8;
    return directions[index];
}

// Convert wind speed to wind scale
function getWindScale(speed) {
    if (speed < 0.3) return 'Level 0';
    if (speed < 1.6) return 'Level 1';
    if (speed < 3.4) return 'Level 2';
    if (speed < 5.5) return 'Level 3';
    if (speed < 8.0) return 'Level 4';
    if (speed < 10.8) return 'Level 5';
    if (speed < 13.9) return 'Level 6';
    if (speed < 17.2) return 'Level 7';
    if (speed < 20.8) return 'Level 8';
    if (speed < 24.5) return 'Level 9';
    if (speed < 28.5) return 'Level 10';
    if (speed < 32.7) return 'Level 11';
    return 'Level 12+';
}

function showError(message) {
    const weatherDisplay = document.getElementById('weather-display');
    if (weatherDisplay) {
        weatherDisplay.innerHTML = `
            <div class="weather-card error">
                <h3>Weather Data Retrieval Failed</h3>
                <p>${message}</p>
                <button onclick="fetchWeatherData()">Retry</button>
            </div>
        `;
    }
}

function updateWeatherDisplay(weather) {
    const weatherDisplay = document.getElementById('weather-display');
    
    if (weatherDisplay) {
        weatherDisplay.innerHTML = `
            <div class="weather-card">
                <h3>Weather in ${weather.city || 'Unknown City'}</h3>
                <p>Temperature: ${weather.temp}°C</p>
                <p>Weather: ${weather.text}</p>
                <p>Humidity: ${weather.humidity}%</p>
                <p>Wind Direction: ${weather.windDir}</p>
                <p>Wind Force: ${weather.windScale}</p>
            </div>
        `;
    } else {
        console.error('Cannot find element with ID "weather-display"');
    }
}

// Get weather data immediately after page loads
document.addEventListener('DOMContentLoaded', function() {
    fetchWeatherData();
    // // Update weather data every hour
    // setInterval(fetchWeatherData, 3600000);
    
    // Update weather data every week
    setInterval(fetchWeatherData, 604800000);
});