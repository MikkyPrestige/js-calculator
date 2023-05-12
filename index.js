const currValue = document.getElementById("curr");
const prevValue = document.getElementById("prev");
const operatorBtn = document.querySelectorAll(".operator");
const numBtn = document.querySelectorAll(".num");
const clearBtn = document.querySelector(".clear");
const delBtn = document.querySelector(".del");
const equalBtn = document.querySelector(".equalTo");

const MUL_SYMBOL = '×';
const DIV_SYMBOL = '÷'

// Math functions
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
const LARGE_NUMBER = 1e14;   // what is considered a large number (should match the MAX_NUM_LENGTH)
const MAX_EXP_LENGTH = 3; // number of digits for exponential notation 

function formatNumber(x) {
    let str = x.toString();
    let numDigits = str.replace(".", "").length;
    
    if (numDigits <= MAX_NUM_LENGTH) {
      // The number fits within the maximum number of digits
      console.debug('DEBUG: formatNumber(x) to just num');
      return str;
    } else if (Math.abs(x) >= LARGE_NUMBER) {
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

  // OLD IMPL OF EQUALS BUTTON
  // TODO: remake to be a function 'calc(inputString)' (there is a placeholder below)
  // that parses the math equation and calls on math functions above.
  // the function should return a string - formatedNumber(resultNumber) can be used for that
  // var num1 = parseFloat();
  // var num2 = parseFloat();
  // var answer; 
  // const results = () => {
  //   equalBtn.addEventListener("click", () => {
      
  //     answer = add(num1,num2);
  //     // if (operator==="+"){
        
  //     // }

  //     currValue.innerText = answer
  //     curr = answer
  //     prev = ''
  //     display();
  //   });
  // };

  // results();


// Calculation and Parsing functions
function tokenize(expression) {
  const tokens = [];
  let currentToken = '';

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];

    if (/\s/.test(char)) {

      // Skip whitespace
      continue;
    }

    if (/[+\-*/()]/.test(char)) {

      // Operator or Parentheses
      if (currentToken !== '') {
        tokens.push(parseFloat(currentToken));
        currentToken = '';
      }
      tokens.push(char);
    } else if (/\d/.test(char) || char === '.') {

      // Number
      currentToken += char;
    } else {
      
      // Invalid character
      throw new Error(`Invalid character: ${char}`);
    }
  }

  if (currentToken !== '') {
    tokens.push(parseFloat(currentToken));
  }

  return tokens;
}


function evaluateTokens(tokens) {
  let result = parseFloat(tokens[0]); // Initialize result with the first number token

  for (let i = 1; i < tokens.length; i += 2) {
    const operator = tokens[i];
    const number = parseFloat(tokens[i + 1]);

    switch (operator) {
      case '+':
        result = add(result, number);
        break;
      case '-':
        result = sub(result, number);
        break;
      case '*':
        result = mul(result, number);
        break;
      case '/':
        result = div(result, number);
        break;
      default:
        throw new Error('Invalid operator: ' + operator);
    }
  }

  return result;
}

// User interface and input functions
let curr = "";
let prev = "";
let afterRezult = false;

const display = () => {
  currValue.innerText = curr;
  prevValue.innerText = prev;
};

const clearAfterRezult = () => {
  if (afterRezult){
    prev = '';
    afterRezult = false;
  }
}

function endsWithOperator(input) {
  isTrue = false;
  
  // check if equation doesnt end with an operator symbol
  operatorBtn.forEach(op =>{
    endSymbol = input.slice(-1);
    if (input.endsWith(op.innerText)){
      console.debug(`DEBUG endsWith=${op.innerText}`)
      isTrue = true;
      return isTrue;
    }
  });

  return isTrue;
}

const operation = () => {
  operatorBtn.forEach((operator) => {
    operator.addEventListener("click", () => {
      if(endsWithOperator(curr))
        return;
      clearAfterRezult();
      if (curr === "") return;
      if (prev !== "") {
        prev += curr;
      } else {
        prev = curr;
      }
      prev += operator.innerText;
      curr = "";
      display();
    });
  });
};

operation();

const equalsListener = () => {
  equalBtn.addEventListener("click", () => {
    clearAfterRezult();
    if(endsWithOperator(curr)
    || (curr == "" && endsWithOperator(prev))
    || (curr == "" && prev == ""))
      return;

    prev += curr;
    console.debug(`DEBUG full input line = ${prev}`)
    curr = formatNumber(evaluateTokens(tokenize(prev)));
    prev += '='
    afterRezult = true;
    display();
  });
};

equalsListener();

const buttons = () => {
  numBtn.forEach((num) => {
    num.addEventListener("click", () => {
      if(endsWithOperator(curr)) {
        prev = curr;
        curr = '';
      }
      clearAfterRezult();
      if (num.classList.contains("dot")) {
        if (curr.includes(".") || curr === "") {
          return;
        } else {
          curr += num.innerText;
        }
      } else if (num.classList.contains("zero")) {
        if (prev.endsWith(DIV_SYMBOL) && curr === "")
        {
          alert("Can't compute division by Zero\n💫🤖💫")
          return;
        }
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
    afterRezult = false;
    display();
  });
};

clear();

const del = () => {
  delBtn.addEventListener("click", () => {
    if (curr == "" && prev !== "") {
      curr = prev;
      prev = '';
    }
    if (afterRezult)
      afterRezult = false;

    curr = curr.slice(0, -1);
    display();
  });
};

del();

// Keyboard input support
function clickNumber(key) {
  numBtn.forEach((button) => {
    if (button.innerText === key) {
      button.click()
    }
  })
}

function clickOperator(key) {
  operatorBtn.forEach((button) => {
    if (button.innerText === key) {
      button.click()
    }
  });
}

function clickEquals() {
  equalBtn.click()
}

function clickDel() {
  delBtn.click()
}

function clickClear() {
  clearBtn.click()
}
window.addEventListener('keydown', (e) => {
  if (e.key === '0'
  || e.key === '1'
  || e.key === '2'
  || e.key === '3'
  || e.key === '4'
  || e.key === '5'
  || e.key === '6'
  || e.key === '7'
  || e.key === '8'
  || e.key === '9'
  || e.key === '.') {
    clickNumber(e.key)
  } else if (e.key === '+' || e.key === '-') {
    clickOperator(e.key)
  } else if (e.key === '*') {
    clickOperator(MUL_SYMBOL)
  } else if (e.key === '/') {
    clickOperator(DIV_SYMBOL)
  } else if (e.key === 'Enter' || e.key === '=') {
    clickEquals()
  } else if (e.key === 'Backspace') {
    clickDel()
  } else if (e.key === 'Delete') {
    clickClear()
  }
});



const expression = prev;
const expressionTokens = tokenize(expression);
const result = evaluateTokens(expressionTokens);

console.log(result); // Output: 7.5


