
const MAX_LENGTH = 10;

const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const display = document.querySelector('.display');

let a = null;
let b = null;
let result;
let displayContent = '';

// Listeners

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
            result = operate(operator.id, a, b)
            display.textContent = result
        }
    })
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
            if (b === 0) return `You can't divide by 0.`
            return a / b;
        case 'remainder':
            return a % b;
    }
}

function updateDisplay(number) {
    if (display.textContent.includes('.') && number.textContent === '.') return;
    display.textContent += number.textContent;
}

function clear() {
    display.textContent = '';
    a = null;
    b = null;
}

function backspace() {
    display.textContent = display.textContent.slice(0, -1);
}
