let cols = 48;  // Number of columns
let rows = 36;  // Number of rows
let grid = []; // 2D array to store the colour of each cell
let cellSize = 20; // Size of each cell
let colourPick; // Colour picker for the user to pick a colour

function makeGrid(){
    for (let i = 0; i < cols; i++){ // create a 2D array within the number of columns and rows
        grid[i] = []; 
        for (let j = 0; j < rows; j++){
            grid[i][j] = 255; // set each cell to white
        }
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
//Remix of code from https://p5js.org/reference/p5/createAudio/#/p5.MediaElement & https://p5js.org/reference/p5/createAudio/#/p5.MediaElement
/////////////////////////////////////////////////////////////////////////////////////////////////////

function setup() {
    createCanvas(cols * cellSize, rows * cellSize + 50); // create a canvas as a function of the number of columns and rows with a bar at the bottom for the colour picker
    background(200);
    let button = createButton('Clear'); // create a button to clear the grid
    button.position(75, 755); 
    button.mousePressed(clearGrid);
    makeGrid(); // call the function to make the grid
let beat = createAudio('lofiBeat.mp3'); // load the audio file
beat.showControls(); // show the audio controls

colourPick = createColorPicker('deeppink');
colourPick.position(10, 750);

/////////////////////////////////////////////////////////////////////////////////////////////////////
//End of remixed code
/////////////////////////////////////////////////////////////////////////////////////////////////////

beat.position(0,800); // position the audio controls at the bottom of the canvas
}

function draw (){ // draw the grid
    for (let i=0; i<cols; i++){
        for (let j=0; j<rows; j++){
            fill(grid[i][j]);
            stroke(0);
            rect(i * cellSize, j * cellSize, cellSize, cellSize);
        }
    }

}

/////////////////////////////////////////////////////////////////////////////////////////////////////
//Remix of code from https://p5js.org/reference/p5/floor/ 
/////////////////////////////////////////////////////////////////////////////////////////////////////

// floor function rounds down to the nearest integer
function mousePressed(){
    let i = floor(mouseX / cellSize); //(mouseX / cellSize) turns the mouse position into the grid position 
    let j = floor(mouseY / cellSize);

/////////////////////////////////////////////////////////////////////////////////////////////////////
//End of remixed code
/////////////////////////////////////////////////////////////////////////////////////////////////////

    if(i>=0 && i<cols && j>=0 && j<rows){ //If the mouse is inside the grid, the cell colour is changed to currnet colour picker valaue
        grid[i][j] = colourPick.color();
    }
}
function clearGrid(){ // function to clear the grid
    for (let i = 0; i < cols; i++){
        for (let j = 0; j < rows; j++){
            grid[i][j] = 255;
        }
    }

}

