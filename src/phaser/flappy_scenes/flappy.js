import Phaser from "phaser";

class FlappyScene extends Phaser.Scene {
  constructor() {
    super("Flappy Scene");
  }

  init() {
    this.pipes = this.physics.add.staticGroup();
    this.scene.run("back");
    this.scene.sendToBack("back");
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  preload() {
    this.load.image(
      "ground",
      process.env.PUBLIC_URL + "assets/flappy/ground.png"
    );

    this.load.spritesheet(
      "player",
      process.env.PUBLIC_URL + "assets/flappy/bird.png",
      {
        frameWidth: 34,
        frameHeight: 24,
      }
    );
  }
  create() {
    this.createPlayer();
    this.createGround();
    this.createCollide();

    this.physics.add.collider(this.player, this.pipes);
  }
  update() {
    this.playerInput();

    this.ground.tilePositionX += 2;
  }

  createPlayer() {
    this.player = this.physics.add.sprite(50, 400, "player");
    this.player.setBounce(0.2);
    this.player.body.setCollideWorldBounds(true, 0, 0);

    this.anims.create({
      key: "still",
      frames: [{ key: "player", frame: 0 }],
      frameRate: 15,
    });
    this.anims.create({
      key: "fly",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 3 }),
      frameRate: 15,
      repeat: -1,
    });
  }

  createGround() {
    this.ground = this.add.tileSprite(0, 750, 0, 0, "ground");
    this.physics.add.existing(this.ground, true);
  }

  createCollide() {
    this.physics.add.collider(this.player, this.ground);
  }

  createPipe(x, y) {}

  playerInput() {
    if (this.cursors.space.isDown) {
      this.player.body.setVelocityY(-150);
      this.player.anims.play("fly", true);
    } else {
      this.player.anims.play("still");
    }
  }
}

export default FlappyScene;
