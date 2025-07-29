// === Replace with your OpenWeatherMap API key ===
const API_KEY = 'YOUR_API_KEY';

const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherSection = document.getElementById('weatherSection');
const noResults = document.getElementById('noResults');
const locationBtn = document.getElementById('locationBtn');

function showWeather(data) {
  // Show section, hide error
  weatherSection.style.display = 'block';
  noResults.style.display = 'none';

  document.getElementById('city').innerText = `${data.name}, ${data.sys.country}`;
  document.getElementById('icon').src =
    `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  document.getElementById('temp').innerHTML =
    `${Math.round(data.main.temp)}°C`;
  document.getElementById('desc').innerText = data.weather[0].description;
  document.getElementById('humidity').innerText =
    `Humidity: ${data.main.humidity}%`;
  document.getElementById('wind').innerText =
    `Wind: ${data.wind.speed} m/s`;
}
function showError() {
  weatherSection.style.display = 'none';
  noResults.style.display = 'block';
}
function getWeather(city) {
  if (!city) return;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
  )
    .then((response) => {
      if (!response.ok) throw new Error();
      return response.json();
    })
    .then((data) => showWeather(data))
    .catch(() => showError());
}
searchBtn.addEventListener('click', () => getWeather(cityInput.value));
cityInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') getWeather(cityInput.value);
});
locationBtn.addEventListener('click', () => {
  if ('geolocation' in navigator)
    navigator.geolocation.getCurrentPosition((pos) => {
      const {latitude, longitude} = pos.coords;
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => showWeather(data))
        .catch(() => showError());
    }, showError);
});
