let playerAvatar = {
  x: 200,
  y: 200,
  speed : 2,
  displayAvatar: function(){
   fill(229, 82, 53);
    circle(this.x, this.y, 50);
  },
  up(){
    this.y -= this.speed;
  },
  down(){
    this.y += this.speed;
  },
  left(){
    this.x -= this.speed;
  },
  right(){
    this.x += this.speed;
  },

}

let dumpster = {
  x : 400,
  y: 600,
  w : 150,
  h : 70, 
  

  displayDumpster: function(x,y){
    fill(30, 158, 30);
    rect(x, y, this.w, this.h);

  },
}

let interaction = {
  interactDumpster: function(){
    if (playerAvatar.x <= dumpster.x - 10 && playerAvatar.x >= (dumpster.x + dumpster.w) - 10 &&
    playerAvatar.y <= dumpster.y - 10 && playerAvatar.y >= (dumpster.y + dumpster.h)-10){
      if(mouseClicked(mouseX < dumpster.x && mouseX > dumpster.x + dumpster.w 
        && mouseY < dumpster.y && mouseY > dumpster.y + dumpster.h)) {
        //change color (change sprite)
          fill ('red');
          dumpster.displayDumpster(dumpster.x, dumpster.y);
          //pop up arrows or click?
          //loot reward needs to fade after a while
          randomLoot = loot[Math.floor(Math.random() * loot.length)];
          textSize(20);
          text(randomLoot,width/2,height/2);
        };

      };
    },
    
    feedback: function(){
     if (playerAvatar.x <= dumpster.x - 10 && playerAvatar.x >= (dumpster.x + dumpster.w) - 10 &&
    playerAvatar.y <= dumpster.y - 10 && playerAvatar.y >= (dumpster.y + dumpster.h)-10){

    }
    
  },
}
  
//if player is within 10px of dumpster then gain stroke

let diving = [LEFT_ARROW, RIGHT_ARROW,UP_ARROW,DOWN_ARROW];
let loot = ['banana peel', 'half-eaten burger', 'old stuffed toy', 'perfectly fine TV', 'stinky boot','junk','cash','gold bar'];

function setup() {
  createCanvas(1920, 1080);
}

function draw() {
  background(100);
  
  playerAvatar.displayAvatar();
  if (keyIsDown(87)){
    playerAvatar.up();
  };
  if(keyIsDown(83)){
    playerAvatar.down();
  };
  if(keyIsDown(65)){
    playerAvatar.left();
  };
  if(keyIsDown(68)){
    playerAvatar.right();
  };
  //MAKE SURE IT WORKS W NOT A DUMPSTER


//Dumpsters
dumpster.displayDumpster(500,200);
dumpster.displayDumpster(300,700);
dumpster.displayDumpster(500,900);
dumpster.displayDumpster(400,1200);
dumpster.displayDumpster();
dumpster.displayDumpster(700,1400);
dumpster.displayDumpster(100,300);
dumpster.displayDumpster(1000,100);
dumpster.displayDumpster(1200,800);
dumpster.displayDumpster(1500,600);
rect(400,600,150,70);

// if (playerAvatar.x <= dumpster.x - 10 && playerAvatar.x >= (dumpster.x + dumpster.w) - 10 &&
//   playerAvatar.y <= dumpster.y - 10 && playerAvatar.y >= (dumpster.y + dumpster.h)-10){
  //     dumpster.displayDumpster
  //interaction?
  // interaction.interactDumpster();
  
  //random loot
  //if player hits all correct keys in order
  // if (mouseClicked){
    //   randomLoot = loot[Math.floor(Math.random() * loot.length)];
    //   textSize(20);
    //   text(randomLoot,width/2,height/2);
    // };
    if (playerAvatar.x <= 400 - 10 && playerAvatar.x >= (400 + 150) - 10 &&
     playerAvatar.y <= 600 - 10 && playerAvatar.y >= (600 + 70)-10){
      if (mouseClicked(mouseX < dumpster.x && mouseX > dumpster.x + dumpster.w 
        && mouseY < dumpster.y && mouseY > dumpster.y + dumpster.h)) {
       fill ('red');
       rect(400, 600, 150, 70);
    }
  }
}
