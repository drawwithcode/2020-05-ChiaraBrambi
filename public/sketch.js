////variabili ////////////
let socket = io();
let myColor = 'white';
let pFriend;
let sfondoS;
let mioSpessoreMatita= 20;
let newPlayerSpessore;
let myColorPicker;


////attivazione socket///////////////////////////////////////////////////////////////////////////////////////////////
//quando arriva il messaggio attiva la funzione
socket.on("connect", newConnection);
socket.on("mouseBroadcast", otherMouse);
socket.on("color", setColor);
socket.on('newPlayer', newPlayer);
socket.on('dimensioneMatita',otherSpessore);
//socket.on('cambio',newMyColor);

////funzioni socket/////////////////////////////////////////////////////////////////////////////////////////////////////////


function setColor(assignedColor){
  myColor = assignedColor;
  }

  function otherSpessore(r){
  newPlayerSpessore = r;
  }

  // function newMyColor(newCol){
  //   myColor=newCol;
  // }

  function newConnection() {
    console.log("your id:", socket.id);
  }

  //quali info vuoi mandare tra i client?
  function otherMouse(data){
    push();
    noStroke();
    fill(data.color);
    ellipse(data.x, data.y,newPlayerSpessore);
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
let pMe;
var cnv;
let slider;


function preload(){
    sfondoS = loadImage('sfondo.png');}

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
    ///////immagine sfondo//////////
    image(sfondoS,w*4,h*4,sfondoS.width/1.6,sfondoS.height/1.6);

    push();
    textSize(25);
    textFont('Schoolbell');
    fill(myColor);
    //TESTO
    textAlign('center');
    text('-The more friends you invite, the more colors you will have to complete the sketch', w*16,h*3,w*3.5);
    text("PENCIL'S THICKINESS", w*17.8,h*8.5);
    text("-If you do't have freinds, you can choose your color", w*16,h*11,w*3.5);
    text("-->",w*17.3,h*14.3);
    pop();

    //AGGIUNTA DI UN AMICO
    pFriend = createP('Uuu easter Egg');
    pFriend.style('font-size', '25px');
    pFriend.style('color', myColor);

    pMe= createP('Welcome>> you are: ' + myColor);
    pMe.style('font-size', '25px');
    pMe.style('color', myColor);

    //SLIDER
    slider = createSlider(0.1,50,10);
    slider.position(w*16.5,h*9.2);
    slider.style('width', '200px');

    //color myColorPicker
    //myColorPicker = createColorPicker(myColor);
  //  myColorPicker.position(w*18,h*12.5);
}

//funzione che regola me
function mouseDragged(){
  if (mouseX > width/20*3.7 && mouseX < width/20*15.7 && mouseY > height/20*2.5 && mouseY < height/20*19.5) {
        noStroke();
        fill(myColor);
        ellipse(mouseX,mouseY,mioSpessoreMatita);
        let message ={
          x: mouseX,
          y: mouseY,
          color: myColor,
        }
      //sand to the server
      socket.emit("mouse", message);

      }

}


function draw() {
mioSpessoreMatita = slider.value();
let sliderValue = mioSpessoreMatita;
socket.emit("spessore",sliderValue);

// myColor = myColorPicker.color();
// let newColor = myColor;
// socket.emit("cambioColore",newColor);


push();
noStroke();
textSize(25);
textFont('Schoolbell');
textAlign('center');
rectMode(CORNER);
noStroke();
fill(myColor);
//RETTANGOLI
rect( 0,0,w*6.3,80,0,0,20,20);
    rect( width-350,0,350,80, 0,0,20,20);
if(mouseIsPressed){
  rect( w*8,0,w*4,80,0,0,20,20);
  fill('#f8f8ff');
  text("You're coloring very well!",  w*10,h*1.2);
}else{
  rect( w*8,0,w*4,80,0,0,20,20);
  fill('#f8f8ff');
  text("Come on let's color!",  w*10,h*1.2);
}
text('Draw with friend and reduce the stress!', w*3,h*1.2);
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
