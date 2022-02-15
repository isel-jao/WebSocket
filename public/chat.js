//// Client Side ////

// make connection
var socket = io.connect("http://localhost:4000");

handle = document.getElementById("handle");
btn = document.getElementById("send");
message = document.getElementById("message");
output = document.getElementById("output");
feedback = document.getElementById("feedback");

// Emit events

btn.addEventListener("click", function () {
  console.log("clicked");
  socket.emit("chat", {
    message: message.value,
    handle: handle.value,
  });
});

message.addEventListener("keypress", function () {
  console.log("keypress");
  socket.emit("typing", handle.value);
});

// Listen for events
socket.on("chat", function (data) {
  output.innerHTML +=
    "<p><strong>" + data.handle + ": </strong>" + data.message + "</p>";
});
socket.on("typing", function (data) {
  feedback.innerHTML =
    "<p><strong>" + data + " </strong> is typing </p>" ;
});
