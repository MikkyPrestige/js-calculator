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

// Calculation and Parsing functions
function calc(inputString) {
  return "7.77";
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
    curr = calc(prev);
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
