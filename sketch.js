var x = 0;
var y = 0;


function setup(){
    createCanvas(windowWidth, windowHeight);
}

function draw(){
    background('#40E0D0');

    x = lerp(x, mouseX, 0.05);
    y = lerp(y, mouseY, 0.05);

    fill('#880808');
    ellipse(x,y,50,50);
    
   
}
