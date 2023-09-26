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
var headerHighScoresShorter = document.getElementById('high-scores-shorter');
var headerHighScoresLonger = document.getElementById('high-scores-longer');
var startQuizBtn = document.getElementById('start-quiz-btn');
var homeOrQuizPageBtn = document.getElementById('home-or-quiz-page-btn');
var highScoresBtn = document.getElementById('high-scores-btn');
var homeContainer = document.getElementById('home-container');
var quizContainer = document.getElementById('quiz-container');
var quizCompletedContainer = document.getElementById('quiz-completed-container');
var highScoresContainer = document.getElementById('high-scores-container');

function displayInitialQuestions() {
    currentQuestion.textContent = questions[0].question;
    contentA.textContent = questions[0].a;
    contentB.textContent = questions[0].b;
    contentC.textContent = questions[0].c;
    contentD.textContent = questions[0].d;
}

var quizTimer;
var questionCounter = 1;
var timeRemaining = 75;
var timeLeft = document.getElementById('time-left');
var pause = false;

function quizInProgress() {
    console.log('quizInProgress was called');
    quizTimer = setInterval(function () {
        if (pause) {
            return;
        }
        if (timeRemaining <= 0) {
            clearInterval(quizTimer);
            changePageToQuizCompleted();
        } else if (timeRemaining > 0) {
            timeLeft.innerHTML = `Time: ${timeRemaining-1}`
        }
        timeRemaining--;
    }, 1000);
}

// source for how to use setInterval() to create a countdown: https://stackoverflow.com/questions/31106189/create-a-simple-10-second-countdown

function changePageToQuiz() {
    console.log('changePageToQuiz was called');
    pause = false;
    homeContainer.style.display = "none";
    quizContainer.style.display = "block"
    quizCompletedContainer.style.display = "none";
    highScoresContainer.style.display = "none";
    headerHighScoresShorter.style.display = "none";
    headerHighScoresLonger.style.display = "inline-block";
    if (questionCounter === 1 || questionCounter === questions.length) {
        timeRemaining = 75;
        displayInitialQuestions();
        if (questionCounter === questions.length) {
            questionCounter = 1;
        }
        quizInProgress();
    }
}

startQuizBtn.addEventListener("click", changePageToQuiz);
// source for how to use addEventListener(): https://www.w3schools.com/jsref/met_element_addeventlistener.asp

function changePageToHighScores() {
    if (quizContainer.style.display === "block") {
        homeOrQuizPageBtn.textContent = "Back to Quiz";
        homeOrQuizPageBtn.setAttribute("href", "#quiz-container");
        pause = true;
    } else {
        homeOrQuizPageBtn.textContent = "Back to Home Page";
        homeOrQuizPageBtn.setAttribute("href", "#home-container");
    }
    homeContainer.style.display = "none";
    quizContainer.style.display = "none";
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
headerHighScoresShorter.addEventListener("click", function() {
    changePageToHighScores();
    hideHeader()
});

headerHighScoresLonger.addEventListener("click", function() {
    changePageToHighScores();
    hideHeader()
});

function changePageToHome() {
    homeContainer.style.display = "block";
    quizContainer.style.display = "none"
    quizCompletedContainer.style.display = "none";
    highScoresContainer.style.display = "none";
    headerHighScoresShorter.style.display = "inline-block";
    headerHighScoresLonger.style.display = "none";
    timeRemaining = 75;
    timeLeft.textContent = `Time: ${timeRemaining}`;
}

homeOrQuizPageBtn.addEventListener("click", function () {
    if (!pause) {
        changePageToHome();
    } else {
        changePageToQuiz();
    }
    revealHeader()
});

var currentQuestion = document.getElementById('current-question');
var contentA = document.getElementById('content-a');
var contentB = document.getElementById('content-b');
var contentC = document.getElementById('content-c');
var contentD = document.getElementById('content-d');

var quizCompleted = document.getElementById('quiz-completed');
var finalScore = document.getElementById('final-score');

function changePageToQuizCompleted () {
    homeContainer.style.display = "none";
    quizContainer.style.display = "none"
    quizCompletedContainer.style.display = "block";
    highScoresContainer.style.display = "none";
    headerHighScoresShorter.style.display = "inline-block";
    headerHighScoresLonger.style.display = "none";
    if (questionCounter < questions.length) {
        quizCompleted.textContent = "Quiz partially completed.";
    }
    if (timeRemaining < 0) {
        timeRemaining = 0;
    }
    timeLeft.textContent = `Time: ${timeRemaining}`;
    finalScore.textContent = `Your final score is ${timeRemaining}.`;
}

// getElementById(initials).value
// module 4, 5

// var showIncorrect;
// var hideIncorrect;
// var showTimeLost;
// var hideTimeLost;
// var showCorrect;
// var hideCorrect;
// var showIncorrectAfterQuiz;
// var hideIncorrectAfterQuiz;
// var showCorrectAfterQuiz;
// var hideCorrectAfterQuiz;

// var incorrect = document.getElementById('incorrect');
// var timeLost = document.getElementById('time-lost');
// var correct = document.getElementById('correct');
// var incorrectAfterQuiz = document.getElementById('incorrect-after-quiz');
// var correctAfterQuiz = document.getElementById('correct-after-quiz');

// var saveText = $('#saveNotification');

//       if (saveText.css("display") !== "none") {
//         saveText.hide(200); // if the save button has already been clicked and it is clicked again before the save notification has left the screen, hide the save notification for 200 ms (0.2 sec) before showing it again
//       }
//       saveText.show(400); // the animation of showing saveText takes 400 ms (the default value)
//       clearTimeout(displayTimer); // reset the timer every time the save button is clicked
//       displayTimer = setTimeout(function () {
//         saveText.hide(400); // hide saveText at the default speed (takes 400 ms)
//       }, 4000); // the hide animation takes place after 4000 ms (4 sec) have passed

// var showIncorrect;
// var hideIncorrect;
// var showTimeLost;
// var hideTimeLost;
// var showCorrect;
// var hideCorrect;
// var showIncorrectAfterQuiz;
// var hideIncorrectAfterQuiz;
// var showCorrectAfterQuiz;
// var hideCorrectAfterQuiz;

var incorrect = document.getElementById('incorrect');
var timeLost = document.getElementById('time-lost');
var correct = document.getElementById('correct');
var incorrectAfterQuiz = document.getElementById('incorrect-after-quiz');
var correctAfterQuiz = document.getElementById('correct-after-quiz');

// var timer;
// $('#mybtn').on('click', function(e){   
//    var $mytext = $('#mytext');    
//    $mytext.show(500);
//    clearTimeout(timer);   
//    timer = setTimeout(function(){
//        $mytext.hide(500)
//     },10000);        
// });

// var showTimer;
// var hideTimer;

// var showTimer;
// var hideTimer;

function handlePopUp(elem) {
    var showTimer;
    var hideTimer;
    // clearTimeout(showTimer);
    // clearTimeout(hideTimer);
    
    
    // source for clearTimeout(): https://developer.mozilla.org/en-US/docs/Web/API/clearTimeout
    if (elem.style.display !== "none") {
        elem.style.display = "none";
        elem.style.animation = 'fading 2s infinite';
    } else {
        elem.style.display = "block";
    }
    // clearTimeout(hideTimer);
    clearTimeout(hideTimer);
    hideTimer = setTimeout(function () {
        elem.style.display = "none";
    }, 3000);
}

function displayNextQuestion(clickedBtn) {
    
    if (questionCounter === questions.length) {
        if (clickedBtn !== questions[questionCounter-1].correct) {
            timeRemaining -= 5;
            handlePopUp(incorrectAfterQuiz);
        } else {
            handlePopUp(correctAfterQuiz);
        }
        clearInterval(quizTimer);
        changePageToQuizCompleted();
    }
    if (questionCounter < questions.length) {
        currentQuestion.textContent = questions[questionCounter].question;
        contentA.textContent = questions[questionCounter].a;
        contentB.textContent = questions[questionCounter].b;
        contentC.textContent = questions[questionCounter].c;
        contentD.textContent = questions[questionCounter].d;
    }
    if (clickedBtn !== questions[questionCounter-1].correct) {
        timeRemaining -= 5;
        correct.style.display = "none";
        handlePopUp(incorrect);
        handlePopUp(timeLost);
    } else {
        incorrect.style.display = "none";
        handlePopUp(correct);
    }
    if (questionCounter < questions.length) {
        questionCounter++;
    }
}

var choiceA = document.getElementById('choice-a');
var choiceB = document.getElementById('choice-b');
var choiceC = document.getElementById('choice-c');
var choiceD = document.getElementById('choice-d');

choiceA.addEventListener("click", function() {
    displayNextQuestion("a");
});
choiceB.addEventListener("click", function() {
    displayNextQuestion("b");
});
choiceC.addEventListener("click", function() {
    displayNextQuestion("c");
});
choiceD.addEventListener("click", function() {
    displayNextQuestion("d");
});
