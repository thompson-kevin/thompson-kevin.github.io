window.addEventListener("load", function() {
    this.box = document.getElementById('box');
    box.style.left = '400px';
    box.style.top = '400px';
});

window.addEventListener('keydown', function (e) {
    if (e.keyCode == 37) {  this.moveLeft(); }
    if (e.keyCode == 39) {  this.moveRight(); }
    if (e.keyCode == 38) {  this.moveUp(); }
    if (e.keyCode == 40) {  this.moveDown(); }
})


var box;

function moveUp() {
    var currentVal = parseNumbers(this.box.style.top);
    if (currentVal > 270) {
        box.style.top = (currentVal[0] - 10) + 'px';
    }
}

function moveDown() {
    var currentVal = parseNumbers(this.box.style.top);
    if (currentVal < 690) {
        box.style.top = (currentVal[0] + 10) + 'px';
    }
}

function moveLeft() {
    var currentVal = parseNumbers(this.box.style.left);
    if (currentVal > 10) {
        box.style.left = (currentVal[0] - 10) + 'px';
    }
}

function moveRight() {
    var currentVal = parseNumbers(this.box.style.left);
    if (currentVal < 740) {
        box.style.left = (currentVal[0] + 10) + 'px';
    }
}

function getPosition( element ) {
   var rect = element.getBoundingClientRect();
   return {x:rect.left,y:rect.top};
}

function parseNumbers( string ) {
    return string.match(/\d+/g).map(Number);
}

function boxDance() {
    this.box.style.WebkitAnimation = 'spin 4s 1';
    this.box.style.animation = 'spin 4s 1';
    resetAnimation();
}

function boxColor() {
    this.box.style.backgroundColor = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
}

function boxShrink() {
    this.box.style.width = '25px';
    this.box.style.height = '25px';
    document.getElementById('returnBox').disabled = null;
    document.getElementById('shrinkBox').disabled = true;
}

function boxReturns() {
    this.box.style.width = '50px';
    this.box.style.height = '50px';
    document.getElementById('returnBox').disabled = true;
    document.getElementById('shrinkBox').disabled = null;
}

function resetAnimation(){
    setTimeout(function(){
        this.box.style.animation = null;
        this.box.style.WebkitAnimation = null;
    }, 4100);
}