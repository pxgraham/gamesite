var joystickpad = document.getElementById('joystick');
var jctx = joystickpad.getContext('2d');
var rect = joystickpad.getBoundingClientRect();

var cX = Math.floor(joystickpad.width / 2);
var cY = Math.floor(joystickpad.height / 2);

var xPos;
var yPox;
var des;
var dist;

// joystickpad.addEventListener('touchstart', function(e) {
    
// })



function getMousePos(joystickpad, mouseEvent) {
    var rect = joystickpad.getBoundingClientRect();
    return {
      x: mouseEvent.touches[0].clientX - rect.left,
      y: mouseEvent.touches[0].clientY - rect.top
    };
}

var interval;
joystickpad.addEventListener("touchmove", function(e) {
                       
        var m = getMousePos(joystickpad, e);
        
        if (m.x < cX) {
          if (m.y < cY) pos = 180 + Math.floor(Math.atan((m.y - cY) / (cX - m.x)) * (180 / Math.PI));
          else pos = 180 + -Math.floor(Math.atan((m.y - cY) / (m.x - cX)) * (180 / Math.PI));
        } else {
          if (m.y < cY) pos = - Math.floor(Math.atan((cY - m.y) / (cX - m.x)) * (180 / Math.PI)) ;
          else pos = 360 + Math.floor(Math.atan((cY - m.y) / (m.x - cX)) * (180 / Math.PI));
        }
      
        // get the distance from the centre
        tX = Math.abs(cX - m.x);
        tY = Math.abs(cY - m.y);
        tD = Math.floor(Math.sqrt(tX * tX + tY * tY));
        console.log(`
X:          ${m.x}  
Y:          ${m.y}
Degrees:    ${pos}
Distance:   ${tD}px ${cX} 30
                    `)
        xPos = m.x - 20;
        yPos = m.y - 80;
        deg = pos;
        dist = tD;

    joystickrender()

    if(xPos > 169) {
        right = true;
        left = false;
    }
    if(xPos < 169) {
        left = true;
        right = false;
    }
    if(yPos < 179) {
        up = true;
        down = false;
    }
    if(yPos > 179) {
        up = false;
        down = true;
    }
        

  }, false);

function joystickrender() {
    jctx.fillStyle = 'lime',
    jctx.fillRect(0, 0, joystickpad.width, joystickpad.height);
    jctx.fillStyle = 'lime',
    jctx.fillRect(xPos, yPos, 15, 15);
}

joystickpad.addEventListener('touchstart', function(e) {
    var m = getMousePos(joystickpad, e);
        
    if (m.x < cX) {
      if (m.y < cY) pos = 180 + Math.floor(Math.atan((m.y - cY) / (cX - m.x)) * (180 / Math.PI));
      else pos = 180 + -Math.floor(Math.atan((m.y - cY) / (m.x - cX)) * (180 / Math.PI));
    } else {
      if (m.y < cY) pos = - Math.floor(Math.atan((cY - m.y) / (cX - m.x)) * (180 / Math.PI)) ;
      else pos = 360 + Math.floor(Math.atan((cY - m.y) / (m.x - cX)) * (180 / Math.PI));
    }
  
    // get the distance from the centre
    tX = Math.abs(cX - m.x);
    tY = Math.abs(cY - m.y);
    tD = Math.floor(Math.sqrt(tX * tX + tY * tY));
    xPos = m.x - 20;
    yPos = m.y - 80;
    deg = pos;
    dist = tD;
    if(xPos > 169) {
        right = true;
        left = false;
    }
    if(xPos < 169) {
        left = true;
        right = false;
    }
    if(yPos < 179) {
        up = true;
        down = false;
    }
    if(yPos > 179) {
        up = false;
        down = true;
    }
})

joystickpad.addEventListener('touchend', function(e) {
    up = false;
    down = false;
    left = false;
    right = false;
})