// Day vars
var currentDay = dayjs().format('dddd MMMM, DD, YYYY');
$('#currentDay').text(currentDay);

var futureDay1 = dayjs().format('MM, DD, YYYY');
$('#future-day-1').text(futureDay1);

var futureDay2 = dayjs().format('MM, DD, YYYY');
$('#future-day-2').text(futureDay2);

var futureDay3 = dayjs().format('MM, DD, YYYY');
$('#future-day-3').text(futureDay3);

var futureDay4 = dayjs().format('MM, DD, YYYY');
$('#future-day-4').text(futureDay4);

var futureDay5 = dayjs().format('MM, DD, YYYY');
$('#future-day-5').text(futureDay5);

var futureDay6 = dayjs().format('MM, DD, YYYY');
$('#future-day-6').text(futureDay6);

var futureDay7 = dayjs().format('MM, DD, YYYY');
$('#future-day-7').text(futureDay7);

var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#city-input");
var searchedBtn = document.querySelector("#city-search");
var pastSearch = document.querySelector("#history");
var forecast = document.querySelector("#forecast");

// city history
const cityHistory = JSON.parse(localStorage.getItem("City History")) || [];

// history list creation
function displayHistory() {
  pastSearch.innerHTML = ""
  for (var i = 0; i < cityHistory.length; i++) {
    var element = document.createElement('div');
    element.classList = 'list-item col-12 text-center';
    element.innerText = cityHistory[i];
    element.addEventListener("click", function (event) {
      var city = event.target.innerText;
      getCityWeather(city);
      getForecast(city);
    });
    pastSearch.append(element);
  }
}

// always runs displayHistory
displayHistory();

var formSubmitHandler = function (event) {
  event.preventDefault();
  var userCity = nameInputEl.value.trim();
  if (cityHistory.indexOf(userCity) === -1) {
    cityHistory.push(userCity);
    localStorage.setItem("City History", JSON.stringify(cityHistory));
    displayHistory();
  }
  getCityWeather(userCity);
  getForecast(userCity);
};

searchedBtn.addEventListener("click", formSubmitHandler);

// obtains long/lat/icon/description/temp/wind/humidity of the city inputted
function getCityWeather(userCity) {
  // Changes main weather displays location name
  document.querySelector("#currentCity").innerText = userCity + " (" + currentDay + ")";

  // api key/data/icon creation
  var apiKey = "c3654ee7ab43c8f864f04bba9aaf7c2b";
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&units=metric&appid=" + apiKey
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var cityLon = data.coord.lon;
      var cityLat = data.coord.lat;
      var icon = data.weather[0].icon;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      var description = data.weather[0].description;
      var descriptionCap = (description);
      document.querySelector(".description").innerText = descriptionCap;
      var temp = data.main.temp;
      document.querySelector(".temp").innerText = "Temperature: " + temp + " °C";
      var temp1 = data.main;
      var speed = data.wind.speed;
      document.querySelector(".wind").innerText =
        "Wind: " + speed + " m/s";
      var humidity = data.main.humidity;
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
    })
    .then(function (resp) {
      return resp.json();
    })
    .catch(function (err) {
      "Error Text: " + err;
    });
}

// fetch forecast data
function getForecast(userCity) {
  var apiKey = "b2d439ce49a28c344a72488b4179d8ee";
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      userCity +
      "&units=metric&appid=" +
      apiKey
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      forecast.innerHTML = ""
      // card creation
      for (var i = 0; i < data.list.length; i++){
        if (data.list[i].dt_txt.indexOf("15:00:00") > 0){
        var day = document.createElement("div");
        day.classList.add("day","col-12","col-sm-12","col-md-6","col-lg-4","col-xl-2","mr-0.5");

        var h1 = document.createElement("h1");
        h1.classList.add("weekHeader");
        var dateDay = data.list[i].dt_txt.split("-")[2];
        var dateDay = dateDay.split(" ")[0];
        var dateMonth = data.list[i].dt_txt.split("-")[1];
        var dateYear = data.list[i].dt_txt.split("-")[0];
        h1.innerText = dateMonth + "/" + dateDay + "/" + dateYear;
        
        var icon = document.createElement("img")
        icon.src = 
        "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png";

        var temp = document.createElement("h5");
        temp.innerText = "Temp: " + data.list[i].main.temp + " °C";

        var wind = document.createElement("h5");
        wind.innerText = "Wind: " + data.list[i].wind.speed + " m/s";

        var humidity = document.createElement("h5");
        humidity.innerText = "Humidity: " + data.list[i].main.humidity + "%";

        day.append(h1,icon,temp,wind,humidity);
        forecast.append(day);
        }
      }
    })
};

// Autocomplete widget
$(function () {
    var cityNames = [
      'Toronto',
      'Vancouver',
      'Rome',
      'Paris',
      'Hong Kong',
      'Barcelona',
      'New York',
      'Istanbul',
      'Dubai',
      'Tokyo',
      'London',
      'Amsterdam',
      'Madrid',
      'Seoul',
      'Prague',
      'Mexico City',
      'Bangkok',
      'Osaka',
      'Lisbon',
      'Sydney',
      'Beijing',
      'Montreal',
      'Calgary',
      'Ottawa',
      'Edmonton',
      'Mississsauga',
      'Kitchener',
      'Chicago',
      'Houston',
      'Arlington',
      'Virginia',
    ];
    $('#city-input').autocomplete({
        source: cityNames,
        autoFocus: true,
        minLength: 1

    });
  });
  