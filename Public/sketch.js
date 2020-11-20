let socket = io();
//quando arriva il messaggio attiva la funzione
socket.on("connect", newConnection);

function newConnection() {
  console.log("your id:", socket.id);
}

function preload(){}

function setup() {
  createCanvas(windowWidth,windowHeight);
  background(120);
}

function draw() {}

function mouseMoved(){
  ellipse(mouseX,mouseY,20);
  let message ={
    x: mouseX,
    y:mouseY,
  };
//sand to the server
socket.emit("mouse", message);
}
