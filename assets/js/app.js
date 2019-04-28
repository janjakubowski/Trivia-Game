// app.js -- Stargate SG-1 Trivia Game -- Jan Jakubowski

// Keeping this unused code which given an array shuffles the indexes of an 
// array given the array randomOrder which keeps a running array of the indexes
// will be useful if the triviaBank has more questions than are used in a game
// var randomOrder = [0, 1, 2, 3, ... n];
// shuffle = function (arrayIn) {
//     randomize();
//     var arrayOut = [];
//     for (var x=0; x < arrayIn.length; x++ ) { 
//         arrayOut[x] = arrayIn[randomOrder[x]];
//     }
//     return arrayOut;
// }
// function randomize() {
//     var tempOrder = randomOrder;
//     randomOrder = [];
//     for (var i=0; i<4; i++) {
//         x = Math.floor(Math.random()*tempOrder.length);
//         randomOrder[i] = tempOrder.splice(x,1);
//     };
//     // console.log ("randomOrder: " + randomOrder);
// }

// Placeholders for the string while dynamic items are created
var currentQ; 
var currentA;

// ///////////////////////// Counters
var round = -1;           
var numCorrect = 0;     
var numWrong = 0;
var numNotAnswered = 0;

// ///////////////////////// Boolean
var alreadyPicked;  // lockout picking on multiple answers
var timedOut;       // lockout picking answer after timer expired

// ///////////////////////// THE Questions with Answers
const triviaBank = {
    questions : [ 
        {   question : "What is Teal'c home planet?",
            correct : "Chu'lac",
            incorrect : ["Abydos", "Earth", "Tolan", "Jaffacrib"]
        },
        {   question: "What does Jack O'Neill have a degree in?",
            correct : "he doesn't have a degree",
            incorrect : ["physics", "mathematics", "archaeology", "linguistics"]
        },
        {   question: "Who was not part of SG1 at one time?",
            correct : "Kawalski",
            incorrect : ["Carter", "Jonas Quinn", "Vala Maldoran", "Michell"]
        },
        {   question: "What race committed mass suicide?",
            correct : "Asgard",
            incorrect : ["Huma", "Nox", "Goa'uld", "Tolan"]
        },
        {   question: "Which actor was not in the show?",
            correct : "Orlando Bloom",
            incorrect : ["Amanda Tappings", "Richard Dean Anderson", "Christopher Judge", "Michael Shanks"]
        },
        {   question: "What was the first planet SG-1 visits?",
            correct : "Abydos",
            incorrect : ["Simarka", "Chu'lac", "Dakara", "Tolan"]
        },
        {   question: "What Goa'uld was Teal'c the First Prime of?",
            correct : "Apophis",
            incorrect : ["Tanith", "Anubis", "Ba'al", "Loki"]
        },
        {   question: "What reference to what show did a character make in the first episode??",
            correct : "McGyver",
            incorrect : ["Harry Potter", "Flash Gordan", "Spongebob Squarepants", "Lord of the Rings"]
        }
    ]
}


function clearAll () {
    $("#intro, #timeLeft, #QandAs, #final").empty();
    alreadyPicked = false;
    timedOut = false;
}

// var currentQ; 
// var currentA;
function makeCard () {
    currentQ = { Qtext : triviaBank.questions[round].question,
                QcorrectAnswer : triviaBank.questions[round].correct};
    currentA = [];
    for (var j=0; j < triviaBank.questions[round].incorrect.length; j++) {
        currentA[j] = ({Atext : triviaBank.questions[round].incorrect[j], Acorrect : "N"});
    }
    // Randomly place the correct answer in the choices
    var randomI = Math.floor(Math.random()*triviaBank.questions[round].incorrect.length+1);
    currentA.splice(randomI,0,{Atext : triviaBank.questions[round].correct, Acorrect : "Y"});
}

var timeRemaining;
function countdown (seconds) {
    $("#timeLeft").html("<p>Time Remaining " + seconds + " seconds</p>");
    if (seconds < 1) {
        numNotAnswered++;
        clearTimeout(timeRemaining);
        timedOut = true;
        QtextArea = $("#Qtile");
        var correctA = currentQ.QcorrectAnswer;
        QtextArea.prepend(`<p class="result">The correct answer is ${correctA}</p>`);
        QtextArea.prepend("<p>TIME IS UP</p>");
        // var correctA = currentQ.QcorrectAnswer;
        
        setTimeout(nextRound, 3000);
        return true;
    } 
     seconds--;
     timeRemaining = setTimeout(`countdown(${seconds})`, 1000);
}

function endGame () {

    clearAll();

    var currentView = $("#final");
    currentView.addClass("item-container");

    var gameOver = $("<div>");
    gameOver.addClass("item-game-over");
    gameOver.html("<p>G-A-M-E - O-V-E-R<p>");
    currentView.append(gameOver);

    var summary = $("<div>");
    summary.addClass("item");
    summary.append(`<p>Number Correct: ${numCorrect}<p>`);
    summary.append(`<p>Number Wrong: ${numWrong}<p>`);
    summary.append(`<p>Number Not Answered: ${numNotAnswered}<p>`);
    currentView.append(summary);

    var startGameBtn = $("<button>");
    startGameBtn.addClass("startGame");
    startGameBtn.text("Start New Game");
    currentView.append(startGameBtn);
}

function nextRound () {

    clearAll();
    round++;

    if (round < triviaBank.questions.length) {
        playTrivia();
    } else {
        endGame();
    }
}

function playTrivia () { 

    makeCard();
    console.log("question: " + currentQ.Qtext + " | " + currentQ.QcorrectAnswer);

    QnAtextArea = $("#QandAs");
    QnAtextArea.addClass("item-container");

    var questionTile = $("<div class=item id=Qtile>");
    questionTile.html(`<p>${currentQ.Qtext}<p>`);
    questionTile.attr("data-correctA",currentQ.correctAns);
    QnAtextArea.prepend(questionTile);

    for (var ii=0; ii<currentA.length; ii++) {
        var answerTile = $("<div class=item>");
        answerTile.addClass("multipleChoice");
        answerTile.text(currentA[ii].Atext);
        answerTile.attr("data-right", currentA[ii].Acorrect);
        QnAtextArea.append(answerTile);
    } 

    countdown (15);  
}

// Dynamically build the Welcome page 
var currentView = $("#intro");
currentView.addClass("item-container");

var welcomeImage = $("<div>");
welcomeImage.html("<img width=600 src=assets/images/intro.jpeg></img>");
welcomeImage.addClass("item-image");

var welcomePara = $("<p>").text("There are eight questions. You have 15 seconds to answer each question and 3 seconds between quesitons. Click on the button to get started, Good Luck!");
welcomePara.addClass("item");

var startGameBtn = $("<button>");
startGameBtn.addClass("startGame");
startGameBtn.text("Start Game");

currentView.append(welcomeImage);
currentView.append(welcomePara);
currentView.append(startGameBtn);

// ///////////
// ///////////  Wait for player to click on start or their answer
// ///////////

$(document).on("click", ".startGame", function () { 

    clearAll();

    // Also reset counters
    round = -1;
    numCorrect = 0;     
    numWrong = 0;
    numNotAnswered = 0;

    nextRound();
});

$(document).on("click", ".multipleChoice", function () {

    if ( !alreadyPicked && !timedOut ) {

        alreadyPicked = true;
        clearTimeout(timeRemaining);

        QtextArea = $("#Qtile");
        var correctA = currentQ.QcorrectAnswer;
        QtextArea.prepend(`<p>The correct answer is ${correctA}</p>`);       
        if ($(this).attr("data-right") === "Y") {
            var rightOrWrong = `<p>Yes, you're right!</p>`
            $(this).addClass("pickedRight");
            numCorrect++;
        } else {
            var rightOrWrong = `<p>Sorry, you're wrong!</p>`;
            $(this).addClass("pickedWrong");
            numWrong++;
        }
        QtextArea.prepend(rightOrWrong);

        setTimeout(nextRound, 3000);
    }
});
// END OF FILE 