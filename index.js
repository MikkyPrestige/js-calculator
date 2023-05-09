const currValue = document.getElementById("curr");
const prevValue = document.getElementById("prev");
const numBtn = document.querySelectorAll(".num");
const clearBtn = document.querySelector(".clear");
const delBtn = document.querySelector(".del");
const equalBtn = document.querySelector(".equalTo");
const dotBtn = document.querySelector(".dot");
const operatorBtn = document.querySelectorAll(".operator");
const zeroBtn = document.querySelector(".zero");

const MAX_NUM_LENGTH = 14;

// Math operation implementations
function add1(num1, num2) {
    return num1 + num2;
}

function sub1(num1, num2) {
    return num1 - num2;
}

function mul1(num1, num2) {
    return num1 * num2;
}

function div1(num1, num2) {
    return num1 / num2;
}
