var redBrick = {
    x: 0,
    y: 0,
    w: 30,
    h: 30,
    xSpeed: 4,
    ySpeed: 4,
    colour: 'red',
    draw: function(){
        fill(this.colour);
        rect(this.x, this.y, this.w, this.h);
    },
    move: function(){
        this.x += this.xSpeed; //+= take the current value of the left and add what is on the right side
       this.y +=this.ySpeed;

        if(this.y > height - this.h||this.y < 0){
           this.ySpeed *= -1;
        }

        if(this.x > width - this.w ||this.x < 0){
           this.xSpeed *=-1;
    }
}
}

var blueBrick = {
    x: 380,
    y: 200,
    w: 50,
    h: 50,
    xSpeed: -6,
    ySpeed: -6,
    colour: 'blue',
    draw: function(){
        fill(this.colour);
        rect(this.x, this.y, this.w, this.h);
    },
    move: function(){
        this.x += this.xSpeed; //+= take the current value of the left and add what is on the right side
       this.y +=this.ySpeed;

        if(this.y > height - this.h ||this.y < 0){
           this.ySpeed *= -1;
        }

        if(this.x > width - this.w||this.x < 0){
           this.xSpeed *=-1;
    }
}
}
//redBrick.x++ returns the value of x then increments it
//redBrick.x =this.x + 1 increments x by 1

function setup(){
    createCanvas(1200,720)
}

function draw(){
    background('grey')
   redBrick.draw();
   redBrick.move();
   blueBrick.draw();
   blueBrick.move();
}