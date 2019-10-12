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

var PLAYER_LIST = {};

var users = 0;

var Player = function(id) {
  var self = {
    x: 250,
    y: 250,
    id: id,     
    left: false,
    right: false,
    up: false,
    down: false
  }
  self.updatePosition = function() {
    if (self.left) {
      self.x -= 10;
    }
    if (self.right) {
      self.x += 10;
    }
    if (self.down) {
      self.y += 10;
    }
    if (self.up) {
      self.y -= 10;
    }
  }
  return self;
}

io.sockets.on('connection', function(socket) {
  users++;
  console.log('socket connected');
  socket.id = Math.random();
  SOCKET_LIST[socket.id] = socket;

  var player = Player(socket.id);
  PLAYER_LIST[socket.id] = player;
  
  socket.x = 0;
  socket.y = 0;
  //send msg
  socket.on('messagefromcli', function(data) {
    console.log(`${data.message}`);
  })

  //listen for msg
  socket.emit('messagefromserv', {
    message: 'Initialized',
  })

  socket.on('movement', function(data) {
    player.left = data.left;
    player.right = data.right
    player.up = data.up;
    player.down = data.down
  })

  // socket disconnection
  socket.on('disconnect', function () {
    console.log('socket disconnection')
    // console.log(SOCKET_LIST[socket.id]);
    delete SOCKET_LIST[socket.id]
    delete PLAYER_LIST[socket.id]
  })

})

var left = false;
var down = false;
var right = false;
var up = false;

setInterval(function() {
  var pack = [];
  for(var i in PLAYER_LIST) {
    var player = PLAYER_LIST[i];
    player.updatePosition()
    pack.push({
      x: player.x,
      y: player.y,
    })
  }

  for(var i in SOCKET_LIST) {
    var socket = SOCKET_LIST[i];
    socket.emit('newPosition', pack)
  }

}, 20)

