
const MAX_LENGTH = 17;

const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const display = document.querySelector('.display');
const equal = document.querySelector('#equal');

let calcStage = 'inputA';
let a = null;
let b = null;
let operation = null;
let result;
let displayContent = '';

// LISTENERS

numbers.forEach(number => {
    number.addEventListener('click', () => {
        updateDisplay(number)
    })
})

operators.forEach (operator => {
    operator.addEventListener('click', () => {
        if (operator.id === 'clear') {
            clear();
        } else if (operator.id === 'backspace') {
            backspace();
        } else {
            if (calcStage === 'inputA') {
                a = parseFloat(display.textContent);
                operation = operator.id;
                calcStage = 'transitionAB'
            } else if (calcStage === 'transitionAB') {
                b = parseFloat(display.textContent);
            } else if (calcStage === 'inputB') { // Chain operations
                b = parseFloat(display.textContent);
                a = operate(operation, a, b);
                operation = operator.id;
                calcStage = 'transitionAB';
                display.textContent = a;
            }
        }
    })
})

equal.addEventListener('click', () => {
    if (calcStage !== 'inputB') return;
    b = parseFloat(display.textContent);
    result = operate(operation, a, b);
    display.textContent = result;
})

// FUNCTIONS

function operate(operator, a, b){
    switch (operator) {
        case 'add':
            return a + b;
        case 'subtract':
            return a - b;
        case 'multiply':
            return a * b;
        case 'divide':
            if (b === 0) return `I forbid you divide by 0`;
            return a / b;
        case 'remainder':
            return a % b;
    }
}

function updateDisplay(number) {
    if (calcStage === 'transitionAB') {
        display.textContent = '0';
        calcStage = 'inputB'
    }
    if (display.textContent.length >= MAX_LENGTH) return; // Limit max imput length
    if (display.textContent.includes('.') && number.textContent === '.') return; // Filter out multiple dots
    if (display.textContent === '0') {
        if (number.textContent === '0') return; // Filter out multiple lead zeroes.
        if (number.textContent === '.') { //fix display of decimal numbers
            display.textContent = '0.';
            return;
        }
        display.textContent = number.textContent;
    } else {
        display.textContent += number.textContent;
    }

}

function clear() {
    display.textContent = '0';
    a = null;
    b = null;
    calcStage = 'inputA';
}

function backspace() {
    display.textContent = display.textContent.slice(0, -1);
    if (display.textContent === '') {
        display.textContent = '0';
    }
}
