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
  }
  create() {
    const back = this.add.image(0, 0, "back").setOrigin(0, 0);
    back.displayWidth = this.sys.canvas.width;
    back.displayHeight = this.sys.canvas.height;
    console.log(back.displayWidth);
  }
}

export default BackgroundScene;
