"use strict";
// Add a function name to <ul> in the main page---------------------------
addFunctionName('addFunctionName(name, description)', 'adds the name of the function and its description to this page')

function addFunctionName(name, description) {
    let ul = document.getElementById('functions');
    let li = document.createElement('li');
    li.innerHTML = `<strong>${name}</strong>: ${description}`;
    ul.appendChild(li);
}



// intersection example on page
addFunctionName('intersection', 'intersection example on DOM elements');
// enable an observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        let inOut = ''
        if (entry.isIntersecting) {
            inOut = 'enters viewport'
        } else {
            inOut = 'exits viewport'
        }
        console.log(inOut, entry.target);
    });
});
// set an observer for each li element on page
const li = document.querySelectorAll('li');
li.forEach(e => observer.observe(e));



// filters an array of strings out of anagrams
addFunctionName('aclean', 'filters an array of strings out of anagrams')
function aclean(arr) {
    // create a filter object
    let filter = {}
    arr.forEach(elem => {
        // sort each word of an array
        // use it as keys in the filter object
        // and each word itself will be the value
        // if meet the same key from another word, the value is overwritten
        let key = elem.toLowerCase().split('').sort().join('')
        filter[key] = elem
    })

    // Solution 2 (with .reduce())
    // return Object.values(
    //     arr.reduce((acc, item) => {
    //         acc[item.toLowerCase().split('').sort().join('')] = item;
    //         return acc;
    //     }, {})
    // )

    return Object.values(filter)
}
// let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];
// console.log(aclean(arr))



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



// Compare speed of Date object
addFunctionName('bench(diffSubtract, diffGetTime)', 'compare speed of Date object via subtracting raw dates and date.getTime methods')

function diffSubtract(date1, date2) {
    return date2 - date1;
}

function diffGetTime(date1, date2) {
    return date2.getTime() - date1.getTime();
}

function bench(f1 = diffSubtract, f2 = diffGetTime) {
    let date1 = new Date(0);
    let date2 = new Date();

    let start = Date.now();
    for (let i = 0; i < 100000; i++) f1(date1, date2);
    console.log('Subtract: ', Date.now() - start, 'ms');

    start = Date.now();
    for (let i = 0; i < 100000; i++) f2(date1, date2);
    console.log('GetTime: ', Date.now() - start, 'ms');
}



// Game of Timmeouts   (3,4,2,1)-----------------------------------------------------
addFunctionName('timeoutGame()', 'Micro and Macro tasks with web API')

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


addFunctionName('topObjectValue()', "returns property's key with max value")
function topObjectValue(object) {
    let maxValue = 0;
    let resultKey = null;

    for (let [key, value] of Object.entries(object)) {
        if (value > maxValue) {
            maxValue = value;
            resultKey = key;
        }
    }
    return resultKey;
}



// Primitive property ------------------------------------------------
// let a = 10;
// a.b = 20;
// console.log(a);



// lowerCamelCase out of my-short-string -----------------------------------
addFunctionName('camelize(str)', 'lowerCamelCase out of my-short-string')

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
addFunctionName('filterRangeInPlace(arr, a, b)', 'Filter an array')

function filterRangeInPlace(arr, a, b) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < a || arr[i] > b) {
            arr.splice(i, 1);
            // Теперь у нас на 1 элемент меньше - надо уменьшить индекс
            i--;
        }
    }
}



// make an obj out of arr of users, user.id becomes a key for obj
addFunctionName('groupById(array)', 'make an obj out of arr of users')

function groupById(array) {
    return array.reduce((obj, value) => {
        obj[value.id] = value;
        return obj;
    }, {})
}

// Solution 2
// function groupById(arr) {
//     let res = {}
//     for (e of arr) {
//         res[e.id] = e
//     }
//     return res
// }



// Iter pseudoarray
addFunctionName('pseudo-array', 'pseudo-array object with iterator')
let pseudoArrayIterator = {
    0: "Zero",
    1: "One",
    2: function SomeMethod() { },

    length: 3,

    [Symbol.iterator]() {
        this.i = 0;
        return this;
    },

    next() {
        if (this.i < this.length) {
            return { done: false, value: this[this.i++] }
        }
        return { done: true };
    },
};

pseudoArrayIterator["3"] = "Three";
pseudoArrayIterator.length++;

//   for (let value of pseudoArrayIterator) {
//     console.log(value); // "Zero", "One", f someMethod() {} "Three";
//   }



// adds arguments of each function's call to array
// Usage:
// someFunction = spyDecorator(someFunction)
// someFunction(someArgs)
// someFunction.calls // [[someArgs], ]
addFunctionName('spyDecorator', "adds arguments of each function's call to array")
function spyDecorato(func) {
    function wrapper(...args) {
        wrapper.calls.push(args);
        return func.apply(this, args);
    }
    wrapper.calls = [];
    return wrapper;
}



// Showing this context for object's methods and arrow functions
addFunctionName('thisObject', "Showing 'this' context for object's methods and arrow functions")
let thisObject = {
    method() {
        console.log(this); // thisObject
        let foo = () => console.log(this);
        foo(); // thisObject
    }
}
// try thisObject.method() 

// now we will return arrow function in obj.method 
// and then assign returned arrow from one obj to another
let thisObject_2 = {
    method() {
        console.log(this); // thisObject_2
        let foo = () => console.log(this);

        return foo;
    }
}
let thisObject_3 = {
    method_2: thisObject.method(), // thisObject_2 !
}
// try thisObject_3()

// So the difference between classic function and arrows is in 'this'
// For classic function 'this' is calculated when we call it
// For arrow function 'this' is calculated when we create it