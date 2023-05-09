const currValue = document.getElementById("curr");
const prevValue = document.getElementById("prev");
const numBtn = document.querySelectorAll(".num");
const clearBtn = document.querySelector(".clear");
const delBtn = document.querySelector(".del");
const equalBtn = document.querySelector(".equalTo");
const dotBtn = document.querySelector(".dot");
const operatorBtn = document.querySelectorAll(".operator");
const zeroBtn = document.querySelector(".zero");

// Math operation implementations
function add(num1, num2) {
    return num1 + num2;
}

function sub(num1, num2) {
    return num1 - num2;
}

function mul(num1, num2) {
    return num1 * num2;
}

function div(num1, num2) {
    return num1 / num2;
}

// Formatting function to fit number to screen by constants
const MAX_NUM_LENGTH = 14;  // number of digits that fit to screen
const LARG_NUMBER = 1e14;   // what is considered a large number (should match the MAX_NUM_LENGTH)
const MAX_EXP_LENGTH = 3; // number of digits for exponential notation 

function formatNumber(x) {
    let str = x.toString();
    let numDigits = str.replace(".", "").length;
    
    if (numDigits <= MAX_NUM_LENGTH) {
      // The number fits within the maximum number of digits
      return str;
    } else if (Math.abs(x) >= LARG_NUMBER) {
      // The number is very large, use exponential notation
      return x.toExponential(MAX_NUM_LENGTH - MAX_EXP_LENGTH);
    } else {
      // The number is not too large, use fixed or precision notation
      let numIntDigits = Math.floor(Math.log10(Math.abs(x))) + 1;
      let numFracDigits = MAX_NUM_LENGTH - numIntDigits - 1;
      
      if (numFracDigits < 0) {
        // Not enough space for any fractional digits, use precision notation
        return x.toPrecision(MAX_NUM_LENGTH - 1);
      } else {
        // Use fixed notation with the appropriate number of fractional digits
        return x.toFixed(numFracDigits);
      }
    }
  }
