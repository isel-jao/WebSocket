//// Server Side ////

// require express
var express = require("express");
var cors = require("cors");
var socket = require("socket.io");
// App setup
var app = express();

var server = app.listen(4000, function () {
  console.log("Listening requests on port 4000");
});

// Static files
app.use(express.static("public"));

// Socket setup
var io = socket(server, {
  cors: {
    origin: "*",
  },
});

const WhoIsTyping = new Set();

io.on("connection", function (socket) {
  console.log("made socket connection", socket.id);

  socket.on("chat-send", function (data) {
    io.sockets.emit("chat-reply", data);
  });
  socket.on("typing", function (data) {
    WhoIsTyping.add(data);
    socket.broadcast.emit("typing", [...WhoIsTyping]);
  });
  socket.on("done-typing", function (data) {
    WhoIsTyping.delete(data);
    socket.broadcast.emit("typing", [...WhoIsTyping]);
  });
});
