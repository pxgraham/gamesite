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


playerInfo.on("value", function(snapshot) {

    playerInfo.child('position').child('x').set(player.x);
    playerInfo.child('position').child('y').set(player.y);

    updateGameWithDbInfo(snapshot);

})

$('#testBtn').on('click', function() {
    updateDb();
    // updateGameWithDbInfo();
})

function updateDb() {
    playerInfo.child('position').set({
        x: player.x,
        y: player.y
    })
}

function updateGameWithDbInfo(snapshot) {
        player.x = snapshot.child('position').child('x').val();
        player.y = snapshot.child('position').child('y').val();
}
