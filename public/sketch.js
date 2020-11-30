//https://assignement05chiara.herokuapp.com/

////variabili ////////////
let socket = io();
let myColor;
let pFriend;
let sfondoS;
let mioSpessoreMatita= 20;

let colorP;
let pMe;
var cnv;
let slider,slider2;
let firstColor;
let myOpacity;
////attivazione socket///////////////////////////////////////////////////////////////////////////////////////////////

//quando arriva il messaggio attiva la funzione
socket.on("connect", newConnection);
socket.on("mouseBroadcast", otherMouse);
socket.on("color", setColor);
socket.on('newPlayer', newPlayer);

////Funzioni socket/////////////////////////////////////////////////////////////////////////////////////////////////////////
function setColor(assignedColor){
  myColor = assignedColor;
  firstColor = myColor;

  }

  function newConnection() {
    console.log("your id:", socket.id);
  }
let c;
//quali info vuoi mandare tra i client?
  function otherMouse(data){
    push();
    c = color(data.color, data.opacity);
    //c.setAlpha(data.opacity);
    fill(c);
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
    slider = createSlider(2,50,20);
    slider.position(w*16,h*7.8);
    slider.style('width', '200px');
    slider.style('height', '3px');

    //SLIDER2
    slider2 = createSlider(0.2,255,255);
    slider2.position(w*16,h*10);//w*15.3,h*6,w*3.5
    slider2.style('width', '200px');
    slider2.style('height', '3px');

    //color myColorPicker
    colorP = createColorPicker();
    colorP.position(w*17.5,h*17);
    colorP.style("width", "100px");
    colorP.value(myColor);

  //  colorP.setAlpha(128);
}

//funzione che regola me
function mouseDragged(){
  if (mouseX > width/20*4 && mouseX < width/20*14.5 && mouseY > height/20*3 && mouseY < height/20*19) {
    push();
    myColor = color(myColor);
    myColor.setAlpha(myOpacity);
        fill(myColor);
        ellipse(mouseX, mouseY,mioSpessoreMatita );
      pop();
        let message ={
          x: mouseX,
          y: mouseY,
          color: myColor,
          size: mioSpessoreMatita,
          opacity: myOpacity,
        }
      //sand to the server
      socket.emit("mouse", message);
      }
}

let erase = 0;
///////////inizio draw ////////////////////////////////////////////////
function draw() {
mioSpessoreMatita = slider.value();
myOpacity = slider2.value();

if (erase== 1){
  colorP.value('#f8f8ff');
  erase = 0;
}else{
  myColor = colorP.value();
}

///////immagine sfondo//////////
image(sfondoS,w*5,h*4,sfondoS.width/3,sfondoS.height/3);

push();
noStroke();
fill( '#f8f8ff');
rect( width-350,0,350,h*19, 0,0,20,20);
noStroke();
textSize(17);
textFont('Schoolbell');
textAlign(LEFT);

rectMode(CORNER);
fill(firstColor);
text("- Press ' S ' to SAVE your Masterpiece!  ", w*15.8,h*4,w*3.8);
text("- Press ' E ' to ERASE your Emotions.  ", w*15.8,h*5.5,w*3.5);
text("- Pencil  SIZE regulator. ", w*15.8,h*7,w*3.5);
text("- Pencil  OPACITY regulator. ", w*15.8,h*9.2,w*3.8);
text("- More friends you invite, more colors you'll have !", w*15.8,h*12,w*3.8);
text("- If you don't have friends, you can choose your color", w*15.8,h*15.5,w*3.5);
text(" Change color -->",w*15.8,h*17.5);

textAlign('center');
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
    if (key == 'e' || key == 'E') {
      erase=1;
      }
  }

function windowResized() {
  centerCanvas();
}
