import Phaser from "phaser";

class GameOverScene extends Phaser.Scene {
  constructor() {
    super("gameover");
  }

  init(data) {
    this.score = data.score;
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  preload() {
    this.load.image(
      "gameover",
      process.env.PUBLIC_URL + "assets/flappy/gameover.png"
    );
  }

  create() {
    this.add.image(225, 300, "gameover");
    this.add
      .text(225, 400, `Score: ${this.score}`, {
        fontSize: 32,
        color: "#1a1a1a",
        align: "center",
      })
      .setOrigin(0.5, 0.5);
    this.add
      .text(225, 450, `Tap space to retry`, {
        fontSize: 16,
        color: "#1a1a1a",
        align: "center",
      })
      .setOrigin(0.5, 0.5);
  }

  update() {
    if (this.cursors.space.isDown) {
      this.scene.start("titlescreen");
    }
  }
}

export default GameOverScene;
