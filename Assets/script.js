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
        question: "[2/10] Which of the following localStorage methods is NOT written correctly?",
        a: "localStorage.getItem(key)",
        b: "localStorage.getItem(value)",
        c: "localStorage.setItem(key, value)",
        d: "localStorage.removeItem(key)",
        correct: "b"
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

var headerHighScoresShorter = document.getElementById('high-scores-shorter');
var headerHighScoresLonger = document.getElementById('high-scores-longer');
var startQuizBtn = document.getElementById('start-quiz-btn');
var homeOrQuizPageBtn = document.getElementById('home-or-quiz-page-btn');
var highScoresBtn = document.getElementById('high-scores-btn');
var homeContainer = document.getElementById('home-container');
var quizContainer = document.getElementById('quiz-container');
var quizCompletedContainer = document.getElementById('quiz-completed-container');
var highScoresContainer = document.getElementById('high-scores-container');

function displayInitialQuestion() {
    currentQuestion.textContent = questions[0].question;
    contentA.textContent = questions[0].a;
    contentB.textContent = questions[0].b;
    contentC.textContent = questions[0].c;
    contentD.textContent = questions[0].d;
}
// display the first question. this function will be used when the quiz starts.

var quizTimer;
var questionCounter = 1; // this value is incremented every time the user answers a question
var timeRemaining = 75; // the amount of time allotted for the quiz in seconds
var timeLeft = document.getElementById('time-left');
var pause = false; // changes to true when the quiz is paused
var timeLeftString;

function quizInProgress() {
    quizTimer = setInterval(function() {
        if (pause) {
            return;
        } // stop the quiz timer if pause is true
        if (timeRemaining > 0) {
            timeLeftString = 'Time: ' + (timeRemaining-1); 
            // round the displayed time down (for example, 72.5 sec should display as 72 instead of 73)
            timeLeft.textContent = timeLeftString;
            if (timeRemaining <= 10) {
                timeLeft.style.color = 'red';
            }
        }
        timeRemaining--;
        if (timeRemaining <= 0) { // prevent timeRemaining from reaching -1 if the user runs out of time
            clearInterval(quizTimer);
            changePageToQuizCompleted();
        }
    }, 1000); // decrease timeRemaining by 1 every 1000ms (1 sec)
}

// source for how to use setInterval() to create a countdown: https://stackoverflow.com/questions/31106189/create-a-simple-10-second-countdown

var quizStarted = false; // when the page first loads, the quiz has not been started yet

function changePageToQuiz() {
    pause = false;
    homeContainer.style.display = "none";
    quizContainer.style.display = "block";
    quizCompletedContainer.style.display = "none";
    highScoresContainer.style.display = "none";
    // hide all page components except quizContainer
    headerHighScoresShorter.style.display = "none";
    headerHighScoresLonger.style.display = "inline-block";
    // change header to 'View high scores (pauses quiz)'
    if (!quizStarted) {
        timeRemaining = 75;
        displayInitialQuestion();
        questionCounter = 1;
        quizInProgress();
    } // if the quiz is not in progress, reset timer and start from first question
}

startQuizBtn.addEventListener("click", function() {
    changePageToQuiz();
    quizStarted = true;
});

function changePageToHighScores() {
    if (quizContainer.style.display === "block") { // if the quiz is in progress
        homeOrQuizPageBtn.textContent = "Back to Quiz";
        homeOrQuizPageBtn.setAttribute("href", "#quiz-container");
        pause = true;
    } else { // if the quiz is not in progress
        homeOrQuizPageBtn.textContent = "Back to Home Page";
        homeOrQuizPageBtn.setAttribute("href", "#home-container");
    }
    homeContainer.style.display = "none";
    quizContainer.style.display = "none";
    quizCompletedContainer.style.display = "none";
    highScoresContainer.style.display = "block";
    // hide all page components except highScoresContainer
}

var noButton = document.getElementById('no-button');
noButton.addEventListener("click", changePageToHighScores);
// if the user decides not to submit their latest score, take them straight to the high scores page

function hideHeader(inProgress) {
    headerHighScoresShorter.style.visibility = "hidden";
    headerHighScoresLonger.style.visibility = "hidden";
    if (!inProgress) {
        timeLeft.style.visibility = "hidden";
    } // keep the time visible while the quiz is in progress
    // hide all header components but not the header itself, as that would also hide its background color
    // this function is used when viewing the high scores page because the header contains the text 'View high scores'
}

function revealHeader() {
    headerHighScoresShorter.style.visibility = "visible";
    headerHighScoresLonger.style.visibility = "visible";
    timeLeft.style.visibility = "visible";
    // reveal all header components
    // this function is used when leaving the high scores page
}

var saveQuestion = document.getElementById('save-question');
var options = document.getElementById('options');
var submitScore = document.getElementById('submit-score');

function revealSubmissionForm() {
    saveQuestion.style.display = "none";
    options.style.display = "none";
    submitScore.style.display = "block"; // reveal the submission form
}

var yesButton = document.getElementById('yes-button');
yesButton.addEventListener("click", revealSubmissionForm);
// if the user decides to submit their latest score, reveal the form where they can submit their initials

function hideSubmissionForm() {
    saveQuestion.style.display = "block";
    options.style.display = "block";
    submitScore.style.display = "none";
    // this function is called when the user returns to the home page. after they take the quiz again, they will be presented with the options 'Would you like to save this score? Yes/No'.
}

function validateForm() {
    var initialsForm = document.forms["submitInitials"]["initials"].value;
    var initialsRegex = /^[A-Z]{2}$/; // two capital letters
    var match = initialsForm.match(initialsRegex);
    if (!match) { // if the user enters anything except two capital letters
      alert("Please enter valid initials, e.g. 'AB'");
      return false;
    }
    return true;
}
// source for validating form input: https://www.w3schools.com/js/js_validation.asp
// source for how to use match() to check if a string matches a regex: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match

var score1 = document.getElementById('score-1');
var score2 = document.getElementById('score-2');
var score3 = document.getElementById('score-3');
var score4 = document.getElementById('score-4');
var score5 = document.getElementById('score-5');
var score6 = document.getElementById('score-6');
var score7 = document.getElementById('score-7');
var score8 = document.getElementById('score-8');
var score9 = document.getElementById('score-9');
var score10 = document.getElementById('score-10');
// the top 10 high scores will be written in these elements

var scoreContainers = [score1, score2, score3, score4, score5, score6, score7, score8, score9, score10];
// this array will be used in loadHighScores()

function checkKeyFormat(key) {
    var keyRegex = /^[A-Za-z]{2}\s-\s[A-Za-z]{3}\s[A-Za-z]{3}\s\d{2}\s\d{4}\s\d{2}:\d{2}:\d{2}\s[A-Za-z]{3}-\d{4}$/;
    // this regex was generated using this website: https://regex-generator.olafneumann.org/?sampleText=2020-03-12T13%3A34%3A56.123Z%20INFO%20%20%5Borg.example.Class%5D%3A%20This%20is%20a%20%23simple%20%23logline%20containing%20a%20%27value%27.&flags=i
    // it is meant to fit the format of strings such as 'AB - Thu Sep 28 2023 14:33:55 GMT-0700'
    var match = key.match(keyRegex);
    if (!match) { // if the localStorage key does not match keyRegex
        return false;
    } else { // if the localStorage key matches keyRegex
        return true;
    }
}

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
        var keyHasBeenFound = false;
        for (var j=0; j<localStorage.length; j++) {
            var key = localStorage.key(j); // the j-th key
            var value = localStorage[key]; // the value associated with the j-th key
            if ((value === desiredValue) && checkKeyFormat(key)) { // we find a value that is equal to the high score and its key matches the format specified by keyRegex
                if (!usedKeys.includes(key)) { // if we have not used this key already
                    var scoreString = (i+1) + '. ' + key.substring(0, 2) + ': ' + value; // example: '1. AB: 55'
                    var scoreContainer = scoreContainers[i];
                    // the html element #top-10-scores has 10 empty containers, this variable gets the i-th one
                    scoreContainer.textContent = scoreString;
                    // set the text content of the score container to scoreString
                    usedKeys.push(key); // make sure that a key does not get used twice for the same value
                    keyHasBeenFound = true;
                }
            }
            if (keyHasBeenFound) {
                break;
            } // only find one key for every desiredValue
            // source for how to find a key that corresponds to a value in localStorage: https://stackoverflow.com/questions/12949723/html5-localstorage-getting-key-from-value
            // source for the includes() method: https://www.w3schools.com/jsref/jsref_includes_array.asp
            // source for the substring() method: https://www.w3schools.com/jsref/jsref_substring.asp
        }
    }
}

function getAllHighScores() {
    var values = [];
    var keysToGet = Object.keys(localStorage);

    for (var i=0; i<keysToGet.length; i++) {
        if (!isNaN(parseInt(localStorage.getItem(keysToGet[i]))) && localStorage.getItem(keysToGet[i]).length >= 1 && localStorage.getItem(keysToGet[i]).length <= 2 && checkKeyFormat(keysToGet[i])) { // if the value is a one- or two-digit number and its key matches the format specified by keyRegex
            values.push( localStorage.getItem(keysToGet[i]) ); // add the value to the end of the values array
        }
    }

    values.sort(function greatestToLeast(a, b) {
        return b-a;
    }); // sort the values array numerically from greatest to least
    // source for how to sort an array of integers: https://stackoverflow.com/questions/1063007/how-to-sort-an-array-of-integers-correctly

    return values;
}
// source for this function: https://stackoverflow.com/questions/17745292/how-to-retrieve-all-localstorage-items-without-knowing-the-keys-in-advance

highScoresBtn.addEventListener("click", function() {
    if (validateForm()) {
        var initials = document.getElementById('initials').value; // get the initials from the form data submitted by the user
        var currentDateAndTime = new Date();
        // record date and time when initials were submitted. this is to make sure that entries can still be unique even if two high scores have the same number and initials.
        var currentDateAndTimeString = currentDateAndTime.toString();
        // convert the date and time into a string so it can be used in the localStorage key
        var currentDateAndTimeStringTrimmed = currentDateAndTimeString.substring(0, 33); // cut out the part that says '(Pacific Daylight Time)' because time zone name can vary and have inconsistent character lengths
        var localStorageKeyString = initials + ' - ' + currentDateAndTimeStringTrimmed;
        // example: AB - Wed Sep 27 2023 17:14:28 GMT-0700
        localStorage.setItem(localStorageKeyString, timeRemaining); // the time left at the end of the quiz is used as the score, which is stored as the localStorage value
        changePageToHighScores(); // change the page component to highScoresContainer
        hideHeader(quizStarted); // conceal the header since it contains the text 'View high scores'
        loadHighScores(getAllHighScores()); // use the high scores from localStorage to fill in the score containers
    }
});

document.addEventListener("DOMContentLoaded", loadHighScores(getAllHighScores()));
// the top 10 high scores are loaded into highScoresContainer as soon as the page is loaded, without waiting for stylesheets and images, source: https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event

function removeAllHighScores() {
    var keysToRemove = Object.keys(localStorage);

    for (var i=0; i<keysToRemove.length; i++) {
        if (checkKeyFormat(keysToRemove[i])) {
            localStorage.removeItem(keysToRemove[i]); // source for the localStorage.removeItem() method: https://www.w3schools.com/jsref/met_storage_removeitem.asp
        }
    }

    for (var j=0; j<scoreContainers.length; j++) {
        scoreContainers[j].textContent = ''; // clear text from all score containers
    }
}

var clearHighScores = document.getElementById('clear-high-scores');
clearHighScores.addEventListener("click", removeAllHighScores);

var submitInitialsForm = document.getElementById('submit-initials');

submitInitialsForm.addEventListener("submit", function(event) {
    event.preventDefault(); // prevent the form from automatically submitting
});
// source for how to handle forms: https://www.youtube.com/watch?v=S944-epyYuI&t=131s

headerHighScoresShorter.addEventListener("click", function() {
    changePageToHighScores();
    hideHeader(quizStarted);
});

headerHighScoresLonger.addEventListener("click", function() {
    changePageToHighScores();
    hideHeader(quizStarted);
});

function changePageToHome() {
    hideSubmissionForm();
    if (questionCounter > questions.length) {
        quizCompletedContainer.lastChild.remove(); // if the user answers the last question, the last child of quizCompletedContainer will be either '[number of last question]. Correct' or '[number of last question]. Incorrect. You have lost 5 seconds.'. after 3 seconds, the element is hidden but not removed. this line of code removes the element when the user returns to the home page after completing the quiz.
    }
    homeContainer.style.display = "block";
    quizContainer.style.display = "none"
    quizCompletedContainer.style.display = "none";
    highScoresContainer.style.display = "none";
    // hide all page components except homeContainer
    headerHighScoresShorter.style.display = "inline-block";
    headerHighScoresLonger.style.display = "none";
    // change header to 'View high scores'
    timeRemaining = 75;
    timeLeftString = 'Time: ' + timeRemaining;
    timeLeft.textContent = timeLeftString;
    timeLeft.style.color = "black";
    // reset timeRemaining and change the color of 'Time: 75' to black in case it was red at the end of the quiz
}

homeOrQuizPageBtn.addEventListener("click", function() {
    if (!pause) { // if the high scores page is reached while the quiz is not in progress
        changePageToHome();
    } else { // if the high scores page is reached while the quiz is in progress
        changePageToQuiz();
    }
    revealHeader()
});

var currentQuestion = document.getElementById('current-question');
// the questions will be written here
var contentA = document.getElementById('content-a');
var contentB = document.getElementById('content-b');
var contentC = document.getElementById('content-c');
var contentD = document.getElementById('content-d');
// the choices will be written here

var quizCompleted = document.getElementById('quiz-completed');
var finalScore = document.getElementById('final-score');
var finalScoreString;

function changePageToQuizCompleted() {
    if (questionCounter <= questions.length) { // if the user did not answer all of the questions
        for (i=0; i<questionCounter-1; i++) {
            quizContainer.lastChild.remove();
        }
        // source for how to remove all children from a parent node: https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
    } else {
        for (i=0; i<questionCounter-2; i++) { // if the user answers all of the questions, the last status appears in quizCompletedContainer instead of quizContainer
            quizContainer.lastChild.remove();
        }
    }
    homeContainer.style.display = "none";
    quizContainer.style.display = "none"
    quizCompletedContainer.style.display = "block";
    highScoresContainer.style.display = "none";
    // hide all page components except quizCompletedContainer
    headerHighScoresShorter.style.display = "inline-block";
    headerHighScoresLonger.style.display = "none";
    // change header to 'View high scores'
    if (questionCounter <= questions.length) { // if the user did not answer all of the questions
        quizCompleted.textContent = "Quiz partially completed.";
    }
    if (timeRemaining < 0) { // if timeRemaining < 5 and the user's last answer is incorrect (-5 sec)
        timeRemaining = 0;
    }
    timeLeftString = 'Time: ' + timeRemaining;
    timeLeft.textContent = timeLeftString; // update time display in header
    finalScoreString = 'Your final score is ' + timeRemaining + '.'; // example: 'Your final score is 29.'
    finalScore.textContent = finalScoreString;
    quizStarted = false; // reset quizStarted
}

function appendStatus(page, value, questionCount) {
    var statusElem = document.createElement('p');
    var statusString;
    if (value) { // if the user answers the question correctly
        statusString = questionCount + '.' + ' Correct'; // example: '3. Correct'
        statusElem.innerText = statusString;
        statusElem.style.color = 'darkgreen';
        statusElem.style.fontWeight = '700'; // make the status easy to read
    } else { // if the user answers the question incorrectly
        statusString = questionCount + '.' + ' Incorrect. You have lost 5 seconds.'; // example: '5. Incorrect. You have lost 5 seconds.'
        statusElem.innerText = statusString;
        statusElem.style.color = 'darkred';
        statusElem.style.fontWeight = '700';
    }
    if (questionCount < questions.length) { // this applies for the first question through the second-to-last question, whose statuses appear in quizContainer
        statusElem.style.margin = '10px 20px 0 20px';
        statusElem.style.paddingBottom = '5px';
    }
    page.appendChild(statusElem);
    if (questionCount === questions.length) { // this applies for the last question
        var removeStatusElem = setTimeout(function () {
            statusElem.style.visibility = 'hidden';
        }, 3000); // remove the status for the last question from the page after 3 seconds
    }
}
// source for how to set style properties in JavaScript: https://www.w3schools.com/jsref/prop_html_style.asp

function displayNextQuestion(clickedBtn) {
    if (questionCounter < questions.length) { // if the user has not reached the last question
        currentQuestion.textContent = questions[questionCounter].question;
        contentA.textContent = questions[questionCounter].a;
        contentB.textContent = questions[questionCounter].b;
        contentC.textContent = questions[questionCounter].c;
        contentD.textContent = questions[questionCounter].d;
        // display the question and choices associated with questionCounter
        if (clickedBtn !== questions[questionCounter-1].correct) { // if the user answers the question incorrectly
            timeRemaining -= 5;
            appendStatus(quizContainer, false, questionCounter);
        } else { // if the user answers the question correctly
            appendStatus(quizContainer, true, questionCounter);
        }
    }
    if (questionCounter === questions.length) { // if the user is on the last question
        if (clickedBtn !== questions[questionCounter-1].correct) {
            timeRemaining -= 5;
            appendStatus(quizCompletedContainer, false, questionCounter);
        } else {
            appendStatus(quizCompletedContainer, true, questionCounter);
        }
    }
    questionCounter++;
    if (questionCounter > questions.length) { // if the user answers the last question
        clearInterval(quizTimer);
        changePageToQuizCompleted();
    }
}

var choiceA = document.getElementById('choice-a');
var choiceB = document.getElementById('choice-b');
var choiceC = document.getElementById('choice-c');
var choiceD = document.getElementById('choice-d');
// these are the buttons that correspond to the choices

choiceA.addEventListener("click", function() {
    displayNextQuestion("a"); // clickedBtn = "a"
});
choiceB.addEventListener("click", function() {
    displayNextQuestion("b"); // clickedBtn = "b"
});
choiceC.addEventListener("click", function() {
    displayNextQuestion("c"); // clickedBtn = "c"
});
choiceD.addEventListener("click", function() {
    displayNextQuestion("d"); // clickedBtn = "d"
});
