const searchButtonElement = document.querySelector('.search-button-js')

// When search button is clicked we get the weather
searchButtonElement.addEventListener('click', () => {
  getWeather();
})

const inputElement = document.querySelector('.weather-input-js')

inputElement.addEventListener("keydown", (event) => {
  if (event.key === 'Enter') {
    getWeather();
  }
})

async function getWeather() {
  const city = document.querySelector('.weather-input-js').value;
  const apiKey = 'ebd7fcd3ad5fb07f4e5a4d3bb4eba656';
  // Fetching and gathering data from openweathermap Website

  // Gathering the Today weather info data
  try {
    const weatherInfoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

    let response = await fetch(weatherInfoUrl);
    if (!response.ok) {
      throw ('cannot fetch the city');
    }
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    console.error(error);
  }


  // Gathering the Hourly forecast data
  try {
    const hourlyForecastInfoUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    let response = await fetch(hourlyForecastInfoUrl);
    if (!response.ok) {
      throw ('cannot fetch the city');
    }
    const data2 = await response.json();
    displayForecast(data2);
  } catch (error) {
    console.error(error);
  }

}

function displayWeather(data) {
  const weatherInfoTitleElement = document.querySelector('.weather-info-title-js')
  const tempElement = document.querySelector('.temp-info-js')
  const weatherIconElement = document.querySelector('.weather-icon-js')
  const weatherInfoElement = document.querySelector('.weather-info-js')

  // Show elements
  weatherInfoTitleElement.style.display = 'inline-block'
  tempElement.style.display = 'inline-block'
  weatherIconElement.style.display = 'inline-block'
  weatherInfoElement.style.display = 'inline-block'

  tempElement.innerHTML = `temperature is ${data.main.temp} C`
  weatherIconElement.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  weatherInfoElement.innerHTML = `${data.weather[0].description}`
}

function displayForecast(data) {
  const weatherForecastElement = document.querySelector('.weather-forecast-js')
  let html = '';
  data.list.forEach(day => {
    const time = day.dt;
    const date = new Date(time * 1000)
    const hour = turnToTwoDigits(date.getHours())
    const minute = turnToTwoDigits(date.getMinutes());
    html += `
      <div class="forecast-day-container">
      <p>${hour}:${minute}</p>
      <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png">
      <p >${day.main.temp}C</p>
      </div>
      `

  })

  weatherForecastElement.innerHTML = html;

}
function turnToTwoDigits(number) {
  if (number < 10) { return `0${number}` } else return `${number}`;
}

