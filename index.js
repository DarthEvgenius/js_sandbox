"use strict";
// Add a function name to <ul> in the main page---------------------------
addFunctionName('addFunctionName(name, description)', 'adds the name of the function and its description to this page')
function addFunctionName(name, description) {
    let ul = document.getElementById('functions');
    let li = document.createElement('li');
    li.innerHTML = `<strong>${name}</strong>: ${description}`;
    ul.appendChild(li);
}


// Shuffle an array in random order ----------------------------------------
addFunctionName('shuffle(array)', "shuffles array's items in random order");
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}



// Upgraidable calculator------------------------------------------------
addFunctionName('calculate("a + b")', 'upgraidable calculator, init by "new Calculator()", add new methods by ".addMethod"');
function Calculator(str) {
    this.methods = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
    }

    this.calculate = function (str) {
        // Parses input and calls calculation methods
        try {
            let arr = str.split(' '),
                a = +arr[0],
                b = +arr[2],
                operator = arr[1];
            // console.log('a: ' + a + '; b: ' + b + '; c: ' + operator)

            if (isNaN(b) || isNaN(b)) {
                throw new SyntaxError();
            }

            if (operator in this.methods) {
                return this.methods[operator](a, b);
            } else {
                console.log('This operator is not accepted.');
                return;
            }

        } catch (e) {
            if (e.name === 'TypeError') {
                console.log("Usage: 'Calculator.calculate(a + b)'");
            }
            if (e.name === 'SyntaxError') {
                console.log("Usage: 'Calculator.calculate(a + b)', where 'a' and 'b' are numeric.")
            }
        }
    }

    this.addMethod = function (str, func) {
        this.methods[str] = func;
    }
}
// let a = new Calculator();
// console.log(a.calculate('1 + 2'));


// find max subarray sum --------------------------------------------------------------------
// Return 0 if the result is less then 0.
// let arr = [-1, 2, 3, -9]; //5
// [-1, 2, 3, -9, 11] // 11
// [100, -9, 2, -3, 5] // 100
addFunctionName('getMaxSubSum(array)', 'find max subarray sum')
function getMaxSubSum(arr) {
    let result = 0;

    // 1 solution
    // let start;
    // let end;
    // Check sums of all possible submassives in doubleloop
    // for (let i = 0; i < arr.length; i++) {
    //     let checkSum = arr[i];
    //     for (let j = i + 1; j < arr.length; j++) {
    //         checkSum += arr[j];
    //         if (checkSum > result) {
    //             result = checkSum;
    //             start = i;
    //             end = j;
    //         }
    //     }
    // }
    // return `Max sum is ${result}, from ${start} to ${end}`;

    // 2 solution
    // Create temp array for sums with initial arr[0] = 0
    // let sums = [0];
    // // First loop will go through original array
    // for (let i = 0; i < arr.length; i++) {
    //     // the sum of the current i'th item and all previous
    //     let current_sum = arr[i] + sums[i];
    //     // we have to save this for calculations
    //     sums.push(current_sum);
    //     // Now check all possible sums for max value
    //     // Don't include 'current_sum - all previous sum'
    //     for (let j = 0; j < sums.length - 1; j++) {
    //         result = Math.max(result, current_sum - sums[j])
    //     }
    // }

    // 3 solution
    let current_sum = 0;
    for (let i of arr) {
        current_sum = Math.max(i, current_sum + i);
        result = Math.max(result, current_sum);
    }

    return `Max sum is ${result}`;
}

// console.log(getMaxSubSum(arr));



// Game of Timmeouts   (3,4,2,1)-----------------------------------------------------
addFunctionName('timeoutGame()', 'Micro and Macro tasks with web API play the game')
function timeoutGame() {
    setTimeout(function timeout() {
        console.log("timeout 1");
    }, 0);
    setTimeout(function timeout() {
        console.log("timeout 2");
    }, 0);
    Promise.resolve("Promise 3").then(console.log);
    console.log('log 4');
    console.log(' log 5');
}


// Свойство примитива ------------------------------------------------
// let a = 10;
// a.b = 20;
// console.log(a);


// lowerCamelCase out of my-short-string -----------------------------------
function camelize(str) {
    return str
        .split('-')
        .map((word, index) =>
            index === 0 ?
                word :
                word[0].toUpperCase() + word.slice(1))
        .join('')
}


// Filter an array with altering the original array-----------------------------------------
function filterRangeInPlace(arr, a, b) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < a || arr[i] > b) {
            arr.splice(i, 1);
            // Теперь у нас на 1 элемент меньше - надо уменьшить индекс
            i--;
        }
    }
}


