var currentWeatherBox;
var currentZipCode;
var currentWeather;

function onLoad() {
    this.currentWeatherBox = document.getElementById('weather-icon');
    this.postalCodeLookup()
}

function getWeather() {
    var zipCode = document.getElementById('zip').value;
    this.getWeatherFromApi(zipCode);
}

function getWeatherFromApi(zipCode) {
    if (zipCode.length === 5) {
        var oReq = new XMLHttpRequest();
        var url = 'https://api.openweathermap.org/data/2.5/weather?zip={zipCode},us&APPID=3b7c61b3e3937e09f648d488b3aebcfa';
        url = url.replace('{zipCode}', zipCode);
        oReq.open('GET', url);
        oReq.onreadystatechange = function() {
            if (oReq.readyState === 4) {
                var response = JSON.parse(oReq.response);
                currentWeather = response;
                updateWeatherIcon();
            }
          }
        oReq.send();
    } else {
        this.printWarning('That is not a valid zip code. Please input a 5 digit Zip', outputBox);
    }
}

function updateWeatherIcon() {
        let image = document.createElement("img");
    if (this.currentWeather != null && this.currentWeatherBox.childElementCount === 0) {
        image.src = getWeatherImageSrc();
        this.currentWeatherBox.appendChild(image);
    } else {
        this.currentWeatherBox.children[0].src = getWeatherImageSrc();
    }
    this.currentWeatherBox.children[0].style.animationName = 'shake';
    this.currentWeatherBox.children[0].style.animationDuration = '4s';
    this.currentWeatherBox.children[0].style.animationIterationCount = 'infinite';
    this.currentWeatherBox.children[0].style.animationTimingFunction = 'linear';
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

function postalCodeLookup() {
//    var head= document.getElementsByTagName('head')[0],
//        script= document.createElement('script');
//    script.src= '//maps.googleapis.com/maps/api/js?sensor=false';
//    head.appendChild(script);
//    script.onload = function() {
//        if (navigator.geolocation) {
//            this.currentZipCode = this.currentZipCode,
//                fallback = setTimeout(function () {
//                    fail('10 seconds expired');
//                }, 10000);
//
//            navigator.geolocation.getCurrentPosition(function (pos) {
//                clearTimeout(fallback);
//                var point = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
//                new google.maps.Geocoder().geocode({'latLng': point}, function (res, status) {
//                    if (status == google.maps.GeocoderStatus.OK && typeof res[0] !== 'undefined') {
//                        var zip = res[0].formatted_address.match(/,\s\w{2}\s(\d{5})/);
//                        if (zip) {
//                            this.currentZipCode = zip[1];
//                        } else fail('Unable to look-up postal code');
//                    } else {
//                        fail('Unable to look-up geolocation');
//                    }
//                });
//            }, function (err) {
//                fail(err.message);
//            });
//        } else {
//            alert('Unable to find your location.');
//        }
//        function fail(err) {
//            console.log('err', err);
//            this.currentZipCode = 'Try Again.';
//        }
//    };
}