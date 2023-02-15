var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

context.save();
var image = new Image();
image.src = "html5.png";

image.onload = function () {
    context.drawImage(image, 100, 30);
    context.drawImage(image, 0, 0, 300, 300, 0, 0, 100, 100);
}
context.restore();