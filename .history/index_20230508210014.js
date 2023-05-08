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

const clear = () => {
    curr = "";
    prev = "";
    operator = "";
    output();
}

const del = () => {
    curr = curr.slice(0, -1);
    output();
}

const appendNum = (num) => {
    if (num === "." && curr.includes(".")) return;
    curr += num;
    output();
}

const chooseOperator = (op) => {
    if (curr === "") return;
    if (prev !== "") {
        compute();
    }
    operator = op;
    prev = curr;
    curr = "";
    output();
}

