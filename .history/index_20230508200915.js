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

numBtn();

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

operatorBtn();


equalBtn.addEventListener("click", () => {
  if (curr === "" || prev === "") return;
  compute();
  prevValue.innerText = "";
  currValue.innerText = curr;
  prev = "";
  curr = "";
}
);

equalBtn();

clearBtn.addEventListener("click", () => {
  curr = "";
  prev = "";
  currValue.innerText = "";
  prevValue.innerText = "";
}
);

clearBtn();

delBtn.addEventListener("click", () => {
  curr = curr.slice(0, -1);
  currValue.innerText = curr;
}
);

delBtn();

dotBtn.addEventListener("click", () => {
  if (curr.includes(".")) return;
  curr += ".";
  currValue.innerText = curr;
}
);

dotBtn();

zeroBtn.addEventListener("click", () => {
  if (curr === "") return;
  curr += "0";
  currValue.innerText = curr;
}
);

zeroBtn();

function compute() {
  let computation;
  const prevNum = parseFloat(prev);
  const currNum = parseFloat(curr);
  if (isNaN(prevNum) || isNaN(currNum)) return;
  switch (operator) {
    case "+":
      computation = prevNum + currNum;
      break;
    case "-":
      computation = prevNum - currNum;
      break;
    case "*":
      computation = prevNum * currNum;
      break;
    case "÷":
      computation = prevNum / currNum;
      break;
    default:
      return;
  }
  curr = computation;
  operator = undefined;
}

compute();


