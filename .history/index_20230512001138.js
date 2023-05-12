const currValue = document.getElementById("curr");
const prevValue = document.getElementById("prev");
const Result = document.getElementById("result");
const operatorBtn = document.querySelectorAll(".operator");
const numBtn = document.querySelectorAll(".num");
const clearBtn = document.querySelector(".clear");
const delBtn = document.querySelector(".del");
const equalBtn = document.querySelector(".equalTo");

let curr = "";
let prev = "";
let result = "";
let operator = "";

const display = () => {
    currValue.innerText = curr;
    prevValue.innerText = prev;
    Result.innerText = result;
}

const clearBtn = addEventListener("click", () => {
    curr = "";
    prev = "";
    result = "";
    display();
})