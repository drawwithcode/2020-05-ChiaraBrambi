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

io.on("connection", newConnection);//quando cè un messaggio connection richiama la funzione

function newConnection(socket) {
console.log("new connection: " + socket.client.id);
socket.on("mouse",mouseMessage);

function mouseMessage(dataRecived){
  console.log(socket.client.id, dataRecived);
  //per rimandare al client
  socket.broadcast.emit("mouseBroadcast", dataRecived);//lo manda a tutti tranne te
  }
}
