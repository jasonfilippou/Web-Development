var allDrums =  document.querySelectorAll(".drum");
var numberOfDrumButtons = allDrums.length;

for (var i = 0; i < numberOfDrumButtons; i++) {

  // This is an event listener to make the drum sound if you click on it.
  // Exactly because you want to click on a drum and have it sound only when
  // you click on it, you register those event listeners to the relevant
  // button in the HTNL. Buttons can listen to the "click" event. How they
  // respond to it is your own beeswax.
  allDrums[i].addEventListener("click", function() {

    var buttonInnerHTML = this.innerHTML; /* `this` refers to the object that we are adding an event listener for */

    makeSound(buttonInnerHTML);

    buttonAnimation(buttonInnerHTML);

  });
}

// This is a more general, document-level event listener for the event
// "keydown". It does the exact same thing that the button-specific event listener
// for the "click" event, only for an event that is generated by the keyboard.
document.addEventListener("keydown", function(event) {

  makeSound(event.key);

  buttonAnimation(event.key);

});


function makeSound(key){

  switch (key) {
    case "w":
      var tom1 = new Audio("sounds/tom-1.mp3");
      tom1.play();
      break;

    case "a":
      var tom2 = new Audio("sounds/tom-2.mp3");
      tom2.play();
      break;

    case "s":
      var tom3 = new Audio('sounds/tom-3.mp3');
      tom3.play();
      break;

    case "d":
      var tom4 = new Audio('sounds/tom-4.mp3');
      tom4.play();
      break;

    case "j":
      var snare = new Audio('sounds/snare.mp3');
      snare.play();
      break;

    case "k":
      var crash = new Audio('sounds/crash.mp3');
      crash.play();
      break;

    case "l":
      var kick = new Audio('sounds/kick-bass.mp3');
      kick.play();
      break;


    default: console.log(key);  // If  you give us a key beyond the selections, just print it to the console, which will probably do nothing in the viewport
  } // switch
} // makeSound()


// A function to animate buttons.
function buttonAnimation(currentKey) {

  var activeButton = document.querySelector("." + currentKey);

  activeButton.classList.add("pressed");  // Separation of concerns! CSS for the class "pressed" has been prepared.

  setTimeout(function() {
    activeButton.classList.remove("pressed");
  }, 100);  // Remove the "pressed" class from the CSS of the button after 100ms.

}
