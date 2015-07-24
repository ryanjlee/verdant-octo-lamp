var addCircle = function () {
    var svg = document.getElementById('container');
    var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
    var x = Math.floor(Math.random() * (450 - 50)) + 50;
    var y = Math.floor(Math.random() * (450 - 50)) + 50;
    var color = colorize();
    circle.setAttribute('cx', x);
    circle.setAttribute('cy', y);
    circle.setAttribute('r', 50);
    circle.setAttribute('stroke', color);
    circle.setAttribute('fill', color);
    circle.setAttribute('stroke-width', 1);
    circle.addEventListener('click', removeCircle);
    svg.appendChild(circle);
    setTimeout(removeCircle, 2000, circle);
};

var removeCircle = function (obj) {

    console.log(obj);
    
    var circle = obj.target ? obj.target : obj;

    var parent = circle.parentNode;
    parent.removeChild(circle);
    
    if (parent.getElementsByTagName('circle').length === 0) {
        clearInterval(startGame);
        alert("Game Over");
    }
};

var colorize = function () {
    return '#' + Math.floor(Math.random() * 16777216).toString(16);
}

var startGame = setInterval(addCircle, 750);
