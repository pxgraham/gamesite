//KEYBOARD MOVEMENT
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
                fireball.push(new Bullet(player.x, player.y, 50, 50, 'red', id))
            }
            if (waterActive == true) {
                waterball.push(new Bullet(player.x, player.y, 50, 50, 'blue', id))
            }
            if (earthActive == true) {
                earthball.push(new Bullet(player.x, player.y, 50, 50, 'brown', id))
            }
            if (airActive == true) {
                airball.push(new Bullet(player.x, player.y, 50, 50, 'white', id))
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
    if (fireActive == true) {                          //previous values were 20
        fireball.push(new Bullet(player.x, player.y, 100, 100, 'red', id))
    }
    if (waterActive == true) {
        waterball.push(new Bullet(player.x, player.y, 100, 100, 'blue', id))
    }
    if (earthActive == true) {
        earthball.push(new Bullet(player.x, player.y, 100, 100, 'brown', id))
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
