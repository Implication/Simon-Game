let buttonColors = ["red",  "blue", "yellow", "green"];
let gamePattern = [];
let userPattern = [];
let start = false;
let level = 0;
$(document).keypress(function(){
    console.log("hi");
    if(!start){
        nextSequence();
        start = true;
    }
});
$("button").click(e =>{
    let userColor = e.target.id;
    animation(userColor);
    userPattern.push(userColor);
    checkAnswer(userPattern.length - 1);
}
);

function checkAnswer(color){
    if(userPattern[color] === gamePattern[color]){
        if(userPattern.length === gamePattern.length)
            setTimeout(() => {nextSequence()}, 1000);
    }
    else{
        $("#level-title").text("Game over! Press any key to play again");
        $("body").addClass("game-over");
        let audio = new Audio('sounds/wrong.mp3');
        audio.play();
        setTimeout(() => {
            $("body").removeClass('game-over');
        }, 200 );
        startOver();
    }
}

function nextSequence(){
    userPattern = [];
    level++;
    $("#level-title").text(`Level ${level}`);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor);
    animation(gamePattern[level - 1])
}



function animation(button){
    $(`#${button}`).fadeIn(100).fadeOut(100).fadeIn(100);
    let audio = new Audio(`sounds/${button}.mp3`);
    audio.play();
}

function startOver(){
    level = 0;
    gamePattern = [];
    start = false;
}