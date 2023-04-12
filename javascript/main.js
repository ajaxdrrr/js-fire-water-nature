
const canvas = document.getElementById('canvas');
const context = canvas.getContext("2d");
const canvas2 = document.getElementById('canvas2');
const context2 = canvas2.getContext("2d");
let sc = document.querySelector(".sc");
let sy = document.querySelector(".sy");
let msgspan = document.querySelector(".message");
let glow = document.querySelector(".glow");
let glow2 = document.querySelector(".glow2");

let choice_you = "";
let choice_comp = "";
let random;
let msg = "";

let choices = [ "fire", "water", "earth" ];

let you_score = 0;
let comp_score = 0;

const width = canvas.width = canvas2.width = 250;
const height = canvas.height = canvas2.height = 250;

const idle_you = [
  "assets/img/1_IDLE_000.png",
  "assets/img/1_IDLE_001.png",
  "assets/img/1_IDLE_002.png",
  "assets/img/1_IDLE_003.png",
  "assets/img/1_IDLE_004.png"
];
const idle_comp = [
    "assets/img/enemy0.png",
    "assets/img/enemy1.png",
    "assets/img/enemy2.png",
    "assets/img/enemy3.png",
    "assets/img/enemy4.png"
  ];

const att_you = [

  "assets/img/5_ATTACK_000.png",
  "assets/img/5_ATTACK_001.png",
  "assets/img/5_ATTACK_002.png",
  "assets/img/5_ATTACK_003.png",
  "assets/img/5_ATTACK_004.png",

];

const die_you = [

  "assets/img/7_DIE_000.png",
  "assets/img/7_DIE_001.png",
  "assets/img/7_DIE_002.png",
  "assets/img/7_DIE_003.png",
  "assets/img/7_DIE_004.png"

];

const die_comp = [

  "assets/img/d1.png",
  "assets/img/d2.png",
  "assets/img/d3.png",
  "assets/img/d4.png",
  "assets/img/d5.png"

];

const win_you = [

  "assets/img/j1.png",
  "assets/img/j2.png",
  "assets/img/j3.png",
  "assets/img/j4.png",
  "assets/img/j5.png",

];

const win_comp = [

  "assets/img/4_JUMP_000.png",
  "assets/img/4_JUMP_001.png",
  "assets/img/4_JUMP_002.png",
  "assets/img/4_JUMP_003.png",
  "assets/img/4_JUMP_004.png",

]

let frameIndex = 0;
const frameCount = idle_you.length;
const fps = 12;
let lastTime = 0;

function animate() {

  context.clearRect(0, 0, width, height);
  context2.clearRect(0, 0, width, height);

  const img = new Image();
  const img2 = new Image();
  img.src = idle_you[frameIndex];
  img2.src = idle_comp[frameIndex];


  context.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        0,
        0,
        width,
        height
    );

    context2.drawImage(
        img2,
        0,
        0,
        img2.width,
        img2.height,
        0,
        0,
        width,
        height
    );

  const now = Date.now();
  const elapsed = now - lastTime;

  if (elapsed > 1000 / fps) {
    frameIndex++;
    if (frameIndex >= 5) {
      frameIndex = 0;
    }
    lastTime = now;
  }

  requestAnimationFrame(animate);

}


animate();

let fire = document.querySelector("#fire");
let water = document.querySelector("#water");
let earth = document.querySelector("#earth");
let f = document.querySelector("#shoot");
let modal = document.getElementById("myModal");
let modal2 = document.getElementById("myModal2");

let span = document.getElementsByClassName("close")[0];
let span2 = document.getElementsByClassName("close2")[0];

let history = document.querySelector("#history");

history.addEventListener("click", showHistory);

function showHistory() {
  modal2.style.display = "block";

  span2.onclick = function() {
    modal2.style.display = "none";
    animate();
  }

}

fire.addEventListener("click", Fire);
water.addEventListener("click", Water);
earth.addEventListener("click", Earth);
f.addEventListener("click", fight)

function Fire() {

  glow.src = "assets/img/fire.png";
  glow2.src = "assets/img/firemuted.png";
  choice_you = fire.value;
  randomize();
  animate();
  choice_comp = choices[random];

}

function Water() {

  glow.src = "assets/img/water.png";
  glow2.src = "assets/img/watermuted.png";
  choice_you = water.value;
  randomize();
  animate();
  choice_comp = choices[random];

}

function Earth() {

  glow.src = "assets/img/earth.png";
  glow2.src = "assets/img/earthmuted.png";
  choice_you = earth.value;
  randomize();
  animate();
  choice_comp = choices[random];

}

function fight() {

  modal.style.display = "block";

  span.onclick = function() {
    modal.style.display = "none";
    animate();
  }

  if(choice_you === "") {

      msgspan.innerHTML = "Please choose an attack type";
      msgspan.style.color = "red"

  } else {

    console.log("You: "+choice_you+" Computer: "+choice_comp);

    if ( (choice_you === "fire" && choice_comp === "earth") || (choice_you === "water" && choice_comp === "fire") || (choice_you === "earth" && choice_comp === "water")) {

      msgspan.innerHTML = "You Win!";
      msgspan.style.color = "green"
      you_score++;
      glow2.src = "assets/img/"+choice_comp+".png";
      attack();
      sy.innerHTML = you_score;
      var x = "WIN";
      var y = "LOSE";
      addHistory(x, y);
      
      
    choice_comp = "";
    choice_you = "";
    } else if (choice_you === choice_comp) {
  
      msgspan.innerHTML = "It's a DRAW!";
      msgspan.style.color = "blue"
      glow2.src = "assets/img/"+choice_comp+".png";
      dz();
      var x = "DRAW";
      var y = "DRAW";
      addHistory(x, y);
  
      choice_comp = "";
      choice_you = "";
    } else {
  
      msgspan.innerHTML = "Computer Win!";
      msgspan.style.color = "red"
      glow2.src = "assets/img/"+choice_comp+".png";
      die();
      comp_score++;
      var x = "LOSE";
      var y = "WIN";
      addHistory(x, y);
      sc.innerHTML = comp_score;
      choice_comp = "";
      choice_you = "";
    }



  }
    

}

function die() {

  context.clearRect(0, 0, width, height);
  context2.clearRect(0, 0, width, height);

  const img5 = new Image();
  const img6 = new Image();
  img5.src = die_you[frameIndex];
  img6.src = win_comp[frameIndex];


  context.drawImage(
        img5,
        0,
        0,
        img5.width,
        img5.height,
        0,
        0,
        width,
        height
    );

    context2.drawImage(
        img6,
        0,
        0,
        img6.width,
        img6.height,
        0,
        0,
        width,
        height
    );

  const now = Date.now();
  const elapsed = now - lastTime;

  if (elapsed > 1000 / fps) {
    frameIndex++;
    if (frameIndex >= 5) {
      frameIndex = 0;
    }
    lastTime = now;
  }

  requestAnimationFrame(die);
}

function dz() {

  context.clearRect(0, 0, width, height);
  context2.clearRect(0, 0, width, height);

  const img3 = new Image();
  const img4 = new Image();
  img3.src = die_you[frameIndex];
  img4.src = die_comp[frameIndex];


  context.drawImage(
        img3,
        0,
        0,
        img3.width,
        img3.height,
        0,
        0,
        width,
        height
    );

    context2.drawImage(
        img4,
        0,
        0,
        img4.width,
        img4.height,
        0,
        0,
        width,
        height
    );

  const now = Date.now();
  const elapsed = now - lastTime;

  if (elapsed > 1000 / fps) {
    frameIndex++;
    if (frameIndex >= 5) {
      frameIndex = 0;
    }
    lastTime = now;
  }

  requestAnimationFrame(dz);

}

function attack() {

  context.clearRect(0, 0, width, height);
  context2.clearRect(0, 0, width, height);

  const img3 = new Image();
  const img4 = new Image();
  img3.src = win_you[frameIndex];
  img4.src = die_comp[frameIndex];


  context.drawImage(
        img3,
        0,
        0,
        img3.width,
        img3.height,
        0,
        0,
        width,
        height
    );

    context2.drawImage(
        img4,
        0,
        0,
        img4.width,
        img4.height,
        0,
        0,
        width,
        height
    );

  const now = Date.now();
  const elapsed = now - lastTime;

  if (elapsed > 1000 / fps) {
    frameIndex++;
    if (frameIndex >= 5) {
      frameIndex = 0;
    }
    lastTime = now;
  }

  requestAnimationFrame(attack);

}

function randomize() {

  random = Math.round(Math.random() * 2);

  return random;

}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  } else if (event.target == modal2) {
    modal2.style.display = "none";
  }
}

function addHistory(x,y) {

  var ul = document.querySelector(".matches");

  let newLi = document.createElement('li');
  let newDiv = document.createElement('div');
  let newSpan = document.createElement('span');
  let strong1 = document.createElement('strong');
  let newImage = document.createElement('img');
  let newImage2 = document.createElement('img');
  let newSpan2 = document.createElement('span');
  let strong2 = document.createElement('strong');

  newDiv.setAttribute("class", "d-flex justify-content-center align-item-center gap-3");
  
  if(x == "LOSE") {

    newSpan.setAttribute("class", "text-danger p-2");

  } else if(x == "WIN") {

    newSpan.setAttribute("class", "text-success p-2");

  } else {

    newSpan.setAttribute("class", "text-primary p-2");

  }

  newSpan.setAttribute("id", "thisisx");
  strong1.innerHTML = x;
  newImage.setAttribute("src","assets/img/"+`${choice_you}`+".png");
  newImage2.setAttribute("src","assets/img/"+`${choice_comp}`+".png");
  newImage.setAttribute("class", "emzh");
  newImage2.setAttribute("class", "emzh");
  newImage.setAttribute("id", "emzh");
  newImage2.setAttribute("id", "emzh");

  if(y == "LOSE") {

    newSpan2.setAttribute("class", "text-danger p-2");
    
  } else if(y == "WIN") {

    newSpan2.setAttribute("class", "text-success p-2");

  } else {

    newSpan2.setAttribute("class", "text-primary p-2");

  }

  strong2.innerHTML = y;

  ul.appendChild(newLi);
  newLi.appendChild(newDiv);
  newDiv.appendChild(newSpan);
  newSpan.appendChild(strong1);
  newDiv.appendChild(newImage);
  newDiv.appendChild(newImage2);
  newDiv.appendChild(newSpan2);
  newSpan2.appendChild(strong2);

}