// Variables to keep track of the current calculation
let currentInput = '0';
let currentOperator = '';
let prevInput = '0';

// Function to update the display with the current input
function updateDisplay() {
    const display = document.getElementById("display");
    display.textContent = currentInput;
}

// Function to clear the display and reset the calculator
function clearDisplay() {
    currentInput = '0';
    currentOperator = '';
    prevInput = '0';
    updateDisplay();
}

// Function to append a number to the current input
function appendNumber(number) {
    if (currentInput === '0' || currentInput === 'Error') {
        currentInput = number;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

// Function to append an operator to the current input
function appendOperator(operator) {
    if (currentOperator !== '') {
        calculate();
    }
    currentOperator = operator;
    prevInput = currentInput;
    currentInput = '0';
}

// Function to perform the calculation
function calculate() {
    const num1 = parseFloat(prevInput);
    const num2 = parseFloat(currentInput);

    switch (currentOperator) {
        case '+':
            currentInput = (num1 + num2).toString();
            break;
        case '-':
            currentInput = (num1 - num2).toString();
            break;
        case '*':
            currentInput = (num1 * num2).toString();
            break;
        case '/':
            if (num2 === 0) {
                currentInput = 'Error';
            } else {
                currentInput = (num1 / num2).toString();
            }
            break;
        default:
            currentInput = 'Error';
            break;
    }

    currentOperator = '';
    prevInput = '0';
    updateDisplay();
}

// Add event listeners to number and operator buttons
document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", () => {
        const buttonText = button.textContent;
        if (!isNaN(parseInt(buttonText, 10)) || buttonText === '.') {
            appendNumber(buttonText);
        } else if (buttonText === 'C') {
            clearDisplay();
        } else if (buttonText === '=') {
            calculate();
        } else {
            appendOperator(buttonText);
        }
    });
});
const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");

buttons.forEach((item) => {
  item.onclick = () => {
    if (item.id == "clear") {
      display.innerText = "";
    } else if (item.id == "backspace") {
      let string = display.innerText.toString();
      display.innerText = string.substr(0, string.length - 1);
    } else if (display.innerText != "" && item.id == "equal") {
      display.innerText = eval(display.innerText);
    } else if (display.innerText == "" && item.id == "equal") {
      display.innerText = "Empty!";
      setTimeout(() => (display.innerText = ""), 2000);
    } else {
      display.innerText += item.id;
    }
  };
});

const themeToggleBtn = document.querySelector(".theme-toggler");
const calculator = document.querySelector(".calculator");
const toggleIcon = document.querySelector(".toggler-icon");
let isDark = true;
themeToggleBtn.onclick = () => {
  calculator.classList.toggle("dark");
  themeToggleBtn.classList.toggle("active");
  isDark = !isDark;
};