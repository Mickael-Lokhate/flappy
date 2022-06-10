import Phaser from "phaser";
import WebFontFile from "./WebFontFile";

class TitleScreen extends Phaser.Scene {
  constructor() {
    super("titlescreen_scene");
  }

  preload() {
    const fonts = new WebFontFile(this.load, "Press Start 2P");
    this.load.addFile(fonts);

    this.load.audio(
      "beep",
      process.env.PUBLIC_URL + "assets/pong/ping_pong_8bit_beeep.wav"
    );
    this.load.audio(
      "plop",
      process.env.PUBLIC_URL + "assets/pong/ping_pong_8bit_plop.wav"
    );
  }
  create() {
    this.add
      .text(400, 200, "Pong Game", {
        fontSize: 50,
        fontFamily: '"Press Start 2P"',
      })
      .setOrigin(0.5, 0.5);

    this.add
      .text(400, 300, "Press space to play", {
        fontFamily: '"Press Start 2P"',
      })
      .setOrigin(0.5, 0.5);

    this.input.keyboard.on("keydown-SPACE", () => {
      this.sound.play("beep");
      this.scene.start("pong_scene");
    });
  }
  update() {}
}

export default TitleScreen;
