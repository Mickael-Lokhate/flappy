import Phaser from "phaser";

class BackgroundScene extends Phaser.Scene {
  constructor() {
    super("back");
  }

  preload() {
    this.load.image(
      "back",
      process.env.PUBLIC_URL + "assets/flappy/background-day.png"
    );

    this.load.image(
      "clouds",
      process.env.PUBLIC_URL + "assets/flappy/cloudss.png"
    );
    this.load.image(
      "cloudl",
      process.env.PUBLIC_URL + "assets/flappy/cloudsl.png"
    );
  }
  create() {
    const back = this.add.image(0, 0, "back").setOrigin(0, 0);
    back.displayWidth = this.sys.canvas.width;
    back.displayHeight = this.sys.canvas.height;

    this.createClouds();
  }

  createClouds() {
    this.cloudSmall = this.add.tileSprite(0, 200, 1280, 400, "clouds");
    this.cloudLarge = this.add.tileSprite(0, 200, 1280, 400, "cloudl");
  }

  update() {
    this.cloudLarge.tilePositionX += 0.5;
    this.cloudSmall.tilePositionX += 0.25;
  }
}

export default BackgroundScene;
