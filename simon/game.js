const BUTTON_COLORS = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let level = 0;
let turnIdx = 0;

function nextSequence() {
  $("#level-title").text("Level " + level);
  let randomChosenColor = BUTTON_COLORS[randInt(0, BUTTON_COLORS.length)];
  gamePattern.push(randomChosenColor);
  flash(randomChosenColor);
  playSound(randomChosenColor);
  level++;
  turnIdx = 0; // Resetting the "turn index" for the next evaluation of checkAnswer() in the button handler.
}

/* Handler for key press. Should play the sound corresponding
 * to the randomly selected button above. */
$(document).keydown(function () {
  if (gamePattern.length === 0) {
    nextSequence();
  }
});

/* Handler for clicked button. */
$(".btn").on("click", function () {
  if (gamePattern.length > 0) {
    // Don't do anything if we don't have a gamePattern yet
    let userChosenColor = this.id;
    if (checkAnswer(userChosenColor)) {
      animatePress(userChosenColor);
    } else {
      gameOver();
    }
    if (turnIdx === gamePattern.length) {
      setTimeout(function () {
        nextSequence(); // Resets "turnIdx"
      }, 200); // Wait a bit before you actually call nextSequence();
    }
  }
});

function checkAnswer(userChosenColor) {
  return gamePattern[turnIdx++] === userChosenColor;
}

function gameOver() {
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 500);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  resetGame();
}

function resetGame() {
  gamePattern = [];
  level = 0;
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  });
}

function playSound(color) {
  let audioFile = new Audio("sounds/" + color + ".mp3");
  audioFile.play();
}

function flash(color) {
  const FADE_AMT = 100;
  $("#" + color)
    .fadeOut(FADE_AMT)
    .fadeIn(FADE_AMT)
    .fadeOut(FADE_AMT)
    .fadeIn(FADE_AMT);
}

function randInt(low, high) {
  if (!isInt(low) || !isInt(high)) {
    throw new Error("We only accept integer arguments.");
  } else {
    return Math.floor(Math.random() * (high - low) + low);
  }
}

function isInt(num) {
  return $.isNumeric(num) && Math.floor(num) === num;
}
