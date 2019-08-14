var firebaseConfig = {
    apiKey: "AIzaSyDqQOaSH9nijtPw34FKXq6B_lUukKQ8mr0",
    authDomain: "element-ic.firebaseapp.com",
    databaseURL: "https://element-ic.firebaseio.com",
    projectId: "element-ic",
    storageBucket: "element-ic.appspot.com",
    messagingSenderId: "626334722471",
    appId: "1:626334722471:web:ae9c6229f22dd3aa"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();
var playerInfo = database.ref("/playerInfo")
var player1active = false;
var playerid;

var currentPlayers = null;

playerInfo.on("value", function(snapshot) {
    player1active = snapshot.child('player1').child('active').val();


    player.x = snapshot.child('player1').child('position').child('x').val();
    player.y = snapshot.child('player1').child('position').child('y').val();

    console.log(snapshot.child('player1').child('position').child('x').val());

})

$('#connectBtn').bind('touchstart mousedown', function() {
    $('#test').text('connecte');
    if(player1active) {
        alert('players already here')
    } else {
        playerid = 'first';
        playerInfo.child('player1').child('active').set(true);
        alert('you joined!')
    }

})

$('#disconnectBtn').bind('touchstart mousedown', function() {
    $('#test').text('disconnected');
    playerInfo.child('player1').child('active').set(false);
    alert('you lost control')
})

$('#updateBtn').bind('touchstart mousedown', function() {
    $('#test').text('updated');
    if(playerid === 'first') {
        playerInfo.child('player1').child('position').set({
            x: player.x,
            y: player.y
        })
    } else {
        alert('your not in control');
    }    

})

function getInGame() {
    // Checks for current players, if theres a player one connected, then the user becomes player 2.
    // If there is no player one, then the user becomes player 1
    if (currentPlayers < 2) {
  
      if (playerOneExists) {
        playerNum = 2;
      }
      else {
        playerNum = 1;
      }
  
      // Creates key based on assigned player number
      playerRef = database.ref("/players/" + playerNum);
  
      // Creates player object. 'choice' is unnecessary here, but I left it in to be as complete as possible
      playerRef.set({
        name: username,
        wins: 0,
        losses: 0,
        choice: null
      });
  
      // On disconnect remove this user's player object
      playerRef.onDisconnect().remove();
  
      // If a user disconnects, set the current turn to 'null' so the game does not continue
      currentTurnRef.onDisconnect().remove();
  
      // Send disconnect message to chat with Firebase server generated timestamp and id of '0' to denote system message
      chatDataDisc.onDisconnect().set({
        name: username,
        time: firebase.database.ServerValue.TIMESTAMP,
        message: "has disconnected.",
        idNum: 0
      });
  
      // Remove name input box and show current player number.
      $("#swap-zone").html("<h2>Hi " + username + "! You are Player " + playerNum + "</h2>");
    }
    else {
  
      // If current players is "2", will not allow the player to join
      alert("Sorry, Game Full! Try Again Later!");
    }
  }
