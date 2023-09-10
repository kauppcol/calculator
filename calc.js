const calculated = document.querySelector('#calculated');
const input = document.querySelector('#input');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const numberVals = "0123456789";
const opVals = "+-*/";



document.addEventListener('keydown', (e) => {
    var key = e.key;
    var code = e.code;
    console.log(e.key);
    console.log(code);
    if (numberVals.includes(key)) {
        addDigit(key);
    }
    else if (opVals.includes(key)) {
        addOperator(key);
    }
    else if (key == '.') {
        addPeriod();
    }
    else if (key == '=' || key == 'Enter') {
        evaluate();
    }
    else if (key == 'Escape') {
        clearDisplay();
    }
    else if (key === "Backspace" || key === "Delete") {
        deleteDisplay();
    }



});

numbers.forEach((number) => {
    number.addEventListener('click', () => {
        addDigit(number.textContent);
    });
});

document.querySelector('#period').addEventListener('click', () => {
    addPeriod();
});

operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        addOperator(operator.textContent);
    });
});

document.querySelector('#equals').addEventListener('click', () => {
    evaluate();
});

document.querySelector('#clear').addEventListener('click', () => {
    clearDisplay();
});

document.querySelector('#delete').addEventListener('click', () => {
    deleteDisplay();
});

function addDigit(digit) {
    if (input.textContent == '0') {
        input.textContent = digit;
    }
    else {
        input.textContent += digit;
    }
}

function addPeriod() {
    var exprArray = input.textContent.split(' ');
    var currVal = exprArray[exprArray.length - 1];
    if (!currVal.includes('.')) {
        input.textContent += '.';
    }
}

function addOperator(op) {
    if (input.textContent[input.textContent.length - 1] != ' ') {
        input.textContent += ' ' + op + ' ';
    }
}

function clearDisplay() {
    input.textContent = '0';
    calculated.textContent = '';
}

function deleteDisplay() {
    originalText = input.textContent;
    if (originalText[originalText.length - 1] == ' ') {
        input.textContent =  originalText.substring(0, originalText.length - 3);
    }
    else {
        if (originalText.length == 1 || originalText == "Infinity" || originalText == "NaN") {
            input.textContent = '0';
        }
        else {
            input.textContent = originalText.substring(0, originalText.length - 1);;
        }
    }
}

function evaluate() {
    var expression = input.textContent;
    if (expression[expression.length - 1] == ' ') {
        return;
    }

    var exprArray = expression.split(' ');
    while(exprArray.length > 1) {
        let opIndex = getNextOpIndex(exprArray, '*', '/')
        if (opIndex == -1) {
            opIndex = getNextOpIndex(exprArray, '+', '-')
        }
        let opVal = performOperation(exprArray[opIndex - 1], exprArray[opIndex], exprArray[opIndex + 1]);
        let newExpr = exprArray.slice(0, opIndex - 1);
        newExpr.push(opVal.toString());
        exprArray = newExpr.concat(exprArray.slice(opIndex + 2));
    }
    
    calculated.textContent = expression + ' =';
    var result = exprArray[0];
    if (result.includes('.')) {
        var rounded = Math.round(+result * 100) / 100;
        result = rounded.toString();
    }
    input.textContent = result;
}

function getNextOpIndex(exprArray, op1, op2) {
    var index1 = exprArray.indexOf(op1);
    var index2 = exprArray.indexOf(op2);
    var minIndex = Math.min(index1, index2);
    if (minIndex == -1) {
        return Math.max(index1, index2);
    }
    else {
        return minIndex;
    }
}

function performOperation(left, op, right) {
    switch (op) {
        case '+':
            return +left + +right;
        case '-':
            return +left - +right;
        case '*':
            return +left * +right;
        case '/':
            return +left / +right;
        default:
            return;
    }
}