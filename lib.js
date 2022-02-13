//const { contentType } = require("express/lib/response");

function add(x, y) {
    return x + y + num;
}
  
function subtract(x, y) {
    return x - y + num;
}

const num = 33;



function reverseString(str) {
    var newString = "";
    for (var i = str.length - 1; i >= 0; i--) {
        newString += str[i];
    }
    return newString;
}

// add the code below for solving ReferenceError: add is not defined
//export functions add only
//module.exports = { add };

//export functions add, subtract and num
module.exports = {add,subtract,num,reverseString};