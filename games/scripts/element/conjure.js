const conjure = {

    fire: function() {
        for (var i = 0; i < fireball.length; i++) {
            fireball[i].update();   //prints bullet
            fireball[i].x += 10;    //bullet x velocity

            ctx.drawImage(fireimg, fireball[i].x - 12,  fireball[i].y - 1, fireball[i].w + 1, fireball[i].h + 1);
    
            //if your fireball hits your firewall
            if (fireball[i].x + fireball[i].w >= firewall.x && firewallup == true && fireball[i].y + fireball[i].h >= firewall.y && fireball[i].y <= firewall.y + firewall.h && fireball[i].x < firewall.x + firewall.w) {
                fireball[i].y -= 2;     //it centers
                fireball[i].w += 4;     //it grows wide
                fireball[i].h += 4;     //and taller
            }
            
            //if your fireball hits your earthwall
            if (fireball[i].x + fireball[i].w >= earthwall.x && fireball[i].y + fireball[i].h >= earthwall.y && fireball[i].y <= earthwall.y + earthwall.h && fireball[i].x < earthwall.x + earthwall.w) {
                fireball[i].y -= 2; //it centers
                fireball[i].w += 4; //it grows wide
                fireball[i].h += 4; //and tall
                fireball[i].meteor = true;  //and turns into a meteor
            }
    
            //if fire ball turns into a meteor
            if(fireball[i].meteor) {
                //prints picture of meteor over fireball
                ctx.drawImage(meteorimg, fireball[i].x - 12,  fireball[i].y - 1, fireball[i].w + 1, fireball[i].h + 1);
            }

            // if fireball hits your airwall
            if (fireball[i].x + fireball[i].w >= airwall.x && fireball[i].y + fireball[i].h >= airwall.y && fireball[i].y <= airwall.y + airwall.h && fireball[i].x < airwall.x + airwall.w) {
                fireball[i].y -= 2; //it centers
                fireball[i].w += 4; //it grows wide
                fireball[i].h += 4; //and tall
                fireball[i].light = true;  //and turns into a light strike
            }
    
            //if fire ball turns into a light strike
            if(fireball[i].light) {
                //prints picture of light over fireball
                ctx.clearRect(fireball[i].x - 12,  fireball[i].y - 1, fireball[i].w + 1, fireball[i].h + 1);
                // rerenderover(fireball[i].x - 12,  fireball[i].y - 1, fireball[i].w + 1, fireball[i].h + 1);
                ctx.drawImage(lightimg, fireball[i].x - 12,  fireball[i].y - 1, fireball[i].w + 1, fireball[i].h + 1);
            }
            
            //if fireball goes offscreen
            if (fireball[i].x > canvas.width) {
                fireball[i].id = id;    //makes unique id for ball
                
                //deletes specific fireball from array
                for (var j = fireball.length - 1; i >= 0; --i) {                
                    if (fireball[i].id == id) {
                        fireball.splice(i,1);
                    }
                }
            } 
            
            //if fireball hits waterwall
            else if (fireball[i].x + fireball[i].w >= ewaterwall.x && fireball[i].y + fireball[i].h >= ewaterwall.y && fireball[i].y <= ewaterwall.y + ewaterwall.h && fireball[i].x < ewaterwall.x + ewaterwall.w) {
                fireball[i].id = id;
    
                //deletes that fireball
                for (var j = fireball.length - 1; i >= 0; --i) {
                    if (fireball[i].id == id) {
                        fireball.splice(i,1);
                    }
                }
            }
    
            //if fireball its earthwall
            else if (fireball[i].x + fireball[i].w >= eearthwall.x && fireball[i].y + fireball[i].h >= eearthwall.y && fireball[i].y <= eearthwall.y + eearthwall.h && fireball[i].x < eearthwall.x + eearthwall.w) {
                fireball[i].id = id;
    
                //if its a meteor
                if(fireball[i].meteor) {
                    //pass through
                } 
                //otherwise it gets weakend
                else {
                    fireball[i].w /= 1.19;
                    fireball[i].h /= 1.19;
                }
            }
            
            //if fireball hits air wall
            else if (fireball[i].x + fireball[i].w >= eairwall.x && fireball[i].y + fireball[i].h >= eairwall.y && fireball[i].y <= eairwall.y + eairwall.h && fireball[i].x < eairwall.x + eairwall.w) {
                fireball[i].id = id;   
    
                //if its a meteor
                if(fireball[i].meteor) {
    
                    //it gets deleted
                    for (var j = fireball.length - 1; i >= 0; --i) {
                        if (fireball[i].id == id) {
                            fireball.splice(i,1);
                        }
                    } 
                }  
    
                //otherwise its weakend
                else {
                    fireball[i].w /= 1.19;
                    fireball[i].h /= 1.19;
                }                   
            } 
            //if the bullet doesnt do anything it does nothing. redundant? i dont know.
            else {
                //do nothing
            }
        }
    },

    earth: function() {
        for (var i = 0; i < earthball.length; i++) {
            earthball[i].update();
            earthball[i].x += 10;
            ctx.drawImage(earthimg, earthball[i].x - 12,  earthball[i].y - 1, earthball[i].w + 1, earthball[i].h + 1);

            if (earthball[i].x + earthball[i].w >= earthwall.x && earthwallup == true && earthball[i].y + earthball[i].h >= earthwall.y && earthball[i].y <= earthwall.y + earthwall.h && earthball[i].x < earthwall.x + earthwall.w) {
                earthball[i].y -= 2;
                earthball[i].w  += 4;
                earthball[i].h  += 4;
            }

            //if earthball hits firewall it turns to meteor
            if (earthball[i].x + earthball[i].w >= firewall.x && earthball[i].y + earthball[i].h >= firewall.y && earthball[i].y <= firewall.y + firewall.h && earthball[i].x < firewall.x + firewall.w) {
                earthball[i].y -= 2;
                earthball[i].w  += 4;
                earthball[i].h  += 4;
                earthball[i].meteor = true;
            }
    
            if(earthball[i].meteor) {
                // ctx.fillStyle = 'magenta';
                // ctx.fillRect(earthball[i].x - 12, earthball[i].y - 1, earthball[i].w + 1, earthball[i].h + 1);
                ctx.drawImage(meteorimg, earthball[i].x - 12,  earthball[i].y - 1, earthball[i].w + 1, earthball[i].h + 1);
            }

            //if earthball hits waterwall
            if (earthball[i].x + earthball[i].w >= waterwall.x &&  earthball[i].y + earthball[i].h >= waterwall.y && earthball[i].y <= waterwall.y + waterwall.h && earthball[i].x < waterwall.x + waterwall.w) {
                earthball[i].y -= 2;
                earthball[i].w  += 4;
                earthball[i].h  += 4;
                earthball[i].plant = true;  //and turns into a plant strike
            }

            //if earthball turns into a plant strike
            if(earthball[i].plant) {
                //prints picture of plant over earthball
                ctx.clearRect(earthball[i].x - 12,  earthball[i].y - 1, earthball[i].w + 1, earthball[i].h + 1);
                ctx.drawImage(plantimg, earthball[i].x - 12,  earthball[i].y - 1, earthball[i].w + 1, earthball[i].h + 1);
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
    }, 

    water: function() {
        for (var i = 0; i < waterball.length; i++) {

            waterball[i].update();
            waterball[i].x += 10;
            ctx.drawImage(waterimg, waterball[i].x - 12,  waterball[i].y - 1, waterball[i].w + 1, waterball[i].h + 1);

            if (waterball[i].x + waterball[i].w >= waterwall.x && waterwallup == true && waterball[i].y + waterball[i].h >= waterwall.y && waterball[i].y <= waterwall.y + waterwall.h && waterball[i].x < waterwall.x + waterwall.w) {
                waterball[i].y -= 2;
                waterball[i].w  += 4;
                waterball[i].h  += 4;
            }

            //if waterball hits earthwall
            if (waterball[i].x + waterball[i].w >= earthwall.x &&  waterball[i].y + waterball[i].h >= earthwall.y && waterball[i].y <= earthwall.y + earthwall.h && waterball[i].x < earthwall.x + earthwall.w) {
                waterball[i].y -= 2;
                waterball[i].w  += 4;
                waterball[i].h  += 4;
                waterball[i].plant = true;  //and turns into a plant strike
            }

            //if waterball turns into a plant strike
            if(waterball[i].plant) {
                //prints picture of plant over waterball
                ctx.clearRect(waterball[i].x - 12,  waterball[i].y - 1, waterball[i].w + 1, waterball[i].h + 1);
                ctx.drawImage(plantimg, waterball[i].x - 12,  waterball[i].y - 1, waterball[i].w + 1, waterball[i].h + 1);
            }
            
            //if waterball hits airwall
            if (waterball[i].x + waterball[i].w >= airwall.x &&  waterball[i].y + waterball[i].h >= airwall.y && waterball[i].y <= airwall.y + airwall.h && waterball[i].x < airwall.x + airwall.w) {
                waterball[i].y -= 2;
                waterball[i].w  += 4;
                waterball[i].h  += 4;
                waterball[i].ice = true;  //and turns into a ice strike
            }

            //if waterball turns into a ice strike
            if(waterball[i].ice) {
                //prints picture of ice over waterball
                ctx.clearRect(waterball[i].x - 12,  waterball[i].y - 1, waterball[i].w + 1, waterball[i].h + 1);
                ctx.drawImage(iceimg, waterball[i].x - 12,  waterball[i].y - 1, waterball[i].w + 1, waterball[i].h + 1);
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
    },

    air: function() {
        for (var i = 0; i < airball.length; i++) {
            airball[i].update();
            airball[i].x += 10;
            ctx.drawImage(airimg, airball[i].x - 12,  airball[i].y - 1, airball[i].w + 1, airball[i].h + 1);

            //if airball hits your airwall
            if (airball[i].x + airball[i].w >= airwall.x && airwallup == true && airball[i].y + airball[i].h >= airwall.y && airball[i].y <= airwall.y + airwall.h && airball[i].x < airwall.x + airwall.w) {
                airball[i].y -= 2;
                airball[i].w  += 4;
                airball[i].h  += 4;
            }

            //if airball hits your firewall
            if (airball[i].x + airball[i].w >= firewall.x &&  airball[i].y + airball[i].h >= firewall.y && airball[i].y <= firewall.y + firewall.h && airball[i].x < firewall.x + firewall.w) {
                airball[i].y -= 2;
                airball[i].w  += 4;
                airball[i].h  += 4;
                airball[i].light = true;  //and turns into a light strike
            }

            //if airball turns into a light strike
            if(airball[i].light) {
                //prints picture of light over airball
                ctx.clearRect(airball[i].x - 12,  airball[i].y - 1, airball[i].w + 1, airball[i].h + 1);
                ctx.drawImage(lightimg, airball[i].x - 12,  airball[i].y - 1, airball[i].w + 1, airball[i].h + 1);
            }

            //if airball hits your waterwall
            if (airball[i].x + airball[i].w >= waterwall.x &&  airball[i].y + airball[i].h >= waterwall.y && airball[i].y <= waterwall.y + waterwall.h && airball[i].x < waterwall.x + waterwall.w) {
                airball[i].y -= 2;
                airball[i].w  += 4;
                airball[i].h  += 4;
                airball[i].ice = true;  //and turns into a light strike
            }

            //if airball turns into a ice strike
            if(airball[i].ice) {
                //prints picture of ice over airball
                ctx.clearRect(airball[i].x - 12,  airball[i].y - 1, airball[i].w + 1, airball[i].h + 1);
                ctx.drawImage(iceimg, airball[i].x - 12,  airball[i].y - 1, airball[i].w + 1, airball[i].h + 1);
            }
            
            //if airball goes offscreen
            if (airball[i].x > canvas.width) {
                airball[i].id = id;
                for (var j = airball.length - 1; i >= 0; --i) {                
                    if (airball[i].id == id) {
                        airball.splice(i,1);
                    }
                }
            } else

            //if airball hits enemy waterwall
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
    }
}
