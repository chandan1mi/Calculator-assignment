const buttons = document.querySelectorAll('button');
const inputDisplay = document.querySelector('.screen');
const operatorType = document.querySelector('.operatorClass'); // por si se pone info
const clearBtn = document.querySelector('#clear');
const deleteBtn = document.querySelector('#erase');
const resultBtn = document.querySelector('#equals');
const dot = document.querySelector('.dot');
// ¡¡¡variables importantes!!!
let operator1 = '';
let operator2 = '';
let inputArray = [];
let checkOperatorsArray = [];
let num1 = '';
let num2 = '';
let result = '';
resultBtn.disabled = true;

function defaultValues() {
    operator1 = '';
    operator2 = '';
    inputArray = [];
    checkOperatorsArray = [];
    num1 = '';
    num2 = '';
    result = '';
    resultBtn.disabled = true;
    operatorType.textContent = 'Press AC button or type a new operation';
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
    result = (Number(a) * Number(b)).toFixed(2);
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
        operatorType.textContent = 'You can\'t divide by 0 ... press AC button.';
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
    inputArray = [];
    checkOperatorsArray = [];
    num1 = '';
    num2 = '';
    result = '';
    resultBtn.disabled = true;
    inputDisplay.textContent = '';
    buttons.disabled = false;
}
function eraseButton() {
    inputArray.pop();
    inputArray.pop();
}

function operate(button) {
    let forNum = 0;
    let value = button.textContent;

    inputArray.push(value);
    checkOperatorsArray.push(value);

    if (value === 'AC' || (value === '=' && !operator1)) {
        clearButton();
    } else if (value === '↼') {
       eraseButton();
    }

    let theArray = inputArray.join('');
    inputDisplay.textContent = theArray;

    if (button.id.match('operator') &&
            (checkOperatorsArray[checkOperatorsArray.length - 2] == '+' ||
            checkOperatorsArray[checkOperatorsArray.length - 2] == '-' ||
            checkOperatorsArray[checkOperatorsArray.length - 2] == '*' ||
            checkOperatorsArray[checkOperatorsArray.length - 2] == '/' ||
            checkOperatorsArray[checkOperatorsArray.length - 2] == '=' ||
            checkOperatorsArray[checkOperatorsArray.length - 2] == undefined)) {
        operatorType.textContent = 'Type a valid operation';
        clearButton();
    } else if (button.id.match('operator') && operator1 === '') {
        operator1 = value;
        forNum = theArray.slice(0, -1);
        theArray = '';
        inputArray = [];
        num1 = forNum;
        inputDisplay.textContent = theArray;
        resultBtn.disabled = false;
    } else if ((button.id.match('operator') && operator1 && !operator2 ||
            (button.id.match('equals') && operator1 && !operator2))) {
        operator2 = value;
        forNum = theArray.slice(0, -1);
        theArray = '';
        inputArray = [];
        num2 = forNum;
        inputDisplay.textContent = theArray;
    } else if (theArray.includes('.')) {
        dot.disabled = true;
        operatorType.textContent = 'Your number already has a dot.';
    } else if (!theArray.includes('.')) {
        dot.disabled = false;
        operatorType.textContent = '';
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

// clave para el keyboard support
document.addEventListener('keydown', (event) => {
    let name = event.key;
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
        document.body.style.backgroundColor = `${rndColor[Math.floor(Math.random() * 2)]}`;
        operate(pressButton);
    } else if (name === 'Backspace') {
        clearButton();
    } else {
        operatorType.textContent = 'Please type a valid operation in your keyboard'
    } //alert(`key pressed: ${name}`)
}, false);

let rndColor = ['rgb(0, 53, 69)', 'rgb(29, 92, 99)']

/*
Para checar
    console.log('num1:' + num1);
    console.log('num2:' + num2);
    console.log('input array:' + inputArray);
    console.log('operator1:' + operator1);
    console.log('operator2:' + operator2)
    console.log('the array:' + theArray);
    console.log('operator array:' +  checkOperatorsArray);
*/