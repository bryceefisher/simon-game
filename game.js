var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameOn = false;
const buttonColors = ["red", "blue", "green", "yellow"];

var blue = new Audio("sounds/blue.mp3");
var green = new Audio("sounds/green.mp3");
var red = new Audio("sounds/red.mp3");
var yellow = new Audio("sounds/yellow.mp3");
var wrong = new Audio("sounds/wrong.mp3");

function makeSound(key) {
  switch (key) {
    case "blue":
      blue.play();

      break;
    case "green":
      green.play();

      break;
    case "red":
      red.play();

      break;
    case "yellow":
      yellow.play();

    default:
      console.log();
      break;
  }
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else if (gamePattern[currentLevel] != userClickedPattern[currentLevel]) {
    $("body").addClass("game-over");
    wrong.play();
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 100);
    $("h1").text("Game Over: Press any key to restart");
    gameOn = false;
    level = 0
    gamePattern = []
  }
}

$(".btn").click(function () {
  let userChosenColor = this.id;
  makeSound(userChosenColor);
  userClickedPattern.push(userChosenColor);
  $("#" + userChosenColor).toggleClass("pressed");
  setTimeout(function () {
    $("#" + userChosenColor).toggleClass("pressed");
  }, 100);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];
  level += 1;
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  makeSound(randomChosenColor);
  $("#" + randomChosenColor).addClass("pressed");
  setTimeout(function () {
    $("#" + randomChosenColor).removeClass("pressed");
  }, 100);
  $("h1").text("LEVEL:" + level);
}

$("body").keypress(function () {
  if (gameOn != true) {
    gameOn = true;
    nextSequence();
    $("h1").text("LEVEL:" + level);
  }
});
