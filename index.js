const currValue = document.getElementById("curr");
const prevValue = document.getElementById("prev");
const operatorBtn = document.querySelectorAll(".operator");
const numBtn = document.querySelectorAll(".num");
const clearBtn = document.querySelector(".clear");
const delBtn = document.querySelector(".del");
const equalBtn = document.querySelector(".equalTo");

// Math operation implementations
function add(num1, num2) {
    console.debug(`DEBUG: add(${num1}, ${num2}) = ${num1+num2}`);
    return num1 + num2;
}

function sub(num1, num2) {
    console.debug(`DEBUG: sub(${num1}, ${num2}) = ${num1-num2}`);
    return num1 - num2;
}

function mul(num1, num2) {
    console.debug(`DEBUG: mul(${num1}, ${num2}) = ${num1*num2}`);
    return num1 * num2;
}

function div(num1, num2) {
    console.debug(`DEBUG: div(${num1}, ${num2}) = ${num1/num2}`);
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
      console.debug('DEBUG: formatNumber(x) to just num');
      return str;
    } else if (Math.abs(x) >= LARG_NUMBER) {
      // The number is very large, use exponential notation
      console.debug('DEBUG: formatNumber(x) to exponential num');
      return x.toExponential(MAX_NUM_LENGTH - MAX_EXP_LENGTH);
    } else {
      // The number is not too large, use fixed or precision notation
      let numIntDigits = Math.floor(Math.log10(Math.abs(x))) + 1;
      let numFracDigits = MAX_NUM_LENGTH - numIntDigits - 1;
      
      if (numFracDigits < 0) {
        // Not enough space for any fractional digits, use precision notation
        console.debug('DEBUG: formatNumber(x) to precision num');
        return x.toPrecision(MAX_NUM_LENGTH - 1);
      } else {
        // Use fixed notation with the appropriate number of fractional digits
        console.debug('DEBUG: formatNumber(x) to fixed num');
        return x.toFixed(numFracDigits);
      }
    }
  }

let curr = "";
let prev = "";
let operator = "";

const display = () => {
  currValue.innerText = curr;
  prevValue.innerText = prev;
};

const operation = () => {
  operatorBtn.forEach((operator) => {
    operator.addEventListener("click", () => {
      if (curr === "") return;
      if (prev !== "") {
        prev = curr;
      } else {
        prev = curr;
      }
      curr = operator.innerText;
      prev = curr;
      curr = "";
      display();
    });
  });
};

operation();

const buttons = () => {
  numBtn.forEach((num) => {
    num.addEventListener("click", () => {
      if (num.classList.contains("dot")) {
        if (curr.includes(".") || curr === "") {
          return;
        } else {
          curr += num.innerText;
        }
      } else if (num.classList.contains("zero")) {
        if (curr === "") return;
        curr += num.innerText;
      } else {
        curr += num.innerText;
      }
      display();
    });
  });
};

buttons();

const clear = () => {
  clearBtn.addEventListener("click", () => {
    curr = "";
    prev = "";
    operator = "";
    display();
  });
};

clear();

const del = () => {
  delBtn.addEventListener("click", () => {
    curr = curr.slice(0, -1);
    display();
  });
};

del();
