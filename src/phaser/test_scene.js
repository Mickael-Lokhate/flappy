import Phaser from "phaser";
// import sky from "assets/sky.png";
// import ground from "assets/platform.png";
// import star from "assets/star.png";
// import bomb from "assets/bomb.png";
// import dude from "assets/dude.png";

class TestScene extends Phaser.Scene {
  constructor() {
    super("TestScene");
  }

  preload() {
    this.load.image("sky", process.env.PUBLIC_URL + "/assets/sky.png");
    // this.load.image("ground", ground);
    // this.load.image("star", star);
    // this.load.image("bomb", bomb);
    // this.load.spritesheet("dude", dude, {
    //   frameWidth: 32,
    //   frameHeight: 48,
    // });
  }
  create() {
    this.add.image(400, 300, "sky");
  }

  update() {}
}

export default TestScene;
