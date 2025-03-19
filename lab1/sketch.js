

function setup(){
    createCanvas(windowWidth,windowHeight);
}

function draw(){
    background (100, 60, 100,10);
    fill('aquamarine');
    stroke('white')
    for(var i = 0; i < 2000; i++){
        ellipse( (i*10)%width,(i*10)%height,20,20);
    }

    for(var i = 2000; i > 600; i--){
        rect( (i*10)%width,(i*10)%height,20,20);
    }

    fill('blue');
    stroke('black')
    if(mouseX < 250){
        rect(mouseX,mouseY,100,100);
    }else{
        ellipse(mouseX,mouseY, 50,50);
    }
}