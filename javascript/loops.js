function countdown () {
    var countdownValue = document.getElementById('countdown').value;
    var outputBox = document.getElementById('countdown-output');

    if (!!countdownValue && !!outputBox) {
        if (countdownValue > 20) {
            this.printWarning('That\'s too big, try a smaller number, maybe below 20', outputBox);
        } else if (countdownValue <= 3) {
            this.printWarning('That\'s too small, try a bigger number, maybe higher than 3', outputBox);
        } else {
            this.printCountDownToOutputBox(countdownValue, outputBox);
        }
    }
}

function add() {
    var numbersToAdd = [
        document.getElementById('firstNumber').value,
        document.getElementById('secondNumber').value,
        document.getElementById('thirdNumber').value,
        document.getElementById('fourthNumber').value
    ];
    var runningSum = 0;
    for (var value in numbersToAdd) {
        if (!!value) {
            runningSum += +numbersToAdd[value];
        }
    }

    var associateArray = {sum: runningSum, message: 'The sum is: '};
    var outputBox = document.getElementById('add-output').innerHTML = associateArray['message'] + ' ' + associateArray['sum'];
}

function printCountDownToOutputBox(value, outputBox) {
    var message = '';
    for (var i = value; i > 0; i--) {
        message += '<br>' + i + '!';
    }

    message += '<br>BLASTOFF!!';
    outputBox.innerHTML = message;
}

function printToOutputBox(value, outputBox) {
    outputBox.innerHTML = message;
}

function printWarning(message, outputBox) {
    outputBox.innerHTML = message;
}