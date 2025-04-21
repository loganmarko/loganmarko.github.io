//Pixel Fishing
// Thank you for a great semester, I learned a lot about a coding language I had never used before and I am excited to keep trying out new ideas.
// I hope you have a great summer!
// -Logan


let boat;
let fish = [];
let numFish = 50;
let fishImages = {};
let points = {
    blue: 1,
    orange: 1,
    green: 1,
    wide: 1,
    gold: 10
}
let fishermanImg;
let fishingLine = false;
let reelingFish = false;
let caughtFish = null;
let lineEndY;
let dropSpeed = 3;
let reelSpeed = 5;
let score = 0;
let gameState = "Start";
let buttonX, buttonY, buttonW, buttonH;
let timeLeft;
let gameOverButtonW = 200, gameOverButtonH = 60;
let gameDuration = 30;
let timerStarted = false;


function preload(){ // Load images before setup
    fishermanImg = loadImage("fisherman.png");
    fishImages = {
        blue: loadImage("bluefish.png"),
        orange: loadImage("orangefish.png"),
        green: loadImage("greenfish.png"),
        wide: loadImage("widefish.png"),
        gold: loadImage("Gold.png")
    };
}

function setup(){
    createCanvas(windowWidth, windowHeight);

    textFont('Arial');
    textStyle(NORMAL);

    buttonW = 200;
    buttonH = 60;
    buttonX = width /2 - buttonW / 2;
    buttonY = height / 2 + 40;

    boat = {
        x: 50,
        y: ((height / 3) -30),
        width: windowWidth / 5.5,
        height: 30,
        color: '#654321'
    };

    let waterTop = height / 3;
    let waterBottom = height;

    generateFish();

    lineEndY = height / 3 - 30;
}

function mousePressed() {

 //start game button referenced from https://www.geeksforgeeks.org/flappy-bird-game-in-javascript/
 ////////////////////////////////////////////////////////////////////////////////////////////
    if (gameState === "Start") {
      if (
        mouseX > buttonX &&
        mouseX < buttonX + buttonW &&
        mouseY > buttonY &&
        mouseY < buttonY + buttonH
      ) {
        gameState = "Game";
      }
 //end of start game button reference. Used mouse click within button bounds instead of key press from reference
 ////////////////////////////////////////////////////////////////////////////////////////////

    } else if (gameState === "Game") {
        if (!timerStarted){
            startTime = millis();
            timerStarted = true;
        }
    
        // Allow casting if not currently fishing
        if (!fishingLine && !reelingFish && caughtFish == null) {
            fishingLine = true;
            lineEndY = height / 3 - 30;
        }
    
        // If line is dropped and user clicks again, start reeling even without a fish
        else if (fishingLine && !reelingFish) {
            fishingLine = false;
            reelingFish = true;
        }
    }else if (gameState === "GameOver"){
        if (
            mouseX > gameOverButtonX &&
            mouseX < gameOverButtonX + gameOverButtonW &&
            mouseY > gameOverButtonY &&
            mouseY < gameOverButtonY + gameOverButtonH
        ) {
            restartGame();
        }
    }
  }
  

//game state management referenced from https://www.geeksforgeeks.org/flappy-bird-game-in-javascript/
///////////////////////////////////////////////////////////////////////////////////////////////////////////

// This section of the code is my favorite part. I had no idea how to make different screens appear and disappear until I found this part of the reference code.
// Before this, I was only able to have the game screen and when I finally realized I could use different draw functions to create different screens, I realized I could make start, end and differnet levels if I wanted to all within the same code.
function draw(){
    if (gameState === "Start"){
        drawStartScreen();
    } else if (gameState === "Game") {
        drawGameScreen();
    
        if (timerStarted) {
            timeLeft = gameDuration - floor((millis() - startTime) / 1000);
            if (timeLeft <= 0) {
                gameState = "GameOver";
            }
        } else {
            timeLeft = gameDuration;
        }
    }
    else if (gameState === "GameOver"){
        drawGameOverScreen();
    }

}
// End of game state management
///////////////////////////////////////////////////////////////////////////////////////////////////////////


function drawStartScreen(){
    background('#87CEEB');

    fill('#FFD700');
    noStroke();
    ellipse(width - 100, 80, 80, 80); // sun

    fill(0);
    textAlign(CENTER, CENTER);
    textSize(48);
    text("Welcome to Pixel Fishing!", width / 2, height / 2 - 50);

    // Draw button
    fill('#FFA500');
    stroke(0);
    rect(buttonX, buttonY, buttonW, buttonH, 12);

    fill(0);
    textSize(24);
    noStroke();
    text("Start Fishin'", width / 2, buttonY + buttonH / 2);
}

function drawGameScreen(){
    background('#87CEEB'); // sky

    //score counter
    fill(0);
    textSize(24);
    textAlign(LEFT,TOP);

    text(`Score: ${score}`, 20, 20);

    // sun
    fill('#FFD700');
    noStroke();
    ellipse(width - 100, 80, 80, 80);

    // clouds
    noStroke();
    fill(255);
    drawCloud(windowWidth / 6, 100);
    drawCloud(windowWidth / 3, 80);
    drawCloud(windowWidth - 300, 120);


    // water
    fill('#1E90FF');
    noStroke();
    rect(0, height / 3, width, height / 4 * 3);

    // fisherman and boat
    let fishermanX = boat.x + boat.width - 45;
    let fishermanY = boat.y - 60;
    image(fishermanImg, fishermanX, fishermanY, 80, 100);

    fill(boat.color);
    rect(boat.x, boat.y, boat.width, boat.height, 5);
    ellipse(boat.x + boat.width / 2, boat.y + boat.height, boat.width, boat.height + 20);

    // fishing line and hook
    if (fishingLine || reelingFish) {
        stroke(0);
        strokeWeight(2);
        let lineStartX = fishermanX + 80;
        let lineStartY = fishermanY + 30;

        line(lineStartX, lineStartY, lineStartX, lineEndY);

        // hook
        push();
        stroke(110);
        strokeWeight(2);
        noFill();
        arc(lineStartX, lineEndY + 10, 15, 15, -HALF_PI, PI);
        pop();

        // drop line
        if (fishingLine && lineEndY < height){
            lineEndY += dropSpeed;
        }

        // check for collisions
        let hookX = lineStartX;
        let hookY = lineEndY + 10;

//distance based collision detection referenced from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
////////////////////////////////////////////////////////////////////////////////////////

// This section was also very challenging to figure out. Using a bounding box method for collision detection was not working very well and made the hooking feel off.
// I watched a few videos and found the reference, and with just a little help from the VSCode auto-complete, I was able to make the hook mechanic feel more accurate.
        for (let i = fish.length - 1; i >= 0; i--) {
            let f = fish[i];
            let d = dist(hookX, hookY, f.x, f.y);
            if (d < f.size / 2) {
                caughtFish = fish[i];
                fish.splice(i, 1);
                fishingLine = false;
                reelingFish = true;
                score += caughtFish.pointValue;
                break;
            }
        }
    }

//end of circle collision detection reference. the hook is treated as a point and the fish as a circle in my use.
////////////////////////////////////////////////////////////////////////////////////////

    if (reelingFish){
        if (lineEndY > height /3 - 30){
            lineEndY -= reelSpeed;
        }else{
            reelingFish = false;
            caughtFish = null;
        }
    }

    if(caughtFish){
        push();
        imageMode(CENTER);
        image(caughtFish.img, fishermanX + 80, lineEndY + 10, caughtFish.size, caughtFish.size);
        pop();
    }

    // draw and move fish 
    for (let f of fish){
        push();
        translate(f.x, f.y);
        imageMode(CENTER);
        if (f.dir === 1) {
            scale(-1, 1);
        }
        image(f.img, f.dir === 1 ? -0 : 0, 0, f.size, f.size);
        pop();

        f.x += f.speed * f.dir;
        if (f.x > width + f.size) f.x = -f.size;
        if (f.x < -f.size) f.x = width + f.size;
    }

    //timer
    fill(0);
    textSize(24);
    textAlign(RIGHT, TOP);
    text(`Time Left: ${timeLeft}`, width - 20, 20);

    let startTime;
}

function drawGameOverScreen(){
    background('#87CEEB');

    fill(0);
    textAlign(CENTER, CENTER);
    textSize(48);
    text("Game Over!", width / 2, height / 2 - 50);

    fill(0);
    textSize(24);
    text(`Your Score: ${score}`, width / 2, height / 2);

    // Draw button
    fill('#FFA500');
    stroke(0);
    gameOverButtonX = width / 2 - gameOverButtonW / 2;
    gameOverButtonY = height / 2 + 40;
    rect(gameOverButtonX, gameOverButtonY, gameOverButtonW, gameOverButtonH, 12);

    fill(0);
    textSize(24);
    noStroke();
    text("Fish Again", width / 2, gameOverButtonY + gameOverButtonH / 2);
}

function restartGame(){

    score = 0;
    caughtFish = null;
    fishingLine = false;
    reelingFish = false;
    lineEndY = height /3 - 30;
    timerStarted = false;

    generateFish();
    let waterTop = height /3;
    let waterBottom = height;

    startTime = millis();
    gameState = "Game";
}

function drawCloud(x, y) {
    ellipse(x, y, 60, 60);
    ellipse(x + 30, y + 10, 60, 60);
    ellipse(x - 30, y + 10, 60, 60);
    ellipse(x, y + 20, 70, 50);
}

function generateFish() {
    fish = [];
    let fishTypes = Object.keys(fishImages);
    let regularFishTypes = fishTypes.filter(type => type !== 'gold');
    let waterTop = height / 3;
    let waterBottom = height;

    // gold fish
    fish.push({
        x: random(width),
        y: random(waterTop + 200, waterBottom - 100),
        size: 90,
        speed: 4,
        dir: random([1, -1]),
        img: fishImages['gold'],
        pointValue: points['gold'],
    });

    //normal fish
    for (let i = 1; i < numFish; i++) {
        let type = random(regularFishTypes);
        fish.push({
            x: random(width),
            y: random(waterTop + 120, waterBottom - 50),
            size: random(60, 100),
            speed: random(1, 3),
            dir: random([1, -1]),
            img: fishImages[type],
            pointValue: points[type],
        });
    }
}
