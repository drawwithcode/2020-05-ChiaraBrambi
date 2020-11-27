//https://assignement05chiara.herokuapp.com/
////variabili ////////////
let socket = io();
let myColor = 'white';
let pFriend;
let sfondoS;
let mioSpessoreMatita= 20;

let colorP;
let pMe;
var cnv;
let slider;

////attivazione socket///////////////////////////////////////////////////////////////////////////////////////////////

//quando arriva il messaggio attiva la funzione
socket.on("connect", newConnection);
socket.on("mouseBroadcast", otherMouse);
socket.on("color", setColor);
socket.on('newPlayer', newPlayer);

////Funzioni socket/////////////////////////////////////////////////////////////////////////////////////////////////////////
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
    ellipse(data.x, data.y,data.size);
    pop();
  }

let newFriend;
  function newPlayer(newPlayerColor){
    console.log(newPlayerColor);
    //testo NUOVO GIOCATORE
    newFriend = createP('new friend joined: ' + newPlayerColor);
    newFriend.style('color', newPlayerColor);
  }

////inizio sketch/////////////////////////////////////////////////////////////////////////////////////////////////////////
function preload(){
    sfondoS = loadImage('disegnini.png');
    //back = loadImage('background.png');
  }

  function centerCanvas() {
      var q = (windowWidth - width) / 2;
      var s = (windowHeight - height) / 2;
        cnv.position(q, s);
      }

let w, h;
function setup() {
    cnv = createCanvas(windowWidth, windowHeight);
    centerCanvas();
    w = width/20;
    h = height/20;
    ellipseMode(CORNER);

    frameRate(12);
    fill('#f8f8ff');
    noStroke();
    rect( w*4.5,h*3.5,w*10,h*19,20);
    //AGGIUNTA DI UN AMICO
    pFriend = createP('Uuu easter Egg');
    pFriend.style('font-size', '25px');
    pFriend.style('color', myColor);

    pMe= createP('👋 Welcome>> you are: ' + myColor);
    pMe.style('font-size', '25px');
    pMe.style('color', myColor);

    //SLIDER
    slider = createSlider(0.1,50,10);
    slider.position(w*16.5,h*9.2);
    slider.style('width', '200px');

    //color myColorPicker
    colorP = createColorPicker();
    colorP.position(w*17.5,h*13);
    colorP.style("width", "70px");
    colorP.value(myColor);
}

//funzione che regola me
function mouseDragged(){
  if (mouseX > width/20*5 && mouseX < width/20*15.3 && mouseY > height/20*4 && mouseY < height/20*19.5) {
        noStroke();
        fill(myColor);
              ellipse(mouseX,mouseY,mioSpessoreMatita);
        let message ={
          x: mouseX,
          y: mouseY,
          color: myColor,
          size: mioSpessoreMatita,
        }
      //sand to the server
      socket.emit("mouse", message);
      }
}
///////////inizio draw ////////////////////////////////////////////////
function draw() {
mioSpessoreMatita = slider.value();
myColor = colorP.value();
///////immagine sfondo//////////
//image(back,w*10,h*10);
image(sfondoS,w*5,h*4,sfondoS.width/3,sfondoS.height/3);

push();
noStroke();
fill( '#f8f8ff');
rect( width-350,0,350,h*19, 0,0,20,20);
noStroke();
textSize(23);
textFont('Schoolbell');
textAlign('center');
rectMode(CORNER);
fill(myColor);
text('-The more friends you invite, the more colors you will have to complete the sketch  (•◡•) ', w*16,h*4,w*3.5);
text("PENCIL'S THICKINESS", w*17.8,h*8.5);
text("-If you do't have freinds, you can choose your color", w*16,h*11,w*3.5);
text("-->",w*17,h*13.5);
text("- Press ' S ', If you want   to save your Masterpice!  ", w*16,h*14.5,w*3.5);

textSize(25);
//RETTANGOLI
rect( 0,0,w*6.3,80,0,0,20,20);
    rect( width-350,0,350,80, 0,0,20,20);
if(mouseIsPressed){
  rect( w*7.8,0,w*4.3,80,0,0,20,20);
  fill('#f8f8ff');
  text("You're coloring very well ✌",  w*10,h*1.2);
}else{
  rect( w*7.8,0,w*4.3,80,0,0,20,20);
  fill('#f8f8ff');
  text("Color your Moods!",  w*10,h*1.2);
}
text('Draw with friends and reduce the stress!', w*3,h*1.2);
text("Options...", w*16.8,h*1.2);
pop();

}

function keyReleased() {
  if (key == 's' || key == 'S') {
    save('cover.png');
    }
  }

function windowResized() {
  centerCanvas();
}
