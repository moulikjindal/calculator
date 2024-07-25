// Retrieve the DOM elements
const calculatorScreen = document.querySelector('.calculator-screen');
const calculatorHistory = document.querySelector('.calculator-history');
const buttons = document.querySelectorAll('button');

// Variables to store calculator data
let currentInput = '';
let history = [];

// Function to update the display
function updateScreen() {
    calculatorScreen.value = currentInput || '0';
}

// Function to update the history
function updateHistory() {
    calculatorHistory.value = history.join('\n');
}

// Function to append numbers and operators to the current input
function appendToInput(value) {
    currentInput += value;
}

// Function to calculate the result of the current expression
function calculate() {
    try {
        // Evaluate the expression
        const result = eval(currentInput);

        // Store history if calculation is successful
        history.push(`${currentInput} = ${result}`);

        // Set the result as the new current input
        currentInput = result.toString();
        updateHistory();
    } catch (error) {
        // Handle invalid expressions
        currentInput = 'Error';
    }
}

// Function to reset the calculator
function allClear() {
    currentInput = '';
    history = [];
    updateHistory();
}

// Add event listeners to buttons
buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
        const { value } = event.target;

        switch (value) {
            case '+':
            case '-':
            case '*':
            case '/':
                appendToInput(` ${value} `);
                break;
            case '=':
                calculate();
                break;
            case '.':
                appendToInput(value);
                break;
            case 'all-clear':
                allClear();
                break;
            case 'clear':
                clear();
                break;
            case 'backspace':
                backspace();
                break;

            default:
                appendToInput(value);
                break;
        }

        updateScreen();
    });
});

// Add keyboard event listener
document.addEventListener('keydown', (event) => {
    const { key } = event;

    if ((key >= '0' && key <= '9') || key === '.') {
        appendToInput(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendToInput(` ${key} `);
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape') {
        allClear();
    } else if (key === 'Backspace') {
        backspace();
    }

    updateScreen();
});

// adding clear button funtionality
function clear() {
    currentInput = '0';
    updateScreen();
}

// add backspace button functionality
function backspace() {
    currentInput = currentInput.slice(0, -1);
    updateScreen();
}