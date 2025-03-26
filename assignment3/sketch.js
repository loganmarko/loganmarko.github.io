

////////////////////////////////////////////////////////////////////
// remixed code from https://simplestepscode.com/javascript-quiz-tutorial/
////////////////////////////////////////////////////////////////////
let questions = [
    {
        question: "What is the 4th letter of the greek alphabet? ",
        correctAnswer: 'Delta'
    },
    {
        question: 'Which planet is closest to the Sun?',
        correctAnswer: 'Mercury'
    },
    {
        question: 'Where did sushi originate?',
        correctAnswer: 'Japan'
    },
    {
        question: 'Who is the main character in the God of War franchise?',
        correctAnswer: 'Kratos'
    },
    {
        question: 'Which MLB team has won the most World Series?',
        correctAnswer: 'Yankees'
    },
    {
        question: 'What is the largest animal on the planet?',
        correctAnswer: 'Blue Whale'
    }
]
////////////////////////////////////////////////////////////////////
// end of remixed code
////////////////////////////////////////////////////////////////////

let currentQuestion = 0;
let userAnswer = '';
let resultText = '';
let inputBox;
let submitButton;
let bgColour = '';
let customFont;

function preload(){
    customFont = loadFont('schoolFont.ttf'); //load custom font
}

function setup(){
    createCanvas(windowWidth,windowHeight) //make canvas across entire window

    inputBox = createInput();
    inputBox.position(width / 2- inputBox.width / 2, height / 3.5 + 50); //add input box

    submitButton = createButton('Submit'); //add submit button
    submitButton.position(inputBox.x,inputBox.y + 40); // change location of button relative to the text box
    submitButton.mousePressed(checkAnswer); // check answer when button is clicked


    displayQuestion();
}

function keyPressed(){
    if (keyCode === ENTER){ //let enter key check theanswer when clicked
        checkAnswer();
    }
}

function draw(){
    if(bgColour !== ''){
        background(bgColour);
    }else{
        background(240, 240, 255); //flash the screen a different colour depending on if the answer is correct
    }

    textFont(customFont); //call custom font

    textSize(80);
    fill(0);
    textAlign(CENTER, TOP);
    text("Question " + (currentQuestion + 1) + ":", width / 2 ,20); 
    text(questions[currentQuestion].question, width / 2 ,60); //text displaying the current question

    if(resultText !== ""){ //check if there is result text
        textSize(80);
    text(resultText, width / 2, height / 2);
    }
    textAlign(CENTER, TOP)
    textSize(40);
    fill(0);
    text("Type your answer and press 'Submit' or click 'Enter'.", inputBox.x + 60, inputBox.y - 40);
}


function displayQuestion(){
    resultText = "";
    userAnswer = "";
    inputBox.value('');
}

function checkAnswer(){
////////////////////////////////////////////////////////////////////
//remixed code from https://www.geeksforgeeks.org/compare-the-case-insensitive-strings-in-javascript/
////////////////////////////////////////////////////////////////////
    userAnswer = inputBox.value().trim().toLowerCase(); // changes all text to lowercase and removes spaces at beginning and end of text before comparing
////////////////////////////////////////////////////////////////////
//end of remixed code
////////////////////////////////////////////////////////////////////

let correctAnswer= questions[currentQuestion].correctAnswer.toLowerCase();

if(userAnswer === correctAnswer){
    resultText = "Correct!";
    bgColour = "green";
}else{
    resultText = "Incorrect";
    bgColour = "red";
}

////////////////////////////////////////////////////////////////////
// remixed code from https://www.w3schools.com/jsref/met_win_settimeout.asp
////////////////////////////////////////////////////////////////////
setTimeout(function(){
    bgColour = '';
}, 1500);
setTimeout(nextQuestion, 1500);
////////////////////////////////////////////////////////////////////
// end of remixed code
////////////////////////////////////////////////////////////////////
}

function nextQuestion(){
    currentQuestion++;

    if (currentQuestion >= questions.length){
        currentQuestion = 0;
    }

    displayQuestion()
}