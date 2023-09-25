var questions = [
    {
        question: "[1/10] What is the result of 'C R A B'.split(' ')?",
        a: "crab",
        b: "CRAB",
        c: "['C', 'R', 'A', 'B']",
        d: "['c', 'r', 'a', 'b']",
        correct: "c"
    },
    {
        question: "[2/10] Which line of code adds the attribute 'display: none' to a div?",
        a: "document.querySelector('div').addAttribute('display', 'none')",
        b: "document.querySelector('div').setAttribute('display: none')",
        c: "document.querySelector('div').addAttribute('display: none')",
        d: "document.querySelector('div').setAttribute('display', 'none')",
        correct: "d"
    },
    {
        question: "[3/10] Which of the following methods joins all elements of an array into a string?",
        a: "Array.prototype.concat()",
        b: "Array.prototype.join()",
        c: "Array.prototype.map()",
        d: "Array.prototype.splice()",
        correct: "b"
    },
    {
        question: "[4/10] Which of the following choices demonstrates the correct way to write a for loop?",
        a: "for (i=0; i<array.length; i++)",
        b: "for (i=0, i<array.length, i++)",
        c: "for (i=0; i=array.length; i++)",
        d: "for (i=0; i<array.length; i+1)",
        correct: "a"
    },
    {
        question: "[5/10] Which of the following is NOT a valid String method?",
        a: "String.length",
        b: "String.replace()",
        c: "String.reverse()",
        d: "String.toUpperCase()",
        correct: "c"
    },
    {
        question: "[6/10] Write the following phrase as an if condition: 'if color is not red...'",
        a: "if (color NOT== 'red')",
        b: "if (color ! 'red')",
        c: "if (color == !('red'))",
        d: "if (color !== 'red')",
        correct: "d"
    },
    {
        question: "[7/10] Which line of code adds an event listener that triggers when an element is clicked?",
        a: "elem.addEventListener('clicked', function)",
        b: "elem.addEventListener('click', function)",
        c: "elem.addEventTrigger('clicked', function)",
        d: "elem.addEventTrigger('click', function)",
        correct: "b"
    },
    {
        question: "[8/10] Which line of code selects a div with an id of 'password'?",
        a: "document.querySelector('#password')",
        b: "document.querySelector('password')",
        c: "document.querySelector('.password')",
        d: "document.querySelector(':password')",
        correct: "a"
    },
    {
        question: "[9/10] Which of the following choices demonstrates the correct syntax for writing a function?",
        a: "function(params) ( )",
        b: "function(params) [ ]",
        c: "function(params) { }",
        d: "function[params] ( )",
        correct: "c"
    },
    {
        question: "[10/10] In an object with multiple keys, the keys need to be separated by...",
        a: "semicolons (;)",
        b: "dashes (-)",
        c: "periods (.)",
        d: "commas (,)",
        correct: "d"
    }
];

var headerElem = document.querySelector('.header');
var headerHighScoresLink = document.getElementById('high-scores-shorter');
var startQuizBtn = document.getElementById('start-quiz-btn');
var homePageBtn = document.getElementById('home-page-btn');
var highScoresBtn = document.getElementById('high-scores-btn');
var homeContainer = document.getElementById('home-container');
var quizContainer = document.getElementById('quiz-container');
var quizCompletedContainer = document.getElementById('quiz-completed-container');
var highScoresContainer = document.getElementById('high-scores-container');

function changePageToQuiz() {
    homeContainer.style.display = "none";
    quizContainer.style.display = "block"
    quizCompletedContainer.style.display = "none";
    highScoresContainer.style.display = "none";
}

startQuizBtn.addEventListener("click", changePageToQuiz);
// source for how to use addEventListener(): https://www.w3schools.com/jsref/met_element_addeventlistener.asp

function changePageToHighScores() {
    homeContainer.style.display = "none";
    quizContainer.style.display = "none"
    quizCompletedContainer.style.display = "none";
    highScoresContainer.style.display = "block";
}

function hideHeader () {
    headerElem.style.visibility = "hidden";
}

function revealHeader() {
    headerElem.style.visibility = "visible";
}

highScoresBtn.addEventListener("click", function () {
    changePageToHighScores();
    hideHeader()
});
headerHighScoresLink.addEventListener("click", function() {
    changePageToHighScores();
    hideHeader()
});

function changePageToHome() {
    homeContainer.style.display = "block";
    quizContainer.style.display = "none"
    quizCompletedContainer.style.display = "none";
    highScoresContainer.style.display = "none";
}

homePageBtn.addEventListener("click", function () {
    changePageToHome();
    revealHeader();
});

// for (let item in questions) {
//     console.log(questions[item]);
// }

var currentQuestion = document.getElementById('current-question');
var contentA = document.getElementById('content-a');
var contentB = document.getElementById('content-b');
var contentC = document.getElementById('content-c');
var contentD = document.getElementById('content-d');

currentQuestion.textContent = questions[0].question;
contentA.textContent = questions[0].a;
contentB.textContent = questions[0].b;
contentC.textContent = questions[0].c;
contentD.textContent = questions[0].d;

var questionCounter = 1;
var timeLeft = document.getElementById('time-left');
var timeLost = document.getElementById('time-lost');
var timeRemaining = 75;

function displayNextQuestion(clickedBtn) {
    currentQuestion.textContent = questions[questionCounter].question;
    contentA.textContent = questions[questionCounter].a;
    contentB.textContent = questions[questionCounter].b;
    contentC.textContent = questions[questionCounter].c;
    contentD.textContent = questions[questionCounter].d;
    if (clickedBtn !== questions[questionCounter-1].correct) {
        timeRemaining -= 5;
        timeLost.style.visibility = "visible";
        var hideLossTimer = setTimeout(function () {
            timeLost.style.visibility = "hidden";
        }, 2000);
    }
    if (questionCounter < questions.length-1) {
        questionCounter++;
    }
}

// displayTimer = setTimeout(function () {
//     saveText.hide(400); // hide saveText at the default speed (takes 400 ms)
// }, 4000);

var choice_a = document.getElementById('choice-a');
var choice_b = document.getElementById('choice-b');
var choice_c = document.getElementById('choice-c');
var choice_d = document.getElementById('choice-d');

choice_a.addEventListener("click", function() {
    displayNextQuestion("a");
});
choice_b.addEventListener("click", function() {
    displayNextQuestion("b");
});
choice_c.addEventListener("click", function() {
    displayNextQuestion("c");
});
choice_d.addEventListener("click", function() {
    displayNextQuestion("d");
});

function changePageToQuizCompleted () {
    homeContainer.style.display = "none";
    quizContainer.style.display = "none"
    quizCompletedContainer.style.display = "block";
    highScoresContainer.style.display = "none";
}

function quizInProgress() {
    var quizTimer = setInterval(function () {
        if (timeRemaining < 0) {
            clearInterval(quizTimer);
            changePageToQuizCompleted();
        } else {
            timeLeft.innerHTML = `Time: ${timeRemaining}`
        }
        timeRemaining--;
    }, 1000);
}
// source for how to use setInterval() to create a countdown: https://stackoverflow.com/questions/31106189/create-a-simple-10-second-countdown

startQuizBtn.addEventListener("click", quizInProgress);

// function addUniqueId(objData) {
//     let index = 1; // ids start from 1
//     for (let item in objData) {
//         objData[item].id = index;
//         index++;
//         // for every item in the array of objects, set its id parameter to index then increment index by 1
//     }
//     return objData;
// }

// var timeleft = 10;
// var downloadTimer = setInterval(function(){
//   if(timeleft <= 0){
//     clearInterval(downloadTimer);
//     document.getElementById("countdown").innerHTML = "Finished";
//   } else {
//     document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
//   }
//   timeleft -= 1;
// }, 1000);

// var timeleft = 10;
// var downloadTimer = setInterval(function(){
//   if(timeleft <= 0){
//     clearInterval(downloadTimer);
//   }
//   document.getElementById("progressBar").value = 10 - timeleft;
//   timeleft -= 1;
// }, 1000);
