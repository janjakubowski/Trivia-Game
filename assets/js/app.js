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

var tempQ = " ";
var tempA = [ {
    Atext : "",
    Acorrect : null
}];

// ///////////////////////// Counters
var round = -1;           
var numCorrect = 0;     
var numWrong = 0;
var numNotAnswered = 0;

// ///////////////////////// Boolean
var alreadyPicked;  // lockout picking on multiple answers
var timedOut;       // lockout picking answer after timer expired

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

// function randomIndex (index) {
//     // return a random number between 0 and index
//     return Math.floor(Math.random()*index);
// }

function clearAll () {
    // Clear all the div on the page
    // $
    $("#intro, #timeLeft, #QandAs, #final").empty();
    $(".item-container").empty;
    // $("#timeLeft").empty();
    // $("#askQ").empty();
    // $("#pickA").empty();
    // $("#final").empty();

    // Also reset individual question variables
    alreadyPicked = false;
    timedOut = false;
}

var currentQ; 
var currentA;
function makeCard () {
    currentQ = { Qtext : triviaBank.questions[round].question,
                QcorrectAnswer : triviaBank.questions[round].correct};
    currentA = [];
    for (var j=0; j < triviaBank.questions[round].incorrect.length; j++) {
        currentA[j] = ({Atext : triviaBank.questions[round].incorrect[j], Acorrect : "N"});
    }
    var randomI = Math.floor(Math.random()*triviaBank.questions[round].incorrect.length+1);
    console.log("randomI: " + randomI);
    currentA.splice(randomI,0,{Atext : triviaBank.questions[round].correct, Acorrect : "Y"});
}

// var seconds;
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
    round = -1;
    $("#final").append(`<p>G-A-M-E   O-V-E-R<p>`);
    $("#final").append(`<p>Number Correct: ${numCorrect}<p>`);
    $("#final").append(`<p>Number Wrong: ${numWrong}<p>`);
    $("#final").append(`<p>Number Not Answered: ${numNotAnswered}<p>`);
    var startGameBtn = $("<button>");
    startGameBtn.addClass("startGame");
    startGameBtn.text("Start New Game");
    $("#final").append(startGameBtn);
}

function nextRound () {
    clearAll();
    round++;
    console.log("ready for round: " + (round+1));
    if (round < triviaBank.questions.length) {
        playTrivia();
    } else {
        console.log("played all the questions");
        endGame();
    }
}

function playTrivia () {
    makeCard();
    console.log("question: " + currentQ.Qtext + " | " + currentQ.QcorrectAnswer);
    // var currentView = $("#intro");
    QnAtextArea = $("#QandAs");
    QnAtextArea.addClass("item-container");
    var questionTile = $("<div class=item id=Qtile>");
    questionTile.html(`<p>${currentQ.Qtext}<p>`);
    questionTile.attr("data-correctA",currentQ.correctAns);
    // questionTile.addClass("item");
    QnAtextArea.prepend(questionTile);
    for (var ii=0; ii<currentA.length; ii++) {
        var answerTile = $("<div class=item>");
        answerTile.addClass("multipleChoice");
        answerTile.text(currentA[ii].Atext);
        answerTile.attr("data-right", currentA[ii].Acorrect);
        QnAtextArea.append(answerTile);
    } 
    countdown (15,false);  
}
// setTimeout('countdown(10,false)', 1000 * 5);

var currentView = $("#intro");

var welcomeImage = $("<div>");
// var welcomeImage = $("<img>");
welcomeImage.html("<img width=600 src=assets/images/intro.jpeg></img>");
// temp = "assets/images/intro.jpeg";
// welcomeImage.attr("src",temp);
welcomeImage.addClass("item-image");
var welcomePara = $("<p>").text("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.");
welcomePara.addClass("item");
// currentView.append(welcomePara);
var startGameBtn = $("<button>");
// startGameBtn.attr("onclick","playTrivia");
startGameBtn.addClass("startGame");
startGameBtn.text("Start Game");
currentView.addClass("item-container");
currentView.append(welcomeImage);
currentView.append(welcomePara);
currentView.append(startGameBtn);

// setTimeout(startGame, 1000 * 5);



// $("#intro").empty();
$(document).on("click", ".startGame", function () { 
// function startGame () {
    clearAll();   
    nextRound();
});
// countdown(5,false);
// setTimeout('clearAll', 1000 * 5);
// setTimeout('playTrivia', 1000 * 10);


// $(document).ready(function() {
    $(document).on("click", ".multipleChoice", function () {
        if ( !alreadyPicked && !timedOut ) {
            alreadyPicked = true;
            clearTimeout(timeRemaining);
            // $("#timeLeft").empty();
            // $(this).addClass("picked");
            QtextArea = $("#Qtile");
            var correctA = currentQ.QcorrectAnswer;
            QtextArea.prepend(`<h2 class="result">The correct answer is ${correctA}</h2>`);       
            if ($(this).attr("data-right") === "Y") {
                var rightOrWrong = `<h2 class="result">Yes, you're right!</h2>`
                $(this).addClass("pickedRight");
                numCorrect++;
            } else {
                var rightOrWrong = `<h2 class="result">Sorry, you're wrong!</h2>`;
                $(this).addClass("pickedWrong");
                numWrong++;
            }
            QtextArea.prepend(rightOrWrong);
            setTimeout(nextRound, 3000);
        }
    // $(startGameBtn).on("click", function() {    
        // setTimeout(clearAll, 1000 * 5);
        // clearAll;
        // playTrivia;
    });
// })
// END OF FILE 