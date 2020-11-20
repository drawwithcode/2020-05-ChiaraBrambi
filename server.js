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
