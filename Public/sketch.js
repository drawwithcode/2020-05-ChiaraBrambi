////variabili ////////////
let socket = io();
let myColor = 'white';
let pFriend;
let sfondoS;
let mioSpessoreMatita= 20;
let newPlayerSpessore;

////attivazione socket///////////////////////////////////////////////////////////////////////////////////////////////
//quando arriva il messaggio attiva la funzione
socket.on("connect", newConnection);
socket.on("mouseBroadcast", otherMouse);
socket.on("color", setColor);
socket.on('newPlayer', newPlayer);
socket.on('dimensioneMatita',othrSpessoreMatita);

////funzioni socket/////////////////////////////////////////////////////////////////////////////////////////////////////////
function setColor(assignedColor){
  myColor = assignedColor;
  }

  function otherSpessoreMatita(r){
  newPlayerSpessore = r;
  }


  function newConnection() {
    console.log("your id:", socket.id);
  }

  //quali info vuoi mandare tra i client?
  function otherMouse(data){
    push();
    noStroke();
    fill(data.color);
    ellipse(data.x, data.y,newPlayerSpessore);//data.r
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



function setup() {
    cnv = createCanvas(windowWidth, windowHeight);
    centerCanvas();

    let w = width/20;
    let h = height/20;
    ellipseMode(CORNER);
    frameRate(12);
    ///////immagine sfondo//////////
    image(sfondoS,w*3.5,h*2.5,sfondoS.width/1.2,sfondoS.height/1.2);
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

    //TESTO
    textAlign('center');
    text('the more friends you invite, the more colors you will have to complete the sketch', width-320,h*2.5,300);
    text("PENCIL'S THICKINESS", w*18,h*7);
    fill('#f8f8ff');

    text("Go Go Baby, Let's Color ;)", w*10,h);
    text('Draw with friend and reduce the stress!', w*3,h);
    text("Options", w*17.5,h);
    pop();

    //AGGIUNTA DI UN AMICO
    pFriend = createP('Draw with your friend and reduce the stress!');
    pFriend.style('font-size', '25px');
    pFriend.style('color', myColor);

    pMe= createP('Welcome>> you are: ' + myColor);
    pMe.style('font-size', '25px');
    pMe.style('color', myColor);

    //SLIDER
    slider = createSlider(0.1,50,10);
    slider.position(w*17,h*7.5);
    slider.style('width', '200px');
}

//funzione che regola me
function mouseDragged(){
  if (mouseX > width/20*3.5 && mouseX < width/20*15.5&& mouseY > height/20*2.5 && mouseY < height/20*19.5) {
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
}

function windowResized() {
  centerCanvas();
}
