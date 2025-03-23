let eyeSizeSlider, faceColourSelector, eyecolourPicker
let faceColour = 'peachpuff';
let eyeSize = 20;
let mouthExpression;
let faceWidth = 300, faceHeight = 400;
let eyeColour = 'blue';

function setup(){
    createCanvas(windowWidth, windowHeight);
    background(125);

    eyesizeSlider = createSlider(10,50,20); // eyesize slider
    eyesizeSlider.position(10,750);

////////////////////////////////////////////////////////////////////////
//remixed code from https://p5js.org/reference/p5/createSelect/
////////////////////////////////////////////////////////////////////////
    faceColourSelector = createSelect(); // face colour selector
    faceColourSelector.position(150, 750);

    faceColourSelector.option('peachpuff');
    faceColourSelector.option('lightblue');
    faceColourSelector.option('lightgreen');
    faceColourSelector.option('lightpink');
    faceColourSelector.option('lightyellow');
    faceColourSelector.option('lightcoral');
    faceColourSelector.option('lightgray');
    faceColourSelector.option('lightcyan');
    faceColourSelector.changed(() => {
        faceColour = faceColourSelector.value();
    });

    mouthExpression = createSelect(); // mouth expression selector
    mouthExpression.position(325, 750);
    mouthExpression.option('smile');
    mouthExpression.option('frown');
////////////////////////////////////////////////////////////////////////
 // end of remixed code
////////////////////////////////////////////////////////////////////////
 
    eyeColourPicker = createColorPicker('blue'); // eye colour picker
    eyeColourPicker.position(250, 750);
    
}

function draw(){
   eyeSize = eyesizeSlider.value(); // get value from slider for eye size
   eyeColour = eyeColourPicker.color(); // get value from colour picker


   fill(faceColour); // draw face
    ellipse(width/2, height/2, faceWidth, faceHeight);

    fill(eyeColour); // draw eyes
    ellipse(width/2 - 50, height/2 - 50, eyeSize, eyeSize);
    ellipse(width/2 + 50, height/2 - 50, eyeSize, eyeSize);
    
 let mouth = mouthExpression.value(); // get expression value from dropdown menu

 stroke(0); // draw mouth
    strokeWeight(5);
    noFill();
    if(mouth === 'smile'){
        arc(width/2, height/2 + 50, 100, 50, 0, PI);
    } else if(mouth === 'frown'){
        arc(width/2, height/2 + 75, 100, 50, PI, TWO_PI);

    }

}
    function keyPressed (){ // change mouth expression with spacebar
        if (key === ' '){
            let currentMouth = mouthExpression.value();
            let newMouth = currentMouth === 'smile' ? 'frown' : 'smile';
            mouthExpression.value(newMouth);
        }
    }
    function mousePressed() { // change face colour when clicked within face only
        let d = dist(mouseX, mouseY, width / 2, height / 2);
        if (d < faceWidth / 2) { // Check if click is inside face
            let faceColors = ['peachpuff', 'lightblue', 'lightgreen', 'lightpink', 'lightyellow', 'lightcoral', 'lightgray', 'lightcyan'];
            faceColour = random(faceColors); // Pick random face color
            faceColourSelector.value(faceColour); // Update dropdown menu
        }
    }
