var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

context.save();
context.fillStyle = "#00dead";
context.font = "30pt Courier";
context.fillText("Hello Canvas", 0, 25);

context.strokeStyle = "red";
context.font = "20pt Arial";
context.strokeText("How are you?", 10, 75);

context.restore();
