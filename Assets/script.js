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
var timeLeftString;

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
            timeLeftString = 'Time: ' + (timeRemaining-1);
            timeLeft.textContent = timeLeftString;
        }
        timeRemaining--;
    }, 1000);
}

// source for how to use setInterval() to create a countdown: https://stackoverflow.com/questions/31106189/create-a-simple-10-second-countdown

var quizStarted = false;

function changePageToQuiz() {
    console.log('changePageToQuiz was called');
    pause = false;
    console.log(pause);
    homeContainer.style.display = "none";
    quizContainer.style.display = "block"
    quizCompletedContainer.style.display = "none";
    highScoresContainer.style.display = "none";
    headerHighScoresShorter.style.display = "none";
    headerHighScoresLonger.style.display = "inline-block";
    if (!quizStarted) {
        timeRemaining = 75;
        displayInitialQuestions();
        questionCounter = 1;
        quizInProgress();
    }
}

startQuizBtn.addEventListener("click", function() {
    changePageToQuiz();
    quizStarted = true;
});
// source for how to use addEventListener(): https://www.w3schools.com/jsref/met_element_addeventlistener.asp

function changePageToHighScores() {
    if (quizContainer.style.display === "block") {
        homeOrQuizPageBtn.textContent = "Back to Quiz";
        homeOrQuizPageBtn.setAttribute("href", "#quiz-container");
        pause = true;
        console.log(pause);
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
    timeLeftString = 'Time: ' + timeRemaining;
    timeLeft.textContent = timeLeftString;
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
var finalScoreString;

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
    timeLeftString = 'Time: ' + timeRemaining;
    timeLeft.textContent = timeLeftString;
    finalScoreString = 'Your final score is ' + timeRemaining + '.';
    finalScore.textContent = finalScoreString;
    quizStarted = false;
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

// var incorrect = $('#incorrect');
// var timeLost = $('#time-lost');
// var correct = $('#correct');
// var incorrectAfterQuiz = $('#incorrect-after-quiz');
// var correctAfterQuiz = $('#correct-after-quiz');

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

// var showTimerCorrect;
// var hideTimerCorrect;
// var showTimerIncorrect;
// var hideTimerIncorrect;
// var showTimeLost;
// var hideTimeLost;
// var showTimerCorrectAfterQuiz;
// var hideTimerCorrectAfterQuiz;
// var showTimerIncorrectAfterQuiz;
// var hideTimerIncorrectAfterQuiz;

// var showTimer1, showTimer2, showTimer3, showTimer4, showTimer5, showTimer6, showTimer7, showTimer8, showTimer9, showTimer10;
// var showTimerArr = [showTimer1, showTimer2, showTimer3, showTimer4, showTimer5, showTimer6, showTimer7, showTimer8, showTimer9, showTimer10];
// var hideTimer1, hideTimer2, hideTimer3, hideTimer4, hideTimer5, hideTimer6, hideTimer7, hideTimer8, hideTimer9, hideTimer10;
// var hideTimerArr = [hideTimer1, hideTimer2, hideTimer3, hideTimer4, hideTimer5, hideTimer6, hideTimer7, hideTimer8, hideTimer9, hideTimer10];
// var showTimerAfterQuiz, hideTimerAfterQuiz;

function handlePopUp(elem, showName, hideName) {//, displayTimer) {
    // var displayTimer;
    // clearTimeout(displayTimer);
    // if (elem.css("display") !== "none") {
    //     elem.hide(200); 
    // }
    // elem.show(400);
    // clearTimeout(displayTimer);
    // displayTimer = setTimeout(function () {
    //     elem.hide(400);
    // }, 3000);

    
    // clearTimeout(showTimer);
    // clearTimeout(hideTimer);
    
    //source for clearTimeout(): https://developer.mozilla.org/en-US/docs/Web/API/clearTimeout
    // check first elem, then loop over the rest of the elems
    if (elem.style.display !== "none") {
        elem.style.display = "none";
        clearTimeout(showName);
        showName = setTimeout(function () {
            elem.style.display = "block";
        }, 400);
    } else {
        elem.style.display = "block";
    }
    // clearTimeout(hideTimer);
    clearTimeout(hideName);
    hideName = setTimeout(function () {
        elem.style.display = "none";
    }, 3000);
}



// function changeBackgroundColor(elem, value) {
//     if (value) {
//         elem.style.backgroundColor = "lightgreen";
//     } else {
//         elem.style.backgroundColor = "lightcoral";
//     }

//     clearTimeout();
//     setTimeout(function() {
//         elem.style.backgroundColor = "white";
//     }, 3000);
// }

// var showTimerCorrect;
// var hideTimerCorrect;
// var showTimerIncorrect;
// var hideTimerIncorrect;
// var showTimeLost;
// var hideTimeLost;
// var showTimerCorrectAfterQuiz;
// var hideTimerCorrectAfterQuiz;
// var showTimerIncorrectAfterQuiz;
// var hideTimerIncorrectAfterQuiz;

const liEl = document.createElement('li');
    liEl.classList.add('list-group-item');

    const spanEl = document.createElement('span');
    spanEl.classList.add('list-item-title');
    spanEl.innerText = text;
    spanEl.addEventListener('click', handleNoteView);

    liEl.append(spanEl);

    if (delBtn) {
      const delBtnEl = document.createElement('i');
      delBtnEl.classList.add(
        'fas',
        'fa-trash-alt',
        'float-right',
        'text-danger',
        'delete-note'
      );
      delBtnEl.setAttribute("title", "Delete Note"); // added this line because I want the text box "Delete Note" to appear when the mouse cursor hovers over the delete button
      delBtnEl.addEventListener('click', handleNoteDelete);
      }

function questionStatus(value, questionCount) {
    var statusElem = document.createElement('p');
    if (value) {
        statusElem.innerText = 'Correct';
        statusElem.setAttribute('color', 'green');
    } else {
        statusElem.innerText = 'Incorrect. You have lost 5 seconds.';
        statusElem.setAttribute('color', 'red');
    }
    if (questionCount < questions.length) {
        statusElem.setAttribute('margin', '20px');
    }
}

function displayNextQuestion(clickedBtn) {
    
    if (questionCounter === questions.length) {
        if (clickedBtn !== questions[questionCounter-1].correct) {
            timeRemaining -= 5;
            // var incorrectAfterQuizTimer;
            var showTimerIncorrectAfterQuiz;
            var hideTimerIncorrectAfterQuiz;
            handlePopUp(incorrectAfterQuiz, showTimerIncorrectAfterQuiz, hideTimerIncorrectAfterQuiz);
            //changeBackgroundColor(quizCompletedContainer, false);
        } else {
            // var correctAfterQuizTimer;
            var showTimerCorrectAfterQuiz;
            var hideTimerCorrectAfterQuiz;
            handlePopUp(correctAfterQuiz, showTimerCorrectAfterQuiz, hideTimerCorrectAfterQuiz);
            // changeBackgroundColor(quizCompletedContainer, true);
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
        // correct.css("display", "none");
        correct.style.display = "none";
        // var incorrectTimer;
        var showTimerIncorrect;
        var hideTimerIncorrect;
        handlePopUp(incorrect, showTimerIncorrect, hideTimerIncorrect);
        // var timeLostTimer;
        // changeBackgroundColor(quizContainer, false);
        var showTimeLost;
        var hideTimeLost;
        handlePopUp(timeLost, showTimeLost, hideTimeLost);
    } else {
        // incorrect.css("display", "none");
        incorrect.style.display = "none";
        // var correctTimer;
        // changeBackgroundColor(quizContainer, true);
        var showTimerCorrect;
        var hideTimerCorrect;
        handlePopUp(correct, showTimerCorrect, hideTimerCorrect);
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
