import Phaser from "phaser";
import WebFontFile from "./WebFontFile";

class GameOverScene extends Phaser.Scene {
  constructor() {
    super("gameover");
  }

  preload() {
    const fonts = new WebFontFile(this.load, "Press Start 2P");
    this.load.addFile(fonts);
  }
  /**
   *
   * @param {{ leftScore: number, rightScore: number}} data
   */
  create(data) {
    let text = "You Lose !";
    if (data.leftScore > data.rightScore) {
      text = "You Win !";
    }
    this.add
      .text(400, 200, "Game Over", {
        fontFamily: '"Press Start 2P"',
        fontSize: 50,
      })
      .setOrigin(0.5, 0.5);
    this.add
      .text(400, 300, text, {
        fontFamily: '"Press Start 2P"',
        fontSize: 40,
      })
      .setOrigin(0.5, 0.5);
    this.add
      .text(400, 350, "Press space to restart", {
        fontFamily: '"Press Start 2P"',
        fontSize: 10,
      })
      .setOrigin(0.5, 0.5);

    this.input.keyboard.once("keydown-SPACE", () => {
      this.scene.start("titlescreen_scene");
    });
  }
}

export default GameOverScene;
