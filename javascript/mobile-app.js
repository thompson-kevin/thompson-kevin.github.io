var currentWeatherBox;
var currentForecastBox;
var weatherHistory = [];
var zip;
var imageHtml = '<img src="$src" style="animation-name: shake; animation-duration: 4s; animation-iteration-count: infinite; animation-timing-function: linear;">'
var weatherInformationHTML = '<div>$CityName</div><div>$WeatherDescription<span class="icon glyphicon glyphicon-minus" id="$id" onclick="deleteWeather(this.id)"></span></div><div>$Temp&deg;</div>';

function onLoad() {
    this.currentWeatherBox = document.getElementById('weather-icon');
    this.currentForecastBox = document.getElementById('forecast');
    this.zip = document.getElementById('zip');
    zip.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
       event.preventDefault();
       document.getElementById("weatherButton").click();
      }
    });
    zip.focus();
    var storedData = JSON.parse(localStorage.getItem('weatherHistory'));
    if (storedData && storedData.length > 0) {
        storedData.forEach(weather => {
                this.getWeatherByLatitudeAndLongitudeLookup(weather.coord.lat, weather.coord.lon);
        });
    } else {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getPosition);
        }
    }
}

function getWeather() {
    var zipCode = document.getElementById('zip').value;
    this.getWeatherFromZipCode(zipCode);
}

function getWeatherByLatitudeAndLongitudeLookup(lat, lon) {
    var oReq = new XMLHttpRequest();
    var url = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&APPID=3b7c61b3e3937e09f648d488b3aebcfa';

    url = url.replace('{lat}', lat.toString());
    url = url.replace('{lon}', lon.toString());
    oReq.open('GET', url);
    oReq.onreadystatechange = function() {
        if (oReq.readyState === 4) {
            var response = JSON.parse(oReq.response);
            if (response.cod !== '404') {
                weatherHistory.push(response);
                updateWeatherInformation();
                localStorage.setItem('weatherHistory', JSON.stringify(weatherHistory));
            } else {
                printWarning('Invalid zip code.', outputBox);
            }
        }
    }
    oReq.send();
}

function getWeatherFromZipCode(zipCode) {
    this.printWarning('', outputBox);
    if (zipCode.length === 5) {
        var oReq = new XMLHttpRequest();
        var url = 'https://api.openweathermap.org/data/2.5/weather?zip={zipCode},us&APPID=3b7c61b3e3937e09f648d488b3aebcfa';
        url = url.replace('{zipCode}', zipCode);
        oReq.open('GET', url);
        oReq.onreadystatechange = function() {
            if (oReq.readyState === 4) {
                var response = JSON.parse(oReq.response);
                if (response.cod !== '404') {
                    var newList = [];
                    newList.push(response);
                    weatherHistory.forEach(weather => {
                        if (weather.name != response.name) {
                            newList.push(weather)
                        }
                    });
                    weatherHistory = newList;
                    if (weatherHistory.length > 3) {
                        weatherHistory.pop();
                    }
                    updateWeatherInformation();
                    zip.value = '';
                    localStorage.setItem('weatherHistory', JSON.stringify(weatherHistory));
                } else {
                    printWarning('Invalid zip code.', outputBox);
                }
            }
          }
        oReq.send();
    } else {
        printWarning('Invalid zip code.', outputBox);
    }
}

function updateWeatherIcon(weatherInformation) {
    var image = document.createElement("img");
    image.src = getWeatherImageSrc(weatherInformation);
    image.style.animationName = 'shake';
    image.style.animationDuration = '4s';
    image.style.animationIterationCount = 'infinite';
    image.style.animationTimingFunction = 'linear';
    return image;
}

function updateWeatherInformation() {
    clearWeatherInformation();
    weatherHistory.forEach(weatherInformation => {
        var image = updateWeatherIcon(weatherInformation);
        var weatherInfo = weatherInformationHTML;
        weatherInfo = weatherInfo.replace('$CityName', weatherInformation.name);
        weatherInfo = weatherInfo.replace('$WeatherDescription', weatherInformation.weather[0].description.charAt(0).toUpperCase() + weatherInformation.weather[0].description.slice(1));
        weatherInfo = weatherInfo.replace('$Temp', convertKelvinToF(weatherInformation.main.temp));
        weatherInfo = weatherInfo.replace('$id', weatherInformation.name);

        var infoWrapper = document.createElement('div');
        infoWrapper.style.padding = '24px';
        infoWrapper.style.width = '20em';
        infoWrapper.innerHTML = weatherInfo;

        var weatherWrapper = document.createElement('div');
        weatherWrapper.style.display = 'flex';
        weatherWrapper.appendChild(image);
        weatherWrapper.appendChild(infoWrapper);

        currentForecastBox.append(weatherWrapper);
    });
}

function convertKelvinToF(tempInK) {
    var tempInF = (+tempInK - 273.15) * (9/5) + 32;
    return Math.floor(tempInF * 100 / 100);
}

function getWeatherImageSrc(weatherInformation) {
    switch(weatherInformation.weather[0].main) {
        case "Clouds":
        case "Mist":
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
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    getWeatherByLatitudeAndLongitudeLookup(lat, long)
}

function deleteWeather(cityName) {
    var index = -1;
    for (var i = 0; i < weatherHistory.length; i++) {
        if (weatherHistory[i].name == cityName) {
            index = i;
        }
    }
    if (index != -1) {
        weatherHistory.splice(index, 1);
        localStorage.setItem('weatherHistory', JSON.stringify(weatherHistory));
        updateWeatherInformation();
    }
}

function clearWeatherInformation() {
    while (currentForecastBox.firstChild) {
        currentForecastBox.removeChild(currentForecastBox.firstChild);
    }
}

function printWarning(message, outputBox) {
    outputBox.innerHTML = message;
}

function printResponse(response, outputBox) {
    outputBox.innerHTML = response;
}