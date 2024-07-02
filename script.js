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
  const tempElement = document.querySelector('.temp-info-js')
  const weatherIconElement = document.querySelector('.weather-icon-js')
  const weatherInfoElement = document.querySelector('.weather-info-js')

  console.log(data);
  console.log(data.main.temp)
}

function displayForecast(data) {
  const weatherForecastElement = document.querySelector('.weather-forecast-js')


}
