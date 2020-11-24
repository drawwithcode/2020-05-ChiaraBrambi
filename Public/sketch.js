let socket = io();
let myColor = 'white';
let pFriend;
let sfondoS;

//quando arriva il messaggio attiva la funzione
socket.on("connect", newConnection);
socket.on("mouseBroadcast", otherMouse);
socket.on("color", setColor);
socket.on('newPlayer', newPlayer);

function setColor(assignedColor){
  myColor = assignedColor;
  }

  function newConnection() {
    console.log("your id:", socket.id);
  }

  //quali info vuoi mandare tra i client?
  function otherMouse(data){
    push();
    noStroke();
    fill(data.color);
    ellipse(data.x, data.y,20);
    pop();
  }

let newFriend;
  function newPlayer(newPlayerColor){
    console.log(newPlayerColor);

    //testo
    newFriend = createP('new friend joined: ' + newPlayerColor);
    newFriend.style('color', newPlayerColor);

  }
  function preload(){
    sfondoS = loadImage('sfondo.png');
  }


var cnv;
function centerCanvas() {
var q = (windowWidth - width) / 2;
var s = (windowHeight - height) / 2;
cnv.position(q, s);
}

let pMe;
function setup() {
    cnv = createCanvas(windowWidth, windowHeight);

    centerCanvas();
    ellipseMode(CORNER);
    frameRate(12);
    imageMode(CENTER);
    image(sfondoS,width/2,height/5*2.8,sfondoS.width/1.2,sfondoS.height/1.2);///////////////////immagine sfondo//////////
    push();
    textSize(30);
    textFont('Schoolbell');
    rectMode(CORNER);

    noStroke();
    fill(myColor);
//RETTANGOLI
    rect( 0,0,600,80,0,0,20,20);//rect(x,y,w,h,[tl],[tr],[br],[bl])
      rect( width/2-175,0,350,80,0,0,20,20);//rect(x,y,w,h,[tl],[tr],[br],[bl])
        rect( width-350,0,350,80, 0,0,20,20);
  textAlign('center');
    text('the more friends you invite, the more colors you will have to complete the sketch', width-320,100,300);
    fill('#f8f8ff');

    text("Go Go Baby, Let's draw ;)", width/2,height/19);
    text('Draw with friend and reduce the stress!', width/7,height/19);


    //text("Let's finish color it together <3", width/2,height/20);
    //text('Draw with your friend and reduce the stress!', width/2,height/1.95);
    pop();
//testo iniziale
    pFriend = createP('Draw with your friend and reduce the stress!');
    pFriend.style('font-size', '25px');
    pFriend.style('color', myColor);

    pMe= createP('Welcome>> you are: ' + myColor);
    pMe.style('font-size', '25px');
    pMe.style('color', myColor);

}

//funzione che regola me
function mouseDragged(){
  noStroke();
  fill(myColor);
  ellipse(mouseX,mouseY,20);
  let message ={
    x: mouseX,
    y: mouseY,
    color: myColor,
  }
//sand to the server
socket.emit("mouse", message);
}

function draw() {
}


function windowResized() {
  centerCanvas();
}
