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
        a: "for (var i=0; i<array.length; i++)",
        b: "for (var i=0, i<array.length, i++)",
        c: "for (var i=0; i=array.length; i++)",
        d: "for (var i=0; i<array.length; i+1)",
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
    quizTimer = setInterval(function() {
        if (pause) {
            return;
        }
        // if (timeRemaining <= 0) {
        //     clearInterval(quizTimer);
        //     changePageToQuizCompleted();
        if (timeRemaining > 0) {
            timeLeftString = 'Time: ' + (timeRemaining-1);
            timeLeft.textContent = timeLeftString;
            if (timeRemaining <= 10) {
                timeLeft.style.color = 'red';
            }
        }
        timeRemaining--;
        if (timeRemaining <= 0) {
            clearInterval(quizTimer);
            changePageToQuizCompleted();
        }
        console.log(timeRemaining);
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

function hideHeader() {
    headerElem.style.visibility = "hidden";
}

function revealHeader() {
    headerElem.style.visibility = "visible";
}

function validateForm() {
    var initialsForm = document.forms["submitInitials"]["initials"].value;
    var initialsRegex = /^[A-Z]{2}$/;
    var match = initialsForm.match(initialsRegex);
    if (!match) {
      alert("Please enter valid initials, e.g. 'AB'");
      return false;
    }
    return true;
}
// source for validating form input: https://www.w3schools.com/js/js_validation.asp

// function appendHighScore() {

// }

// function findPlaceInArray(arr, num) {
//     if (arr.length === 0) {
//         arr.push()
//     }
// }

var highScoresArr = new Array(0);
var top10Scores = document.getElementById('top-10-scores');

function addToHighScores(arr, num) {
    arr.push(num);
    arr.sort(function compareNums(a, b) {
        return b-a;
    });
    console.log(arr);
}
// source for sorting an array numerically: https://stackoverflow.com/questions/1063007/how-to-sort-an-array-of-integers-correctly

// function appendHighScore(init, array) {
//     var highScoreElem;
//     var highScoreString;
//     if (array.length <= 10) {
//         for (var i=0; i<array.length-1; i++) {
//             top10Scores.lastChild.remove();
//         }
//         for (var i=0; i<array.length; i++) {
//             highScoreElem = document.createElement('p');
//             highScoreString = (i+1) + '. ' + init + ': ' + array[i];
//             highScoreElem.innerText = highScoreString;
//             top10Scores.append(highScoreElem);
//         }
//     } else {
//         for (var i=0; i<10; i++) {
//             top10Scores.lastChild.remove();
//         }
//         for (var i=0; i<10; i++) {
//             highScoreElem = document.createElement('p');
//             highScoreString = (i+1) + '. ' + init + ': ' + array[i];
//             highScoreElem.innerText = highScoreString;
//             top10Scores.append(highScoreElem);
//         }
//     }
// }

// for(var i=0, len=localStorage.length; i<len; i++) {
//     var key = localStorage.key(i);
//     var value = localStorage[key];
//     if(value.equals(desired_value))
//     console.log(key + " => " + value);
// }

var score1 = document.getElementById('score1');
var score2 = document.getElementById('score2');
var score3 = document.getElementById('score3');
var score4 = document.getElementById('score4');
var score5 = document.getElementById('score5');
var score6 = document.getElementById('score6');
var score7 = document.getElementById('score7');
var score8 = document.getElementById('score8');
var score9 = document.getElementById('score9');
var score10 = document.getElementById('score10');
// these elements are where the top 10 high scores are going to be written

var scoreContainers = [score1, score2, score3, score4, score5, score6, score7, score8, score9, score10];
// high score elements in an array that will be used in loadHighScores()

function loadHighScores(arr) {
    var usedLength;
    if (arr.length <= 10) {
        usedLength = arr.length; // use all high scores
    } else {
        usedLength = 10; // use the top 10 scores
    }
    var usedKeys = new Array(0); // this array is used to keep track of the keys that have already been associated with values
    for (var i=0; i<usedLength; i++) {
        var desiredValue = arr[i]; // the i-th high score, whose associated initials we are trying to find
        for (var j=0; j<localStorage.length; j++) {
            var key = localStorage.key(j); // the j-th key
            var value = localStorage[key]; // the value associated with the jth key
            if ((value === desiredValue) && !usedKeys.includes(key)) { // we find the value that is equal to the high score and its key is not one that we have considered already
                var scoreString = i + '. ' + key.substring(0, 2) + ': ' + value; // example: '1. AB: 55'
                var scoreContainer = scoreContainers[i];
                // the html element top10Scores has 10 empty containers, this variable gets the i-th one
                scoreContainer.textContent = scoreString;
                // set the text content of the score container to scoreString
                usedKeys.push(key);
                // record that we have already used this key
            }
            // source for how to find a key that corresponds to a value in localStorage: https://stackoverflow.com/questions/12949723/html5-localstorage-getting-key-from-value
            // source for the includes() method: https://www.w3schools.com/jsref/jsref_includes_array.asp
            // source for the substring() method: https://www.w3schools.com/jsref/jsref_substring.asp
        }
    }
}

highScoresBtn.addEventListener("click", function() {
    if (validateForm()) {
        var initials = document.getElementById('initials').value; // get initials from the form data submitted by the user
        var currentDateAndTime = new Date();
        // record date and time when initials were submitted. this is to make sure that entries can still be unique even if two high scores have the same number and initials.
        var currentDateAndTimeString = currentDateAndTime.toString();
        // convert the date and time into a string so it can be used in the localStorage key
        var localStorageKeyString = initials + ' - ' + currentDateAndTimeString;
        // example: AB - Wed Sep 27 2023 17:14:28 GMT-0700 (Pacific Daylight Time)
        localStorage.setItem(localStorageKeyString, timeRemaining); // timeRemaining at the end of the quiz is the number used as the score, which is stored as the localStorage value
        changePageToHighScores(); // change the page to highScoresContainer
        hideHeader(); // conceal the header since it has a button whose text is 'View high scores'
        addToHighScores(highScoresArr, timeRemaining);
        // add the newest score to the array of high scores
        loadHighScores(highScoresArr); // use the array of high scores to fill in the score containers
    }
});

/* <form name="myForm" action="/action_page.php" onsubmit="return validateForm()" method="post">
Name: <input type="text" name="fname">
<input type="submit" value="Submit">
</form> */

// const paragraph = 'the quick brown fox jumps over the lazy dog. it barked.';
// const regex = /[A-Z]/g;
// const found = paragraph.match(regex);

// console.log(found);
// // Expected output: Array ["T", "I"]

// source for validating form input: https://www.w3schools.com/js/js_validation.asp

var submitInitialsForm = document.getElementById('submit-initials');

submitInitialsForm.addEventListener("submit", function(event) {
    event.preventDefault(); // prevents the form from automatically submitting
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
    timeLeft.style.color = "black";
}

homeOrQuizPageBtn.addEventListener("click", function() {
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

function changePageToQuizCompleted() {
    for (i=0; i<questions.length-1; i++) {
        quizContainer.lastChild.remove();
    }
    // source for how to remove all children from a parent node: https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
    // (didn't use this exactly but it helped me write my code)
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

function appendStatus(page, value, questionCount) {
    var statusElem = document.createElement('p');
    var statusString;
    if (value) {
        statusString = questionCount + '.' + ' Correct';
        statusElem.innerText = statusString;
        statusElem.style.color = 'green';
    } else {
        statusString = questionCount + '.' + ' Incorrect. You have lost 5 seconds.';
        statusElem.innerText = statusString;
        statusElem.style.color = 'red';
    }
    if (questionCount < questions.length) {
        statusElem.style.margin = '10px 20px';
    }
    page.appendChild(statusElem);
    if (questionCount === questions.length) {
        var removeStatusElem = setTimeout(function () {
            page.removeChild(statusElem);
        }, 3000);
    }
}
// source for how to set style properties in JavaScript: https://www.w3schools.com/jsref/prop_html_style.asp
// source for removeChild(): https://www.w3schools.com/jsref/met_node_removechild.asp

function displayNextQuestion(clickedBtn) {
    if (questionCounter < questions.length) {
        currentQuestion.textContent = questions[questionCounter].question;
        contentA.textContent = questions[questionCounter].a;
        contentB.textContent = questions[questionCounter].b;
        contentC.textContent = questions[questionCounter].c;
        contentD.textContent = questions[questionCounter].d;
        if (clickedBtn !== questions[questionCounter-1].correct) {
            timeRemaining -= 5;
            // console.log(timeRemaining);
            appendStatus(quizContainer, false, questionCounter);
        } else {
            // console.log(timeRemaining);
            appendStatus(quizContainer, true, questionCounter);
        }
        // questionCounter++;
        // console.log(questionCounter);
    }
    if (questionCounter === questions.length) {
        if (clickedBtn !== questions[questionCounter-1].correct) {
            // console.log(timeRemaining);
            timeRemaining -= 5;
            appendStatus(quizCompletedContainer, false, questionCounter);
        } else {
            // console.log(timeRemaining);
            appendStatus(quizCompletedContainer, true, questionCounter);
        }
        // questionCounter++;
        // console.log(questionCounter);
    }
    questionCounter++;
    if (questionCounter > questions.length) {
        clearInterval(quizTimer);
        changePageToQuizCompleted();
    }
    console.log(questionCounter);
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
