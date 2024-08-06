const apikey = "9e2e9c8f14be8ea69de86f3d554c29d5";

const weatherData = document.getElementById('weather-data');
const cityInput = document.getElementById('city-input');

const form = document.querySelector('form');

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const cityVal = cityInput.value;
    getWeatherData(cityVal);
});

async function getWeatherData(cityVal) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=${apikey}&units=metric`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;

        const icon = data.weather[0].icon;
        const details = [
            `Feels Like : ${Math.round(data.main.feels_like)}`,
            `Humidity : ${data.main.humidity} %`,
            `Wind speed : ${data.wind.speed} m/s`,
        ]
        weatherData.querySelector('.icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather Icon">`;
        weatherData.querySelector('.temperature').textContent = `${temperature} °C`;
        weatherData.querySelector('.description').textContent = description;

        weatherData.querySelector('.details').innerHTML = details.map((detail) => `<div>${detail}</div>`).join("");
    } catch (error) {
        weatherData.querySelector('.icon').innerHTML = "";
        weatherData.querySelector('.temperature').textContent = "";
        weatherData.querySelector('.description').textContent = "An error happened, Please try again later.";

        weatherData.querySelector('.details').innerHTML = "";
    }
}