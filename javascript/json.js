function getWeather() {
    var outputBox = document.getElementById('weather-output');
    var rawOutputBox = document.getElementById('raw-output');
    var zipCode = document.getElementById('zip').value;

    if (zipCode.length === 5) {
        var oReq = new XMLHttpRequest();
        var url = 'https://api.openweathermap.org/data/2.5/weather?zip={zipCode},us&APPID=3b7c61b3e3937e09f648d488b3aebcfa';
        url.replace('{zipCode}', zipCode);
        oReq.open('GET', url);
        oReq.send();
        var response = JSON.parse(oReq);
        this.printResponse(JSON.stringify(response), rawOutputBox);
        this.printResponse(response.weather.description, outputBox);
    } else {
        this.printWarning('That is not a valid zip code. Please input a 5 digit Zip', outputBox);
    }
}

function printWarning(message, outputBox) {
    outputBox.innerHTML = message;
}

function printResponse(response, outputBox) {
    outputBox.innerHTML = response;
}