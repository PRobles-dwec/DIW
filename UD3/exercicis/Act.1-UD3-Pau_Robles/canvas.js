var sales = [{
   product: "Basketballs",
   units: 150
}, {
  product: "Baseballs",
  units: 125
}, {
  product: "Footballs",
  units: 300
}];

   const canvas = document.querySelector("#canvas");
   const ctx = canvas.getContext("2d");

   canvas.height = window.innerHeight;
   canvas.width = window.innerWidth;
   
   //Create gradient
   var grad1 = ctx.createLinearGradient(400, 400, 450, 400); //x e y
   grad1.addColorStop(0,"#df5833");
   grad1.addColorStop(1,"white");

   ctx.fillStyle = grad1;
   ctx.fillRect(300, 400, 150, 400);

   var grad2 = ctx.createLinearGradient(600, 600, 750, 600); //x e y
   grad2.addColorStop(0,"#479fc6");
   grad2.addColorStop(1,"white");

   ctx.fillStyle = grad2;
   ctx.fillRect(600, 440, 150, 360);

   var grad3 = ctx.createLinearGradient(400, 700, 900, 1400); //x e y
   grad3.addColorStop(0,"#ea8144");
   grad3.addColorStop(1,"white");

   ctx.fillStyle = grad3;
   ctx.fillRect(900, 200, 150, 600);  

   //Lines
   ctx.beginPath();
   ctx.moveTo(250,10);

   ctx.lineTo(250,800);
   ctx.lineTo(800,800);
   ctx.lineTo(1600,800);
   ctx.stroke();
  
   //Fonts 
   ctx.font = "bold 30px Arial";
   ctx.fillStyle= "black";
   ctx.fillText("Units Sold", 60, 400);

   ctx.font = "bold 30px Arial";
   ctx.fillStyle= "black";
   ctx.fillText("(in 100s)", 70, 430);
   
   ctx.font = "bold 30px Arial";
   ctx.fillStyle= "black";
   ctx.fillText("Basketballs", 300, 830);

   ctx.font = "bold 30px Arial";
   ctx.fillStyle= "black";
   ctx.fillText("Baseball", 630, 830);

   ctx.font = "bold 30px Arial";
   ctx.fillStyle= "black";
   ctx.fillText("Footballs", 925, 830);

   ctx.font = "bold 30px Arial";
   ctx.fillStyle= "black";
   ctx.fillText("Product", 670, 900);

   //Arrow from top
   ctx.beginPath();
   ctx.moveTo(250,10);
   ctx.lineTo(240,18);
   ctx.moveTo(250,10);
   ctx.lineTo(260,18);
   
   ctx.stroke();