const API_KEY = 'eda8d98890214bab926190059241708';
let currentLocation = 'Bangalore';
let weatherData = null;
let currentDayOffset = 0;

// Create rain animation
function createRain() {
    const container = document.getElementById('rainContainer');
    const rainCount = 50;
    
    for (let i = 0; i < rainCount; i++) {
        const rain = document.createElement('div');
        rain.className = 'rain';
        rain.style.left = Math.random() * 100 + '%';
        rain.style.animationDuration = (Math.random() * 0.5 + 0.5) + 's';
        rain.style.animationDelay = Math.random() * 2 + 's';
        container.appendChild(rain);
    }
}

// Get weather icon
function getWeatherIcon(condition) {
    const icons = {
        'sunny': '☀️',
        'clear': '🌙',
        'partly cloudy': '⛅',
        'cloudy': '☁️',
        'overcast': '☁️',
        'mist': '🌫️',
        'rain': '🌧️',
        'drizzle': '🌦️',
        'snow': '❄️',
        'thunder': '⛈️'
    };
    
    const conditionLower = condition.toLowerCase();
    for (let key in icons) {
        if (conditionLower.includes(key)) {
            return icons[key];
        }
    }
    return '🌤️';
}

// Fetch weather data
async function fetchWeather(location) {
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=3`
        );
        const data = await response.json();
        weatherData = data;
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather:', error);
        alert('Failed to fetch weather data. Please try again.');
    }
}

// Display weather data
function displayWeather(data) {
    const date = new Date(data.location.localtime);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    document.getElementById('dateDisplay').textContent = 
        `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    document.getElementById('locationDisplay').textContent = 
        `${data.location.name}, ${data.location.country}`;
    document.getElementById('tempDisplay').textContent = 
        `${Math.round(data.current.temp_c)}°C`;
    document.getElementById('dayName').textContent = days[date.getDay()].toUpperCase();
    document.getElementById('condition').textContent = data.current.condition.text;
    
    displayHourlyForecast(0);
}

// Display hourly forecast
function displayHourlyForecast(dayOffset) {
    if (!weatherData) return;
    
    const container = document.getElementById('hourlyForecast');
    container.innerHTML = '';
    
    const forecastDay = weatherData.forecast.forecastday[dayOffset];
    const currentHour = new Date().getHours();
    
    forecastDay.hour.forEach((hour, index) => {
        const hourTime = new Date(hour.time);
        const hourNum = hourTime.getHours();
        
        if (index % 2 !== 0) return;
        
        const card = document.createElement('div');
        card.className = 'hour-card';
        
        if (dayOffset === 0 && hourNum === currentHour) {
            card.classList.add('active');
        }
        
        const period = hourNum >= 12 ? 'PM' : 'AM';
        const displayHour = hourNum % 12 || 12;
        
        card.innerHTML = `
            <div class="hour-time">${displayHour} ${period}</div>
            <div class="hour-icon">${getWeatherIcon(hour.condition.text)}</div>
            <div class="hour-temp">${Math.round(hour.temp_c)}°C</div>
        `;
        
        container.appendChild(card);
    });
}

// Change day
function changeDay(offset) {
    currentDayOffset += offset;
    if (currentDayOffset < 0) currentDayOffset = 0;
    if (currentDayOffset > 2) currentDayOffset = 2;
    
    displayHourlyForecast(currentDayOffset);
    
    const days = ['Today', 'Tomorrow', 'Day After Tomorrow'];
    document.querySelector('.nav span').textContent = days[currentDayOffset] || 'Today';
}

// Search functionality
document.getElementById('searchInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const location = e.target.value.trim();
        if (location) {
            currentLocation = location;
            currentDayOffset = 0;
            fetchWeather(location);
        }
    }
});

// Initialize
createRain();
fetchWeather(currentLocation);
