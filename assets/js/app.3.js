// app.js -- Stargate SG-1 Trivia Game -- Jan Jakubowski
var round = -1;
var tempQ = " ";
var tempA = [ ];
var alreadyPicked;  // boolean: lockout picking on multiple answers
var timedOut;       // boolean: lockout picking answer after timer expired
var randomOrder = [0, 1, 2, 3];
const triviaBank = {
    questions : [ 
        {   question : "What is 2 plus 2?",
            correct : "4",
            incorrect : ["3","5","0"]
        },
        {   question: "Click On Pick Me",
            correct : "Pick Me",
            incorrect : ["Not This One", "Could Be", "Wrong"]
        }
    ]
}

shuffle = function (arrayIn) {
    randomize();
    var arrayOut = [];
    for (var x=0; x < arrayIn.length; x++ ) { 
        arrayOut[x] = arrayIn[randomOrder[x]];
    }
    return arrayOut;
}

function triviaCard(Q,A,index) {
    this.Q = Q,
    this.A = A,
    this.correctIndex = index
}

function randomize() {
    var tempOrder = randomOrder;
    randomOrder = [];
    for (var i=0; i<4; i++) {
        x = Math.floor(Math.random()*tempOrder.length);
        randomOrder[i] = tempOrder.splice(x,1);
    };
    console.log ("randomOrder: " + randomOrder);
}

function clearAll () {
    $("#intro").empty();
    $("#timeLeft").empty();
    $("#askQ").empty();
    $("#pickA").empty();
    $("#final").empty();
    alreadyPicked = false;
    timedOut = false;
}

function makeCard () {
    var tempQ = triviaBank.questions[round].question;
    var tempA = [triviaBank.questions[round].correct];
    var tempA = tempA.concat(triviaBank.questions[round].incorrect);
    tempA = shuffle(tempA);
    for (var j=0; j < 4; j++) {
        if (tempA[j] == triviaBank.questions[round].correct) {
            var tempIndex = j;
        }
    }
    return new triviaCard(tempQ,tempA,tempIndex);
}

var seconds;
var timeRemaining;
function countdown (seconds,silent) {
    if (!silent) {
        $("#timeLeft").html("<p>Time Remaining " + seconds + " seconds</p>");
    }
    if (seconds < 1) {
        clearTimeout(timeRemaining);
        if (!silent) {
            $("#timeLeft").append("<p>TIME IS UP</p>");
        }
        return true;
    } 
     seconds--;
     timeRemaining = setTimeout(`countdown(${seconds},${silent})`, 1000);
    
}

function nextRound () {
    clearAll();
    round++;
    console.log("ready for round: " + round);
    if (round < triviaBank.questions.length) {
        playTrivia();
    } else {
        console.log("played all the questions");
    }
}

function playTrivia () {
    var currentQnA = makeCard();
    console.log(currentQnA.Q + " | " + currentQnA.A + " | " + currentQnA.correctIndex);
    console.log(currentQnA.Q);
    $("#askQ").html(`<p>${currentQnA.Q}<p>`);
    var correctAns = currentQnA.A[currentQnA.correctIndex];
    console.log("correct answer is " + correctAns);
    for (var ii=0; ii<currentQnA.A.length; ii++) {
        var answerTile = $("<div>");
        answerTile.addClass("multipleChoice");
        answerTile.text(currentQnA.A[ii]);
        answerTile.attr("data-answer", currentQnA.A[ii]);
        answerTile.attr("data-rightanswer", correctAns);
        $("#pickA").append(answerTile);
    }   
    // round++;
}
// setTimeout('countdown(10,false)', 1000 * 5);

var welcomePara = $("<p>").text("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.");
var startGameBtn = $("<button>");
// startGameBtn.attr("onclick","playTrivia");
startGameBtn.addClass("startGame");
startGameBtn.text("Start Game");


$("#intro").append(welcomePara);
$("#intro").append(startGameBtn);

// $("#intro").empty();
$(document).on("click", ".startGame", function () { 
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
            $(this).addClass("picked");
            console.log("answer clicked: " + $(this).attr("data-answer"));
            var correctAnswer = $(this).attr("data-rightanswer");
            $("#askQ").append(`<h2 class="result">The correct answer is ${correctAnswer}</h2>`);       
            if ($(this).attr("data-answer") == $(this).attr("data-rightanswer")) {
                var rightOrWrong = `<h2 class="result">Yes, you're right!</h2>`
                $(this).addClass("pickedRight");
            } else {
                var rightOrWrong = `<h2 class="result">Sorry, you're wrong!</h2>`;
                $(this).addClass("pickedWrong");
            }
            $("#askQ").append(rightOrWrong);
            setTimeout(nextRound, 7500);
        }
    // $(startGameBtn).on("click", function() {    
        // setTimeout(clearAll, 1000 * 5);
        // clearAll;
        // playTrivia;
    });
// })
// END OF FILE 