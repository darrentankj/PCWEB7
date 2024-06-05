const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const precipitationElement = document.getElementById('precipitation');
const uvIndexElement = document.getElementById('uvIndex');

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchCoordinates(location);
    }
});

function fetchCoordinates(location) {
    const geoAPI = `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1&language=en&format=json`;
    fetch(geoAPI)
  .then(response => response.json())
  .then(data => {
    console.log(data); // Log the JSON data to the console
    const latitude = data.results[0].latitude;
    const longitude = data.results[0].longitude;
    const timezone = data.results[0].timezone;
    fetchWeatherData(latitude,longitude,timezone); 
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
}

function fetchWeatherData(latitude,longitude,timezone) {
    const weatherAPI = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=is_day&daily=temperature_2m_max,uv_index_max,precipitation_probability_max&timezone=${timezone}`;
    fetch(weatherAPI)
  .then(response => response.json())
  .then(data => {
    console.log(data); // Log the JSON data to the console
    const todayTemperature = data.daily.temperature_2m_max[0];
    const todayUVIndex = data.daily.uv_index_max[0];
    const todayPrecipitation = data.daily.precipitation_probability_max[0];
    updatePage(todayTemperature,todayUVIndex,todayPrecipitation,timezone);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
    //const url = `${apiUrl}?latitude=YOUR_LATITUDE&longitude=YOUR_LONGITUDE&current=temperature_2m,humidity_2m,precipitation,uv_index`;
}

function updatePage(todayTemperature,todayUVIndex,todayPrecipitation,timezone){
    locationElement.innerHTML = timezone;
    temperatureElement.innerHTML = todayTemperature;
    uvIndexElement.innerHTML = todayUVIndex;
    precipitationElement.innerHTML = todayPrecipitation;
}



