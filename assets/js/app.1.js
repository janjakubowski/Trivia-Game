// app.js -- Stargate SG-1 Trivia Game -- Jan Jakubowski
var tempQ = " ";
var tempA = [ ];
var answer = { txt : " ", correct : false};
var randomOrder = [0, 1, 2, 3];
var currentQ = " ";
const triviaBank = {
    round : 1,
    questions : [ 
        {   question : "What is 2 plus 2?",
            correct : "4",
            incorrect : ["3","5","0"]
        },
        {   question: "WTF?",
            correct : "Y",
            incorrect : ["X", "Z", "W"]
        }
    ]
     }
    //  create : function(answers) 
// };

function triviaCard(Q,A,index) {
    this.Q = Q,
    this.A = A,
    this.correctIndex = index
}

shuffle = function (arrayIn) {
    // this.Q = tempQ;
    var arrayOut = [];
    console.log(arrayIn);
    for (var x=0; x < arrayIn.length; x++ ) { 
        var random =  randomOrder[x];
        console.log("random element:" + random + " | arrayIn:" + arrayIn[random]);
        arrayOut[x] = arrayIn[random];
     }

    console.log(arrayOut);
    return arrayOut;
}

var currentGame = {
    round : 0
}
function randomize() {
    // debugger;
    var tempOrder = randomOrder;
    randomOrder = [];
    for (var i=0; i<4; i++) {
        x = Math.floor(Math.random()*tempOrder.length);
        randomOrder[i] = tempOrder.splice(x,1);
    };
    console.log("RandomOrder: " + randomOrder);
}

function clearAll () {$("#intro").empty();}

// for (var i=1; i<=10; i++) {
//     randomize ();
// }



var welcomePara = $("<p>").text("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.");
var startGameBtn = $("<button>");
startGameBtn.addClass("startGame");
startGameBtn.text("Start Game");
// startGameBtn.addClass(.......);

$("#intro").append(welcomePara);
$("#intro").append(startGameBtn);
setTimeout(clearAll, 1000 * 2);
setTimeout(makeCard, 1000 * 4);

// $(startGameBtn).on("click", function() {    
//     // setTimeout(clearAll, 1000 * 5);
//     clearAll;

function makeCard () {
    for (i=0; i<2; i++) {
        
        var tempQ = triviaBank.questions[i].question;
        var tempA = [triviaBank.questions[i].correct];
        var tempA = tempA.concat(triviaBank.questions[i].incorrect);
       
        // console.log("i: " + tempIndex);
        console.log(tempQ + " | " + tempA);
        randomize();
        tempA = shuffle(tempA);
        for (var j=0; j < 4; j++) {
            if (tempA[j] == triviaBank.questions[i].correct) {
                var tempIndex = j;
            }
        }
        console.log ("index: " + tempIndex);
        var currentQnA = new triviaCard(tempQ,tempA,tempIndex);
        
        // debugger;
        
        // console.log(tempQ + " | " + tempA);
        
        // shuffle(currentQnA.A);
        console.log(currentQnA.Q + " | " + currentQnA.A + " | " + currentQnA.correctIndex);
    }
}
// });


