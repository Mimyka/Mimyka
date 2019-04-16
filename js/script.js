// Compatibility

// Taking from http://detectmobilebrowsers.com/
var isMobileDevice = (function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
})();

if (isMobileDevice) {
  document.body.classList.add('mobile');
}

// VAR INIT
var app = document.getElementsByClassName('app')[0];

var sections = {
  nodeList: document.getElementsByClassName('section'),
  actual: 0,
  right: 'right',
  left: 'left',
  forceMoving: false,
  actualise: function() {
    character.sectionTransition();

    for (var i = 0; i < sections.nodeList.length; i++) {
      if (sections.actual == i) {
        sections.nodeList[i].classList.add('active');
      }else{
        if (sections.nodeList[i].classList.contains('active')) {
          sections.nodeList[i].classList.remove('active');
        }
      }
    }

    if (typeof window.scrollTo === 'function') {
      window.scrollTo(0, 0);
    }

    character.moving = true;
    setTimeout(character.setTransition, 32);
  },
  move: function(d) {
    if(d === sections.right){
      sections.actual = (sections.actual >= sections.nodeList.length-1)? 0 : sections.actual+1;
    }
    else if(d === sections.left){
      sections.actual = (sections.actual <= 0)? sections.nodeList.length-1 : sections.actual-1;
    }
    if (sections.forceMoving) {
      setTimeout(function(){
        control.reset();
        sections.forceMoving = false;
      },500);
    }
    sections.actualise();
  },
  forceMove: {
    right: function(){
      sections.forceMoving = true;
      control.right = true;
    },
    left: function(){
      sections.forceMoving = true;
      control.left = true;
    }
  }
};

var character = {
  node: document.getElementsByClassName("character")[0],
  pos: {x: 50, y: 0},
  speed: {x: 0.7, y: 25},
  direction: "left",
  tmp: {},
  moving: false,
  jumping: false,
  inMoveFrame: false,
  inJumpFrame: false,
  jumpDelay: 250,
  setTransition: function(){
    character.node.classList.add('transition');
  },
  sectionTransition: function(){
    if (character.node.classList.contains('transition')) {
      character.node.classList.remove('transition');
    }
  },
  moveFrame: function(){
    if (!character.inMoveFrame) {
      character.inMoveFrame = true;

      setTimeout(function() {
        character.node.classList.add('walk-1');
        setTimeout(function() {
          if (character.node.classList.contains('walk-1')) {
            character.node.classList.remove('walk-1');
          }
          character.node.classList.add('walk-2');
        }, 100);
      }, 100);

      setTimeout(function() {
        if (character.node.classList.contains('walk-1')) {
          character.node.classList.remove('walk-1');
        }
        if (character.node.classList.contains('walk-2')) {
          character.node.classList.remove('walk-2');
        }
        character.inMoveFrame = false;
      }, 300);
    }
  },
  jumpFrame: function(){
    if (!character.inJumpFrame) {
      character.inJumpFrame = true;
      character.node.classList.add('jump');
      setTimeout(function(){
        if (character.node.classList.contains('jump')) {
          character.node.classList.remove('jump');
        }
        setTimeout(function(){
          character.inJumpFrame = false;
        },character.jumpDelay);
      }, 150);
    }
  },
  paint: function(){
    if (character.moving) {
      character.node.style.left = character.pos.x + "%";
      if (!character.jumping) {
        character.moveFrame();
      }
      character.moving = false;
    }

    if (character.jumping) {
      character.node.style.bottom = character.pos.y + "%";
      character.jumpFrame();
    }
  },
  orientation : function(d){
    if (d !== "left" && d !== "right") {
      return;
    }
    if (character.direction !== d) {
      character.direction = d;
      character.tmp.inverseDirection = (d == "left")? "right" : "left";
      if (character.node.classList.contains('direction--'+character.tmp.inverseDirection)) {
        character.node.classList.remove('direction--'+character.tmp.inverseDirection);
      }
      character.node.classList.add('direction--'+character.direction);
    }
  },
  move : {
    right: function(){
      character.moving = true;
      character.orientation("right");
      character.pos.x += character.speed.x;
      character.checkPosition();
    },
    left: function(){
      character.moving = true;
      character.orientation("left");
      character.pos.x -= character.speed.x;
      character.checkPosition();
    },
    up: function(){
      if (!character.jumping) {
        character.jumping = true;
        character.pos.y += character.speed.y;
        setTimeout(function(){
          character.pos.y -= character.speed.y;
          setTimeout(function(){
            character.jumping = false;
          },character.jumpDelay);
        },150);
      }
    },
    down: function(){
      if (!character.jumping) { // in waiting of draw
        character.jumping = true;
        setTimeout(function(){
          character.jumping = false;
        },character.jumpDelay);
      }
    }
  },
  checkPosition: function(){
    if(character.pos.x > 97.5){
      sections.move(sections.right);
      character.pos.x = 2.5;
    }else if(character.pos.x < 2.5){
      sections.move(sections.left);
      character.pos.x = 97.5;
    }
  }
};

var control = {
  up : false,
  left: false,
  down: false,
  right: false,
  reset: function(){
    control.up = false;
    control.left = false;
    control.down = false;
    control.right = false;
  }
};

// Init

if (isMobileDevice) {
  window.requestAnimationFrame = function(callback){
    setTimeout(callback, 160);
  };
  character.speed.x = 5;
}else{
  window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function(callback){setTimeout(callback, 17);};
}

character.setTransition();

// Functions

function keyboardManager(k, b) {
  switch (k) {
      case "ArrowLeft":
      case "KeyA":
      case "KeyH":
      case "q":
      case "h":
        control.left = b;
      break;
      case "ArrowRight":
      case "KeyD":
      case "KeyL":
      case "d":
      case "l":
        control.right = b;
      break;
      case "ArrowUp":
      case "KeyW":
      case "Spacebar":
      case "KeyK":
      case "z":
      case " ":
      case "k":
        control.up = b;
      break;
      case "ArrowDown":
      case "KeyS":
      case "KeyJ":
      case "s":
      case "j":
        control.down = b;
      break;
      default:
  }
}

// Event

document.getElementsByClassName('doorL')[0].onclick = function() {
  sections.forceMove.left();
};
document.getElementsByClassName('doorR')[0].onclick = function() {
  sections.forceMove.right();
};

window.onscroll = function(e){
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    app.classList.add('shrink');
  } else {
    if (app.classList.contains('shrink')) {
      app.classList.remove('shrink');
    }
  }
}

// Mapping

window.onkeydown = function(e) {
    e.key = e.key || e.code;
    keyboardManager(e.key, true);
};

window.onkeyup = function(e) {
    e.key = e.key || e.code;
    keyboardManager(e.key, false);
};

// Gameloop

function gameloop(){
  if (control.left && control.right) {
    control.reset();
    sections.forceMoving = false;
  }

  if (control.left) {
    character.move.left();
  }

  if (control.up) {
    character.move.up();
  }

  if (control.right) {
    character.move.right();
  }

  if (control.down) {
    character.move.down();
  }

  character.paint();

  requestAnimationFrame(gameloop);
}

gameloop();

// Miscellaneous

var subtitle = document.getElementById('dynamic-subtitle');
var subtitles = [
  'a web developper',
  'a mad scientist    !',
  'sample text',
  'todo: put a subtitle',
];
var last, actual;

function changeSubtitle() {
  do {
    actual = Math.floor(Math.random()*subtitles.length);
  } while (last === actual);
  wrote(subtitle, subtitles[actual], changeSubtitle);
  last = actual;
}

function wrote(target, text, callback, i){
  i = i || 1;
  if (i <= text.length) {
   target.innerHTML = text.substring(0, i);
    setTimeout(function() {
      wrote(target, text, callback, i + 1)
    }, 50+150*Math.random());
  }else if (typeof callback === 'function') {
    setTimeout(callback, 2500);
  }
}

changeSubtitle();
