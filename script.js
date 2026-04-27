let outputText = "";
let test = "";
let example = [];

const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        handleClick(event.target);
    });
});

// TODO: need to handle equals inputs when there is only an operand
// for example it is doing: 6 = 6
// should ignore instead

function handleClick(element) {
    // console.log("You clicked:", element.innerText);
    // Need to check if Array is empty, you can't have an arithmitic operator
    // without a preceding number
    let p = document.querySelector(".display");
    let isCalculated = false;
    let isInvalid = false;

    if (test.length === 0) {
        // need to check if innerText is a valid integer
        // if true = append to array
        // else = ignore
        if (!isNaN(element.innerText)) {
            // console.log(`${element.innerText} is a number!`);
            test += element.innerText;
        } else {
            // console.log(`${element.innerText} is not a number!`);
            // p.innerText = "0";
            isInvalid = true;
        }
    } else {
        if(isNaN(element.innerText) && isNaN(test[test.length - 1])) {
            // console.log(`cannot append ${element.innerText} to operator ${test[test.length - 1]}`);
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

    // array is not empty
    // do stuff

    // testing, delete later
    if (element.innerText === 'C') {
        test = "";
        p.innerText = "0";
    } else if (isCalculated) {
         p.innerText = test;
         test = "";
    } else if (isInvalid) {
        p.innerText = "0";
        isInvalid = false;
    } else {
        p.innerText = test;
    }
}

function parseInfixToPostfix(string) {
    let arr_output = [];
    let stack = [];
    let fixed_len = string.length;
    let digit_str = "";

    for (let i = 0; i < fixed_len; i++) {
        let char = string[i];

        if (!isNaN(char)) {
            digit_str += char;
        } else {
            arr_output.push(digit_str);
            digit_str = "";

            if (stack.length === 0) {
                stack.push(char);
            } else {
                // char is an operator
                // evaluate char against each operator in the top of stack
                // if precedence of char is < top, pop until char is > or stack is empty
                while (stack.length > 0) {
                    let top = stack[stack.length - 1];
                    if ((char === '+' || char === '-')) {
                        arr_output.push(stack.pop());
                    } else if ((char === '*' || char === '/') && 
                        (top === '*' || top === '/')) {
                        arr_output.push(stack.pop());
                    } else {
                        break;
                    }
                }

                stack.push(char);
            }
        }
    }

    if (digit_str.length !== 0) {
        arr_output.push(digit_str);
    }

    while (stack.length !== 0) {
        arr_output.push(stack.pop());
    }

    return arr_output;
}

function calculateEquation(string) {
    let array = parseInfixToPostfix(string)
    let stack = [];

    while(array.length > 0) {
        if (!isNaN(array[0])) {
            stack.push(array.shift());
        } else {
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