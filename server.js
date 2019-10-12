// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================

var express = require("express");

// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================

// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. We"ll use this later in our listener

var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/public", express.static(__dirname + "/public"));
// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================

// require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================
var serv = require('http').createServer(app);

serv.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});

var socket = {};

var io = require('socket.io')(serv, {});

var SOCKET_LIST = {};

io.sockets.on('connection', function(socket) {
  console.log('socket connection');
  socket.id = Math.random();
  socket.x = 20;
  socket.y = 480;
  SOCKET_LIST[socket.id] = socket;

  //send msg
  socket.on('messagefromcli', function(data) {
    console.log(`${data.message}`);
  })

  //listen for msg
  socket.emit('messagefromserv', {
    message: 'Initialized',
  })

})

setInterval(function() {
  for(var i in SOCKET_LIST) {
    var socket = SOCKET_LIST[i];
    socket.x++;
    socket.y++;
    socket.emit('newPostiion', {
      x: socket.x,
      y: socket.y
    })
  }
}, 1000/60)

