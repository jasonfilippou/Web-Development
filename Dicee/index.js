var leftDieFace = Math.floor(Math.random() * 6) + 1
var rightDieFace = Math.floor(Math.random() * 6) + 1

document.querySelector("div.dice img.img1").setAttribute("src", "images/dice" + leftDieFace + ".png")
document.querySelector("div.dice img.img2").setAttribute("src", "images/dice" + rightDieFace + ".png")
// Let's see if JS can see the "result" variable if I define it inside the conditions
if(leftDieFace > rightDieFace)
{
  result = "Player 1 wins!"
}
else if(leftDieFace == rightDieFace)
{
  result = "Draw!"
}
else
{
  result = "Player 2 wins!"
}
document.querySelector("h1").textContent = result
