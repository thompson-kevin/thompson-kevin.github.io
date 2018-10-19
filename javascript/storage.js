window.addEventListener("load", function() {
    var keys = Object.keys(localStorage);
    for (var i = 0; i < keys.length; i++) {
        outputToDom(keys[i]);
    }
    if (!!keys && keys.length > 0) {
        var outputDiv = document.getElementById('storage-output');
        var node = document.createTextNode("(Local Storage Values Carried Over With Refresh!!)")
        outputDiv.insertBefore(node, outputDiv.childNodes[0]);
    }
});

function storeBasicData() {
    var basicProp = document.getElementById('basicProperty').value;
    var basicValue = document.getElementById('basicValue').value;
    document.getElementById('basicProperty').value = null;
    document.getElementById('basicValue').value = null;

    if (!!basicValue) {
        localStorage.setItem(basicProp, basicValue);
        outputToDom(basicProp);
    }
}

function addToArray() {
    var newNumberElement = document.getElementById('array-number');
    var newNumber = newNumberElement.value;
    newNumberElement.value = null;

    if (!!newNumber) {
        var currentArrayElement = document.getElementById('array-value-output');
        var currentArray = !!currentArrayElement.innerHTML ? JSON.parse(currentArrayElement.innerHTML) : [];
        currentArray.push(newNumber);
        currentArrayElement.innerHTML = JSON.stringify(currentArray);
    }
}

function storeArray() {
    var currentArrayElement = document.getElementById('array-value-output');
    var currentArray = !!currentArrayElement.innerHTML ? JSON.parse(currentArrayElement.innerHTML) : null;
    if (!!currentArray) {
        var arrayString = 'myArray' + document.getElementById('storage-output').childElementCount;
        localStorage.setItem(arrayString, currentArray);
        currentArrayElement.innerHTML = null;
        outputToDom(arrayString);
    }
}

function storeObject() {
    var firstPropElement = document.getElementById('firstProperty');
    var secondPropElement = document.getElementById('secondProperty');
    var thirdPropElement = document.getElementById('thirdProperty');
    var firstValueElement = document.getElementById('firstValue');
    var secondValueElement = document.getElementById('secondValue');
    var thirdValueElement = document.getElementById('thirdValue');

    var newObject = new NewObject(
        firstPropElement.value,
        secondPropElement.value,
        thirdPropElement.value,
        firstValueElement.value,
        secondValueElement.value,
        thirdValueElement.value
    );

    firstPropElement.value = null;
    secondPropElement.value = null;
    thirdPropElement.value = null;
    firstValueElement.value = null;
    secondValueElement.value = null;
    thirdValueElement.value = null;

    if (!!newObject) {
        var newObjectKey = 'newObject' + document.getElementById('storage-output').childElementCount;
        localStorage.setItem(newObjectKey, JSON.stringify(newObject));
        outputToDom(newObjectKey);
    }
}

function NewObject(firstVarName, secondVarName, thirdVarName, firstVarValue, secondVarValue, thirdVarValue) {
    this[firstVarName] = firstVarValue;
    this[secondVarName] = secondVarValue;
    this[thirdVarName] = thirdVarValue;
}

function refreshPage() {
    location.reload();
}

function clearStorage() {
    localStorage.clear();
    var outputDiv = document.getElementById('storage-output');
    while (outputDiv.firstChild) {
        outputDiv.removeChild(outputDiv.firstChild);
    }
}

function outputToDom(key) {
    var outputDiv = document.getElementById('storage-output');
    var value = localStorage.getItem(key);
    var listItem = document.createElement("LI");
    var node = document.createTextNode(value);

    listItem.appendChild(node);
    outputDiv.appendChild(listItem);
}