let openD;
let closedD;
let bg;
let openSound;

function preload() {
    openD = loadImage('Images/Open.png');
    closedD = loadImage('Images/Closed.png');
    bg = loadImage('Images/street.png');
    soundFormats('wav');
    openSound = loadSound ('Assets/152805__mireia_af__dumpster_WAVE2.wav');
}

let playerAvatar = {
    x: 65,
    y: 215,
    speed: 3,
    
    displayAvatar: function () {
    fill(229, 82, 53);
    circle(this.x, this.y, 50);
    },
//   up() {
//     this.y -= this.speed;
//   },
//   down() {
//     this.y += this.speed;
//   },
//   left() {
//     this.x -= this.speed;
//   },
//   right() {
//     this.x += this.speed;
//   },
};

// Dumpster class
class Dumpster {
    constructor(x, y, w = 150, h = 75) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.clicked = false;
        this.lootText = ''; // loot text as string
        this.lootTime = 0;  // For timing how long loot shown
        this.openTime = 0; // Timing how long dumpster open
    };

  display() {
    //Dumpster open/closed
    if (this.clicked && millis() - this.openTime < 2000) {
       openSound.play();
      image(openD, this.x, this.y, this.w, this.h);
    } else if(this.isNearPlayer(playerAvatar) && !this.clicked) {
        strokeWeight(2);
        stroke(255, 243, 128);
        rect(this.x - 2, this.y - 2, this.w + 4, this.h + 4, 2);
        image(closedD, this.x, this.y, this.w, this.h);
        
    } else{
        noStroke();
      image(closedD, this.x, this.y, this.w, this.h);
    };

    // Show loot for 2 seconds after clicking
    if (this.lootText && millis() - this.lootTime < 2000) {
      fill(255);
      textFont('Comic Sans',35);
      textAlign(CENTER);
      text(this.lootText, 1920/2, 630);
    };

    //Prompt to open
    if(this.isNearPlayer(playerAvatar) && !this.clicked) {
        // fill(30, 158, 30);
        // textFont('Comic Sans', 15);
        // textAlign(CENTER);
        // text('Click to search', this.x + this.w/2, this.y);
    };
  };

  isNearPlayer(player) {
    return (
      player.x + 25 > this.x - 10 &&
      player.x - 25 < this.x + this.w + 10 &&
      player.y + 25 > this.y - 10 &&
      player.y - 25 < this.y + this.h + 10
    );
  };

  //Collision
   isColliding(player) {
        return !(
            player.x + 25 < this.x ||
            player.x - 25 > this.x + this.w ||
            player.y + 25 < this.y ||
            player.y - 25 > this.y + this.h
        );
    }

  wasClicked(mx, my) {
    return (
      mx > this.x &&
      mx < this.x + this.w &&
      my > this.y &&
      my < this.y + this.h
    );
  };

  handleClick() {
    this.clicked = true;
    this.lootText = random(loot);
    this.lootTime = millis();
    this.openTime = millis();
  };
}

let dumpsters = [];
let loot = [
  'You found: a banana peel',
  'You found: a half-eaten burger',
  'You found: an old stuffed toy',
  'You found: a perfectly fine TV',
  'You found: a stinky boot',
  'You found: junk',
  'You found: cash',
  'You found: a gold bar',
  'You found: a baby raccoon',
  'You found: a nice lamp',
  'You found: a cracked vase',
];

function setup() {
  createCanvas(1920, 1080);

  //Dumpsters
  dumpsters.push(new Dumpster(160, 720));
  dumpsters.push(new Dumpster(160, 320));
  dumpsters.push(new Dumpster(690, 460));
  dumpsters.push(new Dumpster(690, 720));
  dumpsters.push(new Dumpster(690, 970));
  dumpsters.push(new Dumpster(1020, 40));
  dumpsters.push(new Dumpster(1020, 320));
  dumpsters.push(new Dumpster(1020, 720));
  dumpsters.push(new Dumpster(1700, 450));
}

function draw() {
    image(b,0,0,1920,1080);  
    //Instructions
    fill(18, 105, 18);
    textFont('Papyrus', 25);
    textAlign(LEFT);
    text('Use WASD to move. Look in the dumpsters for treasure!', 200 ,40);
    
    // Display and move player
    playerAvatar.displayAvatar();
    if (keyIsDown(87)) {
        
        playerAvatar.up();
     };
    }; 
    if (keyIsDown(83)) {
        if(hitBotDumpster(playerAvatar)){
            !playerAvatar.down();
        }else{
            playerAvatar.down();
        };
    };   
    if (keyIsDown(65)) {
        if(hitLDumpster(playerAvatar)){
            !playerAvatar.left();
        }else{
     playerAvatar.left();
        };   
    };
    if (keyIsDown(68)){ 
        if(hitRDumpster(playerAvatar)){
            !playerAvatar.right();
        }else{
            playerAvatar.right();
        };  
    };
    

    // Display dumpsters and any loot
    for (let d of dumpsters) {
        d.display();
    };
    


function mousePressed() {
  for (let d of dumpsters) {
    if (d.isNearPlayer(playerAvatar) && d.wasClicked(mouseX, mouseY)) {
        d.handleClick();
    }
};

}

