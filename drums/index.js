document
  .querySelectorAll(".drum")
  .forEach((f) => f.addEventListener("click", handleClick(f.innerText)));

function handleClick(keyBinding) {
  var path = 'sounds/';
  switch(keyBinding){
    case 'w':
      path += 'crash.mp3';
      break;
    case 'a':
      path += 'kick-bass.mp3'
      break;
    case 's':
      path += 'snare.mp3'
      break;
    case 'd':
      path += 'tom-1.mp3'
      break;
    case 'j':
      path += 'tom-2.mp3'
      break;
    case 'k':
      path += 'tom-3.mp3'
      break;
    case 'l':
      path += 'tom-4.mp3'
      break;
    default:
      throw new Error('Key binding ' + keyBinding + " not managed by handler.")
  }
  var audio = new Audio(path);
  audio.play();
}
