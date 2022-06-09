import Phaser from "phaser";

class PlatformScene extends Phaser.Scene {
  score = 0;

  constructor() {
    super("Platform Scene");
  }

  preload() {
    this.load.image(
      "ground",
      process.env.PUBLIC_URL + "assets/platform/ground.png"
    );
    this.load.image(
      "island",
      process.env.PUBLIC_URL + "assets/platform/island.png"
    );
    this.load.image(
      "star",
      process.env.PUBLIC_URL + "assets/platform/star.png"
    );
    this.load.spritesheet(
      "player",
      process.env.PUBLIC_URL + "assets/platform/player.png",
      {
        frameWidth: 32,
        frameHeight: 48,
      }
    );

    this.scoreText = this.add.text(16, 16, "Stars: 0", {
      fontSize: "32px",
      fill: "#000",
    });
  }

  createPlatforms() {
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 588, "ground");
    this.platforms.create(600, 450, "island");
    this.platforms.create(50, 250, "island");
    this.platforms.create(650, 220, "island");
    this.platforms.create(250, 320, "island");
    this.platforms.create(250, 520, "island");
  }

  createPlayer() {
    this.player = this.physics.add.sprite(380, 500, "player");
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.anims.create({
      key: "still",
      frames: [{ key: "player", frame: 4 }],
      frameRate: 20,
    });
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("player", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
  }

  createStars() {
    this.stars = this.physics.add.group();
    this.stars.create(22, 0, "star");
    this.stars.create(122, 0, "star");
    this.stars.create(222, 0, "star");
    this.stars.create(322, 0, "star");
    this.stars.create(422, 0, "star");
    this.stars.create(522, 0, "star");
    this.stars.create(622, 0, "star");
    this.stars.create(722, 0, "star");
  }

  create() {
    this.createPlatforms();
    this.createPlayer();
    this.createStars();

    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.overlap(
      this.player,
      this.stars,
      (player, star) => {
        star.disableBody(true, true);
        this.score += 1;
        this.scoreText.setText("Stars: " + this.score);
      },
      null,
      this
    );
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play("right", true);
    } else {
      this.player.anims.play("still");
      this.player.setVelocityX(0);
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }
}

export default PlatformScene;
