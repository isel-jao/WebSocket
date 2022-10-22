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
  socket.emit("chat-send", {
    message: message.value,
    handle: handle.value,
  });
  message.value = "";
  socket.emit("done-typing", handle.value);
});

message.addEventListener("keypress", function () {
  console.log("keypress");
  socket.emit("typing", handle.value);
});

// Listen for events
socket.on("chat-reply", function (data) {
  output.innerHTML +=
    "<p><strong>" + data.handle + ": </strong>" + data.message + "</p>";
});
socket.on("typing", function (data) {
  if (data.length === 0) feedback.innerHTML = "";
  else
    feedback.innerHTML =
      "<p>" +
      data
        .map((name) => "<strong>" + name + " </strong> is typing")
        .join(", ") +
      "</p>";
});
