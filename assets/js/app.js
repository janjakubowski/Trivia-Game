// app.js -- Stargate SG-1 Trivia Game -- Jan Jakubowski
var round = 0;
var tempQ = " ";
var tempA = [ ];
// var answer = { txt : " ", correct : false};
var randomOrder = [0, 1, 2, 3];
// var currentQ = " ";
const triviaBank = {
    round : 1,
    questions : [ 
        {   question : "What is 2 plus 2?",
            correct : "4",
            incorrect : ["3","5","0"]
        },
        {   question: "WTF?",
            correct : "Pick Me",
            incorrect : ["X", "Y", "Z"]
        }
    ]
     }

function triviaCard(Q,A,index) {
    this.Q = Q,
    this.A = A,
    this.correctIndex = index
    // this.displayQ = {
    //     var disdiv = $("#askQ");
    //     $("#askQ").html(`<p>${this.Q}<p>`);
    // }
}

shuffle = function (arrayIn) {
    randomize();
    var arrayOut = [];
    for (var x=0; x < arrayIn.length; x++ ) { 
        // var random =  randomOrder[x];
        // console.log("random element:" + random + " | arrayIn:" + arrayIn[random]);
        arrayOut[x] = arrayIn[randomOrder[x]];
    }
    // console.log(arrayOut);
    return arrayOut;
}

var currentGame = {
    round : 0
}

function randomize() {
    var tempOrder = randomOrder;
    randomOrder = [];
    for (var i=0; i<4; i++) {
        x = Math.floor(Math.random()*tempOrder.length);
        randomOrder[i] = tempOrder.splice(x,1);
    };
    // console.log("RandomOrder: " + randomOrder);
}

function clearAll () {$("#intro").empty();}

function makeCard () {
    // console.log("in makecard")
    // round++;
    
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

// function displayCard() {
//     $("#askQ").html(`<p>${this.Q}<p>`);
    
// }
// }
var seconds;
var timeRemaining;
// var secs;
function countdown (seconds,silent) {
    if (!silent) {
        $("#timeLeft").html("<p>Time Remaining " + seconds + " seconds</p>");
    }
    // console.log (seconds);
    // if ((seconds = 10) && (!silent)) { $("#timeLeft").addClass("redTxt");}
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

function playTrivia () {
    var currentQnA = makeCard();
    // console.log(currentQnA.Q + " | " + currentQnA.A + " | " + currentQnA.correctIndex);
    console.log(currentQnA.Q);
    // currentQnA.displayQ;
    $("#askQ").html(`<p>${currentQnA.Q}<p>`);
    for (var ii=0; ii<currentQnA.A.length; ii++) {
        var amIRight = (ii == currentQnA.correctIndex) ? true : false;
        if (amIRight) {console.log("correct answer is " + currentQnA.A[ii])};

        
        // var correctA = 
        $("#pickA").append(`<p>${currentQnA.A[ii]},${amIRight}<p>`);
        }   
    round++;
}
// setTimeout('countdown(10,false)', 1000 * 5);

var welcomePara = $("<p>").text("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.");
var startGameBtn = $("<button>");
startGameBtn.addClass("startGame");
startGameBtn.text("Start Game");

$("#intro").append(welcomePara);
$("#intro").append(startGameBtn);

// $("#intro").empty();
playTrivia();

// countdown(5,false);
// setTimeout('clearAll', 1000 * 5);
// setTimeout('playTrivia', 1000 * 10);


// $(document).ready(function() {
    // $(document).on("click", "button.startGame", function () {
    // $(startGameBtn).on("click", function() {    
        // setTimeout(clearAll, 1000 * 5);
        // clearAll;
        // playTrivia;
    // });
// })
// END OF FILE 