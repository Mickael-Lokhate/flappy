import Phaser from "phaser";

class FlappyScene extends Phaser.Scene {
  constructor() {
    super("Flappy Scene");
  }

  init() {
    this.pause = false;
    this.scene.run("back");
    this.scene.sendToBack("back");
    this.cursors = this.input.keyboard.createCursorKeys();
    this.nextPipe = 0;
  }

  preload() {
    this.load.image(
      "ground",
      process.env.PUBLIC_URL + "assets/flappy/ground.png"
    );
    this.load.image(
      "pipe_bottom",
      process.env.PUBLIC_URL + "assets/flappy/pipeb.png"
    );
    this.load.image(
      "pipe_top",
      process.env.PUBLIC_URL + "assets/flappy/pipet.png"
    );
    this.load.image("star", process.env.PUBLIC_URL + "assets/flappy/star.png");

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
    this.pipes = this.physics.add.staticGroup();
    // this.createPipe();
    this.createGround();
    this.createCollide();

    this.physics.add.collider(this.player, this.pipes);
  }
  update() {
    this.playerInput();

    if (!this.pause) {
      this.ground.tilePositionX += 2;
      this.pipes.incX(-1).refresh();

      this.pipes.children.iterate((child) => {
        if (child === undefined) return;
        if (child.x < -50) child.destroy();
      });

      this.nextPipe++;
      if (this.nextPipe === 200) {
        this.createPipe();
        this.nextPipe = 0;
      }
    }
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
    this.ground = this.add.tileSprite(0, 650, 0, 0, "ground");
    this.physics.add.existing(this.ground, true);
  }

  createCollide() {
    this.physics.add.collider(this.player, this.ground);
    this.physics.add.collider(this.pipes, this.player, () => {
      this.pause = true;
      this.player.anims.pause();
    });
  }

  createPipe() {
    const y = Phaser.Math.Between(-100, 150);

    this.pipes.create(450, y, "pipe_top");
    this.pipes.create(450, y + 600, "pipe_bottom");
  }

  playerInput() {
    if (this.pause) return;
    if (this.cursors.space.isDown) {
      this.player.body.setVelocityY(-150);
      this.player.anims.play("fly", true);
    } else {
      this.player.anims.play("still");
    }
  }
}

export default FlappyScene;
