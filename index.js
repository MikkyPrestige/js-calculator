const currValue = document.getElementById("curr");
const prevValue = document.getElementById("prev");
const operatorBtn = document.querySelectorAll(".operator");
const numBtn = document.querySelectorAll(".num");
const clearBtn = document.querySelector(".clear");
const delBtn = document.querySelector(".del");
const equalBtn = document.querySelector(".equalTo");

let curr = "";
let prev = "";

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

function canPressEquals(equation) {
  isValid = true;

  // check if empty equation
  if(equation === '' || equation === null) {
    isValid = false;
  }

  // check if equation doesnt end with an operator symbol
  operatorBtn.forEach(op =>{
    endSymbol = equation.slice(-1);
    if (equation.endsWith(op.innerText)){
      console.debug(`DEBUG endsWith=${op.innerText}`)
      isValid = false;
      return isValid;
    }
  });

  console.debug(`DEBUG equation isValid = ${isValid}`);
  return isValid;
}

const equalsListener = () => {
  equalBtn.addEventListener("click", () => {
    clearAfterRezult();
    prev += curr;
    console.debug(`DEBUG full input line = ${prev}`)
    if(!canPressEquals(prev))
      return;

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
