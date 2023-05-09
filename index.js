const currValue = document.getElementById("curr");
const prevValue = document.getElementById("prev");
const numBtn = document.querySelectorAll(".num");
const clearBtn = document.querySelector(".clear");
const delBtn = document.querySelector(".del");
const equalBtn = document.querySelector(".equalTo");
const dotBtn = document.querySelector(".dot");
const operatorBtn = document.querySelectorAll(".operator");
const zeroBtn = document.querySelector(".zero");

<<<<<<< Updated upstream
=======

let curr = "";
let prev = "";
let operator = "";

const display = () => {
  currValue.innerText = curr;
  prevValue.innerText = prev;
};

const clear = () => {
  clearBtn.addEventListener("click", () => {
    curr = "";
    prev = "";
    operator = "";
    display();
    updateDisplay()
  });
};
clear();

const del = () => {
  delBtn.addEventListener("click", () => {
    curr = curr.slice(0, -1);
    display();
    updateDisplay()
  });
};
del();

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
      updateDisplay()
    });
  });
};

const operation = () => {
  operatorBtn.forEach((operator) => {
    operator.addEventListener("click", () => {
      if (curr === "") return;
      if (prev !== "") {
        compute();
      }

      curr = operator.innerText;
      prev = curr;
      curr = "";
      display();
      updateDisplay()
    });
  });
};
operation();

const compute = () => {
equalBtn.forEach((answer) => {
  answer.addEventListener('click', () => {
    let computation
  const prev = parseFloat(prevValue)
  const current = parseFloat(currValue)
  if (isNaN(prev) || isNaN(current)) return
  switch (operation) {
    case '+':
      computation = prev + current
      break
    case '-':
      computation = prev - current
      break
    case '*':
      computation = prev * current
      break
    case '÷':
      computation = prev / current
      break
    default:
      return
  }
  currValue = computation
  operation = undefined
  prevValue = ''
  display();
  updateDisplay()
  });
});
};


// function getDisplayNumber(number) {
//   const stringNumber = number.toString()
//   const integerDigits = parseFloat(stringNumber.split('.')[0])
//   const decimalDigits = stringNumber.split('.')[1]
//   let integerDisplay
//   if (isNaN(integerDigits)) {
//     integerDisplay = ''
//   } else {
//     integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
//   }
//   if (decimalDigits != null) {
//     return `${integerDisplay}.${decimalDigits}`
//   } else {
//     return integerDisplay
//   }
// }

// function updateDisplay() {
//   currValue.innerText = getDisplayNumber(currValue)
//   if (operation != null) {
//     prevValue.innerText =
//       `${getDisplayNumber(prevValue)} ${operation}`
//   } else {
//     prevValue.innerText = ''
//   }
// }


>>>>>>> Stashed changes
