const currValue = document.getElementById("curr");
const prevValue = document.getElementById("prev");
const numBtn = document.querySelectorAll(".num");
const buttons = document.querySelectorAll(".btn");
const clearBtn = document.querySelector(".clear");
const delBtn = document.querySelector(".del");
const equalBtn = document.querySelector(".equalTo");
const dotBtn = document.querySelector(".dot");
const operatorBtn = document.querySelectorAll(".operator");
const zeroBtn = document.querySelector(".zero");

let curr = "";
let prev = "";
let operator = "";

const buttonsInput = buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("num")) {
      if (button.classList.contains("dot")) {
        if (curr.includes(".")) return;
        curr += button.innerText;
      } else {
        curr += button.innerText;
      }
      currValue.innerText = curr;
    }
  //   if (button.classList.contains("operator")) {
  //     if (curr === "") return;
  //     if (prev !== "") {
  //       compute();
  //     }
  //     operator = button.innerText;
  //     prev = curr;
  //     curr = "";
  //     prevValue.innerText = prev;
  //     currValue.innerText = curr;
  //   }
  // });
});







