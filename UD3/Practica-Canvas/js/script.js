var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

context.save();

context.fillRect(0, 0, 100, 100);

context.strokeRect(150, 10, 150, 100);

context.translate(220, 40);

context.rotate(45);

context.fillStyle = "green";
context.strokeStyle = "blue";

context.lineWidth = 20;
context.fillRect(100, 100, 150, 150);
context.strokeRect(100,100,150,150);

context.rotate(-45);

context.restore();
