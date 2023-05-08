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

numBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (curr.length > 10) return;
    curr += btn.innerText;
    currValue.innerText = curr;
  });
}
);

operatorBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (curr === "") return;
    if (prev !== "") {
      compute();
    }
    operator = btn.innerText;
    prev = curr;
    curr = "";
    prevValue.innerText = `${prev} ${operator}`;
    currValue.innerText = "";
  });
}
);



