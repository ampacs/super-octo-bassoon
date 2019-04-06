//import { sum2 } from "./src/transform"
//var transform = require("./transform.js");

const gameState = {}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1280,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 0 }
        }
    },
    scene: {
        preload,
        create,
        update
    }
};

var game = new Phaser.Game(config);

function preload() {
    this.load.image("dude", "https://s3.amazonaws.com/codecademy-content/courses/learn-phaser/codey.png");
    console.log(sum2(1,2));
}

function create() {

    const player = new Player("Player1");
    //player.graphics = this.add.circle(100, 100, 30, 0x00E090);
    player.body = this.physics.add.sprite(100, 100, 'dude');
    //player.graphics.anchor.setTo(0.5, 0.5);
    //player.graphics = game.add.graphics();
    //player.graphics = new Phaser.Geom.Circle(100, 100, 30);
    //player.graphics.fillCircle(100, 100, 30);
    //this.physics.world.enable(player);
    //player.body.drag
    player.body.setCircle(30);
    player.body.setBounce(0.2);
    player.body.setCollideWorldBounds(true);
    player.body.body.drag.set(50);
    player.angle = 0;
    player.direction = function() { return new Phaser.Math.Vector2(Math.cos(this.angle), Math.sin(this.angle)) };
    //player.body.calculateDrag = function() { return player.body.velo }
    gameState.player = player;
    gameState.cursors = this.input.keyboard.createCursorKeys();
    //gameState.cursors.magnitude = () => Math.pow((gameState.cursors.right.isDown - gameState.cursors.left.isDown)*(gameState.cursors.right.isDown - gameState.cursors.left.isDown) + (gameState.cursors.down.isDown - gameState.cursors.up.isDown)*(gameState.cursors.down.isDown - gameState.cursors.up.isDown), 0.5);
    gameState.direction = function() { return (new Phaser.Math.Vector2(gameState.cursors.right.isDown - gameState.cursors.left.isDown, gameState.cursors.down.isDown - gameState.cursors.up.isDown)).normalize(); }
    //gameState.direction = {
    //    x : function() { return (gameState.cursors.right.isDown - gameState.cursors.left.isDown)/gameState.cursors.magnitude() || 0; },
    //    y : function() { return (gameState.cursors.down.isDown - gameState.cursors.up.isDown)/gameState.cursors.magnitude() || 0; },
    //}
    var propValue;
    for(var propName in gameState.player.body) {
        propValue = gameState.player.body[propName]

        console.log(propName,propValue);
    }
}

function update() {
    let direction = gameState.direction();
    let sqrSpeed = gameState.player.body.body.velocity.lengthSq();
    gameState.player.angle += Math.asin(direction.cross(gameState.player.direction())) / 10 || 0;
    let dot = direction.dot(gameState.player.direction())
    //gameState.player.body.setAngularVelocity(direction.angle() * 0.05 * Math.exp(-sqrSpeed / 100));

    gameState.player.body.setAcceleration(gameState.player.direction().x * 500 * dot, gameState.player.direction().y * 500 * dot);

    if (gameState.player.body.body.speed > 15) {
        gameState.player.body.body.velocity.x += gameState.player.body.body.speed * Math.cos((gameState.player.body.body.angle - direction.angle()) * 0.01745) / 1000;
        gameState.player.body.body.velocity.y += gameState.player.body.body.speed * Math.sin((gameState.player.body.body.angle - direction.angle()) * 0.01745) / 1000;
    }
    let cross = direction.cross(gameState.player.body.body.velocity);
    let area = gameState.player.body.body.velocity.length();
    console.log(gameState.player.direction());
}
