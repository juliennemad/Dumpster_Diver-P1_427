// let playerAvatar = {
//   x: 200,
//   y: 200,
//   speed: 2,
//   displayAvatar: function () {
//     fill(229, 82, 53);
//     circle(this.x, this.y, 50);
//   },
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
// };

// // Define dumpster as an object
// let dumpster = {
//   x: 400,
//   y: 600,
//   w: 150,
//   h: 70,
//   color: (79, 184, 109), //green
// };

// function setup() {
//   createCanvas(800, 800);
// }

// function draw() {
//   background(100);

//   // Move the player
//   if (keyIsDown(87)) playerAvatar.up();
//   if (keyIsDown(83)) playerAvatar.down();
//   if (keyIsDown(65)) playerAvatar.left();
//   if (keyIsDown(68)) playerAvatar.right();

//   // Display player
//   playerAvatar.displayAvatar();

//   // Draw the dumpster
//   fill(dumpster.color);
//   rect(dumpster.x, dumpster.y, dumpster.w, dumpster.h);

//   // Collision detection (simple AABB)
//   if (
//     playerAvatar.x + 25 > dumpster.x &&
//     playerAvatar.x - 25 < dumpster.x + dumpster.w &&
//     playerAvatar.y + 25 > dumpster.y &&
//     playerAvatar.y - 25 < dumpster.y + dumpster.h
//   ) {
//     // Optional: do something on collision
//     console.log("Touching dumpster");
//   }
// }

// // Detect mouse click on dumpster
// function mousePressed() {
//   if (
//     mouseX > dumpster.x &&
//     mouseX < dumpster.x + dumpster.w &&
//     mouseY > dumpster.y &&
//     mouseY < dumpster.y + dumpster.h
//   ) {
//     dumpster.color = color('red');
//   }
// }

let openD;
let closedD;

function preload () {
  openD = loadImage ('Images/Open.png');
  closedD = loadImage ('Images/Closed.png')
}

let playerAvatar = {
  x: 200,
  y: 200,
  speed: 2,
  displayAvatar: function () {
    fill(229, 82, 53);
    circle(this.x, this.y, 50);
  },
  up() {
    this.y -= this.speed;
  },
  down() {
    this.y += this.speed;
  },
  left() {
    this.x -= this.speed;
  },
  right() {
    this.x += this.speed;
  },
};



// Dumpster class to store multiple
class Dumpster {
  constructor(x, y, w = 300, h = 300) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.clicked = false;
    this.lootShown = false;
    this.randomLoot = '';
  };

  //display dumpster image, if clicked display open
  display() {
    if(this.clicked){
    image(openD,this.x,this.y,this.w,this.h);
    }
    else{
       image(closedD,this.x,this.y,this.w,this.h);
    }
  };

  isNearPlayer(player) {
    return (
      player.x  + 25 > this.x - 10 &&
      player.x - 25 < this.x + this.w + 10 &&
      player.y + 25 > this.y - 10 &&
      player.y - 25 < this.y + this.h + 10
    );
  };
  
  
  wasClicked(mx, my) {
    return (
      mx > this.x &&
      mx < this.x + this.w &&
      my > this.y &&
      my < this.y + this.h
    );
  };

  showLoot() {
    if (!this.lootShown) {
      this.randomLoot = random(loot);
      this.lootShown = true;
      textSize(24);
      fill(255);
      textAlign(CENTER);
      text(this.randomLoot, width / 2, height / 2);
    };
  }
};

let dumpsters = [];
let loot = [
  'banana peel',
  'half-eaten burger',
  'old stuffed toy',
  'perfectly fine TV',
  'stinky boot',
  'junk',
  'cash',
  'gold bar',
  ];

function setup() {
  createCanvas(1920, 1080);

  // Create multiple dumpsters
  dumpsters.push(new Dumpster(500, 200));
  dumpsters.push(new Dumpster(500, 700));
  dumpsters.push(new Dumpster(500, 900));
  dumpsters.push(new Dumpster(500, 20));
  dumpsters.push(new Dumpster(500, 500));
  dumpsters.push(new Dumpster(100, 300));
  dumpsters.push(new Dumpster(1000, 100));
  dumpsters.push(new Dumpster(1200, 800));
  dumpsters.push(new Dumpster(1500, 600));
};

function draw() {
  background(100);

  // Display and move player
  playerAvatar.displayAvatar();
  if (keyIsDown(87)) playerAvatar.up();
  if (keyIsDown(83)) playerAvatar.down();
  if (keyIsDown(65)) playerAvatar.left();
  if (keyIsDown(68)) playerAvatar.right();

  // Display dumpsters
  for (let d of dumpsters) {
    d.display();

    // If near and clicked, show loot
    if (d.clicked && !d.lootShown) {
      d.showLoot();
    };
  };
};

// Handle clicks on dumpsters
function mousePressed() {
  for (let d of dumpsters) {
    if (d.isNearPlayer(playerAvatar) && d.wasClicked(mouseX, mouseY)) {
      d.clicked = true;
      d.lootShown = true; // allow loot to be shown once per click
    };
  };
}

