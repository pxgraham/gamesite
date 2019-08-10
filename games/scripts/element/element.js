var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var boss = new Object(900, 250, 100, 100, 'magenta');
var player = new Object(20, 480, 20, 20, 'red');
var border = new Object(canvas.width / 2, 0, 5, 600, 'red');
var weaponType = new Object(40, 620, 70, 70, 'yellow');

var meteorimg = new Image();
meteorimg.src = "images/meteor.png";

var meteoractive = false;
var lightactive = false;
var iceactve = false;
var plantactive = false;

var fire = new Object(50, 630, 50, 50, 'red');
var water = new Object(150, 630, 50, 50, 'blue');
var earth = new Object(250, 630, 50, 50, 'rgba(165, 42, 42, 0.6)');
var air = new Object(350, 630, 50, 50, 'white');

var fireball = [];
var waterball = [];
var airball = [];
var earthball = [];


var wallx = player.x + player.w + 5;
var wally = player.y - 40;

var firewall = new Object(-100, wally, 20, 100, 'red');
var firewallup = false;
var waterwall = new Object(-100, wally, 20, 100, 'blue');
var waterwallup = false;
var earthwall = new Object(-100, wally, 20, 100, 'brown');
var earthwallup = false;
var airwall = new Object(-100, wally, 20, 100, 'white');
var airwallup = false;

var efirewall = new Object(700, 50, 20, 100, 'red');
var ewaterwall = new Object(700, 190, 20, 100, 'blue');
var eearthwall = new Object(700, 330, 20, 100, 'brown');
var eairwall = new Object(700, 470, 20, 100, 'white');

var fireActive = true;
var waterActive = false;
var earthActive = false;
var airActive = false;

var playerspeed = 10;
// var bossSpeed = 1;


var left = false;
var right = false;
var up = false;
var down = false;

function start() {
    setInterval(game, 20);
    document.addEventListener('keydown', keyPress);
    document.addEventListener('keyup', keyLift);
}
var id = 0; //id of bullet
var index;
function game() {
    update();
    //LOAD ASSETS    
    // targets
    efirewall.update();
    ewaterwall.update();
    eearthwall.update();
    eairwall.update();


    if (firewallup == true) {
        firewall.update();
    }
    if (waterwallup == true) {
        waterwall.update();
    }
    if (airwallup == true) {
        airwall.update();
    }
    if (earthwallup == true) {
        earthwall.update();
    }

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 600, 1000, 100);

    ctx.fillStyle = "red";
    ctx.fillRect(0, canvas.height - 100, canvas.width, 5);
    weaponType.update();
    border.update();
    player.update();
    fire.update();
    water.update();
    earth.update();
    air.update();

    

  
    //ELEMENT BALL CREATION AND PROPULSION AND DELETION
    for (var i = 0; i < fireball.length; i++) {
        fireball[i].update();
        fireball[i].x += 10;

        if (fireball[i].x + fireball[i].w >= firewall.x && firewallup == true && fireball[i].y + fireball[i].h >= firewall.y && fireball[i].y <= firewall.y + firewall.h && fireball[i].x < firewall.x + firewall.w) {
            fireball[i].y -= 2;
            fireball[i].w = 40;
            fireball[i].h = 40;
        }

        if (fireball[i].x + fireball[i].w >= earthwall.x && fireball[i].y + fireball[i].h >= earthwall.y && fireball[i].y <= earthwall.y + earthwall.h && fireball[i].x < earthwall.x + earthwall.w) {
            fireball[i].y -= 2;
            fireball[i].w = 40;
            fireball[i].h = 40;
            fireball[i].meteor = true;
        }
        if(fireball[i].meteor) {
            // ctx.fillStyle = 'magenta';
            // ctx.fillRect(fireball[i].x - 12, fireball[i].y - 1, fireball[i].w + 1, fireball[i].h + 1);
            ctx.drawImage(meteorimg, fireball[i].x - 12,  fireball[i].y - 1, fireball[i].w + 1, fireball[i].h + 1);
        }
        
            if (fireball[i].x > canvas.width) {
                fireball[i].id = id;
                for (var j = fireball.length - 1; i >= 0; --i) {                
                    if (fireball[i].id == id) {
                        fireball.splice(i,1);
                    }
                }
            } else
            if (fireball[i].x + fireball[i].w >= ewaterwall.x && fireball[i].y + fireball[i].h >= ewaterwall.y && fireball[i].y <= ewaterwall.y + ewaterwall.h && fireball[i].x < ewaterwall.x + ewaterwall.w) {
                fireball[i].id = id;
                for (var j = fireball.length - 1; i >= 0; --i) {
                    if (fireball[i].id == id) {
                        fireball.splice(i,1);
                    }
                }
            } else
            if (fireball[i].x + fireball[i].w >= eearthwall.x && fireball[i].y + fireball[i].h >= eearthwall.y && fireball[i].y <= eearthwall.y + eearthwall.h && fireball[i].x < eearthwall.x + eearthwall.w) {
                fireball[i].id = id;
                if(fireball[i].meteor) {
                    //pass through
                } else {
                    fireball[i].w /= 1.19;
                    fireball[i].h /= 1.19;
                }
            } else
            if (fireball[i].x + fireball[i].w >= eairwall.x && fireball[i].y + fireball[i].h >= eairwall.y && fireball[i].y <= eairwall.y + eairwall.h && fireball[i].x < eairwall.x + eairwall.w) {
                fireball[i].id = id;   
                if(fireball[i].meteor) {
                    for (var j = fireball.length - 1; i >= 0; --i) {
                        if (fireball[i].id == id) {
                            fireball.splice(i,1);
                        }
                    } 
                }  else {
                    fireball[i].w /= 1.19;
                    fireball[i].h /= 1.19;
                }                   
            } else {
                //do nothing
            }
    }
    for (var i = 0; i < earthball.length; i++) {
        earthball[i].update();
        earthball[i].x += 10;
        if (earthball[i].x + earthball[i].w >= earthwall.x && earthwallup == true && earthball[i].y + earthball[i].h >= earthwall.y && earthball[i].y <= earthwall.y + earthwall.h && earthball[i].x < earthwall.x + earthwall.w) {
            earthball[i].y -= 2;
            earthball[i].w = 40;
            earthball[i].h = 40;
        }
        if (earthball[i].x + earthball[i].w >= firewall.x && earthball[i].y + earthball[i].h >= firewall.y && earthball[i].y <= firewall.y + firewall.h && earthball[i].x < firewall.x + firewall.w) {
            earthball[i].y -= 2;
            earthball[i].w = 40;
            earthball[i].h = 40;
            earthball[i].meteor = true;
        }

        if(earthball[i].meteor) {
            // ctx.fillStyle = 'magenta';
            // ctx.fillRect(earthball[i].x - 12, earthball[i].y - 1, earthball[i].w + 1, earthball[i].h + 1);
            ctx.drawImage(meteorimg, earthball[i].x - 12,  earthball[i].y - 1, earthball[i].w + 1, earthball[i].h + 1);
        }

        if (earthball[i].x > canvas.width) {
            earthball[i].id = id;
            for (var j = earthball.length - 1; i >= 0; --i) {                
                if (earthball[i].id == id) {
                    earthball.splice(i,1);
                }
            }
        } else
        if (earthball[i].x + earthball[i].w >= ewaterwall.x && earthball[i].y + earthball[i].h >= ewaterwall.y && earthball[i].y <= ewaterwall.y + ewaterwall.h && earthball[i].x < ewaterwall.x + ewaterwall.w) {
            earthball[i].id = id;
            if(earthball[i].meteor) {
                for (var j = earthball.length - 1; i >= 0; --i) {
                    if (earthball[i].id == id) {
                        earthball.splice(i,1);
                    }
                } 
            }  else {
                earthball[i].w /= 1.19;
                earthball[i].h /= 1.19;
            }
        } else
        if (earthball[i].x + earthball[i].w >= eearthwall.x && earthball[i].y + earthball[i].h >= eearthwall.y && earthball[i].y <= eearthwall.y + eearthwall.h && earthball[i].x < eearthwall.x + eearthwall.w) {
            earthball[i].id = id;
        } else
        if (earthball[i].x + earthball[i].w >= eairwall.x && earthball[i].y + earthball[i].h >= eairwall.y && earthball[i].y <= eairwall.y + eairwall.h && earthball[i].x < eairwall.x + eairwall.w) {
            earthball[i].id = id;                        
            for (var j = earthball.length - 1; i >= 0; --i) {
                if (earthball[i].id == id) {
                    earthball.splice(i,1);                
                }
            }
        } else
        if (earthball[i].x + earthball[i].w >= efirewall.x && earthball[i].y + earthball[i].h >= efirewall.y && earthball[i].y <= efirewall.y + efirewall.h && earthball[i].x < efirewall.x + efirewall.w) {
            earthball[i].id = id;   
            if(earthball[i].meteor) {
                //passthru
            } else {
                earthball[i].w /= 1.19;
                earthball[i].h /= 1.19;
            }        
        }
    }
    for (var i = 0; i < airball.length; i++) {
        airball[i].update();
        airball[i].x += 10;
        if (airball[i].x + airball[i].w >= airwall.x && airwallup == true && airball[i].y + airball[i].h >= airwall.y && airball[i].y <= airwall.y + airwall.h && airball[i].x < airwall.x + airwall.w) {
            airball[i].y -= 2;
            airball[i].w = 40;
            airball[i].h = 40;
        }
        if (airball[i].x > canvas.width) {
            airball[i].id = id;
            for (var j = airball.length - 1; i >= 0; --i) {                
                if (airball[i].id == id) {
                    airball.splice(i,1);
                }
            }
        } else
        if (airball[i].x + airball[i].w >= ewaterwall.x && airball[i].y + airball[i].h >= ewaterwall.y && airball[i].y <= ewaterwall.y + ewaterwall.h && airball[i].x < ewaterwall.x + ewaterwall.w) {
            airball[i].id = id;
            airball[i].w /= 1.19;
            airball[i].h /= 1.19;
        } else
        if (airball[i].x + airball[i].w >= eearthwall.x && airball[i].y + airball[i].h >= eearthwall.y && airball[i].y <= eearthwall.y + eearthwall.h && airball[i].x < eearthwall.x + eearthwall.w) {
            airball[i].id = id;
            for (var j = airball.length - 1; i >= 0; --i) {
                if (airball[i].id == id) {
                    airball.splice(i,1);
                }
            }
        } else
        if (airball[i].x + airball[i].w >= eairwall.x && airball[i].y + airball[i].h >= eairwall.y && airball[i].y <= eairwall.y + eairwall.h && airball[i].x < eairwall.x + eairwall.w) {
            airball[i].id = id;                        
        } else
        if (airball[i].x + airball[i].w >= efirewall.x && airball[i].y + airball[i].h >= efirewall.y && airball[i].y <= efirewall.y + efirewall.h && airball[i].x < efirewall.x + efirewall.w) {
            airball[i].id = id;                        
            airball[i].w /= 1.19;
            airball[i].h /= 1.19;
        }
    }
    for (var i = 0; i < waterball.length; i++) {
        waterball[i].update();
        waterball[i].x += 10;
        if (waterball[i].x + waterball[i].w >= waterwall.x && waterwallup == true && waterball[i].y + waterball[i].h >= waterwall.y && waterball[i].y <= waterwall.y + waterwall.h && waterball[i].x < waterwall.x + waterwall.w) {
            waterball[i].y -= 2;
            waterball[i].w = 40;
            waterball[i].h = 40;
        }
        if (waterball[i].x > canvas.width) {
            waterball[i].id = id;
            for (var j = waterball.length - 1; i >= 0; --i) {                
                if (waterball[i].id == id) {
                    waterball.splice(i,1);
                }
            }
        } else
        if (waterball[i].x + waterball[i].w >= ewaterwall.x && waterball[i].y + waterball[i].h >= ewaterwall.y && waterball[i].y <= ewaterwall.y + ewaterwall.h && waterball[i].x < ewaterwall.x + ewaterwall.w) {
            waterball[i].id = id;
        } else
        if (waterball[i].x + waterball[i].w >= eearthwall.x && waterball[i].y + waterball[i].h >= eearthwall.y && waterball[i].y <= eearthwall.y + eearthwall.h && waterball[i].x < eearthwall.x + eearthwall.w) {
            waterball[i].id = id;
            waterball[i].w /= 1.19;
            waterball[i].h /= 1.19;
        } else
        if (waterball[i].x + waterball[i].w >= eairwall.x && waterball[i].y + waterball[i].h >= eairwall.y && waterball[i].y <= eairwall.y + eairwall.h && waterball[i].x < eairwall.x + eairwall.w) {
            waterball[i].id = id;                        
            waterball[i].w /= 1.19;
            waterball[i].h /= 1.19;
        } else
        if (waterball[i].x + waterball[i].w >= efirewall.x && waterball[i].y + waterball[i].h >= efirewall.y && waterball[i].y <= efirewall.y + efirewall.h && waterball[i].x < efirewall.x + efirewall.w) {
            waterball[i].id = id;                        
            for (var j = waterball.length - 1; i >= 0; --i) {
                if (waterball[i].id == id) {
                    waterball.splice(i,1);                
                }
            }
        }
    }


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
    if (player.y + player.h > canvas.height) {
        player.y = canvas.height - player.h - 100;
    }
    if (player.x < 0) {
        player.x = 0;
    }
    if (player.y < 0) {
        player.y = 0;
    }
    if (player.x + player.w > canvas.width / 2) {
        player.x = canvas.width / 2 - player.w;
    }

    //MOVEMENT
    if (left == true && player.x != 0) {
        player.x -= playerspeed;
    }
    if (right == true && player.x != canvas.width / 2 - player.w) {
        player.x += playerspeed;
    }
    if (down == true && player.y != canvas.height - player.h - 100) {
        player.y += playerspeed;
    }
    if (up == true && player.y != 0) {
        player.y -= playerspeed;
    }
}

function Object(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.update = function () {
        ctx.fillStyle = c;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

function Bullet(x, y, w, h, c, id) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.id = id;
    this.update = function () {
        ctx.fillStyle = c;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

function keyPress(evt) {
    switch (evt.keyCode) {

        //q
        case 81:
            weaponType.x = 40;
            break;

        //w
        case 87:
            weaponType.x = 140;
            break;

        //e
        case 69:
            weaponType.x = 240;
            break;


        //r
        case 82:
            weaponType.x = 340;
            break;


        case 68:
            wallx = player.x + player.w + 5;
            wally = player.y - 40;
            if (fireActive == true) {
                firewallup = true;
                waterwallup = false;
                earthwallup = false;
                airwallup = false;
                firewall.x = wallx;
                firewall.y = wally;
                airwall.x = -100;
                earthwall.x = -100;
                waterwall.x = -100;
            }
            if (waterActive == true) {
                firewallup = false;
                waterwallup = true;
                earthwallup = false;
                airwallup = false;
                waterwall.x = wallx;
                waterwall.y = wally;
                airwall.x = -100;
                firewall.x = -100;
                earthwall.x = -100;
            }
            if (earthActive == true) {
                firewallup = false;
                waterwallup = false;
                earthwallup = true;
                airwallup = false;
                earthwall.x = wallx;
                earthwall.y = wally;
                airwall.x = -100;
                firewall.x = -100;
                waterwall.x = -100;
            }
            if (airActive == true) {
                firewallup = false;
                waterwallup = false;
                earthwallup = false;
                airwallup = true;
                airwall.x = wallx;
                airwall.y = wally;
                firewall.x = -100;
                earthwall.x = -100;
                waterwall.x = -100;
            }
            break;
        case 70:
            id++;
            if (fireActive == true) {
                fireball.push(new Bullet(player.x, player.y, 20, 20, 'red', id))
            }
            if (waterActive == true) {
                waterball.push(new Bullet(player.x, player.y, 20, 20, 'blue', id))
            }
            if (earthActive == true) {
                earthball.push(new Bullet(player.x, player.y, 20, 20, 'brown', id))
            }
            if (airActive == true) {
                airball.push(new Bullet(player.x, player.y, 20, 20, 'white', id))
            }
            break;

        case 38:
            up = true;
            break;
        case 37:
            left = true;
            break;
        case 39:
            right = true;
            break;
        case 40:
            down = true;
            break;
    }
}
function keyLift(evt) {
    switch (evt.keyCode) {
        case 38:
            up = false;
            break;
        case 37:
            left = false;
            break;
        case 39:
            right = false;
            break;
        case 40:
            down = false;
            break;
    }
}


//MOBILE MOVEMENT 
// var leftBtn = document.getElementById('leftBtn');
// var rightBtn = document.getElementById('rightBtn');
// var upBtn = document.getElementById('upBtn');
// var downBtn = document.getElementById('downBtn');
var aBtn = document.getElementById('aBtn');
var bBtn = document.getElementById('bBtn');
var fireBtn = document.getElementById('fireBtn');
var waterBtn = document.getElementById('waterBtn');
var earthBtn = document.getElementById('earthBtn');
var airBtn = document.getElementById('airBtn');

fireBtn.addEventListener('touchstart', function(){
    weaponType.x = 40;
})
waterBtn.addEventListener('touchstart', function(){
    weaponType.x = 140;
})
earthBtn.addEventListener('touchstart', function(){
    weaponType.x = 240;
})
airBtn.addEventListener('touchstart', function(){
    weaponType.x = 340;
})
//f70, d68


// var id = 0; // unique id for each bullet to get specifically deleted
aBtn.addEventListener('touchstart', function (e) {
    id++;
    e.preventDefault();
    if (fireActive == true) {
        fireball.push(new Bullet(player.x, player.y, 20, 20, 'red', id))
    }
    if (waterActive == true) {
        waterball.push(new Bullet(player.x, player.y, 20, 20, 'blue', id))
    }
    if (earthActive == true) {
        earthball.push(new Bullet(player.x, player.y, 20, 20, 'brown', id))
    }
    if (airActive == true) {
        airball.push(new Bullet(player.x, player.y, 20, 20, 'white', id))
    }

})
bBtn.addEventListener('touchstart', function (e) {
    e.preventDefault()
    wallx = player.x + player.w + 5;
    wally = player.y - 40;
    if (fireActive == true) {
        firewallup = true;
        waterwallup = false;
        earthwallup = false;
        airwallup = false;
        firewall.x = wallx;
        firewall.y = wally;
        airwall.x = -100;
        earthwall.x = -100;
        waterwall.x = -100;
    }
    if (waterActive == true) {
        firewallup = false;
        waterwallup = true;
        earthwallup = false;
        airwallup = false;
        waterwall.x = wallx;
        waterwall.y = wally;
        airwall.x = -100;
        firewall.x = -100;
        earthwall.x = -100;
    }
    if (earthActive == true) {
        firewallup = false;
        waterwallup = false;
        earthwallup = true;
        airwallup = false;
        earthwall.x = wallx;
        earthwall.y = wally;
        airwall.x = -100;
        firewall.x = -100;
        waterwall.x = -100;
    }
    if (airActive == true) {
        firewallup = false;
        waterwallup = false;
        earthwallup = false;
        airwallup = true;
        airwall.x = wallx;
        airwall.y = wally;
        firewall.x = -100;
        earthwall.x = -100;
        waterwall.x = -100;
    }

})

// leftBtn.addEventListener('touchstart', function (e) {
//     e.preventDefault()
//     left = true;
// })
// leftBtn.addEventListener('touchend', function (e) {
//     e.preventDefault()
//     left = false;
// })

// rightBtn.addEventListener('touchstart', function (e) {
//     e.preventDefault()
//     right = true;
// })
// rightBtn.addEventListener('touchend', function (e) {
//     e.preventDefault()
//     right = false;
// })

// downBtn.addEventListener('touchstart', function (e) {
//     e.preventDefault()
//     down = true;
// })
// downBtn.addEventListener('touchend', function (e) {
//     e.preventDefault()
//     down = false;
// })

// upBtn.addEventListener('touchstart', function (e) {
//     e.preventDefault()
//     up = true;
// })
// upBtn.addEventListener('touchend', function (e) {
//     e.preventDefault()
//     up = false;
// })

function update() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
/*reference codes

65: a
83: s
87: w
68: d
13: enter
32: space
37: left
38: up
39: right
40: down
81: Q
69: E
82: r

end of reference codes*/
