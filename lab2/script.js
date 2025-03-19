var kitty = {
    cute: true,
    fluffy: true,
    hungry: 0.8,
    lives: 9,
    colour: "red",
    fur: {
        fluffy: true,
        colour: "red",
    },
    threats: null,
    meow: function (){ // a function contained as a key value pair of an object is called a "method" 
        return "meow"
    }, //annonymous functions are functions without a name, this is possible because it is accessed indirectly through the key value pair

};

console.log(kitty.meow()); //  () function invocation operator

console.log(kitty.two);
// variable name that is not declared gives an error
// an undeclared parameter of an object gives undefined and no error

kitty.lives++;
console.log(kitty.lives);

kitty.two = 'two'; //object properties can be added after the object is created
console.log(kitty);

// kitty.travel(), // this will give an error because travel is not a key value pair of the object kitty and is an undefined function


console.log(kitty.future++); // results in a type number with value NaN which is not a number 

console.log(kitty.lives / undefined); // results in NaN
console.log(kitty.lives / null); // results in infinity
console.log(kitty.lives / 0); // results in infinity
console.log(kitty.lives /kitty); // results in NaN

// . is an accessor of an object
// to the left of the . is the object and to the right is a key value pair

if(kitty.fur.fluffy){
    console.log('true?')
}else{
    console.log('false?');
}

for (key in kitty){ // generics
    console.log(key); // prints the key value pairs of the object
    kitty.key; // this will not work because key is not a key value pair of the object
    kitty[key]; //alternate way to access the key value pair of the object 
}

var x = {};
x.y = 12; //mutates object with assignment
x.z; //undefined
