import Phaser from "phaser";

class TitleScreenScene extends Phaser.Scene {
  constructor() {
    super("titlescreen");
  }

  init() {
    this.scene.run("back");
    this.scene.sendToBack("back");

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  preload() {
    this.load.image(
      "titlescreen",
      process.env.PUBLIC_URL + "assets/flappy/titlescreen.png"
    );
    this.load.image(
      "bird",
      process.env.PUBLIC_URL + "assets/flappy/bird_solo.png"
    );
  }

  create() {
    this.add.image(225, 350, "titlescreen");
    this.add.image(225, 398, "bird");
  }

  update() {
    if (this.cursors.space.isDown) {
      this.scene.start("flappy");
    }
  }
}

export default TitleScreenScene;
