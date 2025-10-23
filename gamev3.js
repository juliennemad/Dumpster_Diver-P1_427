let openD;
let closedD;
let bg; 
let openSound;


function preload() {
    openD = loadImage('Assets/Open.png');
    closedD = loadImage('Assets/Closed.png');
    bg = loadImage('Assets/street.png');
    soundFormats('wav');
    openSound = loadSound ('Assets/152805__mireia_af__dumpster_WAVE2.wav');
}

let playerAvatar = {
    x: 65,
    y: 215,
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

class Dumpster {
    constructor(x, y, w = 150, h = 75) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.clicked = false;
        this.lootText = '';
        this.lootTime = 0;
        this.openTime = 0;
        this.hasPlayedSound = false;
    }

    display() {
     if (this.clicked && millis() - this.openTime < 3000) {
    if (!this.hasPlayedSound) {
        openSound.play();
        this.hasPlayedSound = true;
    };
    image(openD, this.x, this.y, this.w, this.h);
    } 
    else {
    this.hasPlayedSound = false; // Reset when not open
    if (this.isNearPlayer(playerAvatar) && !this.clicked) {
        strokeWeight(2);
        stroke(255, 243, 128);
        rect(this.x - 2, this.y - 2, this.w + 4, this.h + 4, 2);
        image(closedD, this.x, this.y, this.w, this.h);
        noStroke();
    } else {
        noStroke();
        image(closedD, this.x, this.y, this.w, this.h);
    }
}


        if (this.lootText && millis() - this.lootTime < 3000) {
            fill(255);
            textFont('Comic Sans', 35);
            textAlign(CENTER);
            text(this.lootText, width / 2, 630);
        }
    }

    isNearPlayer(player) {
        return (
            player.x + 25 > this.x - 10 &&
            player.x - 25 < this.x + this.w + 10 &&
            player.y + 25 > this.y - 10 &&
            player.y - 25 < this.y + this.h + 10
        );
    }

    wasClicked(mx, my) {
        return (
            mx > this.x &&
            mx < this.x + this.w &&
            my > this.y &&
            my < this.y + this.h
        );
    }

    handleClick() {
        this.clicked = true;
        this.lootText = random(loot);
        this.lootTime = millis();
        this.openTime = millis();
    }

    isColliding(player) {
        return !(
            player.x + 25 < this.x ||
            player.x - 25 > this.x + this.w ||
            player.y + 25 < this.y ||
            player.y - 25 > this.y + this.h
        );
    }
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
    image(bg, 0, 0, width, height);

    handlePlayerMovement();

    playerAvatar.displayAvatar();

    for (let d of dumpsters) {
        d.display();
    }

    fill(18, 105, 18);
    textFont('Papyrus', 23.5);
    textAlign(LEFT);
    text('Use WASD to move. Click to look in the dumpsters for treasure!', 170, 40);
}

function handlePlayerMovement() {
    let moveX = 0;
    let moveY = 0;

    if (keyIsDown(87)) moveY -= playerAvatar.speed; // W
    if (keyIsDown(83)) moveY += playerAvatar.speed; // S
    if (keyIsDown(65)) moveX -= playerAvatar.speed; // A
    if (keyIsDown(68)) moveX += playerAvatar.speed; // D

    // Check potential collision before moving
    let tempPlayer = {
        x: playerAvatar.x + moveX,
        y: playerAvatar.y + moveY
    };

    let collision = false;
    for (let d of dumpsters) {
        if (d.isColliding(tempPlayer)) {
            collision = true;
            break;
        }
    }

    if (!collision) {
        playerAvatar.x += moveX ;
        playerAvatar.y += moveY ;
    }
}

function mousePressed() {
    for (let d of dumpsters) {
        if (d.isNearPlayer(playerAvatar) && d.wasClicked(mouseX, mouseY)) {
            d.handleClick();
        }
    }
}
