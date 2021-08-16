var score = 0;
var clikingPower = 1;

var cursorCost = 15;
var cursors = 0;
var teammateCost = 100;
var teammate = 0;

function addToScore(amount){
    score = score + amount;
    document.querySelector("#score").innerHTML = "$"+score;
}

function buyCursor(){
    if (score >= cursorCost){
        score = score - cursorCost;
        cursors = cursors + 1;
        cursorCost = Math.round(cursorCost * 1.15);
        document.querySelector("#score").innerHTML = "$"+score;
        document.querySelector("#cursor-cost").innerHTML = "$"+cursorCost;
        document.querySelector("#cursors").innerHTML = cursors;
    }
}

function buyTeammate(){
    if (score >= teammateCost){
        score = score - teammateCost;
        teammate = teammate + 1;
        teammateCost = Math.round(teammateCost * 1.15);
        document.querySelector("#score").innerHTML = "$"+score;
        document.querySelector("#teammate-cost").innerHTML = "$"+teammateCost;
        document.querySelector("#teammate").innerHTML = teammate;
    }
}

setInterval(function() {
    score = score + cursors;
    score = score + teammate * 5;
    document.querySelector("#score").innerHTML = "$"+score;
}, 1000); //1000ms = 1 second