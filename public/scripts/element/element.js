var starBkgnd = new Image();
starBkgnd.src = '/public/images/background.png';

var canvas = document.getElementById('canvas');                 //main canvas
var ctx = canvas.getContext('2d');                              //context of main canvas

//npc/player objects
var boss = new Object(900, 250, 100, 100, 'magenta');                
var player = new Object(20, 480, 20, 20, 'red');
var fireplayer = new Image();
fireplayer.src = "/public/images/fireplayer.png"


//used for drawing weapon type blocks
var border = new Object(canvas.width / 2, 0, 5, 600, 'red');
var weaponType = new Object(40, 620, 70, 70, 'yellow');
var fire = new Object(50, 630, 50, 50, 'red');
var water = new Object(150, 630, 50, 50, 'blue');
var earth = new Object(250, 630, 50, 50, 'rgba(165, 42, 42, 0.6)');
var air = new Object(350, 630, 50, 50, 'white');

//primary elements images
var airimg = new Image();
airimg.src = "/public/images/airimg.png";

var waterimg = new Image();
waterimg.src = "/public/images/waterimg.png";

var earthimg = new Image();
earthimg.src = "/public/images/earthimg.png";

var fireimg = new Image();
fireimg.src = "/public/images/fireimg.png";

//secondary elements images
var meteorimg = new Image();
meteorimg.src = "/public/images/meteor.png";

var lightimg = new Image();
lightimg.src = "/public/images/light.png";

var plantimg = new Image();
plantimg.src = "/public/images/plant.png";

var iceimg = new Image();
iceimg.src = "/public/images/ice.png";

var meteoractive = false;
var lightactive = false;
var iceactve = false;
var plantactive = false;




//when button gets pressed, a new bullet object gets pushed to one of these arrays
var fireball = [];
var waterball = [];
var airball = [];
var earthball = [];


//captures players position to place wall
var wallx = player.x + player.w + 5;
var wally = player.y - 40;


//wall objects
var firewall = new Object(-100, wally, 20, 100, 'red');
var firewallup = false;
var waterwall = new Object(-100, wally, 20, 100, 'blue');
var waterwallup = false;
var earthwall = new Object(-100, wally, 20, 100, 'brown');
var earthwallup = false;
var airwall = new Object(-100, wally, 20, 100, 'white');
var airwallup = false;

//enemy test walls
var efirewall = new Object(700, 50, 20, 100, 'red');
var ewaterwall = new Object(700, 190, 20, 100, 'blue');
var eearthwall = new Object(700, 330, 20, 100, 'brown');
var eairwall = new Object(700, 470, 20, 100, 'white');

//element your currently on
var fireActive = true;
var waterActive = false;
var earthActive = false;
var airActive = false;

//your speed
var playerspeed = 10;
// var bossSpeed = 1;

//your direction
var left = false;
var right = false;
var up = false;
var down = false;


//game interval and keypresses
function start() {
    setInterval(game, 20);
    document.addEventListener('keydown', keyPress);
    document.addEventListener('keyup', keyLift);
}

//server start
// var socket = io();
// socket.on('newPosition', function(data) {
//    //
// })

var id = 0; //id of bullet
var index;

function game() {
    // player.update();
    // update();   //framerate

    // targets
    // efirewall.update();
    // ewaterwall.update();
    // eearthwall.update();
    // eairwall.update();

    //when *b* is pressed, a firewall turns on and gets placed, and stays placed.
    if (firewallup) {
        firewall.update();
        socket.on('wallLocation', function(data) {
            ctx.drawImage(fireimg, data.x, data.y, firewall.w, firewall.h);
        })
    }
    if (waterwallup == true) {
        waterwall.update();
        ctx.drawImage(waterimg, waterwall.x, waterwall.y, waterwall.w, waterwall.h);
    }
    if (airwallup == true) {
        airwall.update();
        ctx.drawImage(airimg, airwall.x, airwall.y, airwall.w, airwall.h);
    }
    if (earthwallup == true) {
        earthwall.update();
        ctx.drawImage(earthimg, earthwall.x, earthwall.y, earthwall.w, earthwall.h);
    }

    //renders black box after element wall over the bottom bar so it doesnt overlap when placed
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 600, 1000, 100);

    //top of bottom bar
    ctx.fillStyle = "red";
    ctx.fillRect(0, canvas.height - 100, canvas.width, 5);

    //yellow border behind element type
    weaponType.update();

    //center verticle line
    border.update();

    //you
    // player.update();
    // ctx.drawImage(fireplayer, player.x - 12,  player.y - 1, 150, 125);

    //blocks showing what element your on
    fire.update();
    water.update();
    earth.update();
    air.update();

    conjure.fire();
    conjure.earth();
    conjure.water();
    conjure.air();


    //weapon type
    if (weaponType.x == 40) {
        fireActive = true;
        waterActive = false
        earthActive = false
        airActive = false;
    }
    if (weaponType.x == 140) {
        waterActive = true;
        fireActive = false;
        airActive = false;
        earthActive = false;
    }
    if (weaponType.x == 240) {
        earthActive = true;
        airActive = false;
        waterActive = false
        fireActive = false;
    }
    if (weaponType.x == 340) {
        airActive = true;
        earthActive = false
        waterActive = false;
        fireActive = false;
    }

    //BORDERS
    // if (player.y + player.h > canvas.height) {
    //     player.y = canvas.height - player.h - 100;
    // }
    // if (player.x < 0) {
    //     player.x = 0;
    // }
    // if (player.y < 0) {
    //     player.y = 0;
    // }
    // if (player.x + player.w > canvas.width / 2) {
    //     player.x = canvas.width / 2 - player.w;
    // }

    // //MOVEMENT
    // if (left == true && player.x != 0) {
    //     player.x -= playerspeed;
    // }
    // if (right == true && player.x != canvas.width / 2 - player.w) {
    //     player.x += playerspeed;
    // }
    // if (down == true && player.y != canvas.height - player.h - 100) {
    //     player.y += playerspeed;
    // }
    // if (up == true && player.y != 0) {
    //     player.y -= playerspeed;
    // }

    //database upload
    // if(player1active) {
    //     playerInfo.child('player1').child('position').set({
    //         x: player.x,
    //         y: player.y
    //     })
    // }
}



// function update() {
//     // ctx.fillStyle = "black";
//     // ctx.fillRect(0, 0, canvas.width, canvas.height);
//     ctx.drawImage(starBkgnd, 0,  0, canvas.width, canvas.height);
// }

// function rerenderover(x, y, w, h) {
//     ctx.drawImage(starBkgnd, 0,  0, canvas.width, canvas.height); //
//     efirewall.update();
//     ewaterwall.update();
//     eearthwall.update();
//     eairwall.update();
//     if (firewallup) {
//         firewall.update();
//     }
//     if (waterwallup == true) {
//         waterwall.update();
//     }
//     if (airwallup == true) {
//         airwall.update();
//     }
//     if (earthwallup == true) {
//         earthwall.update();
//     }
//     ctx.drawImage(fireplayer, player.x - 12,  player.y - 1, player.w + 50, player.h + 50);
//     ctx.drawImage(fireplayer, this.x,  this.y, this.w, this.h)
//     // conjure.fire();
//     // conjure.earth();
//     // conjure.water();
//     // conjure.air();

//     //renders black box after element wall over the bottom bar so it doesnt overlap when placed
//     ctx.fillStyle = 'black';
//     ctx.fillRect(0, 600, 1000, 100);

//     //top of bottom bar
//     ctx.fillStyle = "red";
//     ctx.fillRect(0, canvas.height - 100, canvas.width, 5);

//     //yellow border behind element type
//     weaponType.update();

//     //center verticle line
//     border.update();

//     //you
//     // player.update();
//     ctx.drawImage(fireplayer, player.x - 12,  player.y - 1, player.w + 50, player.h + 50);

//     //blocks showing what element your on
//     fire.update();
//     water.update();
//     earth.update();
//     air.update();

// }

