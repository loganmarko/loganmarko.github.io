let balls = [];
let numberOfBalls = 185;
let ballDrop = false;

function setup() {
    createCanvas(windowWidth, windowHeight);


//////////////////////////////////////////////////////////////////////////
// remixed code from https://p5js.org/reference/p5/createButton/
//////////////////////////////////////////////////////////////////////////
    let button = createButton('Drop');
    button.position(10, 10);
    button.mousePressed(function () {
        ballDrop = !ballDrop;
        if (ballDrop) {
            spawnBalls();
        }
    });
//////////////////////////////////////////////////////////////////////////
//end of remixed code
//////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////
//remixed code from https://p5js.org/reference/p5/createColorPicker/
//////////////////////////////////////////////////////////////////////////
    backgroundPicker = createColorPicker('gray');
    backgroundPicker.position(70,10)
}
//////////////////////////////////////////////////////////////////////////
//end of remixed code
//////////////////////////////////////////////////////////////////////////

function spawnBalls() {
    balls = [];
    for (let i = 0; i < numberOfBalls; i++) {
        balls.push({
            x: random(width),          // Random X position
            y: random(0, height / 4),  // Random Y start position
            size: random(15, 30),      // Random size
            color: [random(255), random(255), random(255)], // Random color
            speedY: random(1, 5),      // Initial downward speed
            gravity: random(0.15, 0.45), // Gravity effect
            bounceFactor: 0.8          // Energy loss on bounce
        });
    }
}

function draw() {
    background(backgroundPicker.color());

    if (ballDrop) {
        for (let i = 0; i < balls.length; i++) {
            let ball = balls[i];

///////////////////////////////////////////////////////////////////////////
//remixed code from https://editor.p5js.org/duf20/sketches/EW_RLffHj
///////////////////////////////////////////////////////////////////////////        
            ball.speedY += ball.gravity;
            ball.y += ball.speedY;


            if (ball.y > height - ball.size / 2) {
                ball.y = height - ball.size / 2; // Keep above the floor
                ball.speedY *= -ball.bounceFactor; // Reverse velocity with bounce effect
            }
///////////////////////////////////////////////////////////////////////////
//end of remixed code
///////////////////////////////////////////////////////////////////////////

            // Draw ball
            fill(ball.color);
            noStroke();
            ellipse(ball.x, ball.y, ball.size);
        }
    }
}
