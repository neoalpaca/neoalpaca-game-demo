//screen
let WIDTH = 800;
let HEIGHT = 600;

//screens
let gameStage = 0; //eee!!!!!!!

//camera
let cam;
//alpaca
let alpaca;
let alpacaX;
let alpacaY;
let alpacaSpeed = 1;
let alpacaMaxHealth = 3;
let alpacaHealth = 3;
let alpacaDamage = 1;
let alpacaCriticalHitChance = 0;
let alpacaItems = [];

//hitbox
let hitboxesGroup;

//items
let key;

//world
let door;

//misc
let win = false;

screen1Hitboxes = [
    {
        'x': 400,
        'y': 0,
        'w': 800,
        'h': 0
    },
    {
        'x': 205,
        'y': 145,
        'w': 10,
        'h': 100
    },
    {
        'x': 20,
        'y': 300,
        'w': 10,
        'h': 600
    },
    {
        'x': 400,
        'y': 575,
        'w': 800,
        'h': 20
    },
    {
        'x': 780,
        'y': 460,
        'w': 10,
        'h': 180
    },
    {
        'x': 780,
        'y': 120,
        'w': 10,
        'h': 130
    },
]

function preload() {
    back = loadImage('assets/scr1.png');

    //alpaca
    alpacaRight = loadImage('assets/alpaca_right.png');
    alpacaLeft = loadImage('assets/alpaca_left.png');
    alpacaUp = loadImage('assets/alpaca_up.png');
    alpacaDown = loadImage('assets/alpaca_down.png');

    //items
    itemKey = loadImage('assets/key.png');

    //world
    worldDoor = loadImage('assets/door.png');
}

class Alpaca {
    constructor(xPos, yPos) {
        this.xPos = xPos;
        this.yPos = yPos;
    }
    display() {
        drawSprite(alpaca);
    }
    createAlpaca() {
        alpaca = createSprite(this.xPos, this.yPos, WIDTH/2, HEIGHT/2);
        alpaca.addImage(alpacaRight);
    }
    
    moveUp() {
        alpaca.position.y -= 4 * alpacaSpeed;
        alpaca.addImage(alpacaUp);
    }
    moveDown() {
        alpaca.position.y += 4 * alpacaSpeed;
        alpaca.addImage(alpacaDown);
    }
    moveLeft() {
        alpaca.position.x -= 4 * alpacaSpeed;
        alpaca.addImage(alpacaLeft);
    }
    moveRight() {
        alpaca.position.x += 4 * alpacaSpeed;
        alpaca.addImage(alpacaRight);
    }

    checkInteraction() {
        if(alpaca.overlap(key)) {
            key.remove()
            alpacaItems.push('llave')
        }
        if(alpaca.collide(door)) {
            if(alpacaItems.includes('llave')) {
                alpacaItems.pop('llave');
                door.setCollider('rectangle', 0, 0, 0, 0);
                door.remove();
                win = true;
            }
        }
    }
}

function setup() {
    createCanvas(WIDTH, HEIGHT);

    player = new Alpaca(WIDTH/2, HEIGHT/2);
    player.createAlpaca(); //hacer: arreglar esto

    hitboxesGroup = new Group();

    //hitboxes
    for(hb of screen1Hitboxes) {
        hitboxesGroup.add(createSprite(hb.x, hb.y, hb.w, hb.h));
    }

    key = createSprite(110, 93, 0, 0)
    key.addImage(itemKey);
    door = createSprite(777, 290, 0, 0)
    door.addImage(worldDoor);

} 

function draw() {
    switch (gameStage) {
        case 0:
            screen0();
            break;
        case 1:
            screen1();
            break;
    }
}

function keyPressed() {
    switch(gameStage) {
        case 0:
            if(keyDown('Enter')) {
                gameStage = 1;
            }
            break;
        case 1:
            if(keyDown('w')) {
                player.moveUp();
            }
            if(keyDown('s')) {
                player.moveDown();
            }
            if(keyDown('d')) {
                player.moveRight();
            }
            if(keyDown('a')) {
                player.moveLeft();
            }

            if(keyWentDown('e')) {
                player.checkInteraction();
            }
            
            
    }
}

function screen1() {
    background(0, 0, 0)
    
    image(back, 0, 0);
    drawSprite(key);
    player.display();
    

    textSize(32);
    textSize(18);
    fill(255, 255, 255);
    text(`Daño: ${alpacaDamage}`, 90, 520);
    text(`Vida: ${alpacaHealth}`, 90, 490);
    text(`Items: ${alpacaItems}`, 90, 460);
    //text(`Alpaca pos: ${alpaca.position.x} ${alpaca.position.y}`, 90, 430);
    
    alpaca.collide(hitboxesGroup);
    alpaca.collide(door);
    keyPressed();
    
    drawSprite(door);

    if(win) {
        text('has ganado increible videojuego', WIDTH/2, HEIGHT/2);
        text('esto es mejor que el isaac', WIDTH/2, HEIGHT/2 + 30);
    }
}

function screen0() {
    textAlign(CENTER);
    background(0, 0, 0);
    textSize(32);
    fill(255, 255, 255);
    text('NEOALPACA THE GAME [DEMO]', WIDTH/2, HEIGHT/2);
    textSize(15);
    text('pulsa [Enter] para empezar esta basura', WIDTH/2, HEIGHT/2 + 60);
    text('moverse: [WASD], interactuar: [E]', WIDTH/2, HEIGHT/2 + 120);
    text('disparar etc es solo una demo esto maricón', WIDTH/2, HEIGHT/2 + 140);
    text('no pulses en esta pantalla otra cosa que no sea enter que hay un bug y crashea', WIDTH/2, HEIGHT/2 + 190);
}

