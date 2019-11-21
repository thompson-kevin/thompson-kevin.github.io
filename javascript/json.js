function getWeather() {
    var outputBox = document.getElementById('weather-output');
    var rawOutputBox = document.getElementById('raw-output');
    var zipCode = document.getElementById('zip').value;

    if (zipCode.length === 5) {
        var oReq = new XMLHttpRequest();
        var url = 'https://api.openweathermap.org/data/2.5/weather?zip={zipCode},us&APPID=3b7c61b3e3937e09f648d488b3aebcfa';
        url = url.replace('{zipCode}', zipCode);
        oReq.open('GET', url);
        oReq.outputBox = outputBox;
        oReq.rawOutputBox = rawOutputBox;
        oReq.printResponse = function(message, output) {
            output.innerHTML = message;
        };
        oReq.onreadystatechange = function() {
            if (oReq.readyState === 4) {
                var response = JSON.parse(oReq.response);
                oReq.printResponse(JSON.stringify(response), oReq.rawOutputBox);
                oReq.printResponse(response.weather[0].description, oReq.outputBox);
            }
          }
        oReq.send();
    } else {
        this.printWarning('That is not a valid zip code. Please input a 5 digit Zip', outputBox);
    }
}

