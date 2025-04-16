let mason;
let bark;
let instruction;

function setup(){
createCanvas(windowWidth, windowHeight);
background(155);

instruction = createP("Click the dog to make him bark");
instruction.style('font-size', '24px');
instruction.style('font-family', 'sans-serif');
instruction.style('text-align', 'center');
instruction.position(windowWidth/2 - 150, windowHeight/2 - 400);



mason = createImg('mason.png', 'mason');
mason.size(600,600);
mason.position(windowWidth/2 - 300, windowHeight/2 - 300);

bark = createAudio('bark.mp3');
bark.hide();

mason.mousePressed(toggleSound);
}


function toggleSound(){
    if (bark.elt.paused){
        bark.play();
    }else{
        bark.pause();
    }
}