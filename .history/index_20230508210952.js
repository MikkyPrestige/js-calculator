const currValue = document.getElementById("curr");
const prevValue = document.getElementById("prev");
const operatorBtn = document.querySelectorAll(".operator");
const numBtn = document.querySelectorAll(".num");
const dotBtn = document.querySelector(".dot");
const zeroBtn = document.querySelector(".zero");
const clearBtn = document.querySelector(".clear");
const delBtn = document.querySelector(".del");
const equalBtn = document.querySelector(".equalTo");

const output = () => {
    currValue.innerText = curr;
    prevValue.innerText = prev;
}

const operation = () => {
  operatorBtn.forEach((operator) => {
    operator.addEventListener("click", () => {
      if (curr === "") return;
      if (prev !== "") {
        prev = curr;
      } else {
        prev = curr;
      }
      operation = operator.innerText;
      prev = curr;
      curr = "";
      output();
    });
  })
}

const buttons = () => {
  numBtn.forEach((num) => {
    num.addEventListener("click", () => {
      if (num.classList.contains("dot")) {
        if (curr.includes(".")) return;
        curr += num.innerText;
      }


