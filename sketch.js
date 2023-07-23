var br, bc, bw, bh, offleft, offtop, padding;
var barr = [];

var bx, by, b_dx, bdy, ball_radius;
var px, py, pw, ph, p_dx, p_dy;
var gameOn = 0, score = 0, gameWon = 0, gameLost = 0;

function setup() {
  createCanvas(400, 400);
  background('black')
  br = 4;
  bc = 4;
  offleft = 10;
  offtop = 30;
  padding = 50;
  bw = (width - 2*offleft - (bc-1)*padding)/bc;
  bh = 10;
 
  createBricks();
  text("Press enter in keyboard to start the game", height/2 , width/2)
  
  
  bx = width/2;
  by = height - height/4;
  ball_radius = 25/2;
  var rand = Math.floor(Math.random() * 10);
  b_dx = (rand <= 4) ? -(1+rand%4) : (1+rand%4);
  b_dy = 5;
  
  ph = 20;
  pw = 100;
  px = width/2 - pw/2;
  py = height - ph;
  p_dx = 8;
}



function createBricks(){
   for(var r=0; r<br; r++){
    barr[r] = [];
    for(var c=0; c<bc; c++){
      barr[r][c] = {flag : 0, x:0, y:0 }
      
    }
  }
  for(var r=0; r<br; r++){
    for(var c=0; c<bc; c++){
        let xx = offleft + c*padding + c*bw ;
        let yy = offtop + r*offtop + r*bh + 20;
        // if(r===0) yy += 20;
        barr[r][c].flag = 1;
        barr[r][c].x = xx;
        barr[r][c].y = yy;
    }
  }
}




function drawBricks(){
  for(var r=0; r<br; r++){
    for(var c=0; c<bc; c++){
      if(barr[r][c].flag){
        fill('black')
        rect(barr[r][c].x, barr[r][c].y, bw, bh);
      }
      // print(barr[r][c])
    }
  }
}



function collision(){
  for(var r = 0; r<br; r++){
    for(var c = 0; c < bc; c++){
      if(barr[r][c].flag){
        var x = barr[r][c].x;
        var y = barr[r][c].y;
        if(bx+ball_radius>=x && bx-ball_radius<=x+bw && by+ball_radius >= y && by-ball_radius<=y+bh){
          barr[r][c].flag = 0;
          score++;
          if(score===16){
            gameOn=0;
            gameWon = 1;
          }
          if((by+ball_radius>=y && by+ball_radius <= y+bh) || (by-ball_radius <= y+bh && by-ball_radius>=y) ){
            b_dy = - b_dy;
          }
        }
        
      }
      
    }
  }
}


function keyPressed(){
  if(keyCode === ENTER){
    if(!gameOn) { 
      gameOn = 1; 
      gameWon = 0;
      gameLost = 0;
    }
  }
}

function draw() {
  background('rgb(0,255,255)')
  fill('black')
  textSize(15);
  text("Your Score is : " + score, 10 , 30)
  
  
  
  if(gameOn){
    
        collision();
        drawBricks();

        rect(px, py, pw, ph)
        circle(bx, by, ball_radius);
        
        bx = bx + b_dx;
        by = by - b_dy;
    
        if(bx >= width - ball_radius){
          b_dx = -b_dx;
        }

        if(by >= height - ball_radius){
          b_dy = -b_dy;

        }

        if(keyIsDown(LEFT_ARROW)){
          if(px>=p_dx)
          px = px - p_dx;
        }

        if(keyIsDown(RIGHT_ARROW)){
          if(px+pw <= width-p_dx){
            px = px + p_dx;
          }

        }

        if(bx<=0){
          b_dx = -b_dx;
        }
        if(by<=0){
          b_dy = -b_dy;
        }


        if(by+ball_radius >= height-ph && bx+ball_radius >= px && bx-ball_radius <=px+pw){
          b_dy = -b_dy;
        }
        if(by+ball_radius >= height && (bx+ball_radius<=px || bx-ball_radius>=px+pw)){
            gameOn= 0;
            gameLost = 1;
            // by = height - height/4;
            // bx = width/2;
            // px = width/2 - pw/2;
            // py = height - ph;
        }
    }
  
  if(!gameOn){
      createBricks();
      by = height - height/4;
      bx = width/2;
      px = width/2 - pw/2;
      py = height - ph;
      score = 0;
      if(gameWon){
        text("Yeah !!!!   you won the match", 100, height/2)
      }
      if(gameLost){
        text("oops... Try again !!! ", 100, height/2)
      }
  }
  

}