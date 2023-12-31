"use strict";
// Add a function name to <ul> in the main page---------------------------
addFunctionName('addFunctionName(name, description)', 'adds the name of the function and its description to this page');

function addFunctionName(name, description) {
    //  get the main list
    let ul = document.getElementById('functions');
    // create new list item
    let li = document.createElement('li');
    li.classList.add('functionsList__item');
    li.id = name.split('(')[0];

    // populate with content
    li.innerHTML = `<strong class='functionsList__item_name'>${name}</strong>: ${description}`;

    ul.appendChild(li);
}


addFunctionName('createButtonInvoke(sectionId, functionName)', 'adds invoke button to the function')
function createButtonInvoke(sectionId, functionName) {
    const section = document.querySelector(`#${sectionId}`);
    let btn = document.createElement('button');
    btn.classList.add('functionsList__invoke-button');
    btn.textContent = sectionId;
    btn.addEventListener('click', function invokeFunc() {
        functionName();
        btn.removeEventListener('click', invokeFunc);
    });
    section.append(btn);
}



// Functions main list config
document.addEventListener('DOMContentLoaded', ()=>{
    document.querySelectorAll('.functionsList__item').forEach((elem)=>{
        elem.addEventListener('click', (event)=>{
            if (event.target.classList.contains('functionsList__item') ||
                event.target.classList.contains('functionsList__invoke-button') ||
                event.target.classList.contains('functionsList__item_name')) {
                // opened/closed triangle to the left of func names
                elem.classList.toggle('functionsList__item__opened');
            }
        });
    });
});



// intersection example on console
addFunctionName('intersection', 'intersection example on DOM elements');

// enable an observer
function intersection() {
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
}




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
    method: function() {
        console.log(this); // thisObject
        let foo = () => console.log(this);
        foo(); // thisObject
    }
}
// try thisObject.method() 

// now we will return arrow function in obj.method 
// and then assign returned arrow from one obj to another
let thisObject_2 = {
    method2: function() {
        console.log(this); // thisObject_2
        let foo = () => console.log(this);
        return foo;
    }
}
let thisObject_3 = {
    method_3: thisObject_2.method2(), // thisObject_2 !
}
// try thisObject_3.method_3()

// So the difference between classic function and arrows is in 'this':
// For classic function 'this' is calculated when we call it
// For arrow function 'this' is calculated when we create it and
// it's taken from outer lexical environment




addFunctionName('Clock', `class clock showing time every sec in console.<br>
Usage:<br>
- Create instanse of the class Clock with paramers: {template: 'h:m:s'}  (Or you can put just an empty object {}, then default params will be applied)<br>
    - Activate timer via .start()<br>
        - Stop timer via .stop()`)

class Clock {
    constructor({ template = 'h:m:s' }) {
        this.template = template;
    }

    render() {
        let date = new Date();

        let hours = date.getHours();
        if (hours < 10) hours = '0' + hours;

        let mins = date.getMinutes();
        if (mins < 10) mins = '0' + mins;

        let secs = date.getSeconds();
        if (secs < 10) secs = '0' + secs;

        let output = this.template
            .replace('h', hours)
            .replace('m', mins)
            .replace('s', secs);

        console.log(output);
    }

    stop() {
        clearInterval(this.timer)
    }

    start() {
        this.render();
        this.timer = setInterval(() => this.render(), 1000);
    }
}



addFunctionName('ExtendedClock', `class has prototype of Clock, shows time on each specified interval. <br>
Usage:<br>
- Create instanse of ExtendedClock with paramers: {template: 'h:m:s', interval: &lt;ms&gt;} (Or you can put just an empty object {}, then default params will be applied)<br>
    - Activate timer via .start()<br>
        - Stop timer via .stop()`);

class ExtendedClock extends Clock {
    constructor({ template = 'h:m:s', interval = 1000 }) {
        super(template);
        this.interval = interval;
    }

    start() {
        this.render();
        this.timer = setInterval(
            () => this.render(), this.interval
        );
    }
}



// Makes an unordered list out of object
// In future make new Tree inside list item of DOM
addFunctionName('createNodeTree', `makes an unordered list out of object (default object is given).
Used iife and node appending.`);

// add invoke button to 'createNodeTree' func
createButtonInvoke('createNodeTree', createNodeTree);

function createNodeTree(object = {
    "Рыбы": {
      "форель": {},
      "лосось": {}
    },
  
    "Деревья": {
      "Огромные": {
        "секвойя": {},
        "дуб": {}
      },
      "Цветковые": {
        "яблоня": {},
        "магнолия": {}
      }
    }
  }) 
  {
        // create container with 'functionsList__example' class
        let container = document.createElement('div');
        container.classList.add('functionsList__example');
        
        // Make an iife for list creating
        container.append((function treeCreating(obj = object) {
        let keys = Object.keys(obj);
        // if there are no keys in object
        // corner case for the recursion
        if (!keys.length) return;
        
        // create ul
        let ul = document.createElement('ul');
        ul.classList.add('nodeTreeNature');
        // create li for each key
        for (let k of keys) {
            let li = document.createElement('li');
            // add text to those li
            li.textContent = k;
            // call treeCreating func for each key
            // save child ul to new variable
            let childUl = treeCreating(obj[k]);
            // check if it's not empty (undefied)
            if (childUl) {
                // append to parent li
                li.append(childUl);
            }
            // add li to ul
            ul.append(li);
        }
        return ul;

        })());
    
        // add new list into DOM
        const createNodeTreeItem = document.querySelector('#createNodeTree');
        createNodeTreeItem.append(container);

        // apply listCollapseFunction to new list
        listCollapseFunction(createNodeTreeItem);
}



addFunctionName(`listCollapseFunction(list)`, `adds collapse functionality to list's items with nested lists.<br>You can see it in action on previous function 'createNodeTree'`);

function listCollapseFunction(list) {
    // puts all list items inside of <span> tags
    let listItems = list.querySelectorAll('li')
    for (let item of listItems) {
      let span = document.createElement('span');
      item.prepend(span); // insert new span into li
      span.prepend(span.nextSibling); // move li's txt into span
    }

    // add listener to the root of the list
    list.addEventListener('click', (e) => {
        if (e.target.tagName == 'SPAN') { // 'SPAN' all caps!!!
          // get nested ul
          let nestedList = e.target.parentElement.querySelector('ul');
          if (nestedList) {
            nestedList.hidden = !nestedList.hidden;
          }
        }      
      });
}



addFunctionName('createTextTree', `makes an unordered list out of object (default object is given).
Used iife and string concatenation`);

function createTextTree(object = {
    "Рыбы": {
      "форель": {},
      "лосось": {}
    },
  
    "Деревья": {
      "Огромные": {
        "секвойя": {},
        "дуб": {}
      },
      "Цветковые": {
        "яблоня": {},
        "магнолия": {}
      }
    }
  }) 
  {
    let container = document.createElement('div');
    // Make an iife for list creating
    container.innerHTML = (function treeCreating(obj = object) {
        // get object keys 
        let keys = Object.keys(obj);
        // check keys, corner case for recursion
        if (!keys.length) return '';

        // create new ul and li
        let ul = ``;
        let li = ``;
        // go through all keys
        for (let key of keys) {
            // for each create new li string
            // concat it with previous string
            // call func to create inner list for key
            li += `<li>${key}${treeCreating(obj[key])}</li>`
            // with no keys in object li will be empty
        }    
        // if li-string not empty, add it to ul
        if (li) {
            ul = `<ul>${li}</ul>`;
        }
        // return ul or '' if ul will not be initialised
        return ul;
    })();

    document.body.prepend(container);
}



addFunctionName(`createCalendar(year, month)`,
   `creates a calendar of 'month' of a 'year' ontop of <body>.
   Current month is given by default`);
  
function createCalendar(
    year = new Date().getFullYear(),
    month = new Date().getMonth() + 1) {

    // create or find the container with id=calendar
    let container = document.getElementById('calendar') || document.createElement('div');
    container.id = 'calendar';
    container.innerHTML = '';
    
    // create a table
    let table = document.createElement('table');
    // set table styles
    table.style.border = '1px solid black';
    table.style.borderCollapse = 'collapse';
    table.style.background = 'lightgrey';
    table.style.width = '50%';
    table.style.margin = '0 auto';

    // create thead row with days
    const thead = table.insertRow();
    // creates day names array
    const dayNames = [
        'Пн','Вт','Ср','Чт','Пт','Сб','Вс'
    ];
    // create th elements
    for (let day = 0; day < 7; day++) {
        const th = document.createElement('th');
        th.textContent = dayNames[day];
        // set borders and background white for th
        th.style.border = '1px solid black';
        th.style.background = 'white';
        // add th to tr
        thead.append(th);
    }    

    // get Date object of required year and month
    let date = new Date(year, month - 1);

    // add table head with the month name
    let months = [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
    ]
    let monthName = table.createCaption();
    monthName.textContent = months[date.getMonth()];
    monthName.style.textAlign = 'center';
    monthName.style.fontWeight = 'bold';

    // get amount of days in the month
    // the difference between next month and current
    let nextMonth = new Date(year, month);
    let amountOfDays = Math.round(nextMonth - date) / (1000*3600*24);
    // get the first weekday of the month
    // -1 as we have Monday to be the 1st day
    let firstDay = date.getDay() - 1;
    
    // create loop for weeks
    // with no current++ 
    // but only while current < amount of days
    // currentDate will be incremented in the inner loop
    for (let currentDate = 0; currentDate < amountOfDays;) {
        // create new <tr>
        let tr = table.insertRow();
        // create inner loop for days:
        // currentDay < 7; currentDate++, currentDay++
        for (let currentWeekDay = 0; currentWeekDay < 7; currentDate++, currentWeekDay++) {
            // create td
            let td = tr.insertCell();
            // set styles for td
            td.style.border = '1px solid black';

            // if it's 1st week:
            // empty td's till firstDay is not match currentWeekDay
            // don't start the count of currentDate
            if (currentWeekDay < firstDay && currentDate < 1) {
                currentDate--;
                continue;
            }  

            // last week: 
            // empty td if currentDate > amountOfDays
            if (currentDate > amountOfDays - 1) {
                continue;
            }

            // add date to td, 
            // where currentDate+1 is similar to the date of the day           
            td.textContent = currentDate + 1;
        }
    }
    
    // put table into container
    container.append(table);
    // add container to the document
    document.body.prepend(container);
}



addFunctionName(`clockRunner`,
   `start clock with current time. We can stop timer and run it again.`);

// add event listener to START button
const start = document.querySelector('.clock_btn__start');
start.addEventListener('click', clockRunner);

function clockRunner() {
    // get all elements of clock
    // STOP button 
    const stop = document.querySelector('.clock_btn__stop');
    // timer elements
    const timerHours = document.querySelector('.clock_timer__hours');
    const timerMinutes = document.querySelector('.clock_timer__minutes');
    const timerSeconds = document.querySelector('.clock_timer__seconds');
    
    // declare scoped functions before setInterval
    // shows current time
    function showTime() {
        // get current time
        // add zero for double-digit time format 
        let date = new Date();
        let hoursNow = addZero(date.getHours());
        let minutesNow = addZero(date.getMinutes());
        let secondsNow = addZero(date.getSeconds());                  

        // insert hh:mm:ss to DOM elements
        timerHours.textContent = hoursNow;
        timerMinutes.textContent = minutesNow;
        timerSeconds.textContent = secondsNow;
    }
    // adds zero before single digits
    function addZero() {
        let result = [];
        for (let d of arguments) {
            if (d<10) d = '0' + d;
            result.push(d);
        }
        return [...result];
    }    
    
    // onClick START btn showTime and then set interval    
    showTime();
    let timerID = setInterval(showTime, 1000);

    // when STOP btn: clearInterval
    stop.addEventListener('click', () => {
        clearInterval(timerID);
    });
}



addFunctionName(`class Range`,
   `class with generator inside, itarable object to create. Set range in 'new Range (from, to)' instance and use .showAll method for demo in console.`);

class Range {
    constructor(from, to) {
        this.from = from;
        this.to = to;
    }

    *[Symbol.iterator]() {
        for (let i = this.from; i <= this.to; i++) {
            yield i;
        }
    }

    showAll() {
        for (let i of this) {
            console.log(i)
        }
    }
}

addFunctionName(`class AsyncRange`,
   `extended from Range, adds async method .showAsync()`);

class AsyncRange extends Range {

    *[Symbol.asyncIterator]() {
        for (let i = this.from; i <= this.to; i++) {
            yield i;
        }
    }

    async showAsync() {
        for await (let i of this) {
            console.log(i)
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }
}



// football handler
document.addEventListener('DOMContentLoaded', () => {
    // get elements
    const field = document.getElementById('field')
    const ball = document.getElementById('ball');
    // ball initial position - field center
    ball.style.top = (field.clientHeight / 2 - ball.offsetHeight / 2) + 'px';
    ball.style.left = (field.clientWidth / 2 - ball.offsetWidth / 2) + 'px';
    ball.style.visibility = 'visible';

    // put listeners
    field.addEventListener('click', (event)=>{
        moveBall(event);
    });

    // puts the ball's center into click coords
    function moveBall(event) {
        // get field coords based on window
        const fieldOuterCoords = field.getBoundingClientRect();
        const fieldInnerCoords = {
            left: fieldOuterCoords.left + field.clientLeft,
            top: fieldOuterCoords.top + field.clientTop,
        };

        // get click coords (also on window)
        const clickCoords = [event.clientX, event.clientY];

        // calculate ball's coords
        // consider field's coords and ball size
        let ballCoords = [
            clickCoords[0] - fieldInnerCoords.left - ball.offsetWidth / 2,
            clickCoords[1] - fieldInnerCoords.top - ball.offsetHeight / 2,
        ];

        // check if the ball crosses boundaries
        // consider that inner coords are greater then outer!
        // left border
        if (ballCoords[0] < 0) {
            ballCoords[0] = 0;
        }
        // right border
        if (ballCoords[0] > field.clientWidth - ball.offsetWidth) {
            ballCoords[0] = field.clientWidth - ball.offsetWidth;
        }
        // top border
        if (ballCoords[1] < 0) {
            ballCoords[1] = 0;
        }
        // bottom border
        if (ballCoords[1] > field.clientHeight - ball.offsetHeight) {
            ballCoords[1] = field.clientHeight - ball.offsetHeight;
        }
        
        // put the ball consider the ball's size
        ball.style.left = ballCoords[0] + 'px';
        ball.style.top = ballCoords[1] + 'px'
        
    }
})



// dropdown menu handler
document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.dropdown_header');
    const menu = document.querySelector('.dropdown');
    button.addEventListener('click', ()=>{
        menu.classList.toggle('dropdown__opened');
    })
    window.addEventListener('click', (e)=> {
        if (!button.contains(e.target)) {
            menu.classList.remove('dropdown__opened');
        }
    })
})



// carousel handler
document.addEventListener('DOMContentLoaded', () => {
    const prev = document.querySelector('.carousel_arrow__prev');
    const next = document.querySelector('.carousel_arrow__next');
    const galleryItems = document.querySelectorAll('.carousel_img');
    const galleryLength = galleryItems.length;
    const gallery = document.querySelector('.gallery ul');

    let position = 1; // 1st visible element now
    let transitionCoords = 0; // coordinates now
    let steps = 3 // how many gallery items to move

    prev.addEventListener('click', moveBack);
    next.addEventListener('click', moveForward);

    // move gallery forward
    // here we have to reduce translate property
    function moveForward() {
        const width = parseFloat(window.getComputedStyle(galleryItems[6]).width);
        
        for (let i = 0; i < steps; i++) {
            if (position == galleryLength - 2) {
                break;
            }         
            let move = transitionCoords - width;
            gallery.style.transform = `translateX(${move}px)`;
            position++;
            transitionCoords = move;
        }
    }

    // move gallery backward
    // and here increase translate property
    function moveBack() {
        const width = parseFloat(window.getComputedStyle(galleryItems[0]).width);
        
        for (let i = 0; i < steps; i++) {
            if (position == 1) {
                break;
            }
            let move = transitionCoords + width;                        
            gallery.style.transform = `translateX(${move}px)`;
            position --;
            transitionCoords = move;
        }
    }
})



// tooltips
addFunctionName(`tooltips`,
   `add data-tooltip="..." attribute to any element and it will be on page (look at Menu elem class="dropdown_title, or hover over 'tooltip' name).<br>Better to use on inline elements.<br>Class .tooltip in CSS styles.`);

document.addEventListener('mouseover', (event)=>{
    if (event.target.dataset.tooltip) {
      // get data from target
      const target = event.target;
      const text = target.dataset.tooltip;

      // create element
      let tooltip = document.createElement('div');
      tooltip.classList.add('tooltip');
      tooltip.innerHTML = text;
      target.prepend(tooltip);

      // set coordinates
      const btnCoords = target.getBoundingClientRect();
      
      let top = btnCoords.y - tooltip.offsetHeight - 5;
      // tooltip is on the middle of target
      let left = btnCoords.x + (target.offsetWidth - tooltip.offsetWidth) / 2;

      // if we're out of screen
      if (top < 0) {
        top = btnCoords.y + target.offsetHeight + 5;
      }
      if (left < 0) {
        left = 0;
      }

      tooltip.style.top = top + 'px';
      tooltip.style.left = left + 'px';


      document.addEventListener('mouseout', (event)=>{
        if (event.target.dataset.tooltip) {
          tooltip.remove();
        }
      })

    }
  })

// tooltip example
const tooltipExample = document.querySelector('#tooltips');
tooltipExample.firstElementChild.dataset.tooltip = 'Here is a tooltip';



// sorting tables function
addFunctionName(`tableSort()`,
   `takes a table from page (or creates a new small one) and adds sorting functionality to it by clicking on tHead elements`);

function tableSort() {
    let table = document.querySelector('table');
    if (table) {
      table.tHead.onclick = function(e) {
        let target = e.target;
        let rowIndex = target.cellIndex;
        let rows = Array.from(table.tBodies[0].rows);
        
        rows.sort(function(a, b) {
          let aCell = a.cells[rowIndex].textContent;
          aCell = +aCell || aCell;
          let bCell = b.cells[rowIndex].textContent;
          bCell = +bCell || bCell;
          if (aCell > bCell) return 1
          else return -1;
        });
        table.tBodies[0].append(...rows)
      }
    } else {
        console.log('No table found on page');
        let newTable = document.createElement('table');
        newTable.innerHTML = `
            <thead>
                <tr>
                    <th>Возраст</th>
                    <th>Имя</th>
                    <th>Пол</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>5</td>
                    <td>Вася</td>
                    <td>М</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Петя</td>
                    <td>М</td>
                </tr>
                <tr>
                    <td>12</td>
                    <td>Женя</td>
                    <td>Ж</td>
                </tr>
                <tr>
                    <td>9</td>
                    <td>Маша</td>
                    <td>Ж</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>Илья</td>
                    <td>М</td>
                </tr>
            </tbody>`;

        document.querySelector('#tableSort').append(newTable);
        tableSort();
    }
}