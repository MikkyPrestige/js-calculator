// const currValue = document.getElementById("curr");
// const prevValue = document.getElementById("prev");
// const numBtn = document.querySelectorAll(".num");
// const buttons = document.querySelectorAll(".btn");
// const clearBtn = document.querySelector(".clear");
// const delBtn = document.querySelector(".del");
// const equalBtn = document.querySelector(".equalTo");
// const dotBtn = document.querySelector(".dot");
// const operatorBtn = document.querySelectorAll(".operator");
// const zeroBtn = document.querySelector(".zero");

// let curr = "";
// let prev = "";
// let operator = "";

// const buttonsInput = buttons.forEach((button) => {
//   button.addEventListener("click", () => {
//     if (button.classList.contains("num")) {
//       if (button.classList.contains("dot")) {
//         if (curr.includes(".")) return;
//         curr += button.innerText;
//       } else {
//         curr += button.innerText;
//       }
//       currValue.innerText = curr;
//     }
//     if (button.classList.contains("operator")) {
//       if (curr === "") return;
//       if (prev !== "") {
//         // Calculate
//       }
//       operator = button.innerText;
//       prev = curr;
//       curr = "";
//       prevValue.innerText = prev;
//       currValue.innerText = curr;
//     }
//   });
// });

const currValue = document.getElementById("curr");
const prevValue = document.getElementById("prev");
const numBtn = document.getElementsByClassName("num");
const operatorBtn = document.getElementsByClassName("operator");
const clearBtn = document.querySelector(".clear");
const delBtn = document.querySelector(".del");
const equalBtn = document.querySelector(".equalTo");

function updateDisplay() {
  currValue.innerText = curr;
  prevValue.innerText = prev;
}

clearBtn.addEventListener("click", () => {
  curr = "";
  prev = "";
  operator = "";
  updateDisplay();
});

delBtn.addEventListener("click", () => {
  curr = curr.slice(0, -1);
  updateDisplay();
});

equalBtn.addEventListener("click", () => {
  if (prev === "" || curr === "" || operator === "") return;
  compute();
  updateDisplay();
});

Array.from(numBtn).forEach((button) => {
  button.addEventListener("click", () => {
    if (button.innerText === "." && curr.includes(".")) return;
    curr += button.innerText;
    updateDisplay();
  });
});

Array.from(operatorBtn).forEach((button) => {
  button.addEventListener("click", () => {
    if (curr === "") return;
    if (prev === "") {
      prev = curr;
    } else {
      compute();
    }
    operator = button.innerText;
    curr = "";
    updateDisplay();
  });
});






