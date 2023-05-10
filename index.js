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
// function add(num1, num2) {
//     console.debug(`DEBUG: add(${num1}, ${num2}) = ${num1+num2}`);
//     return num1 + num2;
// }

// function sub(num1, num2) {
//     console.debug(`DEBUG: sub(${num1}, ${num2}) = ${num1-num2}`);
//     return num1 - num2;
// }

// function mul(num1, num2) {
//     console.debug(`DEBUG: mul(${num1}, ${num2}) = ${num1*num2}`);
//     return num1 * num2;
// }

// function div(num1, num2) {
//     console.debug(`DEBUG: div(${num1}, ${num2}) = ${num1/num2}`);
//     return num1 / num2;
// }

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



  var output1 = ''
  var output2 = ''
  var result = null
  var operationLast = ''
  var oneDot = false
  
  numBtn.forEach( number => {
    number.addEventListener('click', (e) => {
      if ( e.target.innerText === '.' && !oneDot) {
        oneDot = true
      } else if ( e.target.innerText === '.' && oneDot) {
        return
      }
      output2 += e.target.innerText
      currValue.innerText = output2
    })
  })
  
  operatorBtn.forEach( (operation) => {
    operation.addEventListener('click', (e) => {
      if (!output2) return
      oneDot = false
      const operationName = e.target.innerText
      if (output1 && output2 && operationLast) {
        mathOperation
      } else {
        result = parseFloat(output2)
      }
      clearVar(operationName)
      operationLast = operationName;
    })
  })
  
  function clearVar(name = '') {
    output1 += output2 + ' ' + name + ' '
    currValue.innerText = output1
    prevValue.innerText = ''
    output2 = ''
  }
  
  // Math operation implementations
  const mathOperation = {
  add: function () {
  if (operationLast === "+" ) {
        result = parseFloat(output1) + parseFloat(output2);
      }
}
,sub: function() {
  if (operationLast === "-" ) {
        result = parseFloat(output1) - parseFloat(output2);
      }
}
,mul: function() {
  if (operationLast === "×" ) {
        result = parseFloat(output1) * parseFloat(output2);
      }
}
,div: function() {
  if (operationLast === "÷") {
    result = parseFloat(output1) / parseFloat(output2);
  }
}
,mod: function() {
  if (operationLast === "%") {
        result = parseFloat(output1) % parseFloat(output2);
      }
}
,cubeRoot: function() {
  if (operationLast === "x<sup>3") {
      result = Math.cbrt(parseFloat(output2));
    }
}
,squareRoot: function() {
  if (operationLast === "√") {
      result = Math.sqrt(parseFloat(output2));
    }
}  

}
  
  equalBtn.addEventListener('click', (e) => {
    if ( !output1 || !output2 ) return
    oneDot = false
    mathOperation.add();
    mathOperation.add();
    mathOperation.sub();
    mathOperation.mul();
    mathOperation.div();
    mathOperation.module();
    mathOperation.squareRoot();
    clearVar()
    currValue.innerText = result
    output2 = result
    output1 = ''
  })
  
  clearBtn.addEventListener('click', (e) => {
    currValue.innerText = ''
    prevValue.innerText = ''
    output1 = ''
    output2 = ''
    result = ''
  })
  
  delBtn.addEventListener('click', (e) => {
    currValue.innerText = currValue.innerText.toString().slice(0, -1)
    output2 = output2.toString().slice(0, -1)
  })
  
  window.addEventListener('keydown', (e) => {
    if (
      e.key === '0' ||
      e.key === '1' ||
      e.key === '2' ||
      e.key === '3' ||
      e.key === '4' ||
      e.key === '5' ||
      e.key === '6' ||
      e.key === '7' ||
      e.key === '8' ||
      e.key === '9' ||
      e.key === '.' 
    ) {
      clicknumber(e.key)
    } else if (
      e.key === '+' ||
      e.key === '-' ||
      e.key === '/' ||
      e.key === '%' 
     ) {
       clickoperation(e.key)
     } else if (e.key === '*') {
       clickoperation('x')
     } else if (e.key === 'Enter' || e.key === '=') {
       clickresult()
     } else if (e.key === 'Backspace') {
       clickdel()
     } else if (e.key === 'Delete') {
       clickclear()
     }
  })
  
  function clicknumber(key) {
    number.forEach((button) => {
      if (button.innerText === key) {
        button.click()
      }
    })
  }
  
  function clickoperation(key) {
    operation.forEach((button) => {
      if (button.innerText === key) {
        button.click()
      }
    })
  }
  
  function clickresult() {
    resultLast.click()
  }
  
  function clickdel() {
    del.click()
  }
  
  function clickclear() {
    clear.click()
  }















  // let curr = "";
  // let prev = "";
  // let operator = "";
  
  // const display = () => {
  //   currValue.innerText = curr;
  //   prevValue.innerText = prev;
  // };
  
  // const operation = () => {
  //   operatorBtn.forEach((operator) => {
  //     operator.addEventListener("click", () => {
  //       if (curr === "") return;
  //       if (prev !== "") {
  //         prev = curr;
  //       } else {
  //         prev = curr;
  //       }
  //       curr = operator.innerText;
  //       prev = curr;
  //       curr = "";
  //       display();
  //     });
  //   });
  // };
  
  // operation();
  
  // const buttons = () => {
  //   numBtn.forEach((num) => {
  //     num.addEventListener("click", () => {
  //       if (num.classList.contains("dot")) {
  //         if (curr.includes(".") || curr === "") {
  //           return;
  //         } else {
  //           curr += num.innerText;
  //         }
  //       } else if (num.classList.contains("zero")) {
  //         if (curr === "") return;
  //         curr += num.innerText;
  //       } else {
  //         curr += num.innerText;
  //       }
  //       display();
  //     });
  //   });
  // };
  
  // buttons();
  
  // const clear = () => {
  //   clearBtn.addEventListener("click", () => {
  //     curr = "";
  //     prev = "";
  //     operator = "";
  //     display();
  //   });
  // };
  
  // clear();
  
  // const del = () => {
  //   delBtn.addEventListener("click", () => {
  //     curr = curr.slice(0, -1);
  //     display();
  //   });
  // };
  
  // del();


  // const results = () => {
  //   equalBtn.addEventListener("click", () => {
  //     // deleted codde
  //   });
  // };

  // results();


