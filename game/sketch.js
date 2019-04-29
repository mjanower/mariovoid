var spriteSheet;
var spriteSheet2;
var mario = [];
var bowser =[];
var running;
var jumping;
var mX;
var mY;
var gravity;
var mV;
var div;
var div2;
var groundPlane;
var facingRight;
var started;
var player;
var i = 30;
var elem = document.documentElement;

function preload(){
  spriteSheet = loadImage('assets/mario.png');
  spriteSheet2 = loadImage('assets/bowser.png');
  myFont = loadFont('assets/Pixel_Emulator.woff');
}

function setup() {
  createCanvas(window.innerWidth,window.innerHeight);
  mario = loadMario(spriteSheet);
  bowser = loadBowser(spriteSheet2);
  player = mario;
  //player = bowser;
  started = false;
  running = false;
  jumping = false;
  facingRight = true;
  mX = 0;
  mY = 0;
  mV = 0;
  gravity = 2;
  groundPlane = height - 250;

  frameRate(30);
  noLoop();
}

function draw() {
  if (started) {
    background(0);
    // put drawing code here

    if (facingRight == true) {

      scale(1,1);
    }
    if (facingRight == false) {
      scale(-1,1);
      translate(-width+(player[0].width),0);
    }

    if (running == true ) {
      var frame = frameCount%9;
      if(mY < groundPlane ) {
        image(player[4],(width/2) -(player[0].width + mX),0+mY);
      } else {
        image(player[1+floor(frame/3)],(width/2) -(player[0].width + mX),0+mY);
      }

      if(mX > width) {
        mX = 0;
      }
    }
    else {

      if(mY < groundPlane ) {
        image(player[4],width/2 -player[0].width + mX,0+mY);
      } else {
        image(player[0],width/2 -player[0].width+mX,0+mY);
      }

    if (jumping === true) {
      mV = -20;
      mY += mV;
      jumping = false;
    }

    if(mY < groundPlane ) {
      mV += gravity;
      mY += mV;
    }
    else {
      mV = 0;
    }
  }
}
}

function loadMario(SpriteS) {
  var tmp = [];
  tmp.push(SpriteS.get(80,1,16,32));
  tmp.push(SpriteS.get(80+17,1,16,32));
  tmp.push(SpriteS.get(80+17*2,1,16,32));
  tmp.push(SpriteS.get(80+17*3,1,16,32));
  tmp.push(SpriteS.get(80+17*5,1,16,32));

  return tmp;
}

function loadBowser(SpriteS) {
  var tmp = [];
  tmp.push(SpriteS.get(2,211,32,32));
  tmp.push(SpriteS.get(2+40,211,32,32));
  tmp.push(SpriteS.get(2+40*2,211,32,32));
  tmp.push(SpriteS.get(2+40*3,211,32,32));
  tmp.push(SpriteS.get(2+40*5,211,32,32));

  return tmp;
}

function keyPressed() {

  if (keyCode === RIGHT_ARROW) {
    running = true;
    facingRight = true;
  }

  if (keyCode === 32) {
    console.log("UP");

    if (player == mario) {
      player = bowser;
    }
    else {
      player = mario;
    }

  }

  if (keyCode === LEFT_ARROW) {
    running = true;
    facingRight = false;
  }

  if (keyCode === UP_ARROW) {
    if (mY >= groundPlane ) {
      jumping = true;
    }
  }

  if(keyCode === 13 ) {

    if (started == false) {
      started = true;
      console.log("enterpressed");

      var div = document.getElementById("everything");
      div.style.display = "none";
      resizeCanvas(window.innerWidth,window.innerHeight);
      var div2 = document.getElementById("ingame");
      div2.style.display = "block";
      resizeCanvas(window.innerWidth,window.innerHeight);
      loop();
      setInterval(loadGO, 30*1000);
      setInterval(ct, 1000);
    }
  }
}



function keyReleased() {
  if (keyCode === LEFT_ARROW) {
    running = false;
  }
  if (keyCode === RIGHT_ARROW) {
    running = false;
  }
}


function loadGO() {
  window.location.href = 'end.html';
}

function ct() {
    document.getElementById("displayDiv").innerHTML = "Time Remaining: " + i;
    if (i === 0) {
        clearInterval(myInterval);
        //call your function
    }
    else {
        i--;
       }
    }
function countDown() {
  if (started=true){

var myinterval = setInterval(ct,20*1000);
  }
}

function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen();
  }
}
