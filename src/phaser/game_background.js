import Phaser from "phaser";

class GameBackGround extends Phaser.Scene {
  constructor() {
    super("gameback");
  }

  preload() {}
  create() {
    this.add.line(400, 250, 0, 0, 0, 500, 0xffffff, 1);
    this.add.circle(400, 250, 50).setStrokeStyle(2, 0xfffffff, 1);
  }
}

export default GameBackGround;
