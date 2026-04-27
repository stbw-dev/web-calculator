let outputText = "";
let test = "";
let example = [];
let foobar = "14+5*6/7-2";
// let barfoo = "5*4+5";
let barfoo = "10+26+33-56*34/23"

// let bar = parseInfixToPostfix(foobar);
// let calculation = calculatePostfix(bar);

// console.log(calculatePostfix(parseInfixToPostfix(barfoo)));

// console.log(calculation);

const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        handleClick(event.target);
    });
});

function handleClick(element) {
    // console.log("You clicked:", element.innerText);
    // Need to check if Array is empty, you can't have an arithmitic operator
    // without a preceding number

    if (test.length === 0) {
        // need to check if innerText is a valid integer
        // if true = append to array
        // else = ignore
        if (!isNaN(element.innerText)) {
            console.log(`${element.innerText} is a number!`);
            // example.push(element.innerText);
            // outputText += element.innerText;
            test += element.innerText;
        } else {
            console.log(`${element.innerText} is not a number!`);
        }
    } else {
        if(isNaN(element.innerText) && isNaN(test[test.length - 1])) {
            console.log(`cannot append ${element.innerText} to operator ${test[test.length - 1]}`);
        } else if (element.innerText === '=') {
            let postfix = parseInfixToPostfix(test);
            let calc = calculatePostfix(postfix);
            console.log(calc);
            test += element.innerText;
            test += calc.toString();
        } 
        else {
            // example.push(element.innerText);
            test += element.innerText;
            // outputText += element.innerText;
        }
    }

    // array is not empty
    // do stuff

    // testing, delete later
    if (element.innerText !== 'C') {
        // outputText += ` ${element.innerText}`;
    } else {
        // outputText = "";
        test = "";
    }
    // console.log("Output: ", outputText);
    console.log(test);
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

function calculatePostfix(array) {
    let stack = [];
    let sum = 0;
    let length = array.length;
    console.log(`length: ${length}`);

    while(array.length > 0) {
        if (!isNaN(array[0])) {
            console.log(`popping ${array[0]}!`);
            stack.push(array.shift());
        } else {
            let value = 0;
            let token = array.shift();
            let right_opp = stack.pop();
            let left_opp = stack.pop();
            if (token == '+') {
                console.log("adding!")
                value = (+left_opp + +right_opp);
                sum = value;
            }

            if (token == '-') {
                console.log("subtracting!")
                value = (+left_opp - +right_opp);
                sum = value;
            }

            if (token == '*') {
                console.log("multiplying!")
                value = (+left_opp * +right_opp);
                sum = value;
            }

            if (token == '/') {
                console.log("dividing!")
                value = (+left_opp / +right_opp);
                sum = value;
            }
            console.log(`value: ${value}`);
            console.log(`running sum: ${sum}`);

            stack.push(value.toString())
        }
    }

    console.log(`total sum: ${sum}`);
    return sum;
}

function checkIfNum(value) {
    return !isNaN(Number(value));
}