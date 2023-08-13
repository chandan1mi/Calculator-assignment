const buttons = document.querySelectorAll('button');
const inputDisplay = document.querySelector('.screen');
const operatorType = document.querySelector('.operatorClass');
const clearBtn = document.querySelector('#clear');
const deleteBtn = document.querySelector('#erase');
const resultBtn = document.querySelector('#equals');
const dot = document.querySelector('.dot');
// ¡¡¡variables importantes!!!
let operator1 = '';
let operator2 = '';
let num1 = '';
let num2 = '';
let result = '';
resultBtn.disabled = true;
operatorType.textContent = 'Welcome, try to break this calculator';

function defaultValues() {
    operator1 = '';
    resultBtn.disabled = true;
}

// operation functions
const add = (a, b) => {
    result = (Number(a) + Number(b)).toFixed(2);
    num1 = result;
    num2 = '';
    operator1 = operator2;
    operator2 = '';
    inputDisplay.textContent = num1;
    if (operator1 === '=') {
        defaultValues();
    }
}

const substract = (a, b) => {
    result = (Number(a) - Number(b)).toFixed(2);
    num1 = result;
    num2 = '';
    operator1 = operator2;
    operator2 = '';
    inputDisplay.textContent = num1;
    if (operator1 === '=') {
        defaultValues();
    }
}

const multiply = (a, b) => {
    result =(Number(a) * Number(b)).toFixed(2);
    num1 = result;
    num2 = '';
    operator1 = operator2;
    operator2 = '';
    inputDisplay.textContent = num1;
    if (operator1 === '=') {
        defaultValues();
    }
}

const divide = (a, b) => {
    if (Math.abs(b) === 0) {
        operatorType.textContent = 'You can\'t divide by 0';
        clearButton();
    } else {
        result = (Number(a) / Number(b)).toFixed(2);
        num1 = result;
        num2 = '';
        operator1 = operator2;
        operator2 = '';
        inputDisplay.textContent = num1;
        if (operator1 === '=') {
            defaultValues();
        }
    }
}

// botones de ac y borrar un dígito
function clearButton() {
    operator1 = '';
    operator2 = '';
    num1 = '';
    num2 = '';
    result = '';
    resultBtn.disabled = true;
    inputDisplay.textContent = '';
}

function eraseButton() {
    let eraseOne = [];
    if (num1 && !operator1 && !num2) {
        eraseOne = (''+num1).slice(0, -1);
        num1 = eraseOne;
        inputDisplay.textContent = num1;
    } else if (num1 && operator1 && num2) {
        eraseOne = (''+num2).slice(0, -1);
        num2 = eraseOne;
        inputDisplay.textContent = num2;
    }
}

function operate(button) {
    let value = button.textContent;
    resultBtn.disabled = true;

    if (value === 'AC' || (value === '=' && !operator1)) {
        clearButton();
    } else if (value === '↼') {
       eraseButton();
    } else if (button.id.match('operator') && !num1) {
        operatorType.textContent = 'First write a number';
        inputDisplay.textContent = '';
    } else if (button.id.match('num') && !operator1 && !num2) {
        if (value === '.' && num1.includes('.')) {
            operatorType.textContent = 'Your number already has a dot';
            num1 = num1;
        } else {
            num1 += value;
            inputDisplay.textContent = num1;
        }
    } else if (button.id.match('operator') && !num2) {
        operator1 = value;
    } else if (button.id.match('num') && num1 && operator1) {
        if (value === '.' && num2.includes('.')) {
            operatorType.textContent = 'Your number already has a dot';
            num2 = num2;
        } else {
            num2 += value;
            inputDisplay.textContent = num2;
        }
        resultBtn.disabled = false;
    } else if ((button.id.match('operator') || button.id.match('equals')) && num1 && operator1 && num2) {
        operator2 = value;
    }

    if (operator1 && operator2 && num1 && num2) {
        if(operator1 === '+') {
            add(num1, num2);
        } else if (operator1 === '-') {
            substract(num1, num2);
        } else if (operator1 === '*') {
            multiply(num1, num2);
        } else if (operator1 === '/') {
            divide(num1, num2);
        }
    }
}
buttons.forEach(button => button.addEventListener('click', () => operate(button)));

// keyboard support
document.addEventListener('keydown', (e) => {
    let name = e.key;
    let pressButton;
    if (name === '9') {
        pressButton = document.querySelector('.nine');
        operate(pressButton);
    } else  if (name === '8') {
        pressButton = document.querySelector('.eight');
        operate(pressButton);
    } else if (name === '7') {
        pressButton = document.querySelector('.seven');
        operate(pressButton);
    } else if (name === '6') {
        pressButton = document.querySelector('.six');
        operate(pressButton);
    } else  if (name === '5') {
        pressButton = document.querySelector('.five');
        operate(pressButton);
    } else if (name === '4') {
        pressButton = document.querySelector('.four');
        operate(pressButton);
    } else if (name === '3') {
        pressButton = document.querySelector('.three');
        operate(pressButton);
    } else  if (name === '2') {
        pressButton = document.querySelector('.two');
        operate(pressButton);
    } else if (name === '1') {
        pressButton = document.querySelector('.one');
        operate(pressButton);
    } else if (name === '0') {
        pressButton = document.querySelector('.cero');
        operate(pressButton);
    } else if (name === '.') {
        pressButton = document.querySelector('.dot');
        operate(pressButton);
    } else if (name === '+') {
        pressButton = document.querySelector('.plus');
        operate(pressButton);
    } else if (name === '-') {
        pressButton = document.querySelector('.minus');
        operate(pressButton);
    } else if (name === '*') {
        pressButton = document.querySelector('.multiply');
        operate(pressButton);
    } else if (name === '/') {
        pressButton = document.querySelector('.divide');
        operate(pressButton);
    } else if (name === 'Enter') {
        pressButton = document.querySelector('#equals');
        operate(pressButton);
    } else if (name === 'Backspace') {
        clearButton();
    } else {
        operatorType.textContent = 'Type a valid operation in your keyboard'
    } //alert(`key pressed: ${name}`)
}, false);