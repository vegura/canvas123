// var canvas = document.getElementById("myCanvas");
// var ctx = canvas.getContext("2d");
// ctx.moveTo(0, 20);
// ctx.lineTo(20, 80);
// ctx.lineTo(70, 100);
// ctx.strokeStyle = "blue";
// ctx.stroke();

// ctx.font = "30px Arial";
// ctx.fillText("Hello World", 10, 50);

// var gradient = ctx.createLinearGradient();

// var x = Math.random() * innerWidth;
// var y = Math.random() * innerHeight;
// var dx = (Math.random() - 0.5) * 5;
// var dy = (Math.random() - 0.5) * 5;
// var radius = 30;


var canvas = document.querySelector("canvas");

// making fullscreen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight; 

// creating context
var context = canvas.getContext("2d");

function drawSquares() {

	context.fillStyle = "#bbb";
	context.fillRect(100, 100, 100, 100);
	context.fillStyle = "#ccc";
	context.fillRect(201, 100, 100, 100);
	context.fillStyle = "#ddd";
	context.fillRect(302, 100, 100, 100);
	console.log(canvas);
}

function drawLines() {
	context.beginPath();
	context.moveTo(50, 300);
	context.lineTo(300, 100);
	context.lineTo(400, 300);
	context.strokeStyle = "#ccc";
	context.stroke();	
}

// circle / arc

function randomColor() {
	let dict = "0123456789abcdef"
	let colorFillerString = "#";
	for (let i = 0; i < 6; i++) {
		let randomPoint = Math.random() * dict.length;
		colorFillerString = colorFillerString + dict.charAt(randomPoint);
	}
	console.log(colorFillerString);
	return colorFillerString;
}

function drawCircles() {
	for (let i = 0; i < 1000; i++) {
		let x = Math.random() * window.innerWidth;
		let y = Math.random() * window.innerHeight;
		
		context.beginPath();
		context.arc(x, y, 30, 0, Math.PI * 2, false);
		context.strokeStyle = randomColor();
		context.stroke();
	}	
}

var mouse = {
	x: undefined,
	y: undefined
}

var maxRadius = 40;
// var minRadius = 10;

var colorArray = [
	"#ffaa33",
	"#99ffaa", 
	"#00ff00", 
	"#4411aa",
	"#ff1100"
]

window.addEventListener("mousemove", function(event) {
	mouse.x = event.x;
	mouse.y = event.y;
	console.log(mouse);	
});

window.addEventListener("resize", function(event) {
	canvas.width = event.x;
	canvas.height = event.y;
});

function Circle(x, y, dx, dy, radius) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.minRadius = radius;
	this.radius = radius;
	this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

	this.draw = function() {

		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		// context.strokeStyle = "blue";
		context.fillStyle = this.color;
		// context.stroke();
		context.fill();
	}

	this.update = function() {
		if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
			this.dx = - this.dx;
		}

		if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
			this.dy = - this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;

		// interactivity
		if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && 
			mouse.y - this.y < 50 && mouse.y - this.y > -50) {
			if (this.radius < maxRadius) {
				this.radius += 1;
			}
		} else if (this.radius > this.minRadius) {
			this.radius -= 1;
		}

		// this.draw();
	}
}

var circleArray = [];
function init() {

	circleArray = [];
	for (let i = 0; i < 1000; i++) {
		let radius = Math.random() * 5 + 3;
		let x = Math.random() * (innerWidth - radius*2) + radius;
		let y = Math.random() * (innerHeight - radius*2) + radius;
		let dx = (Math.random() - 0.5);
		let dy = (Math.random() - 0.5);

		circleArray.push(new Circle(x, y, dx, dy, radius));
	}
}

function animate() {
	requestAnimationFrame(animate); 
	context.clearRect(0,0, window.innerWidth, window.innerHeight);

	for (let i = 0; i < circleArray.length; i++) {
		circleArray[i].draw();
		circleArray[i].update();
	}
}

// animate();
init();
animate();
 