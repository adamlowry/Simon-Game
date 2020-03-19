
var buttonColors = ["red", "blue", "green", "yellow"];  //Where random number gets turned into a color.
var started = false;
var gameIsOver = false;
var level = 0;
var gamePattern = [];
var userPattern = [];

//Start or restart game.
$(document).keydown(function() {
  if (!started) {   //The "!" means if "started" is not true, meaning false, then continue.
    started = true;
    level = 0;
    nextSequence();
  }
});

//Creates the random button choices and executes them.
function nextSequence() {
  level++;
  $("h1").text("Level " + level)
  var randomNumber = Math.floor(Math.random() * 4); //Makes a random number.
  var randomColor = buttonColors[randomNumber];  //Turns the random number into a random color.
  gamePattern.push(randomColor);  //Adds the new random color to the Array gamePattern.
  animateButton(randomColor);
  playSound(randomColor);
}

//Listens for user clicks on buttons and acts accordingly.
$(".btn").click(function() {  //Listens to everything with a class .btn for clicks.
  if (started == true) {
    var userChosenColor = this.id;  //Sets this variable equal to the clicked button's id.
    userPattern.push(userChosenColor);  //Pushes the clicked button's id (color) to the userPattern array.
    animateButton(userChosenColor);
    playSound(userChosenColor);
    answerCheck();
  }
});

function answerCheck (){
  var i = (userPattern.length - 1);
  if (userPattern[i] !== gamePattern[i]) {
    gameOver();
  } else {
    if (userPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 850);
      userPattern = [];
    }
  }
}

function gameOver() {
  started = false;
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function() {  //Waits the set amount of time, and removes the .pressed class from the button.
    $("body").removeClass("game-over");
  }, 200);
  $("h1").text("Game Over, Press Any Key to Restart")
  level = 0;
  userPattern = [];
  gamePattern = [];
}

function animateButton(passThrough) {
  $("#" + passThrough).addClass("pressed").fadeOut(100).fadeIn(200);
  setTimeout(function() {  //Waits the set amount of time, and removes the .pressed class from the button.
    $("#" + passThrough).removeClass("pressed");
  }, 100);
}

function playSound(whichSound) {
  var sound = new Audio("sounds/" + whichSound + ".mp3");
  sound.play();
}
