document
  .querySelectorAll(".drum")
  .forEach(drumElement => drumElement.addEventListener("click", function(){
        makeSound(this.innerText);
        animate(this.innerText);
  }));

document
  .addEventListener("keydown", function(keyDownEvent) {
    makeSound(keyDownEvent.key);
    animate(keyDownEvent.key);
  });

function makeSound(keyBinding) {

  var path = 'sounds/';
  switch(keyBinding){
    case 'w':
      path += 'crash.mp3';
      break;
    case 'a':
      path += 'kick-bass.mp3';
      break;
    case 's':
      path += 'snare.mp3';
      break;
    case 'd':
      path += 'tom-1.mp3';
      break;
    case 'j':
      path += 'tom-2.mp3';
      break;
    case 'k':
      path += 'tom-3.mp3';
      break;
    case 'l':
      path += 'tom-4.mp3';
      break;
    default:
      break;
  }
  var audio = new Audio(path);
  audio.play();
}

function animate(drumKey){
  var buttonElement = document.querySelector('.' + drumKey);
  buttonElement.classList.add("pressed");

  setTimeout(function(){
    buttonElement.classList.remove("pressed");
  }, 100);
}
