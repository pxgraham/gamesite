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

// database.ref("playerInfo")

var firstJoin = 0;

playerInfo.on("value", function(snapshot) {
    if(firstJoin > 0) {
        var d_playerx = snapshot.child('position').child('x').val();
        var d_playery = snapshot.child('position').child('y').val();
    } else {
        var d_playerx = player.x
        var d_playery = player.y
    }

    playerInfo.child('position').child('x').set(player.x);
    playerInfo.child('position').child('y').set(player.y);
    
    console.log(d_playerx, d_playery);

    player.x = d_playerx;
    player.y = d_playery;
})

$('#testBtn').on('click', function() {
    firstJoin++;
    playerInfo.child('position').set({
        x: player.x,
        y: player.y
    })
})
