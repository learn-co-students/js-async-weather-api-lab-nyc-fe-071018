const API_KEY = "f95af1184f615fd3709e7bb7e9d89667"

function handleFormSubmit(event) {
  //handle submit event
  event.preventDefault()
  const city = document.getElementById('city').value.replace(/ /g, "+")
  fetchCurrentWeather(city)
  fetchFiveDayForecast(city)
  
}

function fetchCurrentWeather(city) {
  //fetch current weather based on city
  const currentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${API_KEY}`
   fetch(currentWeather)
  .then(response => response.json())
  .then(responseJSON => displayCurrentWeather(responseJSON))
}

function displayCurrentWeather(json) {
  //render current weather data to the DOM using provided IDs and json from API
  //current temp, low, hi, humidity, cloud cover
  const mainData = json.main
  const temp = document.getElementById('temp')
  const low = document.getElementById('low')
  const high = document.getElementById('high')
  const humidity = document.getElementById('humidity')
  const cloudCover = document.getElementById('cloudCover')
  
  temp.innerHTML = mainData.temp + "°"
  low.innerHTML = mainData.temp_min + "°"
  high.innerHTML = mainData.temp_max + "°"
  humidity.innerHTML = mainData.humidity + "%"
  cloudCover.innerHTML = json.clouds.all + "%"
}


function fetchFiveDayForecast(city) {
  //fetch five day forecast data based on city
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&APPID=${API_KEY}`)
  .then(response => response.json())
  .then(responseJSON => {
    displayFiveDayForecast(responseJSON)
    createChart(responseJSON)
  })
  // .then (responseJSON => createChart(responseJSON))
}

function displayFiveDayForecast(json) {
  //render five day forecast data to the DOM using provided IDs and json from API
  const forecast = json.list
  const aside = document.querySelector('aside')
  // let counter = 0
  // let lowAverageTemp = 0
  // let highAverageTemp = 0
  forecast.forEach((eachForecastItem) => {
    // counter++
    // highAverageTemp += eachForecastItem.main.temp_max
    // lowAverageTemp += eachForecastItem.main.temp_min
    // if (counter === 8) {
      const div = document.createElement('div')
      div.innerHTML = `<p>${eachForecastItem.dt_txt}</p>
      <p>Temperature: ${eachForecastItem.main.temp}</p>
      <p>Humidity: ${eachForecastItem.main.humidty}</p>`
      aside.appendChild(div)
    //     counter = 0
    //     highAverageTemp = 0
    //     lowAverageTemp = 0
    // }
  })
}

function createChart(json) {
  //Bonus: render temperature chart using five day forecast data and ChartJS
  const ctx = document.getElementById('WeatherChart').getContext('2d')
  const labels = json.list.map((increment) => increment.dt_txt)
  const data = json.list.map((increment) => increment.main.temp)
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Temperature',
            data: data,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
}

document.addEventListener('DOMContentLoaded', function() {
  //add event listener here for form submission
  document.addEventListener('submit', handleFormSubmit)
})
