const city = document.querySelector('.city');
const weatherContainer = document.querySelector('.weather');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');

async function getWeather() {
    console.log(language);
    city.value = language === 'en' ? 'Minsk' : 'Минск';
    const value = city.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${value}&lang=${language}&APPID=898d22496df5ad676fbee8c5e9665da9&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp}°C`;
    weatherDescription.textContent = data.weather[0].description;
}
getWeather();

city.addEventListener('change', getWeather);
city.addEventListener('focusout', getWeather);