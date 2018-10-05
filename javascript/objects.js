function createObject() {
    var newObject = new NewObject(
        document.getElementById('firstProperty').value,
        document.getElementById('secondProperty').value,
        document.getElementById('thirdProperty').value,
        document.getElementById('firstValue').value,
        document.getElementById('secondValue').value,
        document.getElementById('thirdValue').value
    );
    var childObject = new ChildObject(
        document.getElementById('firstProperty').value,
        document.getElementById('secondProperty').value,
        document.getElementById('thirdProperty').value,
        document.getElementById('firstValue').value,
        document.getElementById('secondValue').value,
        document.getElementById('thirdValue').value,
        'MyOwnProperty',
        42
    )
    document.getElementById('object').innerHTML = JSON.stringify(newObject);
    document.getElementById('child-output').innerHTML = 'Your object had a child! It takes after it, but has more.';
    document.getElementById('child-object').innerHTML = JSON.stringify(childObject);
    if (document.getElementById('crying-button') == null) {
        var btn = document.createElement("BUTTON");
        var t = document.createTextNode("Make the Child Cry");
        btn.appendChild(t);
        btn.onclick = function() {
            childObject.cry();
        };
        btn.id = 'crying-button';
        document.body.appendChild(btn);
    }
}

function NewObject(firstVarName, secondVarName, thirdVarName, firstVarValue, secondVarValue, thirdVarValue) {
    this[firstVarName] = firstVarValue;
    this[secondVarName] = secondVarValue;
    this[thirdVarName] = thirdVarValue;
}

function ChildObject(firstVarName, secondVarName, thirdVarName, firstVarValue, secondVarValue, thirdVarValue, newVarName, newVarValue) {
    NewObject.call(this, firstVarName, secondVarName, thirdVarName, firstVarValue, secondVarValue, thirdVarValue);

    this[newVarName] = newVarValue;
    this.cry = function() {
        childCrying();
    };
}

function childCrying() {
        document.getElementById('child-crying').appendChild(document.createTextNode('Waaaaaaa!!'));
};