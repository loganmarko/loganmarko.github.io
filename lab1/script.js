var billy; //variable declaration with no defined value

billy = 13; //variable assignment
billy = 'billy is great'; //variable reassignment
billy = "Billy says 'hello'"; //Multiple string delimiters

console.log(billy);

//keyword, expression, codeblock
if(true){
    console.log(billy);
}
//if round brakets are true, squiggly brackets will run
//if round brackets are false, squiggly brackets will not run
if(5 < 15){
    console.log('is it true?');
}

billy = "silly";
if(billy ){ //coercion change string to a boolean
    console.log("billy is silly");
}

if(billy === "silly"){ // === testing for equal value and same type
    console.log('really silly');
}

// == testing for equal value but allows for coercion 
// billy == true may work but may not depending on if it is a string or boolean or a number
// === is more reliable

//typeof operator proceeds a value name or literal value and returns the type of the value

console.log(typeof "billy"); //string
console.log(typeof 13); //number
console.log(typeof true); //boolean

if(typeof billy === "string"){
    billy = "googer"
}else{
    billy = 42;
}
console.log(billy);

////////////////////////////
// for loop 

for(var i = 0; i <10; i++){
    console.log(i);
}
console.log(i);
////////////////////////////

//function declaration
function bob(){
    console.log('i am bob')
    return "bob"
}

// function invocation
bob(); // () function invocation operator

for(var i = 0; i < 10; i++){ //start with i as 0, check if i is less than 10, if true run code block, then increase i by 1 and run again
    bob();
}

console.log( bob() );

function bailly(data){
    data = data + 100;
    return data;
}

var mydata = bailly(50);
console.log(mydata);
console.log(typeof mydata);