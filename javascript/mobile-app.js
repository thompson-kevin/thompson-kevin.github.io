var currentWeatherBox;
var currentForecastBox;
var currentZipCode;
var currentWeather;
var weatherHistory = [];
var weatherInformationHTML = '<div>$CityName</div><div>$WeatherDescription</div><div>$Temp&deg;</div>';
var imageHtml = '<img src="$src" style="animation-name: shake; animation-duration: 4s; animation-iteration-count: infinite; animation-timing-function: linear;">'
var lat;
var long;

function onLoad() {
    this.currentWeatherBox = document.getElementById('weather-icon');
    this.currentForecastBox = document.getElementById('forecast');
    this.getWeatherByLatitudeAndLongitudeLookup();
}

function getWeather() {
    var zipCode = document.getElementById('zip').value;
    this.getWeatherFromZipCode(zipCode);
}

function getWeatherByLatitudeAndLongitudeLookup() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosition);
    }
}

function getWeatherFromZipCode(zipCode) {
    this.printWarning('', outputBox);
    if (zipCode.length === 5 && weatherHistory[currentWeather.name] == null) {
        var oReq = new XMLHttpRequest();
        var url = 'https://api.openweathermap.org/data/2.5/weather?zip={zipCode},us&APPID=3b7c61b3e3937e09f648d488b3aebcfa';
        url = url.replace('{zipCode}', zipCode);
        oReq.open('GET', url);
        oReq.onreadystatechange = function() {
            if (oReq.readyState === 4) {
                var response = JSON.parse(oReq.response);
                if (response.cod !== '404') {
                    currentWeather = response;
                    weatherHistory[currentWeather.name] = response;
                    updateWeatherInformation();
                } else {
                    printWarning('Invalid zip code.', outputBox);
                }
            }
          }
        oReq.send();
    } else if (weatherHistory[currentWeather.name] != null) {
        // TODO create new list with option at the top?
    } else {
        printWarning('Invalid zip code.', outputBox);
    }
}

function updateWeatherIcon() {
    var image = document.createElement("img");
    image.src = getWeatherImageSrc();
    image.style.animationName = 'shake';
    image.style.animationDuration = '4s';
    image.style.animationIterationCount = 'infinite';
    image.style.animationTimingFunction = 'linear';
    return image;
}

function updateWeatherInformation() {
    var image = updateWeatherIcon();
    var weatherInfo = weatherInformationHTML;
    weatherInfo = weatherInfo.replace('$CityName', currentWeather.name);
    weatherInfo = weatherInfo.replace('$WeatherDescription', currentWeather.weather[0].description.charAt(0).toUpperCase() + currentWeather.weather[0].description.slice(1));
    weatherInfo = weatherInfo.replace('$Temp', convertKelvinToF(currentWeather.main.temp));

    var infoWrapper = document.createElement('div');
    infoWrapper.id = currentWeather.name;
    infoWrapper.innerHTML = weatherInfo;

    var weatherWrapper = document.createElement('div');
    weatherWrapper.style.display = 'flex';
    weatherWrapper.appendChild(image);
    weatherWrapper.appendChild(infoWrapper);

    currentForecastBox.prepend(weatherWrapper);
}

function convertKelvinToF(tempInK) {
    var tempInF = (+tempInK - 273.15) * (9/5) + 32;
    return Math.floor(tempInF * 100 / 100);
}

function getWeatherImageSrc() {
    switch(this.currentWeather.weather[0].main) {
        case "Clouds":
            return "../assets/weather-icons/cloud_night_weather_smiley.svg";
        case "Sunny":
            return "../assets/weather-icons/sun_smile_happy.svg";
        case "Rain":
            return "../assets/weather-icons/rain_cloud_cry.svg";
        case "Snow":
            return "../assets/weather-icons/snow_cloud_sad.svg";
        case "Thunder":
            return "../assets/weather-icons/thunder_cloud_angry.svg";
        case "Clear":
            var date = new Date;
            if (date.getHours() > 16) {
                return "../assets/weather-icons/moon_sleepy_night.svg";
            } else {
                return "../assets/weather-icons/sun_smile_happy.svg";
            }
    }
}

function getPosition(position) {
  lat = position.coords.latitude;
  long = position.coords.longitude;
  var oReq = new XMLHttpRequest();
              var url = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&APPID=3b7c61b3e3937e09f648d488b3aebcfa';

              url = url.replace('{lat}', this.lat.toString());
              url = url.replace('{lon}', this.long.toString());
              oReq.open('GET', url);
              oReq.onreadystatechange = function() {
                  if (oReq.readyState === 4) {
                      var response = JSON.parse(oReq.response);
                      if (response.cod !== '404') {
                          currentWeather = response;
                          weatherHistory[currentWeather.name] = response;
                          updateWeatherInformation();
                      } else {
                          printWarning('Invalid zip code.', outputBox);
                      }
                  }
                }
              oReq.send();
}

function printWarning(message, outputBox) {
    outputBox.innerHTML = message;
}

function printResponse(response, outputBox) {
    outputBox.innerHTML = response;
}