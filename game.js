var score = 0;
var clickingPower = 1;

var cursorCost = 15;
var cursors = 0;
var teammateCost = 100;
var teammate = 0;

function addToScore(amount) {
    score = score + amount;
    document.querySelector("#score").innerHTML = "$"+score;
}

function updateScorePerSecond(){
    scorePerSecond = cursors + teammate * 5;
    document.getElementById("scorepersecond").innerHTML = "$"+scorePerSecond + " money per second";
}

function buyCursor() {
    if (score >= cursorCost) {
        score = score - cursorCost;
        cursors = cursors + 1;
        cursorCost = Math.round(cursorCost * 1.15);
        document.querySelector("#score").innerHTML = "$"+score;
        document.querySelector("#cursor-cost").innerHTML = "$"+cursorCost;
        document.querySelector("#cursors").innerHTML = cursors;
        updateScorePerSecond();
    }
}

function buyTeammate() {
    if (score >= teammateCost) {
        score = score - teammateCost;
        teammate = teammate + 1;
        teammateCost = Math.round(teammateCost * 1.15);
        document.querySelector("#score").innerHTML = "$"+score;
        document.querySelector("#teammate-cost").innerHTML = "$"+teammateCost;
        document.querySelector("#teammate").innerHTML = teammate;
        updateScorePerSecond();
    }
}

function loadGame() {
    var savedGame = JSON.parse(localStorage.getItem("gameSave"));

    if(typeof savedGame.score != "undefined") score == savedGame.score;
    if(typeof savedGame.clickingPower != "undefined") clickingPower == savedGame.clickingPower;
    if(typeof savedGame.cursorCost != "undefined") cursorCost == savedGame.cursorCost;
    if(typeof savedGame.cursors != "undefined") cursors == savedGame.cursors;
    if(typeof savedGame.teammateCost != "undefined") teammateCost == savedGame.teammateCost;
    if(typeof savedGame.teammate != "undefined") teammate == savedGame.teammate;
}

function saveGame() {
    var gameSave = {
        score: score,
        clickingPower: clickingPower,
        cursorCost: cursorCost,
        cursors: cursors,
        teammateCost: teammateCost,
        teammate: teammate
    }
    localStorage.setItem("gameSave", JSON.stringify(gameSave));
}

function resetGame() {
    if (confirm("Voce tem certeza que deseja resetar o seu jogo?")) {
        var gameSave = {};
        localStorage.setItem("gameSave", JSON.stringify(gameSave));
        location.reload();
    }
}

window.onload = function() {
    loadGame();
    updateScorePerSecond();
    document.querySelector("#score").innerHTML = "$"+score;
    document.querySelector("#cursor-cost").innerHTML = "$"+cursorCost;
    document.querySelector("#cursors").innerHTML = cursors;
    document.querySelector("#teammate-cost").innerHTML = "$"+teammateCost;
    document.querySelector("#teammate").innerHTML = teammate;
};

setInterval(function() {
    score = score + cursors;
    score = score + teammate * 5;
    document.querySelector("#score").innerHTML = "$"+score;
}, 1000);

setInterval(function() {
    saveGame();
},30000);

document.addEventListener("keydown", function(event) {
    if(event.ctrlKey && event.which == 83) {
        event.preventDefault();
        saveGame();
    }
}, false);