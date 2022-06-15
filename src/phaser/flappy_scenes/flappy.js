import Phaser from "phaser";

class FlappyScene extends Phaser.Scene {
  constructor() {
    super("flappy");
  }

  init() {
    this.pause = false;
    this.cursors = this.input.keyboard.createCursorKeys();
    this.nextPipe = 0;
    this.score = 0;
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

    this.loadAudios();
  }
  create() {
    this.createPlayer();
    this.pipes = this.physics.add.staticGroup();
    this.createGround();
    this.createCollide();

    this.scoreText = this.add
      .text(225, 100, `${this.score}`, { fontSize: 64, color: "black" })
      .setOrigin(0.5, 0.5)
      .setDepth(2);
  }
  update() {
    this.playerInput();

    if (!this.pause) {
      this.ground.tilePositionX += 1;
      this.pipes.incX(-2).refresh();

      this.pipes.children.iterate((child) => {
        if (child === undefined) return;
        if (child.x < -50) child.destroy();
        if (this.player.x === child.x) {
          this.score += 0.5;
          this.sound.play("point");
          this.scoreText.setText(this.score);
        }
      });

      this.nextPipe++;
      if (this.nextPipe === 100) {
        this.createPipe();
        this.nextPipe = 0;
      }
    }
  }

  loadAudios() {
    this.load.audio(
      "wing",
      process.env.PUBLIC_URL + "assets/flappy/audio/wing.wav"
    );
    this.load.audio(
      "die",
      process.env.PUBLIC_URL + "assets/flappy/audio/die.wav"
    );
    this.load.audio(
      "hit",
      process.env.PUBLIC_URL + "assets/flappy/audio/hit.wav"
    );
    this.load.audio(
      "point",
      process.env.PUBLIC_URL + "assets/flappy/audio/point.wav"
    );
    this.load.audio(
      "swoosh",
      process.env.PUBLIC_URL + "assets/flappy/audio/swoosh.wav"
    );
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
    this.ground.setDepth(1);
  }

  createCollide() {
    this.physics.add.collider(this.player, this.ground);
    this.physics.add.collider(this.pipes, this.player, () => {
      this.pause = true;
      this.player.anims.pause();
      this.scene.start("gameover", { score: this.score });
    });
  }

  createPipe() {
    const y = Phaser.Math.Between(-100, 150);

    this.pipes.create(450, y, "pipe_top");
    this.pipes.create(450, y + 520, "pipe_bottom");
  }

  handlePlayerMove() {
    this.player.body.setVelocityY(-150);
    this.player.setAngle(-20);
    this.player.anims.play("fly", true);
    this.sound.play("wing");
  }

  playerInput() {
    if (this.pause) return;
    if (this.cursors.space.isDown) {
      this.handlePlayerMove();
    } else {
      this.player.anims.play("still");
      this.player.setAngle(20);
    }

    this.input.on("pointerdown", this.handlePlayerMove, this);
  }
}

export default FlappyScene;
