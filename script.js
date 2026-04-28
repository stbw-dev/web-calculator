let outputText = "";
let test = "";
let example = [];

const buttons = document.querySelectorAll('button');

// Add event listener for each button
buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        handleClick(event.target);
    });
});


// Function for handling button clicks from user
function handleClick(element) {
    let p = document.querySelector(".display");
    let isCalculated = false;
    let isInvalid = false;

    // Need to check if Array is empty, can't have a unary arithmitic operator
    // without a preceding number (for this calculator)
    if (test.length === 0) {
        // need to check if innerText is a valid integer
        // if true, append to array
        // else, set flag
        if (!isNaN(element.innerText)) {
            test += element.innerText;
        } else {
            isInvalid = true;
        }
    } else {
        if(isNaN(element.innerText) && isNaN(test[test.length - 1])) {
            p.innerText = "0";
        } else if (element.innerText === '=') {
            if (isNaN(test)) {
                let calc = calculateEquation(test);
                test += element.innerText;
                test += calc.toString();
                isCalculated = true;
            }
        } 
        else {
            test += element.innerText;
        }
    }

    // clear
    if (element.innerText === 'C') {
        test = "";
        p.innerText = "0";
    } else if (isCalculated) { // calculated flag
         p.innerText = test;
         test = "";
    } else if (isInvalid) { // invalid flag
        p.innerText = "0";
        isInvalid = false;
    } else {
        p.innerText = test;
    }
}


// Converts a infix string to an equivalent postfix expression
// represented as an array of strings
function parseInfixToPostfix(string) {
    let arr_output = []; // array for holding postfix exp
    let stack = []; // our "stack" for handling tokens
    let digit_str = ""; // temporarily store operands

    for (let i = 0; i < string.length; i++) {
        const char = string[i];

        // if it's a number, append it to our string
        // otherwise, we have an operator
        if (!isNaN(char)) {
            digit_str += char;
        } else { 
            arr_output.push(digit_str); // add our number to the array
            digit_str = "";             // clear the string

            if (stack.length === 0) {
                stack.push(char);       // stack is empty, so push the first token
            } else {
                // evaluate token against each operator in the top of stack
                // if precedence of char is < top, pop until char is > or stack is empty
                // for the simplified calculator +/- will clear the whole stack
                while (stack.length > 0) {
                    const top = stack[stack.length - 1];
                    if ((char === '+' || char === '-')) {
                        arr_output.push(stack.pop());
                    } else if ((char === '*' || char === '/') && 
                        (top === '*' || top === '/')) {
                        arr_output.push(stack.pop());
                    } else {
                        break;
                    }
                }

                // push the token onto the stack 
                stack.push(char);
            }
        }
    }

    // add any remaining intger
    if (digit_str.length !== 0) {
        arr_output.push(digit_str);
    }

    // add any remaining tokens
    while (stack.length !== 0) {
        arr_output.push(stack.pop());
    }

    return arr_output;
}

// calculates the value given a string representation
// strings must be in this exact format
// i.e., "1+5", "5*4-2", "10/5*2-1+10", etc.
function calculateEquation(string) {
    let array = parseInfixToPostfix(string) // convert string to postfix
    let stack = [];

    // keep pushing the contents of the array until we have nothing left
    // to evaluate
    while(array.length > 0) {
        if (!isNaN(array[0])) {             // if we have a number, push it to the stack
            stack.push(array.shift());
        } else {                            // otherwise it's a token, so perform the relevant operation
            let value = 0;
            let token = array.shift();
            let right_opp = stack.pop();
            let left_opp = stack.pop();
            if (token == '+') {
                value = (+left_opp + +right_opp);
            }

            if (token == '-') {
                value = (+left_opp - +right_opp);
            }

            if (token == '*') {
                value = (+left_opp * +right_opp);
            }

            if (token == '/') {
                value = (+left_opp / +right_opp);
            }

            stack.push(value.toString())
        }
    }

    return stack.shift();
}