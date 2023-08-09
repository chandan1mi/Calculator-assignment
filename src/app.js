const buttons = document.querySelectorAll('button');
const inputDisplay = document.querySelector('.screen');
const operatorType = document.querySelector('.operatorClass');
const clearBtn = document.querySelector('#clear');
const deleteBtn = document.querySelector('#erase');
const resultBtn = document.querySelector('#equals');

const add = (a, b) => a + b;
const substract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

let operator = '';
let inputArray = [];

function clearButton() {
    operator = '';
    inputArray = [];
    inputDisplay.textContent = '0';
}

function eraseButton() {
    inputArray.pop();
    inputArray.pop();
}

function operate(button) {
    let value = button.textContent;
    inputArray.push(value);

    if (value === 'AC') {
        clearButton();
    } else if (value === '↼') {
       eraseButton();
    }

    let theArray = inputArray.join('');
    inputDisplay.textContent = theArray;

    console.log('input array:' + inputArray)
    console.log('operator:' + operator);
    console.log('the array:' + theArray);
}

buttons.forEach(button => button.addEventListener('click', () => operate(button)));