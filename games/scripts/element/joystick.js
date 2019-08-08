var pad = document.getElementById('joystick');
pad.width = 350;
pad.height = 350;
var jctx = pad.getContext('2d');
var rect = pad.getBoundingClientRect();

jctx.fillStyle = 'black';
jctx.fillRect(116, 0, 10, pad.height);
jctx.fillRect(233, 0, 10, pad.height);

jctx.fillRect(0, 116, pad.width, 10);
jctx.fillRect(0, 233, pad.width, 10);

jctx.fillRect(116, 116, 117, 117)

var cX = Math.floor(pad.width / 2);
var cY = Math.floor(pad.height / 2);

var xPos;
var yPox;
var des;
var dist;

// pad.addEventListener('touchstart', function(e) {
    
// })
var initialX;
var initialY;


function getMousePos(pad, mouseEvent) {
    var rect = pad.getBoundingClientRect();
    
    initialX = mouseEvent.touches[0].clientX - 80;
    initialY = mouseEvent.touches[0].clientY - 800;

    // console.log('moust event touches --- ' + mouseEvent.touches);
    
    return {
      x: mouseEvent.touches[0].clientX - 80,
      y: mouseEvent.touches[0].clientY - 800
    };
}

var interval;
pad.addEventListener("touchmove", function(e) {
    e.preventDefault();
    e.stopPropagation();
                       
        var m = getMousePos(pad, e);
        
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

    //upper left
    if(initialX < 116 && initialY < 116 && initialY) {
        left = true;
        up = true;
        down = false;
        right = false;
    }

    //center left
    if(initialX < 116 && initialY > 116 && initialY < 233) {
        left = true;
        up = false;
        down = false;
        right = false;
    }
    // bottom left
    if(initialY > 233 && initialX < 116) {
        down = true;
        left = true;
        up = false;
        right = false;
    }
    //bottom center;
    if(initialX > 116 && initialX < 233 && initialY > 266) {
        down = true;
        up = false;
        left = false;
        right = false;
    }
    //bottom right
    if(initialX > 266 && initialY > 266 && initialX < 350 && initialY < 350) {
        right = true;
        down = true;
        left = false;
        up = false;
    }
    //right center
    if(initialX > 266 && initialY > 116 && initialY < 266) {
        right = true;
        down = false;
        left = false;
        up = false;
    }
    //upper right
    if(initialX > 266 && initialY < 116) {
        up = true;
        right = true;
        left = false;
        down = false;
    }
    //top center 
    if(initialX > 133 && initialX < 266 && initialY < 116) {
        up = true;
        right = false;
        left = false;
        down = false;
    }
        

  }, false);

function joystickrender() {
    console.log(initialX, initialY)

    jctx.fillStyle = 'lime',
    jctx.fillRect(0, 0, pad.width, pad.height);
    jctx.fillStyle = 'black';
    jctx.fillRect(116, 0, 10, pad.height);
    jctx.fillRect(233, 0, 10, pad.height);
    jctx.fillRect(116, 116, 117, 117)

    jctx.fillRect(0, 116, pad.width, 10);
    jctx.fillRect(0, 233, pad.width, 10);

    jctx.fillStyle = 'black',
    // jctx.fillRect(pad.width/2 - 7.5, pad.height/2 - 7.5, 15, 15);
    jctx.fillRect(initialX, initialY, 15, 15);
}

pad.addEventListener('touchstart', function(e) {
    e.preventDefault();
    e.stopPropagation();
    var m = getMousePos(pad, e);
        
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

    //upper left corner
    if(initialX < 116 && initialY < 116 && initialY) {
        left = true;
        up = true;
        down = false;
        right = false;
    }

    //center left
    if(initialX < 116 && initialY > 116 && initialY < 233) {
        left = true;
        up = false;
        down = false;
        right = false;
    }
    // bottom left
    if(initialY > 233 && initialX < 116) {
        down = true;
        left = true;
        up = false;
        right = false;
    }
    //bottom center;
    if(initialX > 116 && initialX < 233 && initialY > 266) {
        down = true;
        up = false;
        left = false;
        right = false;
    }
    //bottom right
    if(initialX > 266 && initialY > 266) {
        right = true;
        down = true;
        left = false;
        up = false;
    }
    //right center
    if(initialX > 266 && initialY > 116 && initialY < 266) {
        right = true;
        down = false;
        left = false;
        up = false;
    }
    //upper right
    if(initialX > 266 && initialY < 116) {
        up = true;
        right = true;
        left = false;
        down = false;
    }
    //top center 
    if(initialX > 133 && initialX < 266 && initialY < 116) {
        up = true;
        right = false;
        left = false;
        down = false;
    }
    joystickrender()
})

pad.addEventListener('touchend', function(e) {
    e.preventDefault();
    up = false;
    down = false;
    left = false;
    right = false;
})