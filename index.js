// global variables

var buttonColors = ["red","blue","green","yellow"];
var userChosenPattern = [];
var gamePattern = [];
var gameStart = false;
var success = true;
var level = 1;

// Game Start

$("body").keydown(function() {
  if(!gameStart){
  gameStart = true;
  gameSequence();
  }
});

// Event Listener for Buttons

$(".btn").click(function() {
  var userChosenColor=event.toElement.id;
  userChosenPattern.push(userChosenColor);
  animateColor(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(level);
});

// functions

function animateColor(color){
  $("#"+color).addClass("pressed");
  setTimeout(function(){
    $("#"+color).removeClass("pressed")
  },100);
}

function playSound(color){
  var gameSound = new Audio("sounds/"+color+".mp3");
  gameSound.play();
}

function gameSequence(){
  success = true;
  $("#level-title").text("Level "+ level);
  var randomNum = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNum];
  userChosenPattern=[];
  gamePattern.push(randomChosenColor);
  animateColor(randomChosenColor);
  playSound(randomChosenColor);
}

function checkAnswer(lev){
  for(var i=0;i<userChosenPattern.length;i++){
    if(gamePattern[i]===userChosenPattern[i]){
      console.log(userChosenPattern.length);
    }
    else{
      gameStart = false;
      userChosenPattern = [];
      gamePattern = [];
      success = false;
      level = 1;
      $("#level-title").text("Failed!!!! Press A key to continue ");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over")
      },200);
    }
  }
  if(success && userChosenPattern.length===lev){
  level+=1;
  setTimeout(function(){
    gameSequence()
  },1000);
  }
}
