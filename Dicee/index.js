function randomDieFace(){
    return "./images/dice" + randomDieFaceValue() + ".png";
}

function randomDieFaceValue(){
    return randomInt(1, 7); // Bottom inclusive, top exclusive.
}

function randomInt(low, high){
  if (!isInt(low) || !isInt(high)){
    throw "We only accept integer arguments.";
  }
  else {
    return Math.floor(Math.random() * (high - low) + low);
  }

  function isInt(num) {
     return $.isNumeric(num) && (Math.floor(num) === num);
  }
}

const dieFaceOne = randomDieFace();
const dieFaceTwo = randomDieFace();

document.querySelector("img.img1").src = dieFaceOne;
document.querySelector("img.img2").src = dieFaceTwo;

document.querySelector("body h1").innerText = determineWinner(dieFaceOne, dieFaceTwo);

function determineWinner(dieFaceOne, dieFaceTwo){
  if(dieFaceOne > dieFaceTwo){
    return "Player 1 wins!";
  } else if(dieFaceOne == dieFaceTwo){
    return "Draw!";
  } else {
    return "Player 2 wins!";
  }
}
