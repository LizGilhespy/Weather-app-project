let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
let units = "metric";

function showTemperature(response) {
  let cityTemp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = `${cityTemp}`;
  let currentCity = document.querySelector("#city");
  let city = response.data.name;
  let humidity = document.querySelector("#humidity");
  let currentHumidity = response.data.main.humidity;
  let temperature = document.querySelector("#temperature");
  let currentTemperature = Math.round(response.data.main.temp);

  let wind = document.querySelector("#wind");
  let windspeed = Math.round(response.data.wind.speed);

  currentCity.innerHTML = `${city}`;
  humidity.innerHTML = `${currentHumidity}`;
  temperature.innerHTML = `${currentTemperature}`;
  wind.innerHTML = `Wind: ${windspeed} km/hr`;
}

function searchCity(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#city");
  let searchInput = document.querySelector("#search-city");
  let city = searchInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  currentCity.innerHTML = `${city}`;
  axios.get(`${apiUrl}`).then(showTemperature);
}

function getLocation(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let geoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(`${geoUrl}`).then(pageData);
}

function pageData(response) {
  let currentCity = document.querySelector("#city");
  let city = response.data.name;
  let humidity = document.querySelector("#humidity");
  let currentHumidity = response.data.main.humidity;
  let temperature = document.querySelector("#temperature");
  let currentTemperature = Math.round(response.data.main.temp);

  let wind = document.querySelector("#wind");
  let windspeed = Math.round(response.data.wind.speed);

  currentCity.innerHTML = `${city}`;
  humidity.innerHTML = `${currentHumidity}%`;
  temperature.innerHTML = `${currentTemperature}`;
  wind.innerHTML = `${windspeed} km/hr`;
}

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",,
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",,
];

let currentYear = now.getFullYear();
let currentDay = days[now.getDay()];
let currentMonth = months[now.getMonth()];
let currentDate = now.getDate();
let currentHour = now.getHours();
let currentMinute = addZero(now.getMinutes());

if (currentHour >= 12) {
  var timeOfDay = "pm";
} else {
  var timeOfDay = "am";
}

function addZero(x) {
  if (x < 10) {
    x = "0" + x;
  }
  return x;
}

let todayDateTime = document.querySelector("#today-date");
todayDateTime.innerHTML = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear}`;
let currentTime = document.querySelector("#today-time");
currentTime.innerHTML = `${currentHour}:${currentMinute}${timeOfDay}`;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

function buttonClick(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

let currentButton = document.querySelector("#current-location-btn");
currentButton.addEventListener("click", buttonClick);
