console.log("node is running")
//load expression
let express = require("express");
//web app, local host
let app = express();
let port = 3000;
let server = app.listen(port);
app.use(express.static("public"));
// carica libreria socket attraverso command promt
let socket = require("socket.io");
// una nuova var create a socket connection
let io = socket(server);

let clientColor= getRandomColor();

io.on("connection", newConnection);
io.emit("hello", "world");//a tutti i client compreso me stesso.

function newConnection(socket){//funzione che si attiva ogni volta che c'è una nuova connessione
console.log("new connection: " + socket.client.id);

socket.on("mouse",mouseMessage);
function mouseMessage(dataRecived){
  console.log(socket.client.id, dataRecived);//lo visualizzo nel commondo prompt
  socket.broadcast.emit("mouseBroadcast", dataRecived);//lo manda a tutti i client tranne a me
  }

}
function getRandomColor(){
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i=0; i<6; i++){
    color+= letters[Math.floor(Math.random()*16)];
    }
    return color;
}
